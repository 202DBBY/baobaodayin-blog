import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'root' && password === 'java') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
             <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">博客管理系统</h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">请登录以继续</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
           {error && (
             <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
               {error}
             </div>
           )}
           
           <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">用户名</label>
             <input 
               type="text" 
               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-700/50 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-200"
               value={username}
               onChange={e => setUsername(e.target.value)}
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">密码</label>
             <input 
               type="password" 
               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-700/50 border border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-200"
               value={password}
               onChange={e => setPassword(e.target.value)}
             />
           </div>

           <button 
             type="submit" 
             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
           >
             立即登录
           </button>
        </form>
        
        <div className="text-center mt-6">
          <button onClick={() => navigate('/')} className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300">
            返回博客首页
          </button>
        </div>
      </div>
    </div>
  );
};
