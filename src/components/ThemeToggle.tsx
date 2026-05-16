'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') { setDark(false); document.documentElement.classList.replace('dark','light'); }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.replace(next ? 'light' : 'dark', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full glass transition-all hover:scale-110"
    >
      {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-violet-400" />}
    </button>
  );
}
