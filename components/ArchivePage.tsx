import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, Tag } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Post } from '../types';

export const ArchivePage: React.FC = () => {
  const navigate = useNavigate();
  const { posts } = useData();

  // Helper to parse date string 'YYYY年MM月DD日'
  const parseDate = (dateStr: string) => {
    const match = dateStr.match(/(\d{4})年(\d{2})月(\d{2})日/);
    if (match) {
      return {
        year: parseInt(match[1]),
        month: parseInt(match[2]),
        day: parseInt(match[3]),
      };
    }
    return { year: 0, month: 0, day: 0 };
  };

  // Sort posts by date descending
  const sortedPosts = [...posts].sort((a, b) => {
    const da = parseDate(a.date);
    const db = parseDate(b.date);
    if (da.year !== db.year) return db.year - da.year;
    if (da.month !== db.month) return db.month - da.month;
    return db.day - da.day;
  });

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  // Group by Year -> Month
  interface MonthGroup {
    month: number;
    posts: Post[];
  }
  interface YearGroup {
    year: number;
    months: MonthGroup[];
  }

  const archiveGroups: YearGroup[] = [];

  sortedPosts.forEach(post => {
    const { year, month } = parseDate(post.date);
    if (year === 0) return;

    let yGroup = archiveGroups.find(g => g.year === year);
    if (!yGroup) {
      yGroup = { year, months: [] };
      archiveGroups.push(yGroup);
    }

    let mGroup = yGroup.months.find(m => m.month === month);
    if (!mGroup) {
      mGroup = { month, posts: [] };
      yGroup.months.push(mGroup);
    }

    mGroup.posts.push(post);
  });

  return (
    <div className="max-w-3xl mx-auto w-full pb-20 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-zinc-100 mb-6 border-l-4 border-blue-500 pl-4">
          归档 Archive
        </h1>
        
        {/* Tags Cloud */}
        <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700/50 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-xs font-bold">
            <Tag size={14} />
            <span>Tag Cloud</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-700/50 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all cursor-default select-none"
              >
                <Hash size={12} className="mr-1 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-4 md:pl-8 border-l border-slate-200 dark:border-zinc-800 space-y-12">
        {archiveGroups.map(group => (
          <div key={group.year} className="relative">
            {/* Year Label */}
            <div className="absolute -left-[calc(1rem+4px)] md:-left-[calc(2rem+4px)] top-0 flex items-center bg-gray-50 dark:bg-zinc-900 py-1 pr-2">
               <span className="text-4xl md:text-5xl font-bold font-serif text-slate-200 dark:text-zinc-800 select-none">
                 {group.year}
               </span>
            </div>

            <div className="pt-4 md:pt-6 space-y-8 relative z-10">
              {group.months.map(monthGroup => (
                <div key={monthGroup.month}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-400 ring-4 ring-white dark:ring-zinc-900"></span>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                      {monthGroup.month} 月
                    </h3>
                  </div>

                  <div className="space-y-3 pl-5 border-l border-dashed border-slate-200 dark:border-zinc-800 ml-1">
                    {monthGroup.posts.map(post => {
                      const { day } = parseDate(post.date);
                      return (
                        <div 
                          key={post.id}
                          onClick={() => navigate(`/post/${post.id}`)}
                          className="group flex items-baseline gap-4 cursor-pointer p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <span className="text-sm font-mono text-slate-400 dark:text-zinc-500 w-6 text-right flex-shrink-0">
                            {day < 10 ? `0${day}` : day}
                          </span>
                          <span className="text-base text-slate-600 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
