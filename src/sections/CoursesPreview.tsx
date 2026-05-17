'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEMO_COURSES } from '@/lib/demo-data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, ArrowRight } from 'lucide-react';

export default function CoursesPreview() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('courses').select('*').eq('is_published', true).limit(3);
        if (error || !data || data.length === 0) {
          setCourses(DEMO_COURSES.slice(0, 3));
        } else {
          setCourses(data.slice(0, 3));
        }
      } catch {
        setCourses(DEMO_COURSES.slice(0, 3));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="courses" className="py-28 px-6 section-nebula">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Engineering <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-center text-white/60 mt-4">
            From Spring Boot microservices to Android apps — learn from real production experience.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/60 py-16">Loading courses...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {courses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/courses/${c.slug}`} className="block glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all hover:glow-violet group">
                  <div className={`h-40 bg-gradient-to-br ${c.thumbnail_color || 'from-violet-500 to-cyan-500'} flex items-center justify-center relative`}>
                    <PlayCircle size={44} className="text-white/80 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium">
                      {c.lessons?.length || 0} lessons
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold line-clamp-1">{c.title}</h3>
                    <p className="text-white/60 text-sm mt-2 line-clamp-2">{c.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xl font-bold gradient-text font-mono">₹{c.price_inr}</div>
                      <div className="flex items-center gap-1 text-white/50 text-sm">
                        <BookOpen size={14} />
                        <span>{c.lessons?.length || 0} lessons</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/courses"
            className="btn-ghost text-base group inline-flex items-center gap-2"
          >
            View All Courses
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
