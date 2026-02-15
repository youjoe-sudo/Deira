
import React, { useState, useEffect } from 'react';
import { Section, Language, Theme, DIYProject } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import SmartLab from './components/SmartLab';
import DIYHub from './components/DIYHub';
import Admin from './components/Admin';
import ImpactCalculator from './components/ImpactCalculator';
import Jimmy from './components/Jimmy';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import { translations } from './services/translations';

// Move ContactForm outside to prevent re-creation on every render
const ContactForm: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section id={Section.CONTACT} className="py-32 px-6 max-w-4xl mx-auto text-center scroll-mt-20">
      <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-8">{t.nav_contact}</h2>
      <p className="text-xl text-slate-600 dark:text-emerald-200 mb-12">{t.lab_desc}</p>
      <div className="bg-white dark:bg-emerald-900/50 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-2xl border border-emerald-50 dark:border-emerald-800">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <label className="block text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">{t.contact_name}</label>
            <input type="text" className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-emerald-50" />
          </div>
          <div className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <label className="block text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">{t.contact_email}</label>
            <input type="email" className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-emerald-50" />
          </div>
          <div className={`${t.dir === 'rtl' ? 'text-right' : 'text-left'} md:col-span-2`}>
            <label className="block text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">{t.contact_msg}</label>
            <textarea rows={4} className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-emerald-50"></textarea>
          </div>
          <button type="submit" className="md:col-span-2 w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 dark:shadow-none">
            {t.contact_send}
          </button>
        </form>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ar');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  
  const [customProjects, setCustomProjects] = useState<DIYProject[]>(() => {
    const saved = localStorage.getItem('custom_projects');
    return saved ? JSON.parse(saved) : translations[lang].projects;
  });

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('custom_projects', JSON.stringify(customProjects));
  }, [customProjects]);

  const isLandingSection = [
    Section.HOME, 
    Section.SMART_LAB, 
    Section.DIY_HUB, 
    Section.IMPACT, 
    Section.CONTACT
  ].includes(activeSection);

  // Central Navigation Logic
  useEffect(() => {
    if (isLandingSection) {
      // Use requestAnimationFrame to ensure the landing sections are rendered before scrolling
      requestAnimationFrame(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection, isLandingSection]);

  const handleProjectsUpdate = (projects: DIYProject[]) => {
    setCustomProjects(projects);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 bg-stone-50 dark:bg-emerald-950 transition-colors duration-500">
      <Header 
        onNavigate={setActiveSection} 
        activeSection={activeSection} 
        currentLang={lang} 
        onLangChange={setLang}
        currentTheme={theme}
        onThemeToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      />
      
      <main className="flex-grow pt-20">
        {isLandingSection ? (
          <div className="flex flex-col">
            <div id={Section.HOME} className="scroll-mt-24"><Hero onExplore={() => setActiveSection(Section.SMART_LAB)} lang={lang} /></div>
            <div id={Section.SMART_LAB} className="scroll-mt-24"><SmartLab lang={lang} /></div>
            <div id={Section.DIY_HUB} className="scroll-mt-24"><DIYHub lang={lang} projects={customProjects} /></div>
            <div id={Section.IMPACT} className="scroll-mt-24"><ImpactCalculator lang={lang} /></div>
            <ContactForm lang={lang} />
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeSection === Section.FAQ && <FAQ lang={lang} />}
            {activeSection === Section.PRIVACY && <PrivacyPolicy />}
            {activeSection === Section.ADMIN && <Admin lang={lang} currentProjects={customProjects} onProjectsUpdate={handleProjectsUpdate} />}
          </div>
        )}
      </main>

      <footer className="bg-emerald-950 dark:bg-black text-emerald-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-right">
          <div className={`${t.dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
            <div className={`flex items-center justify-center ${t.dir === 'rtl' ? 'md:justify-start' : 'md:justify-start'} gap-3 mb-6`}>
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-emerald-950 font-bold text-xl">{lang === 'ar' ? 'د' : 'D'}</div>
              <span className="text-3xl font-bold tracking-tight">{t.appName}</span>
            </div>
            <p className="text-emerald-300 text-lg">"{t.slogan}"</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xl mb-2">{t.footer_links}</h4>
            <button onClick={() => setActiveSection(Section.HOME)} className="hover:text-emerald-400 transition-colors w-fit mx-auto md:mr-0">{t.nav_home}</button>
            <button onClick={() => setActiveSection(Section.ADMIN)} className="hover:text-emerald-400 transition-colors w-fit mx-auto md:mr-0">{t.nav_admin}</button>
            <button onClick={() => setActiveSection(Section.FAQ)} className="hover:text-emerald-400 transition-colors w-fit mx-auto md:mr-0">{t.faq_title}</button>
            <button onClick={() => setActiveSection(Section.PRIVACY)} className="hover:text-emerald-400 transition-colors w-fit mx-auto md:mr-0">{t.privacy_title}</button>
          </div>
          
          <div className="flex flex-col gap-6">
             <h4 className="text-white font-bold text-xl mb-2">{t.footer_follow}</h4>
             <div className="flex justify-center md:justify-start gap-4">
               {['FB', 'TW', 'IG'].map(s => (
                 <div key={s} className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-colors">
                   {s}
                 </div>
               ))}
             </div>
             <p className="text-emerald-400 text-sm mt-4">© {new Date().getFullYear()} {t.appName}.</p>
          </div>
        </div>
      </footer>
      
      <Jimmy currentLang={lang} />
    </div>
  );
};

export default App;
