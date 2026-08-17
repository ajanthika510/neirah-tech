"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const PARTICLE_COUNT = 850;

export default function LogoFormation() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, targets } = useMemo(() => {
    const initialPositions: number[] = [];
    const targetPositions: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Initial random 3D cloud
      const radius = 1.5 + Math.random() * 2.2;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      initialPositions.push(
        radius *
          Math.sin(phi) *
          Math.cos(theta),

        radius *
          Math.sin(phi) *
          Math.sin(theta),

        radius *
          Math.cos(phi)
      );

      /*
       * Target = abstract AI/model structure.
       *
       * Instead of a logo, particles form
       * several connected spherical layers.
       */

      const layer = Math.floor(
        Math.random() * 5
      );

      const layerRadius =
        0.35 + layer * 0.22;

      const angle =
        Math.random() * Math.PI * 2;

      const vertical =
        (Math.random() - 0.5) * 1.8;

      const x =
        Math.cos(angle) *
        layerRadius;

      const y =
        vertical;

      const z =
        Math.sin(angle) *
        layerRadius;

      targetPositions.push(
        x,
        y,
        z
      );
    }

    return {
      positions: new Float32Array(
        initialPositions
      ),
      targets: new Float32Array(
        targetPositions
      ),
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    /*
     * Animation cycle
     *
     * 0 - 1.5:
     *     particles behave like a
     *     loading / AI particle cloud
     *
     * 1.5 - 3:
     *     particles assemble
     *
     * 3 - 4:
     *     model holds
     *
     * 4+:
     *     model dissolves
     */

    const formationStart = 1.4;
    const formationEnd = 2.8;
    const dissolveStart = 3.6;

    let progress = THREE.MathUtils.clamp(
      (elapsed - formationStart) /
        (formationEnd - formationStart),
      0,
      1
    );

    // Smooth easing
    progress =
      progress *
      progress *
      (3 - 2 * progress);

    // Dissolve
    if (elapsed > dissolveStart) {
      const dissolveProgress =
        THREE.MathUtils.clamp(
          (elapsed - dissolveStart) / 1.2,
          0,
          1
        );

      progress *=
        1 - dissolveProgress;
    }

    const positionArray =
      pointsRef.current.geometry.attributes
        .position.array as Float32Array;

    for (
      let i = 0;
      i < positionArray.length;
      i += 3
    ) {
      const targetX = targets[i];
      const targetY = targets[i + 1];
      const targetZ = targets[i + 2];

      /*
       * Organic particle movement.
       */
      const wave =
        Math.sin(
          elapsed * 2.5 +
            i * 0.015
        ) * 0.025;

      const wave2 =
        Math.cos(
          elapsed * 1.8 +
            i * 0.01
        ) * 0.015;

      positionArray[i] +=
        (targetX +
          wave -
          positionArray[i]) *
        progress *
        0.06;

      positionArray[i + 1] +=
        (targetY +
          wave2 -
          positionArray[i + 1]) *
        progress *
        0.06;

      positionArray[i + 2] +=
        (targetZ -
          positionArray[i + 2]) *
        progress *
        0.06;

      /*
       * When dissolving, push particles
       * outward.
       */
      if (elapsed > dissolveStart) {
        const dissolveProgress =
          THREE.MathUtils.clamp(
            (elapsed - dissolveStart) / 1.2,
            0,
            1
          );

        const length = Math.sqrt(
          positionArray[i] *
            positionArray[i] +
            positionArray[i + 1] *
              positionArray[i + 1] +
            positionArray[i + 2] *
              positionArray[i + 2]
        );

        if (length > 0) {
          positionArray[i] +=
            (positionArray[i] / length) *
            dissolveProgress *
            0.025;

          positionArray[i + 1] +=
            (positionArray[i + 1] / length) *
            dissolveProgress *
            0.025;

          positionArray[i + 2] +=
            (positionArray[i + 2] / length) *
            dissolveProgress *
            0.025;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate =
      true;

    /*
     * Slow AI-model rotation.
     */
    pointsRef.current.rotation.y =
      elapsed * 0.18;

    pointsRef.current.rotation.x =
      Math.sin(elapsed * 0.25) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            positions,
            3,
          ]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#38bdf8"
        size={0.035}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  );
}