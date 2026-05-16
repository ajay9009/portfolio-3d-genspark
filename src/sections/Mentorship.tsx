'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

const POINTS = [
  { icon: GraduationCap, text: 'Learn from 10+ shipped Play Store apps' },
  { icon: Users, text: 'Get 1:1 personalized guidance & code reviews' },
  { icon: BookOpen, text: 'Build a real app from scratch with mentorship' },
];

export default function Mentorship() {
  return (
    <section className="py-28 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto glass rounded-3xl p-12 md:p-16 text-center bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block px-4 py-1 rounded-full glass text-xs mb-6">🎓 For Beginners & Freshers</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Start Your Android Journey with{' '}
            <span className="gradient-text">Guidance</span>
          </h2>
          <p className="mt-6 text-white/75 text-lg max-w-2xl mx-auto">
            Avoid beginner mistakes. Learn from real-world experience with 10+ shipped apps.
            I&apos;ll help you go from zero to your first Play Store app.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
            {POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <p.icon size={28} className="text-violet-400 mx-auto mb-2" />
                <p className="text-sm text-white/70">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <Link href="/book?service=mentorship" className="btn-primary inline-block mt-10 text-lg !px-8 !py-4">
            Book Your First Call
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
