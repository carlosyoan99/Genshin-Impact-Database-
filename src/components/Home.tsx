import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Swords, Shield, Ghost, 
  Utensils, Zap, Sparkles, ArrowRight,
  Globe, Search, Star, LayoutGrid, Filter
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = UI_TRANSLATIONS[language];

  const categories = [
    { id: 'characters', icon: Users, label: t.characters, color: 'from-blue-500 to-cyan-500', count: '80+' },
    { id: 'weapons', icon: Swords, label: t.weapons, color: 'from-amber-500 to-orange-500', count: '150+' },
    { id: 'artifacts', icon: Shield, label: t.artifacts, color: 'from-emerald-500 to-teal-500', count: '40+' },
    { id: 'monsters', icon: Ghost, label: t.enemies || 'Monsters', color: 'from-purple-500 to-indigo-500', count: '100+' },
    { id: 'foods', icon: Utensils, label: t.food || 'Foods', color: 'from-rose-500 to-pink-500', count: '120+' },
    { id: 'reactions', icon: Zap, label: t.reactions || 'Reactions', color: 'from-yellow-500 to-amber-500', count: '15+' },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e12] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0e12] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 text-center space-y-8 px-6"
        >
          <div className="inline-flex items-center gap-3 bg-amber-500/10 text-amber-500 px-6 py-3 rounded-full border border-amber-500/20 backdrop-blur-md mb-4">
            <Sparkles size={20} />
            <span className="text-sm font-black uppercase tracking-widest">The Ultimate Teyvat Guide</span>
          </div>
          
          <h1 className="text-6xl sm:text-9xl font-black text-white tracking-tighter leading-none">
            GENSHIN<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">DATABASE</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-xl font-medium leading-relaxed">
            Your comprehensive companion for everything in Genshin Impact. From character builds to elemental reactions, we've got you covered.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            <button 
              onClick={() => navigate('/characters')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-3xl font-black text-lg transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-3 group"
            >
              Start Exploring
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="bg-gray-800/50 hover:bg-gray-800 text-white px-10 py-5 rounded-3xl font-black text-lg transition-all border border-gray-700 backdrop-blur-md">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              EXPLORE <span className="text-amber-500">CATEGORIES</span>
            </h2>
            <p className="text-gray-500 text-xl font-medium max-w-xl">
              Dive into specific sections of the game data with detailed information and filtering.
            </p>
          </div>
          <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
            <LayoutGrid size={20} className="text-amber-500" />
            <span>6 Main Categories</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(`/${cat.id}`)}
              className="group relative bg-gray-800/20 rounded-[40px] p-10 border border-gray-800/50 hover:border-amber-500/30 transition-all cursor-pointer overflow-hidden backdrop-blur-sm"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-5 blur-[60px] group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative z-10 space-y-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon className="text-white w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white group-hover:text-amber-500 transition-colors">
                      {cat.label}
                    </h3>
                    <span className="text-gray-600 font-black text-sm uppercase tracking-widest">
                      {cat.count} Items
                    </span>
                  </div>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Comprehensive data and details for all {cat.label.toLowerCase()} in Teyvat.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <span>Explore Now</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-gray-900/30 py-24 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                REAL-TIME <span className="text-amber-500">SEARCH</span>
              </h2>
              <p className="text-gray-400 text-xl font-medium leading-relaxed">
                Find exactly what you're looking for with our lightning-fast search engine. Filter by element, rarity, or weapon type to narrow down your results.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Search, title: 'Instant Results', desc: 'Search through thousands of items in milliseconds.' },
                { icon: Filter, title: 'Advanced Filtering', desc: 'Narrow down by element, rarity, and more.' },
                { icon: Globe, title: 'Multi-language', desc: 'Full support for 15 different languages.' },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center shrink-0 border border-gray-700">
                    <feature.icon className="text-amber-500 w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-black uppercase tracking-widest text-sm">{feature.title}</h4>
                    <p className="text-gray-500 font-medium">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full" />
            <div className="relative bg-gray-800/50 rounded-[40px] p-8 border border-gray-700 backdrop-blur-xl shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                  <Search className="text-gray-500" />
                  <span className="text-gray-500 font-medium">Search Teyvat...</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800 h-24 flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-800 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
