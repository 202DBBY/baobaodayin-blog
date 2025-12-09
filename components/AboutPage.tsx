import React from 'react';
import { Mail, Github, Twitter, MapPin, Coffee, Code, Terminal, Music, Settings, Camera, Gamepad } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Interest } from '../types';

const getInterestIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code': return <Code size={14} />;
    case 'Music': return <Music size={14} />;
    case 'Coffee': return <Coffee size={14} />;
    case 'Camera': return <Camera size={14} />;
    case 'Game': return <Gamepad size={14} />;
    default: return <Coffee size={14} />;
  }
};

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useData();

  return (
    <div className="max-w-3xl mx-auto w-full pb-20 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 mb-10 shadow-sm border border-slate-100 dark:border-zinc-700/50 flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative group/header">
        
        {/* Hidden Admin Button */}
        <button 
          onClick={() => navigate('/admin/login')}
          className="absolute top-4 right-4 text-slate-300 dark:text-zinc-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors opacity-0 group-hover/header:opacity-100"
          title="管理入口"
        >
          <Settings size={18} />
        </button>

        <div className="relative group">
           <img 
             src={profile.avatar} 
             alt="Avatar" 
             className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-50 dark:border-zinc-700 shadow-md group-hover:scale-105 transition-transform duration-500" 
           />
           <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-zinc-800"></div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-zinc-50">{profile.name}</h1>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-md">
              {profile.tagline}
            </span>
          </div>
          <p className="text-slate-500 dark:text-zinc-400 mb-6 max-w-md mx-auto md:mx-0">
            {profile.bio}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             {profile.github && (
               <a href={profile.github} className="p-2 rounded-full bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                 <Github size={20} />
               </a>
             )}
             {profile.twitter && (
               <a href={profile.twitter} className="p-2 rounded-full bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-blue-400 hover:text-white transition-all">
                 <Twitter size={20} />
               </a>
             )}
             {profile.email && (
               <a href={`mailto:${profile.email}`} className="p-2 rounded-full bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition-all">
                 <Mail size={20} />
               </a>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Column */}
        <div className="space-y-8">
          <section>
             <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
               <Terminal size={20} className="text-blue-500" /> 
               关于我
             </h2>
             <div className="prose dark:prose-invert prose-slate text-sm leading-loose">
                <MarkdownRenderer content={profile.description} />
             </div>
          </section>

          <section>
             <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
               <MapPin size={20} className="text-green-500" /> 
               坐标
             </h2>
             <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-lg flex items-center gap-4 border border-slate-100 dark:border-zinc-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500">
                  <MapPin />
                </div>
                <div>
                  <div className="font-bold text-slate-700 dark:text-zinc-200">{profile.location}</div>
                  <div className="text-xs text-slate-400">目前在此生活和工作</div>
                </div>
             </div>
          </section>
        </div>

        {/* Stats Column */}
        <div className="space-y-8">
           <section>
             <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
               <Code size={20} className="text-purple-500" /> 
               技能栈
             </h2>
             <div className="flex flex-wrap gap-2">
               {profile.skills.map(skill => (
                 <span key={skill} className="px-3 py-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md text-sm text-slate-600 dark:text-zinc-300">
                   {skill}
                 </span>
               ))}
             </div>
           </section>

           <section>
             <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
               <Coffee size={20} className="text-amber-600" /> 
               兴趣爱好
             </h2>
             <div className="space-y-3">
               {profile.interests.map((interest, index) => (
                 <div key={index} className="flex items-center justify-between text-sm">
                   <span className="flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                     {getInterestIcon(interest.icon)} {interest.name}
                   </span>
                   <div className="w-32 h-1.5 bg-slate-100 dark:bg-zinc-700 rounded-full">
                     <div 
                       className={`h-full rounded-full ${interest.color}`} 
                       style={{ width: `${interest.percent}%` }}
                     ></div>
                   </div>
                 </div>
               ))}
             </div>
           </section>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-100 dark:border-zinc-800 text-center">
         <p className="font-serif italic text-slate-400 dark:text-zinc-500">
           "{profile.quote}"
         </p>
      </div>
    </div>
  );
};