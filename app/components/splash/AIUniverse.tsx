"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const PARTICLE_COUNT = 850;
const CONNECTION_COUNT = 180;

/* ============================================================
   TYPES
============================================================ */

interface AIUniverseProps {
  exiting?: boolean;
}

/* ============================================================
   PARTICLE SYSTEM
============================================================ */

function ParticleField({
  exiting = false,
}: {
  exiting?: boolean;
}) {
  const pointsRef =
    useRef<THREE.Points>(null);

  const lineRef =
    useRef<THREE.LineSegments>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(
      PARTICLE_COUNT * 3
    );

    const velocities = new Float32Array(
      PARTICLE_COUNT * 3
    );

    const targets = new Float32Array(
      PARTICLE_COUNT * 3
    );

    const phases = new Float32Array(
      PARTICLE_COUNT
    );

    const radii = new Float32Array(
      PARTICLE_COUNT
    );

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const radius =
        0.9 + Math.random() * 2.7;

      const theta =
        Math.random() *
        Math.PI *
        2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      positions[i3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      positions[i3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      positions[i3 + 2] =
        radius *
        Math.cos(phi);

      velocities[i3] =
        (Math.random() - 0.5) *
        0.002;

      velocities[i3 + 1] =
        (Math.random() - 0.5) *
        0.002;

      velocities[i3 + 2] =
        (Math.random() - 0.5) *
        0.002;

      /*
       * Target forms an abstract
       * computational / neural structure.
       */

      const layer =
        Math.floor(
          Math.random() * 6
        );

      const layerRadius =
        0.35 +
        layer * 0.16 +
        Math.random() * 0.12;

      const angle =
        Math.random() *
        Math.PI *
        2;

      const vertical =
        (Math.random() - 0.5) *
        1.8;

      targets[i3] =
        Math.cos(angle) *
        layerRadius;

      targets[i3 + 1] =
        vertical;

      targets[i3 + 2] =
        Math.sin(angle) *
        layerRadius;

      phases[i] =
        Math.random() *
        Math.PI *
        2;

      radii[i] = radius;
    }

    /*
     * Line geometry.
     */

    const linePositions =
      new Float32Array(
        CONNECTION_COUNT * 6
      );

    return {
      positions,
      velocities,
      targets,
      phases,
      radii,
      linePositions,
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    const positions =
      pointsRef.current.geometry
        .attributes.position
        .array as Float32Array;

    /*
     * Repeating system cycle.
     *
     * 0 - 2 sec:
     * particles orbit / calculate
     *
     * 2 - 4 sec:
     * particles synchronize
     *
     * 4 - 5 sec:
     * stable core
     *
     * 5 - 7 sec:
     * disperse
     */

    const cycle =
      elapsed % 7;

    let formation = 0;

    if (cycle < 2) {
      formation = 0;
    } else if (cycle < 4) {
      formation =
        THREE.MathUtils.clamp(
          (cycle - 2) / 2,
          0,
          1
        );
    } else if (cycle < 5) {
      formation = 1;
    } else {
      formation =
        1 -
        THREE.MathUtils.clamp(
          (cycle - 5) / 2,
          0,
          1
        );
    }

    /*
     * Smooth formation.
     */

    formation =
      formation *
      formation *
      (3 - 2 * formation);

    /*
     * Exit overrides normal behavior.
     */

    if (exiting) {
      formation = 0;
    }

    for (
      let i = 0;
      i < PARTICLE_COUNT;
      i++
    ) {
      const i3 = i * 3;

      const phase =
        data.phases[i];

      const baseRadius =
        data.radii[i];

      /*
       * Orbital motion.
       */

      const orbitSpeed =
        0.08 +
        (i % 7) * 0.008;

      const orbitAngle =
        phase +
        elapsed *
          orbitSpeed;

      const orbitalX =
        Math.cos(orbitAngle) *
        baseRadius;

      const orbitalZ =
        Math.sin(orbitAngle) *
        baseRadius;

      const orbitalY =
        Math.sin(
          elapsed * 0.4 +
            phase
        ) *
        0.35;

      /*
       * Target structure.
       */

      const targetX =
        data.targets[i3];

      const targetY =
        data.targets[i3 + 1];

      const targetZ =
        data.targets[i3 + 2];

      /*
       * Small computational jitter.
       */

      const noiseX =
        Math.sin(
          elapsed * 1.7 +
            phase
        ) *
        0.025;

      const noiseY =
        Math.cos(
          elapsed * 1.4 +
            phase
        ) *
        0.025;

      const noiseZ =
        Math.sin(
          elapsed * 2.1 +
            phase
        ) *
        0.025;

      /*
       * Blend orbiting state
       * with synchronized model.
       */

      const desiredX =
        THREE.MathUtils.lerp(
          orbitalX,
          targetX,
          formation
        ) + noiseX;

      const desiredY =
        THREE.MathUtils.lerp(
          orbitalY,
          targetY,
          formation
        ) + noiseY;

      const desiredZ =
        THREE.MathUtils.lerp(
          orbitalZ,
          targetZ,
          formation
        ) + noiseZ;

      /*
       * Exit explosion.
       */

      let exitX = 0;
      let exitY = 0;
      let exitZ = 0;

      if (exiting) {
        const length =
          Math.sqrt(
            positions[i3] *
              positions[i3] +
              positions[i3 + 1] *
                positions[i3 + 1] +
              positions[i3 + 2] *
                positions[i3 + 2]
          ) || 1;

        exitX =
          (positions[i3] / length) *
          0.035;

        exitY =
          (positions[i3 + 1] / length) *
          0.035;

        exitZ =
          (positions[i3 + 2] / length) *
          0.035;
      }

      /*
       * Spring movement.
       */

      positions[i3] +=
        (desiredX -
          positions[i3]) *
          0.025 +
        exitX;

      positions[i3 + 1] +=
        (desiredY -
          positions[i3 + 1]) *
          0.025 +
        exitY;

      positions[i3 + 2] +=
        (desiredZ -
          positions[i3 + 2]) *
          0.025 +
        exitZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate =
      true;

    /*
     * Rotate entire computational field.
     */

    pointsRef.current.rotation.y =
      elapsed * 0.055;

    pointsRef.current.rotation.x =
      Math.sin(
        elapsed * 0.15
      ) * 0.06;

    /*
     * --------------------------------------------------------
     * CONNECTION LINES
     * --------------------------------------------------------
     */

    if (lineRef.current) {
      const linePositions =
        lineRef.current.geometry
          .attributes.position
          .array as Float32Array;

      let lineIndex = 0;

      /*
       * Instead of expensive nearest-neighbor
       * calculations, connect particles
       * according to deterministic offsets.
       */

      for (
        let i = 0;
        i < CONNECTION_COUNT;
        i++
      ) {
        const a =
          (i * 7) %
          PARTICLE_COUNT;

        const b =
          (a + 11 + (i % 17)) %
          PARTICLE_COUNT;

        const a3 = a * 3;
        const b3 = b * 3;

        linePositions[lineIndex++] =
          positions[a3];

        linePositions[lineIndex++] =
          positions[a3 + 1];

        linePositions[lineIndex++] =
          positions[a3 + 2];

        linePositions[lineIndex++] =
          positions[b3];

        linePositions[lineIndex++] =
          positions[b3 + 1];

        linePositions[lineIndex++] =
          positions[b3 + 2];
      }

      lineRef.current.geometry.attributes.position.needsUpdate =
        true;

      lineRef.current.rotation.y =
        pointsRef.current.rotation.y;

      lineRef.current.rotation.x =
        pointsRef.current.rotation.x;
    }
  });

  return (
    <>
      {/* ======================================================
          PARTICLES
      ====================================================== */}

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              data.positions,
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#67e8f9"
          size={0.025}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      {/* ======================================================
          NEURAL CONNECTIONS
      ====================================================== */}

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              data.linePositions,
              3,
            ]}
          />
        </bufferGeometry>

        <lineBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </lineSegments>
    </>
  );
}

/* ============================================================
   CORE
============================================================ */

function SystemCore({
  exiting = false,
}: {
  exiting?: boolean;
}) {
  const coreRef =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!coreRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    coreRef.current.rotation.y =
      elapsed * 0.15;

    coreRef.current.rotation.x =
      Math.sin(
        elapsed * 0.3
      ) * 0.08;
  });

  return (
    <group ref={coreRef}>
      {/* ======================================================
          CORE GLOW
      ====================================================== */}

      <mesh>
        <sphereGeometry
          args={[0.16, 32, 32]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={exiting ? 0 : 0.35}
        />
      </mesh>

      {/* ======================================================
          INNER CORE
      ====================================================== */}

      <mesh>
        <sphereGeometry
          args={[0.055, 24, 24]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={exiting ? 0 : 0.95}
        />
      </mesh>

      {/* ======================================================
          CORE RING
      ====================================================== */}

      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry
          args={[
            0.25,
            0.008,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={exiting ? 0 : 0.35}
        />
      </mesh>

      {/* ======================================================
          SECOND RING
      ====================================================== */}

      <mesh rotation-y={Math.PI / 2}>
        <torusGeometry
          args={[
            0.38,
            0.006,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={exiting ? 0 : 0.18}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   SCANNING RINGS
============================================================ */

function ScanningRings({
  exiting = false,
}: {
  exiting?: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    groupRef.current.rotation.y =
      elapsed * 0.08;

    groupRef.current.rotation.x =
      Math.sin(
        elapsed * 0.2
      ) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 */}

      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry
          args={[
            0.75,
            0.004,
            8,
            128,
          ]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={exiting ? 0 : 0.14}
        />
      </mesh>

      {/* Ring 2 */}

      <mesh rotation-y={Math.PI / 3}>
        <torusGeometry
          args={[
            1.05,
            0.003,
            8,
            128,
          ]}
        />

        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={exiting ? 0 : 0.10}
        />
      </mesh>

      {/* Ring 3 */}

      <mesh rotation-x={Math.PI / 4}>
        <torusGeometry
          args={[
            1.35,
            0.002,
            8,
            128,
          ]}
        />

        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={exiting ? 0 : 0.07}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   DATA NODES
============================================================ */

function DataNodes({
  exiting = false,
}: {
  exiting?: boolean;
}) {
  const nodes = useMemo(() => {
    return Array.from(
      { length: 24 },
      (_, i) => {
        const radius =
          0.7 +
          Math.random() *
            1.1;

        const angle =
          Math.random() *
          Math.PI *
          2;

        const height =
          (Math.random() - 0.5) *
          1.8;

        return {
          position: [
            Math.cos(angle) *
              radius,
            height,
            Math.sin(angle) *
              radius,
          ] as [
            number,
            number,
            number
          ],
          delay:
            Math.random() * 2,
        };
      }
    );
  }, []);

  return (
    <group>
      {nodes.map(
        (node, index) => (
          <DataNode
            key={index}
            position={
              node.position
            }
            delay={node.delay}
            exiting={exiting}
          />
        )
      )}
    </group>
  );
}

function DataNode({
  position,
  delay,
  exiting,
}: {
  position: [
    number,
    number,
    number
  ];
  delay: number;
  exiting: boolean;
}) {
  const meshRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    const pulse =
      Math.sin(
        elapsed * 2 +
          delay
      );

    const scale =
      0.7 +
      pulse * 0.25;

    meshRef.current.scale.setScalar(
      exiting
        ? 0
        : scale
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
    >
      <sphereGeometry
        args={[0.018, 10, 10]}
      />

      <meshBasicMaterial
        color="#67e8f9"
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ============================================================
   MAIN UNIVERSE
============================================================ */

export default function AIUniverse({
  exiting = false,
}: AIUniverseProps) {
  return (
    <Canvas
      className="pointer-events-none"
      style={{ pointerEvents: "none" }}
      camera={{
        position: [
          0,
          0,
          5,
        ],
        fov: 45,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference:
          "high-performance",
      }}
    >
      <color
        attach="background"
        args={["#030712"]}
      />

      {/* ======================================================
          AMBIENT LIGHT
      ====================================================== */}

      <ambientLight
        intensity={0.2}
      />

      {/* ======================================================
          PARTICLE FIELD
      ====================================================== */}

      <ParticleField
        exiting={exiting}
      />

      {/* ======================================================
          SYSTEM CORE
      ====================================================== */}

      <SystemCore
        exiting={exiting}
      />

      {/* ======================================================
          SCANNING RINGS
      ====================================================== */}

      <ScanningRings
        exiting={exiting}
      />

      {/* ======================================================
          DATA NODES
      ====================================================== */}

      <DataNodes
        exiting={exiting}
      />
    </Canvas>
  );
}