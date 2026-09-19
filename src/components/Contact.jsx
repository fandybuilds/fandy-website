import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, socialLinks } from '../data/portfolioData';

const socialIconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Instagram: Instagram,
  Mail: Mail,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Launch Cosmic Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2c67ed', '#00f2fe', '#ffffff', '#8a2be2'],
        });
      } catch (err) {
        // Fallback silently if canvas not supported
      }

      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
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
            <span>Koneksi Transmisi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight"
          >
            Mari Mulai <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue to-cyan-400">Kolaborasi Kosmik</span>
          </motion.h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Tertarik untuk berdiskusi tentang proyek baru, peluang karir, atau sekadar bertukar sapa seputar teknologi? Kirimkan pesan Anda!
          </p>
        </div>

        {/* Main Grid: Left (Info & Socials) & Right (Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Email Copy Card */}
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Hubungi Langsung Melalui Email
              </div>
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-space-950 border border-slate-800">
                <span className="text-sm sm:text-base font-mono font-medium text-slate-200 truncate">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-cosmic-blue/20 hover:bg-cosmic-blue text-cyan-300 hover:text-white transition-all shrink-0"
                  title="Salin Alamat Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="text-xs text-cyan-400 mt-2 font-medium">✓ Email berhasil disalin ke clipboard!</p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="glass-card p-6 rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Sosial Media & Jaringan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon] || Mail;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-card glass-card-hover p-3.5 rounded-2xl flex items-center gap-3 group"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-center transition-all group-hover:border-cosmic-blue"
                        style={{ color: social.color }}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {social.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[120px]">
                          {social.username}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Location Badge Card */}
            <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cosmic-blue/20 text-cyan-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Domisili & Waktu</h4>
                <p className="text-xs text-slate-400">{personalInfo.location} (GMT+7 - WIB)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl relative overflow-hidden"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-cosmic-blue/20 border border-cosmic-blue flex items-center justify-center text-cyan-400 mb-4 shadow-glow-blue">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Transmisi Terkirim!</h3>
                <p className="text-sm text-slate-300 max-w-md mb-6">
                  Terima kasih sudah menghubungi saya. Pesan Anda telah diterima dan saya akan segera membalasnya secepat mungkin.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-cosmic-blue text-white shadow-glow-blue"
                >
                  Kirim Pesan Lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Nama Lengkap <span className="text-cosmic-blue">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-space-950/90 border border-slate-800 focus:border-cosmic-blue focus:shadow-glow-blue focus:outline-none text-white text-sm transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Alamat Email <span className="text-cosmic-blue">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-space-950/90 border border-slate-800 focus:border-cosmic-blue focus:shadow-glow-blue focus:outline-none text-white text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Subjek Diskusi <span className="text-cosmic-blue">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Tawaran Proyek Website / Pertanyaan Kerja"
                    className="w-full px-4 py-3 rounded-xl bg-space-950/90 border border-slate-800 focus:border-cosmic-blue focus:shadow-glow-blue focus:outline-none text-white text-sm transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Isi Pesan <span className="text-cosmic-blue">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan ide, detail proyek, atau pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-space-950/90 border border-slate-800 focus:border-cosmic-blue focus:shadow-glow-blue focus:outline-none text-white text-sm transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white bg-gradient-to-r from-cosmic-blue to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-glow-blue hover:shadow-glow-blue-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengirim Transmisi... 🛸</span>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
