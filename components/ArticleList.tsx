import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types';
import { Calendar, Tag, Loader2, ChevronDown } from 'lucide-react';
import { MomentsWidget } from './MomentsWidget';

interface ArticleListProps {
  posts: Post[];
  title?: string;
  showMoments?: boolean;
}

const PAGE_SIZE = 6;

export const ArticleList: React.FC<ArticleListProps> = ({ posts, title, showMoments }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset visible count when the category/posts list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [posts, title]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const remainingCount = posts.length - visibleCount;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate a small network delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-20 animate-fade-in">
      {showMoments && <MomentsWidget />}
      
      {title && (
        <h2 className="text-2xl font-serif font-bold mb-8 text-slate-800 dark:text-zinc-100 border-l-4 border-blue-500 pl-4 flex items-baseline justify-between">
          <span>{title}</span>
          <span className="text-xs font-sans font-normal text-slate-400 dark:text-zinc-500">
            Total {posts.length} articles
          </span>
        </h2>
      )}

      <div className="space-y-12">
        {visiblePosts.map((post) => (
          <article 
            key={post.id} 
            className="group cursor-pointer flex flex-col gap-3"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 mb-1">
              <Calendar size={14} />
              <span>{post.date}</span>
              <span className="mx-1">·</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider">
                {post.category}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
              {post.summary}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-md">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Divider effect */}
            <div className="h-px w-10 bg-slate-200 dark:bg-zinc-700 mt-6 group-hover:w-full transition-all duration-500"></div>
          </article>
        ))}

        {visiblePosts.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-zinc-600">
            <p>暂无相关文章 / No posts found.</p>
          </div>
        )}
      </div>

      {hasMore ? (
        <div className="mt-16 flex flex-col items-center gap-3">
          <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="group relative px-8 py-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full text-sm font-medium text-slate-600 dark:text-zinc-400 hover:shadow-md hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoadingMore ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>加载中...</span>
              </>
            ) : (
              <>
                <span>加载更多文章</span>
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
          <span className="text-xs text-slate-400 dark:text-zinc-600">
            显示 {visibleCount} / {posts.length} 篇 (剩余 {remainingCount} 篇)
          </span>
        </div>
      ) : posts.length > 0 && (
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-slate-200 dark:bg-zinc-800"></div>
          <p className="text-xs text-slate-400 dark:text-zinc-600 italic">
            There is nothing more to explore.
          </p>
          <div className="h-px w-12 bg-slate-200 dark:bg-zinc-800"></div>
        </div>
      )}
      
      <footer className="mt-20 text-center text-xs text-slate-400 dark:text-zinc-600 pb-8">
        <p>© 2015 - 2025 包包大银</p>
        <p className="mt-2 opacity-50">苏ICP备17075745号-1</p>
      </footer>
    </div>
  );
};