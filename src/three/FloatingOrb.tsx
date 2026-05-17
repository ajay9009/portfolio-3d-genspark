'use client';
import { useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

/* ==========================================
   PIXAR TECH MASCOT — Floating robot buddy
   Smooth scroll-following + mouse-reactive
   mix-blend-mode: screen removes dark bg
   ========================================== */

export default function FloatingOrb() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const { scrollYProgress } = useScroll();

  // Smoother spring — higher stiffness for less "sticking"
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  // Smooth mouse tracking via RAF instead of setState re-renders
  const handleMouse = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // RAF loop for smooth mouse transform
    const animate = () => {
      if (containerRef.current) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        containerRef.current.style.transform =
          `perspective(600px) rotateY(${mx * 10}deg) rotateX(${my * 6}deg) translateX(${mx * 12}px) translateY(${-my * 8}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouse]);

  // Keep it absolute to avoid overlapping content lower on the page (no stucking)
  const x = useTransform(smoothProgress, [0, 1], ['55%', '40%']);
  const y = useTransform(smoothProgress, [0, 1], ['10vh', '30vh']);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute top-0 right-0 w-[220px] h-[220px] md:w-[300px] md:h-[300px] z-0 pointer-events-none"
    >
      {/* Mouse-reactive + bobbing container */}
      <div
        ref={containerRef}
        className="w-full h-full relative will-change-transform"
        style={{ transition: 'none' }}
      >
        {/* Glow effect behind the mascot */}
        <div className="absolute inset-[15%] rounded-full bg-violet-500/25 blur-[35px] animate-pulse" />
        <div className="absolute inset-[20%] rounded-full bg-cyan-500/15 blur-[30px] animate-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Bobbing wrapper — CSS animation for natural float */}
        <div className="w-full h-full relative mascot-float">
          {/* The Pixar robot mascot — mix-blend-mode: screen removes dark bg */}
          <Image
            src="/images/tech-mascot.png"
            alt="AI Tech Mascot"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.4)] mix-blend-screen"
            sizes="300px"
            priority
          />
        </div>

        {/* Subtle floating particles */}
        <div className="absolute top-[8%] left-[8%] w-1.5 h-1.5 rounded-full bg-violet-400/60 star-twinkle"
          style={{ ['--duration' as string]: '2.5s', ['--delay' as string]: '0s' } as React.CSSProperties} />
        <div className="absolute top-[20%] right-[5%] w-1 h-1 rounded-full bg-cyan-400/50 star-twinkle"
          style={{ ['--duration' as string]: '3s', ['--delay' as string]: '0.5s' } as React.CSSProperties} />
        <div className="absolute bottom-[12%] left-[12%] w-1 h-1 rounded-full bg-pink-400/50 star-twinkle"
          style={{ ['--duration' as string]: '3.5s', ['--delay' as string]: '1s' } as React.CSSProperties} />
        <div className="absolute bottom-[25%] right-[10%] w-1.5 h-1.5 rounded-full bg-amber-400/40 star-twinkle"
          style={{ ['--duration' as string]: '2.8s', ['--delay' as string]: '0.7s' } as React.CSSProperties} />
      </div>
    </motion.div>
  );
}
