'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DEMO_COURSES } from '@/lib/demo-data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, PlayCircle } from 'lucide-react';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('courses').select('*').eq('is_published', true);
        if (error || !data || data.length === 0) {
          setCourses(DEMO_COURSES);
        } else {
          setCourses(data);
        }
      } catch {
        setCourses(DEMO_COURSES);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Android <span className="gradient-text">Courses</span>
        </h1>
        <p className="text-center text-white/60 mt-4">
          Learn from real production experience. Build apps that actually ship.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center text-white/60 py-20">Loading courses...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/courses/${c.slug}`} className="block glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all hover:glow-violet group">
                <div className={`h-44 bg-gradient-to-br ${c.thumbnail_color || 'from-violet-500 to-cyan-500'} flex items-center justify-center relative`}>
                  <PlayCircle size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium">
                    {c.lessons?.length || 0} lessons
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <p className="text-white/60 text-sm mt-2 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between mt-5">
                    <div className="text-2xl font-bold gradient-text">₹{c.price_inr}</div>
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

      {courses.length === 0 && !loading && (
        <div className="text-center py-20 glass rounded-3xl mt-10">
          <BookOpen size={48} className="mx-auto text-white/30 mb-4" />
          <p className="text-white/60">No courses available yet. Check back soon!</p>
        </div>
      )}
    </main>
  );
}
