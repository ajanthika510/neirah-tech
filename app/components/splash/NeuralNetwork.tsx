"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Points, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface Node {
  position: [number, number, number];
  scale: number;
}

interface Connection {
  start: [number, number, number];
  end: [number, number, number];
}

export default function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const generatedNodes: Node[] = [];
    const generatedConnections: Connection[] = [];

    const count = 85;
    const radius = 2.25;

    // Deterministic spherical distribution
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      generatedNodes.push({
        position: [x, y, z],
        scale: 0.035 + Math.random() * 0.045,
      });
    }

    // Connect nearby nodes
    for (let i = 0; i < generatedNodes.length; i++) {
      const current = new THREE.Vector3(
        ...generatedNodes[i].position
      );

      const nearby = generatedNodes
        .map((node, index) => {
          const position = new THREE.Vector3(...node.position);

          return {
            index,
            distance: current.distanceTo(position),
          };
        })
        .filter(
          (item) =>
            item.index !== i &&
            item.distance < 1.15
        )
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      nearby.forEach((target) => {
        if (i < target.index) {
          generatedConnections.push({
            start: generatedNodes[i].position,
            end: generatedNodes[target.index].position,
          });
        }
      });
    }

    return {
      nodes: generatedNodes,
      connections: generatedConnections,
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  const positions = useMemo(
    () =>
      nodes.flatMap((node) => node.position),
    [nodes]
  );

  return (
    <group ref={groupRef}>
      {/* Neural connections */}
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={[
            connection.start,
            connection.end,
          ]}
          color="#2563eb"
          transparent
          opacity={0.16}
          lineWidth={0.6}
        />
      ))}

      {/* Neural nodes */}
      <Points
        positions={positions}
        stride={3}
      >
        <pointsMaterial
          color="#38bdf8"
          size={0.055}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Points>

      {/* Larger energy nodes */}
      {nodes
        .filter((_, index) => index % 8 === 0)
        .map((node, index) => (
          <mesh
            key={`energy-${index}`}
            position={node.position}
          >
            <sphereGeometry args={[0.055, 8, 8]} />

            <meshBasicMaterial
              color="#67e8f9"
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
    </group>
  );
}