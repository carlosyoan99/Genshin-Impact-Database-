import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item, Language } from '../../types';
import { getItemsByCategory, getLunarReactions } from '../../services/genshinService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Info, Loader2, Sparkles } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../constants';

interface ReactionDetailProps {
  language: Language;
}

const ReactionDetail: React.FC<ReactionDetailProps> = ({ language }) => {
  const { reactionId } = useParams<{ reactionId: string }>();
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[language];
  const [reaction, setReaction] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReaction = async () => {
      setLoading(true);
      try {
        const elements = await getItemsByCategory('reactions', language);
        const lunar = getLunarReactions(language);
        const all = [...elements, ...lunar];
        const found = all.find(r => r.id === reactionId);
        setReaction(found || null);
      } catch (error) {
        console.error('Error fetching reaction detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReaction();
  }, [reactionId, language]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Loader2 size={64} className="text-amber-500 animate-spin" />
        <p className="text-xl font-medium">Analyzing reaction details...</p>
      </div>
    );
  }

  if (!reaction) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Info size={64} className="text-red-500 opacity-50" />
        <p className="text-xl font-medium">Reaction not found in Teyvat.</p>
        <button onClick={() => navigate('/reactions')} className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-amber-600 transition-colors">
          Back to Reactions
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/reactions')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Reactions</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-square bg-gray-800/20 rounded-[40px] border border-gray-800/50 flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap size={120} className="text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]" />
          </motion.div>

          {/* Info Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Elemental Interaction</span>
              </motion.div>

              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-7xl font-black text-white tracking-tight"
              >
                {reaction.name}
              </motion.h1>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg leading-relaxed italic"
              >
                {reaction.description}
              </motion.p>
            </div>

            {reaction.effect && (
              <div className="bg-amber-500/5 p-8 rounded-[32px] border border-amber-500/20 space-y-4">
                <h3 className="text-amber-500 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <Sparkles size={16} />
                  Reaction Effect
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {reaction.effect}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionDetail;
