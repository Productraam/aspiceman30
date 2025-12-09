import React, { useState } from 'react';
import { SIM_SCENARIOS } from '../constants';
import { SimState } from '../types';
import { 
  Play, 
  RefreshCw, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Briefcase,
  Clock,
  Award,
  Zap
} from 'lucide-react';

const INITIAL_STATE: SimState = {
  turn: 0,
  budget: 100,
  schedule: 100,
  quality: 100,
  complianceL3: 50,
  log: [],
  gameOver: false
};

const SimulationGame: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [gameState, setGameState] = useState<SimState>(INITIAL_STATE);
  const [feedbackData, setFeedbackData] = useState<{
    text: string;
    impact: { budget: number; schedule: number; quality: number; complianceL3: number };
  } | null>(null);

  const currentScenario = SIM_SCENARIOS[gameState.turn];

  const startGame = () => {
    setStarted(true);
    setGameState(INITIAL_STATE);
    setFeedbackData(null);
  };

  const handleChoice = (optionIndex: number) => {
    if (gameState.gameOver || feedbackData) return;

    const option = currentScenario.options[optionIndex];
    
    // Show feedback first
    setFeedbackData({
      text: option.feedback,
      impact: option.impact
    });

    // Apply changes in background (will be reflected when user clicks "Next")
  };

  const advanceTurn = () => {
    if (!feedbackData) return;

    const impact = feedbackData.impact;
    const newState = {
      ...gameState,
      budget: Math.max(0, Math.min(100, gameState.budget + impact.budget)),
      schedule: Math.max(0, Math.min(100, gameState.schedule + impact.schedule)),
      quality: Math.max(0, Math.min(100, gameState.quality + impact.quality)),
      complianceL3: Math.max(0, Math.min(100, gameState.complianceL3 + impact.complianceL3)),
      turn: gameState.turn + 1,
      log: [...gameState.log, `Scenario ${gameState.turn + 1}: ${feedbackData.text.substring(0, 50)}...`]
    };

    setFeedbackData(null);

    if (newState.turn >= SIM_SCENARIOS.length || newState.budget <= 0 || newState.schedule <= 0) {
      newState.gameOver = true;
    }

    setGameState(newState);
  };

  if (!started) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-cyan-500/30 animate-pulse">
             <Zap size={40} className="text-cyan-400" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">ASPICE <span className="text-cyan-400">PROVING GROUNDS</span></h1>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Step into the shoes of a Project Manager. You will face real-world scenarios requiring you to balance 
            <span className="text-emerald-400 font-bold"> Cost</span>, 
            <span className="text-blue-400 font-bold"> Schedule</span>, and 
            <span className="text-indigo-400 font-bold"> Quality</span> while strictly adhering to the 
            <span className="text-amber-400 font-bold"> Level 3 Standard Process</span>.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 text-left bg-slate-800/50 p-6 rounded-xl border border-slate-700">
             <div className="flex items-center gap-3">
               <ShieldAlert className="text-red-400" />
               <span className="text-slate-300 text-sm">One fatal mistake can end the project.</span>
             </div>
             <div className="flex items-center gap-3">
               <Activity className="text-cyan-400" />
               <span className="text-slate-300 text-sm">Assessor watches every move.</span>
             </div>
             <div className="flex items-center gap-3">
               <TrendingUp className="text-emerald-400" />
               <span className="text-slate-300 text-sm">Tailoring is encouraged, cheating is not.</span>
             </div>
             <div className="flex items-center gap-3">
               <Briefcase className="text-indigo-400" />
               <span className="text-slate-300 text-sm">5 Scenarios to prove your worth.</span>
             </div>
          </div>

          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg shadow-cyan-500/25 transform hover:scale-105 transition-all flex items-center gap-3 mx-auto"
          >
            <Play fill="currentColor" /> INITIALIZE SIMULATION
          </button>
        </div>
      </div>
    );
  }

  if (gameState.gameOver) {
     const score = gameState.complianceL3;
     const isWin = score >= 70 && gameState.budget > 0 && gameState.schedule > 0;
     
     return (
       <div className="h-full flex flex-col items-center justify-center text-center p-6">
         <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 border-4 ${isWin ? 'bg-emerald-900/20 border-emerald-500' : 'bg-red-900/20 border-red-500'}`}>
            {isWin ? <Award size={64} className="text-emerald-400" /> : <ShieldAlert size={64} className="text-red-400" />}
         </div>
         
         <h2 className="text-4xl font-bold text-white mb-2">SIMULATION COMPLETE</h2>
         <h3 className={`text-2xl font-mono font-bold mb-6 ${isWin ? 'text-emerald-400' : 'text-red-400'}`}>
           STATUS: {isWin ? 'LEVEL 3 ESTABLISHED' : 'PROCESS FAILED'}
         </h3>

         <div className="grid grid-cols-4 gap-4 mb-8 w-full max-w-3xl">
            <ScoreCard label="Budget" value={gameState.budget} color="emerald" />
            <ScoreCard label="Schedule" value={gameState.schedule} color="blue" />
            <ScoreCard label="Quality" value={gameState.quality} color="purple" />
            <ScoreCard label="L3 Score" value={gameState.complianceL3} color="amber" />
         </div>

         <div className="bg-slate-800 p-6 rounded-xl max-w-2xl w-full mb-8 text-left border border-slate-700">
            <h4 className="text-slate-400 text-sm uppercase font-bold mb-4">Assessor's Final Report</h4>
            <p className="text-slate-200 leading-relaxed">
              {isWin 
                ? "Outstanding performance. You demonstrated that process adherence helps, rather than hinders, project success. Your ability to document tailoring decisions while maintaining traceability is exemplary."
                : "The project suffered due to lack of process discipline. While you may have tried to save time or money, the lack of evidence and traceability means you failed the audit. Remember: If it isn't documented, it didn't happen."}
            </p>
         </div>

         <button 
           onClick={startGame}
           className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold"
         >
           <RefreshCw size={20} /> Restart Simulation
         </button>
       </div>
     );
  }

  return (
    <div className="h-full flex flex-col pb-4 max-w-6xl mx-auto">
      {/* HUD / Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBar label="Budget" value={gameState.budget} icon={Briefcase} color="bg-emerald-500" />
        <StatBar label="Schedule" value={gameState.schedule} icon={Clock} color="bg-blue-500" />
        <StatBar label="Quality" value={gameState.quality} icon={CheckCircle2} color="bg-indigo-500" />
        <StatBar label="L3 Compliance" value={gameState.complianceL3} icon={Award} color="bg-amber-500" />
      </div>

      {/* Main Stage */}
      <div className="flex-1 relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Scenario Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative z-10">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
           
           <div className="mb-8">
             <span className="inline-block px-3 py-1 rounded bg-slate-900 text-cyan-400 text-xs font-mono border border-cyan-900 mb-4">
               SCENARIO {gameState.turn + 1} / {SIM_SCENARIOS.length}
             </span>
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
               {currentScenario.title}
             </h2>
             <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
               {currentScenario.description}
             </p>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
             {currentScenario.options.map((opt, idx) => (
               <button
                 key={idx}
                 onClick={() => handleChoice(idx)}
                 disabled={!!feedbackData}
                 className="text-left p-6 rounded-xl bg-slate-700/50 hover:bg-slate-700 border-2 border-transparent hover:border-cyan-500/50 transition-all group relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="flex items-start gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400 font-bold group-hover:text-white group-hover:border-cyan-500 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div>
                      <span className="text-slate-200 group-hover:text-white font-medium text-lg">{opt.text}</span>
                    </div>
                 </div>
               </button>
             ))}
           </div>
        </div>

        {/* Feedback Overlay (Modal-ish) */}
        {feedbackData && (
          <div className="absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-fadeIn">
            <div className="max-w-2xl w-full bg-slate-800 rounded-2xl border border-slate-600 shadow-2xl p-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
               
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <Activity className="text-indigo-400" /> Result Analysis
               </h3>
               
               <p className="text-lg text-slate-300 mb-8 italic border-l-4 border-slate-600 pl-4 py-2">
                 "{feedbackData.text}"
               </p>

               <div className="grid grid-cols-4 gap-4 mb-8">
                 <ImpactMetric label="Budget" value={feedbackData.impact.budget} />
                 <ImpactMetric label="Time" value={feedbackData.impact.schedule} />
                 <ImpactMetric label="Quality" value={feedbackData.impact.quality} />
                 <ImpactMetric label="L3" value={feedbackData.impact.complianceL3} />
               </div>

               <button 
                 onClick={advanceTurn}
                 className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
               >
                 NEXT MISSION <ArrowRight size={20} />
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components

const StatBar = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex justify-between items-start z-10">
      <div className="flex items-center gap-2 text-slate-400 text-xs uppercase font-bold tracking-wider">
        <Icon size={14} /> {label}
      </div>
      <span className="text-xl font-mono font-bold text-white">{value}%</span>
    </div>
    <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden z-10">
      <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }}></div>
    </div>
    {/* Glow effect */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${color}`}></div>
  </div>
);

const ImpactMetric = ({ label, value }: { label: string, value: number }) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  return (
    <div className={`text-center p-3 rounded-lg border ${isNeutral ? 'border-slate-700 bg-slate-800' : isPositive ? 'border-emerald-900 bg-emerald-900/20' : 'border-red-900 bg-red-900/20'}`}>
      <div className="text-xs text-slate-500 uppercase font-bold mb-1">{label}</div>
      <div className={`text-xl font-bold flex items-center justify-center gap-1 ${isNeutral ? 'text-slate-400' : isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={16}/> : isNeutral ? null : <TrendingDown size={16}/>}
        {value > 0 ? `+${value}` : value}
      </div>
    </div>
  );
};

const ScoreCard = ({ label, value, color }: { label: string, value: number, color: string }) => {
    const colors: any = {
        emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-900/10",
        blue: "text-blue-400 border-blue-500/30 bg-blue-900/10",
        purple: "text-purple-400 border-purple-500/30 bg-purple-900/10",
        amber: "text-amber-400 border-amber-500/30 bg-amber-900/10",
    }
    return (
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${colors[color]}`}>
            <span className="text-3xl font-bold font-mono mb-1">{value}</span>
            <span className="text-xs uppercase tracking-wider opacity-70">{label}</span>
        </div>
    )
}

const ArrowRight = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
)

export default SimulationGame;