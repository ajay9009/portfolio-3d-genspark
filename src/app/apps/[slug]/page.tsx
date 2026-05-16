import { APPS } from '@/lib/apps-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return APPS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = APPS.find(a => a.slug === slug);
  if (!app) return {};
  return { title: `${app.name} — ${app.tagline}`, description: app.description };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = APPS.find(a => a.slug === slug);
  if (!app) notFound();

  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/apps" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
          ← All Apps
        </Link>

        {/* Hero */}
        <div className={`mt-6 rounded-3xl p-10 md:p-16 bg-gradient-to-br ${app.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">{app.name}</h1>
              <p className="mt-3 text-xl text-white/90">{app.tagline}</p>
              <p className="mt-5 text-white/80 leading-relaxed">{app.description}</p>
              <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-black/40 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-black/60 transition-colors shadow-lg">
                ⬇ Download on Play Store
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                  <Image
                    src={`/apps/${app.slug}.png`}
                    alt={app.name}
                    width={180}
                    height={180}
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-sm text-white font-medium">
                  ⭐ 4.5+
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features + Screenshots */}
        <section className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Features</h2>
            <ul className="mt-6 space-y-3">
              {app.features.map(f => (
                <li key={f} className="glass rounded-xl px-5 py-4 flex items-center gap-3">
                  <span className="text-violet-400">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Screenshots</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {app.screenshots.map((_, i) => (
                <div
                  key={i}
                  className={`aspect-[9/19] rounded-2xl bg-gradient-to-b ${app.color} flex items-center justify-center shadow-lg`}
                >
                  <div className="text-center text-white/70">
                    <div className="text-3xl mb-1">📱</div>
                    <span className="text-xs">Screen {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-20 glass rounded-3xl p-10 md:p-14">
          <h3 className="text-3xl md:text-4xl font-bold">
            Like this? <span className="gradient-text">Let&apos;s build yours.</span>
          </h3>
          <p className="text-white/60 mt-4">I can build a similar app for your business</p>
          <Link href="/book" className="btn-primary inline-block mt-6">Book Consultation</Link>
        </div>
      </div>
    </main>
  );
}
