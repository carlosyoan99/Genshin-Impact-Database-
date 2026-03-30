import React from 'react';
import { Item, Language } from '../types';
import { motion } from 'framer-motion';
import { Star, Zap, Swords, Shield, Info, ArrowRight } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  language: Language;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, language, onClick }) => {
  const rarityStars = Array.from({ length: Number(item.rarity) || 0 }).map((_, i) => (
    <Star key={i} size={12} className="text-amber-500 fill-current" />
  ));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative bg-gray-800/20 rounded-[32px] p-6 border border-gray-800/50 hover:border-amber-500/30 transition-all cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex gap-0.5">{rarityStars}</div>
            <h3 className="text-xl font-black text-white leading-tight group-hover:text-amber-500 transition-colors">
              {item.name}
            </h3>
            {item.element && (
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                <Zap size={12} className="text-amber-500" />
                <span>{item.element}</span>
              </div>
            )}
          </div>
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
            <div className="absolute inset-0 bg-gray-900/50 rounded-2xl border border-gray-800 group-hover:scale-110 transition-transform duration-500" />
            {item.icon && (
              <img
                src={item.icon}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-2 drop-shadow-2xl group-hover:scale-125 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
          {item.description || item.effect || 'No description available.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3">
            {item.weaponType && (
              <div className="p-2 bg-gray-900/50 rounded-lg text-gray-400">
                <Swords size={14} />
              </div>
            )}
            {item.rarity && (
              <span className="text-xs font-black text-gray-600 uppercase tracking-widest">
                {item.rarity} Stars
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
            <span>View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
