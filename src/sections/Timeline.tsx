'use client';
import { motion } from 'framer-motion';
import { Rocket, Building2, Gamepad2, Wallet } from 'lucide-react';

const ITEMS = [
  { year: '2024', title: 'CoinPe Launch', desc: 'Crypto wallet with biometric unlock & UPI bridge. 10K+ downloads in first month.', icon: Wallet },
  { year: '2023', title: 'Coinova + CoinZoo', desc: 'Crypto trackers with live candlestick charts, signals, and portfolio analytics.', icon: Rocket },
  { year: '2022', title: 'Enterprise Android Work', desc: 'Built and maintained production apps at scale for enterprise clients.', icon: Building2 },
  { year: '2021', title: 'Rewardly + Rewardplay', desc: 'First reward & gaming platforms. Anti-fraud system, UPI payouts, 50K+ users.', icon: Gamepad2 },
];

export default function Timeline() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Journey & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-center text-white/60 mt-4">From first app to enterprise scale</p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent" />

          <div className="space-y-8">
            {ITEMS.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div className="absolute left-[14px] top-2 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 ring-4 ring-[rgb(var(--bg))]" />
                {/* Card */}
                <div className="glass rounded-2xl p-6 hover:glow-violet transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <it.icon size={18} className="text-violet-400" />
                    <span className="text-sm font-mono text-violet-400">{it.year}</span>
                  </div>
                  <h3 className="text-xl font-bold">{it.title}</h3>
                  <p className="text-white/60 mt-2">{it.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
