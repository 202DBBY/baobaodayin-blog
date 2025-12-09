import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Menu, X, Smile } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  onSearchClick: () => void;
}

interface NavItemRendererProps {
  item: NavItem;
  depth?: number;
  expandedItems: Record<string, boolean>;
  onToggle: (id: string, e: React.MouseEvent) => void;
  onMobileClose: () => void;
}

const NavItemRenderer: React.FC<NavItemRendererProps> = ({ 
  item, 
  depth = 0, 
  expandedItems, 
  onToggle, 
  onMobileClose 
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems[item.id];

  return (
    <div className="mb-1 select-none">
      {hasChildren ? (
        <div 
          onClick={(e) => onToggle(item.id, e)}
          className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors
            text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50
            ${depth > 0 ? 'ml-4 text-sm' : 'font-medium'}`}
        >
          <span className="flex items-center gap-2">
            {item.label}
          </span>
          <span className="text-slate-400">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        </div>
      ) : (
        <NavLink
          to={item.path || '#'}
          onClick={onMobileClose}
          className={({ isActive }) => `flex items-center px-4 py-2 rounded-lg transition-colors
            ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-zinc-800 dark:text-blue-400' : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50'}
            ${depth > 0 ? 'ml-4 text-sm' : 'font-medium'}`}
        >
           {item.label}
        </NavLink>
      )}

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1 border-l border-slate-200 dark:border-zinc-800 ml-6 pl-2">
          {item.children!.map(child => (
            <NavItemRenderer 
              key={child.id} 
              item={child} 
              depth={depth + 1}
              expandedItems={expandedItems}
              onToggle={onToggle}
              onMobileClose={onMobileClose}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'category': true,
    'pages': false
  });
  const navigate = useNavigate();

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white dark:bg-zinc-800 shadow-md rounded-lg text-slate-700 dark:text-zinc-200"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-slate-100 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        
        <div className="p-8 pb-4">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl font-bold font-serif text-slate-800 dark:text-zinc-100 tracking-tight">
              包包大银 <span className="inline-block animate-bounce">😜</span>
            </h1>
            <p className="text-xs font-medium text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
              永远他妈的热泪盈眶
            </p>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map(item => (
              <NavItemRenderer 
                key={item.id} 
                item={item} 
                expandedItems={expandedItems}
                onToggle={toggleExpand}
                onMobileClose={() => setMobileMenuOpen(false)}
              />
            ))}
            
            {/* Search Item Manually Added for visual consistency */}
            <div 
              onClick={() => {
                onSearchClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center px-4 py-2 rounded-lg cursor-pointer text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 font-medium"
            >
              <Search size={18} className="mr-2" />
              搜索
            </div>
          </nav>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center">
            <div className="flex flex-col text-[10px] text-slate-300 dark:text-zinc-700">
               <span>No. 463239</span>
               <span>你好</span>
            </div>
            <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
