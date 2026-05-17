'use client';
import { motion } from 'framer-motion';
import { Building2, Rocket, Gamepad2, Wallet, Server, Briefcase } from 'lucide-react';

const ITEMS = [
  {
    year: '2026 – Present',
    title: 'Accenture — Sr. Analyst',
    desc: 'Delivering custom software engineering solutions for global enterprise clients. Building and maintaining Java/Spring Boot microservices, designing scalable REST APIs, and driving DevOps practices across cloud-native platforms.',
    icon: Briefcase,
    tags: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    highlight: true,
  },
  {
    year: '2023 – 2026',
    title: 'Infosys — Software Engineer',
    desc: 'Built and optimized Spring Boot microservices for Fortune 500 insurance clients. Designed secure RESTful APIs, implemented JMS workflows with IBM MQ, improved API performance by 30% through refactoring, and delivered production-ready modules for Account, Billing, Policy, and Contract Administration. Documented APIs with Swagger/OpenAPI.',
    icon: Server,
    tags: ['Spring Boot', 'PostgreSQL', 'JMS', 'MongoDB', 'REST', 'Swagger'],
  },
  {
    year: '2024',
    title: 'CoinPe Launch',
    desc: 'Crypto wallet with biometric unlock & UPI bridge. 10K+ downloads in the first month.',
    icon: Wallet,
    tags: ['Android', 'Java', 'Firebase'],
  },
  {
    year: '2023',
    title: 'Coinova + CoinZoo',
    desc: 'Crypto trackers with live candlestick charts, signals, and portfolio analytics.',
    icon: Rocket,
    tags: ['Android', 'Firebase', 'REST APIs'],
  },
  {
    year: '2021 – 2022',
    title: 'Rewardly + Rewardplay',
    desc: 'First reward & gaming platforms. Anti-fraud system, UPI payouts, 50K+ users across both apps.',
    icon: Gamepad2,
    tags: ['Android', 'Java', 'Firebase'],
  },
];

export default function Timeline() {
  return (
    <section className="py-28 px-6 section-nebula">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Journey Through the <span className="gradient-text">Universe</span>
          </h2>
          <p className="text-center text-white/60 mt-4">From first app to enterprise-scale systems</p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Vertical cosmic line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-500 via-pink-500 to-transparent" />

          <div className="space-y-8">
            {ITEMS.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div className={`absolute left-[14px] top-2 w-5 h-5 rounded-full ring-4 ring-[rgb(var(--bg))] ${
                  it.highlight
                    ? 'bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-violet-500/30'
                    : 'bg-gradient-to-br from-violet-500 to-cyan-500'
                }`} />
                {/* Card */}
                <div className={`glass rounded-2xl p-6 hover:glow-violet transition-shadow ${
                  it.highlight ? 'gradient-border' : ''
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <it.icon size={18} className="text-violet-400" />
                    <span className="text-sm font-mono text-violet-400">{it.year}</span>
                    {it.highlight && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-medium">CURRENT</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{it.title}</h3>
                  <p className="text-white/60 mt-2">{it.desc}</p>
                  {it.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {it.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass text-white/50 font-mono">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
