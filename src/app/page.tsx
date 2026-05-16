import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Apps from '@/sections/Apps';
import Timeline from '@/sections/Timeline';
import Pricing from '@/sections/Pricing';
import Mentorship from '@/sections/Mentorship';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import FloatingOrbWrapper from '@/components/FloatingOrbWrapper';

export default function Home() {
  return (
    <main className="relative">
      {/* The magic 3D orb that follows scroll across all sections */}
      <FloatingOrbWrapper />
      <Hero/>
      <About/>
      <Skills/>
      <Apps/>
      <Timeline/>
      <Pricing/>
      <Mentorship/>
      <Testimonials/>
      <Contact/>
    </main>
  );
}
