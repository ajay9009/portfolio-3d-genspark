'use client';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/book"
        className="btn-primary !rounded-full !py-3 !px-5 flex items-center gap-2 shadow-2xl shadow-violet-600/40 hover:shadow-violet-600/60"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline font-semibold">Work With Me</span>
      </Link>
    </motion.div>
  );
}
