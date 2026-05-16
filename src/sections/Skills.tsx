'use client';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Java', level: 95, color: 'from-orange-500 to-red-500' },
  { name: 'XML / Android UI', level: 92, color: 'from-emerald-400 to-teal-500' },
  { name: 'Firebase', level: 88, color: 'from-amber-400 to-orange-500' },
  { name: 'REST APIs', level: 85, color: 'from-blue-400 to-indigo-500' },
  { name: 'Figma', level: 78, color: 'from-pink-400 to-purple-500' },
  { name: 'Play Store Publishing', level: 95, color: 'from-violet-400 to-purple-600' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Skills & <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Technologies I use to ship production apps</p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-5 hover:glow-violet transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm text-white/60 font-mono">{s.level}%</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
