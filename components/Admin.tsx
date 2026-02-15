
import React, { useState } from 'react';
import { DIYProject, Language } from '../types';
import { translations } from '../services/translations';

interface AdminProps {
  lang: Language;
  onProjectsUpdate: (projects: DIYProject[]) => void;
  currentProjects: DIYProject[];
}

const Admin: React.FC<AdminProps> = ({ lang, onProjectsUpdate, currentProjects }) => {
  const t = translations[lang];
  const [newProject, setNewProject] = useState<Partial<DIYProject>>({
    title: '',
    description: '',
    category: 'cardboard',
    difficulty: 'easy',
    imageUrl: '',
    steps: ['']
  });

  const handleAddStep = () => {
    setNewProject({ ...newProject, steps: [...(newProject.steps || []), ''] });
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...(newProject.steps || [])];
    newSteps[index] = value;
    setNewProject({ ...newProject, steps: newSteps });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const project: DIYProject = {
      id: Date.now().toString(),
      title: newProject.title!,
      description: newProject.description!,
      category: newProject.category as any,
      difficulty: newProject.difficulty as any,
      imageUrl: newProject.imageUrl || 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=400',
      steps: (newProject.steps || []).filter(s => s.trim() !== '')
    };

    onProjectsUpdate([...currentProjects, project]);
    setNewProject({ title: '', description: '', category: 'cardboard', difficulty: 'easy', imageUrl: '', steps: [''] });
  };

  const handleDelete = (id: string) => {
    onProjectsUpdate(currentProjects.filter(p => p.id !== id));
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50">{t.admin_title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-emerald-900 p-8 rounded-[32px] shadow-xl border border-stone-100 dark:border-emerald-800 sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-emerald-800 dark:text-emerald-400">{t.admin_add}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.admin_form_title}</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.admin_form_cat}</label>
                  <select 
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 outline-none dark:text-white"
                  >
                    <option value="cardboard">Cardboard</option>
                    <option value="paper">Paper</option>
                    <option value="wood">Wood</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.admin_form_diff}</label>
                  <select 
                    value={newProject.difficulty}
                    onChange={e => setNewProject({...newProject, difficulty: e.target.value as any})}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 outline-none dark:text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.admin_form_img}</label>
                <input 
                  type="text" 
                  value={newProject.imageUrl}
                  onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.admin_form_desc}</label>
                <textarea 
                  rows={2}
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-emerald-950 border border-stone-100 dark:border-emerald-800 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{t.admin_form_steps}</label>
                {newProject.steps?.map((step, idx) => (
                  <input 
                    key={idx}
                    type="text"
                    value={step}
                    onChange={e => handleStepChange(idx, e.target.value)}
                    placeholder={`Step ${idx + 1}`}
                    className="w-full p-2 mb-2 rounded-lg bg-emerald-50 dark:bg-emerald-800 border-none outline-none dark:text-white text-sm"
                  />
                ))}
                <button 
                  type="button" 
                  onClick={handleAddStep}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  + {t.admin_form_add_step}
                </button>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg"
              >
                {t.admin_save}
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-2xl font-bold mb-6 text-slate-400">{t.admin_list}</h3>
          {currentProjects.map(p => (
            <div key={p.id} className="bg-white dark:bg-emerald-900 p-6 rounded-3xl shadow-md border border-stone-50 dark:border-emerald-800 flex items-center gap-6">
              <img src={p.imageUrl} alt="" className="w-20 h-20 rounded-2xl object-cover shrink-0" />
              <div className="flex-grow">
                <h4 className="font-bold text-emerald-950 dark:text-emerald-50">{p.title}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-md font-bold uppercase">{p.category}</span>
                  <span className="text-xs px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 rounded-md font-bold uppercase">{p.difficulty}</span>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(p.id)}
                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
