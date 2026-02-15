
import React, { useState } from 'react';
import { DIYProject, Language } from '../types';
import { translations } from '../services/translations';

interface DIYHubProps {
  lang: Language;
  projects: DIYProject[];
}

const DIYHub: React.FC<DIYHubProps> = ({ lang, projects }) => {
  const [activeTab, setActiveTab] = useState<'cardboard' | 'paper' | 'wood'>('cardboard');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<DIYProject | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number[]>>({});
  
  const t = translations[lang];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = p.category === activeTab;
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getProgress = (project: DIYProject) => {
    const doneCount = (progressMap[project.id] || []).length;
    return Math.round((doneCount / project.steps.length) * 100);
  };

  const getDifficultyColor = (diff: DIYProject['difficulty']) => {
    switch (diff) {
      case 'easy': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300';
      case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
      case 'hard': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'easy') return t.diy_diff_easy;
    if (diff === 'medium') return t.diy_diff_medium;
    if (diff === 'hard') return t.diy_diff_hard;
    return diff;
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">{t.diy_title}</h2>
        <p className="text-xl text-slate-600 dark:text-emerald-200">{t.diy_desc}</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative group">
        <div className={`absolute inset-y-0 ${t.dir === 'rtl' ? 'right-0 pr-6' : 'left-0 pl-6'} flex items-center pointer-events-none`}>
          <svg className="w-5 h-5 text-emerald-600 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.diy_search}
          className={`w-full h-16 ${t.dir === 'rtl' ? 'pr-14 pl-6' : 'pl-14 pr-6'} rounded-3xl bg-white dark:bg-emerald-900 border border-stone-200 dark:border-emerald-800 shadow-sm focus:border-emerald-500 dark:text-white outline-none transition-all text-lg`}
        />
      </div>

      <div className="flex flex-col gap-6 items-center mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {(['cardboard', 'paper', 'wood'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-emerald-800 text-slate-600 dark:text-emerald-100 border border-stone-200 dark:border-emerald-700 hover:border-emerald-300'
              }`}
            >
              {tab === 'cardboard' ? t.diy_cat_cardboard : tab === 'paper' ? t.diy_cat_paper : t.diy_cat_wood}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all border ${
                difficultyFilter === diff 
                  ? 'bg-stone-800 text-white border-stone-800 dark:bg-emerald-500 dark:border-emerald-500' 
                  : 'bg-stone-50 dark:bg-emerald-950 text-slate-500 dark:text-emerald-400 border-stone-100 dark:border-emerald-800'
              }`}
            >
              {diff === 'all' ? t.diy_diff_all : diff === 'easy' ? t.diy_diff_easy : diff === 'medium' ? t.diy_diff_medium : t.diy_diff_hard}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const projectProgress = getProgress(project);
            return (
              <div key={project.id} className="bg-white dark:bg-emerald-900 rounded-3xl overflow-hidden shadow-xl border border-stone-100 dark:border-emerald-800 group relative flex flex-col h-full transform transition-transform hover:scale-[1.02]">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className={`absolute top-4 ${t.dir === 'rtl' ? 'right-4' : 'left-4'} px-3 py-1 rounded-full text-xs font-black shadow-sm ${getDifficultyColor(project.difficulty)}`}>
                    {getDifficultyLabel(project.difficulty)}
                  </div>
                  {projectProgress > 0 && (
                    <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {projectProgress}%
                    </div>
                  )}
                </div>
                <div className={`p-6 ${t.dir === 'rtl' ? 'text-right' : 'text-left'} flex-grow flex flex-col`}>
                  <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-emerald-200 text-sm mb-4 h-12 overflow-hidden">{project.description}</p>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="mt-auto w-full py-3 bg-stone-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    {lang === 'ar' ? 'شاهد الخطوات' : 'View Steps'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-emerald-900/40 rounded-[40px] border border-dashed border-stone-200 dark:border-emerald-800">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">{lang === 'ar' ? 'لا توجد مشاريع مضافة حالياً' : 'No projects added yet'}</h3>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-emerald-950/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-emerald-900 rounded-[40px] max-w-3xl w-full shadow-2xl relative my-auto animate-modal-pop">
            <button 
              onClick={() => setSelectedProject(null)}
              className={`absolute top-6 ${t.dir === 'rtl' ? 'left-6' : 'right-6'} z-10 w-12 h-12 bg-white dark:bg-emerald-800 rounded-full flex items-center justify-center shadow-lg hover:text-red-500 transition-all dark:text-white`}
            >✕</button>
            <div className={`p-8 md:p-12 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-3 mb-2">
                 <span className={`px-3 py-1 rounded-full text-xs font-black ${getDifficultyColor(selectedProject.difficulty)}`}>
                   {getDifficultyLabel(selectedProject.difficulty)}
                 </span>
              </div>
              <h3 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-8">{selectedProject.title}</h3>
              <div className="space-y-4">
                {selectedProject.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-4 items-start group opacity-0 animate-step-in"
                    style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}
                  >
                    <button 
                      onClick={() => {
                        const currentSteps = progressMap[selectedProject.id] || [];
                        const newSteps = currentSteps.includes(idx) ? currentSteps.filter(i => i !== idx) : [...currentSteps, idx];
                        setProgressMap({...progressMap, [selectedProject.id]: newSteps});
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 transition-all transform hover:scale-110 ${
                        (progressMap[selectedProject.id] || []).includes(idx) 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      {(progressMap[selectedProject.id] || []).includes(idx) ? '✓' : idx + 1}
                    </button>
                    <p className={`text-slate-700 dark:text-emerald-100 py-1 transition-all flex-grow ${
                       (progressMap[selectedProject.id] || []).includes(idx) ? 'opacity-50 line-through' : ''
                    }`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-pop {
          animation: modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-step-in {
          animation: stepIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DIYHub;
