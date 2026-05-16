'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, Star, TrendingUp } from 'lucide-react';

const STATS = [
  { icon: Smartphone, value: '10+', label: 'Live Apps' },
  { icon: Star, value: '4.5+', label: 'Avg Rating' },
  { icon: TrendingUp, value: '50K+', label: 'Downloads' },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-5 gap-10 items-center"
        >
          {/* Avatar / Visual */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-3xl glass flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">👨‍💻</div>
                    <p className="font-bold text-lg">Android Dev</p>
                    <p className="text-white/60 text-sm">Since 2021</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 text-sm">
                <span className="text-green-400">●</span> Available for hire
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed text-lg">
              I&apos;m an Android developer with <strong>10+ apps</strong> shipped on the Play Store,
              built with Java and XML and powered by Firebase. I&apos;ve worked on enterprise-grade
              projects where reliability matters, and on indie reward/crypto apps where speed-to-market
              wins.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              I understand the full app lifecycle — from Figma mockups to Play Store ASO and
              post-launch crash analytics. Whether you need a polished MVP or need to scale
              an existing app, I bring real production experience to every project.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <s.icon size={24} className="mx-auto text-violet-400 mb-2" />
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-white/60 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
