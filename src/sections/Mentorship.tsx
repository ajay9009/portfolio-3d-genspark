'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Rocket, Server, Code2 } from 'lucide-react';

const POINTS = [
  { icon: Server, text: 'Learn enterprise-grade Spring Boot architecture from a senior engineer' },
  { icon: GraduationCap, text: 'Master Android development with 10+ shipped Play Store apps' },
  { icon: Code2, text: 'Get personalized code reviews & career guidance' },
  { icon: Rocket, text: 'Build production-ready microservices & APIs from scratch' },
  { icon: Users, text: '1:1 mentorship sessions tailored to your learning goals' },
  { icon: BookOpen, text: 'Learn CQRS, Event Sourcing, and event-driven patterns' },
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block px-4 py-1 rounded-full glass text-xs mb-6 font-mono">🚀 Level Up Your Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Launch Your Career in{' '}
            <span className="gradient-text">Software Engineering</span>
          </h2>
          <p className="mt-6 text-white/75 text-lg max-w-2xl mx-auto">
            Whether you&apos;re starting with Android or diving into backend systems,
            get mentored by someone who&apos;s built both — from indie apps to Fortune 500 enterprise platforms.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
            {POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass rounded-xl p-4 hover:glow-violet transition-shadow"
              >
                <p.icon size={24} className="text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-white/70">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <Link href="/book?service=springboot-consultation" className="btn-primary inline-block mt-10 text-lg !px-8 !py-4">
            Book Your Mentorship Call
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
