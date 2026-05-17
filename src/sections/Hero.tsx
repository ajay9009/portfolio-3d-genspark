'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, ChevronDown, Terminal, Smartphone, Server, Cloud } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const ROLES = [
  'Software Engineer',
  'Backend Architect',
  'Android Developer',
  'Spring Boot Expert',
  'Microservices Builder',
  'API Designer',
];

// Fixed particle positions — prevents hydration mismatch (no Math.random in render)
const PARTICLES = [
  { w: 3, h: 3.5, top: 15, left: 20, color: '#8b5cf6', duration: '3s', delay: '0s' },
  { w: 2.5, h: 2.5, top: 45, left: 70, color: '#22d3ee', duration: '4s', delay: '0.5s' },
  { w: 2, h: 2, top: 75, left: 35, color: '#f472b6', duration: '2.5s', delay: '1s' },
  { w: 3.2, h: 3, top: 25, left: 85, color: '#fbbf24', duration: '3.5s', delay: '0.3s' },
  { w: 2.8, h: 2.2, top: 60, left: 12, color: '#10b981', duration: '4.2s', delay: '0.7s' },
  { w: 1.5, h: 1.8, top: 88, left: 55, color: '#3b82f6', duration: '3.8s', delay: '1.2s' },
];

function TypeWriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    const speed = deleting ? 40 : 80;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  // Mouse parallax tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Cosmic grid pattern with mouse parallax */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)` }}
        />
        {/* Fixed-position cosmic particles (no Math.random) */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full star-twinkle"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              background: p.color,
              opacity: 0.4,
              ['--duration' as string]: p.duration,
              ['--delay' as string]: p.delay,
            }}
          />
        ))}
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
            <span>Sr. Analyst @ Accenture · Ex-Infosys · 4+ Years</span>
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
            I&apos;m a{' '}
            <span className="relative">
              <TypeWriter />
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-white/65 max-w-xl leading-relaxed"
          >
            Java · Spring Boot · Microservices · REST APIs · Android · AWS
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Building enterprise-grade systems that scale for Fortune 500 clients.
          </motion.p>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Kafka', 'Docker', 'AWS', 'Android'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="px-3 py-1 text-xs rounded-full glass text-white/60 font-mono"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/book" className="btn-primary text-base group">
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> Let&apos;s Collaborate
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
            <div className="flex gap-3">
              {[
                { icon: Server, label: 'Backend' },
                { icon: Smartphone, label: 'Mobile' },
                { icon: Cloud, label: 'Cloud' },
                { icon: Terminal, label: 'DevOps' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center group relative"
                  title={item.label}
                >
                  <item.icon size={16} className="text-violet-400" />
                </motion.div>
              ))}
            </div>
            <span>Trusted by enterprise clients worldwide</span>
          </motion.div>
        </motion.div>

        {/* Right side — Code preview teaser (3D mouse parallax) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden md:block"
          style={{
            transform: `perspective(800px) rotateY(${mouse.x * 5}deg) rotateX(${-mouse.y * 5}deg) translateX(${mouse.x * 10}px) translateY(${mouse.y * 10}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="code-block max-w-md ml-auto">
            <div className="flex gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <pre className="text-[0.75rem] leading-relaxed">
              <span className="comment">// AjaySingh.java</span>{'\n'}
              <span className="keyword">@Component</span>{'\n'}
              <span className="keyword">public class</span> <span className="type">AjaySingh</span>{'\n'}
              {'  '}<span className="keyword">implements</span> <span className="type">Engineer</span> {'{'}{'\n'}
              {'\n'}
              {'  '}<span className="keyword">private</span> String role ={'\n'}
              {'    '}<span className="string">&quot;Sr. Analyst @ Accenture&quot;</span>;{'\n'}
              {'\n'}
              {'  '}<span className="keyword">private</span> String[] stack = {'{'}{'\n'}
              {'    '}<span className="string">&quot;Java&quot;</span>, <span className="string">&quot;Spring Boot&quot;</span>,{'\n'}
              {'    '}<span className="string">&quot;Microservices&quot;</span>, <span className="string">&quot;Kafka&quot;</span>,{'\n'}
              {'    '}<span className="string">&quot;Docker&quot;</span>, <span className="string">&quot;AWS&quot;</span>{'\n'}
              {'  }'};{'\n'}
              {'\n'}
              {'  '}<span className="keyword">public</span> String <span className="method">getMotivation</span>() {'{'}{'\n'}
              {'    '}<span className="keyword">return</span> <span className="string">&quot;Clean APIs,{'\n'}
              {'      '}zero-downtime deploys&quot;</span>;{'\n'}
              {'  }'}{'\n'}
              {'}'}
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-medium tracking-widest uppercase font-mono">Explore the Universe</span>
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
