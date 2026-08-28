"use client";

import { useMemo, useRef } from "react";

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
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Cpu,
  FlaskConical,
  Sparkles,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    number: "01",
    title: "Business Website",
    subtitle: "Build Trust Online",
    description:
      "Create a modern website that attracts customers and helps your business grow 24/7.",
    tag: "WEB DESIGN & DEVELOPMENT",
    icon: Globe,
    capabilities: [
      "Professional Design",
      "Google Friendly",
      "Fast Loading",
      "Mobile Responsive",
    ],
  },
  {
    number: "02",
    title: "Mobile Apps",
    subtitle: "Stay Connected",
    description:
      "Allow your customers to access your services anytime from their phones.",
    tag: "MOBILE EXPERIENCE",
    icon: Smartphone,
    capabilities: [
      "Android & iOS",
      "iPhone & iPad",
      "Push Notifications",
      "Easy Updates",
    ],
  },
  {
    number: "03",
    title: "AI Assistant",
    subtitle: "Save Time",
    description:
      "Automate repetitive tasks and answer customer questions instantly.",
    tag: "INTELLIGENT AUTOMATION",
    icon: Bot,
    capabilities: [
      "24/7 Support",
      "AI Chatbot",
      "Workflow Automation",
      "WhatsApp Integration",
    ],
  },
  {
    number: "04",
    title: "Digital Marketing",
    subtitle: "Reach More Customers",
    description:
      "Increase visibility and attract more customers through online marketing.",
    tag: "GROWTH & VISIBILITY",
    icon: TrendingUp,
    capabilities: [
      "Search Engine Optimization",
      "Facebook Ads",
      "Google Ads",
      "Brand Awareness",
    ],
  },
  {
    number: "05",
    title: "Business Software",
    subtitle: "Manage Everything",
    description:
      "Track sales, inventory, customers and reports in one place.",
    tag: "ENTERPRISE SOFTWARE",
    icon: BarChart3,
    capabilities: [
      "Sales & Invoicing",
      "Inventory Management",
      "CRM & Customers",
      "Analytics & Reports",
    ],
  },
  {
    number: "06",
    title: "Consulting",
    subtitle: "Expert Guidance",
    description:
      "Choose the right technology based on your business goals.",
    tag: "STRATEGY & ADVISORY",
    icon: ShieldCheck,
    capabilities: [
      "Strategic Planning",
      "Tech Roadmap",
      "Team Training",
      "Ongoing Support",
    ],
  },
  {
    number: "07",
    title: "Smart Devices & IoT",
    subtitle: "Connect the Physical World",
    description:
      "Sensors, drones and smart devices that bring automation to farms, sites and operations.",
    tag: "IOT & EMERGING TECH",
    icon: Cpu,
    capabilities: [
      "IoT Sensors",
      "Drone Monitoring",
      "Smart Agriculture",
      "Real-Time Telemetry",
    ],
  },
  {
    number: "08",
    title: "Innovation Lab",
    subtitle: "Built for What's Next",
    description:
      "We research and prototype emerging technology so your business stays ahead.",
    tag: "RESEARCH & DEVELOPMENT",
    icon: FlaskConical,
    capabilities: [
      "R&D Prototyping",
      "Rapid MVP Builds",
      "AI Research",
      "Future Tech Exploration",
    ],
  },
];

/* =========================================================
   HERO / PROJECT COLOR SYSTEM
========================================================= */

const COLORS = {
  white: "#FFFFFF",
  soft: "#F8FBFF",
  skySoft: "#E0F2FE",
  cyanSoft: "#CFFAFE",

  cyan: "#22D3EE",
  sky: "#0EA5E9",
  blue: "#2563EB",
  indigo: "#4F46E5",

  dark: "#0F172A",
  slate: "#334155",
  muted: "#64748B",
};

/* =========================================================
   ORGANIC ROOT TUNNEL
========================================================= */

function OrganicTunnel({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);

  /* =======================================================
     MAIN ORGANIC ROOT
  ======================================================= */

  const mainCurve = useMemo(() => {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= 100; i++) {
      const t = i / 100;

      const z = -t * 70;

      const x =
        Math.sin(t * Math.PI * 2.1) * 3.2 +
        Math.sin(t * Math.PI * 5.5) * 1.1;

      const y =
        Math.cos(t * Math.PI * 1.6) * 2.3 +
        Math.sin(t * Math.PI * 4) * 0.8;

      points.push(
        new THREE.Vector3(x, y, z)
      );
    }

    return new THREE.CatmullRomCurve3(
      points,
      false,
      "catmullrom",
      0.7
    );
  }, []);

  /* =======================================================
     ORGANIC BRANCHES
  ======================================================= */

  const branchCurves = useMemo(() => {
    const curves: THREE.CatmullRomCurve3[] = [];

    for (let branch = 0; branch < 22; branch++) {
      const points: THREE.Vector3[] = [];

      const side =
        branch % 2 === 0 ? 1 : -1;

      const startZ =
        -branch * 3.1;

      const startX =
        side *
        (4.5 + (branch % 4) * 1.25);

      const startY =
        ((branch % 5) - 2) * 1.25;

      for (let i = 0; i <= 30; i++) {
        const t = i / 30;

        const z =
          startZ -
          t *
            (8 +
              (branch % 3) * 3.5);

        const x =
          startX +
          side *
            Math.sin(t * Math.PI) *
            (4.5 + branch * 0.13) +
          Math.sin(
            t * 8 + branch
          ) *
            0.75;

        const y =
          startY +
          Math.cos(
            t * Math.PI * 1.5 +
              branch
          ) *
            1.5 *
            t;

        points.push(
          new THREE.Vector3(
            x,
            y,
            z
          )
        );
      }

      curves.push(
        new THREE.CatmullRomCurve3(
          points,
          false,
          "catmullrom",
          0.8
        )
      );
    }

    return curves;
  }, []);

  /* =======================================================
     LARGE FLOWING ROOT LOOPS
  ======================================================= */

  const flowingCurves = useMemo(() => {
    const curves: THREE.CatmullRomCurve3[] = [];

    for (let i = 0; i < 12; i++) {
      const points: THREE.Vector3[] = [];

      for (let p = 0; p <= 70; p++) {
        const t = p / 70;

        const z = -t * 75;

        const radius =
          7 +
          Math.sin(
            t * Math.PI * 3 + i
          ) *
            2;

        const angle =
          t * Math.PI * 2.8 +
          i * 0.52;

        const x =
          Math.cos(angle) *
          radius;

        const y =
          Math.sin(angle) *
          radius *
          0.65;

        points.push(
          new THREE.Vector3(
            x,
            y,
            z
          )
        );
      }

      curves.push(
        new THREE.CatmullRomCurve3(
          points,
          false,
          "catmullrom",
          0.7
        )
      );
    }

    return curves;
  }, []);

  /* =======================================================
     ANIMATION
  ======================================================= */

  useFrame(() => {
    if (!group.current) return;

    const p = progress.get();

    group.current.rotation.z =
      Math.sin(
        p * Math.PI * 2
      ) * 0.12;

    group.current.rotation.x =
      Math.cos(
        p * Math.PI * 1.5
      ) * 0.07;

    group.current.rotation.y =
      Math.sin(
        p * Math.PI * 1.3
      ) * 0.08;
  });

  return (
    <group ref={group}>

      {/* =================================================
          MAIN DARK ROOT
      ================================================= */}

      <mesh>
        <tubeGeometry
          args={[
            mainCurve,
            200,
            0.075,
            8,
            false,
          ]}
        />

        <meshBasicMaterial
          color={COLORS.dark}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* =================================================
          MAIN BLUE GLOW
      ================================================= */}

      <mesh>
        <tubeGeometry
          args={[
            mainCurve,
            200,
            0.25,
            8,
            false,
          ]}
        />

        <meshBasicMaterial
          color={COLORS.sky}
          transparent
          opacity={0.07}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      {/* =================================================
          ROOT BRANCHES
      ================================================= */}

      {branchCurves.map(
        (curve, index) => {

          const color =
            index % 4 === 0
              ? COLORS.dark
              : index % 4 === 1
              ? COLORS.sky
              : index % 4 === 2
              ? COLORS.cyan
              : COLORS.indigo;

          return (
            <group
              key={`branch-${index}`}
            >

              {/* CORE LINE */}

              <mesh>
                <tubeGeometry
                  args={[
                    curve,
                    80,
                    0.025 +
                      (index % 3) *
                        0.015,
                    6,
                    false,
                  ]}
                />

                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={
                    index % 4 === 0
                      ? 0.58
                      : 0.45
                  }
                />
              </mesh>

              {/* SOFT GLOW */}

              <mesh>
                <tubeGeometry
                  args={[
                    curve,
                    80,
                    0.14,
                    6,
                    false,
                  ]}
                />

                <meshBasicMaterial
                  color={
                    index % 2 === 0
                      ? COLORS.sky
                      : COLORS.cyan
                  }
                  transparent
                  opacity={0.045}
                  blending={
                    THREE.AdditiveBlending
                  }
                  depthWrite={false}
                />
              </mesh>

            </group>
          );
        }
      )}

      {/* =================================================
          LARGE ORGANIC RINGS
      ================================================= */}

      {flowingCurves.map(
        (curve, index) => (
          <mesh
            key={`flow-${index}`}
          >
            <tubeGeometry
              args={[
                curve,
                150,
                0.022 +
                  (index % 2) *
                    0.018,
                6,
                false,
              ]}
            />

            <meshBasicMaterial
              color={
                index % 3 === 0
                  ? COLORS.dark
                  : index % 3 === 1
                  ? COLORS.sky
                  : COLORS.indigo
              }
              transparent
              opacity={
                index % 3 === 0
                  ? 0.18
                  : 0.22
              }
            />
          </mesh>
        )
      )}

      {/* =================================================
          DEEP CORE
      ================================================= */}

      <mesh
        position={[
          0,
          0,
          -67,
        ]}
      >
        <sphereGeometry
          args={[1.1, 32, 32]}
        />

        <meshBasicMaterial
          color={COLORS.indigo}
        />
      </mesh>

      <mesh
        position={[
          0,
          0,
          -67,
        ]}
      >
        <sphereGeometry
          args={[3.4, 32, 32]}
        />

        <meshBasicMaterial
          color={COLORS.sky}
          transparent
          opacity={0.07}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}

/* =========================================================
   GLOWING BLOBS
========================================================= */

function TunnelBlobs({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const group =
    useRef<THREE.Group>(null);

  const blobs = useMemo(() => {
    return Array.from(
      { length: 38 },
      (_, i) => ({
        x:
          Math.sin(i * 1.91) *
            10 +
          Math.cos(i * 0.7) *
            3,

        y:
          Math.cos(i * 1.37) *
            7 +
          Math.sin(i * 0.4) *
            2,

        z:
          -4 -
          i * 2.15,

        scale:
          0.12 +
          (i % 5) *
            0.07,
      })
    );
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const p = progress.get();

    group.current.rotation.z =
      state.clock.elapsedTime *
      0.03;

    group.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime *
          0.15
      ) * 0.1;

    group.current.position.z =
      p * 16;
  });

  return (
    <group ref={group}>
      {blobs.map(
        (blob, index) => (
          <mesh
            key={index}
            position={[
              blob.x,
              blob.y,
              blob.z,
            ]}
            scale={blob.scale}
          >
            <sphereGeometry
              args={[1, 16, 16]}
            />

            <meshBasicMaterial
              color={
                index % 4 === 0
                  ? COLORS.indigo
                  : index % 4 === 1
                  ? COLORS.blue
                  : index % 4 === 2
                  ? COLORS.sky
                  : COLORS.cyan
              }
              transparent
              opacity={0.45}
              blending={
                THREE.AdditiveBlending
              }
              depthWrite={false}
            />
          </mesh>
        )
      )}
    </group>
  );
}

/* =========================================================
   PARTICLE FIELD
========================================================= */

function TunnelParticles({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const pointsRef =
    useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array =
      new Float32Array(
        1700 * 3
      );

    for (
      let i = 0;
      i < 1700;
      i++
    ) {
      const i3 = i * 3;

      const angle =
        Math.random() *
        Math.PI *
        2;

      const radius =
        4 +
        Math.random() * 18;

      array[i3] =
        Math.cos(angle) *
        radius;

      array[i3 + 1] =
        Math.sin(angle) *
        radius *
        0.7;

      array[i3 + 2] =
        -Math.random() *
        85;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current)
      return;

    const p = progress.get();

    pointsRef.current.rotation.z =
      state.clock.elapsedTime *
      0.012;

    pointsRef.current.position.z =
      p * 28;
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
          count={
            positions.length / 3
          }
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={COLORS.sky}
        size={0.045}
        transparent
        opacity={0.5}
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
   3D TUNNEL WORLD
========================================================= */

function TunnelScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const { camera } =
    useThree();

  useFrame(() => {
    const p = progress.get();

    const targetZ =
      4 -
      p * 65;

    const targetX =
      Math.sin(
        p * Math.PI * 2
      ) * 2.2;

    const targetY =
      Math.cos(
        p * Math.PI * 1.5
      ) * 1.5;

    camera.position.x +=
      (targetX -
        camera.position.x) *
      0.035;

    camera.position.y +=
      (targetY -
        camera.position.y) *
      0.035;

    camera.position.z +=
      (targetZ -
        camera.position.z) *
      0.035;

    camera.rotation.z +=
      (
        Math.sin(
          p * Math.PI * 2
        ) *
          0.045 -
        camera.rotation.z
      ) * 0.03;

    camera.rotation.y +=
      (
        Math.sin(
          p * Math.PI * 1.6
        ) *
          0.04 -
        camera.rotation.y
      ) * 0.03;
  });

  return (
    <>
      <OrganicTunnel
        progress={progress}
      />

      <TunnelBlobs
        progress={progress}
      />

      <TunnelParticles
        progress={progress}
      />

      <ambientLight
        intensity={0.25}
      />
    </>
  );
}

/* =========================================================
   SERVICE CONTENT
========================================================= */

function ServiceExperience({
  service,
  index,
  progress,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = service.icon;

  const serviceAreaStart = 0.075;
  const serviceAreaEnd = 0.96;

  const serviceArea = serviceAreaEnd - serviceAreaStart;
  const segment = serviceArea / services.length; // ~0.11 per service

  const start = serviceAreaStart + index * segment;
  const end = start + segment;

  // Smooth entrance over first 22% of segment, full visibility for 56%, smooth exit over final 22%
  const enterEnd = start + segment * 0.22;
  const exitStart = start + segment * 0.78;

  // For the final service (08. Innovation Lab), hold visibility through the end of the section
  const actualExitStart = index === services.length - 1 ? 0.94 : exitStart;
  const actualEnd = index === services.length - 1 ? 0.98 : end;

  const isLeft = index % 2 === 0;

  const x = useTransform(
    progress,
    [start, enterEnd, actualExitStart, actualEnd],
    [isLeft ? -40 : 40, 0, 0, isLeft ? -40 : 40]
  );

  const opacity = useTransform(
    progress,
    [start, enterEnd, actualExitStart, actualEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, enterEnd, actualExitStart, actualEnd],
    [30, 0, 0, -30]
  );

  const scale = useTransform(
    progress,
    [start, enterEnd, actualExitStart, actualEnd],
    [0.94, 1, 1, 0.94]
  );

  const rotate = useTransform(
    progress,
    [start, enterEnd, actualExitStart, actualEnd],
    [
      isLeft ? -1.5 : 1.5,
      0,
      0,
      isLeft ? 1.5 : -1.5,
    ]
  );

  return (
    <motion.div
      className={`
        pointer-events-none
        absolute
        top-1/2
        -translate-y-1/2
        z-50
        w-[min(560px,88vw)]
        ${
          isLeft
            ? "left-5 sm:left-10 md:left-16 lg:left-24 xl:left-32 text-left"
            : "right-5 sm:right-10 md:right-16 lg:right-24 xl:right-32 text-left"
        }
      `}
      style={{
        opacity,
        x,
        y,
        scale,
        rotate,
      }}
    >

      {/* SOFT LIGHT */}

      <div
        className={`
          pointer-events-none
          absolute
          top-1/2
          -translate-y-1/2
          ${isLeft ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"}
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#0EA5E9]/10
          blur-[140px]
        `}
      />

      <div className="relative">

        {/* NUMBER */}

        <div
          className="
            mb-6
            flex
            items-center
            gap-4
          "
        >
          <span
            className="
              font-mono
              text-sm
              font-bold
              tracking-[0.4em]
              text-[#2563EB]
            "
          >
            {service.number}
          </span>

          <span
            className="
              h-px
              w-16
              bg-gradient-to-r
              from-[#0EA5E9]
              to-transparent
            "
          />

          <span
            className="
              text-[9.5px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#64748B]
            "
          >
            {service.tag}
          </span>
        </div>

        {/* ICON */}

        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-[#0EA5E9]/20
            bg-white/80
            shadow-[0_15px_50px_rgba(14,165,233,0.16)]
            backdrop-blur-xl
          "
        >
          <Icon
            className="
              h-7
              w-7
              text-[#0EA5E9]
            "
          />
        </div>

        {/* TITLE */}

        <h3
          className="
            max-w-4xl
            font-display
            font-black
            text-4xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            leading-[0.96]
            tracking-tight
            text-[#0F172A]
          "
        >
          {service.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            max-w-2xl
            text-sm
            leading-relaxed
            text-[#475569]
            md:text-lg
            md:leading-8
          "
        >
          {service.description}
        </p>

        {/* CAPABILITIES */}

        <div
          className="
            mt-7
            flex
            flex-wrap
            gap-x-6
            gap-y-3
          "
        >
          {service.capabilities.map(
            (capability) => (
              <div
                key={capability}
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#334155]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#0EA5E9]
                    shadow-[0_0_12px_rgba(14,165,233,0.6)]
                  "
                />

                {capability}
              </div>
            )
          )}
        </div>

        {/* BOTTOM LINE */}

        <div
          className="
            mt-9
            flex
            items-center
            gap-5
          "
        >
          <div
            className="
              h-px
              w-24
              bg-gradient-to-r
              from-[#0EA5E9]
              to-transparent
            "
          />

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#2563EB]
            "
          >
            <Zap className="h-3 w-3" />

            Digital capability
          </div>

          <ArrowUpRight
            className="
              h-4
              w-4
              text-[#4F46E5]
            "
          />
        </div>

      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN SERVICES TUNNEL
========================================================= */

export default function ServicesTunnel() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const {
    scrollYProgress,
  } = useScroll({
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
        stiffness: 200,
        damping: 26,
        mass: 0.08,
      }
    );

  /* =======================================================
     INTRO
  ======================================================= */

  const headingOpacity =
    useTransform(
      progress,
      [
        0,
        0.015,
        0.065,
        0.09,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const headingY =
    useTransform(
      progress,
      [
        0,
        0.015,
        0.09,
      ],
      [
        35,
        0,
        -45,
      ]
    );

  const headingScale =
    useTransform(
      progress,
      [
        0,
        0.015,
        0.09,
      ],
      [
        0.95,
        1,
        0.92,
      ]
    );

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progressWidth =
    useTransform(
      progress,
      [0, 1],
      [
        "0%",
        "100%",
      ]
    );

  /* =======================================================
     SCROLL HINT
  ======================================================= */

  const hintOpacity =
    useTransform(
      progress,
      [
        0,
        0.04,
        0.10,
      ],
      [
        1,
        1,
        0,
      ]
    );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="
        relative
        h-[850vh]
        bg-[#F8FBFF]
      "
    >

      {/* =================================================
          STICKY WORLD
      ================================================= */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          z-10
          overflow-hidden
          pointer-events-none
        "
      >

        {/* =================================================
            LIGHT HERO-CONSISTENT BACKGROUND
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-[#F8FBFF]
          "
        />

        {/* =================================================
            TOP BLUE ATMOSPHERE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-15vh]
            h-[55vh]
            w-[80vw]
            -translate-x-1/2
            rounded-full
            bg-[#0EA5E9]/10
            blur-[160px]
          "
        />

        {/* =================================================
            CYAN ATMOSPHERE
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[50vh]
            w-[50vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#22D3EE]/10
            blur-[130px]
          "
          animate={{
            scale: [
              1,
              1.2,
              1,
            ],
            opacity: [
              0.25,
              0.5,
              0.25,
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            INDIGO ATMOSPHERE
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            bottom-[-20vh]
            right-[-10vw]
            h-[55vh]
            w-[55vw]
            rounded-full
            bg-[#4F46E5]/8
            blur-[150px]
          "
          animate={{
            x: [
              0,
              -40,
              0,
            ],
            y: [
              0,
              -25,
              0,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            THREE.JS WORLD
        ================================================= */}

        <Canvas
          className="pointer-events-none"
          style={{ pointerEvents: "none" }}
          camera={{
            position: [
              0,
              0,
              4,
            ],
            fov: 55,
            near: 0.1,
            far: 200,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              "high-performance",
          }}
        >
          <TunnelScene
            progress={progress}
          />
        </Canvas>

        {/* =================================================
            INTRO (LEFT-ALIGNED EDITORIAL POSITION)
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-5
            sm:left-10
            md:left-16
            lg:left-24
            xl:left-32
            top-16
            md:top-24
            z-[100]
            max-w-2xl
            text-left
          "
          style={{
            opacity:
              headingOpacity,
            y: headingY,
            scale:
              headingScale,
          }}
        >

          <div
            className="
              mb-4
              flex
              items-center
              justify-start
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#0EA5E9]
              "
            />

            <Sparkles
              className="
                h-3.5
                w-3.5
                text-[#0EA5E9]
              "
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#2563EB]
              "
            >
              What We Build
            </span>

            <div
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-[#2563EB]
                to-transparent
              "
            />
          </div>

          <h2
            className="
              font-display
              font-black
              text-3xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              leading-[1.02]
              tracking-tight
              text-[#0F172A]
            "
          >
            Technology without

            <span
              className="
                block
                bg-gradient-to-r
                from-[#0EA5E9]
                via-[#22D3EE]
                to-[#4F46E5]
                bg-clip-text
                text-transparent
              "
            >
              boundaries.
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-lg
              text-xs
              leading-6
              text-[#64748B]
              sm:text-sm
              font-light
            "
          >
            Explore the systems,
            experiences and
            technologies that power
            modern digital products.
          </p>

        </motion.div>

        {/* =================================================
            SERVICE CONTENT
        ================================================= */}

        {services.map(
          (service, index) => (
            <ServiceExperience
              key={service.number}
              service={service}
              index={index}
              progress={progress}
            />
          )
        )}

        {/* =================================================
            PROGRESS BAR
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-7
            left-1/2
            z-[150]
            flex
            w-[min(520px,75vw)]
            -translate-x-1/2
            items-center
            gap-4
          "
        >

          <span
            className="
              font-mono
              text-[9px]
              tracking-widest
              text-[#64748B]
            "
          >
            01
          </span>

          <div
            className="
              relative
              h-px
              flex-1
              overflow-hidden
              bg-[#CBD5E1]
            "
          >
            <motion.div
              className="
                absolute
                inset-y-0
                left-0
                bg-gradient-to-r
                from-[#0EA5E9]
                via-[#22D3EE]
                to-[#4F46E5]
              "
              style={{
                width:
                  progressWidth,
              }}
            />
          </div>

          <span
            className="
              font-mono
              text-[9px]
              tracking-widest
              text-[#64748B]
            "
          >
            08
          </span>

        </div>

        {/* =================================================
            SCROLL HINT
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            bottom-7
            right-8
            z-[150]
            hidden
            items-center
            gap-3
            md:flex
          "
          style={{
            opacity:
              hintOpacity,
          }}
        >
          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#64748B]
            "
          >
            Enter the tunnel
          </span>

          <motion.span
            className="
              text-[#0EA5E9]
            "
            animate={{
              y: [
                0,
                6,
                0,
              ],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          >
            ↓
          </motion.span>
        </motion.div>

        {/* =================================================
            SOFT VIGNETTE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[120]
            bg-[radial-gradient(circle_at_center,transparent_35%,rgba(226,232,240,0.18)_75%,rgba(203,213,225,0.35)_100%)]
          "
        />

        {/* =================================================
            TOP BLEND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[130]
            h-40
            bg-gradient-to-b
            from-white
            via-white/70
            to-transparent
          "
        />

        {/* =================================================
            BOTTOM BLEND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[130]
            h-32
            bg-gradient-to-t
            from-[#F8FBFF]
            to-transparent
          "
        />

      </div>
    </section>
  );
}