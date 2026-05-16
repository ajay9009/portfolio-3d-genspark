'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEMO_COURSES } from '@/lib/demo-data';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { Lock, PlayCircle, BookOpen, CheckCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

declare global { interface Window { Razorpay: any } }

export default function CoursePage() {
  const { slug } = useParams<{slug:string}>();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [owns, setOwns] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(()=>{
    (async ()=>{
      // Try DB first, fallback to demo
      let c: any = null;
      try {
        const { data } = await supabase.from('courses').select('*').eq('slug', slug).single();
        c = data;
      } catch {}
      if (!c) {
        c = DEMO_COURSES.find(d => d.slug === slug);
      }
      setCourse(c);

      const { data: u } = await supabase.auth.getUser();
      setUser(u.user);
      if (u.user && c && !c.id?.startsWith('demo-')) {
        const { data: p } = await supabase.from('course_purchases').select('id').eq('user_id', u.user.id).eq('course_id', c.id).maybeSingle();
        setOwns(!!p);
      }
      setLoading(false);
    })();
  },[slug]);

  async function buy() {
    if (!user) return router.push(`/login?next=/courses/${slug}`);
    if (course.id?.startsWith('demo-')) {
      toast.error('Please configure Supabase to enable purchases. See setup guide.');
      return;
    }
    setBuying(true);
    try {
      const order = await fetch('/api/razorpay/order',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ amount: course.price_inr, receipt: `c_${Date.now()}` }),
      }).then(r=>r.json());

      if (order.error) {
        toast.error('Payment setup error. Check Razorpay keys.');
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, currency:'INR',
        name: 'Android Developer', description: course.title,
        order_id: order.id,
        prefill: { email: user.email, name: user.user_metadata?.name || '' },
        theme: { color: '#8b5cf6' },
        handler: async (resp:any) => {
          const v = await fetch('/api/razorpay/verify',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              ...resp,
              payload: { type:'course', userId: user.id, courseId: course.id, amount: course.price_inr },
            }),
          }).then(r=>r.json());
          if (v.ok) { toast.success('Course unlocked! 🎉'); setOwns(true); }
          else toast.error('Payment verification failed');
        },
      });
      rzp.open();
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setBuying(false);
    }
  }

  if (loading) return <main className="pt-28 px-6 text-center text-white/60">Loading...</main>;
  if (!course) return (
    <main className="pt-28 px-6 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <Link href="/courses" className="btn-primary mt-6 inline-block">← Back to Courses</Link>
    </main>
  );

  return (
    <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <Link href="/courses" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← All Courses</Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        {/* Course Hero */}
        <div className={`rounded-3xl p-10 md:p-14 bg-gradient-to-br ${course.thumbnail_color || 'from-violet-500 to-cyan-500'} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <BookOpen size={16} /> {course.lessons?.length || 0} lessons
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{course.title}</h1>
            <p className="mt-4 text-lg text-white/85 max-w-2xl">{course.description}</p>
            <div className="flex items-center gap-6 mt-8">
              <div className="text-4xl font-bold text-white">₹{course.price_inr}</div>
              {!owns ? (
                <button onClick={buy} disabled={buying} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2 disabled:opacity-50">
                  <ShoppingCart size={18} />
                  {buying ? 'Processing...' : 'Buy Now'}
                </button>
              ) : (
                <a href={course.content_url} target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                  <PlayCircle size={18} /> Watch Content
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Course Content / Lessons */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <div className="mt-6 space-y-3">
              {(course.lessons || []).map((lesson: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass rounded-xl p-4 flex items-center gap-4 ${owns ? '' : 'opacity-70'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${owns ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                    {owns ? <CheckCircle size={16} /> : <Lock size={14} />}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white/50 font-mono">Lesson {i + 1}</span>
                    <div className="font-medium">{lesson}</div>
                  </div>
                  {owns && (
                    <PlayCircle size={20} className="text-violet-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass rounded-2xl p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-4">What you&apos;ll get</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/70">✓ {course.lessons?.length || 0} detailed lessons</li>
                <li className="flex items-center gap-2 text-white/70">✓ Lifetime access</li>
                <li className="flex items-center gap-2 text-white/70">✓ Source code included</li>
                <li className="flex items-center gap-2 text-white/70">✓ Certificate of completion</li>
                <li className="flex items-center gap-2 text-white/70">✓ Discord community access</li>
              </ul>
              {!owns && (
                <button onClick={buy} disabled={buying} className="btn-primary w-full mt-6 disabled:opacity-50">
                  {buying ? 'Processing...' : `Buy for ₹${course.price_inr}`}
                </button>
              )}
              {owns && (
                <div className="mt-6 text-center text-green-400 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle size={18} /> You own this course
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
