
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface FAQProps {
  lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[lang];

  const faqs = lang === 'ar' ? [
    { q: "ما هو مشروع ديرة؟", a: "ديرة هي منصة عربية تهدف لتعزيز ثقافة الاقتصاد الدائري." },
    { q: "هل التصاميم مجانية؟", a: "نعم، جميع الخطوات في ورشة ديرة مجانية ومتاحة للجميع." }
  ] : [
    { q: "What is Deira?", a: "Deira is a platform aimed at promoting the circular economy." },
    { q: "Are designs free?", a: "Yes, all DIY steps on Deira are free and available for everyone." }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">{t.faq_title}</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-emerald-900 rounded-2xl border border-stone-200 dark:border-emerald-800 overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full flex justify-between items-center p-6 ${t.dir === 'rtl' ? 'text-right' : 'text-left'} font-bold text-lg text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition-colors`}
            >
              <span>{faq.q}</span>
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {openIndex === index && (
              <div className="p-6 pt-0 text-slate-600 dark:text-emerald-100 leading-relaxed border-t border-stone-50 dark:border-emerald-800">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
