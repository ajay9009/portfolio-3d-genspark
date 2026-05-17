'use client';
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    category: '🔧 Backend & Core',
    skills: [
      { name: 'Java', level: 95, color: 'from-orange-500 to-red-500' },
      { name: 'Spring Boot / MVC', level: 93, color: 'from-emerald-400 to-green-600' },
      { name: 'REST APIs', level: 92, color: 'from-blue-400 to-indigo-500' },
      { name: 'Microservices', level: 90, color: 'from-violet-400 to-purple-600' },
    ],
  },
  {
    category: '🗄️ Data & Messaging',
    skills: [
      { name: 'PostgreSQL', level: 88, color: 'from-sky-400 to-blue-600' },
      { name: 'MongoDB', level: 80, color: 'from-emerald-400 to-teal-600' },
      { name: 'Kafka', level: 78, color: 'from-amber-400 to-orange-600' },
      { name: 'JMS / IBM MQ', level: 82, color: 'from-cyan-400 to-blue-500' },
    ],
  },
  {
    category: '☁️ Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 82, color: 'from-amber-400 to-orange-500' },
      { name: 'Docker / K8s', level: 80, color: 'from-blue-400 to-cyan-500' },
      { name: 'CI/CD (Jenkins)', level: 85, color: 'from-red-400 to-pink-500' },
      { name: 'SonarQube', level: 83, color: 'from-indigo-400 to-violet-500' },
    ],
  },
  {
    category: '📱 Mobile & Frontend',
    skills: [
      { name: 'Android (Java/XML)', level: 92, color: 'from-green-400 to-emerald-600' },
      { name: 'Firebase', level: 88, color: 'from-amber-300 to-orange-500' },
      { name: 'Figma', level: 75, color: 'from-pink-400 to-purple-500' },
      { name: 'Play Store Publishing', level: 95, color: 'from-violet-400 to-purple-700' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 section-nebula">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Tech <span className="gradient-text">Universe</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Technologies I use to build enterprise systems & ship production apps</p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 hover:glow-violet transition-shadow"
            >
              <h3 className="text-lg font-bold mb-5">{cat.category}</h3>
              <div className="space-y-4">
                {cat.skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-medium text-sm">{s.name}</span>
                      <span className="text-xs text-white/50 font-mono">{s.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: ci * 0.1 + i * 0.08, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${s.color} shadow-sm`}
                        style={{ boxShadow: `0 0 12px rgba(139,92,246,0.2)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
