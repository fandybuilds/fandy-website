import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Terminal, Code2, Orbit, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const titles = personalInfo.titles;

  useEffect(() => {
    const handleType = () => {
      const fullText = titles[textIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(110);

        if (currentText === fullText) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(55);

        if (currentText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, titles, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Decorative Cosmic Orbit Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-cosmic-blue/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[850px] h-[850px] rounded-full border border-dashed border-cosmic-blue/15 animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-cosmic-blue/40 shadow-glow-blue mb-6"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            Available for New Opportunities
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </motion.div>

        {/* Large Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
        >
          <span className="text-slate-100">Halo, Saya </span>
          <span className="bg-gradient-to-r from-blue-400 via-cosmic-blue to-cyan-300 bg-clip-text text-transparent text-glow inline-block">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Typewriter text dynamic badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl font-mono font-bold text-slate-200 mb-6 min-h-[48px]"
        >
          <Terminal className="w-6 h-6 text-cosmic-blue animate-pulse" />
          <span className="text-slate-400">&gt;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {currentText}
          </span>
          <span className="w-2.5 h-7 bg-cosmic-blue animate-pulse inline-block align-middle ml-1" />
        </motion.div>

        {/* Bio summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-10 font-normal"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <a
            href="#portfolio"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cosmic-blue to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-glow-blue hover:shadow-glow-blue-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Jelajahi Portofolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-slate-200 bg-space-900/80 hover:bg-space-800 border border-cosmic-blue/40 hover:border-cosmic-blue hover:text-white transition-all duration-300 glass-card-hover"
          >
            <span>Hubungi Saya</span>
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm sm:text-base text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Resume / CV</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs tracking-widest uppercase font-mono"
        >
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-cosmic-blue animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
