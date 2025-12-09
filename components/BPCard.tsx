import React, { useState } from 'react';
import { BasePractice } from '../types';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface BPCardProps {
  bp: BasePractice;
  onAskAI: (question: string) => void;
}

const BPCard: React.FC<BPCardProps> = ({ bp, onAskAI }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4 shadow-lg hover:shadow-cyan-900/20 transition-all">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white font-bold font-mono p-2 rounded-md w-12 text-center">
            {bp.id}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{bp.name}</h3>
            <p className="text-slate-400 text-sm">{bp.shortName}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-slate-700 pt-4 animate-fadeIn">
          <p className="text-slate-300">{bp.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
              <h4 className="text-cyan-400 font-bold text-sm flex items-center gap-2 mb-2">
                <BookOpen size={16} /> Inputs
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-400">
                {bp.inputs.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
              <h4 className="text-green-400 font-bold text-sm flex items-center gap-2 mb-2">
                <CheckCircle size={16} /> Outputs
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-400">
                {bp.outputs.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30">
             <h4 className="text-indigo-300 font-bold text-sm flex items-center gap-2 mb-2">
                <div className="bg-indigo-500 w-2 h-2 rounded-full animate-pulse"></div>
                Level 3 Focus (Institutionalization)
              </h4>
             <ul className="space-y-1 text-sm text-indigo-200">
                {bp.l3Criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-indigo-500">•</span> {c}
                  </li>
                ))}
             </ul>
          </div>

          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => onAskAI(`Explain ${bp.id}: ${bp.name} in the context of ASPICE L3. Give me a template example for the output.`)}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <HelpCircle size={16} /> Ask AI Assessor
            </button>
          </div>
          
          <div className="text-xs text-slate-500 mt-2">
            <span className="font-bold text-amber-500">Assessor asks:</span> {bp.assessorQuestions[0]}
          </div>
        </div>
      )}
    </div>
  );
};

export default BPCard;