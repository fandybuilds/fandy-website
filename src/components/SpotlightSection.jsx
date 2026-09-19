import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Network, 
  Code2, 
  Cpu, 
  CheckCircle2,
  HelpCircle,
  Laptop
} from 'lucide-react';
import Lanyard from './Lanyard';

const SpotlightSection = () => {
  return (
    <section id="spotlight" className="relative py-20 px-4 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-[25%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-cosmic-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cosmic-blue/30 text-cosmic-blue text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Identitas & Profil Singkat</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight"
          >
            Sekilas Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue via-cyan-400 to-blue-400">Afandy Developer</span>
          </motion.h2>
          
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Fokus belajar di bidang Teknik Komputer & Jaringan (TKJ) serta ketertarikan aktif dalam eksplorasi pengembangan web.
          </p>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Concise & Modest Skills / Bio */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            {/* 1. Hal Menarik & Minat Belajar */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>Minat & Fokus Saat Ini</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sebagai siswa jurusan <strong>Teknik Komputer dan Jaringan (TKJ)</strong> di SMK Nurul Huda Ngawen, saya mendalami dasar infrastruktur jaringan sekaligus mempelajari pembuatan tampilan website yang modern, responsif, dan interaktif.
              </p>
            </div>

            {/* 2. Keahlian Ringkas & Wajar */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-4 h-4 text-cosmic-blue" />
                <span>Bidang Keahlian yang Dipelajari</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* TKJ & Jaringan */}
                <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800/80">
                  <div className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Jaringan & Server Dasar
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      Dasar Jaringan LAN & WLAN
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      Konfigurasi Dasar MikroTik
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      Dasar Pengoperasian Linux
                    </li>
                  </ul>
                </div>

                {/* Web & IT Support */}
                <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800/80">
                  <div className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Web & Perangkat Keras
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                      HTML, CSS & Tailwind CSS
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                      Dasar JavaScript & React
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                      Perakitan & Troubleshooting PC
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Panduan Interaksi Lanyard Ramping */}
            <div className="p-3.5 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/30 flex items-center gap-3 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>🎮 Interaktivitas Lanyard:</strong> Anda dapat menarik atau menggoyangkan ID Card di sebelah kanan dengan kursor mouse, serta membalikkan kartu untuk melihat sisi belakang.
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Neat Lanyard Showcase Container */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="w-full flex justify-center">
              <Lanyard
                photoUrl="/formal-profile.jpg"
                name="Afandy Developer"
                role="Teknik Komputer & Jaringan"
                institution="SMK NURUL HUDA NGAWEN"
                idNumber="AF-2026-TKJ"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SpotlightSection;
