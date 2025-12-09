import React, { useState, useEffect } from 'react';
import { X, Heart, MessageSquare, Send, Share2, User } from 'lucide-react';
import { Moment } from '../types';
import { useData } from '../contexts/DataContext';

interface MomentDetailModalProps {
  moment: Moment;
  onClose: () => void;
}

export const MomentDetailModal: React.FC<MomentDetailModalProps> = ({ moment, onClose }) => {
  const { likeMoment, addComment } = useData();
  const [commentText, setCommentText] = useState('');
  const [nickname, setNickname] = useState(() => localStorage.getItem('visitor_nickname') || '');

  useEffect(() => {
    localStorage.setItem('visitor_nickname', nickname);
  }, [nickname]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeMoment(moment.id);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !nickname.trim()) {
      if (!nickname.trim()) alert('请先输入昵称');
      return;
    }

    addComment(moment.id, {
      id: `c-${Date.now()}`,
      author: nickname,
      content: commentText,
      date: '刚刚'
    });
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Left Side: Content Media */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 md:hidden"
          >
            <X size={20} />
          </button>
          
          <div className="w-full h-full overflow-y-auto custom-scrollbar flex items-center justify-center p-4">
             {moment.video ? (
                <video src={moment.video} controls className="max-w-full max-h-full rounded-lg" autoPlay muted loop />
             ) : moment.images && moment.images.length > 0 ? (
                <div className={`grid gap-2 w-full ${moment.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {moment.images.map((img, i) => (
                    <img key={i} src={img} alt="content" className="w-full h-auto object-contain rounded-lg" />
                  ))}
                </div>
             ) : (
                <div className="p-8 text-white text-lg md:text-2xl font-serif text-center leading-relaxed">
                   {moment.content}
                </div>
             )}
          </div>
        </div>

        {/* Right Side: Interactions */}
        <div className="md:w-2/5 flex flex-col h-full bg-white dark:bg-zinc-900 border-l border-slate-100 dark:border-zinc-800 relative">
           {/* Header */}
           <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                 <img src={moment.avatar} alt={moment.author} className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700" />
                 <div>
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 text-sm">{moment.author}</h3>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">{moment.date}</p>
                 </div>
              </div>
              <button onClick={onClose} className="hidden md:block p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300">
                <X size={24} />
              </button>
           </div>

           {/* Content Text (If media present, showing text here is good context) */}
           {(moment.video || (moment.images && moment.images.length > 0)) && (
             <div className="p-4 text-sm text-slate-700 dark:text-zinc-300 border-b border-slate-100 dark:border-zinc-800 flex-shrink-0">
                {moment.content}
             </div>
           )}

           {/* Comments List */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50 dark:bg-zinc-900/50">
              {(!moment.comments || moment.comments.length === 0) && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                   <MessageSquare size={32} className="mb-2 opacity-20" />
                   暂无评论，快来抢沙发~
                </div>
              )}
              {moment.comments?.map(comment => (
                <div key={comment.id} className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-zinc-400 flex-shrink-0 select-none">
                      {comment.author ? comment.author[0].toUpperCase() : '?'}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-0.5">
                         <span className="text-sm font-bold text-slate-700 dark:text-zinc-200">{comment.author}</span>
                         <span className="text-[10px] text-slate-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{comment.content}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Footer Actions */}
           <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-shrink-0">
              <div className="flex items-center gap-6 mb-4">
                 <button 
                   onClick={handleLike}
                   className={`flex items-center gap-1.5 transition-colors ${moment.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                 >
                    <Heart size={24} fill={moment.isLiked ? 'currentColor' : 'none'} className={moment.isLiked ? 'animate-bounce' : ''} />
                    <span className="text-sm font-medium">{moment.likes}</span>
                 </button>
                 <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors">
                    <Share2 size={24} />
                 </button>
              </div>

              <div className="flex flex-col gap-3">
                 {/* Nickname Selection */}
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-slate-500 dark:text-zinc-400 shadow-inner">
                      {nickname ? nickname[0].toUpperCase() : <User size={14} />}
                   </div>
                   <input 
                      type="text"
                      className="bg-transparent border-b border-slate-200 dark:border-zinc-700 px-2 py-1 text-sm focus:border-blue-500 outline-none w-40 transition-colors text-slate-700 dark:text-zinc-300 placeholder:text-slate-400"
                      placeholder="设置你的昵称..."
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                   />
                 </div>

                 {/* Comment Input */}
                 <form onSubmit={handleSendComment} className="relative">
                    <input 
                      type="text" 
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder={nickname ? `以 ${nickname} 的身份评论...` : "写下你的评论..."}
                      className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-zinc-800 rounded-full text-sm text-slate-800 dark:text-zinc-200 border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={!commentText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                 </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};