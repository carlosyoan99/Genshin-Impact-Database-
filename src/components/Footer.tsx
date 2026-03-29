import React from 'react';
import { Github, Twitter, Globe, Heart } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1c23] border-t border-gray-800 py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 font-bold text-white text-2xl">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span>GenshinDB</span>
          </div>
          <p className="text-gray-500 max-w-md leading-relaxed">
            The ultimate database for Genshin Impact. Explore characters, weapons, artifacts, and more with real-time data from Teyvat.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Resources</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Official Site</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">HoYoLAB</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Wiki</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Interactive Map</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Legal</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-600 text-xs text-center md:text-left">
          © {year} GenshinDB. Not affiliated with HoYoverse. Genshin Impact and all related properties are trademarks of HoYoverse.
        </p>
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <span>Made with</span>
          <Heart size={12} className="text-red-500 fill-current" />
          <span>for Travelers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
