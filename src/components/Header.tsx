import React from 'react';
import { Search, Globe, User, Bell, Menu } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#0d0e12]/80 backdrop-blur-xl border-b border-gray-800/50 px-8 py-4 flex items-center justify-between gap-8">
      <div className="flex-1 max-w-2xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
            {itemsCount} Results
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-700 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#0d0e12]" />
        </button>
        <button className="flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20">
          <User size={20} />
          <span className="hidden sm:inline">Traveler</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
