import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Apps from '@/sections/Apps';
import Timeline from '@/sections/Timeline';
import Pricing from '@/sections/Pricing';
import CoursesPreview from '@/sections/CoursesPreview';
import Mentorship from '@/sections/Mentorship';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import FloatingOrbWrapper from '@/components/FloatingOrbWrapper';
import StarFieldWrapper from '@/components/StarFieldWrapper';

export default function Home() {
  return (
    <main className="relative">
      {/* Deep space starfield background */}
      <StarFieldWrapper />
      {/* The 3D Earth that follows scroll across all sections */}
      <FloatingOrbWrapper />
      <Hero/>
      <About/>
      <Skills/>
      <Apps/>
      <Timeline/>
      <Pricing/>
      <CoursesPreview/>
      <Mentorship/>
      <Testimonials/>
      <Contact/>
    </main>
  );
}
