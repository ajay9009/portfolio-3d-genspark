import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import AnimatedCursor from '@/components/AnimatedCursor';

export const metadata: Metadata = {
  title: 'Android Developer | Java Developer | Freelance App Developer',
  description: 'I build Android apps that actually scale. 10+ live Play Store apps. Java, XML, Firebase. Hire me or book a consultation.',
  keywords: ['Android Developer', 'Java Developer', 'App Developer Freelancer', 'Firebase', 'Android Mentor'],
  openGraph: {
    title: 'I Build Android Apps That Actually Scale',
    description: '10+ live apps on Play Store. Book a consultation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
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
