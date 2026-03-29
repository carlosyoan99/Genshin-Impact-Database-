import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Sword, Shield, Package, Ghost, Utensils, Zap, Trophy, Sparkles, Globe, Star, Search, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];

  const featuredCategories = [
    { id: 'characters', icon: Users, label: t.characters, color: 'bg-amber-500', count: '80+' },
    { id: 'weapons', icon: Sword, label: t.weapons, color: 'bg-blue-500', count: '150+' },
    { id: 'artifacts', icon: Shield, label: t.artifacts, color: 'bg-purple-500', count: '40+' },
    { id: 'enemies', icon: Ghost, label: t.enemies, color: 'bg-red-500', count: '100+' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0d0e12]">
      <main className="flex-1 p-8 sm:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Hero Section */}
          <section className="relative py-20 text-center space-y-10">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl -z-10" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                <Sparkles size={14} />
                <span>The Ultimate Database</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tighter leading-tight">
                Explore the World of <span className="text-amber-500">Teyvat</span>
              </h1>
              <p className="text-gray-500 text-xl sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                Your comprehensive guide to characters, weapons, artifacts, and every secret hidden in Genshin Impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto relative group"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={24} />
              <input
                type="text"
                placeholder="Search for anything in Teyvat..."
                className="w-full bg-gray-800/30 border-2 border-gray-800 rounded-3xl py-6 pl-16 pr-8 text-xl text-gray-200 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 transition-all backdrop-blur-md"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 transition-transform">
                Search
              </div>
            </motion.div>
          </section>

          {/* Featured Categories */}
          <section className="space-y-12">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight uppercase">Featured Categories</h2>
                <p className="text-gray-500 font-medium">Quick access to the most popular database sections.</p>
              </div>
              <Link to="/characters" className="text-amber-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCategories.map((cat, i) => (
                <Link key={cat.id} to={`/${cat.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="group relative p-8 bg-gray-800/20 rounded-3xl border border-gray-800 hover:border-amber-500/30 hover:bg-gray-800/30 transition-all overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/20 mb-6 group-hover:scale-110 transition-transform`}>
                      <cat.icon size={28} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">{cat.label}</h3>
                      <p className="text-gray-500 text-sm">{cat.count} items available</p>
                    </div>
                    <div className="absolute top-8 right-8 text-gray-800 group-hover:text-amber-500/20 transition-colors">
                      <cat.icon size={80} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-y border-gray-800/50">
            <div className="text-center space-y-2">
              <div className="text-5xl font-black text-white">15+</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Languages Supported</div>
            </div>
            <div className="text-center space-y-2 border-x border-gray-800/50">
              <div className="text-5xl font-black text-white">1000+</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total Database Items</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-black text-white">7</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Nations of Teyvat</div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="relative p-12 sm:p-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[3rem] overflow-hidden shadow-2xl shadow-amber-500/20">
            <div className="absolute top-0 right-0 p-20 opacity-10">
              <Star size={300} className="text-white fill-current" />
            </div>
            <div className="relative max-w-2xl space-y-8">
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Ready to start your journey in Teyvat?
              </h2>
              <p className="text-amber-100 text-lg font-medium opacity-80">
                Join thousands of travelers using GenshinDB to optimize their builds and explore the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/characters" className="px-8 py-4 bg-white text-amber-600 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform">
                  Explore Characters
                </Link>
                <Link to="/tcg" className="px-8 py-4 bg-black/20 text-white rounded-2xl font-black text-lg backdrop-blur-md hover:bg-black/30 transition-all">
                  TCG Guide
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
