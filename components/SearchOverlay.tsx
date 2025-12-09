import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText } from 'lucide-react';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, posts }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) || 
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query, posts]);

  if (!isOpen) return null;

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 rounded px-0.5">{part}</span> 
        : part
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm flex flex-col animate-fade-in">
      <div className="max-w-3xl w-full mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">搜索</h2>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
             <X size={24} className="text-slate-500 dark:text-zinc-400" />
           </button>
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章标题、内容或标签..."
            className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-zinc-800 border-none rounded-xl text-lg text-slate-800 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="overflow-y-auto h-[60vh] pr-2">
           {query && results.length === 0 && (
             <div className="text-center text-slate-400 py-10">
               没有找到与 "{query}" 相关的内容
             </div>
           )}

           {results.map(post => (
             <div 
                key={post.id} 
                onClick={() => {
                  navigate(`/post/${post.id}`);
                  onClose();
                }}
                className="group flex gap-4 p-4 mb-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
             >
                <div className="mt-1">
                  <FileText size={20} className="text-slate-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-1">
                    {highlightText(post.title, query)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-2">
                    {highlightText(post.summary, query)}
                  </p>
                  <div className="flex gap-2 mt-2">
                     <span className="text-xs bg-slate-100 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400 px-2 py-0.5 rounded">
                       {post.date}
                     </span>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};