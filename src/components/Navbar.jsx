import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Rocket, User, Briefcase, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home', icon: Rocket },
  { name: 'About', href: '#about', icon: User },
  { name: 'Spotlight', href: '#spotlight', icon: Sparkles },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'spotlight', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Floating Centered Navbar */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`relative flex items-center justify-between gap-6 px-6 py-3 rounded-full transition-all duration-500
            bg-space-900/80 backdrop-blur-xl border border-cosmic-blue/30
            ${scrolled ? 'shadow-glow-blue border-cosmic-blue/60' : 'shadow-lg shadow-cosmic-blue/10'}
          `}
        >
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer text-white font-bold tracking-wider"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cosmic-blue to-cyan-400 p-[1.5px] flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-space-950 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cosmic-blue group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <span className="text-sm md:text-base font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 group-hover:to-cyan-400 transition-all flex items-center gap-1.5">
              AFANDY <span className="text-cosmic-blue font-bold">TECHNOLOGY</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-space-950/60 p-1 rounded-full border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmic-blue to-blue-600 shadow-glow-blue"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* CTA / Quick Hire button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-cosmic-blue/20 hover:bg-cosmic-blue border border-cosmic-blue/50 hover:border-cosmic-blue shadow-[0_0_15px_rgba(44,103,237,0.3)] hover:shadow-glow-blue transition-all duration-300"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cosmic-blue" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-4 rounded-2xl bg-space-900/95 backdrop-blur-2xl border border-cosmic-blue/40 shadow-glow-blue md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-cosmic-blue text-white shadow-glow-blue'
                        : 'text-slate-300 hover:bg-space-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-slate-800 mt-1">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full block text-center py-2.5 rounded-xl bg-gradient-to-r from-cosmic-blue to-cyan-500 text-white font-semibold text-sm shadow-glow-blue"
                >
                  Hubungi Saya 🚀
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
