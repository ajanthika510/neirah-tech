"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Palette,
  BrainCircuit,
  Cpu,
  Plane,
  Building2,
  Users,
  Truck,
  UtensilsCrossed,
  Car,
  Megaphone,
  Sparkles,
  ArrowUpRight,
  Zap,
  MousePointer2,
} from "lucide-react";

import { useMemo, useRef } from "react";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    number: "01",
    name: "Lantriva",
    category: "UI/UX & Digital Experience",
    description:
      "Designing memorable digital products, interfaces and experiences.",
    icon: Palette,
    accent: "#0EA5E9",
    gradient: ["#38BDF8", "#2563EB"],
    capabilities: [
      "UI/UX",
      "Product Design",
      "Web",
      "SaaS",
      "Design Systems",
    ],
  },

  {
    number: "02",
    name: "Neirah Lab",
    category: "AI, R&D & Automation",
    description:
      "Researching and building intelligent systems that automate complex work across industries.",
    icon: BrainCircuit,
    accent: "#6366F1",
    gradient: ["#818CF8", "#4F46E5"],
    capabilities: [
      "AI",
      "Agents",
      "Automation",
      "R&D",
      "Intelligent Systems",
    ],
  },

  {
    number: "03",
    name: "Neirah IoT",
    category: "IoT, Embedded & Smart Agriculture",
    description:
      "Connecting software with the physical world through intelligent devices and systems.",
    icon: Cpu,
    accent: "#06B6D4",
    gradient: ["#22D3EE", "#0891B2"],
    capabilities: [
      "IoT",
      "Embedded",
      "Agriculture",
      "Sensors",
      "Automation",
    ],
  },

  {
    number: "04",
    name: "Neirah Drone",
    category: "Drone Engineering & Intelligent Aerial Systems",
    description:
      "Designing and building drones for agriculture, monitoring, inspection and specialized applications.",
    icon: Plane,
    accent: "#2563EB",
    gradient: ["#60A5FA", "#1D4ED8"],
    capabilities: [
      "Drone",
      "Embedded",
      "Autonomous Systems",
      "AI",
      "Agriculture",
    ],
  },

  {
    number: "05",
    name: "Mugilix",
    category: "Business Operating System",
    description:
      "One connected platform for managing the core operations of modern businesses.",
    icon: Building2,
    accent: "#7C3AED",
    gradient: ["#A78BFA", "#6D28D9"],
    capabilities: [
      "CRM",
      "ERP",
      "HRM",
      "Payroll",
      "Operations",
      "Workflow",
    ],
  },

  {
    number: "06",
    name: "HRVio",
    category: "Human Intelligence",
    description:
      "Transforming workforce data into intelligent insights for better people and business decisions.",
    icon: Users,
    accent: "#0D9488",
    gradient: ["#2DD4BF", "#0F766E"],
    capabilities: [
      "HR Intelligence",
      "Analytics",
      "Performance",
      "Workforce Planning",
      "Automation",
    ],
  },

  {
    number: "07",
    name: "Pothify",
    category: "Delivery Management SaaS",
    description:
      "The technology infrastructure behind modern delivery businesses.",
    icon: Truck,
    accent: "#0284C7",
    gradient: ["#38BDF8", "#0369A1"],
    capabilities: [
      "Order Management",
      "Delivery",
      "Driver Management",
      "Dispatch",
      "Tracking",
      "Analytics",
    ],
  },

  {
    number: "08",
    name: "Tricobites",
    category: "Food Delivery Ecosystem",
    description:
      "A consumer-focused food delivery platform connecting customers, restaurants and delivery partners.",
    icon: UtensilsCrossed,
    accent: "#DB2777",
    gradient: ["#F472B6", "#BE185D"],
    capabilities: [
      "Food Ordering",
      "Restaurants",
      "Delivery",
      "Customers",
      "Partners",
    ],
  },

  {
    number: "09",
    name: "Rideya",
    category: "Mobility Ecosystem",
    description:
      "Connecting passengers, drivers and transportation businesses through intelligent mobility technology.",
    icon: Car,
    accent: "#F59E0B",
    gradient: ["#FBBF24", "#D97706"],
    capabilities: [
      "Ride Booking",
      "Drivers",
      "Fleet",
      "Tracking",
      "Payments",
      "Analytics",
    ],
  },

  {
    number: "10",
    name: "Neirah BrandOS",
    category: "Brand & Growth Infrastructure",
    description:
      "Helping businesses build their identity, communicate with customers and automate their digital presence.",
    icon: Megaphone,
    accent: "#EF4444",
    gradient: ["#FB7185", "#DC2626"],
    capabilities: [
      "Branding",
      "Storytelling",
      "Social Media",
      "WhatsApp",
      "SMS",
      "Content",
      "Marketing Automation",
    ],
  },
];

/* =========================================================
   BALLOON DIRECTIONS
========================================================= */

const balloonDirections = [
  {
    position: [-13, 4, -15],
    rotation: [0.12, -0.4, 0.18],
  },
  {
    position: [14, 5, -28],
    rotation: [-0.2, 0.5, -0.15],
  },
  {
    position: [-15, -4, -41],
    rotation: [0.2, -0.5, 0.25],
  },
  {
    position: [15, -3, -54],
    rotation: [-0.15, 0.45, -0.2],
  },
  {
    position: [-14, 5, -67],
    rotation: [0.15, -0.4, 0.2],
  },
  {
    position: [13, -5, -80],
    rotation: [-0.2, 0.45, -0.2],
  },
  {
    position: [-15, -2, -93],
    rotation: [0.2, -0.5, 0.2],
  },
  {
    position: [14, 4, -106],
    rotation: [-0.15, 0.4, -0.2],
  },
  {
    position: [-13, 5, -119],
    rotation: [0.2, -0.45, 0.2],
  },
  {
    position: [14, -4, -132],
    rotation: [-0.2, 0.45, -0.15],
  },
];

/* =========================================================
   COLORS
========================================================= */

const BALLOON_COLORS = [
  "#38BDF8",
  "#8B5CF6",
  "#22D3EE",
  "#3B82F6",
  "#A855F7",
  "#14B8A6",
  "#0EA5E9",
  "#EC4899",
  "#F59E0B",
  "#EF4444",
];

/* =========================================================
   BALLOON
========================================================= */

function Balloon({
  color,
  scale = 1,
}: {
  color: string;
  scale?: number;
}) {
  return (
    <group scale={scale}>
      <mesh scale={[1, 1.15, 1]}>
        <sphereGeometry args={[1, 48, 48]} />

        <meshPhysicalMaterial
          color={color}
          roughness={0.16}
          metalness={0.03}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.97}
        />
      </mesh>

      <mesh
        position={[-0.28, 0.45, 0.82]}
        scale={[0.25, 0.38, 0.08]}
      >
        <sphereGeometry args={[1, 24, 24]} />

        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh
        position={[0.35, -0.2, 0.82]}
        scale={[0.09, 0.18, 0.04]}
      >
        <sphereGeometry args={[1, 20, 20]} />

        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh
        position={[0, -1.17, 0]}
        rotation={[0, 0, Math.PI]}
      >
        <coneGeometry args={[0.16, 0.28, 8]} />

        <meshPhysicalMaterial
          color={color}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0, -1.9, 0]}>
        <cylinderGeometry
          args={[0.008, 0.008, 1.2, 8]}
        />

        <meshBasicMaterial
          color="#94A3B8"
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   BACKGROUND BALLOONS
========================================================= */

function FloatingBalloons({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);

  const balloons = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;

      return {
        position: [
          side * (8 + Math.random() * 11),
          -5 + Math.random() * 11,
          -6 - Math.random() * 145,
        ] as [number, number, number],

        scale: 0.3 + Math.random() * 0.55,

        color:
          BALLOON_COLORS[
            i % BALLOON_COLORS.length
          ],

        speed: 0.2 + Math.random() * 0.55,

        phase:
          Math.random() *
          Math.PI *
          2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const p = progress.get();

    group.current.position.z = p * 78;

    group.current.children.forEach(
      (child, index) => {
        const data = balloons[index];

        if (!data) return;

        child.position.y =
          data.position[1] +
          Math.sin(
            state.clock.elapsedTime *
              data.speed +
              data.phase
          ) *
            0.75;

        child.rotation.z =
          Math.sin(
            state.clock.elapsedTime *
              data.speed *
              0.7 +
              data.phase
          ) *
          0.12;
      }
    );
  });

  return (
    <group ref={group}>
      {balloons.map((balloon, index) => (
        <group
          key={index}
          position={balloon.position}
        >
          <Balloon
            color={balloon.color}
            scale={balloon.scale}
          />
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   TARGET BALLOON
========================================================= */

function TargetBalloon({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);

  const direction =
    balloonDirections[index];

  const totalStart = 0.07;
  const totalEnd = 0.94;

  const segment =
    (totalEnd - totalStart) /
    products.length;

  const start =
    totalStart +
    index * segment;

  const burst =
    start + segment * 0.48;

  const end =
    start + segment;

  useFrame((state) => {
    if (!group.current) return;

    const p = progress.get();

    const local =
      THREE.MathUtils.clamp(
        (p - start) /
          (end - start),
        0,
        1
      );

    if (
      p <
      start -
        segment * 0.15
    ) {
      group.current.visible = false;
      return;
    }

    group.current.visible = true;

    const approach =
      THREE.MathUtils.smoothstep(
        local,
        0,
        0.38
      );

    const x =
      THREE.MathUtils.lerp(
        direction.position[0],
        0,
        approach
      );

    const y =
      THREE.MathUtils.lerp(
        direction.position[1],
        0,
        approach
      );

    const z =
      THREE.MathUtils.lerp(
        direction.position[2],
        2.8,
        approach
      );

    group.current.position.set(
      x,
      y,
      z
    );

    group.current.position.x +=
      Math.sin(local * Math.PI) *
      direction.position[0] *
      0.12;

    group.current.position.y +=
      Math.sin(local * Math.PI) *
      0.7;

    const zoom =
      THREE.MathUtils.smoothstep(
        local,
        0.28,
        0.48
      );

    const balloonScale =
      1 + zoom * 14;

    group.current.scale.setScalar(
      balloonScale
    );

    group.current.rotation.x =
      direction.rotation[0] +
      Math.sin(
        state.clock.elapsedTime * 1.1
      ) *
        0.06;

    group.current.rotation.y =
      direction.rotation[1] +
      Math.sin(
        state.clock.elapsedTime * 0.8
      ) *
        0.08;

    group.current.rotation.z =
      direction.rotation[2];

    if (p > burst) {
      group.current.visible = false;
    }
  });

  return (
    <group ref={group}>
      <Balloon
        color={
          BALLOON_COLORS[
            index %
              BALLOON_COLORS.length
          ]
        }
      />
    </group>
  );
}

/* =========================================================
   BURST PARTICLES
========================================================= */

function BalloonBurst({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const points =
    useRef<THREE.Points>(null);

  const direction =
    balloonDirections[index];

  const totalStart = 0.07;
  const totalEnd = 0.94;

  const segment =
    (totalEnd - totalStart) /
    products.length;

  const start =
    totalStart +
    index * segment;

  const burstStart =
    start + segment * 0.46;

  const burstEnd =
    start + segment * 0.62;

  const particleData = useMemo(() => {
    const count = 220;

    const positions =
      new Float32Array(
        count * 3
      );

    const velocities =
      new Float32Array(
        count * 3
      );

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const theta =
        Math.random() *
        Math.PI *
        2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      const speed =
        1.5 +
        Math.random() * 5.5;

      velocities[i3] =
        Math.sin(phi) *
        Math.cos(theta) *
        speed;

      velocities[i3 + 1] =
        Math.sin(phi) *
        Math.sin(theta) *
        speed;

      velocities[i3 + 2] =
        Math.cos(phi) *
        speed;

      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
    }

    return {
      positions,
      velocities,
    };
  }, []);

  useFrame(() => {
    if (!points.current) return;

    const p = progress.get();

    const local =
      THREE.MathUtils.clamp(
        (p - burstStart) /
          (burstEnd - burstStart),
        0,
        1
      );

    points.current.position.set(
      THREE.MathUtils.lerp(
        direction.position[0],
        0,
        0.96
      ),
      THREE.MathUtils.lerp(
        direction.position[1],
        0,
        0.96
      ),
      THREE.MathUtils.lerp(
        direction.position[2],
        1.5,
        0.96
      )
    );

    const array =
      points.current.geometry.attributes
        .position.array as Float32Array;

    for (
      let i = 0;
      i <
      particleData.positions.length / 3;
      i++
    ) {
      const i3 = i * 3;

      array[i3] =
        particleData.velocities[i3] *
        local;

      array[i3 + 1] =
        particleData.velocities[i3 + 1] *
        local;

      array[i3 + 2] =
        particleData.velocities[i3 + 2] *
        local;
    }

    points.current.geometry.attributes
      .position.needsUpdate = true;

    /*
     * FIX:
     * React Three Fiber types `material`
     * as THREE.Material.
     *
     * We know this is a PointsMaterial
     * because <pointsMaterial /> is used below.
     */

    const material =
      points.current.material as THREE.PointsMaterial;

    material.opacity =
      local < 0.22
        ? local * 5
        : Math.max(
            0,
            1 -
              (local - 0.22) * 1.2
          );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            particleData.positions,
            3,
          ]}
          count={
            particleData.positions.length / 3
          }
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={
          BALLOON_COLORS[
            index %
              BALLOON_COLORS.length
          ]
        }
        size={0.08}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   CAMERA
========================================================= */

function ExperienceCamera({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    const p = progress.get();

    const totalStart = 0.07;
    const totalEnd = 0.94;

    const segment =
      (totalEnd - totalStart) /
      products.length;

    let activeIndex = Math.floor(
      (p - totalStart) /
        segment
    );

    activeIndex =
      THREE.MathUtils.clamp(
        activeIndex,
        0,
        products.length - 1
      );

    const segmentStart =
      totalStart +
      activeIndex * segment;

    const local =
      THREE.MathUtils.clamp(
        (p - segmentStart) /
          segment,
        0,
        1
      );

    const direction =
      balloonDirections[
        activeIndex
      ];

    const approach =
      THREE.MathUtils.smoothstep(
        local,
        0.02,
        0.34
      );

    const sideAmount =
      1 - approach;

    let cameraX =
      THREE.MathUtils.lerp(
        0,
        direction.position[0],
        sideAmount
      );

    let cameraY =
      THREE.MathUtils.lerp(
        0,
        direction.position[1],
        sideAmount
      );

    let cameraZ =
      THREE.MathUtils.lerp(
        4.5,
        direction.position[2],
        sideAmount
      );

    const zoom =
      THREE.MathUtils.smoothstep(
        local,
        0.25,
        0.49
      );

    cameraX =
      THREE.MathUtils.lerp(
        cameraX,
        0,
        zoom
      );

    cameraY =
      THREE.MathUtils.lerp(
        cameraY,
        0,
        zoom
      );

    cameraZ =
      THREE.MathUtils.lerp(
        cameraZ,
        1.65,
        zoom
      );

    camera.position.x +=
      (cameraX -
        camera.position.x) *
      0.055;

    camera.position.y +=
      (cameraY -
        camera.position.y) *
      0.055;

    camera.position.z +=
      (cameraZ -
        camera.position.z) *
      0.055;

    const roll =
      Math.sin(local * Math.PI) *
      (direction.position[0] > 0
        ? -0.065
        : 0.065);

    camera.rotation.z +=
      (roll -
        camera.rotation.z) *
      0.045;

    const lookX =
      THREE.MathUtils.lerp(
        direction.position[0] *
          0.012,
        0,
        zoom
      );

    const lookY =
      THREE.MathUtils.lerp(
        direction.position[1] *
          0.012,
        0,
        zoom
      );

    camera.rotation.y +=
      (lookX -
        camera.rotation.y) *
      0.03;

    camera.rotation.x +=
      (lookY -
        camera.rotation.x) *
      0.03;

    camera.position.x +=
      Math.sin(
        state.clock.elapsedTime *
          0.35
      ) *
      0.002;

    camera.position.y +=
      Math.cos(
        state.clock.elapsedTime *
          0.4
      ) *
      0.002;
  });

  return null;
}

/* =========================================================
   AMBIENT PARTICLES
========================================================= */

function AmbientParticles({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const ref =
    useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1400;

    const array =
      new Float32Array(
        count * 3
      );

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const i3 = i * 3;

      array[i3] =
        (Math.random() - 0.5) *
        48;

      array[i3 + 1] =
        (Math.random() - 0.5) *
        32;

      array[i3 + 2] =
        -Math.random() * 150;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.z =
      progress.get() * 78;

    ref.current.rotation.z =
      state.clock.elapsedTime *
      0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            positions,
            3,
          ]}
          count={
            positions.length / 3
          }
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#38BDF8"
        size={0.032}
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   LIGHT STREAKS
========================================================= */

function LightStreaks({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const group =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.position.z =
      progress.get() * 78;

    group.current.rotation.z =
      state.clock.elapsedTime *
      0.01;
  });

  return (
    <group ref={group}>
      {Array.from(
        { length: 16 },
        (_, i) => {
          const angle =
            (i / 16) *
            Math.PI *
            2;

          const radius =
            8 +
            (i % 4) * 3;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) *
                  radius,
                Math.sin(angle) *
                  radius,
                -20 -
                  i * 8,
              ]}
              rotation={[
                0,
                0,
                angle,
              ]}
            >
              <boxGeometry
                args={[
                  0.025,
                  5 +
                    (i % 3) * 3,
                  0.025,
                ]}
              />

              <meshBasicMaterial
                color={
                  i % 2 === 0
                    ? "#38BDF8"
                    : "#818CF8"
                }
                transparent
                opacity={0.12}
              />
            </mesh>
          );
        }
      )}
    </group>
  );
}

/* =========================================================
   THREE WORLD
========================================================= */

function BalloonWorld({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <>
      <ExperienceCamera
        progress={progress}
      />

      <FloatingBalloons
        progress={progress}
      />

      <LightStreaks
        progress={progress}
      />

      {products.map((_, index) => (
        <TargetBalloon
          key={`balloon-${index}`}
          index={index}
          progress={progress}
        />
      ))}

      {products.map((_, index) => (
        <BalloonBurst
          key={`burst-${index}`}
          index={index}
          progress={progress}
        />
      ))}

      <AmbientParticles
        progress={progress}
      />

      <ambientLight intensity={1.1} />

      <directionalLight
        position={[5, 8, 10]}
        intensity={2.4}
      />

      <pointLight
        position={[0, 0, 5]}
        intensity={8}
        distance={30}
        color="#38BDF8"
      />
    </>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function Background() {
  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-[#F5F8FC]
      "
    >
      {/* Main ecosystem atmosphere */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(56,189,248,0.14) 0%, rgba(99,102,241,0.075) 24%, rgba(255,255,255,0.78) 48%, #F5F8FC 82%)",
        }}
      />

      {/* Blue atmosphere */}

      <motion.div
        className="
          absolute
          -left-[18vw]
          top-[5vh]
          h-[65vh]
          w-[65vh]
          rounded-full
          bg-sky-300/10
          blur-[150px]
        "
        animate={{
          x: [0, 100, 0],
          y: [0, 45, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Indigo atmosphere */}

      <motion.div
        className="
          absolute
          -right-[18vw]
          bottom-[0]
          h-[65vh]
          w-[65vh]
          rounded-full
          bg-indigo-300/10
          blur-[160px]
        "
        animate={{
          x: [0, -90, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan atmosphere */}

      <motion.div
        className="
          absolute
          left-[25%]
          top-[30%]
          h-[35vh]
          w-[35vh]
          rounded-full
          bg-cyan-300/10
          blur-[130px]
        "
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Technical grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.45) 1px, transparent 1px)",
          backgroundSize:
            "70px 70px",
        }}
      />

      {/* Fine center halo */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(226,232,240,0.25) 72%, rgba(226,232,240,0.42) 100%)",
        }}
      />

      {/* Center glow */}

      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          h-[34vh]
          w-[34vh]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-sky-300/10
          blur-[110px]
        "
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* =========================================================
   INTRO
========================================================= */

function Intro({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity =
    useTransform(
      progress,
      [0, 0.035, 0.07],
      [1, 1, 0]
    );

  const scale =
    useTransform(
      progress,
      [0, 0.065],
      [1, 1.06]
    );

  const y =
    useTransform(
      progress,
      [0, 0.07],
      [0, -50]
    );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        px-6
        text-center
      "
      style={{
        opacity,
        scale,
        y,
      }}
    >
      <div>
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-sky-300" />

          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-slate-400">
            NEIRAH / ECOSYSTEM
          </span>

          <span className="h-px w-10 bg-sky-300" />
        </div>

        <h2
          className="
            text-5xl
            font-semibold
            leading-[0.88]
            tracking-[-0.075em]
            text-slate-900
            md:text-7xl
            lg:text-[8rem]
          "
        >
          ENTER

          <span
            className="
              block
              bg-gradient-to-r
              from-sky-500
              via-blue-600
              to-indigo-600
              bg-clip-text
              text-transparent
            "
          >
            THE ECOSYSTEM.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-slate-500">
          Follow the light.
          <br />
          Each world reveals a new
          Neirah system.
        </p>

        <motion.div
          className="
            mx-auto
            mt-9
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-slate-200/80
            bg-white/70
            px-5
            py-3
            shadow-[0_15px_50px_rgba(15,23,42,0.08)]
            backdrop-blur-xl
          "
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <MousePointer2 className="h-3 w-3 text-sky-500" />

          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-500">
            Scroll to enter
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  index,
  progress,
}: {
  product: (typeof products)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = product.icon;

  const totalStart = 0.07;
  const totalEnd = 0.94;

  const segment =
    (totalEnd - totalStart) /
    products.length;

  const start =
    totalStart +
    index * segment;

  const burst =
    start + segment * 0.48;

  const hold =
    start + segment * 0.73;

  const end =
    start + segment;

  const opacity =
    useTransform(
      progress,
      [
        start + segment * 0.45,
        burst,
        hold,
        end,
      ],
      [0, 1, 1, 0]
    );

  const scale =
    useTransform(
      progress,
      [
        burst,
        burst + segment * 0.07,
        hold,
        end,
      ],
      [0.72, 1, 1, 0.9]
    );

  const y =
    useTransform(
      progress,
      [
        burst,
        burst + segment * 0.07,
        end,
      ],
      [90, 0, -55]
    );

  const rotateX =
    useTransform(
      progress,
      [
        burst,
        burst + segment * 0.08,
      ],
      [8, 0]
    );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-[90]
        w-[min(900px,92vw)]
        -translate-x-1/2
        -translate-y-1/2
      "
      style={{
        opacity,
        scale,
        y,
        rotateX,
      }}
    >
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[150px]
        "
        style={{
          backgroundColor:
            product.accent,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-white/80
          bg-white/88
          p-7
          shadow-[0_40px_120px_rgba(15,23,42,0.15)]
          backdrop-blur-2xl
          md:p-12
        "
      >
        <div
          className="absolute left-0 top-0 h-[3px] w-64"
          style={{
            background: `linear-gradient(90deg, ${product.gradient[0]}, ${product.gradient[1]}, transparent)`,
          }}
        />

        <div
          className="absolute right-0 top-0 h-40 w-40 rounded-full blur-[80px]"
          style={{
            backgroundColor:
              product.accent,
            opacity: 0.08,
          }}
        />

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs tracking-[0.35em]"
              style={{
                color:
                  product.accent,
              }}
            >
              {product.number}
            </span>

            <span className="h-px w-12 bg-slate-200" />

            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-slate-400">
              SYSTEM REVEALED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  product.accent,
                boxShadow: `0 0 14px ${product.accent}`,
              }}
            />

            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
              ONLINE
            </span>
          </div>
        </div>

        <motion.div
          className="
            mb-7
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-[0_15px_40px_rgba(15,23,42,0.08)]
          "
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon
            className="h-7 w-7"
            style={{
              color:
                product.accent,
            }}
          />
        </motion.div>

        <h3
          className="
            text-5xl
            font-semibold
            leading-[0.88]
            tracking-[-0.075em]
            text-slate-900
            md:text-7xl
            lg:text-8xl
          "
        >
          {product.name}
        </h3>

        <p
          className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] md:text-xs"
          style={{
            color:
              product.accent,
          }}
        >
          {product.category}
        </p>

        <div className="my-7 h-px bg-slate-200" />

        <p className="max-w-2xl text-sm leading-7 text-slate-500 md:text-base md:leading-8">
          {product.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
          {product.capabilities.map(
            (capability) => (
              <span
                key={capability}
                className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400"
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{
                    backgroundColor:
                      product.accent,
                  }}
                />

                {capability}
              </span>
            )
          )}
        </div>

        <div className="mt-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles
              className="h-3.5 w-3.5"
              style={{
                color:
                  product.accent,
              }}
            />

            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-400">
              NEIRAH ECOSYSTEM
            </span>
          </div>

          <motion.div
            animate={{
              x: [0, 4, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          >
            <ArrowUpRight
              className="h-5 w-5"
              style={{
                color:
                  product.accent,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PROGRESS BAR
========================================================= */

function ProgressBar({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const width =
    useTransform(
      progress,
      [0, 1],
      ["0%", "100%"]
    );

  const activeNumber =
    useTransform(
      progress,
      [0, 0.94],
      [1, 10]
    );

  return (
    <div className="pointer-events-none absolute bottom-7 left-1/2 z-[200] flex w-[min(600px,78vw)] -translate-x-1/2 items-center gap-4">
      <span className="font-mono text-[8px] text-slate-400">
        01
      </span>

      <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-slate-200/80">
        <motion.div
          className="
            absolute
            inset-y-0
            left-0
            rounded-full
            bg-gradient-to-r
            from-sky-400
            via-blue-500
            to-indigo-500
          "
          style={{
            width,
          }}
        />
      </div>

      <motion.span className="min-w-[18px] text-right font-mono text-[8px] text-slate-400">
        {activeNumber}
      </motion.span>
    </div>
  );
}

/* =========================================================
   PRODUCT COUNTER
========================================================= */

function ProductCounter({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const current =
    useTransform(
      progress,
      (value) => {
        if (value < 0.07) return "00";

        const segment =
          (0.94 - 0.07) /
          products.length;

        const index = Math.min(
          products.length - 1,
          Math.max(
            0,
            Math.floor(
              (value - 0.07) /
                segment
            )
          )
        );

        return String(
          index + 1
        ).padStart(2, "0");
      }
    );

  return (
    <div className="pointer-events-none absolute bottom-24 right-6 z-[180] hidden md:block">
      <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-400">
        SYSTEM
      </div>

      <motion.div className="mt-1 font-mono text-xl font-medium text-slate-700">
        {current}
      </motion.div>

      <div className="mt-1 font-mono text-[7px] text-slate-300">
        / 10
      </div>
    </div>
  );
}

/* =========================================================
   FINAL SCENE
========================================================= */

function FinalScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity =
    useTransform(
      progress,
      [0.91, 0.96, 1],
      [0, 1, 1]
    );

  const scale =
    useTransform(
      progress,
      [0.91, 1],
      [0.72, 1]
    );

  const y =
    useTransform(
      progress,
      [0.91, 1],
      [70, 0]
    );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[110]
        flex
        items-center
        justify-center
        px-6
        text-center
      "
      style={{
        opacity,
        scale,
        y,
      }}
    >
      <div>
        <div className="mb-7 flex items-center justify-center gap-3">
          <Sparkles className="h-4 w-4 text-sky-500" />

          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-slate-400">
            ECOSYSTEM COMPLETE
          </span>

          <Sparkles className="h-4 w-4 text-indigo-500" />
        </div>

        <h2
          className="
            text-6xl
            font-semibold
            leading-[0.85]
            tracking-[-0.08em]
            text-slate-900
            md:text-8xl
            lg:text-[9rem]
          "
        >
          ONE

          <span
            className="
              block
              bg-gradient-to-r
              from-sky-500
              via-blue-600
              to-indigo-600
              bg-clip-text
              text-transparent
            "
          >
            ECOSYSTEM.
          </span>
        </h2>

        <p className="mt-7 text-sm leading-7 text-slate-500">
          Ten products.
          <br />
          One connected vision.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-xl">
          <Zap className="h-3.5 w-3.5 text-sky-500" />

          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-400">
            NEIRAH / 2026
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function FeaturedProjects() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 55,
        damping: 28,
        mass: 0.22,
      }
    );

  const stageOpacity =
    useTransform(
      progress,
      [0, 0.01, 0.985, 1],
      [0, 1, 1, 0]
    );

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="
        relative
        h-[1550vh]
        overflow-hidden
        bg-[#F5F8FC]
        border-none
      "
      style={{
        borderTop: "0",
        borderBottom: "0",
      }}
    >
      <motion.div
        className="
          fixed
          inset-0
          z-20
          overflow-hidden
        "
        style={{
          opacity:
            stageOpacity,
        }}
      >
        {/* BACKGROUND */}

        <Background />

        {/* 3D WORLD */}

        <Canvas
          camera={{
            position: [0, 0, 4.5],
            fov: 52,
            near: 0.1,
            far: 220,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              "high-performance",
          }}
        >
          <BalloonWorld
            progress={progress}
          />
        </Canvas>

        {/* INTRO */}

        <Intro
          progress={progress}
        />

        {/* PRODUCT CARDS */}

        {products.map(
          (product, index) => (
            <ProductCard
              key={product.number}
              product={product}
              index={index}
              progress={progress}
            />
          )
        )}

        {/* FINAL */}

        <FinalScene
          progress={progress}
        />

        {/* TOP LEFT HUD */}

        <div className="pointer-events-none absolute left-6 top-6 z-[180] md:left-8 md:top-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />

            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-slate-400">
              NEIRAH / ECOSYSTEM
            </span>
          </div>

          <div className="mt-2 font-mono text-[7px] text-slate-300">
            BALLOON_SEQUENCE / ACTIVE
          </div>
        </div>

        {/* TOP RIGHT STATUS */}

        <div className="pointer-events-none absolute right-6 top-6 z-[180] text-right md:right-8 md:top-8">
          <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
            SYSTEM STATUS
          </div>

          <div className="mt-2 flex items-center justify-end gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />

            <span className="font-mono text-[8px] text-emerald-500">
              ACTIVE
            </span>
          </div>
        </div>

        {/* CENTER CROSSHAIR */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[160] hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <div className="relative h-10 w-10">
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-slate-300/60" />

            <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-slate-300/60" />

            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-slate-300/60" />

            <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-slate-300/60" />

            <motion.span
              className="
                absolute
                left-1/2
                top-1/2
                h-1.5
                w-1.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-sky-400
              "
              animate={{
                scale: [1, 1.8, 1],
                opacity: [
                  0.45,
                  1,
                  0.45,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </div>

        {/* PRODUCT COUNTER */}

        <ProductCounter
          progress={progress}
        />

        {/* PROGRESS */}

        <ProgressBar
          progress={progress}
        />

        {/* TOP FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[170]
            h-32
          "
          style={{
            background:
              "linear-gradient(to bottom, #F5F8FC 0%, rgba(245,248,252,0.72) 45%, transparent 100%)",
          }}
        />

        {/* BOTTOM FADE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[170]
            h-36
          "
          style={{
            background:
              "linear-gradient(to top, #F5F8FC 0%, rgba(245,248,252,0.72) 45%, transparent 100%)",
          }}
        />

        {/* CENTER VIGNETTE */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[145]
          "
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(15,23,42,0.025) 100%)",
          }}
        />

        {/* SCANLINES */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[155]
            opacity-[0.012]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.4) 1px, transparent 1px)",
            backgroundSize:
              "100% 5px",
          }}
        />

        {/* EDGE LIGHTS */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-0
            top-1/2
            z-[150]
            h-[30vh]
            w-px
            -translate-y-1/2
            bg-gradient-to-b
            from-transparent
            via-sky-300/40
            to-transparent
          "
          animate={{
            opacity: [
              0.2,
              0.6,
              0.2,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="
            pointer-events-none
            absolute
            right-0
            top-1/2
            z-[150]
            h-[30vh]
            w-px
            -translate-y-1/2
            bg-gradient-to-b
            from-transparent
            via-indigo-300/40
            to-transparent
          "
          animate={{
            opacity: [
              0.2,
              0.6,
              0.2,
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </section>
  );
}