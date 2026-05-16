'use client';
import dynamic from 'next/dynamic';

const FloatingOrb = dynamic(() => import('@/three/FloatingOrb'), { ssr: false });

export default function FloatingOrbWrapper() {
  return <FloatingOrb />;
}
