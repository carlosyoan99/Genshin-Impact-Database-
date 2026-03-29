/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import * as genshin from 'genshin-db';
import { 
  Search, 
  Users, 
  Sword, 
  Shield, 
  Package, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Info,
  Type,
  Wind,
  Flame,
  Droplets,
  Zap,
  Leaf,
  Snowflake,
  Mountain,
  Globe,
  ZapOff,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

type Category = 'characters' | 'weapons' | 'artifacts' | 'materials';
type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Japanese' | 'Korean' | 'ChineseSimplified' | 'ChineseTraditional' | 'Italian' | 'Portuguese' | 'Russian' | 'Thai' | 'Vietnamese' | 'Turkish' | 'Indonesian';

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'English', label: 'English' },
  { id: 'Spanish', label: 'Español' },
  { id: 'French', label: 'Français' },
  { id: 'German', label: 'Deutsch' },
  { id: 'Japanese', label: '日本語' },
  { id: 'Korean', label: '한국어' },
  { id: 'ChineseSimplified', label: '简体中文' },
  { id: 'ChineseTraditional', label: '繁體中文' },
  { id: 'Italian', label: 'Italiano' },
  { id: 'Portuguese', label: 'Português' },
  { id: 'Russian', label: 'Русский' },
  { id: 'Thai', label: 'ไทย' },
  { id: 'Vietnamese', label: 'Tiếng Việt' },
  { id: 'Turkish', label: 'Türkçe' },
  { id: 'Indonesian', label: 'Bahasa Indonesia' },
];

const UI_TRANSLATIONS: Record<string, any> = {
  English: {
    search: 'Search',
    characters: 'Characters',
    weapons: 'Weapons',
    artifacts: 'Artifacts',
    materials: 'Materials',
    items: 'items',
    details: 'View Details',
    description: 'Description',
    region: 'Region',
    affiliation: 'Affiliation',
    birthday: 'Birthday',
    constellation: 'Constellation',
    baseAtk: 'Base ATK',
    subStat: 'Sub Stat',
    twoPiece: '2-Piece Set',
    fourPiece: '4-Piece Set',
    talents: 'Talents',
    constellations: 'Constellations',
    weaponSkill: 'Weapon Skill',
    source: 'Source',
    usage: 'Usage'
  },
  Spanish: {
    search: 'Buscar',
    characters: 'Personajes',
    weapons: 'Armas',
    artifacts: 'Artefactos',
    materials: 'Materiales',
    items: 'objetos',
    details: 'Ver Detalles',
    description: 'Descripción',
    region: 'Región',
    affiliation: 'Afiliación',
    birthday: 'Cumpleaños',
    constellation: 'Constelación',
    baseAtk: 'ATK Base',
    subStat: 'Atributo Secundario',
    twoPiece: 'Conjunto de 2 piezas',
    fourPiece: 'Conjunto de 4 piezas',
    talents: 'Talentos',
    constellations: 'Constelaciones',
    weaponSkill: 'Habilidad de Arma',
    source: 'Fuente',
    usage: 'Uso'
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('characters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<Language>('Spanish');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  useEffect(() => {
    genshin.setOptions({ resultLanguage: language });
  }, [language]);

  const categories = [
    { id: 'characters', label: t.characters, icon: Users },
    { id: 'weapons', label: t.weapons, icon: Sword },
    { id: 'artifacts', label: t.artifacts, icon: Shield },
    { id: 'materials', label: t.materials, icon: Package },
  ];

  const items = useMemo(() => {
    try {
      switch (activeCategory) {
        case 'characters':
          return genshin.characters('names', { matchCategories: true }).map(name => genshin.characters(name));
        case 'weapons':
          return genshin.weapons('names', { matchCategories: true }).map(name => genshin.weapons(name));
        case 'artifacts':
          return genshin.artifacts('names', { matchCategories: true }).map(name => genshin.artifacts(name));
        case 'materials':
          return genshin.materials('names', { matchCategories: true }).map(name => genshin.materials(name));
        default:
          return [];
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [activeCategory, language]);

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const getRarityColor = (rarity: string | number) => {
    const r = typeof rarity === 'string' ? parseInt(rarity) : rarity;
    switch (r) {
      case 5: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 4: return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 3: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 2: return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getElementIcon = (element: string) => {
    switch (element?.toLowerCase()) {
      case 'pyro': return <Flame size={14} className="text-red-500" />;
      case 'hydro': return <Droplets size={14} className="text-blue-500" />;
      case 'anemo': return <Wind size={14} className="text-teal-400" />;
      case 'electro': return <Zap size={14} className="text-purple-500" />;
      case 'dendro': return <Leaf size={14} className="text-green-500" />;
      case 'cryo': return <Snowflake size={14} className="text-cyan-400" />;
      case 'geo': return <Mountain size={14} className="text-yellow-600" />;
      default: return null;
    }
  };

  const getElementColor = (element: string) => {
    switch (element?.toLowerCase()) {
      case 'pyro': return 'text-red-500';
      case 'hydro': return 'text-blue-500';
      case 'anemo': return 'text-teal-400';
      case 'electro': return 'text-purple-500';
      case 'dendro': return 'text-green-500';
      case 'cryo': return 'text-cyan-400';
      case 'geo': return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-[#0c0f12] text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-gray-800 bg-[#111418] flex flex-col z-20"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            >
              Genshin DB
            </motion.h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as Category);
                setSelectedItem(null);
              }}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group",
                activeCategory === cat.id 
                  ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                  : "hover:bg-gray-800 text-gray-400"
              )}
            >
              <cat.icon size={22} className={cn(
                "shrink-0 transition-transform group-hover:scale-110",
                activeCategory === cat.id ? "text-yellow-500" : "text-gray-500"
              )} />
              {isSidebarOpen && (
                <span className="font-medium">{cat.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Globe size={18} className="text-gray-500 shrink-0" />
            {isSidebarOpen && (
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs text-gray-400 focus:outline-none cursor-pointer hover:text-gray-200 transition-colors w-full"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.id} value={lang.id} className="bg-[#111418]">{lang.label}</option>
                ))}
              </select>
            )}
          </div>
          {isSidebarOpen && (
            <div className="text-[10px] text-gray-600 text-center uppercase tracking-widest">
              v2.5.0 • genshin-db
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0c0f12]">
        {/* Header */}
        <header className="h-20 border-b border-gray-800 flex items-center px-8 gap-6 bg-[#0c0f12]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder={`${t.search} ${activeCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1e23] border border-gray-800 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="bg-gray-800 px-3 py-1 rounded-full">{filteredItems.length} {t.items}</span>
          </div>
        </header>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.01 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#111418] border border-gray-800 rounded-2xl p-4 cursor-pointer hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5 transition-all duration-300"
                >
                  <div className="aspect-square rounded-xl bg-[#1a1e23] mb-4 overflow-hidden relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                        {t.details} <ChevronRight size={12} />
                      </span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      {activeCategory === 'characters' ? <Users size={48} /> : 
                       activeCategory === 'weapons' ? <Sword size={48} /> :
                       activeCategory === 'artifacts' ? <Shield size={48} /> : <Package size={48} />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold truncate text-gray-100 flex-1">{item.name}</h3>
                      {item.element && (
                        <div className="shrink-0">
                          {getElementIcon(item.element)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold", getRarityColor(item.rarity))}>
                        <Star size={10} fill="currentColor" />
                        {item.rarity}
                      </div>
                      {item.weaponType && (
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider truncate">
                          {item.weaponType}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111418] border border-gray-800 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Left Side: Image/Visuals */}
              <div className="w-full md:w-1/3 bg-[#1a1e23] relative min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
                <div className="relative z-10 text-gray-700">
                   {activeCategory === 'characters' ? <Users size={120} /> : 
                    activeCategory === 'weapons' ? <Sword size={120} /> :
                    activeCategory === 'artifacts' ? <Shield size={120} /> : <Package size={120} />}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-2xl border backdrop-blur-md bg-black/20", getRarityColor(selectedItem.rarity))}>
                    <div className="flex gap-0.5">
                      {[...Array(parseInt(selectedItem.rarity || '0'))].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold mb-2">{selectedItem.name}</h2>
                    <div className="flex items-center gap-4">
                      {selectedItem.element && (
                        <div className="flex items-center gap-2">
                          {getElementIcon(selectedItem.element)}
                          <span className={cn("text-sm font-bold uppercase tracking-widest", getElementColor(selectedItem.element))}>
                            {selectedItem.element}
                          </span>
                        </div>
                      )}
                      {selectedItem.weaponType && (
                        <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                          {selectedItem.weaponType}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-10">
                  <section>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Info size={14} /> {t.description}
                    </h4>
                    <p className="text-gray-400 leading-relaxed italic">
                      "{selectedItem.description || 'No description available.'}"
                    </p>
                  </section>

                  {activeCategory === 'characters' && (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><MapPin size={10}/> {t.region}</span>
                          <span className="text-gray-200 font-medium text-sm">{selectedItem.region || 'Unknown'}</span>
                        </div>
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><Users size={10}/> {t.affiliation}</span>
                          <span className="text-gray-200 font-medium text-sm">{selectedItem.affiliation || 'Unknown'}</span>
                        </div>
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><Calendar size={10}/> {t.birthday}</span>
                          <span className="text-gray-200 font-medium text-sm">{selectedItem.birthday || 'Unknown'}</span>
                        </div>
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><Sparkles size={10}/> {t.constellation}</span>
                          <span className="text-gray-200 font-medium text-sm">{selectedItem.constellation || 'Unknown'}</span>
                        </div>
                      </div>

                      <section>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <BookOpen size={14} /> {t.talents}
                        </h4>
                        <div className="space-y-4">
                          {['combat1', 'combat2', 'combat3', 'passive1', 'passive2', 'passive3'].map((talentKey) => {
                            const talent = selectedItem[talentKey];
                            if (!talent) return null;
                            return (
                              <div key={talentKey} className="bg-[#1a1e23] p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                <h5 className="font-bold text-yellow-500 mb-2 flex items-center gap-2">
                                  <span className="w-1 h-1 bg-yellow-500 rounded-full" />
                                  {talent.name}
                                </h5>
                                <p className="text-sm text-gray-400 leading-relaxed">{talent.info}</p>
                              </div>
                            );
                          })}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Zap size={14} /> {t.constellations}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].map((cKey, idx) => {
                            const constellation = selectedItem[cKey];
                            if (!constellation) return null;
                            return (
                              <div key={cKey} className="bg-[#1a1e23] p-5 rounded-2xl border border-gray-800">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-xs font-bold text-yellow-500/50">C{idx + 1}</span>
                                  <h5 className="font-bold text-gray-200">{constellation.name}</h5>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">{constellation.effect}</p>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </>
                  )}

                  {activeCategory === 'weapons' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{t.baseAtk}</span>
                          <span className="text-gray-200 font-medium">{selectedItem.mainStatValue || 'Unknown'}</span>
                        </div>
                        <div className="bg-[#1a1e23] p-4 rounded-2xl border border-gray-800">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{t.subStat}</span>
                          <span className="text-gray-200 font-medium">{selectedItem.subStatType || 'None'}</span>
                        </div>
                      </div>
                      
                      {selectedItem.skillName && (
                        <section>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Zap size={14} /> {t.weaponSkill}: {selectedItem.skillName}
                          </h4>
                          <div className="bg-[#1a1e23] p-5 rounded-2xl border border-gray-800">
                            <p className="text-sm text-gray-400 leading-relaxed">{selectedItem.skillDescription}</p>
                          </div>
                        </section>
                      )}
                    </>
                  )}

                  {activeCategory === 'artifacts' && (
                    <div className="space-y-6">
                      {selectedItem['2pc'] && (
                        <section>
                          <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-3">{t.twoPiece}</h4>
                          <div className="bg-[#1a1e23] p-5 rounded-2xl border border-gray-800">
                            <p className="text-sm text-gray-300 leading-relaxed">{selectedItem['2pc']}</p>
                          </div>
                        </section>
                      )}
                      {selectedItem['4pc'] && (
                        <section>
                          <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-3">{t.fourPiece}</h4>
                          <div className="bg-[#1a1e23] p-5 rounded-2xl border border-gray-800">
                            <p className="text-sm text-gray-300 leading-relaxed">{selectedItem['4pc']}</p>
                          </div>
                        </section>
                      )}
                    </div>
                  )}

                  {activeCategory === 'materials' && (
                    <div className="space-y-6">
                      {selectedItem.source && selectedItem.source.length > 0 && (
                        <section>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <MapPin size={14} /> {t.source}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.source.map((src: string, i: number) => (
                              <span key={i} className="bg-gray-800/50 border border-gray-700 px-3 py-1.5 rounded-xl text-xs text-gray-300">
                                {src}
                              </span>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1e23;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2e33;
        }
        select option {
          background: #111418;
          color: #9ca3af;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
