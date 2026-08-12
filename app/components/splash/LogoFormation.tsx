"use client";

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useMemo, useRef } from "react";

const PARTICLE_COUNT = 850;

export default function LogoFormation() {
  const texture = useLoader(
    TextureLoader,
    "/images/logo.png"
  );

  const pointsRef = useRef<THREE.Points>(null);

  const { positions, targets } = useMemo(() => {
    const image = texture.image as HTMLImageElement;

    const canvas = document.createElement("canvas");

    // Use only the left portion of the logo.
    // This contains the Neirah symbol rather than the text.
    const cropWidth = Math.floor(image.width * 0.58);

    canvas.width = cropWidth;
    canvas.height = image.height;

    const context = canvas.getContext("2d");

    if (!context) {
      return {
        positions: new Float32Array(),
        targets: new Float32Array(),
      };
    }

    context.drawImage(
      image,
      0,
      0,
      cropWidth,
      image.height,
      0,
      0,
      cropWidth,
      image.height
    );

    const pixels = context.getImageData(
      0,
      0,
      cropWidth,
      image.height
    ).data;

    const candidates: [number, number][] = [];

    for (
      let y = 0;
      y < image.height;
      y += 3
    ) {
      for (
        let x = 0;
        x < cropWidth;
        x += 3
      ) {
        const index =
          (y * cropWidth + x) * 4;

        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const a = pixels[index + 3];

        const brightness =
          (r + g + b) / 3;

        // Works with transparent PNGs and
        // ignores a black background if present.
        if (
          a > 80 &&
          brightness > 35
        ) {
          candidates.push([x, y]);
        }
      }
    }

    const finalTargets: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const candidate =
        candidates[
          Math.floor(
            Math.random() * candidates.length
          )
        ];

      if (!candidate) {
        finalTargets.push(0, 0, 0);
        continue;
      }

      const [x, y] = candidate;

      const normalizedX =
        (x / cropWidth - 0.5) * 3.4;

      const normalizedY =
        -(y / image.height - 0.5) * 3.4;

      finalTargets.push(
        normalizedX,
        normalizedY,
        (Math.random() - 0.5) * 0.08
      );
    }

    const initialPositions: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius =
        1.1 + Math.random() * 1.7;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

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
    }

    return {
      positions: new Float32Array(
        initialPositions
      ),
      targets: new Float32Array(
        finalTargets
      ),
    };
  }, [texture]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const elapsed =
      state.clock.elapsedTime;

    /*
     * 0 - 1.5 sec:
     * particles behave like AI network
     *
     * 1.5 - 2.8 sec:
     * particles assemble into logo
     *
     * 2.8 - 3.8 sec:
     * logo holds
     *
     * after 3.8 sec:
     * logo slowly dissolves
     */

    const formationStart = 1.4;
    const formationEnd = 2.8;
    const dissolveStart = 3.2;

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

    if (elapsed > dissolveStart) {
      const dissolveProgress =
        THREE.MathUtils.clamp(
          (elapsed - dissolveStart) / 0.8,
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
      const index = i;

      const targetX =
        targets[index];

      const targetY =
        targets[index + 1];

      const targetZ =
        targets[index + 2];

      /*
       * Add a subtle living movement
       * while the logo is forming.
       */
      const wave =
        Math.sin(
          elapsed * 3 +
            i * 0.012
        ) * 0.015;

      positionArray[index] +=
        (targetX -
          positionArray[index]) *
          progress *
          0.075;

      positionArray[index + 1] +=
        (targetY -
          positionArray[index + 1]) *
          progress *
          0.075;

      positionArray[index + 2] +=
        (targetZ +
          wave -
          positionArray[index + 2]) *
          progress *
          0.075;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate =
      true;

    /*
     * Keep the formation slightly floating.
     */
    pointsRef.current.rotation.y =
      Math.sin(elapsed * 0.25) * 0.04;
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
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  );
}