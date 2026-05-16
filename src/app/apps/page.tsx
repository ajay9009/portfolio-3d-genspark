import { APPS } from '@/lib/apps-data';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Apps | Android Developer Portfolio',
  description: 'Browse 10+ Android apps on the Play Store — reward platforms, crypto trackers, wallets, and more.',
};

export default function AppsPage() {
  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          My <span className="gradient-text">Apps</span>
        </h1>
        <p className="text-center text-white/60 mt-4">
          Real apps. Real users. Real revenue. Explore the full collection.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {APPS.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 hover:glow-violet"
            >
              <div className={`h-44 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-5 relative overflow-hidden`}>
                <Image
                  src={`/apps/${app.slug}.png`}
                  alt={app.name}
                  width={100}
                  height={100}
                  className="rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold">{app.name}</h2>
              <p className="text-white/60 text-sm mt-2">{app.tagline}</p>
              <p className="text-white/40 text-xs mt-3 line-clamp-2">{app.description}</p>
              <div className="mt-5">
                <span className="btn-primary text-xs !py-2 w-full block text-center">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
