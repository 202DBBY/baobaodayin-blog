import React, { useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { ApplyFriendModal } from './ApplyFriendModal';

export const FriendsPage: React.FC = () => {
  const { friends } = useData();
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Only show active friends
  const activeFriends = friends.filter(f => f.status === 'active');

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-zinc-100 mb-4 border-l-4 border-blue-500 pl-4">
          友链 Friends
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 pl-5">
          海内存知己，天涯若比邻。收集了一些优秀的博客，欢迎互换。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeFriends.map(friend => (
          <div 
            key={friend.id} 
            className="group relative bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-100 dark:border-zinc-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
               <img 
                 src={friend.avatar} 
                 alt={friend.name} 
                 className="w-14 h-14 rounded-full border-2 border-slate-50 dark:border-zinc-700 shadow-sm group-hover:scale-110 transition-transform duration-300"
               />
               <a 
                 href={friend.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-slate-300 hover:text-blue-500 dark:text-zinc-600 dark:hover:text-blue-400 transition-colors"
               >
                 <ExternalLink size={18} />
               </a>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {friend.name}
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
              {friend.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {friend.tags?.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-zinc-700/50 text-slate-500 dark:text-zinc-400 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Apply Card */}
        <div 
          onClick={() => setShowApplyModal(true)}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-xl text-slate-400 dark:text-zinc-600 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer group min-h-[200px]"
        >
          <Users size={32} className="mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">申请友链</span>
        </div>
      </div>

      {showApplyModal && (
        <ApplyFriendModal onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};