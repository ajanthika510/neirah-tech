"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Product } from "../FeaturedProjects";

interface ZAxisGalleryCanvasProps {
  products: Product[];
  progress: number;
  onSelectProduct?: (index: number) => void;
  mousePos: { x: number; y: number };
}

const SPACING_Z = 16;
const FOCAL_Z = 2.0;
const CAMERA_Z = 7.5;

/* =========================================================
   ASYMMETRIC 3D MESH OFFSETS
========================================================= */

const MESH_OFFSETS: [number, number, number][] = [
  [-1.7, -0.05, 0],
  [1.7, 0.1, 0],
  [-1.7, -0.05, 0],
  [1.7, 0.35, 0],
  [-1.7, -0.1, 0],
  [1.7, 0.1, 0],
  [-1.7, -0.15, 0],
  [1.7, 0.25, 0],
  [-1.7, 0.05, 0],
  [1.7, -0.05, 0],
  [-1.7, 0.15, 0],
];

/* =========================================================
   SCENE
========================================================= */

function GalleryScene({
  products,
  progress,
  mousePos,
  onSelectProduct,
}: ZAxisGalleryCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const targetCamX = mousePos.x * 0.45;
    const targetCamY = mousePos.y * 0.3;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetCamX,
      2.5,
      delta
    );

    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetCamY,
      2.5,
      delta
    );

    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#F8FBFF", 0.022]} />
      {/* =====================================================
          LIGHTING
      ===================================================== */}

      <ambientLight
        intensity={1.15}
        color="#ffffff"
      />

      <directionalLight
        position={[8, 12, 10]}
        intensity={2.0}
        color="#ffffff"
      />

      <directionalLight
        position={[-8, -6, 6]}
        intensity={1.2}
        color="#E0F2FE"
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={2.2}
        distance={18}
        color="#0EA5E9"
      />

      <pointLight
        position={[0, 2, -22]}
        intensity={1.8}
        distance={40}
        color="#818CF8"
      />

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <GlowingFlowLines progress={progress} />

      <FloatingBlobs3D progress={progress} />

      <EtherealDustField progress={progress} />

      <ArchitecturalDepthRings progress={progress} />

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <group ref={groupRef}>
        {products.map((product, index) => (
          <ProductDiscovery3D
            key={product.id}
            product={product}
            index={index}
            currentProgress={progress}
            meshOffset={
              MESH_OFFSETS[index % MESH_OFFSETS.length]
            }
            onClick={() =>
              onSelectProduct?.(index)
            }
          />
        ))}
      </group>
    </>
  );
}

/* =========================================================
   GLOWING FLOW LINES
========================================================= */

function GlowingFlowLines({
  progress,
}: {
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const curves = useMemo(() => {
    const list: THREE.CatmullRomCurve3[] = [];

    const configs = [
      {
        radius: 3.8,
        freq: 1.8,
        phase: 0,
        zSpan: 90,
      },
      {
        radius: 4.5,
        freq: 2.2,
        phase: Math.PI / 2,
        zSpan: 95,
      },
      {
        radius: 3.2,
        freq: 1.5,
        phase: Math.PI,
        zSpan: 85,
      },
      {
        radius: 4.0,
        freq: 2.6,
        phase: (Math.PI * 3) / 2,
        zSpan: 90,
      },
    ];

    configs.forEach((cfg) => {
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= 60; i++) {
        const t = i / 60;

        const z =
          8 - t * cfg.zSpan;

        const angle =
          t * Math.PI * cfg.freq +
          cfg.phase;

        const x =
          Math.cos(angle) * cfg.radius +
          Math.sin(t * 5) * 0.8;

        const y =
          Math.sin(angle) *
            (cfg.radius * 0.65) +
          Math.cos(t * 4) * 0.5;

        points.push(
          new THREE.Vector3(x, y, z)
        );
      }

      list.push(
        new THREE.CatmullRomCurve3(
          points,
          false,
          "catmullrom",
          0.6
        )
      );
    });

    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z =
      state.clock.elapsedTime * 0.02;

    groupRef.current.position.z =
      (progress * 2.5) % 15;
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, index) => {
        const color =
          index % 2 === 0
            ? "#0EA5E9"
            : "#6366F1";

        return (
          <group key={index}>
            <mesh>
              <tubeGeometry
                args={[
                  curve,
                  80,
                  0.018,
                  6,
                  false,
                ]}
              />

              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.45}
                blending={
                  THREE.AdditiveBlending
                }
                depthWrite={false}
              />
            </mesh>

            <mesh>
              <tubeGeometry
                args={[
                  curve,
                  80,
                  0.08,
                  6,
                  false,
                ]}
              />

              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.08}
                blending={
                  THREE.AdditiveBlending
                }
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   FLOATING BLOBS
========================================================= */

function createFloatingBlobsData() {
  return Array.from({ length: 26 }, (_, i) => {
    const angle = (i / 26) * Math.PI * 2 + Math.sin(i * 1.5);
    const radius = 2.4 + (i % 5) * 0.8;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (radius * 0.7) + (Math.random() - 0.5) * 1.2;
    const z = 6 - i * 3.2;

    const scale = 0.08 + (i % 4) * 0.04;
    const color =
      i % 3 === 0
        ? "#38BDF8"
        : i % 3 === 1
        ? "#818CF8"
        : "#22D3EE";

    return {
      x,
      y,
      z,
      scale,
      color,
      speed: 0.6 + (i % 4) * 0.3,
      offset: i * 0.7,
    };
  });
}

function FloatingBlobs3D({
  progress,
}: {
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const blobs = useMemo(() => createFloatingBlobsData(), []);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.z =
      (progress * 3.0) % 18;
  });

  return (
    <group ref={groupRef}>
      {blobs.map((blob, index) => (
        <SmallBlobMesh
          key={index}
          blob={blob}
        />
      ))}
    </group>
  );
}

function SmallBlobMesh({
  blob,
}: {
  blob: {
    x: number;
    y: number;
    z: number;
    scale: number;
    color: string;
    speed: number;
    offset: number;
  };
}) {
  const meshRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t =
      state.clock.elapsedTime *
        blob.speed +
      blob.offset;

    meshRef.current.position.y =
      blob.y + Math.sin(t) * 0.18;

    meshRef.current.position.x =
      blob.x + Math.cos(t * 0.8) * 0.12;

    const scale =
      blob.scale *
      (1 + Math.sin(t * 1.5) * 0.1);

    meshRef.current.scale.set(
      scale,
      scale,
      scale
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={[
        blob.x,
        blob.y,
        blob.z,
      ]}
    >
      <sphereGeometry
        args={[1, 16, 16]}
      />

      <meshStandardMaterial
        color={blob.color}
        emissive={blob.color}
        emissiveIntensity={0.65}
        roughness={0.15}
        metalness={0.8}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

/* =========================================================
   ETHEREAL DUST
========================================================= */

function createEtherealDust(count: number) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  const palette = [
    new THREE.Color("#94A3B8"),
    new THREE.Color("#38BDF8"),
    new THREE.Color("#CBD5E1"),
    new THREE.Color("#818CF8"),
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.0 + Math.random() * 9.0;

    pos[i3] = Math.cos(angle) * radius;
    pos[i3 + 1] = Math.sin(angle) * (radius * 0.75) + (Math.random() - 0.5) * 2;
    pos[i3 + 2] = 14 - Math.random() * 95;

    const c = palette[i % palette.length];
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }

  return [pos, col] as const;
}

function EtherealDustField({
  progress,
}: {
  progress: number;
}) {
  const count = 1100;
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => createEtherealDust(count), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.z =
      state.clock.elapsedTime * 0.015;

    pointsRef.current.position.z =
      (progress * 3.0) % 18;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />

        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   ARCHITECTURAL DEPTH RINGS
========================================================= */

function ArchitecturalDepthRings({
  progress,
}: {
  progress: number;
}) {
  const ringCount = 8;

  const groupRef =
    useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.z =
      (progress * 2) % 12;
  });

  return (
    <group ref={groupRef}>
      {Array.from({
        length: ringCount,
      }).map((_, index) => {
        const z =
          6 - index * 12;

        return (
          <group
            key={index}
            position={[0, 0, z]}
          >
            <mesh
              rotation-z={
                Math.PI / 4
              }
            >
              <ringGeometry
                args={[
                  6.8,
                  6.82,
                  4,
                ]}
              />

              <meshBasicMaterial
                color="#0EA5E9"
                transparent
                opacity={0.05}
                side={
                  THREE.DoubleSide
                }
                blending={
                  THREE.AdditiveBlending
                }
                depthWrite={false}
              />
            </mesh>

            <mesh>
              <torusGeometry
                args={[
                  5.6,
                  0.01,
                  8,
                  48,
                ]}
              />

              <meshBasicMaterial
                color="#94A3B8"
                transparent
                opacity={0.04}
                blending={
                  THREE.AdditiveBlending
                }
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   PRODUCT DISCOVERY
========================================================= */

interface ProductDiscovery3DProps {
  product: Product;
  index: number;
  currentProgress: number;
  meshOffset: [
    number,
    number,
    number
  ];
  onClick: () => void;
}

function ProductDiscovery3D({
  product,
  index,
  currentProgress,
  meshOffset,
  onClick,
}: ProductDiscovery3DProps) {
  const { size } = useThree();

  const rootRef =
    useRef<THREE.Group>(null);

  const meshGroupRef =
    useRef<THREE.Group>(null);

  const glowRingRef =
    useRef<THREE.Mesh>(null);

  /* =======================================================
     RESPONSIVE POSITION
  ======================================================= */

  const actualOffset =
    useMemo<
      [number, number, number]
    >(() => {
      const width = size.width;

      /*
       * MOBILE
       */
      if (width < 768) {
        return [
          meshOffset[0] * 0.15,
          meshOffset[1] > 0
            ? 0.8
            : 0.65,
          meshOffset[2],
        ];
      }

      /*
       * TABLET
       */
      if (width < 1024) {
        return [
          meshOffset[0] * 0.75,
          meshOffset[1],
          meshOffset[2],
        ];
      }

      /*
       * DESKTOP
       */
      return [
        meshOffset[0],
        meshOffset[1],
        meshOffset[2],
      ];
    }, [
      size.width,
      meshOffset,
    ]);

  /* =======================================================
     Z POSITION
  ======================================================= */

  const relativeIndex =
    index - currentProgress;

  const targetZ =
    FOCAL_Z -
    relativeIndex *
      SPACING_Z;

  /* =======================================================
     ANIMATION LOOP
  ======================================================= */

  useFrame((state, delta) => {
    const root =
      rootRef.current;

    const meshGroup =
      meshGroupRef.current;

    if (!root || !meshGroup) {
      return;
    }

    /*
     * Smooth Z interpolation
     */
    root.position.z =
      THREE.MathUtils.damp(
        root.position.z,
        targetZ,
        9,
        delta
      );

    /*
     * Camera distance
     */
    const currentZ =
      root.position.z;

    const distToCam =
      CAMERA_Z -
      currentZ;

    /*
     * Prevent object from
     * getting too close to camera.
     */
    root.visible =
      distToCam >= 0.6;

    /*
     * Focal product
     */
    const isFocal =
      Math.abs(
        relativeIndex
      ) < 0.35;

    const elapsed =
      state.clock.elapsedTime;

    /* =====================================================
       FOCAL ANIMATION
    ===================================================== */

    if (isFocal) {
      meshGroup.rotation.x =
        THREE.MathUtils.damp(
          meshGroup.rotation.x,
          Math.sin(
            elapsed * 0.7
          ) * 0.12,
          3.5,
          delta
        );

      meshGroup.rotation.y =
        THREE.MathUtils.damp(
          meshGroup.rotation.y,
          elapsed * 0.28,
          2.5,
          delta
        );

      meshGroup.rotation.z =
        THREE.MathUtils.damp(
          meshGroup.rotation.z,
          Math.cos(
            elapsed * 0.5
          ) * 0.06,
          3.5,
          delta
        );
    } else {
      /*
       * Distant products
       * rotate more freely.
       */
      meshGroup.rotation.x +=
        (0.18 +
          (index % 3) * 0.06) *
        delta;

      meshGroup.rotation.y +=
        (0.24 +
          (index % 4) * 0.08) *
        delta;

      meshGroup.rotation.z +=
        (0.12 +
          (index % 2) * 0.05) *
        delta;
    }

    /* =====================================================
       HALO
    ===================================================== */

    if (glowRingRef.current) {
      const ringScale =
        isFocal
          ? 1 +
            Math.sin(
              elapsed * 2
            ) *
              0.05
          : 0.85;

      glowRingRef.current.scale.set(
        ringScale,
        ringScale,
        ringScale
      );

      glowRingRef.current.rotation.z =
        elapsed * 0.3;
    }
  });

  return (
    <group
      ref={rootRef}
      position={[
        0,
        0,
        targetZ,
      ]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <group
        position={actualOffset}
      >
        <group ref={meshGroupRef}>
          <RefinedProductGeometry
            index={index}
            accent={
              product.accent
            }
          />
        </group>

        {/* =================================================
            HALO
        ================================================= */}

        <mesh
          ref={glowRingRef}
          position={[
            0,
            0,
            -0.2,
          ]}
        >
          <ringGeometry
            args={[
              1.55,
              1.68,
              48,
            ]}
          />

          <meshBasicMaterial
            color={
              product.accent
            }
            transparent
            opacity={0.25}
            side={
              THREE.DoubleSide
            }
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        {/* =================================================
            PRODUCT LIGHT
        ================================================= */}

        <pointLight
          color={
            product.accent
          }
          intensity={
            Math.abs(
              relativeIndex
            ) < 0.5
              ? 2.0
              : 0.6
          }
          distance={7}
        />
      </group>
    </group>
  );
}

/* =========================================================
   PRODUCT GEOMETRY
========================================================= */

function RefinedProductGeometry({
  index,
}: {
  index: number;
  accent?: string;
}) {
  const coreRef =
    useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!coreRef.current) {
      return;
    }

    coreRef.current.rotation.y =
      -state.clock.elapsedTime *
      0.5;

    coreRef.current.rotation.x =
      state.clock.elapsedTime *
      0.3;
  });

  switch (index) {
    /* =====================================================
       01. LANTRIVA
    ===================================================== */

    case 0:
      return (
        <group>
          <group
            position={[
              0,
              0,
              0.25,
            ]}
            rotation={[
              0.08,
              -0.15,
              0.05,
            ]}
          >
            <mesh>
              <boxGeometry
                args={[
                  1.8,
                  1.2,
                  0.06,
                ]}
              />

              <meshPhysicalMaterial
                color="#E0F2FE"
                roughness={0.06}
                transmission={0.92}
                thickness={0.8}
                ior={1.5}
                transparent
                opacity={0.85}
                reflectivity={0.9}
                clearcoat={1}
                clearcoatRoughness={
                  0.04
                }
              />
            </mesh>

            <mesh>
              <boxGeometry
                args={[
                  1.82,
                  1.22,
                  0.065,
                ]}
              />

              <meshBasicMaterial
                color="#0EA5E9"
                wireframe
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>

          <group
            position={[
              -0.3,
              0.25,
              -0.25,
            ]}
            rotation={[
              -0.05,
              0.12,
              -0.08,
            ]}
          >
            <mesh>
              <boxGeometry
                args={[
                  1.5,
                  1.0,
                  0.05,
                ]}
              />

              <meshPhysicalMaterial
                color="#BAE6FD"
                roughness={0.12}
                transmission={0.88}
                thickness={0.6}
                ior={1.48}
                transparent
                opacity={0.7}
                clearcoat={0.8}
              />
            </mesh>

            <mesh>
              <boxGeometry
                args={[
                  1.52,
                  1.02,
                  0.055,
                ]}
              />

              <meshBasicMaterial
                color="#38BDF8"
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>

          <group
            position={[
              0.35,
              -0.2,
              -0.6,
            ]}
            rotation={[
              0.1,
              -0.08,
              0.06,
            ]}
          >
            <mesh>
              <boxGeometry
                args={[
                  1.4,
                  0.9,
                  0.04,
                ]}
              />

              <meshPhysicalMaterial
                color="#7DD3FC"
                roughness={0.15}
                transmission={0.85}
                thickness={0.5}
                ior={1.45}
                transparent
                opacity={0.55}
              />
            </mesh>

            <mesh>
              <boxGeometry
                args={[
                  1.42,
                  0.92,
                  0.045,
                ]}
              />

              <meshBasicMaterial
                color="#0284C7"
                wireframe
                transparent
                opacity={0.25}
              />
            </mesh>
          </group>

          <mesh
            ref={coreRef}
            position={[0, 0, 0]}
          >
            <dodecahedronGeometry
              args={[0.48, 0]}
            />

            <meshStandardMaterial
              color="#0284C7"
              emissive="#38BDF8"
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.85}
            />
          </mesh>

          <mesh
            rotation-x={
              Math.PI / 2.5
            }
            rotation-y={
              Math.PI / 6
            }
          >
            <torusGeometry
              args={[
                1.35,
                0.018,
                16,
                64,
              ]}
            />

            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      );

    /* =====================================================
       02. NEIRAH LAB
    ===================================================== */

    case 1:
      return (
        <group>
          <mesh>
            <icosahedronGeometry
              args={[1.25, 0]}
            />

            <meshStandardMaterial
              color="#4338CA"
              roughness={0.2}
              metalness={0.8}
              emissive="#312E81"
              emissiveIntensity={0.3}
            />
          </mesh>

          <mesh>
            <icosahedronGeometry
              args={[1.5, 1]}
            />

            <meshBasicMaterial
              color="#6366F1"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          <mesh ref={coreRef}>
            <dodecahedronGeometry
              args={[0.55, 0]}
            />

            <meshPhysicalMaterial
              color="#EEF2FF"
              transmission={0.8}
              roughness={0.1}
              ior={1.45}
            />
          </mesh>
        </group>
      );

    /* =====================================================
       03. NEIRAH IOT
    ===================================================== */

    case 2:
      return (
        <group>
          <mesh>
            <torusKnotGeometry
              args={[
                0.9,
                0.22,
                128,
                32,
                2,
                3,
              ]}
            />

            <meshStandardMaterial
              color="#0E7490"
              emissive="#155E75"
              emissiveIntensity={0.35}
              roughness={0.18}
              metalness={0.9}
            />
          </mesh>

          <mesh ref={coreRef}>
            <sphereGeometry
              args={[0.4, 24, 24]}
            />

            <meshBasicMaterial
              color="#06B6D4"
            />
          </mesh>

          <mesh
            rotation-x={
              Math.PI / 2
            }
          >
            <torusGeometry
              args={[
                1.45,
                0.025,
                16,
                64,
              ]}
            />

            <meshBasicMaterial
              color="#22D3EE"
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      );

    /* =====================================================
       04. NEIRAH DRONE
    ===================================================== */

    case 3:
      return (
        <group>
          <mesh>
            <octahedronGeometry
              args={[1.3, 0]}
            />

            <meshStandardMaterial
              color="#1E40AF"
              emissive="#1E3A8A"
              emissiveIntensity={0.3}
              roughness={0.12}
              metalness={0.95}
            />
          </mesh>

          <mesh
            rotation-x={
              Math.PI / 2
            }
          >
            <torusGeometry
              args={[
                1.55,
                0.035,
                16,
                64,
              ]}
            />

            <meshBasicMaterial
              color="#3B82F6"
              transparent
              opacity={0.6}
            />
          </mesh>

          <mesh
            rotation-y={
              Math.PI / 3
            }
          >
            <torusGeometry
              args={[
                1.2,
                0.025,
                16,
                48,
              ]}
            />

            <meshBasicMaterial
              color="#60A5FA"
              transparent
              opacity={0.4}
            />
          </mesh>

          <mesh ref={coreRef}>
            <sphereGeometry
              args={[0.45, 16, 16]}
            />

            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#38BDF8"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      );

    /* =====================================================
       05. MUGILIX
    ===================================================== */

    case 4:
      return (
        <group>
          <mesh>
            <boxGeometry
              args={[
                1.2,
                1.2,
                1.2,
              ]}
            />

            <meshStandardMaterial
              color="#5B21B6"
              emissive="#4C1D95"
              emissiveIntensity={0.3}
              roughness={0.18}
              metalness={0.8}
            />
          </mesh>

          <mesh
            rotation-y={
              Math.PI / 4
            }
            rotation-x={
              Math.PI / 4
            }
          >
            <boxGeometry
              args={[
                1.35,
                1.35,
                1.35,
              ]}
            />

            <meshBasicMaterial
              color="#8B5CF6"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          <mesh ref={coreRef}>
            <dodecahedronGeometry
              args={[0.45, 0]}
            />

            <meshStandardMaterial
              color="#F5F3FF"
              emissive="#7C3AED"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      );

    /* =====================================================
       06. HRVIO
    ===================================================== */

    case 5:
      return (
        <group>
          <mesh>
            <icosahedronGeometry
              args={[1.15, 2]}
            />

            <meshStandardMaterial
              color="#0F766E"
              emissive="#115E59"
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>

          <mesh>
            <sphereGeometry
              args={[
                1.45,
                18,
                18,
              ]}
            />

            <meshBasicMaterial
              color="#14B8A6"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          <mesh ref={coreRef}>
            <icosahedronGeometry
              args={[0.6, 1]}
            />

            <meshBasicMaterial
              color="#2DD4BF"
            />
          </mesh>
        </group>
      );

    /* =====================================================
       07. POTHIFY
    ===================================================== */

    case 6:
      return (
        <group>
          <mesh
            rotation-z={
              Math.PI / 4
            }
          >
            <capsuleGeometry
              args={[
                0.55,
                1.1,
                16,
                32,
              ]}
            />

            <meshStandardMaterial
              color="#0369A1"
              emissive="#075985"
              emissiveIntensity={0.35}
              roughness={0.12}
              metalness={0.9}
            />
          </mesh>

          <mesh
            rotation-x={
              Math.PI / 3
            }
            rotation-y={
              Math.PI / 4
            }
          >
            <torusGeometry
              args={[
                1.4,
                0.03,
                16,
                64,
              ]}
            />

            <meshBasicMaterial
              color="#0284C7"
              transparent
              opacity={0.6}
            />
          </mesh>

          <mesh ref={coreRef}>
            <sphereGeometry
              args={[0.35, 16, 16]}
            />

            <meshBasicMaterial
              color="#BAE6FD"
            />
          </mesh>
        </group>
      );

    /* =====================================================
       08. TRICOBITES
    ===================================================== */

    case 7:
      return (
        <group>
          <mesh>
            <torusGeometry
              args={[
                0.95,
                0.35,
                24,
                64,
              ]}
            />

            <meshStandardMaterial
              color="#9D174D"
              emissive="#831843"
              emissiveIntensity={0.35}
              roughness={0.18}
              metalness={0.8}
            />
          </mesh>

          <mesh
            rotation-x={
              Math.PI / 2
            }
          >
            <torusGeometry
              args={[
                1.5,
                0.02,
                16,
                48,
              ]}
            />

            <meshBasicMaterial
              color="#EC4899"
              transparent
              opacity={0.45}
            />
          </mesh>

          <mesh ref={coreRef}>
            <octahedronGeometry
              args={[0.45, 0]}
            />

            <meshBasicMaterial
              color="#FDF2F8"
            />
          </mesh>
        </group>
      );

    /* =====================================================
       09. RIDEYA
    ===================================================== */

    case 8:
      return (
        <group>
          <mesh
            rotation-x={
              Math.PI / 2
            }
          >
            <cylinderGeometry
              args={[
                0.9,
                0.9,
                1.5,
                8,
              ]}
            />

            <meshStandardMaterial
              color="#B45309"
              emissive="#92400E"
              emissiveIntensity={0.35}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          <mesh
            rotation-z={
              Math.PI / 3
            }
          >
            <torusGeometry
              args={[
                1.4,
                0.03,
                16,
                48,
              ]}
            />

            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={0.6}
            />
          </mesh>

          <mesh ref={coreRef}>
            <dodecahedronGeometry
              args={[0.45, 0]}
            />

            <meshBasicMaterial
              color="#FEF3C7"
            />
          </mesh>
        </group>
      );

    /* =====================================================
       10. NEIRAH BRANDOS
    ===================================================== */

    case 9:
      return (
        <group>
          <mesh>
            <dodecahedronGeometry
              args={[1.2, 0]}
            />

            <meshStandardMaterial
              color="#B91C1C"
              emissive="#991B1B"
              emissiveIntensity={0.35}
              roughness={0.12}
              metalness={0.85}
            />
          </mesh>

          <mesh>
            <octahedronGeometry
              args={[1.5, 0]}
            />

            <meshBasicMaterial
              color="#EF4444"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          <mesh ref={coreRef}>
            <icosahedronGeometry
              args={[0.5, 0]}
            />

            <meshBasicMaterial
              color="#FFE4E6"
            />
          </mesh>
        </group>
      );

    /* =====================================================
       11. NEIRAH CLOUD
    ===================================================== */

    case 10:
    default:
      return (
        <group>
          <mesh>
            <icosahedronGeometry args={[1.25, 0]} />
            <meshStandardMaterial
              color="#059669"
              emissive="#047857"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          <mesh rotation-z={Math.PI / 4}>
            <torusGeometry args={[1.5, 0.035, 16, 64]} />
            <meshBasicMaterial color="#34D399" transparent opacity={0.6} />
          </mesh>

          <mesh ref={coreRef}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#10B981" emissiveIntensity={0.85} />
          </mesh>
        </group>
      );
  }
}

/* =========================================================
   CANVAS
========================================================= */

export default function ZAxisGalleryCanvas(
  props: ZAxisGalleryCanvasProps
) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{
          position: [
            0,
            0,
            CAMERA_Z,
          ],
          fov: 45,
          near: 0.1,
          far: 140,
        }}
        /*
         * Reduced maximum DPR.
         * This is important for mobile GPU performance.
         */
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
      >
        <GalleryScene
          {...props}
        />
      </Canvas>
    </div>
  );
}