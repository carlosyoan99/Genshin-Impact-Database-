import React, { useState, useEffect, useMemo } from 'react';
import { Item, Language } from '../../types';
import { getItemsByCategory } from '../../services/genshinService';
import ItemCard from '../ItemCard';
import Header from '../Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, LayoutGrid, List as ListIcon, Loader2, Search, Utensils } from 'lucide-react';
import { UI_TRANSLATIONS } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface FoodsProps {
  language: Language;
}

const Foods: React.FC<FoodsProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[language];
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFoodType, setActiveFoodType] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getItemsByCategory('food', language);
        setItems(data);
      } catch (error) {
        console.error('Error fetching food:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  const foodTypes = useMemo(() => ['all', ...Array.from(new Set(items.map(i => i.foodType).filter(Boolean)))], [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeFoodType === 'all' || item.foodType === activeFoodType;
      return matchesSearch && matchesType;
    });
  }, [items, searchQuery, activeFoodType]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0d0e12]">
      <Header 
        language={language} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        itemsCount={filteredItems.length} 
      />

      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight flex items-center gap-4">
                {t.food || 'Food'}
                <Utensils className="text-amber-500 w-8 h-8" />
              </h1>
              <p className="text-gray-500 font-medium text-lg">
                Discover delicious recipes to boost your team's performance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 bg-gray-800/20 p-3 rounded-2xl border border-gray-800/50 backdrop-blur-md">
              <div className="flex bg-gray-900/50 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-gray-500 hover:text-gray-300"}`}>
                  <LayoutGrid size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-gray-500 hover:text-gray-300"}`}>
                  <ListIcon size={18} />
                </button>
              </div>
              
              <div className="h-6 w-px bg-gray-800 hidden sm:block" />

              <select 
                value={activeFoodType} 
                onChange={(e) => setActiveFoodType(e.target.value)}
                className="bg-gray-900/50 border border-gray-700 text-gray-300 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl outline-none focus:border-amber-500 transition-colors"
              >
                <option value="all">Food Types</option>
                {foodTypes.filter(f => f !== 'all').map(f => <option key={f as string} value={f as string}>{f as string}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="h-[50vh] flex flex-col items-center justify-center gap-4 text-gray-500">
              <Loader2 size={48} className="text-amber-500 animate-spin" />
              <p className="text-lg font-medium">Cooking recipes...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div 
              layout
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    language={language}
                    onClick={() => navigate(`/foods/${item.id}`)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="h-[40vh] flex flex-col items-center justify-center gap-4 text-gray-500 bg-gray-800/5 rounded-3xl border-2 border-dashed border-gray-800/50">
              <Search size={48} className="opacity-20" />
              <p className="text-xl font-medium">No food found matching your filters.</p>
              <button 
                onClick={() => { setActiveFoodType('all'); setSearchQuery(''); }}
                className="text-amber-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Foods;
