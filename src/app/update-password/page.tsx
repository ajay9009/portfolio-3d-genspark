'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

export default function UpdatePassword() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password updated successfully!');
        router.push('/dashboard');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="pt-28 pb-20 px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="max-w-md mx-auto glass rounded-2xl p-8 space-y-5"
      >
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mb-4">
            <KeyRound size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">Update Password</h1>
          <p className="text-white/50 text-sm mt-2">
            Enter your new password below.
          </p>
        </div>

        <div className="relative">
          <input
            required
            type={showPw ? 'text' : 'password'}
            placeholder="New Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-500 hover:text-violet-400 transition-colors"
          >
            {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Updating...' : 'Save New Password'}
        </button>
      </motion.form>
    </main>
  );
}
