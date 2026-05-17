'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/#apps', label: 'Apps' },
    { href: '/#pricing', label: 'Services' },
    { href: '/courses', label: 'Courses' },
    { href: '/book', label: 'Book' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Rocket size={20} className="text-violet-400" />
          <span className="gradient-text">AjaySingh</span>
          <span className="text-[10px] font-mono text-white/30 hidden sm:inline">.dev</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-violet-400 transition-colors">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/book" className="btn-primary text-sm !py-2">Let&apos;s Talk</Link>
        </div>
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}>
        <div className="bg-[#0f0f14]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 shadow-2xl">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="py-2 text-lg font-medium hover:text-violet-400 transition-colors">{l.label}</Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">Let&apos;s Talk</Link>
        </div>
      </div>
    </header>
  );
}
