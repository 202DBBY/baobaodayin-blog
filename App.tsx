import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ArticleList } from './components/ArticleList';
import { ArticleDetail } from './components/ArticleDetail';
import { SearchOverlay } from './components/SearchOverlay';
import { MomentsPage } from './components/MomentsPage';
import { ArchivePage } from './components/ArchivePage';
import { FriendsPage } from './components/FriendsPage';
import { FootprintsPage } from './components/FootprintsPage';
import { AboutPage } from './components/AboutPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { DataProvider, useData } from './contexts/DataContext';

// Component to access context inside Provider
const ContentWrapper: React.FC = () => {
  const { posts } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Hide Sidebar on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  // Filter logic for categories
  const getPostsByCategory = (cat: string) => {
    return posts.filter(p => p.category === cat || cat === 'all');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      {!isAdminPage && <Sidebar onSearchClick={() => setIsSearchOpen(true)} />}
      
      <main className={`flex-1 ${!isAdminPage ? 'md:ml-64 p-6 md:p-12 lg:p-16' : 'p-0'} min-h-screen`}>
        <Routes>
          <Route path="/" element={<ArticleList posts={posts} showMoments={true} />} />
          <Route path="/category/magic" element={<ArticleList posts={getPostsByCategory('magic')} title="魔法 Magic" />} />
          <Route path="/category/log" element={<ArticleList posts={getPostsByCategory('log')} title="日志 Log" />} />
          <Route path="/category/recent" element={<ArticleList posts={getPostsByCategory('recent')} title="近期 Recent" />} />
          <Route path="/post/:id" element={<ArticleDetail />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/page/archive" element={<ArchivePage />} />
          <Route path="/page/friends" element={<FriendsPage />} />
          <Route path="/page/footprints" element={<FootprintsPage />} />
          <Route path="/page/about" element={<AboutPage />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="*" element={<ArticleList posts={posts} />} />
        </Routes>
      </main>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        posts={posts} 
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ContentWrapper />
      </Router>
    </DataProvider>
  );
};

export default App;
