import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToHome({ label = 'Back to Home' }: { label?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group mb-8"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      {label}
    </Link>
  );
}
