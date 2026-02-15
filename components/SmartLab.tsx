
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface SmartLabProps {
  lang: Language;
}

const SmartLab: React.FC<SmartLabProps> = ({ lang }) => {
  const [active3R, setActive3R] = useState<string | null>(null);
  const t = translations[lang];

  const cards3R = [
    {
      id: 'reduce',
      title: t.lab_reduce_title,
      description: t.lab_reduce_desc,
      icon: '📏',
      example: lang === 'ar' ? 'تخيل صندوق كرتون ينكمش تلقائياً ليناسب هاتفك المحمول بدقة!' : 'Imagine a box that shrinks automatically to fit your phone perfectly!'
    },
    {
      id: 'reuse',
      title: t.lab_reuse_title,
      description: t.lab_reuse_desc,
      icon: '🔄',
      example: lang === 'ar' ? 'محطات إعادة الملء لمساحيق التنظيف في السوبر ماركت.' : 'Refill stations for detergents at your local supermarket.'
    },
    {
      id: 'recycle',
      title: t.lab_recycle_title,
      description: t.lab_recycle_desc,
      icon: '♻️',
      example: lang === 'ar' ? 'تحويل زجاجات المياه القديمة إلى خيوط لصناعة الملابس.' : 'Turning old water bottles into recycled fibers for clothes.'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">{t.lab_title}</h2>
        <p className="text-xl text-slate-600 dark:text-emerald-200">{t.lab_desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {cards3R.map((card) => (
          <div 
            key={card.id}
            onClick={() => setActive3R(card.id)}
            className={`cursor-pointer p-8 rounded-3xl transition-all duration-500 border-2 transform hover:-translate-y-2 ${
              active3R === card.id 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xl scale-105' 
                : 'bg-white dark:bg-emerald-900 text-slate-800 dark:text-emerald-50 border-stone-100 dark:border-emerald-800 shadow-xl hover:border-emerald-200'
            }`}
          >
            <div className="text-5xl mb-6">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className={active3R === card.id ? 'text-emerald-50' : 'text-slate-600 dark:text-emerald-200'}>
              {card.description}
            </p>
            
            {active3R === card.id && (
              <div className="mt-6 pt-6 border-t border-white/20 animate-fade-in">
                <p className="font-semibold italic">{lang === 'ar' ? 'مثال عملي:' : 'Practical Example:'}</p>
                <p>{card.example}</p>
                {card.id === 'reduce' && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-lg animate-shrink-grow"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-emerald-900 rounded-[40px] p-12 shadow-2xl border border-stone-50 dark:border-emerald-800 overflow-hidden relative">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-amber-100 dark:bg-amber-900/20 rounded-full -z-0 blur-3xl opacity-50"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-6">{t.lab_bio_title}</h3>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors items-start">
                <div className="w-12 h-12 shrink-0 bg-white dark:bg-emerald-800 rounded-full flex items-center justify-center text-2xl shadow-sm">🍄</div>
                <div>
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300">{t.lab_mushrooms_title}</h4>
                  <p className="text-slate-600 dark:text-emerald-100 text-sm">{t.lab_mushrooms_desc}</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-stone-900/40 hover:bg-amber-100 dark:hover:bg-emerald-800 transition-colors items-start">
                <div className="w-12 h-12 shrink-0 bg-white dark:bg-emerald-800 rounded-full flex items-center justify-center text-2xl shadow-sm">🌾</div>
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-300">{t.lab_sugar_title}</h4>
                  <p className="text-slate-600 dark:text-emerald-100 text-sm">{t.lab_sugar_desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-emerald-50 dark:border-emerald-800">
            <img 
              src="https://images.unsplash.com/photo-1610423023910-399516629a8a?auto=format&fit=crop&q=80&w=800" 
              alt="Bio materials" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shrink-grow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.4); }
        }
        .animate-shrink-grow {
          animation: shrink-grow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SmartLab;
