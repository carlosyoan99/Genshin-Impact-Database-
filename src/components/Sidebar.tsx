import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Swords, Shield, Briefcase, 
  Ghost, Utensils, Zap, Settings, Globe,
  ChevronLeft, ChevronRight, Sparkles,
  Trophy, Shirt, Map, Compass, Book,
  Gem, Heart, MessageSquare, LayoutGrid
} from 'lucide-react';
import { Category, Language } from '../types';
import { UI_TRANSLATIONS, LANGUAGES } from '../constants';

interface SidebarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ language, setLanguage, isCollapsed, setIsCollapsed }) => {
  const t = UI_TRANSLATIONS[language];

  const menuItems = [
    { id: 'home', icon: Home, label: t.home, path: '/' },
    { id: 'characters', icon: Users, label: t.characters, path: '/characters' },
    { id: 'weapons', icon: Swords, label: t.weapons, path: '/weapons' },
    { id: 'artifacts', icon: Shield, label: t.artifacts, path: '/artifacts' },
    { id: 'materials', icon: Briefcase, label: t.materials, path: '/materials' },
    { id: 'monsters', icon: Ghost, label: t.enemies || 'Monsters', path: '/monsters' },
    { id: 'foods', icon: Utensils, label: t.food || 'Foods', path: '/foods' },
    { id: 'reactions', icon: Zap, label: t.reactions || 'Reactions', path: '/reactions' },
  ];

  return (
    <aside 
      className={`sticky top-0 h-screen bg-[#1a1c23] border-r border-gray-800/50 flex flex-col transition-all duration-500 z-50 ${isCollapsed ? 'w-24' : 'w-80'}`}
    >
      <div className="p-8 flex items-center justify-between gap-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3 font-black text-white text-2xl tracking-tighter group">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span>GenshinDB</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 mx-auto">
            <Globe className="text-white w-6 h-6" />
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all group relative
              ${isActive 
                ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' 
                : 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'}
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon size={22} className="shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-gray-800 shadow-2xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 space-y-4 border-t border-gray-800/50 bg-gray-900/20">
        {!isCollapsed && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-500 font-black uppercase tracking-widest text-[10px]">
              <Globe size={12} />
              <span>Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 font-bold outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer hover:border-gray-700"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-3 bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-xl transition-all border border-gray-800/50"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
