
import React, { useState } from 'react';
import { ProjectData, WorkProduct, Risk, ScheduleTask } from '../types';
import { Plus, Trash2, Save, FileText, AlertTriangle, Calendar, Briefcase, Clock, ArrowRight } from 'lucide-react';

interface WorkspaceProps {
  data: ProjectData;
  onUpdate: (data: ProjectData) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ data, onUpdate }) => {
  // Local state management for form inputs
  const [activeSection, setActiveSection] = useState<'info' | 'wps' | 'risks' | 'schedule'>('info');

  // Helper to update specific parts of the data tree
  const updateInfo = (field: string, value: string) => {
    onUpdate({ ...data, info: { ...data.info, [field]: value } });
  };

  // Work Product Handlers
  const addWP = () => {
    const newWP: WorkProduct = {
      id: Date.now().toString(),
      name: 'New Work Product',
      type: 'Plan',
      status: 'Draft',
      owner: data.info.manager || 'PM'
    };
    onUpdate({ ...data, workProducts: [...data.workProducts, newWP] });
  };

  const updateWP = (id: string, field: keyof WorkProduct, value: any) => {
    const updated = data.workProducts.map(wp => wp.id === id ? { ...wp, [field]: value } : wp);
    onUpdate({ ...data, workProducts: updated });
  };

  const deleteWP = (id: string) => {
    onUpdate({ ...data, workProducts: data.workProducts.filter(wp => wp.id !== id) });
  };

  // Risk Handlers
  const addRisk = () => {
    const newRisk: Risk = {
      id: Date.now().toString(),
      description: 'New Identified Risk',
      impact: 'Medium',
      probability: 'Medium',
      status: 'Open',
      mitigationPlan: 'TBD'
    };
    onUpdate({ ...data, risks: [...data.risks, newRisk] });
  };

  const updateRisk = (id: string, field: keyof Risk, value: any) => {
    const updated = data.risks.map(r => r.id === id ? { ...r, [field]: value } : r);
    onUpdate({ ...data, risks: updated });
  };

  const deleteRisk = (id: string) => {
    onUpdate({ ...data, risks: data.risks.filter(r => r.id !== id) });
  };

  // Schedule Handlers
  const addTask = () => {
    const newTask: ScheduleTask = {
      id: Date.now().toString(),
      name: 'New Task',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      expectedProgress: 0,
      actualProgress: 0,
      delayReason: '',
      assignedTo: 'Team'
    };
    onUpdate({ ...data, schedule: [...data.schedule, newTask] });
  };

  const updateTask = (id: string, field: keyof ScheduleTask, value: any) => {
    const updated = data.schedule.map(t => t.id === id ? { ...t, [field]: value } : t);
    onUpdate({ ...data, schedule: updated });
  };

  const deleteTask = (id: string) => {
    onUpdate({ ...data, schedule: data.schedule.filter(t => t.id !== id) });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Briefcase className="text-indigo-400"/> Project Workspace
          </h2>
          <p className="text-slate-400">Manage your Project Charter, Risks, and Schedule manually.</p>
        </div>
        <div className="bg-slate-800 p-1 rounded-lg flex gap-1 border border-slate-700">
          <TabButton active={activeSection === 'info'} onClick={() => setActiveSection('info')} icon={FileText} label="Details" />
          <TabButton active={activeSection === 'wps'} onClick={() => setActiveSection('wps')} icon={Save} label="Work Products" />
          <TabButton active={activeSection === 'risks'} onClick={() => setActiveSection('risks')} icon={AlertTriangle} label="Risk Register" />
          <TabButton active={activeSection === 'schedule'} onClick={() => setActiveSection('schedule')} icon={Calendar} label="Schedule" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pr-2 pb-20">
        {/* SECTION: PROJECT INFO */}
        {activeSection === 'info' && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Project Charter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Project Name</label>
                <input 
                  type="text" 
                  value={data.info.name}
                  onChange={(e) => updateInfo('name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Project Manager</label>
                <input 
                  type="text" 
                  value={data.info.manager}
                  onChange={(e) => updateInfo('manager', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Customer / OEM</label>
                <input 
                  type="text" 
                  value={data.info.customer}
                  onChange={(e) => updateInfo('customer', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Start Date</label>
                <input 
                  type="date" 
                  value={data.info.startDate}
                  onChange={(e) => updateInfo('startDate', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-slate-400">Project Description / Scope</label>
                <textarea 
                  value={data.info.description}
                  onChange={(e) => updateInfo('description', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white h-24"
                  placeholder="Define the scope boundaries..."
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION: WORK PRODUCTS */}
        {activeSection === 'wps' && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fadeIn">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <h3 className="text-xl font-bold text-white">Work Product Management</h3>
              <button onClick={addWP} className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                <Plus size={16} /> Add WP
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-3 rounded-tl-lg">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-tr-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.workProducts.map(wp => (
                    <tr key={wp.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="p-3">
                        <input 
                          value={wp.name} 
                          onChange={(e) => updateWP(wp.id, 'name', e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-slate-500 focus:border-cyan-500 focus:outline-none w-full text-white"
                        />
                      </td>
                      <td className="p-3">
                        <select 
                          value={wp.type}
                          onChange={(e) => updateWP(wp.id, 'type', e.target.value)}
                          className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 text-xs"
                        >
                          <option value="Plan">Plan</option>
                          <option value="Report">Report</option>
                          <option value="Specification">Specification</option>
                          <option value="Record">Record</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input 
                          value={wp.owner} 
                          onChange={(e) => updateWP(wp.id, 'owner', e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-slate-500 focus:border-cyan-500 focus:outline-none w-24 text-slate-300"
                        />
                      </td>
                      <td className="p-3">
                         <select 
                          value={wp.status}
                          onChange={(e) => updateWP(wp.id, 'status', e.target.value)}
                          className={`rounded px-2 py-1 text-xs font-bold border border-slate-600 ${
                            wp.status === 'Released' ? 'bg-emerald-900 text-emerald-400' :
                            wp.status === 'Baselined' ? 'bg-blue-900 text-blue-400' :
                            wp.status === 'In Review' ? 'bg-amber-900 text-amber-400' :
                            'bg-slate-700 text-slate-400'
                          }`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="In Review">In Review</option>
                          <option value="Baselined">Baselined</option>
                          <option value="Released">Released</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => deleteWP(wp.id)} className="text-red-400 hover:text-red-300 p-1 hover:bg-red-900/30 rounded">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.workProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500 italic">No Work Products defined. Add one to track L3 compliance.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: RISKS */}
        {activeSection === 'risks' && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fadeIn">
             <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <h3 className="text-xl font-bold text-white">Risk Register</h3>
              <button onClick={addRisk} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                <Plus size={16} /> Add Risk
              </button>
            </div>

            <div className="grid gap-4">
              {data.risks.map(risk => (
                <div key={risk.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 relative group">
                   <button onClick={() => deleteRisk(risk.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                   </button>
                   <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-5">
                        <label className="text-xs text-slate-500 uppercase font-bold">Description</label>
                        <textarea 
                          value={risk.description}
                          onChange={(e) => updateRisk(risk.id, 'description', e.target.value)}
                          className="w-full bg-transparent border border-slate-700 rounded p-2 text-white text-sm mt-1 h-20"
                        />
                      </div>
                      <div className="md:col-span-2">
                         <label className="text-xs text-slate-500 uppercase font-bold">Impact</label>
                         <select 
                            value={risk.impact}
                            onChange={(e) => updateRisk(risk.id, 'impact', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-sm mt-1 text-white"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                      </div>
                      <div className="md:col-span-2">
                         <label className="text-xs text-slate-500 uppercase font-bold">Probability</label>
                         <select 
                            value={risk.probability}
                            onChange={(e) => updateRisk(risk.id, 'probability', e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-sm mt-1 text-white"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                      </div>
                      <div className="md:col-span-3">
                         <label className="text-xs text-slate-500 uppercase font-bold">Mitigation & Status</label>
                         <div className="flex flex-col gap-2 mt-1">
                            <select 
                              value={risk.status}
                              onChange={(e) => updateRisk(risk.id, 'status', e.target.value)}
                              className={`w-full border border-slate-600 rounded p-1 text-sm font-bold ${
                                risk.status === 'Open' ? 'bg-red-900 text-red-200' : 
                                risk.status === 'Mitigated' ? 'bg-amber-900 text-amber-200' : 
                                'bg-green-900 text-green-200'
                              }`}
                            >
                              <option value="Open">Open</option>
                              <option value="Mitigated">Mitigated</option>
                              <option value="Closed">Closed</option>
                            </select>
                            <input 
                              value={risk.mitigationPlan}
                              onChange={(e) => updateRisk(risk.id, 'mitigationPlan', e.target.value)}
                              placeholder="Mitigation Plan..."
                              className="w-full bg-transparent border-b border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                            />
                         </div>
                      </div>
                   </div>
                </div>
              ))}
              {data.risks.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
                  No risks identified. Add risks to calculate risk exposure.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: SCHEDULE */}
        {activeSection === 'schedule' && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fadeIn">
             <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-2">
              <h3 className="text-xl font-bold text-white">Schedule & Progress Tracking</h3>
              <button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold">
                <Plus size={16} /> Add Task
              </button>
            </div>
            
            <div className="space-y-4">
              {data.schedule.map(task => (
                <div key={task.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative group">
                   {/* Delete Button */}
                   <button onClick={() => deleteTask(task.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                   </button>

                   {/* Header Info */}
                   <div className="flex flex-col md:flex-row gap-4 mb-4 pr-8">
                      <div className="flex-1">
                          <label className="text-xs text-slate-500 font-bold uppercase">Task Name</label>
                          <input 
                            value={task.name}
                            onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                            className="bg-transparent font-bold text-lg text-white w-full focus:outline-none border-b border-transparent focus:border-indigo-500 placeholder:text-slate-600"
                            placeholder="Task Name"
                          />
                      </div>
                      <div className="w-full md:w-48">
                          <label className="text-xs text-slate-500 font-bold uppercase">Assigned To</label>
                          <input 
                            value={task.assignedTo}
                            onChange={(e) => updateTask(task.id, 'assignedTo', e.target.value)}
                            className="bg-slate-800 rounded border border-slate-600 px-2 py-1 w-full text-sm text-white"
                          />
                      </div>
                   </div>

                   {/* Dates Grid */}
                   <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                         <label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                           <Calendar size={12}/> Start Date
                         </label>
                         <input 
                            type="date" 
                            value={task.startDate}
                            onChange={(e) => updateTask(task.id, 'startDate', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-3 py-2 w-full text-sm text-white"
                          />
                      </div>
                      <div>
                         <label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                           <Calendar size={12}/> End Date
                         </label>
                         <input 
                            type="date" 
                            value={task.endDate}
                            onChange={(e) => updateTask(task.id, 'endDate', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-3 py-2 w-full text-sm text-white"
                          />
                      </div>
                   </div>

                   {/* Progress Tracking */}
                   <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="uppercase font-bold tracking-wider">Progress Tracking</span>
                        <div className="flex gap-4">
                           <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-500 rounded-full"></div> Expected: {task.expectedProgress}%</span>
                           <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-500 rounded-full"></div> Actual: {task.actualProgress}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Expected Slider */}
                        <div>
                           <label className="text-xs text-slate-500 mb-1 block">Expected %</label>
                           <div className="flex items-center gap-2">
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={task.expectedProgress}
                                onChange={(e) => updateTask(task.id, 'expectedProgress', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
                              />
                              <input 
                                type="number" 
                                value={task.expectedProgress}
                                onChange={(e) => updateTask(task.id, 'expectedProgress', parseInt(e.target.value))}
                                className="w-12 bg-slate-900 border border-slate-600 rounded text-center text-xs py-1"
                              />
                           </div>
                        </div>

                        {/* Actual Slider */}
                        <div>
                           <label className="text-xs text-cyan-500 mb-1 block">Actual %</label>
                           <div className="flex items-center gap-2">
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={task.actualProgress}
                                onChange={(e) => updateTask(task.id, 'actualProgress', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                              />
                              <input 
                                type="number" 
                                value={task.actualProgress}
                                onChange={(e) => updateTask(task.id, 'actualProgress', parseInt(e.target.value))}
                                className="w-12 bg-slate-900 border border-cyan-600 rounded text-center text-xs py-1 text-cyan-400 font-bold"
                              />
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Delay Reason */}
                   <div>
                      <label className={`text-xs font-bold uppercase flex items-center gap-1 mb-1 ${task.actualProgress < task.expectedProgress ? 'text-amber-500' : 'text-slate-500'}`}>
                        <Clock size={12}/> Delay Reason / Notes
                      </label>
                      <input 
                        value={task.delayReason}
                        onChange={(e) => updateTask(task.id, 'delayReason', e.target.value)}
                        className={`w-full bg-slate-800 border rounded px-3 py-2 text-sm text-white placeholder:text-slate-600 ${task.actualProgress < task.expectedProgress ? 'border-amber-500/50 focus:border-amber-500' : 'border-slate-600 focus:border-indigo-500'}`}
                        placeholder={task.actualProgress < task.expectedProgress ? "Why is this task behind schedule?" : "Optional notes..."}
                      />
                   </div>
                </div>
              ))}

              {data.schedule.length === 0 && (
                <div className="text-center p-12 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <Calendar size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Tasks Defined</h3>
                  <p className="text-slate-400 text-sm mt-1">Create a schedule to track progress and identify delays.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
      active 
        ? 'bg-slate-700 text-white shadow-sm' 
        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
    }`}
  >
    <Icon size={16} />
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default Workspace;
