'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Aman K.',
    role: 'Aspiring Developer',
    text: 'Shipped my first app in 3 weeks thanks to his mentorship. He explained everything from architecture to Play Store submission.',
    rating: 5,
    avatar: '🧑‍💻',
  },
  {
    name: 'Priya S.',
    role: 'Startup Founder',
    text: 'Best consultation I had — saved me weeks of work. His code review caught critical bugs before our launch.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Ravi M.',
    role: 'Tech Lead',
    text: 'Production-quality code from day one. Clean architecture, proper error handling, and great communication throughout.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Sneha D.',
    role: 'Freelancer',
    text: 'The mentorship session was incredibly valuable. I went from confused beginner to building real apps in under a month.',
    rating: 5,
    avatar: '👩‍🎓',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Real feedback from real people</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-7 relative group hover:glow-violet transition-shadow"
            >
              <Quote size={32} className="text-violet-400/20 absolute top-4 right-4" />
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                <div className="text-3xl">{t.avatar}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
