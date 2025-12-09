
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Target, ShieldCheck, AlertCircle, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { ProjectData } from '../types';

interface DashboardProps {
  projectData: ProjectData;
}

const Dashboard: React.FC<DashboardProps> = ({ projectData }) => {
  
  // --- Work Product Analytics ---
  const wpStatusCounts = {
    Draft: projectData.workProducts.filter(wp => wp.status === 'Draft').length,
    InReview: projectData.workProducts.filter(wp => wp.status === 'In Review').length,
    Baselined: projectData.workProducts.filter(wp => wp.status === 'Baselined').length,
    Released: projectData.workProducts.filter(wp => wp.status === 'Released').length,
  };

  const totalWPs = projectData.workProducts.length;
  const releasedPercentage = totalWPs > 0 ? Math.round((wpStatusCounts.Released / totalWPs) * 100) : 0;

  const wpChartData = [
    { name: 'Draft', value: wpStatusCounts.Draft, color: '#475569' },
    { name: 'Review', value: wpStatusCounts.InReview, color: '#f59e0b' },
    { name: 'Base', value: wpStatusCounts.Baselined, color: '#3b82f6' },
    { name: 'Done', value: wpStatusCounts.Released, color: '#10b981' },
  ].filter(d => d.value > 0);

  // --- Risk Analytics ---
  const openRisks = projectData.risks.filter(r => r.status === 'Open');
  const highImpactRisks = openRisks.filter(r => r.impact === 'High' || r.impact === 'Critical').length;
  
  const riskChartData = [
    { name: 'Low', value: openRisks.filter(r => r.impact === 'Low').length, color: '#10b981' },
    { name: 'Med', value: openRisks.filter(r => r.impact === 'Medium').length, color: '#f59e0b' },
    { name: 'High', value: openRisks.filter(r => r.impact === 'High').length, color: '#ef4444' },
    { name: 'Crit', value: openRisks.filter(r => r.impact === 'Critical').length, color: '#7f1d1d' },
  ];

  // --- Schedule Analytics ---
  const totalTasks = projectData.schedule.length;
  const completedTasks = projectData.schedule.filter(t => t.actualProgress === 100).length;
  const avgProgress = totalTasks > 0 
    ? Math.round(projectData.schedule.reduce((acc, t) => acc + t.actualProgress, 0) / totalTasks) 
    : 0;
  const delayedTasks = projectData.schedule.filter(t => t.actualProgress < t.expectedProgress).length;

  // --- Process Level Calc (Simple Heuristic) ---
  let complianceLevel = "Level 1";
  let complianceColor = "text-red-400";
  if (releasedPercentage > 50 && totalWPs > 3) {
    complianceLevel = "Level 2";
    complianceColor = "text-amber-400";
  }
  if (releasedPercentage > 85 && totalWPs > 5 && highImpactRisks === 0 && delayedTasks === 0) {
    complianceLevel = "Level 3";
    complianceColor = "text-green-400";
  }

  const stats = [
    { 
      label: 'Process Capability', 
      value: complianceLevel, 
      icon: ShieldCheck, 
      color: complianceColor, 
      sub: 'Target: Level 3' 
    },
    { 
      label: 'Open Risks', 
      value: openRisks.length.toString(), 
      icon: AlertCircle, 
      color: highImpactRisks > 0 ? 'text-red-400' : 'text-green-400', 
      sub: `${highImpactRisks} Critical/High` 
    },
    { 
      label: 'WP Completion', 
      value: `${releasedPercentage}%`, 
      icon: FileText, 
      color: 'text-cyan-400', 
      sub: `${wpStatusCounts.Released}/${totalWPs} Released` 
    },
    { 
      label: 'Delayed Tasks', 
      value: `${delayedTasks}`, 
      icon: Calendar, 
      color: delayedTasks > 0 ? 'text-amber-400' : 'text-indigo-400', 
      sub: `${completedTasks} Tasks Done` 
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-2">
            MAN.3 Command Center
          </h1>
          <p className="text-slate-400">
            Project: <span className="text-white font-bold">{projectData.info.name || 'Untitled'}</span> | 
            Manager: <span className="text-white font-bold">{projectData.info.manager || 'Unassigned'}</span>
          </p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-xs text-slate-500 uppercase">Customer</div>
          <div className="text-xl font-bold text-white">{projectData.info.customer || 'Internal'}</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-slate-700/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">{stat.sub}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WP Status Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Work Product Status</h3>
          <div className="flex-1 min-h-[200px] relative">
             {totalWPs === 0 ? (
               <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm text-center">
                 No Work Products.<br/>Go to Workspace to add data.
               </div>
             ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wpChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wpChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: 'none'}} itemStyle={{color: '#fff'}}/>
                </PieChart>
              </ResponsiveContainer>
             )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300 mt-4 justify-center">
             {wpChartData.map((d, i) => (
               <div key={i} className="flex items-center gap-1">
                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div> 
                 {d.name}
               </div>
             ))}
          </div>
        </div>

        {/* Risk Profile Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Risk Exposure</h3>
          <div className="flex-1 min-h-[200px] relative">
             {openRisks.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm text-center">
                 No Open Risks.<br/>Great job or missing data?
               </div>
             ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskChartData}>
                  <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: 'none'}} 
                    itemStyle={{color: '#fff'}}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {riskChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
             )}
          </div>
        </div>

        {/* Schedule Snapshot */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {projectData.schedule
              .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
              .slice(0, 4)
              .map((task) => {
                const isDelayed = task.actualProgress < task.expectedProgress;
                return (
                <div key={task.id} className={`p-3 rounded-lg border ${isDelayed ? 'bg-amber-900/20 border-amber-900/50' : 'bg-slate-900/50 border-slate-700/50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-semibold text-white">{task.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                         Due: {task.endDate} 
                         {isDelayed && task.delayReason && (
                           <span className="text-amber-500 flex items-center gap-0.5 ml-2" title={task.delayReason}>
                             <AlertTriangle size={10} /> Delayed
                           </span>
                         )}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                       <span className={isDelayed ? 'text-amber-400 font-bold' : 'text-cyan-400'}>{task.actualProgress}%</span> / {task.expectedProgress}%
                    </div>
                  </div>
                  
                  <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
                     {/* Expected Marker (Background for Actual) */}
                     <div className="absolute h-full bg-slate-500/30" style={{width: `${task.expectedProgress}%`}}></div>
                     {/* Actual Progress */}
                     <div 
                        className={`absolute h-full ${isDelayed ? 'bg-amber-500' : 'bg-cyan-500'}`} 
                        style={{width: `${task.actualProgress}%`}}
                     ></div>
                  </div>
                  {isDelayed && task.delayReason && (
                    <div className="mt-2 text-[10px] text-amber-400/80 italic border-l-2 border-amber-500/50 pl-2">
                      "{task.delayReason}"
                    </div>
                  )}
                </div>
              )})}
            {projectData.schedule.length === 0 && (
               <div className="text-slate-500 text-sm italic">No tasks scheduled.</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl">
        <h4 className="text-indigo-300 font-bold mb-2">💡 Assessor Insight</h4>
        <p className="text-slate-300 text-sm">
          {complianceLevel === 'Level 3' 
            ? "Excellent! Your project shows strong evidence of process institutionalization. Ensure all 'Tailoring' is documented in your Project Plan."
            : delayedTasks > 0 
               ? "Process Warning: You have delayed tasks compared to the baseline plan. For Level 3 compliance, ensure you have a recorded 'Delay Reason' and an updated feasibility study (BP9)."
               : "To reach Level 3, ensure all Work Products are not just 'Done' but reviewed and released according to the Standard Process."
          }
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
