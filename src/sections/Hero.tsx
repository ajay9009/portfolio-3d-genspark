'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.25),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.2),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.15),transparent_60%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Animated floating dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-500/40 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse delay-1000" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium"
          >
            <Sparkles size={14} className="text-violet-400" />
            <span>10+ Apps on Play Store · Android Developer</span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight"
          >
            I Build{' '}
            <span className="relative">
              <span className="gradient-text">Android Apps</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 rounded-full origin-left"
              />
            </span>
            <br />That Actually Scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-white/65 max-w-xl leading-relaxed"
          >
            Java · XML · Firebase · Production-grade architecture.
            <br className="hidden sm:block" />
            Enterprise experience meets indie-app polish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/book" className="btn-primary text-base group">
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> Hire Me
            </Link>
            <Link href="/book" className="btn-ghost text-base">
              <Calendar size={18} /> Book Consultation
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-6 text-sm text-white/50"
          >
            <div className="flex -space-x-2">
              {['🧑‍💻','👩‍💼','👨‍💻','👩‍🎓','🧑‍🔬'].map((e,i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs ring-2 ring-[rgb(var(--bg))]"
                >
                  {e}
                </motion.div>
              ))}
            </div>
            <span>Trusted by 50+ clients worldwide</span>
          </motion.div>
        </motion.div>

        {/* Right side — empty space for the floating orb */}
        <div className="hidden md:block h-[500px]" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
