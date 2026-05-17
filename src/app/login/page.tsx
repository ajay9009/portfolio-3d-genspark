'use client';
import { Suspense, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, KeyRound, ArrowLeft, Mail, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const urlError = searchParams.get('error');
  
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlError) {
      toast.error(decodeURIComponent(urlError.replace(/\+/g, ' ')));
    }
  }, [urlError]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        });
        if (error) return toast.error(error.message);
        toast.success('Password reset link sent! Check your email.');
        setMode('login');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password: pw,
          options: { data: { name } },
        });
        if (error) return toast.error(error.message);
        toast.success('Account created! Check email to verify.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
        if (error) return toast.error(error.message);
        toast.success('Welcome back!');
        router.push(next);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="max-w-md mx-auto glass rounded-2xl p-8 space-y-5"
    >
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mb-4">
          {mode === 'login' && <LogIn size={24} className="text-white" />}
          {mode === 'signup' && <UserPlus size={24} className="text-white" />}
          {mode === 'reset' && <KeyRound size={24} className="text-white" />}
        </div>
        <h1 className="text-3xl font-bold">
          {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h1>
        <p className="text-white/50 text-sm mt-2">
          {mode === 'login'
            ? 'Login to access your dashboard'
            : mode === 'signup'
            ? 'Sign up to book consultations & buy courses'
            : 'Enter your email to receive a reset link'}
        </p>
      </div>

      {mode === 'signup' && (
        <input
          required
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
        />
      )}

      <input
        required
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
      />

      {mode !== 'reset' && (
        <div className="relative">
          <input
            required
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
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
      )}

      <button disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading
          ? 'Please wait...'
          : mode === 'login'
          ? 'Login'
          : mode === 'signup'
          ? 'Create Account'
          : 'Send Reset Link'}
      </button>

      {mode === 'login' && (
        <button
          type="button"
          onClick={() => setMode('reset')}
          className="text-sm text-violet-400 hover:text-violet-300 w-full transition-colors"
        >
          <KeyRound size={14} className="inline mr-1" /> Forgot Password?
        </button>
      )}

      <div className="border-t border-white/10 pt-4">
        {mode === 'reset' ? (
          <button
            type="button"
            onClick={() => setMode('login')}
            className="text-sm text-violet-400 hover:text-violet-300 w-full flex items-center justify-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-sm text-violet-400 hover:text-violet-300 w-full transition-colors"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        )}
      </div>
    </motion.form>
  );
}

export default function Login() {
  return (
    <main className="pt-28 pb-20 px-6">
      <Suspense
        fallback={
          <div className="max-w-md mx-auto glass rounded-2xl p-8 text-center text-white/60">
            Loading...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
