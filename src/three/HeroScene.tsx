'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, RoundedBox } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

function Phone() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    groupRef.current.rotation.y += dt * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Phone body */}
        <RoundedBox args={[1.1, 2.2, 0.12]} radius={0.12} smoothness={8}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.1} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[0.95, 2.0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.15}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Screen content - app icon area */}
        <mesh position={[0, 0.3, 0.07]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.2} />
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, 0.95, 0.07]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingBlobs() {
  return (
    <>
      {[
        { pos: [-2.5, 1.2, -2] as [number, number, number], color: '#8b5cf6', size: 0.5 },
        { pos: [2.8, -0.8, -3] as [number, number, number], color: '#22d3ee', size: 0.7 },
        { pos: [1.8, 2, -4] as [number, number, number], color: '#f472b6', size: 0.4 },
        { pos: [-1.5, -1.5, -2.5] as [number, number, number], color: '#a78bfa', size: 0.35 },
      ].map((b, i) => (
        <Float key={i} speed={1.2 + i * 0.3} floatIntensity={1.5}>
          <Sphere args={[b.size, 32, 32]} position={b.pos}>
            <MeshDistortMaterial
              color={b.color}
              distort={0.35}
              speed={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x += dt * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.03} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#22d3ee" />
      <Suspense fallback={null}>
        <Phone />
        <FloatingBlobs />
        <Particles />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
