import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { generateASPICEAdvice } from '../services/geminiService';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface CopilotProps {
  initialQuery?: string;
}

const Copilot: React.FC<CopilotProps> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hello! I am your ASPICE Assessor Co-Pilot. I can help you draft Work Packages, explain Feasibility Studies, or guide you on L3 Tailoring. How can I assist?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const aiResponseText = await generateASPICEAdvice(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Sparkles className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-white font-bold">ASPICE L3 Expert</h3>
          <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-indigo-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-cyan-900/30 text-cyan-100 rounded-tr-none border border-cyan-700/50' 
                : 'bg-slate-700/50 text-slate-200 rounded-tl-none border border-slate-600'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-slate-700/50 p-3 rounded-2xl rounded-tl-none border border-slate-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about MAN.3, templates, or process tailoring..."
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white p-3 rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Copilot;