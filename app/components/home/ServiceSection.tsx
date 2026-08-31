"use client";

import { useMemo, useRef } from "react";

import {
  Canvas,
  useFrame,
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

import RevealText from "../ui/RevealText";

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
   COLOR SYSTEM
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

      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.CatmullRomCurve3(
      points,
      false,
      "catmullrom",
      0.7
    );
  }, []);

  const branchCurves = useMemo(() => {
    const curves: THREE.CatmullRomCurve3[] = [];

    for (let branch = 0; branch < 22; branch++) {
      const points: THREE.Vector3[] = [];

      const side = branch % 2 === 0 ? 1 : -1;

      const startZ = -branch * 3.1;

      const startX =
        side * (4.5 + (branch % 4) * 1.25);

      const startY =
        ((branch % 5) - 2) * 1.25;

      for (let i = 0; i <= 30; i++) {
        const t = i / 30;

        const z =
          startZ -
          t * (8 + (branch % 3) * 3.5);

        const x =
          startX +
          side *
            Math.sin(t * Math.PI) *
            (4.5 + branch * 0.13) +
          Math.sin(t * 8 + branch) * 0.75;

        const y =
          startY +
          Math.cos(
            t * Math.PI * 1.5 + branch
          ) *
            1.5 *
            t;

        points.push(
          new THREE.Vector3(x, y, z)
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
          Math.cos(angle) * radius;

        const y =
          Math.sin(angle) *
          radius *
          0.65;

        points.push(
          new THREE.Vector3(x, y, z)
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

  useFrame(() => {
    if (!group.current) return;

    const p = progress.get();

    group.current.rotation.z =
      Math.sin(p * Math.PI * 2) * 0.12;

    group.current.rotation.x =
      Math.cos(p * Math.PI * 1.5) * 0.07;

    group.current.rotation.y =
      Math.sin(p * Math.PI * 1.3) * 0.08;
  });

  return (
    <group ref={group}>
      {/* MAIN ROOT */}
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

      {/* BLUE GLOW */}
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
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* BRANCHES */}
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
            <group key={`branch-${index}`}>
              <mesh>
                <tubeGeometry
                  args={[
                    curve,
                    80,
                    0.025 +
                      (index % 3) * 0.015,
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

      {/* FLOWING RINGS */}
      {flowingCurves.map(
        (curve, index) => (
          <mesh key={`flow-${index}`}>
            <tubeGeometry
              args={[
                curve,
                150,
                0.022 +
                  (index % 2) * 0.018,
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

      {/* CORE */}
      <mesh position={[0, 0, -67]}>
        <sphereGeometry
          args={[1.1, 32, 32]}
        />

        <meshBasicMaterial
          color={COLORS.indigo}
        />
      </mesh>

      <mesh position={[0, 0, -67]}>
        <sphereGeometry
          args={[3.4, 32, 32]}
        />

        <meshBasicMaterial
          color={COLORS.sky}
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
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
  const group = useRef<THREE.Group>(null);

  const blobs = useMemo(() => {
    return Array.from(
      { length: 38 },
      (_, i) => ({
        x:
          Math.sin(i * 1.91) * 10 +
          Math.cos(i * 0.7) * 3,

        y:
          Math.cos(i * 1.37) * 7 +
          Math.sin(i * 0.4) * 2,

        z: -4 - i * 2.15,

        scale:
          0.12 + (i % 5) * 0.07,
      })
    );
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const p = progress.get();

    group.current.rotation.z =
      state.clock.elapsedTime * 0.03;

    group.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.15
      ) * 0.1;

    group.current.position.z = p * 16;
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
              args={[1, 12, 12]}
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
   PARTICLES
========================================================= */

function createTunnelDustPositions() {
  const array = new Float32Array(1200 * 3);

  for (let i = 0; i < 1200; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 18;

    array[i3] = Math.cos(angle) * radius;
    array[i3 + 1] = Math.sin(angle) * radius * 0.7;
    array[i3 + 2] = -Math.random() * 85;
  }

  return array;
}

function TunnelParticles({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => createTunnelDustPositions(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const p = progress.get();

    pointsRef.current.rotation.z =
      state.clock.elapsedTime * 0.012;

    pointsRef.current.position.z =
      p * 28;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={COLORS.sky}
        size={0.045}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   TUNNEL SCENE
========================================================= */

function TunnelScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  useFrame((state) => {
    const p = progress.get();

    const targetZ = 4 - p * 65;

    const targetX =
      Math.sin(p * Math.PI * 2) * 2.2;

    const targetY =
      Math.cos(p * Math.PI * 1.5) * 1.5;

    state.camera.position.x +=
      (targetX - state.camera.position.x) *
      0.035;

    state.camera.position.y +=
      (targetY - state.camera.position.y) *
      0.035;

    state.camera.position.z +=
      (targetZ - state.camera.position.z) *
      0.035;

    state.camera.rotation.z +=
      (
        Math.sin(p * Math.PI * 2) *
          0.045 -
        state.camera.rotation.z
      ) * 0.03;

    state.camera.rotation.y +=
      (
        Math.sin(p * Math.PI * 1.6) *
          0.04 -
        state.camera.rotation.y
      ) * 0.03;
  });

  return (
    <>
      <OrganicTunnel progress={progress} />

      <TunnelBlobs progress={progress} />

      <TunnelParticles progress={progress} />

      <ambientLight intensity={0.25} />
    </>
  );
}

/* =========================================================
   SERVICE EXPERIENCE
   CENTERED ON ALL DEVICES
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

  const serviceArea =
    serviceAreaEnd -
    serviceAreaStart;

  const segment =
    serviceArea / services.length;

  const start =
    serviceAreaStart +
    index * segment;

  const end = start + segment;

  const enterEnd =
    start + segment * 0.22;

  const exitStart =
    start + segment * 0.78;

  const actualExitStart =
    index === services.length - 1
      ? 0.94
      : exitStart;

  const actualEnd =
    index === services.length - 1
      ? 0.98
      : end;

  /* -----------------------------------------
     ANIMATION
  ----------------------------------------- */

  const x = useTransform(
    progress,
    [
      start,
      enterEnd,
      actualExitStart,
      actualEnd,
    ],
    [-30, 0, 0, 30]
  );

  const opacity = useTransform(
    progress,
    [
      start,
      enterEnd,
      actualExitStart,
      actualEnd,
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [
      start,
      enterEnd,
      actualExitStart,
      actualEnd,
    ],
    [25, 0, 0, -25]
  );

  const scale = useTransform(
    progress,
    [
      start,
      enterEnd,
      actualExitStart,
      actualEnd,
    ],
    [0.96, 1, 1, 0.96]
  );

  const rotate = useTransform(
    progress,
    [
      start,
      enterEnd,
      actualExitStart,
      actualEnd,
    ],
    [-1, 0, 0, 1]
  );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-50

        w-[calc(100%-2rem)]
        sm:w-[calc(100%-4rem)]
        md:w-[min(700px,calc(100%-5rem))]
        lg:w-[min(760px,82vw)]
        xl:w-[min(820px,78vw)]

        -translate-x-1/2
        -translate-y-1/2

        text-center
      "
      style={{
        opacity,
        x,
        y,
        scale,
        rotate,
      }}
    >
      {/* -----------------------------------------
          SOFT LIGHT
      ----------------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          h-[260px]
          w-[260px]

          sm:h-[340px]
          sm:w-[340px]

          md:h-[440px]
          md:w-[440px]

          lg:h-[520px]
          lg:w-[520px]

          rounded-full

          bg-[#0EA5E9]/10

          blur-[100px]
          sm:blur-[120px]
          lg:blur-[140px]
        "
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* -----------------------------------------
            NUMBER + TAG
        ----------------------------------------- */}

        <div
          className="
            mb-4
            sm:mb-5

            flex
            items-center
            justify-center

            gap-2.5
            sm:gap-3
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              sm:text-xs

              font-bold
              tracking-[0.3em]

              text-[#2563EB]
            "
          >
            {service.number}
          </span>

          <span
            className="
              h-px
              w-7
              sm:w-10

              bg-gradient-to-r
              from-[#0EA5E9]
              to-transparent
            "
          />

          <span
            className="
              text-[7px]
              sm:text-[8px]
              md:text-[9px]

              font-bold
              uppercase

              tracking-[0.18em]

              text-[#64748B]
            "
          >
            {service.tag}
          </span>

          <span
            className="
              h-px
              w-7
              sm:w-10

              bg-gradient-to-l
              from-[#0EA5E9]
              to-transparent
            "
          />
        </div>

        {/* -----------------------------------------
            ICON
        ----------------------------------------- */}

        <div
          className="
            mb-4
            sm:mb-5

            flex
            h-12
            w-12

            sm:h-14
            sm:w-14

            md:h-16
            md:w-16

            items-center
            justify-center

            rounded-2xl

            border
            border-[#0EA5E9]/20

            bg-white/85

            shadow-[0_15px_50px_rgba(14,165,233,0.16)]

            backdrop-blur-xl
          "
        >
          <Icon
            className="
              h-5
              w-5

              sm:h-6
              sm:w-6

              md:h-7
              md:w-7

              text-[#0EA5E9]
            "
          />
        </div>

        {/* -----------------------------------------
            TITLE
        ----------------------------------------- */}

        <h3
          className="
            max-w-[90vw]
            sm:max-w-[680px]
            md:max-w-[760px]
            lg:max-w-[800px]

            font-display
            font-black

            text-[2.15rem]
            leading-[0.95]

            tracking-tight

            text-[#0F172A]

            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
          "
        >
          <RevealText text={service.title} stagger={0.06} duration={0.5} blurAmount={4} />
        </h3>

        {/* -----------------------------------------
            SUBTITLE
        ----------------------------------------- */}

        <RevealText
          as="p"
          text={service.subtitle}
          delay={0.1}
          stagger={0.05}
          duration={0.4}
          blurAmount={3}
          className="
            mt-2
            text-[10px]
            sm:text-xs
            md:text-sm
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#2563EB]
          "
        />

        {/* -----------------------------------------
            DESCRIPTION
        ----------------------------------------- */}

        <RevealText
          as="p"
          text={service.description}
          delay={0.2}
          stagger={0.03}
          duration={0.5}
          blurAmount={4}
          className="
            mx-auto
            mt-3
            sm:mt-4
            max-w-[300px]
            sm:max-w-[480px]
            md:max-w-[560px]
            text-[11px]
            leading-5
            sm:text-sm
            sm:leading-6
            md:text-base
            md:leading-7
            text-[#475569]
          "
        />

        {/* -----------------------------------------
            CAPABILITIES
        ----------------------------------------- */}

        <div
          className="
            mt-4
            sm:mt-5

            flex
            max-w-[620px]

            flex-wrap
            items-center
            justify-center

            gap-x-3
            gap-y-2

            sm:gap-x-5
            sm:gap-y-2.5
          "
        >
          {service.capabilities.map(
            (capability) => (
              <div
                key={capability}
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5

                  text-[7px]
                  sm:text-[8px]
                  md:text-[9px]

                  font-bold
                  uppercase

                  tracking-[0.1em]
                  sm:tracking-[0.14em]

                  text-[#334155]
                "
              >
                <span
                  className="
                    h-1
                    w-1

                    shrink-0

                    rounded-full

                    bg-[#0EA5E9]

                    shadow-[0_0_10px_rgba(14,165,233,0.6)]
                  "
                />

                {capability}
              </div>
            )
          )}
        </div>

        {/* -----------------------------------------
            BOTTOM SIGNAL
        ----------------------------------------- */}

        <div
          className="
            mt-5
            sm:mt-6

            flex
            items-center
            justify-center

            gap-3
          "
        >
          <div
            className="
              h-px
              w-8
              sm:w-12

              bg-gradient-to-r
              from-transparent
              to-[#0EA5E9]
            "
          />

          <div
            className="
              flex
              items-center
              gap-1.5

              text-[7px]
              sm:text-[8px]

              font-bold
              uppercase

              tracking-[0.18em]

              text-[#2563EB]
            "
          >
            <Zap className="h-3 w-3" />

            Digital Capability
          </div>

          <ArrowUpRight
            className="
              h-3
              w-3

              text-[#4F46E5]
            "
          />

          <div
            className="
              h-px
              w-8
              sm:w-12

              bg-gradient-to-l
              from-transparent
              to-[#0EA5E9]
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

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 140,
      damping: 26,
      mass: 0.5,
      restDelta: 0.001,
    }
  );

  /* =======================================================
     INTRO ANIMATION
  ======================================================= */

  const headingOpacity =
    useTransform(
      progress,
      [0, 0.015, 0.065, 0.09],
      [0, 1, 1, 0]
    );

  const headingY =
    useTransform(
      progress,
      [0, 0.015, 0.09],
      [35, 0, -45]
    );

  const headingScale =
    useTransform(
      progress,
      [0, 0.015, 0.09],
      [0.95, 1, 0.92]
    );

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progressWidth =
    useTransform(
      progress,
      [0, 1],
      ["0%", "100%"]
    );

  /* =======================================================
     SCROLL HINT
  ======================================================= */

  const hintOpacity =
    useTransform(
      progress,
      [0, 0.04, 0.1],
      [1, 1, 0]
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
        {/* BASE */}
        <div
          className="
            absolute
            inset-0

            bg-[#F8FBFF]
          "
        />

        {/* TOP ATMOSPHERE */}
        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[-15vh]

            h-[45vh]
            w-[100vw]

            sm:h-[55vh]
            sm:w-[80vw]

            -translate-x-1/2

            rounded-full

            bg-[#0EA5E9]/10

            blur-[120px]
            sm:blur-[160px]
          "
        />

        {/* CYAN ATMOSPHERE */}
        <motion.div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-1/2

            h-[45vh]
            w-[90vw]

            sm:h-[50vh]
            sm:w-[50vw]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[#22D3EE]/10

            blur-[110px]
            sm:blur-[130px]
          "
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* INDIGO ATMOSPHERE */}
        <motion.div
          className="
            pointer-events-none

            absolute

            bottom-[-20vh]
            right-[-10vw]

            h-[45vh]
            w-[75vw]

            sm:h-[55vh]
            sm:w-[55vw]

            rounded-full

            bg-[#4F46E5]/8

            blur-[120px]
            sm:blur-[150px]
          "
          animate={{
            x: [0, -40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            THREE JS
        ================================================= */}

        <Canvas
          className="pointer-events-none"
          style={{
            pointerEvents: "none",
          }}
          camera={{
            position: [0, 0, 4],
            fov: 55,
            near: 0.1,
            far: 200,
          }}
          dpr={[1, 1.5]}
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
            INTRO
        ================================================= */}

        <motion.div
          className="
            pointer-events-none

            absolute

            left-1/2

            top-14
            sm:top-16
            md:top-20
            lg:top-24

            z-[100]

            w-[calc(100%-2rem)]
            sm:w-[calc(100%-4rem)]

            max-w-2xl

            -translate-x-1/2

            text-center
          "
          style={{
            opacity: headingOpacity,
            y: headingY,
            scale: headingScale,
          }}
        >
          {/* LABEL */}

          <div
            className="
              mb-3
              sm:mb-4

              flex
              items-center
              justify-center

              gap-2
              sm:gap-3
            "
          >
            <span
              className="
                h-px
                w-5
                sm:w-8

                bg-gradient-to-r
                from-transparent
                to-[#0EA5E9]
              "
            />

            <Sparkles
              className="
                h-3
                w-3

                text-[#0EA5E9]
              "
            />

            <RevealText
              as="span"
              text="What We Build"
              stagger={0.06}
              duration={0.4}
              blurAmount={4}
              className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#2563EB]"
            />

            <span
              className="
                h-px
                w-5
                sm:w-8

                bg-gradient-to-r
                from-[#2563EB]
                to-transparent
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              font-display
              font-black

              text-[1.8rem]
              leading-[1]

              tracking-tight

              text-[#0F172A]

              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            <RevealText
              text="Technology without"
              stagger={0.08}
              duration={0.6}
              blurAmount={6}
            />

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
              <RevealText
                text="boundaries."
                delay={0.2}
                stagger={0.08}
                duration={0.6}
                blurAmount={6}
              />
            </span>
          </h2>

          {/* DESCRIPTION */}

          <RevealText
            as="p"
            text="Explore the systems, experiences and technologies that power modern digital products."
            delay={0.3}
            stagger={0.04}
            duration={0.5}
            blurAmount={4}
            className="
              mx-auto
              mt-2
              sm:mt-3
              max-w-md
              text-[10px]
              leading-4
              sm:text-xs
              sm:leading-5
              text-[#64748B]
              font-light
            "
          />
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

            bottom-5
            sm:bottom-7

            left-1/2

            z-[150]

            flex

            w-[calc(100%-3rem)]

            sm:w-[min(520px,75vw)]

            -translate-x-1/2

            items-center

            gap-3
            sm:gap-4
          "
        >
          <span
            className="
              font-mono

              text-[8px]
              sm:text-[9px]

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
                width: progressWidth,
              }}
            />
          </div>

          <span
            className="
              font-mono

              text-[8px]
              sm:text-[9px]

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
            opacity: hintOpacity,
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
            className="text-[#0EA5E9]"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          >
            ↓
          </motion.span>
        </motion.div>

        {/* VIGNETTE */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            z-[120]

            bg-[radial-gradient(circle_at_center,transparent_30%,rgba(226,232,240,0.15)_70%,rgba(203,213,225,0.30)_100%)]
          "
        />

        {/* TOP BLEND */}

        <div
          className="
            pointer-events-none

            absolute

            inset-x-0
            top-0

            z-[130]

            h-28
            sm:h-40

            bg-gradient-to-b

            from-white
            via-white/70
            to-transparent
          "
        />

        {/* BOTTOM BLEND */}

        <div
          className="
            pointer-events-none

            absolute

            inset-x-0
            bottom-0

            z-[130]

            h-24
            sm:h-32

            bg-gradient-to-t

            from-[#F8FBFF]
            to-transparent
          "
        />
      </div>
    </section>
  );
}