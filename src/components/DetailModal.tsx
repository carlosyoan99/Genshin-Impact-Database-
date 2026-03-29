import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Shield, Sword, Sparkles, MapPin, Calendar, Users, Globe, Info, Trophy, Package, Utensils, Shirt, Wind, Bird, CreditCard, Image, Star as StarIcon, Sparkles as SparklesIcon, Music, Smile, List, Layers, Box, Book } from 'lucide-react';
import { Item, Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface DetailModalProps {
  item: Item | null;
  language: Language;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, language, onClose }) => {
  if (!item) return null;
  const t = UI_TRANSLATIONS[language];
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

  const DetailRow = ({ label, value, icon: Icon }: { label: string; value?: string | number; icon?: any }) => {
    if (!value) return null;
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors">
        {Icon && <Icon size={18} className="text-amber-500 shrink-0" />}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{label}</span>
          <span className="text-gray-200 font-medium">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-[#1a1c23] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className={cn("h-3 w-full bg-gradient-to-r", getRarityColor(rarity))} />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-gray-800/50 hover:bg-red-500 text-gray-400 hover:text-white rounded-xl transition-all z-10 backdrop-blur-md"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="relative aspect-square bg-gray-800/30 rounded-3xl overflow-hidden flex items-center justify-center border border-gray-700/50 group">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain p-8 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Sparkles size={120} className="text-gray-700" />
                  )}
                  
                  <div className="absolute bottom-6 left-6 flex gap-1">
                    {[...Array(rarity)].map((_, i) => (
                      <Star key={i} size={20} className="text-amber-400 fill-current drop-shadow-lg" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                    {item.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                      {item.category}
                    </span>
                    {item.element && (
                      <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                        {item.element}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow label={t.rarity} value={item.rarity} icon={Star} />
                  <DetailRow label={t.element} value={item.element} icon={Zap} />
                  <DetailRow label={t.weapon} value={item.weaponType} icon={Sword} />
                  <DetailRow label={t.birthday} value={item.birthday} icon={Calendar} />
                  <DetailRow label={t.region} value={item.region} icon={Globe} />
                  <DetailRow label={t.affiliation} value={item.affiliation} icon={Users} />
                  <DetailRow label={t.baseAttack} value={item.baseAttack} icon={Sword} />
                  <DetailRow label={t.substat} value={item.substat} icon={Sparkles} />
                  <DetailRow label={t.type} value={item.type} icon={Info} />
                  <DetailRow label={t.quality} value={item.quality} icon={StarIcon} />
                </div>

                {item.description && (
                  <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 space-y-3">
                    <h4 className="text-xs text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <Info size={14} className="text-amber-500" />
                      {t.description}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm italic">
                      "{item.description}"
                    </p>
                  </div>
                )}

                {item.effect && (
                  <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-3">
                    <h4 className="text-xs text-amber-500 uppercase font-bold tracking-widest flex items-center gap-2">
                      <Zap size={14} />
                      {t.effect}
                    </h4>
                    <p className="text-gray-200 leading-relaxed text-sm">
                      {item.effect}
                    </p>
                  </div>
                )}

                {(item.setEffect1 || item.setEffect2 || item.setEffect4) && (
                  <div className="space-y-4">
                    <h4 className="text-xs text-gray-500 uppercase font-bold tracking-widest px-1">Set Effects</h4>
                    <div className="space-y-3">
                      {item.setEffect1 && <DetailRow label={t.set1} value={item.setEffect1} icon={Sparkles} />}
                      {item.setEffect2 && <DetailRow label={t.set2} value={item.setEffect2} icon={Sparkles} />}
                      {item.setEffect4 && <DetailRow label={t.set4} value={item.setEffect4} icon={Sparkles} />}
                    </div>
                  </div>
                )}

                {item.recipe && item.recipe.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs text-gray-500 uppercase font-bold tracking-widest px-1">{t.recipe}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {item.recipe.map((ing, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-gray-700/50">
                          <span className="text-gray-300 text-sm">{ing.name}</span>
                          <span className="text-amber-500 font-bold">x{ing.count}</span>
                        </div>
                      ))}
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default DetailModal;
