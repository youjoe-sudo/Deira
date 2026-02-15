
import React from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface HeroProps {
  onExplore: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onExplore, lang }) => {
  const t = translations[lang];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-emerald-50 dark:bg-emerald-950 transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 dark:bg-emerald-400/5 rounded-bl-[100px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold mb-6">
            {lang === 'ar' ? 'مستقبل التعبئة المستدامة' : 'Future of Sustainable Packaging'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-emerald-950 dark:text-emerald-50 leading-tight mb-6">
            {t.hero_title} <br />
            <span className="text-emerald-600 dark:text-emerald-400 font-black italic">{t.slogan}</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-emerald-200 mb-10 leading-relaxed max-w-2xl">
            {t.hero_desc}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 ${t.dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
            <button 
              onClick={onExplore}
              className="px-10 py-5 bg-emerald-600 text-white rounded-2xl text-lg font-bold shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 hover:-translate-y-1 transition-all"
            >
              {t.hero_start}
            </button>
            <button className="px-10 py-5 bg-white dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 border-2 border-emerald-100 dark:border-emerald-800 rounded-2xl text-lg font-bold hover:bg-emerald-50 dark:hover:bg-emerald-800 transition-all">
              {t.hero_video}
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-emerald-900 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1000" 
              alt="Sustainable Packaging" 
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
