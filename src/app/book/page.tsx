'use client';
import { Suspense, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEMO_SERVICES } from '@/lib/demo-data';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, Check } from 'lucide-react';

const SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'];

declare global { interface Window { Razorpay: any } }

function BookForm() {
  const sp = useSearchParams();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [serviceSlug, setServiceSlug] = useState(sp.get('service') || 'mentorship');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=service, 2=date/time, 3=confirm

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('services').select('*');
        if (error || !data || data.length === 0) {
          setServices(DEMO_SERVICES);
        } else {
          setServices(data);
        }
      } catch {
        setServices(DEMO_SERVICES);
      }
      const { data: u } = await supabase.auth.getUser();
      setUser(u.user);
    })();
  }, []);

  const service = services.find(s => s.slug === serviceSlug);

  // Generate next 14 days (skip Sundays)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  }).filter(d => d.getDay() !== 0); // Skip Sundays

  async function handlePay() {
    if (!user) { toast.error('Please login first'); router.push('/login?next=/book'); return; }
    if (!date || !slot || !service) { toast.error('Pick date and time'); return; }

    if (service.id?.startsWith('demo-')) {
      toast.error('Please configure Supabase to enable bookings. See setup guide.');
      return;
    }

    setLoading(true);
    try {
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: service.price_inr, receipt: `bk_${Date.now()}` }),
      });
      const order = await orderRes.json();

      if (order.error) {
        toast.error('Payment setup error. Check Razorpay keys.');
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Android Developer',
        description: service.title,
        order_id: order.id,
        prefill: { email: user.email, name: user.user_metadata?.name || '' },
        theme: { color: '#8b5cf6' },
        handler: async (resp: any) => {
          const verify = await fetch('/api/razorpay/verify', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...resp,
              payload: {
                type: 'booking', userId: user.id, serviceId: service.id,
                date, time: slot, amount: service.price_inr,
                userEmail: user.email, userName: user.user_metadata?.name || '',
              },
            }),
          });
          const j = await verify.json();
          if (j.ok) { toast.success('Booking confirmed! 🎉'); router.push('/dashboard'); }
          else toast.error('Verification failed');
        },
      });
      rzp.open();
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {[
          { num: 1, label: 'Choose Service', icon: CreditCard },
          { num: 2, label: 'Date & Time', icon: Calendar },
          { num: 3, label: 'Confirm', icon: Check },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center">
            <button onClick={() => { if (s.num < step || (s.num === 2 && serviceSlug) || (s.num === 1)) setStep(s.num); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step >= s.num ? 'bg-violet-600 text-white' : 'glass text-white/50'}`}>
              <s.icon size={16} /> {s.label}
            </button>
            {i < 2 && <div className={`w-8 h-0.5 mx-1 ${step > s.num ? 'bg-violet-600' : 'bg-white/20'}`} />}
          </div>
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-8 md:p-10">
        {/* Step 1: Choose Service */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(s => (
                <button key={s.id || s.slug} onClick={() => { setServiceSlug(s.slug); setStep(2); }}
                  className={`text-left p-5 rounded-2xl glass transition-all hover:scale-[1.02] ${serviceSlug === s.slug ? 'ring-2 ring-violet-500 glow-violet' : ''}`}>
                  <div className="font-bold text-lg">{s.title}</div>
                  <p className="text-white/60 text-sm mt-1">{s.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xl font-bold gradient-text">₹{s.price_inr}</span>
                    <span className="text-white/50 text-sm flex items-center gap-1">
                      <Clock size={14} /> {s.duration_min} min
                    </span>
                  </div>
                  {s.features && (
                    <ul className="mt-3 space-y-1">
                      {s.features.slice(0, 3).map((f: string) => (
                        <li key={f} className="text-xs text-white/50 flex items-center gap-1">
                          <Check size={12} className="text-violet-400" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Pick Date & Time</h2>
            <p className="text-white/60 text-sm mb-6">for {service?.title} (₹{service?.price_inr})</p>

            <div>
              <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Calendar size={16} className="text-violet-400" /> Select Date
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {availableDates.map(d => {
                  const iso = d.toISOString().split('T')[0];
                  const dayName = d.toLocaleDateString('en', { weekday: 'short' });
                  const dayNum = d.getDate();
                  const month = d.toLocaleDateString('en', { month: 'short' });
                  const isSelected = date === iso;
                  return (
                    <button key={iso} onClick={() => setDate(iso)}
                      className={`p-3 rounded-xl text-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-600/30 scale-105'
                          : 'glass hover:bg-white/10'
                      }`}>
                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-white/50'}`}>{dayName}</div>
                      <div className="text-lg font-bold">{dayNum}</div>
                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-white/50'}`}>{month}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Clock size={16} className="text-violet-400" /> Select Time Slot
              </label>
              <div className="grid grid-cols-4 gap-2">
                {SLOTS.map(s => {
                  const isSelected = slot === s;
                  return (
                    <button key={s} onClick={() => setSlot(s)}
                      className={`py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-600/30 scale-105'
                          : 'glass hover:bg-white/10'
                      }`}>
                      {isSelected && <Check size={14} className="inline mr-1" />}{s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1">← Back</button>
              <button onClick={() => { if (date && slot) setStep(3); else toast.error('Pick date and time'); }}
                className="btn-primary flex-1">Continue →</button>
            </div>
          </>
        )}

        {/* Step 3: Confirm & Pay */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>

            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Service</span>
                <span className="font-semibold">{service?.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Date</span>
                <span className="font-semibold">{new Date(date + 'T00:00').toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Time</span>
                <span className="font-semibold">{slot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Duration</span>
                <span className="font-semibold">{service?.duration_min} minutes</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-white/60">Total</span>
                <span className="text-2xl font-bold gradient-text">₹{service?.price_inr}</span>
              </div>
            </div>

            {!user && (
              <div className="glass rounded-xl p-4 mt-4 text-center">
                <p className="text-white/60">You need to login before booking.</p>
                <button onClick={() => router.push('/login?next=/book')} className="btn-primary mt-3">Login / Sign up</button>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1">← Back</button>
              <button onClick={handlePay} disabled={loading || !user}
                className="btn-primary flex-1 disabled:opacity-50">
                {loading ? 'Processing...' : `Pay ₹${service?.price_inr} & Confirm`}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="pt-28 pb-20 px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <Suspense fallback={<div className="max-w-4xl mx-auto glass rounded-3xl p-8 text-center text-white/60">Loading...</div>}>
        <BookForm />
      </Suspense>
    </main>
  );
}
