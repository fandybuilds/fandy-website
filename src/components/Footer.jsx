import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-space-950/80 py-10 px-4">
      <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full bg-cosmic-blue/20 border border-cosmic-blue flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">
              {personalInfo.name} <span className="text-cosmic-blue font-mono">• Cosmic Portfolio</span>
            </div>
            <p className="text-xs text-slate-500">
              Built with React, Tailwind CSS, & Framer Motion.
            </p>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-space-900 border border-cosmic-blue/30 text-slate-300 hover:text-white hover:border-cosmic-blue hover:shadow-glow-blue text-xs font-semibold transition-all duration-300"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
