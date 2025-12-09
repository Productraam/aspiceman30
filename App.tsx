
import React, { useState } from 'react';
import { Tab, ProjectData } from './types';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import SimulationGame from './components/SimulationGame';
import Copilot from './components/Copilot';
import Workspace from './components/Workspace';
import { LayoutDashboard, BookOpen, Gamepad2, Bot, Briefcase } from 'lucide-react';

// Initial Dummy Data
const INITIAL_PROJECT_DATA: ProjectData = {
  info: {
    name: 'Cluster Instrument NextGen',
    manager: 'John Doe',
    customer: 'AutoGlobal Inc.',
    startDate: new Date().toISOString().split('T')[0],
    description: 'Next generation digital instrument cluster with ASPICE L3 compliance requirements.'
  },
  workProducts: [
    { id: '1', name: 'Project Management Plan', type: 'Plan', status: 'Baselined', owner: 'John Doe' },
    { id: '2', name: 'Risk Management Plan', type: 'Plan', status: 'In Review', owner: 'Jane Smith' },
    { id: '3', name: 'Project Schedule', type: 'Plan', status: 'Draft', owner: 'John Doe' },
  ],
  risks: [
    { id: '1', description: 'Supplier delay on chipset delivery', impact: 'High', probability: 'Medium', status: 'Open', mitigationPlan: 'Identify second source' },
    { id: '2', description: 'L3 Compliance Gap in QA', impact: 'Medium', probability: 'Low', status: 'Mitigated', mitigationPlan: 'Hire external consultant' }
  ],
  schedule: [
    { 
      id: '1', 
      name: 'Project Kickoff', 
      startDate: '2023-10-25', 
      endDate: '2023-11-01', 
      expectedProgress: 100, 
      actualProgress: 100, 
      delayReason: '', 
      assignedTo: 'PM' 
    },
    { 
      id: '2', 
      name: 'Requirement Freeze', 
      startDate: '2023-11-01', 
      endDate: '2023-12-15', 
      expectedProgress: 100, 
      actualProgress: 60, 
      delayReason: 'Customer delayed approval of HMI spec', 
      assignedTo: 'Sys Eng' 
    },
    { 
      id: '3', 
      name: 'Architecture Review', 
      startDate: '2024-01-05', 
      endDate: '2024-01-20', 
      expectedProgress: 20, 
      actualProgress: 0, 
      delayReason: 'Waiting for Requirement Freeze', 
      assignedTo: 'Arch' 
    },
  ]
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [copilotQuery, setCopilotQuery] = useState<string | undefined>(undefined);
  const [projectData, setProjectData] = useState<ProjectData>(INITIAL_PROJECT_DATA);

  const handleAskAI = (query: string) => {
    setCopilotQuery(query);
    setActiveTab(Tab.COPILOT);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden selection:bg-cyan-500/30">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            M3
          </div>
          <span className="hidden md:block font-bold text-lg tracking-tight text-white">Command Ctr</span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <NavButton 
            active={activeTab === Tab.DASHBOARD} 
            onClick={() => setActiveTab(Tab.DASHBOARD)} 
            icon={LayoutDashboard} 
            label="Dashboard" 
          />
          <NavButton 
            active={activeTab === Tab.WORKSPACE} 
            onClick={() => setActiveTab(Tab.WORKSPACE)} 
            icon={Briefcase} 
            label="My Project" 
          />
          <NavButton 
            active={activeTab === Tab.LEARN} 
            onClick={() => setActiveTab(Tab.LEARN)} 
            icon={BookOpen} 
            label="Process Academy" 
          />
          <NavButton 
            active={activeTab === Tab.SIMULATION} 
            onClick={() => setActiveTab(Tab.SIMULATION)} 
            icon={Gamepad2} 
            label="Proving Grounds" 
          />
          <NavButton 
            active={activeTab === Tab.COPILOT} 
            onClick={() => setActiveTab(Tab.COPILOT)} 
            icon={Bot} 
            label="AI Assessor" 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="hidden md:flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">PM</div>
             <div className="overflow-hidden">
               <div className="text-xs font-bold text-white truncate">{projectData.info.manager || 'User'}</div>
               <div className="text-[10px] text-emerald-400">Online</div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-w-0">
         {/* Mobile Header */}
         <div className="md:hidden h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4">
           <span className="font-bold text-white">ASPICE MAN.3</span>
         </div>

         <div className="flex-1 p-4 md:p-8 overflow-hidden">
           {activeTab === Tab.DASHBOARD && <Dashboard projectData={projectData} />}
           {activeTab === Tab.WORKSPACE && <Workspace data={projectData} onUpdate={setProjectData} />}
           {activeTab === Tab.LEARN && <LearningModule onAskAI={handleAskAI} />}
           {activeTab === Tab.SIMULATION && <SimulationGame />}
           {activeTab === Tab.COPILOT && <Copilot initialQuery={copilotQuery} />}
         </div>
      </main>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'} />
    <span className="hidden md:block font-medium text-sm">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 hidden md:block shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>}
  </button>
);

export default App;
