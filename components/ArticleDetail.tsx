import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { generateArticleContent } from '../services/geminiService';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = useData();
  const post = posts.find(p => p.id === id);
  
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!post) return;
      
      // If content already exists (from Admin or pre-generated), use it.
      if (post.content && post.content.length > 20) {
        setContent(post.content);
        setLoading(false);
        return;
      }

      setLoading(true);
      // Fallback: Generate content using AI
      const generated = await generateArticleContent(post.title, post.summary);
      setContent(generated);
      setLoading(false);
    };

    fetchContent();
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">文章不存在</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-500 hover:underline">返回首页</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>返回</span>
      </button>

      <header className="mb-10 border-b border-slate-100 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-zinc-500 mb-4">
           <Calendar size={16} />
           <span>{post.date}</span>
           <span className="mx-2">/</span>
           <span className="uppercase tracking-wider font-medium">{post.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-zinc-50 leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-full">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
           <Loader2 className="animate-spin text-blue-500" size={40} />
           <p className="text-slate-500 dark:text-zinc-500 animate-pulse">AI 正在撰写文章内容...</p>
        </div>
      ) : (
        <div className="min-h-[200px]">
           <MarkdownRenderer content={content || ''} />
        </div>
      )}
      
      <div className="mt-16 pt-8 border-t border-slate-100 dark:border-zinc-800">
         <p className="text-center italic text-slate-400 dark:text-zinc-600 text-sm">
           © 包包大银 · Always Tearful
         </p>
      </div>
    </div>
  );
};