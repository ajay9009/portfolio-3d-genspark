import Link from 'next/link';
import { Code2, ExternalLink, Mail, Heart, Rocket } from 'lucide-react';

const footerLinks = [
  { label: 'Apps', href: '/#apps' },
  { label: 'Services', href: '/#pricing' },
  { label: 'Courses', href: '/courses' },
  { label: 'Book', href: '/book' },
  { label: 'Dashboard', href: '/dashboard' },
];

const socials = [
  { icon: Code2, label: 'GitHub', href: 'https://github.com/ajay9009/' },
  { icon: ExternalLink, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajay-singh-9009/' },
  { icon: Mail, label: 'Email', href: 'mailto:growdigital1996@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--fg))]/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Rocket size={18} className="text-violet-400" />
              <span className="gradient-text">AjaySingh</span>
              <span className="text-xs font-mono text-white/30">.dev</span>
            </h3>
            <p className="mt-3 text-[rgb(var(--fg))]/60 text-sm leading-relaxed">
              Software Engineer at Accenture. 4+ years building enterprise
              backend systems & 10+ Android apps on Play Store.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Java', 'Spring Boot', 'Microservices', 'Android'].map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass text-white/40 font-mono">{t}</span>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[rgb(var(--fg))]/60 text-sm hover:text-violet-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[rgb(var(--fg))]/60 text-sm hover:text-violet-400 transition-colors">
                  <s.icon size={16} /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[rgb(var(--fg))]/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[rgb(var(--fg))]/40 text-sm">
            © {new Date().getFullYear()} Ajay Singh · Software Engineer
          </p>
          <p className="text-[rgb(var(--fg))]/40 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-400" /> using Next.js & React Three Fiber
          </p>
        </div>
      </div>
    </footer>
  );
}
