import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface ApplyFriendModalProps {
  onClose: () => void;
}

export const ApplyFriendModal: React.FC<ApplyFriendModalProps> = ({ onClose }) => {
  const { addFriend } = useData();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url && description) {
      addFriend({
        id: `f-${Date.now()}`,
        name,
        url,
        avatar: avatar || 'https://picsum.photos/id/1/200/200', // Default
        description,
        email,
        status: 'pending', // Default to pending
        tags: ['申请']
      });
      alert('提交成功，请等待博主审核！');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">申请友链</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">博客名称</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. 包包大银的博客"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">博客地址</label>
            <input 
              required
              type="url" 
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">头像地址 (可选)</label>
            <input 
              type="url" 
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">简介</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="一句话介绍你的博客"
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">联系邮箱 (仅博主可见)</label>
             <input 
              type="email" 
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="用于通知审核结果"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            提交申请
          </button>
        </form>
      </div>
    </div>
  );
};