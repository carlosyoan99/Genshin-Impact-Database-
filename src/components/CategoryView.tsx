import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Category, Item, Language } from '../types';
import { getItemsByCategory, getLunarReactions } from '../services/genshinService';
import ItemCard from './ItemCard';
import Header from './Header';
import DetailModal from './DetailModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, LayoutGrid, List as ListIcon, Loader2 } from 'lucide-react';
import { UI_TRANSLATIONS } from '../constants';

interface CategoryViewProps {
  language: Language;
}

const CategoryView: React.FC<CategoryViewProps> = ({ language }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = (categoryId || 'characters') as Category;
  const t = UI_TRANSLATIONS[language];

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedItems = await getItemsByCategory(category, language);
        
        // Add lunar reactions if in reactions category
        if (category === 'reactions') {
          const lunar = getLunarReactions(language);
          fetchedItems = [...fetchedItems, ...lunar];
        }
        
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, language]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || 
                           item.element?.toLowerCase() === activeFilter.toLowerCase() ||
                           item.rarity?.toString() === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter]);

  const filters = useMemo(() => {
    const uniqueElements = Array.from(new Set(items.map(i => i.element).filter(Boolean)));
    const uniqueRarities = Array.from(new Set(items.map(i => i.rarity).filter(Boolean)));
    return ['all', ...uniqueElements, ...uniqueRarities];
  }, [items]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0d0e12]">
      <Header 
        language={language} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        itemsCount={filteredItems.length} 
      />

      <main className="flex-1 p-8 sm:p-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tight capitalize flex items-center gap-4">
                {t[category] || category}
                <Sparkles className="text-amber-500 w-8 h-8" />
              </h1>
              <p className="text-gray-500 font-medium text-lg">
                Explore the comprehensive database of {category} in Genshin Impact.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-gray-800/30 p-2 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <div className="flex bg-gray-900/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-[300px]">
                {filters.map(filter => (
                  <button
                    key={filter as string}
                    onClick={() => setActiveFilter(filter as string)}
                    className={`
                      px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border
                      ${activeFilter === filter 
                        ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20" 
                        : "bg-gray-800/50 border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600"}
                    `}
                  >
                    {filter === 'all' ? t.all : filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-6 text-gray-500">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={64} className="text-amber-500" />
              </motion.div>
              <p className="text-xl font-medium animate-pulse">Fetching data from Teyvat...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div 
              layout
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                : "flex flex-col gap-8"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    language={language}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="h-[40vh] flex flex-col items-center justify-center gap-4 text-gray-500 bg-gray-800/10 rounded-3xl border-2 border-dashed border-gray-800">
              <Filter size={48} className="opacity-20" />
              <p className="text-xl font-medium">{t.noItems}</p>
            </div>
          )}
        </div>
      </main>

      <DetailModal
        item={selectedItem}
        language={language}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default CategoryView;
