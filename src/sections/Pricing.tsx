'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap, Server, Smartphone, Cloud, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEMO_SERVICES } from '@/lib/demo-data';

const ICON_MAP: Record<string, any> = {
  'android-consultation': Smartphone,
  'springboot-consultation': Server,
  'api-microservices': Code2,
  'full-stack-strategy': Cloud,
};

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('price_inr', { ascending: true });

        if (error || !data || data.length === 0) {
          // Fallback to demo data
          setPlans(DEMO_SERVICES.map(s => ({
            slug: s.slug,
            title: s.title,
            price_inr: s.price_inr,
            duration: s.duration,
            category: s.category,
            items: s.features,
            popular: s.popular,
          })));
        } else {
          const mapped = data.map((s: any) => ({
            slug: s.slug,
            title: s.title,
            price_inr: s.price_inr,
            duration: s.duration,
            category: s.category || 'Service',
            items: s.features || [],
            popular: s.popular || false,
          }));
          // Ensure at least one plan has the MOST POPULAR tag
          if (!mapped.some((p: any) => p.popular) && mapped.length >= 2) {
            mapped[1].popular = true;
          }
          setPlans(mapped);
        }
      } catch {
        setPlans(DEMO_SERVICES.map(s => ({
          slug: s.slug,
          title: s.title,
          price_inr: s.price_inr,
          duration: s.duration,
          category: s.category,
          items: s.features,
          popular: s.popular,
        })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="pricing" className="py-28 px-6 section-nebula">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Consultation <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Specialized services tailored to your needs. Pay securely via Razorpay.</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/60 py-16">Loading plans...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {plans.map((p, i) => {
              const IconComp = ICON_MAP[p.slug] || Code2;
              return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`rounded-2xl p-6 relative flex flex-col group hover:scale-[1.02] transition-transform ${
                    p.popular
                      ? 'gradient-border glass bg-gradient-to-b from-violet-500/10 to-transparent'
                      : 'glass'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 via-cyan-500 to-purple-600 text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Zap size={12} /> MOST POPULAR
                    </span>
                  )}

                  {/* Icon & Category */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:glow-violet transition-shadow">
                      <IconComp size={20} className="text-violet-400" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{p.category}</span>
                  </div>

                  <h3 className="text-lg font-bold mt-1">{p.title}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-bold font-mono">₹{p.price_inr}</span>
                    <span className="text-white/50 text-sm ml-2">/ {p.duration}</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm flex-1">
                    {(p.items || []).map((x: string) => (
                      <li key={x} className="flex items-start gap-2 text-white/70">
                        <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/book?service=${p.slug}`}
                    className={`mt-6 w-full block text-center rounded-xl py-3 font-semibold transition-all ${
                      p.popular
                        ? 'btn-primary'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10'
                    }`}
                  >
                    Book Now
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
