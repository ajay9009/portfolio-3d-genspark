'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshTransmissionMaterial } from '@react-three/drei';
import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

/* ==========================================
   3D MAGIC ORB — Follows scroll across page
   ========================================== */

function MagicOrb({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const orbRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const ringRef3 = useRef<THREE.Mesh>(null!);

  // Color transitions based on scroll
  const color = useMemo(() => new THREE.Color(), []);
  const emissiveColor = useMemo(() => new THREE.Color(), []);

  const colors: [number, string][] = [
    [0.0, '#8b5cf6'],  // Violet (Hero)
    [0.15, '#22d3ee'], // Cyan (About)
    [0.3, '#f97316'],  // Orange (Skills)
    [0.45, '#10b981'], // Green (Apps)
    [0.6, '#ec4899'],  // Pink (Timeline)
    [0.75, '#8b5cf6'], // Violet (Pricing)
    [0.9, '#22d3ee'],  // Cyan (Contact)
    [1.0, '#f472b6'],  // Pink (End)
  ];

  useFrame((state, dt) => {
    if (!groupRef.current) return;

    // Smooth rotation
    groupRef.current.rotation.y += dt * 0.4;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

    // Rings rotation
    if (ringRef1.current) ringRef1.current.rotation.x += dt * 0.8;
    if (ringRef2.current) ringRef2.current.rotation.y += dt * 0.6;
    if (ringRef3.current) ringRef3.current.rotation.z += dt * 0.4;

    // Interpolate color based on scroll
    let fromIdx = 0;
    for (let i = 0; i < colors.length - 1; i++) {
      if (scrollProgress >= colors[i][0] && scrollProgress <= colors[i + 1][0]) {
        fromIdx = i;
        break;
      }
    }
    const from = colors[fromIdx];
    const to = colors[Math.min(fromIdx + 1, colors.length - 1)];
    const t = from[0] === to[0] ? 0 : (scrollProgress - from[0]) / (to[0] - from[0]);
    
    const c1 = new THREE.Color(from[1]);
    const c2 = new THREE.Color(to[1]);
    color.copy(c1).lerp(c2, t);
    emissiveColor.copy(color).multiplyScalar(0.3);

    // Apply to orb material
    if (orbRef.current && (orbRef.current.material as any).color) {
      (orbRef.current.material as any).color.copy(color);
      (orbRef.current.material as any).emissive?.copy(emissiveColor);
    }

    // Scale pulsing
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      {/* Main orb */}
      <Sphere ref={orbRef} args={[0.8, 64, 64]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          distort={0.25 + scrollProgress * 0.15}
          speed={2}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.01, 16, 100]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={ringRef3} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
        <torusGeometry args={[1.6, 0.008, 16, 100]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.015;
    ref.current.rotation.x += dt * 0.008;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* The floating 3D canvas that follows scroll position */
export default function FloatingOrb() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring-based scroll tracking
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Position transforms — orb moves to different screen positions as you scroll
  const x = useTransform(smoothProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], 
    ['55%', '-15%', '60%', '-10%', '55%', '-15%', '50%', '40%']);
  const y = useTransform(smoothProgress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ['15vh', '20vh', '25vh', '20vh', '15vh', '25vh', '20vh', '10vh']);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.7, 0.85]);
  const opacity = useTransform(smoothProgress, [0, 0.02, 0.95, 1], [1, 1, 1, 0.5]);

  useMotionValueEvent(smoothProgress, 'change', (v) => setScrollProgress(v));

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="fixed top-0 right-0 w-[340px] h-[340px] md:w-[420px] md:h-[420px] z-10 pointer-events-none"
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 2, 2]} intensity={0.6} color="#22d3ee" />
        <pointLight position={[3, -2, -2]} intensity={0.4} color="#f472b6" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <MagicOrb scrollProgress={scrollProgress} />
          </Float>
          <Particles />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
