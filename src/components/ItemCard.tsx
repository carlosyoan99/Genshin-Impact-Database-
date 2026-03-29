import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Sword, Shield, Sparkles } from 'lucide-react';
import { Item, Language } from '../types';

interface ItemCardProps {
  item: Item;
  language: Language;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const rarity = Number(item.rarity) || 0;

  const getRarityColor = (r: number) => {
    switch (r) {
      case 5: return 'from-amber-400 to-amber-600';
      case 4: return 'from-purple-400 to-purple-600';
      case 3: return 'from-blue-400 to-blue-600';
      case 2: return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getElementIcon = (element?: string) => {
    if (!element) return null;
    return <Zap size={14} className="text-blue-400" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-[#1a1c23] rounded-3xl overflow-hidden border border-gray-800 cursor-pointer hover:border-amber-500/50 transition-all shadow-xl hover:shadow-amber-500/10"
    >
      <div className={cn("h-2 w-full bg-gradient-to-r", getRarityColor(rarity))} />
      
      <div className="p-6 space-y-6">
        <div className="relative aspect-square bg-gray-800/30 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-700/50 group-hover:bg-gray-800/50 transition-colors">
          {item.icon ? (
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-full object-contain p-4 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Sparkles size={48} className="text-gray-700" />
          )}
          
          <div className="absolute top-3 right-3 flex gap-1">
            {[...Array(rarity)].map((_, i) => (
              <Star key={i} size={12} className="text-amber-400 fill-current" />
            ))}
          </div>

          {item.element && (
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-2 border border-white/10">
              {getElementIcon(item.element)}
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">{item.element}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-amber-500 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed h-8">
            {item.description || item.effect || 'No description available.'}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center gap-2">
            {item.weaponType && <Sword size={14} className="text-gray-500" />}
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
              {item.weaponType || item.type || item.category}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
            <Sparkles size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default ItemCard;
