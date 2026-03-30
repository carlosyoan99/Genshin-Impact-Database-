import React from 'react';
import { Globe, Heart, MessageSquare, Twitter, Github, Youtube, Mail, ExternalLink, Shield, Info, Book, Trophy } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Resources',
      icon: Book,
      links: [
        { label: 'Official Site', href: 'https://genshin.hoyoverse.com/' },
        { label: 'Interactive Map', href: 'https://webstatic-sea.hoyolab.com/app/ys-map-sea/index.html' },
        { label: 'Wiki Guide', href: 'https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki' },
        { label: 'Hoyolab', href: 'https://www.hoyolab.com/' },
      ]
    },
    {
      title: 'Community',
      icon: Trophy,
      links: [
        { label: 'Discord', href: 'https://discord.gg/genshinimpact' },
        { label: 'Reddit', href: 'https://www.reddit.com/r/Genshin_Impact/' },
        { label: 'Twitter', href: 'https://twitter.com/GenshinImpact' },
        { label: 'YouTube', href: 'https://www.youtube.com/c/GenshinImpact' },
      ]
    },
    {
      title: 'Legal',
      icon: Shield,
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Disclaimer', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-[#1a1c23] border-t border-gray-800/50 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div className="flex items-center gap-4 font-black text-white text-4xl tracking-tighter group">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <Globe className="text-white w-8 h-8" />
              </div>
              <span>GenshinDB</span>
            </div>
            
            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-lg">
              The most comprehensive and up-to-date database for Genshin Impact. Built for travelers, by travelers.
            </p>

            <div className="flex items-center gap-4">
              {[Twitter, Github, Youtube, Mail].map((Icon, idx) => (
                <button key={idx} className="w-12 h-12 bg-gray-800/50 hover:bg-amber-500 text-gray-400 hover:text-white rounded-xl transition-all border border-gray-700 flex items-center justify-center group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <section.icon size={16} className="text-amber-500" />
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-amber-500 font-bold transition-colors flex items-center gap-2 group"
                      >
                        {link.label}
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-500 font-bold text-sm">
            © {currentYear} GenshinDB. All rights reserved. Not affiliated with HoYoverse.
          </p>
          
          <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-rose-500 fill-current animate-pulse" />
            <span>by Travelers</span>
          </div>

          <div className="flex items-center gap-8">
            <button className="text-gray-500 hover:text-white font-bold text-sm transition-colors flex items-center gap-2">
              <MessageSquare size={16} />
              Feedback
            </button>
            <button className="text-gray-500 hover:text-white font-bold text-sm transition-colors flex items-center gap-2">
              <Info size={16} />
              About Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
