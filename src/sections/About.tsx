'use client';
import { motion } from 'framer-motion';
import { Server, Smartphone, Star, TrendingUp, Building2, Shield } from 'lucide-react';

const STATS = [
  { icon: Building2, value: '4+', label: 'Years Experience' },
  { icon: Server, value: '200+', label: 'Tests Written' },
  { icon: Smartphone, value: '10+', label: 'Live Apps' },
  { icon: TrendingUp, value: '30%', label: 'API Speedup' },
  { icon: Shield, value: '90%+', label: 'Code Coverage' },
  { icon: Star, value: '3', label: 'Fortune 500 Clients' },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 section-nebula">
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
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-violet-600 via-cyan-500 to-pink-500 p-[2px]">
                <div className="w-full h-full rounded-3xl glass flex items-center justify-center relative overflow-hidden">
                  {/* Animated orbit decoration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-violet-500/10 rounded-full orbit" style={{ ['--speed' as any]: '15s', ['--radius' as any]: '0px' }} />
                  </div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-2">🚀</div>
                    <p className="font-bold text-lg">Ajay Singh</p>
                    <p className="text-white/60 text-xs mt-1 font-mono">Sr. Analyst</p>
                    <p className="text-white/40 text-xs">Accenture</p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 text-sm pulse-ring"
              >
                <span className="text-green-400">●</span> Open to Collaborate
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -top-3 -left-3 glass rounded-xl px-3 py-1.5 text-xs"
              >
                🏢 Ex-Infosys
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed text-lg">
              I&apos;m a <strong>Software Engineer</strong> at <strong>Accenture</strong> with 4+ years of experience
              building enterprise-grade backend systems for <strong>Fortune 500</strong> clients in the financial services
              and insurance domain. Previously at <strong>Infosys</strong>, I delivered Spring Boot microservices
              for Securian Financial, Allstate, and Allianz.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              Beyond enterprise work, I&apos;ve shipped <strong>10+ Android apps</strong> on the Play Store —
              from reward platforms to crypto trackers. I bring both corporate-scale architecture
              and indie-app speed to every project.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass rounded-xl p-3 text-center hover:glow-violet transition-shadow"
                >
                  <s.icon size={18} className="mx-auto text-violet-400 mb-1.5" />
                  <div className="text-lg font-bold font-mono">{s.value}</div>
                  <div className="text-[10px] text-white/50 mt-0.5 leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
