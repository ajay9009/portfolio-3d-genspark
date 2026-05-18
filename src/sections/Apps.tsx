'use client';
import { APPS } from '@/lib/apps-data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ChevronRight } from 'lucide-react';

export default function Apps() {
  return (
    <section id="apps" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Apps on <span className="gradient-text">Play Store</span>
          </h2>
          <p className="text-center text-white/60 mt-4">
            Real apps. Real users. Real revenue.
          </p>
        </motion.div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {APPS.slice(0, 3).map((app, i) => (
            <motion.div
              key={app.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 group"
              style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
            >
              {/* App Icon - clickable to detail */}
              <Link href={`/apps/${app.slug}`}>
                <div className={`h-44 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-5 relative overflow-hidden cursor-pointer group-hover:shadow-xl transition-shadow duration-300`}>
                  <Image
                    src={`/apps/${app.slug}.png`}
                    alt={app.name}
                    width={120}
                    height={120}
                    className="rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </Link>
              <Link href={`/apps/${app.slug}`}>
                <h3 className="text-2xl font-bold hover:text-violet-400 transition-colors cursor-pointer">{app.name}</h3>
              </Link>
              <p className="text-white/60 text-sm mt-2 line-clamp-2">{app.tagline}</p>
              <div className="mt-5 flex gap-2">
                <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-primary text-xs !py-2 flex-1 text-center">
                  <ExternalLink size={14} /> Play Store
                </a>
                <Link href={`/apps/${app.slug}`}
                  className="btn-ghost text-xs !py-2 flex-1 text-center">
                  Details <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link href="/apps" className="btn-ghost">
            View All Apps <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
