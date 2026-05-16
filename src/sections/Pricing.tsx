'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const PLANS = [
  { slug: 'starter', title: 'Starter Call', price: 499, duration: '20 min', items: ['Quick Q&A session', 'App idea validation', 'Email follow-up'], popular: false },
  { slug: 'strategy', title: 'App Strategy', price: 999, duration: '30 min', items: ['Strategy document', 'Tech stack advice', 'Architecture review', 'Roadmap planning'], popular: false },
  { slug: 'mentorship', title: 'Mentorship', price: 1999, duration: '1 hour', items: ['Deep-dive session', 'Code review', 'Career guidance', 'Project feedback', 'Slack follow-up'], popular: true },
  { slug: 'full', title: 'Full Consultation', price: 4999, duration: '90 min', items: ['Complete architecture plan', 'Detailed roadmap', 'Tech stack decisions', 'Database design', '30-day email support'], popular: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Services & <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Pick what fits. Pay securely via Razorpay.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-2xl p-6 relative flex flex-col ${
                p.popular
                  ? 'gradient-border glass bg-gradient-to-b from-violet-500/10 to-transparent'
                  : 'glass'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Zap size={12} /> POPULAR
                </span>
              )}
              <h3 className="text-lg font-bold mt-2">{p.title}</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold">₹{p.price}</span>
                <span className="text-white/50 text-sm ml-2">/ {p.duration}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.items.map(x => (
                  <li key={x} className="flex items-start gap-2 text-white/70">
                    <Check size={16} className="text-violet-400 shrink-0 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?service=${p.slug}`}
                className={`mt-6 w-full block text-center rounded-xl py-3 font-semibold transition-all ${
                  p.popular
                    ? 'btn-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50'
                }`}
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
