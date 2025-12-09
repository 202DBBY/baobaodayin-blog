import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const MomentsWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { moments } = useData();

  const displayedMoments = isExpanded ? moments.slice(0, 3) : [moments[0]];

  return (
    <div className="mb-10 relative group">
      {/* Background Decor */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-700 overflow-hidden transition-all duration-300">
        
        {/* Header / Toggle */}
        <div 
          className="px-6 py-4 flex items-center justify-between cursor-pointer border-b border-transparent dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-750 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300 font-medium">
             <MessageCircle size={18} className="text-blue-500" />
             <span>片刻动态</span>
             <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-1">New</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Content Area */}
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[600px]' : 'max-h-24'}`}>
            {displayedMoments.map((moment, index) => (
              <div 
                key={moment.id} 
                className={`px-6 py-4 border-b border-slate-50 dark:border-zinc-700/50 last:border-0 
                            ${!isExpanded && index === 0 ? 'cursor-pointer' : ''}`}
                onClick={() => !isExpanded && setIsExpanded(true)}
              >
                <div className="flex gap-3">
                  <img src={moment.avatar} alt={moment.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-700" />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-semibold text-sm text-slate-800 dark:text-zinc-200">{moment.author}</span>
                      <span className="text-xs text-slate-400">{moment.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {moment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer Action */}
        {isExpanded && (
          <div className="px-4 py-3 bg-slate-50 dark:bg-zinc-800/50 flex justify-center border-t border-slate-100 dark:border-zinc-700">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('/moments');
              }}
              className="text-xs font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 flex items-center gap-1 px-4 py-2 hover:bg-blue-50 dark:hover:bg-zinc-700 rounded-full transition-colors"
            >
              查看更多 <MoreHorizontal size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
