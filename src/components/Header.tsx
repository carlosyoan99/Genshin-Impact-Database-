import React from 'react';
import { Search, Bell, User, Settings, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  itemsCount: number;
}

const Header: React.FC<HeaderProps> = ({ language, searchQuery, setSearchQuery, itemsCount }) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <header className="h-20 bg-[#1a1c23]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="text-sm text-gray-400 font-medium">
          <span className="text-amber-500 font-bold">{itemsCount}</span> {t.itemsCount}
        </div>
        
        <div className="h-8 w-px bg-gray-800" />
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all relative">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#1a1c23]" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
            <HelpCircle size={22} />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 transition-transform">
            <User size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
