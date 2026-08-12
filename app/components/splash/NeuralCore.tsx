"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

import NeuralNetwork from "./NeuralNetwork";
import LogoFormation from "./LogoFormation";

export default function NeuralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const ringThreeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      const scale =
        1 + Math.sin(time * 2.2) * 0.035;

      coreRef.current.scale.setScalar(scale);
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.x += delta * 0.22;
      ringOneRef.current.rotation.y += delta * 0.15;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.x -= delta * 0.18;
      ringTwoRef.current.rotation.z += delta * 0.28;
    }

    if (ringThreeRef.current) {
      ringThreeRef.current.rotation.y += delta * 0.12;
      ringThreeRef.current.rotation.z -= delta * 0.18;
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.08}
      floatIntensity={0.18}
    >
      <group>

  {/* AI atmosphere */}
  <mesh ref={coreRef}>
    <sphereGeometry
      args={[1.35, 64, 64]}
    />

    <meshBasicMaterial
      color="#0ea5e9"
      transparent
      opacity={0.035}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </mesh>

  {/* Inner energy */}
  <mesh>
    <sphereGeometry
      args={[0.72, 48, 48]}
    />

    <meshBasicMaterial
      color="#2563eb"
      transparent
      opacity={0.11}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </mesh>

  {/* Existing neural network */}
  <NeuralNetwork />

  {/* NEW: Neirah symbol formation */}
  <LogoFormation />

  {/* Orbit rings */}
  <mesh
    ref={ringOneRef}
    rotation={[
      Math.PI / 3,
      0,
      Math.PI / 5,
    ]}
  >
    <torusGeometry
      args={[1.65, 0.008, 8, 128]}
    />

    <meshBasicMaterial
      color="#38bdf8"
      transparent
      opacity={0.45}
      blending={THREE.AdditiveBlending}
    />
  </mesh>

  <mesh
    ref={ringTwoRef}
    rotation={[
      Math.PI / 2.4,
      Math.PI / 6,
      0,
    ]}
  >
    <torusGeometry
      args={[1.9, 0.006, 8, 128]}
    />

    <meshBasicMaterial
      color="#2563eb"
      transparent
      opacity={0.3}
      blending={THREE.AdditiveBlending}
    />
  </mesh>

  <mesh
    ref={ringThreeRef}
    rotation={[
      Math.PI / 5,
      Math.PI / 3,
      Math.PI / 8,
    ]}
  >
    <torusGeometry
      args={[2.15, 0.004, 8, 128]}
    />

    <meshBasicMaterial
      color="#67e8f9"
      transparent
      opacity={0.18}
      blending={THREE.AdditiveBlending}
    />
  </mesh>

  <Sparkles
    count={100}
    scale={[4.8, 4.8, 4.8]}
    size={1.8}
    speed={0.25}
    color="#38bdf8"
  />

</group>
    </Float>
  );
}