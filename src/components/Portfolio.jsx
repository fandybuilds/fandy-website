import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  Award, 
  Layers, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck,
  Code2,
  Atom,
  Server,
  Database,
  Cpu,
  Zap,
  GitBranch,
  Figma,
  Box,
  Send,
  FileCode,
  Layout,
  DatabaseBackup,
  Network
} from 'lucide-react';
import { projects, certificates, techStackCategories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

// Icon mapper for tech stacks
const techIconMap = {
  Atom: Atom,
  Code2: Code2,
  FileCode: FileCode,
  Palette: Layers,
  Layers: Layers,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
  Database: Database,
  DatabaseBackup: DatabaseBackup,
  Network: Network,
  Sparkles: Sparkles,
  GitBranch: GitBranch,
  Zap: Zap,
  Figma: Figma,
  Box: Box,
  Send: Send,
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectCategory, setProjectCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'API & Frontend'];

  const filteredProjects = projectCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === projectCategory);

  return (
    <section id="portfolio" className="relative py-24 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cosmic-blue/30 text-cosmic-blue text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portofolio & Eksplorasi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight"
          >
            Karya, Sertifikasi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue to-cyan-400">Teknologi</span>
          </motion.h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Jelajahi hasil karya proyek nyata, sertifikasi kompetensi industri, serta ekosistem teknologi yang saya kuasai.
          </p>
        </div>

        {/* Main 3-Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-space-900/90 border border-cosmic-blue/30 shadow-glow-blue">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-cosmic-blue to-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-cosmic-blue to-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('techstack')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'techstack'
                  ? 'bg-gradient-to-r from-cosmic-blue to-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Tech Stack
            </button>
          </div>
        </div>

        {/* Tab 1: PROJECTS */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    projectCategory === cat
                      ? 'bg-cosmic-blue text-white shadow-glow-blue border border-cosmic-blue'
                      : 'bg-space-900/60 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col group"
                >
                  {/* Image Thumbnail */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative h-48 overflow-hidden cursor-pointer bg-space-950"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-space-950/80 backdrop-blur-md text-cyan-300 border border-cosmic-blue/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer mb-2"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-space-950 border border-slate-800 text-slate-300 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-space-950 text-slate-500 font-mono">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-semibold text-cosmic-blue hover:text-cyan-300 transition-colors"
                        >
                          Detail Project →
                        </button>
                        <div className="flex items-center gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-space-950 hover:bg-space-800 text-slate-400 hover:text-white transition-colors"
                            title="Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-cosmic-blue/20 hover:bg-cosmic-blue text-cyan-300 hover:text-white transition-colors shadow-[0_0_10px_rgba(44,103,237,0.3)]"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Certificate Preview Thumbnail */}
                <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden shrink-0 border border-cosmic-blue/30 relative group">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-space-950/40 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-cyan-400">
                        {cert.issuer}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cosmic-blue" />
                        {cert.issueDate}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono mb-3">
                      ID: {cert.credentialId}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-space-950 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cosmic-blue hover:text-cyan-300 transition-colors"
                  >
                    <span>Verifikasi Kredensial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tab 3: TECH STACK */}
        {activeTab === 'techstack' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {techStackCategories.map((group, gIdx) => (
              <div key={gIdx} className="glass-card p-6 sm:p-8 rounded-3xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan" />
                  {group.category}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {group.skills.map((skill, sIdx) => {
                    const IconComponent = techIconMap[skill.icon] || Code2;
                    return (
                      <div
                        key={sIdx}
                        className="glass-card glass-card-hover p-4 rounded-2xl flex flex-col items-center text-center justify-center group"
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-space-950 border border-slate-800 group-hover:border-cosmic-blue transition-all"
                          style={{ color: skill.color }}
                        >
                          <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-white mb-1">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-cyan-400/90 font-mono">
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Project Modal Preview */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  );
};

export default Portfolio;
