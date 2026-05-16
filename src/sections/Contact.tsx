'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success('Message sent!');
        setForm({ name: '', email: '', msg: '' });
      } else {
        toast.error(data.error || 'Failed to send');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Let&apos;s <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-center text-white/60 mt-4">Got an app idea? Need a freelance Android dev? Reach out.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 mt-14">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-lg">Connect With Me</h3>
              <div className="space-y-4">
                <a href="https://github.com/ajay9009/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-violet-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">GitHub</div>
                    <div className="text-xs text-white/40">github.com/ajay9009</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/ajay-singh-9009/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-violet-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                    <ExternalLink size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">LinkedIn</div>
                    <div className="text-xs text-white/40">in/ajay-singh-9009</div>
                  </div>
                </a>
                <a href="mailto:growdigital1996@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-violet-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-xs text-white/40">growdigital1996@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="md:col-span-3 glass rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <textarea
              required
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition-colors resize-none"
              value={form.msg}
              onChange={e => setForm({ ...form, msg: e.target.value })}
            />
            <button
              disabled={sending}
              className="btn-primary w-full disabled:opacity-50"
            >
              {sending ? 'Sending...' : <><Send size={18} /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
