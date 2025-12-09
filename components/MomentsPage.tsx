import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Heart, MessageSquare, Share2, Plus, Play } from 'lucide-react';
import { MomentDetailModal } from './MomentDetailModal';
import { AddMomentModal } from './AddMomentModal';
import { Moment } from '../types';

export const MomentsPage: React.FC = () => {
  const { moments, likeMoment } = useData();
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    likeMoment(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('链接已复制到剪贴板！');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 relative min-h-screen">
      <div className="mb-10 relative h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold">片刻 Moments</h1>
          <p className="opacity-90 mt-1">记录生活的细碎光阴</p>
        </div>
        <img 
          src="https://picsum.photos/id/106/100/100" 
          alt="Avatar" 
          className="absolute -bottom-8 right-8 w-20 h-20 rounded-xl border-4 border-white dark:border-zinc-900 shadow-lg"
        />
      </div>

      <div className="space-y-8 mt-12">
        {moments.map((moment) => (
          <div 
            key={moment.id} 
            className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer group"
            onClick={() => setSelectedMoment(moment)}
          >
            <img src={moment.avatar} alt={moment.author} className="w-12 h-12 rounded-lg bg-slate-200 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex flex-col mb-1">
                <span className="font-bold text-slate-800 dark:text-zinc-100 text-lg">{moment.author}</span>
              </div>
              
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-[15px] mb-3">
                {moment.content}
              </p>
              
              {/* Media Preview */}
              <div className="mb-3" onClick={e => e.stopPropagation()}>
                {moment.video ? (
                  <div 
                     className="relative w-full h-48 bg-black rounded-lg overflow-hidden group/video"
                     onClick={() => setSelectedMoment(moment)}
                  >
                     <video src={moment.video} className="w-full h-full object-cover opacity-80" muted />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white group-hover/video:scale-110 transition-transform">
                           <Play fill="currentColor" size={20} className="ml-1" />
                        </div>
                     </div>
                  </div>
                ) : moment.images && (
                  <div className={`grid gap-2 ${moment.images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                     {moment.images.map((img, i) => (
                       <img 
                         key={i} 
                         src={img} 
                         className={`rounded-lg object-cover w-full hover:opacity-90 transition-opacity ${moment.images!.length === 1 ? 'h-64 max-w-sm' : 'h-24'}`} 
                         alt="Moment content" 
                         onClick={() => setSelectedMoment(moment)}
                       />
                     ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 text-slate-400 text-xs">
                <span>{moment.date}</span>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={(e) => handleLike(e, moment.id)}
                    className={`flex items-center gap-1 transition-all ${moment.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                  >
                    <Heart size={16} fill={moment.isLiked ? 'currentColor' : 'none'} className={moment.isLiked ? 'animate-bounce' : ''} /> 
                    <span>{moment.likes > 0 ? moment.likes : ''}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageSquare size={16} />
                    <span>{moment.comments?.length || ''}</span>
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40 active:scale-95"
        title="发布片刻"
      >
        <Plus size={24} />
      </button>

      {/* Modals */}
      {selectedMoment && (
        <MomentDetailModal 
          moment={selectedMoment} 
          onClose={() => setSelectedMoment(null)} 
        />
      )}

      {showAddModal && (
        <AddMomentModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};