import React from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SpotlightSection from './components/SpotlightSection';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-space-950 text-slate-100 relative selection:bg-cosmic-blue selection:text-white font-sans overflow-x-hidden">
      {/* Background Animated Canvas & Nebulae */}
      <StarfieldBackground />

      {/* Floating Centered Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col gap-8 md:gap-16">
        <Hero />
        <About />
        <SpotlightSection />
        <Portfolio />
        <Contact />
      </main>

      {/* Cosmic Footer */}
      <Footer />
    </div>
  );
}

export default App;
