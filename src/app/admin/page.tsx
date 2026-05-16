'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  BookOpen, Calendar, CreditCard, Users, Plus, Trash2, Edit3, X, Check,
  CheckCircle, XCircle, Clock, Eye, Mail, RefreshCw, BarChart3, LogOut
} from 'lucide-react';

type Tab = 'overview' | 'courses' | 'bookings' | 'payments' | 'visitors';

export default function Admin() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');
  const [courses, setCourses] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', slug: '', price_inr: 0, description: '', content_url: '', thumbnail_color: 'from-violet-500 to-purple-700', lessons: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return router.push('/login?next=/admin');
      const { data: p } = await supabase.from('profiles').select('role').eq('id', u.user.id).single();
      if (p?.role !== 'admin') { toast.error('Not authorized'); return router.push('/'); }
      setAuthed(true);
      loadAll();
    })();
  }, []);

  // Helper to get auth token for API calls
  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || '';
  }

  // Helper for admin actions (insert/update/delete) via server API
  async function adminAction(action: string, table: string, id?: string, data?: any) {
    const token = await getToken();
    const res = await fetch('/api/admin/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action, table, id, data }),
    });
    const result = await res.json();
    if (result.error) throw new Error(result.error);
    return result;
  }

  async function loadAll() {
    setRefreshing(true);
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.error) {
        console.error('Admin data error:', data.error);
        toast.error(data.error);
      } else {
        setCourses(data.courses || []);
        setBookings(data.bookings || []);
        setPayments(data.payments || []);
        setVisitors(data.visitors || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
    setRefreshing(false);
  }

  // === Course CRUD ===
  async function addCourse() {
    if (!form.title || !form.slug) return toast.error('Title and slug are required');
    const lessonsArr = form.lessons.split(',').map(s => s.trim()).filter(Boolean);
    try {
      await adminAction('insert', 'courses', undefined, {
        title: form.title, slug: form.slug, price_inr: form.price_inr,
        description: form.description, content_url: form.content_url,
        thumbnail_color: form.thumbnail_color, lessons: lessonsArr, is_published: true,
      });
      toast.success('Course added!');
      setForm({ title: '', slug: '', price_inr: 0, description: '', content_url: '', thumbnail_color: 'from-violet-500 to-purple-700', lessons: '' });
      loadAll();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function updateCourse(id: string) {
    const lessonsArr = typeof editForm.lessons === 'string'
      ? editForm.lessons.split(',').map((s: string) => s.trim()).filter(Boolean)
      : editForm.lessons;
    try {
      await adminAction('update', 'courses', id, {
        title: editForm.title, price_inr: editForm.price_inr,
        description: editForm.description, content_url: editForm.content_url,
        thumbnail_color: editForm.thumbnail_color, lessons: lessonsArr,
        is_published: editForm.is_published ?? true,
      });
      toast.success('Updated!'); setEditId(null); loadAll();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function deleteCourse(id: string) {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    await adminAction('delete', 'courses', id);
    toast.success('Deleted'); loadAll();
  }

  async function togglePublished(id: string, current: boolean) {
    await adminAction('update', 'courses', id, { is_published: !current });
    toast.success(current ? 'Unpublished' : 'Published'); loadAll();
  }

  // === Booking management ===
  async function updateBookingStatus(id: string, status: string) {
    await adminAction('update', 'bookings', id, { status });
    toast.success(`Booking ${status}`); loadAll();
  }

  // === Visitor management ===
  async function updateVisitorStatus(id: string, status: string) {
    await adminAction('update', 'visitors', id, { status });
    toast.success(`Marked as ${status}`); loadAll();
  }

  async function deleteVisitor(id: string) {
    await adminAction('delete', 'visitors', id);
    toast.success('Deleted'); loadAll();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success('Logged out');
    router.push('/');
  }

  if (!authed) return null;

  // Stats
  const totalRevenue = payments.reduce((s, p) => s + (p.amount_inr || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'paid' || b.status === 'pending').length;
  const newVisitors = visitors.filter(v => v.status === 'new').length;

  const tabs: { key: Tab; label: string; icon: any; count?: number }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'courses', label: 'Courses', icon: BookOpen, count: courses.length },
    { key: 'bookings', label: 'Bookings', icon: Calendar, count: pendingBookings || undefined },
    { key: 'payments', label: 'Payments', icon: CreditCard, count: payments.length },
    { key: 'visitors', label: 'Visitors', icon: Users, count: newVisitors || undefined },
  ];

  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
        <div className="flex items-center gap-2">
          <button onClick={loadAll} disabled={refreshing} className="btn-ghost text-sm">
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn-ghost text-sm text-red-400 hover:text-red-300">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mt-8">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t.key ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/30' : 'glass hover:bg-white/10'
            }`}>
            <t.icon size={16} /> {t.label}
            {t.count !== undefined && <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* === OVERVIEW TAB === */}
      {tab === 'overview' && (
        <div className="mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-green-400' },
              { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-violet-400' },
              { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-cyan-400' },
              { label: 'New Messages', value: newVisitors, icon: Mail, color: 'text-amber-400' },
            ].map(s => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <s.icon size={24} className={s.color} />
                </div>
                <div className="text-3xl font-bold mt-3">{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent activity */}
          <h3 className="text-xl font-bold mt-10 mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {payments.slice(0, 5).map(p => (
              <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard size={16} className="text-green-400" />
                  <span className="font-medium">₹{p.amount_inr}</span>
                  <span className="text-white/50 text-sm">{p.type}</span>
                </div>
                <span className="text-white/40 text-sm">{new Date(p.created_at).toLocaleDateString()}</span>
              </div>
            ))}
            {payments.length === 0 && <p className="text-white/50 text-center py-4">No activity yet</p>}
          </div>
        </div>
      )}

      {/* === COURSES TAB === */}
      {tab === 'courses' && (
        <>
          <div className="glass rounded-2xl p-6 mt-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Plus size={18} className="text-violet-400" />
              <h2 className="text-lg font-semibold">Add New Course</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Title" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
                value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input placeholder="Slug (url-friendly)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
                value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
              <input type="number" placeholder="Price (INR)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
                value={form.price_inr} onChange={e => setForm({ ...form, price_inr: +e.target.value })} />
              <input placeholder="Content URL" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
                value={form.content_url} onChange={e => setForm({ ...form, content_url: e.target.value })} />
            </div>
            <textarea placeholder="Description" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input placeholder="Lessons (comma-separated: Lesson 1, Lesson 2, ...)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
              value={form.lessons} onChange={e => setForm({ ...form, lessons: e.target.value })} />
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-violet-500"
              value={form.thumbnail_color} onChange={e => setForm({ ...form, thumbnail_color: e.target.value })}>
              <option value="from-violet-500 to-purple-700">Purple</option>
              <option value="from-amber-400 to-orange-600">Orange</option>
              <option value="from-emerald-400 to-teal-600">Green</option>
              <option value="from-blue-500 to-cyan-600">Blue</option>
              <option value="from-pink-500 to-rose-600">Pink</option>
            </select>
            <button onClick={addCourse} className="btn-primary"><Plus size={16} /> Add Course</button>
          </div>

          <div className="mt-6 space-y-3">
            {courses.map(c => (
              <div key={c.id} className="glass rounded-xl p-5">
                {editId === c.id ? (
                  <div className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none"
                        value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                      <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none"
                        value={editForm.price_inr} onChange={e => setEditForm({ ...editForm, price_inr: +e.target.value })} />
                    </div>
                    <textarea rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none"
                      value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none" placeholder="Content URL"
                      value={editForm.content_url} onChange={e => setEditForm({ ...editForm, content_url: e.target.value })} />
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none" placeholder="Lessons (comma separated)"
                      value={Array.isArray(editForm.lessons) ? editForm.lessons.join(', ') : editForm.lessons}
                      onChange={e => setEditForm({ ...editForm, lessons: e.target.value })} />
                    <div className="flex gap-2">
                      <button onClick={() => updateCourse(c.id)} className="btn-primary text-sm !py-1.5"><Check size={14} /> Save</button>
                      <button onClick={() => setEditId(null)} className="btn-ghost text-sm !py-1.5"><X size={14} /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{c.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_published ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {c.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="text-white/60 text-sm mt-1">/{c.slug} · ₹{c.price_inr} · {c.lessons?.length || 0} lessons</div>
                      {c.description && <p className="text-white/50 text-sm mt-2 line-clamp-1">{c.description}</p>}
                    </div>
                    <div className="flex gap-1.5 shrink-0 ml-4">
                      <button onClick={() => togglePublished(c.id, c.is_published)}
                        className="p-2 rounded-lg glass hover:text-amber-400" title={c.is_published ? 'Unpublish' : 'Publish'}>
                        {c.is_published ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </button>
                      <button onClick={() => { setEditId(c.id); setEditForm({ title: c.title, price_inr: c.price_inr, description: c.description || '', content_url: c.content_url || '', thumbnail_color: c.thumbnail_color || '', lessons: c.lessons || [], is_published: c.is_published }); }}
                        className="p-2 rounded-lg glass hover:text-violet-400"><Edit3 size={16} /></button>
                      <button onClick={() => deleteCourse(c.id)} className="p-2 rounded-lg glass hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {courses.length === 0 && <p className="text-white/50 text-center py-8">No courses yet. Add your first one above.</p>}
          </div>
        </>
      )}

      {/* === BOOKINGS TAB === */}
      {tab === 'bookings' && (
        <div className="mt-6 space-y-3">
          {bookings.map(b => (
            <div key={b.id} className="glass rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-lg">{b.services?.title || 'Unknown Service'}</div>
                  <div className="text-white/60 text-sm mt-1 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {b.booking_date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {b.time_slot}</span>
                    <span className="flex items-center gap-1"><CreditCard size={14} /> ₹{b.amount_inr || b.services?.price_inr}</span>
                  </div>
                  {b.user_email && <div className="text-white/40 text-xs mt-1">👤 {b.user_name || ''} ({b.user_email})</div>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    b.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                    b.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    b.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {b.status || 'pending'}
                  </span>
                  {(b.status === 'paid' || b.status === 'pending') && (
                    <>
                      <button onClick={() => updateBookingStatus(b.id, 'confirmed')}
                        className="p-2 rounded-lg glass hover:text-green-400" title="Approve">
                        <CheckCircle size={16} />
                      </button>
                      <button onClick={() => updateBookingStatus(b.id, 'rejected')}
                        className="p-2 rounded-lg glass hover:text-red-400" title="Reject">
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                    <button onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="p-2 rounded-lg glass hover:text-emerald-400" title="Mark Completed">
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-white/50 text-center py-8">No bookings yet.</p>}
        </div>
      )}

      {/* === PAYMENTS TAB === */}
      {tab === 'payments' && (
        <div className="mt-6">
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="text-white/60 text-sm">Total Revenue</div>
            <div className="text-3xl font-bold gradient-text">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-white/50 text-sm mt-1">{payments.length} transactions</div>
          </div>
          <div className="space-y-2">
            {payments.map(p => (
              <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.type === 'booking' ? 'bg-violet-500/20' : 'bg-cyan-500/20'}`}>
                    {p.type === 'booking' ? <Calendar size={18} className="text-violet-400" /> : <BookOpen size={18} className="text-cyan-400" />}
                  </div>
                  <div>
                    <div className="font-semibold">₹{p.amount_inr}</div>
                    <div className="text-white/50 text-xs">{p.type} · {p.razorpay_payment_id?.slice(0, 20)}...</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {p.status}
                  </span>
                  <div className="text-white/40 text-xs mt-1">{new Date(p.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            {payments.length === 0 && <p className="text-white/50 text-center py-8">No payments yet.</p>}
          </div>
        </div>
      )}

      {/* === VISITORS TAB === */}
      {tab === 'visitors' && (
        <div className="mt-6 space-y-3">
          {visitors.map(v => (
            <div key={v.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{v.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      v.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      v.status === 'read' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{v.status}</span>
                  </div>
                  <a href={`mailto:${v.email}`} className="text-sm text-violet-400 hover:underline">{v.email}</a>
                  <p className="text-white/60 text-sm mt-2">{v.message}</p>
                  <div className="text-white/30 text-xs mt-2">{new Date(v.created_at).toLocaleString()}</div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {v.status === 'new' && (
                    <button onClick={() => updateVisitorStatus(v.id, 'read')} className="p-2 rounded-lg glass hover:text-amber-400" title="Mark as Read">
                      <Eye size={16} />
                    </button>
                  )}
                  {v.status !== 'replied' && (
                    <a href={`mailto:${v.email}`} className="p-2 rounded-lg glass hover:text-green-400" title="Reply"
                      onClick={() => updateVisitorStatus(v.id, 'replied')}>
                      <Mail size={16} />
                    </a>
                  )}
                  <button onClick={() => deleteVisitor(v.id)} className="p-2 rounded-lg glass hover:text-red-400" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {visitors.length === 0 && <p className="text-white/50 text-center py-8">No messages yet.</p>}
        </div>
      )}
    </main>
  );
}
