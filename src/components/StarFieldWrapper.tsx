'use client';

/**
 * Lightweight CSS-only star background.
 * Replaces the heavy Three.js StarField canvas for much better performance.
 */
export default function StarFieldWrapper() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Layer 1: Small stars (static) */}
      <div className="stars-layer-1" />
      {/* Layer 2: Medium stars (slow drift) */}
      <div className="stars-layer-2" />
      {/* Nebula glow accents */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.02] blur-[100px]" />
    </div>
  );
}
