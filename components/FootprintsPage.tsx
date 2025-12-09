import React, { useState } from 'react';
import { Map, Globe, MapPin, Navigation, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export const FootprintsPage: React.FC = () => {
  const { footprints, addFootprint } = useData();
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');
  const [isAddMode, setIsAddMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempCoords, setTempCoords] = useState<{x: number, y: number} | null>(null);
  
  // Form State
  const [newCity, setNewCity] = useState('');
  const [newProvince, setNewProvince] = useState('');
  const [newDate, setNewDate] = useState('');
  
  const navigate = useNavigate();

  // Calculate Province Stats
  const provinceCounts: Record<string, number> = {};
  footprints.forEach(f => {
    provinceCounts[f.province] = (provinceCounts[f.province] || 0) + 1;
  });
  const sortedProvinces = Object.entries(provinceCounts).sort((a, b) => b[1] - a[1]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTempCoords({ x, y });
    setShowAddModal(true);
    setIsAddMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCoords && newCity && newProvince && newDate) {
      addFootprint({
        id: `l-${Date.now()}`,
        city: newCity,
        province: newProvince,
        date: newDate,
        coordinates: tempCoords
      });
      setShowAddModal(false);
      setNewCity('');
      setNewProvince('');
      setNewDate('');
      setTempCoords(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 animate-fade-in relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-zinc-100 mb-2 border-l-4 border-blue-500 pl-4">
            足迹 Footprints
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 pl-5 text-sm">
            读万卷书，行万里路。
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
             onClick={() => {
                setIsAddMode(!isAddMode);
                setViewMode('map');
             }}
             className={`px-4 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors ${isAddMode ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'}`}
          >
             <Plus size={16} /> {isAddMode ? '点击地图添加...' : '点亮城市'}
          </button>

          <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${
                viewMode === 'map' 
                  ? 'bg-white dark:bg-zinc-700 shadow text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700'
              }`}
            >
              <Map size={16} /> 平面
            </button>
            <button
              onClick={() => {
                setViewMode('globe');
                setIsAddMode(false);
              }}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-all ${
                viewMode === 'globe' 
                  ? 'bg-white dark:bg-zinc-700 shadow text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700'
              }`}
            >
              <Globe size={16} /> 地球
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Container */}
      <div className={`relative w-full aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mb-10 border border-slate-800 ${isAddMode ? 'cursor-crosshair ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}`}>
        
        {viewMode === 'globe' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
             {/* Pure CSS Globe Effect */}
             <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-600 overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.5)] animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-0 opacity-60 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png')] bg-cover bg-repeat-x w-[200%] h-full animate-[slide_10s_linear_infinite]"></div>
                <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_50px_rgba(255,255,255,0.2),inset_-10px_-10px_50px_rgba(0,0,0,0.8)]"></div>
             </div>
             <div className="absolute bottom-6 text-white/50 text-xs tracking-widest">EARTH VIEW SIMULATION</div>
          </div>
        ) : (
          <div 
            className="absolute inset-0 bg-slate-800"
            onClick={handleMapClick}
          >
             {/* Abstract Map Dots */}
             <div className="absolute inset-0 opacity-30 pointer-events-none">
                {/* Simplified Grid */}
                <div className="w-full h-full" style={{ 
                    backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}></div>
             </div>

             {/* Map Content - Using relative plotting for demo */}
             {footprints.map((footprint) => (
               <div 
                 key={footprint.id}
                 className="absolute group cursor-pointer"
                 style={{ 
                   left: `${footprint.coordinates.x}%`, 
                   top: `${footprint.coordinates.y}%` 
                 }}
                 onClick={(e) => {
                   e.stopPropagation();
                   if (footprint.articleId) navigate(`/post/${footprint.articleId}`);
                 }}
               >
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                 </span>
                 
                 {/* Tooltip */}
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    {footprint.city} · {footprint.date}
                 </div>
               </div>
             ))}
             
             <div className="absolute bottom-4 left-4 text-white/30 text-xs pointer-events-none">
                * 示意地图 / Schematic Map
             </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">点亮新城市</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">城市 City</label>
                   <input 
                     required
                     type="text" 
                     className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-700 border-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                     value={newCity}
                     onChange={e => setNewCity(e.target.value)}
                     placeholder="例如：南京"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">省份 Province</label>
                   <input 
                     required
                     type="text" 
                     className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-700 border-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                     value={newProvince}
                     onChange={e => setNewProvince(e.target.value)}
                     placeholder="例如：江苏"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1">日期 Date</label>
                   <input 
                     required
                     type="date" 
                     className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-zinc-700 border-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-zinc-200"
                     value={newDate}
                     onChange={e => setNewDate(e.target.value)}
                   />
                 </div>
                 <div className="pt-4">
                   <button 
                     type="submit"
                     className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                   >
                     确认点亮
                   </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activity List */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700/50">
           <h3 className="flex items-center gap-2 font-bold text-slate-700 dark:text-zinc-200 mb-6">
             <Navigation size={18} />
             点亮记录
           </h3>
           <div className="max-h-[400px] overflow-y-auto space-y-6 relative before:absolute before:inset-y-0 before:left-[7px] before:w-[2px] before:bg-slate-100 dark:before:bg-zinc-700 pr-2 custom-scrollbar">
             {footprints.slice().sort((a,b) => b.date.localeCompare(a.date)).map((fp) => (
               <div key={fp.id} className="relative pl-6 flex flex-col group">
                 <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border-2 border-blue-500 z-10"></div>
                 <span className="text-xs text-slate-400 font-mono mb-1">{fp.date}</span>
                 <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors">
                      {fp.province} · {fp.city}
                    </span>
                    {fp.articleId && (
                      <button 
                        onClick={() => navigate(`/post/${fp.articleId}`)}
                        className="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        关联文章
                      </button>
                    )}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Province Progress */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700/50">
           <h3 className="flex items-center gap-2 font-bold text-slate-700 dark:text-zinc-200 mb-6">
             <MapPin size={18} />
             省份探索
           </h3>
           <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
             {sortedProvinces.map(([province, count]) => {
               // Fake "coverage" based on count for visual demo
               const percentage = Math.min(count * 20, 100); 
               return (
                 <div key={province}>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600 dark:text-zinc-400">{province}</span>
                     <span className="font-mono text-slate-400">{count} 次停留</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                       style={{ width: `${percentage}%` }}
                     ></div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
};
