"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface NeuralNode {
  position: [number, number, number];
}

interface NeuralConnection {
  start: [number, number, number];
  end: [number, number, number];
}

export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  // ============================================================
  // GENERATE NEURAL NETWORK
  // ============================================================

  const { nodes, connections } = useMemo(() => {
    const generatedNodes: NeuralNode[] = [];
    const generatedConnections: NeuralConnection[] = [];

    const nodeCount = 85;
    const radius = 2.25;

    // ----------------------------------------------------------
    // Generate nodes around a sphere
    // Fibonacci sphere distribution
    // ----------------------------------------------------------

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(
        1 - (2 * (i + 0.5)) / nodeCount
      );

      const theta =
        Math.PI * (3 - Math.sqrt(5)) * i;

      const x =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      const y =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      const z =
        radius * Math.cos(phi);

      generatedNodes.push({
        position: [x, y, z],
      });
    }

    // ----------------------------------------------------------
    // Connect nearby nodes
    // ----------------------------------------------------------

    for (
      let i = 0;
      i < generatedNodes.length;
      i++
    ) {
      const currentPosition =
        new THREE.Vector3(
          generatedNodes[i].position[0],
          generatedNodes[i].position[1],
          generatedNodes[i].position[2]
        );

      const nearbyNodes = generatedNodes
        .map((node, index) => {
          const nodePosition =
            new THREE.Vector3(
              node.position[0],
              node.position[1],
              node.position[2]
            );

          return {
            index,
            distance:
              currentPosition.distanceTo(
                nodePosition
              ),
          };
        })
        .filter(
          (item) =>
            item.index !== i &&
            item.distance < 1.15
        )
        .sort(
          (a, b) =>
            a.distance - b.distance
        )
        .slice(0, 3);

      nearbyNodes.forEach((target) => {
        // Prevent duplicate connections
        if (i < target.index) {
          generatedConnections.push({
            start:
              generatedNodes[i].position,

            end:
              generatedNodes[target.index]
                .position,
          });
        }
      });
    }

    return {
      nodes: generatedNodes,
      connections: generatedConnections,
    };
  }, []);

  // ============================================================
  // CREATE POSITION BUFFER
  // ============================================================

  const positionArray = useMemo(() => {
    const array = new Float32Array(
      nodes.length * 3
    );

    nodes.forEach((node, index) => {
      const offset = index * 3;

      array[offset] =
        node.position[0];

      array[offset + 1] =
        node.position[1];

      array[offset + 2] =
        node.position[2];
    });

    return array;
  }, [nodes]);

  // ============================================================
  // ANIMATION
  // ============================================================

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    // Slow rotation
    groupRef.current.rotation.y +=
      delta * 0.08;

    // Gentle floating rotation
    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.25
      ) * 0.08;
  });

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <group ref={groupRef}>

      {/* ======================================================
          NEURAL CONNECTIONS
      ====================================================== */}

      {connections.map(
        (connection, index) => (
          <Line
            key={`connection-${index}`}
            points={[
              connection.start,
              connection.end,
            ]}
            color="#2563eb"
            transparent
            opacity={0.16}
            lineWidth={0.6}
          />
        )
      )}

      {/* ======================================================
          NEURAL NODES
      ====================================================== */}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              positionArray,
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#38bdf8"
          size={0.055}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </points>

      {/* ======================================================
          LARGE ENERGY NODES
      ====================================================== */}

      {nodes
        .filter(
          (_, index) => index % 8 === 0
        )
        .map((node, index) => (
          <mesh
            key={`energy-${index}`}
            position={node.position}
          >
            <sphereGeometry
              args={[
                0.055,
                8,
                8,
              ]}
            />

            <meshBasicMaterial
              color="#67e8f9"
              transparent
              opacity={0.9}
              blending={
                THREE.AdditiveBlending
              }
              depthWrite={false}
            />
          </mesh>
        ))}
    </group>
  );
}