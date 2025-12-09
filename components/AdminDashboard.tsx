import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, LogOut, Save, X, Eye, MessageSquare, FileText, Users, User, Check, RefreshCw } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Post, Friend } from '../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { posts, addPost, updatePost, deletePost, moments, deleteComment, friends, approveFriend, deleteFriend, profile, updateProfile, addFriend } = useData();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'friends' | 'profile'>('posts');
  
  // Post Editor State
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('magic');
  const [tags, setTags] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  // Friend Editor State
  const [isFriendFormOpen, setIsFriendFormOpen] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendUrl, setFriendUrl] = useState('');
  const [friendAvatar, setFriendAvatar] = useState('');
  const [friendDesc, setFriendDesc] = useState('');

  // Profile Editor State
  const [profileForm, setProfileForm] = useState(profile);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
    // Sync profile form on load
    setProfileForm(profile);
  }, [navigate, profile]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDate(post.date);
    setCategory(post.category);
    setTags(post.tags.join(', '));
    setSummary(post.summary);
    setContent(post.content || '');
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingPost(null);
    setTitle('');
    const now = new Date();
    setDate(`${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日`);
    setCategory('magic');
    setTags('');
    setSummary('');
    setContent('# 新文章标题\n\n开始写下你的想法...');
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(/[,，]/).map(t => t.trim()).filter(Boolean);
    
    const postData: Post = {
      id: editingPost ? editingPost.id : `p-${Date.now()}`,
      title,
      date,
      category,
      tags: tagArray,
      summary,
      content
    };

    if (editingPost) {
      updatePost(postData);
    } else {
      addPost(postData);
    }
    setIsFormOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      deletePost(id);
    }
  };

  const handleDeleteComment = (momentId: string, commentId: string) => {
    if (window.confirm('确定要删除这条评论吗？')) {
      deleteComment(momentId, commentId);
    }
  };

  const handleApproveFriend = (id: string) => {
    approveFriend(id);
  };

  const handleDeleteFriend = (id: string) => {
    if (window.confirm('确定要删除/拒绝这个友链吗？')) {
      deleteFriend(id);
    }
  };

  const openFriendCreate = () => {
    setFriendName('');
    setFriendUrl('');
    setFriendAvatar('');
    setFriendDesc('');
    setIsFriendFormOpen(true);
  };

  const handleFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName && friendUrl) {
      addFriend({
        id: `f-${Date.now()}`,
        name: friendName,
        url: friendUrl,
        avatar: friendAvatar || 'https://picsum.photos/id/1/200/200',
        description: friendDesc,
        status: 'active',
        tags: []
      });
      setIsFriendFormOpen(false);
    }
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    alert('个人资料已更新！');
  };

  const handleProfileChange = (field: string, value: any) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex-shrink-0">
        <div className="mb-10">
          <h1 className="text-xl font-bold">后台管理</h1>
          <p className="text-slate-400 text-sm">Welcome back, root</p>
        </div>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'posts' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
             <FileText size={18} /> 文章管理
          </button>
          <button 
            onClick={() => setActiveTab('comments')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'comments' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
             <MessageSquare size={18} /> 评论管理
          </button>
          <button 
            onClick={() => setActiveTab('friends')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'friends' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
             <Users size={18} /> 友链管理
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
             <User size={18} /> 个人资料
          </button>
        </nav>
        <div className="mt-auto pt-10">
          <button 
             onClick={handleLogout}
             className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
             <LogOut size={18} /> 退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* POSTS TAB */}
        {activeTab === 'posts' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">所有文章 ({posts.length})</h2>
              <button 
                onClick={openCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Plus size={18} /> 发布新文章
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700/50 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-zinc-700/50 border-b border-slate-100 dark:border-zinc-700">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">标题</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">日期</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">分类</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-700">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-zinc-750 transition-colors">
                      <td className="px-6 py-4 text-slate-800 dark:text-zinc-200 font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-zinc-400 text-sm">{post.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-3">
                        <button 
                          onClick={() => openEdit(post)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                          title="编辑"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* COMMENTS TAB */}
        {activeTab === 'comments' && (
           <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">所有评论</h2>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700/50 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-zinc-700/50 border-b border-slate-100 dark:border-zinc-700">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">评论内容</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">发布者</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">关联动态</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-700">
                  {moments.flatMap(m => (m.comments || []).map(c => ({...c, momentId: m.id, momentAuthor: m.author, momentContent: m.content}))).length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">暂无评论数据</td>
                     </tr>
                  )}
                  {moments.flatMap(m => (m.comments || []).map(c => ({...c, momentId: m.id, momentAuthor: m.author, momentContent: m.content}))).map(comment => (
                    <tr key={comment.id} className="hover:bg-slate-50 dark:hover:bg-zinc-750 transition-colors">
                      <td className="px-6 py-4 text-slate-800 dark:text-zinc-200">
                         <p className="line-clamp-2">{comment.content}</p>
                         <span className="text-xs text-slate-400">{comment.date}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-zinc-300 text-sm font-bold">{comment.author}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-zinc-400 text-sm max-w-xs">
                         <span className="block truncate" title={comment.momentContent}>
                            来自 {comment.momentAuthor}: {comment.momentContent}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDeleteComment(comment.momentId, comment.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           </>
        )}

        {/* FRIENDS TAB */}
        {activeTab === 'friends' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">友链管理</h2>
              <button 
                onClick={openFriendCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Plus size={18} /> 添加友链
              </button>
            </div>

            {/* Pending Requests */}
            {friends.some(f => f.status === 'pending') && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> 待审核申请
                </h3>
                <div className="grid gap-4">
                  {friends.filter(f => f.status === 'pending').map(friend => (
                    <div key={friend.id} className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <img src={friend.avatar} className="w-12 h-12 rounded-full bg-white" alt="avatar" />
                         <div>
                            <div className="font-bold text-slate-800 dark:text-zinc-100">{friend.name}</div>
                            <div className="text-sm text-slate-500 dark:text-zinc-400">{friend.url}</div>
                            <div className="text-xs text-slate-400 mt-1">{friend.description}</div>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => handleApproveFriend(friend.id)} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                           <Check size={16} className="inline mr-1" /> 通过
                         </button>
                         <button onClick={() => handleDeleteFriend(friend.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                           <X size={16} className="inline mr-1" /> 拒绝
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Links */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700/50 overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-zinc-700/50 border-b border-slate-100 dark:border-zinc-700">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">博客信息</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400">描述</th>
                    <th className="px-6 py-4 font-medium text-slate-500 dark:text-zinc-400 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-700">
                  {friends.filter(f => f.status === 'active').map(friend => (
                    <tr key={friend.id} className="hover:bg-slate-50 dark:hover:bg-zinc-750 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <img src={friend.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                            <div>
                               <div className="text-slate-800 dark:text-zinc-200 font-medium">{friend.name}</div>
                               <div className="text-xs text-slate-400">{friend.url}</div>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-zinc-400 text-sm max-w-xs truncate">
                        {friend.description}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDeleteFriend(friend.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">个人资料管理</h2>
              <button 
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Save size={18} /> 保存更改
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700/50 p-8 space-y-8">
               {/* Basic Info */}
               <section>
                 <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-200 mb-4 border-b border-slate-100 dark:border-zinc-700 pb-2">基本信息</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">昵称</label>
                      <input 
                        type="text" 
                        value={profileForm.name} 
                        onChange={e => handleProfileChange('name', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">标签/头衔</label>
                      <input 
                        type="text" 
                        value={profileForm.tagline} 
                        onChange={e => handleProfileChange('tagline', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">头像 URL</label>
                      <input 
                        type="text" 
                        value={profileForm.avatar} 
                        onChange={e => handleProfileChange('avatar', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">短简介 (Bio)</label>
                      <input 
                        type="text" 
                        value={profileForm.bio} 
                        onChange={e => handleProfileChange('bio', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                 </div>
               </section>

               {/* Contact */}
               <section>
                 <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-200 mb-4 border-b border-slate-100 dark:border-zinc-700 pb-2">联系方式</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">邮箱</label>
                      <input 
                        type="email" 
                        value={profileForm.email} 
                        onChange={e => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">Github</label>
                      <input 
                        type="text" 
                        value={profileForm.github} 
                        onChange={e => handleProfileChange('github', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">社交平台 (Twitter/X)</label>
                      <input 
                        type="text" 
                        value={profileForm.twitter} 
                        onChange={e => handleProfileChange('twitter', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">地理位置</label>
                      <input 
                        type="text" 
                        value={profileForm.location} 
                        onChange={e => handleProfileChange('location', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                 </div>
               </section>

               {/* Extended Info */}
               <section>
                 <h3 className="text-lg font-bold text-slate-700 dark:text-zinc-200 mb-4 border-b border-slate-100 dark:border-zinc-700 pb-2">详细介绍</h3>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">技能栈 (逗号分隔)</label>
                      <input 
                        type="text" 
                        value={profileForm.skills.join(', ')} 
                        onChange={e => handleProfileChange('skills', e.target.value.split(/[,，]/).map(s => s.trim()))}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">座右铭</label>
                      <input 
                        type="text" 
                        value={profileForm.quote} 
                        onChange={e => handleProfileChange('quote', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">关于我 (Markdown)</label>
                      <textarea 
                        rows={6}
                        value={profileForm.description} 
                        onChange={e => handleProfileChange('description', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 rounded-lg text-slate-800 dark:text-zinc-200 font-mono text-sm" 
                      />
                    </div>
                 </div>
               </section>
            </div>
          </div>
        )}

      </main>

      {/* Editor Modal (Only for posts) */}
      {isFormOpen && activeTab === 'posts' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-800/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100">
                {editingPost ? '编辑文章' : '新建文章'}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Save size={16} /> 保存发布
                </button>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg text-slate-500 dark:text-zinc-400"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
               {/* Metadata Form */}
               <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800 overflow-y-auto bg-white dark:bg-zinc-900">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-1">标题</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-1">日期</label>
                      <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-1">分类</label>
                      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-800 dark:text-zinc-200">
                        <option value="magic">魔法 Magic</option>
                        <option value="log">日志 Log</option>
                        <option value="recent">近期 Recent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-1">标签 (逗号分隔)</label>
                      <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-1">摘要</label>
                      <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg" />
                    </div>
                  </div>
               </div>

               {/* Markdown Editor */}
               <div className="w-full md:w-2/3 flex flex-col h-full bg-slate-50 dark:bg-zinc-800/30">
                  <div className="p-2 border-b border-slate-100 dark:border-zinc-800 text-xs font-mono text-slate-400 px-4">
                     MARKDOWN EDITOR
                  </div>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    className="flex-1 w-full p-6 bg-transparent border-none resize-none focus:ring-0 font-mono text-sm leading-relaxed text-slate-800 dark:text-zinc-200"
                    placeholder="# 在这里开始写作..." 
                  />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Friend Create Modal */}
      {isFriendFormOpen && activeTab === 'friends' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">添加新友链</h3>
              <button onClick={() => setIsFriendFormOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleFriendSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">博客名称</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                  value={friendName}
                  onChange={e => setFriendName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">博客地址</label>
                <input 
                  required
                  type="url" 
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                  value={friendUrl}
                  onChange={e => setFriendUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">头像地址</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                  value={friendAvatar}
                  onChange={e => setFriendAvatar(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">简介</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                  value={friendDesc}
                  onChange={e => setFriendDesc(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsFriendFormOpen(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-xl font-medium transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};