"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import NeuralCore from "./NeuralCore";

interface CameraRigProps {
  exiting: boolean;
}

function CameraRig({
  exiting,
}: CameraRigProps) {
  const cameraRef =
    useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;

    const time = state.clock.elapsedTime;

    if (!exiting) {
      cameraRef.current.position.x =
        Math.sin(time * 0.22) * 0.12;

      cameraRef.current.position.y =
        Math.cos(time * 0.18) * 0.08;

      cameraRef.current.position.z = 6;
    } else {
      cameraRef.current.position.z =
        THREE.MathUtils.lerp(
          cameraRef.current.position.z,
          2.1,
          0.035
        );
    }

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 6]}
      fov={42}
    />
  );
}

interface AIUniverseProps {
  exiting: boolean;
}

export default function AIUniverse({
  exiting,
}: AIUniverseProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0, 6],
        fov: 42,
      }}
    >
      <CameraRig exiting={exiting} />

      <color
        attach="background"
        args={["#030712"]}
      />

      <ambientLight intensity={0.25} />

      <pointLight
        position={[0, 0, 2]}
        color="#38bdf8"
        intensity={5}
        distance={7}
      />

      <pointLight
        position={[2, 1, -2]}
        color="#2563eb"
        intensity={3}
        distance={6}
      />

      <NeuralCore />

      {/* Background stars */}
      <Stars
        radius={35}
        depth={30}
        count={1200}
        factor={2}
        saturation={0.2}
        fade
        speed={0.15}
      />

      <Environment preset="night" />
    </Canvas>
  );
}