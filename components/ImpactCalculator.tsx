
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface ImpactCalculatorProps {
  lang: Language;
}

const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ lang }) => {
  const [items, setItems] = useState(0);
  const [type, setType] = useState('cardboard');
  const t = translations[lang];

  const calculateImpact = () => {
    const multiplier = type === 'cardboard' ? 0.8 : type === 'paper' ? 0.4 : 1.2;
    const carbonSaved = (items * multiplier).toFixed(1);
    const waterSaved = (items * multiplier * 5).toFixed(1);
    return { carbonSaved, waterSaved };
  };

  const { carbonSaved, waterSaved } = calculateImpact();

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">{t.impact_title}</h2>
        <p className="text-xl text-slate-600 dark:text-emerald-200">{t.impact_desc}</p>
      </div>

      <div className="bg-white dark:bg-emerald-900 p-10 rounded-[40px] shadow-2xl border border-stone-100 dark:border-emerald-800 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={`space-y-8 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div>
            <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-4">{t.impact_label}</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={items} 
              onChange={(e) => setItems(parseInt(e.target.value))}
              className="w-full h-3 bg-emerald-100 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="text-center mt-4 text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {items} {lang === 'ar' ? 'قطعة' : 'pieces'}
            </div>
          </div>

          <div>
            <label className="block font-bold text-emerald-900 dark:text-emerald-300 mb-4">{t.impact_material}</label>
            <div className="grid grid-cols-3 gap-3">
              {['cardboard', 'paper', 'wood'].map((m) => (
                <button
                  key={m}
                  onClick={() => setType(m)}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    type === m ? 'bg-emerald-600 text-white' : 'bg-stone-50 dark:bg-emerald-950 text-slate-500 dark:text-emerald-400 hover:bg-emerald-50'
                  }`}
                >
                  {m === 'cardboard' ? t.diy_cat_cardboard : m === 'paper' ? t.diy_cat_paper : t.diy_cat_wood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-900 dark:bg-black p-8 rounded-3xl text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <div className="text-center">
            <h4 className="text-emerald-300 font-bold mb-2">{t.impact_result_title}</h4>
            <div className="text-5xl font-black mb-1">+{carbonSaved}{lang === 'ar' ? 'كجم' : 'kg'}</div>
            <p className="text-sm opacity-80 uppercase tracking-widest">{t.impact_carbon}</p>
          </div>
          <div className="h-px bg-white/10"></div>
          <div className="text-center">
            <div className="text-5xl font-black mb-1">+{waterSaved} {lang === 'ar' ? 'لتر' : 'L'}</div>
            <p className="text-sm opacity-80 uppercase tracking-widest">{t.impact_water}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;
