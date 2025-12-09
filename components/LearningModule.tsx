import React from 'react';
import { MAN3_PRACTICES } from '../constants';
import BPCard from './BPCard';

interface LearningModuleProps {
  onAskAI: (text: string) => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ onAskAI }) => {
  return (
    <div className="h-full overflow-y-auto pr-2 pb-20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Process Academy</h2>
        <p className="text-slate-400">Master the 10 Base Practices of MAN.3. Click a card to reveal L3 details.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        {MAN3_PRACTICES.map((bp) => (
          <BPCard key={bp.id} bp={bp} onAskAI={onAskAI} />
        ))}
      </div>
    </div>
  );
};

export default LearningModule;