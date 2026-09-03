"use client";

import { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
  {
    id: "lantriva",
    number: "01",
    eyebrow: "01. LANTRIVA",
    name: "Lantriva",
    category: "UI/UX & Digital Experience",
    quote:
      "“Designing memorable digital products, interfaces and experiences that elevate user engagement and brand authority.”",
    capabilities: [
      "UI/UX",
      "Product Design",
      "Web",
      "SaaS",
      "Design Systems",
    ],
    builtFor: "Global Enterprises & Modern Digital Products",
    image: "/images/lantravia.png",

    // INDIGO
    accent: "#4F46E5",

    position: "left" as const,
  },

  {
    id: "neirah-lab",
    number: "02",
    eyebrow: "02. NEIRAH LAB",
    name: "Neirah Lab",
    category: "AI, R&D & Automation",
    quote:
      "“Pioneering next-generation AI architectures, autonomous neural pipelines, and intelligent automation systems.”",
    capabilities: [
      "Neural AI",
      "LLM Pipelines",
      "Autonomous Agents",
      "R&D",
      "Machine Learning",
    ],
    builtFor: "AI Startups, Enterprise R&D & Tech Innovators",
    image: "/images/neirah_lab.png",

    // BLUE INDIGO
    accent: "#6366F1",

    position: "right" as const,
  },

  {
    id: "neirah-iot",
    number: "03",
    eyebrow: "03. NEIRAH IOT",
    name: "Neirah IoT",
    category: "IoT, Embedded & Smart Systems",
    quote:
      "“Bridging physical environments with real-time digital intelligence, sensor meshes, and edge telemetry.”",
    capabilities: [
      "Edge Computing",
      "Sensor Mesh",
      "Telemetry",
      "Smart Systems",
      "Hardware Integration",
    ],
    builtFor: "Smart Infrastructure, Industrial IoT & AgTech",
    image: "/images/drone and iot.png",

    // CYAN / BLUE
    accent: "#0891B2",

    position: "left" as const,
  },

  {
    id: "neirah-drone",
    number: "04",
    eyebrow: "04. NEIRAH DRONE",
    name: "Neirah Drone",
    category: "Drone Engineering & Aerial Intelligence",
    quote:
      "“Engineering autonomous aerial systems and geospatial LiDAR intelligence for complex real-world operations.”",
    capabilities: [
      "Autonomous Flight",
      "Aerial Mapping",
      "Thermal LiDAR",
      "Geospatial Data",
      "Robotics",
    ],
    builtFor: "Surveying, Energy Grid, Defense & Precision Mapping",
    image: "/images/drone and iot.png",

    // ELECTRIC BLUE
    accent: "#2563EB",

    position: "right" as const,
  },

  {
    id: "mugilix",
    number: "05",
    eyebrow: "05. MUGILIX",
    name: "Mugilix",
    category: "Business Operating System",
    quote:
      "“Unifying enterprise operations, resource allocation, and automated workflows into one intelligent command center.”",
    capabilities: [
      "Enterprise OS",
      "ERP Architecture",
      "Workflow Automation",
      "Data Vault",
      "Analytics",
    ],
    builtFor: "High-Growth Corporations & Scaled Organizations",
    image: "/images/mugilix.png",

    // VIOLET
    accent: "#7C3AED",

    position: "left" as const,
  },

  {
    id: "hrvio",
    number: "06",
    eyebrow: "06. HRVIO",
    name: "HRVio",
    category: "Human Intelligence",
    quote:
      "“Empowering organizations with deep human intelligence, talent analytics, and pulse workforce insights.”",
    capabilities: [
      "People Analytics",
      "Talent Intelligence",
      "Culture OS",
      "Performance Metrics",
      "HR Tech",
    ],
    builtFor: "People-First Companies & Global HR Operations",
    image: "/images/hr.png",

    // PURPLE
    accent: "#9333EA",

    position: "right" as const,
  },

  {
    id: "pothify",
    number: "07",
    eyebrow: "07. POTHIFY",
    name: "Pothify",
    category: "Delivery Management SaaS",
    quote:
      "“Streamlining complex delivery networks, live driver dispatch, and automated route optimization.”",
    capabilities: [
      "Live Dispatch",
      "Route Optimization",
      "Fleet Analytics",
      "Last-Mile SaaS",
      "Geo Tracking",
    ],
    builtFor: "Logistics Providers, Couriers & Enterprise Fleets",
    image: "/images/veera.png",

    // DEEP TEAL
    accent: "#0F766E",

    position: "left" as const,
  },

  {
    id: "trincobites",
    number: "08",
    eyebrow: "08. TRINCOBITES",
    name: "Trincobites",
    category: "Food Delivery Ecosystem",
    quote:
      "“Connecting kitchens, customers, and delivery fleets into a unified high-speed culinary ecosystem.”",
    capabilities: [
      "Kitchen OS",
      "Multi-Tenant Ordering",
      "Driver Fleet",
      "POS Sync",
      "Food Tech",
    ],
    builtFor: "Restaurant Chains, Dark Kitchens & Food Delivery Platforms",
    image: "/images/trincobites.png",

    // SKY BLUE
    accent: "#0284C7",

    position: "right" as const,
  },

  {
    id: "rideya",
    number: "09",
    eyebrow: "09. RIDEYA",
    name: "Rideya",
    category: "Mobility Ecosystem",
    quote:
      "“Architecting next-generation mobility platforms with dynamic dispatch and intelligent transit routing.”",
    capabilities: [
      "Fleet Engine",
      "Dynamic Dispatch",
      "Smart Transit",
      "Rider App",
      "Fare Optimization",
    ],
    builtFor: "Urban Transit Networks, Taxi Fleets & Mobility Platforms",
    image: "/images/veera.png",

    // INDIGO
    accent: "#4F46E5",

    position: "left" as const,
  },

  {
    id: "neirah-brandos",
    number: "10",
    eyebrow: "10. NEIRAH BRANDOS",
    name: "Neirah BrandOS",
    category: "Brand & Growth Infrastructure",
    quote:
      "“Building scalable brand infrastructure, design token vaults, and growth engines for ambitious companies.”",
    capabilities: [
      "Identity Engine",
      "Design Tokens",
      "Asset Infrastructure",
      "Brand Vault",
      "Growth Systems",
    ],
    builtFor: "Scaling Brands, Agencies & Enterprise Design Teams",
    image: "/images/brandos.png",

    // VIOLET
    accent: "#7C3AED",

    position: "right" as const,
  },
];

export type Product = (typeof products)[number];

/* =========================================================
   PRODUCT SCENE
========================================================= */

function ProductScene({
  product,
  index,
  progress,
}: {
  product: Product;
  index: number;
  progress: MotionValue<number>;
}) {
  const introOffset = 0.08;

  const totalProductSpan = 0.83;

  const slotSize = totalProductSpan / products.length;

  const start = introOffset + index * slotSize;

  const end = introOffset + (index + 1) * slotSize;

  const enterStart =
    index === 0 ? start : start - 0.015;

  const enterEnd = start + 0.025;

  const exitStart = end - 0.025;

  const exitEnd =
    index === products.length - 1
      ? end
      : end + 0.015;

  /* =====================================================
     SCENE OPACITY
  ===================================================== */

  const opacity = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [0, 1, 1, 0]
  );

  /* =====================================================
     SCENE MOVEMENT
  ===================================================== */

  const y = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [70, 0, 0, -70]
  );

  /* =====================================================
     SCENE SCALE
  ===================================================== */

  const scale = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [0.9, 1, 1, 0.94]
  );

  /* =====================================================
     IMAGE MOVEMENT
  ===================================================== */

  const imageY = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [60, 0, 0, -30]
  );

  /* =====================================================
     IMAGE ROTATION
  ===================================================== */

  const imageRotate = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [
      product.position === "left"
        ? -6
        : 6,

      product.position === "left"
        ? -1.5
        : 1.5,

      product.position === "left"
        ? 1.5
        : -1.5,

      product.position === "left"
        ? 5
        : -5,
    ]
  );

  /* =====================================================
     SIGNAL LINE
  ===================================================== */

  const lineScale = useTransform(
    progress,
    [enterStart, enterEnd],
    [0, 1]
  );

  const isLeft =
    product.position === "left";

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        inset-0
      "
      style={{
        opacity,
        y,
        scale,
      }}
    >
      {/* =================================================
          MOBILE PRODUCT CARD (< md)
      ================================================= */}

      <div
        className="
          absolute
          inset-x-3
          top-[44%]
          z-20
          flex
          max-h-[85vh]
          -translate-y-1/2
          flex-col
          items-center
          justify-center
          overflow-y-auto
          pb-2
          pt-2
          text-center
          md:hidden
        "
      >
        {/* TITLE */}

        <h3
          className="
            whitespace-nowrap
            text-xl
            font-black
            leading-tight
            tracking-tight
            text-slate-950
            xs:text-2xl
            sm:text-3xl
          "
        >
          {product.name}
        </h3>

        {/* EYEBROW (BELOW TITLE) */}

        <div
          className="
            mb-2
            mt-1.5
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-0.5
            font-mono
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            shadow-xs
            backdrop-blur-md
            sm:text-xs
          "
          style={{
            backgroundColor: `${product.accent}12`,

            color: product.accent,

            border: `1px solid ${product.accent}30`,
          }}
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
            "
            style={{
              backgroundColor: product.accent,
            }}
          />

          <span>{product.eyebrow}</span>
        </div>

        {/* MOBILE FLOATING IMAGE */}

        <motion.div
          className="
            relative
            my-2
            flex
            h-[120px]
            w-full
            max-w-[220px]
            items-center
            justify-center
            xs:h-[140px]
          "
          style={{
            y: imageY,

            rotate: imageRotate,
          }}
        >
          <div
            className="
              absolute
              h-24
              w-24
              rounded-full
              opacity-[0.18]
              blur-2xl
            "
            style={{
              backgroundColor: product.accent,
            }}
          />

          <img
            src={product.image}
            alt={product.name}
            draggable={false}
            className="
              relative
              z-10
              max-h-[115px]
              w-auto
              select-none
              object-contain
              drop-shadow-md
              xs:max-h-[135px]
            "
          />
        </motion.div>

        {/* QUOTE */}

        <div
          className="
            my-2
            max-w-sm
            border-y
            border-slate-900/10
            px-3
            py-1.5
          "
        >
          <p
            className="
              font-serif
              text-sm
              italic
              leading-relaxed
              text-slate-800
              xs:text-base
            "
          >
            {product.quote}
          </p>
        </div>

        {/* CAPABILITIES LABEL */}

        <div
          className="
            mb-1.5
            mt-1.5
            font-mono
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-slate-400
          "
        >
          CAPABILITIES & STACK
        </div>

        {/* CAPABILITIES */}

        <div
          className="
            flex
            max-w-sm
            flex-wrap
            justify-center
            gap-1.5
          "
        >
          {product.capabilities.map((capability) => (
            <span
              key={capability}
              className="
                rounded-full
                border
                border-slate-900/10
                bg-white/95
                px-3
                py-1
                text-xs
                font-semibold
                text-slate-800
                shadow-2xs
                backdrop-blur-md
                sm:text-sm
              "
            >
              {capability}
            </span>
          ))}
        </div>

        {/* BUILT FOR */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-center
            gap-1.5
            font-mono
            text-xs
            text-slate-500
            sm:text-sm
          "
        >
          <span className="font-bold text-slate-800">Built for:</span>

          <span className="max-w-[280px] truncate font-medium text-slate-600 sm:max-w-none">
            {product.builtFor}
          </span>
        </div>

        {/* CTA */}

        <div className="mt-3">
          <a
            href="/projects"
            className="
              pointer-events-auto
              group
              inline-flex
              items-center
              gap-2.5
              rounded-full
              bg-slate-950
              px-5
              py-2.5
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-white
              shadow-md
              transition-all
              hover:bg-slate-800
              sm:text-sm
            "
          >
            <span>Explore System</span>

            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* =================================================
          DESKTOP PRODUCT NUMBER (>= md)
      ================================================= */}

      <div
        className="
          absolute
          left-6
          top-[56%]
          z-20
          hidden
          -translate-y-1/2
          md:flex
          sm:left-10
          lg:left-14
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              font-mono
              text-xs
              font-bold
              tracking-[0.2em]
            "
            style={{
              color: product.accent,
            }}
          >
            {product.number}
          </span>

          <div
            className="
              h-px
              w-8
              bg-slate-900/15
            "
          />
        </div>
      </div>

      {/* =================================================
          DESKTOP MAIN PRODUCT CONTENT (>= md)
      ================================================= */}

      <div
        className={`
          absolute
          top-[56%]
          z-20
          hidden
          w-[min(460px,38vw)]
          -translate-y-1/2
          px-2
          md:block
          sm:px-4

          ${
            isLeft
              ? "left-[4%] text-left sm:left-[6%] lg:left-[8%]"
              : "right-[4%] text-right sm:right-[6%] lg:right-[8%]"
          }
        `}
      >
        {/* =================================================
            EYEBROW
        ================================================= */}

        <div
          className={`
            mb-3.5
            inline-flex
            items-center
            gap-2
            rounded-full
            px-4
            py-1.5
            font-mono
            text-xs
            font-bold
            uppercase
            tracking-wider
            shadow-sm
            backdrop-blur-md

            ${
              isLeft
                ? ""
                : "ml-auto"
            }
          `}
          style={{
            backgroundColor:
              `${product.accent}10`,

            color:
              product.accent,

            border:
              `1px solid ${product.accent}25`,
          }}
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
            "
            style={{
              backgroundColor:
                product.accent,
            }}
          />

          <span>
            {product.eyebrow}
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            whitespace-nowrap
            text-[clamp(2.5rem,5.2vw,6rem)]
            font-black
            leading-[0.85]
            tracking-[-0.065em]
            text-slate-950
          "
        >
          {product.name}
        </h3>

        {/* =================================================
            QUOTE
        ================================================= */}

        <div
          className={`
            my-4
            max-w-xl

            ${
              isLeft
                ? "border-l-2 pl-4 text-left"
                : "ml-auto border-r-2 pr-4 text-right"
            }
          `}
          style={{
            borderColor:
              product.accent,
          }}
        >
          <p
            className="
              font-serif
              text-base
              font-normal
              italic
              leading-relaxed
              text-slate-800
              sm:text-lg
              lg:text-xl
            "
          >
            {product.quote}
          </p>
        </div>

        {/* =================================================
            CAPABILITIES LABEL
        ================================================= */}

        <div
          className="
            mb-2.5
            mt-5
            font-mono
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-slate-400
          "
        >
          CAPABILITIES & STACK:
        </div>

        {/* =================================================
            CAPABILITIES
        ================================================= */}

        <div
          className={`
            flex
            flex-wrap
            gap-2

            ${
              isLeft
                ? "justify-start"
                : "justify-end"
            }
          `}
        >
          {product.capabilities.map(
            (capability) => (
              <span
                key={capability}
                className="
                  rounded-full
                  border
                  border-slate-900/8
                  bg-white/95
                  px-3.5
                  py-1
                  text-xs
                  font-semibold
                  text-slate-800
                  shadow-[0_2px_8px_rgba(0,0,0,0.03)]
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-slate-900/20
                  hover:shadow-md
                "
              >
                {capability}
              </span>
            )
          )}
        </div>

        {/* =================================================
            BUILT FOR
        ================================================= */}

        <div
          className={`
            mt-5
            flex
            items-center
            gap-1.5
            font-mono
            text-xs
            text-slate-500

            ${
              isLeft
                ? "justify-start"
                : "justify-end"
            }
          `}
        >
          <span
            className="
              font-bold
              text-slate-900
            "
          >
            Built for:
          </span>

          <span
            className="
              font-medium
              text-slate-600
            "
          >
            {product.builtFor}
          </span>
        </div>

        {/* =================================================
            CTA
        ================================================= */}

        <div
          className={`
            mt-6
            flex

            ${
              isLeft
                ? "justify-start"
                : "justify-end"
            }
          `}
        >
          <a
            href="/projects"
            className="
              pointer-events-auto
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-slate-950
              px-6
              py-3
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
              shadow-lg
              shadow-slate-950/10
              transition-all
              duration-300
              hover:shadow-xl
              hover:shadow-slate-950/20
            "
          >
            <span>
              Explore System
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white/15
                transition-all
                duration-300
                group-hover:bg-white
                group-hover:text-slate-950
              "
            >
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </a>
        </div>
      </div>

      {/* =================================================
          DESKTOP FLOATING PRODUCT IMAGE (>= md)
      ================================================= */}

      <motion.div
        className={`
          absolute
          top-[56%]
          z-10
          hidden
          h-[360px]
          w-[300px]
          -translate-y-1/2
          items-center
          justify-center
          md:flex

          ${
            isLeft
              ? "right-[4%] sm:right-[6%] lg:right-[8%]"
              : "left-[4%] sm:left-[6%] lg:left-[8%]"
          }
        `}
        style={{
          y: imageY,
          rotate: imageRotate,
        }}
      >
        {/* =================================================
            AMBIENT PRODUCT GLOW
        ================================================= */}

        <div
          className="
            absolute
            h-48
            w-48
            rounded-full
            opacity-[0.16]
            blur-3xl
          "
          style={{
            backgroundColor:
              product.accent,
          }}
        />

        {/* =================================================
            GROUND SHADOW
        ================================================= */}

        <div
          className="
            absolute
            bottom-6
            h-4
            w-44
            rounded-full
            bg-slate-950/10
            blur-lg
          "
        />

        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          className="
            relative
            z-10
            max-h-[320px]
            w-auto
            max-w-[280px]
            select-none
            object-contain
            drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </motion.div>

      {/* =================================================
          DESKTOP CONNECTING SIGNAL BEAM (>= md)
      ================================================= */}

      <motion.div
        className={`
          absolute
          top-[56%]
          z-0
          hidden
          h-px
          origin-left
          md:block

          ${
            isLeft
              ? "left-1/2 right-[32%]"
              : "left-[32%] right-1/2"
          }
        `}
        style={{
          scaleX: lineScale,

          transformOrigin:
            isLeft
              ? "left"
              : "right",

          backgroundImage:
            `linear-gradient(
              90deg,
              ${product.accent}70,
              ${product.accent}12
            )`,
        }}
      />

      {/* =================================================
          DESKTOP CENTRAL SIGNAL DOT (>= md)
      ================================================= */}

      <motion.div
        className="
          absolute
          left-1/2
          top-[56%]
          z-30
          hidden
          h-4
          w-4
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          md:flex
        "
        style={{
          scale: lineScale,
        }}
      >
        <span
          className="
            absolute
            inline-flex
            h-full
            w-full
            animate-ping
            rounded-full
            opacity-75
          "
          style={{
            backgroundColor:
              product.accent,
          }}
        />

        <span
          className="
            relative
            inline-flex
            h-2.5
            w-2.5
            rounded-full
            shadow-sm
          "
          style={{
            backgroundColor:
              product.accent,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProductSignals() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  /* =====================================================
     SCROLL PROGRESS
  ===================================================== */

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  /* =====================================================
     SMOOTH SPRING
  ===================================================== */

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 70,
      damping: 24,
      mass: 0.5,
    }
  );

  /* =====================================================
     ACTIVE PRODUCT
  ===================================================== */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const productProgress =
        Math.max(
          0,
          Math.min(
            1,
            (latest - 0.08) /
              0.83
          )
        );

      const index = Math.min(
        products.length - 1,
        Math.floor(
          productProgress *
            products.length
        )
      );

      setActiveIndex(
        (previous) =>
          previous === index
            ? previous
            : index
      );
    }
  );

  const activeProduct =
    products[activeIndex];

  /* =====================================================
     TIMELINE PROGRESS
  ===================================================== */

  const progressHeight =
    useTransform(
      progress,
      [0.08, 0.91],
      ["0%", "100%"]
    );

  /* =====================================================
     INTRO ANIMATION
  ===================================================== */

  const introOpacity =
    useTransform(
      progress,
      [0, 0.04, 0.08],
      [1, 1, 0]
    );

  const introY =
    useTransform(
      progress,
      [0, 0.08],
      [0, -80]
    );

  /* =====================================================
     OUTRO ANIMATION
  ===================================================== */

  const endingOpacity =
    useTransform(
      progress,
      [0.91, 0.96, 1],
      [0, 1, 1]
    );

  const endingScale =
    useTransform(
      progress,
      [0.91, 1],
      [0.8, 1]
    );

  /* =====================================================
     NAVIGATE TO PRODUCT
  ===================================================== */

  const navigateToProduct =
    (index: number) => {
      const targetEl =
        sectionRef.current;

      if (!targetEl) return;

      const rect =
        targetEl.getBoundingClientRect();

      const targetProgress =
        0.08 +
        (index + 0.5) *
          (0.83 /
            products.length);

      const scrollTop =
        window.scrollY +
        rect.top +
        targetProgress *
          (rect.height -
            window.innerHeight);

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[1100vh]
        bg-[#F7F8FF]
        text-slate-950
      "
    >
      {/* ===================================================
          STICKY VIEWPORT
      =================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
        "
      >
        {/* =================================================
            BACKGROUND SYSTEM
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >
          {/* =================================================
              SOFT INDIGO AMBIENT GLOW

              IMPORTANT:
              No red/orange colors.
              Low opacity prevents heavy tint.
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[600px]
              w-[600px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              opacity-[0.10]
              blur-[150px]
              transition-colors
              duration-1000
              ease-in-out
              sm:h-[800px]
              sm:w-[800px]
            "
            style={{
              backgroundColor:
                activeProduct.accent,
            }}
          />

          {/* =================================================
              ICE BLUE GRID
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.20]

              [background-image:linear-gradient(rgba(79,70,229,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,.045)_1px,transparent_1px)]

              [background-size:64px_64px]
            "
          />

          {/* =================================================
              TOP FADE
          ================================================= */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              z-20
              h-32
              bg-gradient-to-b
              from-[#F7F8FF]
              via-[#F7F8FF]/80
              to-transparent
            "
          />

          {/* =================================================
              BOTTOM FADE
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-20
              h-32
              bg-gradient-to-t
              from-[#F7F8FF]
              via-[#F7F8FF]/80
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          className="
            absolute
            left-0
            right-0
            top-0
            z-50
            flex
            items-start
            justify-between
            px-6
            py-6
            sm:px-10
            sm:py-8
            lg:px-16
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
              >
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    opacity-75
                  "
                  style={{
                    backgroundColor:
                      activeProduct.accent,
                  }}
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      activeProduct.accent,
                  }}
                />
              </span>

              
            </div>

            
          </div>

          {/* DESKTOP SCROLL INDICATOR */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-full
              border
              border-slate-900/10
              bg-white/60
              px-4
              py-2
              shadow-sm
              backdrop-blur-md
              sm:flex
            "
          >
            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Scroll to explore
            </span>

            <motion.div
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown
                size={14}
                className="text-indigo-600"
                strokeWidth={2}
              />
            </motion.div>
          </div>
        </header>

        {/* ===================================================
            INTRO
        =================================================== */}

        <motion.div
          style={{
            opacity: introOpacity,
            y: introY,
          }}
          className="
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-6
          "
        >
          <div
            className="
              mx-auto
              max-w-4xl
              text-center
            "
          >
            {/* STATUS */}

            <div
              className="
                mx-auto
                mb-6
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-slate-900/10
                bg-white/90
                px-4
                py-1.5
                shadow-sm
                backdrop-blur-md
              "
            >
              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
              >
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-indigo-400
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-indigo-500
                  "
                />
              </span>

              <span
                className="
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-slate-800
                "
              >
                Featured Ecosystem
              </span>
            </div>

            {/* HEADLINE */}

            <h2
              className="
                text-[clamp(2.75rem,5.5vw,5.5rem)]
                font-black
                leading-[0.98]
                tracking-[-0.05em]
                text-slate-950
              "
            >
              Technology for{" "}
              <span
                className="
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3730A3 0%, #4F46E5 45%, #7C3AED 100%)",
                }}
              >
                every layer
              </span>{" "}
              of business.
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                font-medium
                leading-relaxed
                text-slate-600
                sm:text-lg
              "
            >
              Ten specialized software platforms
              built to solve real-world enterprise
              challenges, unified into one connected
              intelligent ecosystem.
            </p>

            {/* SCROLL CTA */}

            <div
              className="
                mt-8
                flex
                justify-center
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-900/10
                  bg-white/80
                  px-5
                  py-2.5
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:shadow-lg
                "
              >
                <span
                  className="
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-slate-700
                  "
                >
                  Scroll to explore
                </span>

                <motion.div
                  animate={{
                    y: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown
                    size={14}
                    className="text-indigo-600"
                    strokeWidth={2.5}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            CENTER TIMELINE (>= md)
        =================================================== */}

        <div
          className="
            absolute
            bottom-[10%]
            left-1/2
            top-[10%]
            z-10
            hidden
            w-px
            -translate-x-1/2
            bg-slate-900/10
            md:block
          "
        >
          <motion.div
            className="
              absolute
              left-0
              top-0
              w-full
              origin-top
            "
            style={{
              height:
                progressHeight,

              backgroundColor:
                activeProduct.accent,
            }}
          />
        </div>

        {/* ===================================================
            PRODUCT SCENES
        =================================================== */}

        <div
          className="
            absolute
            inset-0
          "
        >
          {products.map(
            (product, index) => (
              <ProductScene
                key={product.id}
                product={product}
                index={index}
                progress={progress}
              />
            )
          )}
        </div>

        {/* ===================================================
            BOTTOM HUD
        =================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-50
            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-2.5
          "
        >
          {/* DOT NAV */}

          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            {products.map(
              (product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    navigateToProduct(
                      index
                    )
                  }
                  title={product.name}
                  aria-label={`Go to ${product.name}`}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      index ===
                      activeIndex
                        ? "w-6"
                        : "w-1.5 bg-slate-950/20 hover:bg-slate-950/40"
                    }
                  `}
                  style={{
                    backgroundColor:
                      index ===
                      activeIndex
                        ? activeProduct.accent
                        : undefined,
                  }}
                />
              )
            )}
          </div>

          {/* PROGRESS */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                font-mono
                text-xs
                font-bold
              "
              style={{
                color:
                  activeProduct.accent,
              }}
            >
              {activeProduct.number}
            </span>

            <div
              className="
                h-1
                w-24
                overflow-hidden
                rounded-full
                bg-slate-950/10
                sm:w-36
              "
            >
              <motion.div
                className="
                  h-full
                  rounded-full
                "
                style={{
                  width: `${
                    ((activeIndex + 1) /
                      products.length) *
                    100
                  }%`,

                  backgroundColor:
                    activeProduct.accent,
                }}
              />
            </div>

            <span
              className="
                font-mono
                text-xs
                font-semibold
                text-slate-400
              "
            >
              10
            </span>
          </div>
        </div>

        {/* ===================================================
            SIDE SYSTEM LABEL
        =================================================== */}

        <div
          className="
            absolute
            bottom-7
            left-6
            z-40
            hidden
            items-center
            gap-2
            lg:flex
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
            "
            style={{
              backgroundColor:
                activeProduct.accent,
            }}
          />

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-slate-500
            "
          >
            System #
            {activeProduct.number}
            {" — "}
            {activeProduct.name}
          </p>
        </div>

        {/* ===================================================
            OUTRO
        =================================================== */}

        <motion.div
          style={{
            opacity:
              endingOpacity,

            scale:
              endingScale,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
            flex
            items-center
            justify-center
            bg-[#F7F8FF]/95
            px-6
            backdrop-blur-md
          "
        >
          <div
            className="
              text-center
            "
          >
            {/* BADGE */}

            <div
              className="
                mx-auto
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-900/10
                bg-white/80
                px-4
                py-1.5
                shadow-sm
                backdrop-blur-md
              "
            >
              <Sparkles
                size={13}
                className="text-indigo-500"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-slate-600
                "
              >
                10 Systems Integrated
              </span>
            </div>

            {/* FINAL HEADLINE */}

            <h2
              className="
                mt-4
                text-[clamp(3.5rem,11vw,11rem)]
                font-black
                leading-[0.78]
                tracking-[-0.09em]
                text-slate-950
              "
            >
              ONE
              <br />

              <span
                className="
                  bg-clip-text
                  text-transparent
                "
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3730A3 0%, #4F46E5 45%, #7C3AED 100%)",
                }}
              >
                NEIRAH
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-6
                max-w-md
                text-sm
                leading-6
                text-slate-600
                sm:text-base
              "
            >
              Many technologies. One connected
              ecosystem.
            </p>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}