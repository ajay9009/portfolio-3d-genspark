'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

function Stars() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sz[i] = Math.random() * 0.5 + 0.1;
    }
    return [pos, sz];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.003;
    ref.current.rotation.x += dt * 0.001;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function NebulaCloud({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 0.2) * 0.05);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.03}
        emissive={color}
        emissiveIntensity={0.15}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Stars />
          <NebulaCloud position={[-15, 8, -30]} color="#8b5cf6" scale={1.2} />
          <NebulaCloud position={[20, -5, -25]} color="#22d3ee" scale={0.8} />
          <NebulaCloud position={[5, 15, -35]} color="#f472b6" scale={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
