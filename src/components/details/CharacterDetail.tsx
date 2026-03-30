import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item, Language } from '../../types';
import { getItemsByCategory } from '../../services/genshinService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Zap, Swords, Shield, Info, MapPin, Calendar, Briefcase, Globe, Layers, Loader2 } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../constants';

interface CharacterDetailProps {
  language: Language;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ language }) => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[language];
  const [character, setCharacter] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'talents' | 'constellations'>('overview');

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const characters = await getItemsByCategory('characters', language);
        const found = characters.find(c => c.id === characterId);
        setCharacter(found || null);
      } catch (error) {
        console.error('Error fetching character detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [characterId, language]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Loader2 size={64} className="text-amber-500 animate-spin" />
        <p className="text-xl font-medium">Summoning character details...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Info size={64} className="text-red-500 opacity-50" />
        <p className="text-xl font-medium">Character not found in Teyvat.</p>
        <button onClick={() => navigate('/characters')} className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-amber-600 transition-colors">
          Back to Characters
        </button>
      </div>
    );
  }

  const rarityStars = Array.from({ length: Number(character.rarity) || 0 }).map((_, i) => (
    <Star key={i} size={18} className="text-amber-500 fill-current" />
  ));

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e12]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0e12]/50 to-[#0d0e12] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12] via-transparent to-transparent z-10" />
        
        {character.image && (
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover object-top scale-110 blur-sm opacity-30"
            referrerPolicy="no-referrer"
          />
        )}

        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-end pb-12">
          <motion.button 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate('/characters')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Characters</span>
          </motion.button>

          <div className="space-y-6 max-w-3xl">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex gap-1">{rarityStars}</div>
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">| {character.element}</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-8xl font-black text-white tracking-tight"
            >
              {character.name}
            </motion.h1>

            {character.title && (
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-amber-500 text-2xl font-bold italic"
              >
                "{character.title}"
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
        <div className="flex items-center gap-8 border-b border-gray-800">
          {['overview', 'talents', 'constellations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-amber-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                      <Info size={16} className="text-amber-500" />
                      About {character.name}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed italic">
                      {character.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: MapPin, label: 'Region', value: character.region },
                      { icon: Briefcase, label: 'Affiliation', value: character.affiliation },
                      { icon: Calendar, label: 'Birthday', value: character.birthday },
                      { icon: Globe, label: 'Constellation', value: character.constellation },
                    ].map((info, idx) => (
                      <div key={idx} className="bg-gray-800/30 p-6 rounded-3xl border border-gray-800/50 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-900/50 rounded-xl flex items-center justify-center text-amber-500 border border-gray-800">
                          <info.icon size={20} />
                        </div>
                        <div>
                          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{info.label}</p>
                          <p className="text-white font-bold">{info.value || 'Unknown'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-amber-500/5 p-8 rounded-[40px] border border-amber-500/20 space-y-6">
                    <h4 className="text-amber-500 font-black uppercase tracking-widest text-xs">Combat Info</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold">Element</span>
                        <span className="text-white font-black uppercase tracking-widest text-sm">{character.element}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold">Weapon</span>
                        <span className="text-white font-black uppercase tracking-widest text-sm">{character.weaponType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'talents' && (
              <div className="grid grid-cols-1 gap-6">
                {character.talents?.map((talent, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-800/20 p-8 rounded-[32px] border border-gray-800/50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-black text-white">{talent.name}</h4>
                      <span className="bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                        {talent.type}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed italic">{talent.description}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'constellations' && (
              <div className="grid grid-cols-1 gap-6">
                {character.constellations?.map((con, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-800/20 p-8 rounded-[32px] border border-gray-800/50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-black text-white">{con.name}</h4>
                      <span className="bg-gray-900 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center font-black border border-gray-800">
                        C{con.level}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed italic">{con.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CharacterDetail;
