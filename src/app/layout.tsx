import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import AnimatedCursor from '@/components/AnimatedCursor';

export const metadata: Metadata = {
  title: 'Ajay Singh | Software Engineer | Spring Boot · Microservices · Android',
  description: 'Sr. Analyst @ Accenture | Ex-Infosys | 4+ years building enterprise backend systems with Java, Spring Boot, Microservices, REST APIs, and 10+ Android apps on Play Store.',
  keywords: ['Software Engineer', 'Java Developer', 'Spring Boot', 'Microservices', 'Android Developer', 'REST API', 'Backend Engineer', 'Accenture', 'Freelancer'],
  openGraph: {
    title: 'Ajay Singh — Software Engineer & Android Developer',
    description: 'Enterprise backend systems + 10+ Play Store apps. Book a consultation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased overflow-x-hidden">
        <AnimatedCursor />
        <Navbar />
        {children}
        <FloatingCTA />
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
