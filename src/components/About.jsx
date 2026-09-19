import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Award, 
  Cpu, 
  Clock, 
  MapPin, 
  Mail, 
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { personalInfo, stats, educations, experiences } from '../data/portfolioData';

const iconMap = {
  Rocket: Rocket,
  Award: Award,
  Cpu: Cpu,
  Clock: Clock,
};

const About = () => {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cosmic-blue/30 text-cosmic-blue text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight"
          >
            Mengenal Lebih Dekat <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue to-cyan-400">Dunia Saya</span>
          </motion.h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Kombinasi antara logika pemrograman, rasa ingin tahu yang tinggi, dan dedikasi dalam membangun arsitektur perangkat lunak yang elegan.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl glass-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cosmic-blue/30 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700" />
            
            {/* Profile Avatar with Glowing Orbit Border */}
            <div className="relative mb-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-cosmic-blue via-cyan-400 to-purple-600 shadow-glow-blue animate-pulse-glow">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-space-950 bg-space-900">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 p-2 rounded-full bg-space-950 border border-cosmic-blue/50 text-cyan-400 shadow-glow-blue">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{personalInfo.name}</h3>
            <p className="text-cosmic-blue font-medium text-sm mb-4">Junior Software Engineer</p>

            <div className="flex flex-col gap-2 w-full text-slate-300 text-xs sm:text-sm py-4 border-y border-slate-800/80 mb-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-cosmic-blue" /> Lokasi
                </span>
                <span className="font-semibold text-slate-200">{personalInfo.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-4 h-4 text-cosmic-blue" /> Status
                </span>
                <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Open to Work
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed text-left">
              Fokus mendalam pada ekosistem JavaScript/TypeScript modern, performa web responsif, arsitektur micro-frontend, dan integrasi API yang aman.
            </p>
          </motion.div>

          {/* Stats & Key Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((item, idx) => {
                const Icon = iconMap[item.icon] || Rocket;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cosmic-blue/15 border border-cosmic-blue/40 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_12px_rgba(44,103,237,0.3)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-mono text-glow">
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Pitch / Philosophy Banner */}
            <div className="glass-card p-6 rounded-2xl border-cosmic-blue/30 bg-gradient-to-r from-space-900/90 to-space-850/90 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cosmic-blue/20 text-cosmic-blue shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Misi & Visi Pengembang</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    "Menghubungkan imajinasi masa depan dengan realitas digital melalui penulisan kode yang bersih, teruji, dan scalable."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Experience Timeline Tabs */}
        <div className="mt-12">
          {/* Tab Selection */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-full bg-space-900/90 border border-cosmic-blue/30 shadow-glow-blue">
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-cosmic-blue to-blue-600 text-white shadow-glow-blue'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Pengalaman
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-cosmic-blue to-blue-600 text-white shadow-glow-blue'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Pendidikan
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'experience' ? (
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card glass-card-hover p-6 rounded-2xl border-l-4 border-l-cosmic-blue relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        {exp.role}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cosmic-blue/20 text-cyan-300 font-normal">
                          {exp.type}
                        </span>
                      </h4>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cosmic-blue" />
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-cosmic-blue mb-3">{exp.company}</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-space-950/80 border border-slate-800 text-slate-300 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {educations.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card glass-card-hover p-6 rounded-2xl border-l-4 border-l-cyan-400 relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-cyan-300 mb-3">{edu.degree}</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {edu.description}
                    </p>
                    <div className="space-y-1.5">
                      {edu.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
