"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const PARTICLE_COUNT = 550;

interface AIUniverseProps {
  exiting?: boolean;
}

// Generate static initial particle data once at module scope
const PARTICLE_DATA = (() => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const ph = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const radius = 1.0 + Math.random() * 3.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i3 + 2] = radius * Math.cos(phi);

    ph[i] = Math.random() * Math.PI * 2;
  }
  return { positions: pos, phases: ph };
})();

function FloatingParticles({ exiting = false }: { exiting?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, phases } = PARTICLE_DATA;

  useFrame((state) => {
    if (!pointsRef.current) return;
    const elapsed = state.clock.elapsedTime;

    // Smooth, gentle continuous rotation
    pointsRef.current.rotation.y = elapsed * 0.03;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.04;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      // Subtle float wave without sudden jumps
      posArr[i3 + 1] = posArr[i3 + 1] + Math.sin(elapsed * 0.6 + phase) * 0.0008;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8"
        size={0.03}
        transparent
        opacity={exiting ? 0.15 : 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AIUniverse({ exiting = false }: AIUniverseProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles exiting={exiting} />
      </Canvas>
    </div>
  );
}