import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item, Language } from '../../types';
import { getItemsByCategory } from '../../services/genshinService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Info, Loader2, Star, MapPin, Search } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../constants';

interface MaterialDetailProps {
  language: Language;
}

const MaterialDetail: React.FC<MaterialDetailProps> = ({ language }) => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[language];
  const [material, setMaterial] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      setLoading(true);
      try {
        const materials = await getItemsByCategory('materials', language);
        const found = materials.find(m => m.id === materialId);
        setMaterial(found || null);
      } catch (error) {
        console.error('Error fetching material detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [materialId, language]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Loader2 size={64} className="text-amber-500 animate-spin" />
        <p className="text-xl font-medium">Gathering material details...</p>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-screen bg-[#0d0e12] text-gray-500">
        <Info size={64} className="text-red-500 opacity-50" />
        <p className="text-xl font-medium">Material not found in Teyvat.</p>
        <button onClick={() => navigate('/materials')} className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-amber-600 transition-colors">
          Back to Materials
        </button>
      </div>
    );
  }

  const rarityStars = Array.from({ length: Number(material.rarity) || 0 }).map((_, i) => (
    <Star key={i} size={18} className="text-amber-500 fill-current" />
  ));

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-12">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/materials')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Materials</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-square bg-gray-800/20 rounded-[40px] border border-gray-800/50 flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {material.icon && (
              <img 
                src={material.icon} 
                alt={material.name} 
                className="w-3/4 h-3/4 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>

          {/* Info Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="flex gap-1">{rarityStars}</div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">| {material.materialType}</span>
              </motion.div>

              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-7xl font-black text-white tracking-tight"
              >
                {material.name}
              </motion.h1>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg leading-relaxed italic"
              >
                {material.description}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {material.source && material.source.length > 0 && (
                <div className="sm:col-span-2 space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Search size={16} className="text-amber-500" />
                    Sources
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {material.source.map((src, idx) => (
                      <span key={idx} className="bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-xl text-gray-300 text-sm">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;
