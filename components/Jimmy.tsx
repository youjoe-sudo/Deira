
import React, { useState, useEffect } from 'react';
import { getJimmyAdvice } from '../services/geminiService';
import { Language } from '../types';
import { translations } from '../services/translations';

interface JimmyProps {
  currentLang: Language;
}

const Jimmy: React.FC<JimmyProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  
  const t = translations[currentLang];

  useEffect(() => {
    // Reset advice to intro whenever language changes
    setAdvice(t.jimmy_intro);
  }, [currentLang, t.jimmy_intro]);

  const fetchAdvice = async (topic: string) => {
    setLoading(true);
    const result = await getJimmyAdvice(topic, currentLang);
    setAdvice(result);
    setLoading(false);
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchAdvice(query);
      setQuery('');
    }
  };

  return (
    <div className={`fixed bottom-8 ${t.dir === 'rtl' ? 'left-8' : 'right-8'} z-[100] flex flex-col items-start gap-4`}>
      {isOpen && (
        <div className="bg-white dark:bg-emerald-900 p-6 rounded-[30px] shadow-2xl border border-stone-200 dark:border-emerald-800 w-80 animate-fade-in-up">
          <div className={`flex justify-between items-center mb-4 ${t.dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300">Jimmy AI</h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500">✕</button>
          </div>
          <div className={`bg-emerald-50 dark:bg-emerald-950 p-4 rounded-2xl mb-4 text-sm leading-relaxed text-slate-700 dark:text-emerald-100 min-h-[80px] ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {loading ? (
              <div className="flex gap-1 justify-center py-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
              </div>
            ) : advice}
          </div>
          <form onSubmit={handleAsk} className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.jimmy_placeholder}
              className={`w-full px-4 py-3 rounded-xl bg-stone-100 dark:bg-emerald-800 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none ${t.dir === 'rtl' ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left'}`}
            />
            <button type="submit" className={`absolute ${t.dir === 'rtl' ? 'left-2' : 'right-2'} top-2 text-emerald-600 hover:text-emerald-800`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${t.dir === 'rtl' ? 'rotate-90' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-3xl shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all border-4 border-white dark:border-emerald-900"
      >
        🧑‍🌾
      </button>
    </div>
  );
};

export default Jimmy;
