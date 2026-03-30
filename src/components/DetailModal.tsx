import React from 'react';
import { Item, Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Swords, Shield, Info, MapPin, Calendar, Briefcase, Globe, Layers } from 'lucide-react';
import { UI_TRANSLATIONS } from '../constants';

interface DetailModalProps {
  item: Item | null;
  language: Language;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, language, onClose }) => {
  if (!item) return null;
  const t = UI_TRANSLATIONS[language];

  const rarityStars = Array.from({ length: Number(item.rarity) || 0 }).map((_, i) => (
    <Star key={i} size={16} className="text-amber-500 fill-current" />
  ));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0d0e12]/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#1a1c23] rounded-[40px] border border-gray-800 shadow-2xl overflow-hidden flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-2xl transition-all border border-gray-800"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square lg:aspect-auto bg-gray-900/50 flex items-center justify-center p-12 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Info Section */}
              <div className="p-8 sm:p-12 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">{rarityStars}</div>
                    <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">| {item.category}</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                    {item.name}
                  </h2>
                  {item.title && (
                    <p className="text-amber-500 font-bold italic text-xl">"{item.title}"</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {item.element && (
                    <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-800/50 flex items-center gap-3">
                      <Zap className="text-amber-500" size={20} />
                      <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Element</p>
                        <p className="text-white font-bold">{item.element}</p>
                      </div>
                    </div>
                  )}
                  {item.weaponType && (
                    <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-800/50 flex items-center gap-3">
                      <Swords className="text-amber-500" size={20} />
                      <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Weapon</p>
                        <p className="text-white font-bold">{item.weaponType}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <Info size={16} className="text-amber-500" />
                    Description
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-lg italic">
                    {item.description || item.effect || 'No description available.'}
                  </p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-gray-800">
                  {item.region && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Region</p>
                        <p className="text-white font-bold">{item.region}</p>
                      </div>
                    </div>
                  )}
                  {item.affiliation && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Affiliation</p>
                        <p className="text-white font-bold">{item.affiliation}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Artifact Set Effects */}
                {(item.setEffect2 || item.setEffect4) && (
                  <div className="space-y-6 pt-8 border-t border-gray-800">
                    <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                      <Layers size={16} className="text-amber-500" />
                      Set Bonuses
                    </h4>
                    <div className="space-y-4">
                      {item.setEffect2 && (
                        <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-800/50">
                          <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mb-2">2-Piece Bonus</p>
                          <p className="text-gray-300 text-sm leading-relaxed">{item.setEffect2}</p>
                        </div>
                      )}
                      {item.setEffect4 && (
                        <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20">
                          <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mb-2">4-Piece Bonus</p>
                          <p className="text-gray-300 text-sm leading-relaxed">{item.setEffect4}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DetailModal;
