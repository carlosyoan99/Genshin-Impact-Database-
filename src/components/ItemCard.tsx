import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Shield, Sword, Sparkles, Info } from 'lucide-react';
import { Item, Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface ItemCardProps {
  item: Item;
  language: Language;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, language, onClick }) => {
  const t = UI_TRANSLATIONS[language];
  const rarity = Number(item.rarity) || 0;

  const getRarityColor = (r: number) => {
    switch (r) {
      case 5: return 'from-amber-400 to-amber-600 shadow-amber-500/20';
      case 4: return 'from-purple-400 to-purple-600 shadow-purple-500/20';
      case 3: return 'from-blue-400 to-blue-600 shadow-blue-500/20';
      case 2: return 'from-green-400 to-green-600 shadow-green-500/20';
      default: return 'from-gray-400 to-gray-600 shadow-gray-500/20';
    }
  };

  const getElementIcon = (element?: string) => {
    if (!element) return null;
    return (
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
        <Sparkles size={16} className="text-amber-400" />
      </div>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-[#1a1c23] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-xl"
    >
      <div className={cn("h-2 w-full bg-gradient-to-r", getRarityColor(rarity))} />
      
      <div className="p-5">
        <div className="relative aspect-square mb-4 bg-gray-800/30 rounded-xl overflow-hidden flex items-center justify-center group-hover:bg-gray-800/50 transition-colors">
          {item.icon ? (
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-full object-contain p-2 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-gray-600">
              <Sparkles size={48} />
            </div>
          )}
          {getElementIcon(item.element)}
          
          <div className="absolute bottom-2 left-2 flex gap-0.5">
            {[...Array(rarity)].map((_, i) => (
              <Star key={i} size={12} className="text-amber-400 fill-current drop-shadow-md" />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-gray-100 truncate text-lg group-hover:text-amber-500 transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            {item.category}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {item.weaponType && (
              <div className="p-1.5 bg-gray-800 rounded-lg text-gray-400 group-hover:text-white transition-colors">
                <Sword size={14} />
              </div>
            )}
            {item.element && (
              <div className="p-1.5 bg-gray-800 rounded-lg text-gray-400 group-hover:text-white transition-colors">
                <Zap size={14} />
              </div>
            )}
          </div>
          <button className="p-2 bg-gray-800 hover:bg-amber-500 text-gray-400 hover:text-white rounded-lg transition-all">
            <Info size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default ItemCard;
