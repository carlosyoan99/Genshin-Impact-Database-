import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, Sword, Shield, Package, Ghost, Utensils, Zap, Trophy, 
  Shirt, Map, Wind, Bird, CreditCard, Image, Globe, ChevronLeft, 
  ChevronRight, Languages, Book, Star, Sparkles, Music, Smile, 
  Settings, HelpCircle, List, Layers, Box, Info
} from 'lucide-react';
import { Category, Language } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../constants';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ language, setLanguage, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const t = UI_TRANSLATIONS[language];

  const menuItems: { category: Category; icon: any; label: string }[] = [
    { category: 'characters', icon: Users, label: t.characters },
    { category: 'weapons', icon: Sword, label: t.weapons },
    { category: 'artifacts', icon: Shield, label: t.artifacts },
    { category: 'materials', icon: Package, label: t.materials },
    { category: 'enemies', icon: Ghost, label: t.enemies },
    { category: 'food', icon: Utensils, label: t.food },
    { category: 'reactions', icon: Zap, label: t.reactions },
    { category: 'achievements', icon: Trophy, label: t.achievements },
    { category: 'outfits', icon: Shirt, label: t.outfits },
    { category: 'domains', icon: Map, label: t.domains },
    { category: 'windgliders', icon: Wind, label: t.windgliders },
    { category: 'animals', icon: Bird, label: t.animals },
    { category: 'tcg', icon: CreditCard, label: t.tcg },
    { category: 'namecards', icon: Image, label: t.namecards },
    { category: 'geography', icon: Globe, label: t.geography },
    { category: 'adventureranks', icon: Star, label: t.adventureranks },
    { category: 'crafts', icon: Box, label: t.crafts },
    { category: 'elements', icon: Sparkles, label: t.elements },
    { category: 'emojis', icon: Smile, label: t.emojis },
    { category: 'voiceovers', icon: Music, label: t.voiceovers },
    { category: 'tcgcardbacks', icon: Layers, label: t.tcgcardbacks },
    { category: 'tcgcardboxes', icon: Box, label: t.tcgcardboxes },
    { category: 'tcgdetailedrules', icon: Book, label: t.tcgdetailedrules },
    { category: 'tcgenemycards', icon: Ghost, label: t.tcgenemycards },
    { category: 'tcgkeywords', icon: List, label: t.tcgkeywords },
    { category: 'tcglevelrewards', icon: Trophy, label: t.tcglevelrewards },
    { category: 'tcgstatuseffects', icon: Zap, label: t.tcgstatuseffects },
    { category: 'tcgsummons', icon: Sparkles, label: t.tcgsummons },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-[#1a1c23] text-gray-300 flex flex-col border-r border-gray-800 sticky top-0"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 font-bold text-white text-xl"
          >
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Star className="text-white w-5 h-5 fill-current" />
            </div>
            <span>GenshinDB</span>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === `/${item.category}`;
            return (
              <Link
                key={item.category}
                to={`/${item.category}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                  isActive 
                    ? "bg-amber-500/10 text-amber-500" 
                    : "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                )}
              >
                <item.icon size={22} className={cn(isActive ? "text-amber-500" : "group-hover:text-gray-200")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-medium truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800 space-y-4">
        <div className="flex items-center gap-3 px-3">
          <Languages size={20} className="text-gray-500" />
          {!isCollapsed && (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-sm font-medium focus:outline-none w-full"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-gray-900">
                  {lang.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
