import React, { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars & Particles Config
    const starsCount = Math.floor((width * height) / 3500);
    let stars = [];
    let shootingStars = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.3,
          color: Math.random() > 0.3 ? '#ffffff' : Math.random() > 0.5 ? '#7dd3fc' : '#818cf8',
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.02) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 90 + 50,
          speed: Math.random() * 7 + 9,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          width: Math.random() * 1.5 + 1.2,
        });
      }
    };

    initStars();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
      });

      // Draw Shooting Stars
      createShootingStar();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#2c67ed';

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const endX = s.x - Math.cos(s.angle) * s.length;
        const endY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(0.3, `rgba(44, 103, 237, ${s.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(44, 103, 237, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.globalAlpha = s.opacity;
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Gradients & Nebulae */}
      <div className="absolute top-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-cosmic-blue/15 blur-[130px]" />
      <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-cosmic-purple/15 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px]" />
      
      {/* Grid Pattern overlay for tech vibe */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2c67ed_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default StarfieldBackground;
