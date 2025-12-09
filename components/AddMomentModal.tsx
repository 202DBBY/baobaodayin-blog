import React, { useState } from 'react';
import { X, Image, Video, Send, Smile } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface AddMomentModalProps {
  onClose: () => void;
}

export const AddMomentModal: React.FC<AddMomentModalProps> = ({ onClose }) => {
  const { addMoment } = useData();
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newMoment = {
      id: `m-${Date.now()}`,
      author: '包包大银',
      avatar: 'https://picsum.photos/id/64/100/100', // Mock logged-in user
      content,
      date: '刚刚',
      likes: 0,
      isLiked: false,
      comments: [],
      ...(mediaType === 'image' && mediaUrl ? { images: [mediaUrl] } : {}),
      ...(mediaType === 'video' && mediaUrl ? { video: mediaUrl } : {}),
    };

    addMoment(newMoment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100">发布片刻</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="这一刻的想法..."
            rows={4}
            className="w-full bg-transparent border-none resize-none text-slate-800 dark:text-zinc-200 text-lg placeholder:text-slate-400 focus:ring-0 mb-4"
            autoFocus
          />

          {mediaType !== 'none' && (
            <div className="mb-4 bg-slate-50 dark:bg-zinc-800 p-3 rounded-lg relative group">
               <button 
                 type="button" 
                 onClick={() => { setMediaType('none'); setMediaUrl(''); }}
                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <X size={14} />
               </button>
               <input 
                 type="text" 
                 value={mediaUrl} 
                 onChange={e => setMediaUrl(e.target.value)}
                 placeholder={mediaType === 'image' ? "输入图片链接 (https://...)" : "输入视频链接 (https://...)"}
                 className="w-full bg-white dark:bg-zinc-700 px-3 py-2 rounded border border-slate-200 dark:border-zinc-600 text-sm focus:outline-none focus:border-blue-500"
               />
               {mediaUrl && (
                  <div className="mt-2 h-32 bg-slate-200 dark:bg-zinc-900 rounded overflow-hidden flex items-center justify-center">
                     {mediaType === 'image' ? (
                       <img src={mediaUrl} alt="preview" className="h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+Image')} />
                     ) : (
                       <video src={mediaUrl} className="h-full" muted />
                     )}
                  </div>
               )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
             <div className="flex gap-4 text-blue-500">
                <button type="button" onClick={() => setMediaType('image')} className={`p-2 rounded-full hover:bg-blue-50 dark:hover:bg-zinc-800 ${mediaType === 'image' ? 'bg-blue-50 dark:bg-zinc-800' : ''}`} title="图片">
                   <Image size={20} />
                </button>
                <button type="button" onClick={() => setMediaType('video')} className={`p-2 rounded-full hover:bg-blue-50 dark:hover:bg-zinc-800 ${mediaType === 'video' ? 'bg-blue-50 dark:bg-zinc-800' : ''}`} title="视频">
                   <Video size={20} />
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-zinc-800" title="表情">
                   <Smile size={20} />
                </button>
             </div>

             <button 
               type="submit" 
               disabled={!content.trim()}
               className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-zinc-700 text-white rounded-full font-medium transition-all flex items-center gap-2"
             >
               发布 <Send size={16} />
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};