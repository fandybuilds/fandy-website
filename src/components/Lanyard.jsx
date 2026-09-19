import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Wifi, QrCode, RotateCw, Fingerprint } from 'lucide-react';

const Lanyard = ({ 
  photoUrl = '/formal-profile.jpg',
  name = 'Afandy Developer',
  role = 'Teknik Komputer & Jaringan',
  institution = 'SMK NURUL HUDA NGAWEN',
  idNumber = 'AF-2026-TKJ',
}) => {
  const containerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Physics state
  const physicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
    angle: 0,
    vAngle: 0,
    tiltX: 0,
    tiltY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    lastTime: Date.now(),
  });

  const [cardPos, setCardPos] = useState({ x: 0, y: 0, angle: 0, tiltX: 0, tiltY: 0 });

  // Spring & Physics loop
  useEffect(() => {
    let animationId;
    let time = 0;

    const updatePhysics = () => {
      time += 0.03;
      const p = physicsRef.current;

      if (!isDragging) {
        // Natural gentle idle breeze
        const idleSwingX = Math.sin(time * 1.5) * 8;
        const idleSwingY = Math.cos(time * 3) * 2;

        const targetX = idleSwingX;
        const targetY = idleSwingY;

        // Spring force towards target
        const k = 0.045; // Spring constant
        const damping = 0.91; // Damping

        const ax = (targetX - p.x) * k;
        const ay = (targetY - p.y) * k;

        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Angle physics (pendulum tilt based on displacement & velocity)
        const targetAngle = (p.x * 0.4) + (p.vx * 1.8);
        p.vAngle = (p.vAngle + (targetAngle - p.angle) * 0.08) * 0.88;
        p.angle += p.vAngle;

        // 3D tilt recovery
        p.tiltX = p.tiltX * 0.9;
        p.tiltY = (p.vx * -0.5) * 0.9;
      }

      setCardPos({
        x: p.x,
        y: p.y,
        angle: p.angle,
        tiltX: p.tiltX,
        tiltY: p.tiltY,
      });

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  // Pointer Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const p = physicsRef.current;
    p.lastMouseX = e.clientX;
    p.lastMouseY = e.clientY;
    p.lastTime = Date.now();
    p.vx = 0;
    p.vy = 0;
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const p = physicsRef.current;
    const now = Date.now();
    const dt = Math.max((now - p.lastTime) / 1000, 0.016);

    const anchorX = rect.width / 2;
    const anchorY = 30; // top anchor point

    // Relative to anchor
    const mouseX = e.clientX - rect.left - anchorX;
    const mouseY = e.clientY - rect.top - anchorY - 260; // offset for card height

    // Constrain range
    const maxDist = 200;
    const dist = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const clampedDist = Math.min(dist, maxDist);
    const factor = dist > 0 ? clampedDist / dist : 1;

    const newX = mouseX * factor;
    const newY = Math.max(mouseY * factor, -30);

    p.vx = (e.clientX - p.lastMouseX) * 0.3;
    p.vy = (e.clientY - p.lastMouseY) * 0.3;

    p.tiltY = (newX * -0.15);
    p.tiltX = (newY * 0.1);
    p.angle = (newX * 0.35);

    p.x = newX;
    p.y = newY;

    p.lastMouseX = e.clientX;
    p.lastMouseY = e.clientY;
    p.lastTime = now;
  }, [isDragging]);

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    if (isDragging) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    }

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [isDragging, handlePointerMove]);

  // Ribbon Bezier Points
  const anchorX = 175; // Center of SVG viewport
  const anchorY = 0;
  const cardAttachX = 175 + cardPos.x * 0.85;
  const cardAttachY = 160 + cardPos.y * 0.85;

  const cp1X = anchorX + (cardAttachX - anchorX) * 0.2;
  const cp1Y = anchorY + (cardAttachY - anchorY) * 0.6 + Math.abs(cardPos.x) * 0.15;
  const cp2X = cardAttachX - (cardAttachX - anchorX) * 0.2;
  const cp2Y = cardAttachY - 20;

  const ribbonPath = `M ${anchorX} ${anchorY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${cardAttachX} ${cardAttachY}`;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[640px] flex items-center justify-center select-none touch-none overflow-visible"
    >
      {/* Top Mounting Hook / Ceiling Pin */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-12 h-3.5 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-800 rounded-b-md shadow-md border-t border-slate-600" />
        <div className="w-5 h-5 rounded-full border-2 border-slate-400/80 bg-space-950 shadow-inner -mt-1 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cosmic-blue shadow-glow-blue" />
        </div>
      </div>

      {/* Dynamic Ribbon SVG */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 350 600"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a49ba" />
            <stop offset="40%" stopColor="#2c67ed" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0f2b7a" />
          </linearGradient>
          <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2c67ed" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Ribbon Shadow */}
        <path
          d={ribbonPath}
          fill="none"
          stroke="#000000"
          strokeWidth="20"
          strokeOpacity="0.3"
          strokeLinecap="round"
          filter="url(#ribbonShadow)"
        />

        {/* Main Ribbon Strap */}
        <path
          d={ribbonPath}
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Ribbon Stitching Pattern / Texture */}
        <path
          d={ribbonPath}
          fill="none"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeOpacity="0.8"
        />

        {/* Swivel Clasp & Ring */}
        <g transform={`translate(${cardAttachX}, ${cardAttachY})`}>
          {/* Ring */}
          <circle cx="0" cy="-6" r="8" fill="none" stroke="url(#clipGrad)" strokeWidth="3.5" />
          {/* Metal Clasp */}
          <rect x="-5" y="-1" width="10" height="14" rx="2" fill="url(#clipGrad)" stroke="#334155" strokeWidth="1" />
          <circle cx="0" cy="6" r="2.5" fill="#1e293b" />
        </g>
      </svg>

      {/* Physics Hanging ID Card */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          transform: `translate3d(${cardPos.x}px, ${cardPos.y + 110}px, 0px) rotate(${cardPos.angle}deg) rotateX(${cardPos.tiltX}deg) rotateY(${cardPos.tiltY}deg)`,
          transformOrigin: 'top center',
          transition: isDragging ? 'none' : 'box-shadow 0.3s ease',
        }}
        className={`relative z-20 w-[270px] sm:w-[300px] h-[410px] sm:h-[440px] cursor-grab active:cursor-grabbing select-none perspective-[1200px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Metal Clamp Hole at Card Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-8 h-4 rounded-full bg-space-950 border-2 border-slate-500 shadow-inner flex items-center justify-center">
          <div className="w-4 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
        </div>

        {/* Card Flip Container */}
        <div 
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="relative w-full h-full rounded-3xl"
        >
          {/* FRONT SIDE */}
          <div 
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-3xl p-5 bg-gradient-to-b from-space-900 via-space-950 to-space-900 border-2 border-cosmic-blue/60 shadow-glow-blue-lg flex flex-col justify-between overflow-hidden"
          >
            {/* Holographic Sheen / Light Reflection Overlay */}
            <div 
              style={{
                background: `linear-gradient(${120 + cardPos.angle * 2}deg, rgba(255,255,255,0.18) 0%, rgba(44,103,237,0.15) 35%, transparent 60%)`,
              }}
              className="absolute inset-0 pointer-events-none rounded-3xl" 
            />

            {/* Microcircuit Background Graphic */}
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#2c67ed_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mt-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cosmic-blue/20 border border-cosmic-blue flex items-center justify-center text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-black tracking-wider text-white font-mono">
                    AFANDY <span className="text-cosmic-blue">TECH</span>
                  </div>
                  <div className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">
                    Developer Pass
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[9px] font-mono font-bold">
                <Wifi className="w-2.5 h-2.5 animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Formal Photo & Glowing Frame */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative group">
                <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl p-[2px] bg-gradient-to-tr from-cosmic-blue via-cyan-400 to-blue-600 shadow-glow-blue">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-space-950 relative">
                    <img
                      src={photoUrl}
                      alt={name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Futuristic scanline animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-6 w-full animate-meteor pointer-events-none" />
                  </div>
                </div>

                {/* Hologram security chip */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 p-[1px] shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-amber-950/90 rounded-[7px] flex items-center justify-center">
                    <Fingerprint className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mt-3">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight text-glow">
                  {name}
                </h3>
                <p className="text-xs font-semibold text-cyan-300 font-mono mt-0.5">
                  {role}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {institution}
                </p>
              </div>
            </div>

            {/* Card Footer Info & Barcode */}
            <div className="relative z-10 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span>ID: <strong className="text-slate-200">{idNumber}</strong></span>
                <span className="text-cosmic-blue font-bold">VERIFIED AUTH</span>
              </div>
              
              {/* Stylized Barcode Graphic */}
              <div className="h-6 w-full flex items-center justify-between gap-[2px] bg-space-950/80 px-2 py-1 rounded-lg border border-slate-800">
                {[12, 18, 6, 22, 14, 8, 24, 16, 10, 20, 7, 18, 14, 22, 9, 16, 20, 11, 24, 15, 8, 20, 14, 18].map((h, idx) => (
                  <div 
                    key={idx} 
                    style={{ height: `${h}px` }} 
                    className={`w-[2px] ${idx % 3 === 0 ? 'bg-cyan-400' : 'bg-slate-400'}`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-b from-space-950 via-space-900 to-space-950 border-2 border-cyan-500/60 shadow-glow-cyan flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Magnetic Stripe Top */}
            <div className="absolute top-6 left-0 right-0 h-10 bg-slate-900 border-y border-slate-700 shadow-inner" />

            <div className="relative z-10 pt-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    SECURITY ACCESS PASS
                  </span>
                </div>
                <QrCode className="w-8 h-8 text-cyan-300 bg-space-950 p-1 rounded-lg border border-cyan-500/30" />
              </div>

              <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed font-sans">
                <p>
                  Kartu identitas resmi pengembang sistem dan spesialis jaringan komputer.
                </p>
                <div className="p-2.5 rounded-xl bg-space-950/90 border border-slate-800 font-mono text-[10px] space-y-1">
                  <div><span className="text-slate-400">HOLDER:</span> Afandy Developer</div>
                  <div><span className="text-slate-400">DOMAIN:</span> Network Eng. & Full-Stack</div>
                  <div><span className="text-slate-400">CLASS:</span> SMK Nurul Huda Ngawen</div>
                  <div><span className="text-slate-400">STATUS:</span> Authorized 2023 - 2026</div>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="relative z-10 pt-3 border-t border-slate-800">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[9px] text-slate-400 font-mono">AUTHORIZED SIGNATURE</div>
                  <div className="text-sm font-bold text-cyan-300 font-mono italic tracking-wide">
                    Afandy.Dev
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flip Button Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold text-white bg-space-900/90 border border-cosmic-blue hover:bg-cosmic-blue shadow-glow-blue transition-all cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
          <span>{isFlipped ? 'Lihat Sisi Depan' : 'Putar Kartu (Sisi Belakang)'}</span>
        </button>
      </div>
    </div>
  );
};

export default Lanyard;
