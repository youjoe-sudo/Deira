
import React, { useState, useEffect } from 'react';
import { Section, Language, Theme } from '../types';
import { translations } from '../services/translations';

interface HeaderProps {
  onNavigate: (section: Section) => void;
  activeSection: Section;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  activeSection, 
  currentLang, 
  onLangChange,
  currentTheme,
  onThemeToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav_home, id: Section.HOME },
    { name: t.nav_lab, id: Section.SMART_LAB },
    { name: t.nav_diy, id: Section.DIY_HUB },
    { name: t.nav_impact, id: Section.IMPACT },
    { name: t.nav_contact, id: Section.CONTACT },
    { name: t.nav_admin, id: Section.ADMIN },
  ];

  const handleLinkClick = (id: Section) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  const isRtl = t.dir === 'rtl';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          scrolled 
            ? 'h-16 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md shadow-lg border-emerald-100 dark:border-emerald-800' 
            : 'h-20 bg-white dark:bg-emerald-950 border-emerald-50 dark:border-emerald-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleLinkClick(Section.HOME)}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">
              {t.appName}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 lg:gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-xl text-sm lg:text-base font-bold transition-all ${
                  activeSection === link.id 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' 
                    : 'text-slate-600 dark:text-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/50'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="h-6 w-px bg-emerald-100 dark:bg-emerald-800 mx-2"></div>
            
            <div className="flex items-center gap-2">
              <select 
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value as Language)}
                className="bg-emerald-50 dark:bg-emerald-900 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 rounded-lg px-2 py-1 outline-none"
              >
                <option value="ar">AR</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
              </select>

              <button 
                onClick={onThemeToggle}
                className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800"
              >
                {currentTheme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900 text-emerald-600"
            >
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg bg-emerald-600 text-white shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[110] bg-white dark:bg-emerald-950 transition-all duration-500 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-black text-emerald-800 dark:text-emerald-400">{t.appName}</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full p-5 text-xl font-bold rounded-2xl transition-all ${
                  isRtl ? 'text-right' : 'text-left'
                } ${
                  activeSection === link.id 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'text-slate-700 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t dark:border-emerald-800">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.keys(translations).map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => {
                    onLangChange(langCode as Language);
                    setIsMenuOpen(false);
                  }}
                  className={`py-3 rounded-xl font-bold border-2 ${
                    currentLang === langCode 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-emerald-50 dark:border-emerald-900 text-slate-600 dark:text-emerald-300'
                  }`}
                >
                  {translations[langCode as Language].lang_name}
                </button>
              ))}
            </div>
            <p className="text-center font-bold text-emerald-800 dark:text-emerald-400 italic">
              "{t.slogan}"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
