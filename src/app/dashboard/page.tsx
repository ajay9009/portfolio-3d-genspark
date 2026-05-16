'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Clock, CreditCard, PlayCircle, ExternalLink, LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return router.push('/login?next=/dashboard');
      setUser(u.user);
      try {
        const [b, c] = await Promise.all([
          supabase.from('bookings').select('*, services(title, duration_min)').eq('user_id', u.user.id).order('created_at', { ascending: false }),
          supabase.from('course_purchases').select('*, courses(title, content_url, thumbnail_color)').eq('user_id', u.user.id),
        ]);
        setBookings(b.data || []);
        setPurchases(c.data || []);
      } catch {}
      setLoading(false);
    })();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) return <main className="pt-28 px-6 text-center text-white/60">Loading...</main>;

  return (
    <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My <span className="gradient-text">Dashboard</span></h1>
          {user && <p className="text-white/60 mt-1">Welcome back, {user.user_metadata?.name || user.email}</p>}
        </div>
        <button onClick={logout} className="btn-ghost text-sm"><LogOut size={16} /> Logout</button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <Calendar size={24} className="text-violet-400" />
          <div className="text-2xl font-bold mt-2">{bookings.length}</div>
          <div className="text-white/60 text-sm">Bookings</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <BookOpen size={24} className="text-cyan-400" />
          <div className="text-2xl font-bold mt-2">{purchases.length}</div>
          <div className="text-white/60 text-sm">Courses Owned</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <CreditCard size={24} className="text-green-400" />
          <div className="text-2xl font-bold mt-2">
            ₹{[...bookings, ...purchases].reduce((s, i) => s + (i.amount_inr || 0), 0).toLocaleString()}
          </div>
          <div className="text-white/60 text-sm">Total Spent</div>
        </motion.div>
      </div>

      {/* Bookings */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Calendar size={20} className="text-violet-400" /> My Bookings
        </h2>
        <div className="mt-4 space-y-3">
          {bookings.length === 0 && <p className="text-white/60 glass rounded-xl p-6 text-center">No bookings yet. <a href="/book" className="text-violet-400 hover:underline">Book a consultation →</a></p>}
          {bookings.map(b => (
            <motion.div key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{b.services?.title || 'Consultation'}</div>
                <div className="text-white/60 text-sm mt-1 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {b.booking_date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {b.time_slot}</span>
                  {b.services?.duration_min && <span className="flex items-center gap-1">{b.services.duration_min} min</span>}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                b.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                b.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                b.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                {b.status || 'pending'}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen size={20} className="text-cyan-400" /> My Courses
        </h2>
        <div className="mt-4 space-y-3">
          {purchases.length === 0 && <p className="text-white/60 glass rounded-xl p-6 text-center">No courses yet. <a href="/courses" className="text-violet-400 hover:underline">Browse courses →</a></p>}
          {purchases.map(p => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.courses?.thumbnail_color || 'from-violet-500 to-cyan-500'} flex items-center justify-center`}>
                  <PlayCircle size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">{p.courses?.title}</div>
                  <div className="text-white/50 text-xs mt-0.5">Purchased {new Date(p.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <a href={p.courses?.content_url} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs !py-2">
                <ExternalLink size={14} /> Open
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
