"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Zap,
  ShieldCheck,
  Globe2,
  Activity,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  Orbit,
  Atom,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

export interface QuantumNodeSignal {
  id: string;
  code: string;
  client: string;
  role: string;
  company: string;
  avatarInitials: string;
  quoteLead: string;
  quoteHighlight: string;
  quoteEnd: string;
  category: string;
  accent: string;
  orbitAngle: number;
  metrics: {
    label: string;
    value: number;
  }[];
}

/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const QUANTUM_NODES: QuantumNodeSignal[] = [
  {
    id: "node-01",
    code: "NODE 01",
    client: "Alex Morgan",
    role: "Founder & CEO",
    company: "Nova Systems",
    avatarInitials: "AM",
    quoteLead: "They didn't just build the product.",
    quoteHighlight: "They understood the experience",
    quoteEnd: "and helped us see what was possible next.",
    category: "Product Architecture",
    accent: "#0ea5e9",
    orbitAngle: 0,
    metrics: [
      { label: "Thinking", value: 98 },
      { label: "UX", value: 96 },
      { label: "Velocity", value: 99 },
    ],
  },
  {
    id: "node-02",
    code: "NODE 02",
    client: "Maya Chen",
    role: "VP of Digital Product",
    company: "Orbit Labs",
    avatarInitials: "MC",
    quoteLead: "Complex enterprise systems became",
    quoteHighlight: "simple, intuitive & remarkably fluid.",
    quoteEnd: "The impact on our users was immediate.",
    category: "Experience Design",
    accent: "#6366f1",
    orbitAngle: 60,
    metrics: [
      { label: "Clarity", value: 99 },
      { label: "Simplicity", value: 97 },
      { label: "Adoption", value: 98 },
    ],
  },
  {
    id: "node-03",
    code: "NODE 03",
    client: "Daniel Silva",
    role: "Chief Technology Officer",
    company: "Vertex AI",
    avatarInitials: "DS",
    quoteLead: "What impressed us most was the thinking behind execution.",
    quoteHighlight: "Every interaction had a clear reason.",
    quoteEnd: "They set a new engineering benchmark.",
    category: "AI & Infrastructure",
    accent: "#8b5cf6",
    orbitAngle: 120,
    metrics: [
      { label: "Depth", value: 99 },
      { label: "Performance", value: 98 },
      { label: "Architecture", value: 97 },
    ],
  },
  {
    id: "node-04",
    code: "NODE 04",
    client: "Sofia Williams",
    role: "Creative Director",
    company: "Northstar Core",
    avatarInitials: "SW",
    quoteLead: "They transformed our strategic vision into something",
    quoteHighlight: "far more ambitious and cinematic",
    quoteEnd: "than we ever imagined.",
    category: "Creative Strategy",
    accent: "#06b6d4",
    orbitAngle: 180,
    metrics: [
      { label: "Vision", value: 100 },
      { label: "Craft", value: 98 },
      { label: "Originality", value: 99 },
    ],
  },
  {
    id: "node-05",
    code: "NODE 05",
    client: "Ryan Patel",
    role: "Managing Director",
    company: "Flux Commerce",
    avatarInitials: "RP",
    quoteLead: "The digital experience feels completely distinct.",
    quoteHighlight: "Built with extreme craft & precision.",
    quoteEnd: "Our users noticed the difference instantly.",
    category: "Digital Venture",
    accent: "#10b981",
    orbitAngle: 240,
    metrics: [
      { label: "Difference", value: 99 },
      { label: "Impact", value: 96 },
      { label: "Execution", value: 98 },
    ],
  },
  {
    id: "node-06",
    code: "NODE 06",
    client: "Emma Laurent",
    role: "Head of Innovation",
    company: "Aether Mesh",
    avatarInitials: "EL",
    quoteLead: "The team challenged every assumption,",
    quoteHighlight: "uncovered better technology paths",
    quoteEnd: "and delivered something truly iconic.",
    category: "Innovation Lab",
    accent: "#7c3aed",
    orbitAngle: 300,
    metrics: [
      { label: "Innovation", value: 100 },
      { label: "Problem Solving", value: 98 },
      { label: "User Love", value: 99 },
    ],
  },
];

const ORBIT_CYCLE_MS = 4500;

const QUANTUM_NODE_POSITIONS = QUANTUM_NODES.map((_, idx) => {
  const angleRad = ((idx * 60 - 90) * Math.PI) / 180;
  return {
    cosVal: Math.cos(angleRad),
    sinVal: Math.sin(angleRad),
  };
});

/* =========================================================
   MAIN
========================================================= */

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  const activeNode =
    QUANTUM_NODES[activeIndex] ?? QUANTUM_NODES[0];

  /* =======================================================
     AUTO ROTATION
  ======================================================= */

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const step = 50;
    const increment = (step / ORBIT_CYCLE_MS) * 100;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex(
            (current) =>
              (current + 1) % QUANTUM_NODES.length
          );

          return 0;
        }

        return prev + increment;
      });
    }, step);

    return () => window.clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  /* =======================================================
     CONTROLS
  ======================================================= */

  const handleSelectNode = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0
        ? QUANTUM_NODES.length - 1
        : prev - 1
    );

    setProgress(0);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex(
      (prev) => (prev + 1) % QUANTUM_NODES.length
    );

    setProgress(0);
  }, []);

  /* =======================================================
     ANIMATION
  ======================================================= */

  const quantumVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            duration: 0.25,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.15,
          },
        },
      };
    }

    return {
      initial: {
        opacity: 0,
        scale: 0.97,
        filter: "blur(10px)",
        y: 18,
      },

      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },

      exit: {
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
        y: -12,
        transition: {
          duration: 0.3,
          ease: [0.7, 0, 0.84, 0],
        },
      },
    };
  }, [shouldReduceMotion]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F8FBFF]
        px-4
        py-12
        text-slate-900
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-16
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        {/* Center aura */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: isPaused
                    ? 1.12
                    : 1,
                  opacity: isPaused
                    ? 0.14
                    : 0.08,
                }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[110px]
            sm:h-[500px]
            sm:w-[500px]
          "
          style={{
            backgroundColor: activeNode.accent,
          }}
        />

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            background:
              "radial-gradient(circle at center, transparent 20%, #F8FBFF 88%)",
          }}
        />
      </div>

      {/* ===================================================
          COMPACT CONTAINER
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
        "
      >
        {/* =================================================
            SMALL HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200/80
            pb-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Left */}

          <div className="flex items-center gap-2.5">
            <div className="relative h-2.5 w-2.5">
              <span
                className="
                  absolute
                  inset-0
                  animate-ping
                  rounded-full
                  opacity-50
                "
                style={{
                  backgroundColor:
                    activeNode.accent,
                }}
              />

              <span
                className="
                  relative
                  block
                  h-2.5
                  w-2.5
                  rounded-full
                "
                style={{
                  backgroundColor:
                    activeNode.accent,
                }}
              />
            </div>

            <Atom
              size={13}
              className="text-sky-500"
            />

            <span
              className="
                font-mono
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-500
                sm:text-[10px]
              "
            >
              Client Signals
            </span>

            <span className="text-[9px] text-slate-300">
              /
            </span>

            <span
              className="
                font-mono
                text-[9px]
                font-extrabold
                tracking-wider
                text-slate-900
                sm:text-[10px]
              "
            >
              {activeNode.code}
            </span>
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                items-center
                gap-1.5
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              <Orbit
                size={11}
                className="text-indigo-500"
              />

              <span className="hidden sm:inline">
                {isPaused
                  ? "Reading"
                  : "Live Signal"}
              </span>
            </div>

            <div
              className="
                relative
                h-1
                w-20
                overflow-hidden
                rounded-full
                bg-slate-200
                sm:w-28
              "
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor:
                    activeNode.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN COMPACT EXPERIENCE
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-7
            py-7
            sm:py-8
            lg:grid-cols-[250px_minmax(0,1fr)]
            lg:gap-10
          "
        >
          {/* ===============================================
              LEFT — SMALL ORBIT SYSTEM
          =============================================== */}

          <div
            className="
              relative
              flex
              min-h-[230px]
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200/70
              bg-white/60
              p-4
              shadow-[0_12px_50px_rgba(15,23,42,0.04)]
              backdrop-blur-xl
              sm:min-h-[260px]
              lg:min-h-[280px]
            "
          >
            {/* Orbital System */}

            <div
              className="
                relative
                flex
                h-[180px]
                w-[180px]
                items-center
                justify-center
                sm:h-[205px]
                sm:w-[205px]
                [--orbit-radius:76px]
                sm:[--orbit-radius:88px]
              "
            >
              {/* Ring 1 */}

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-dashed
                  border-sky-300/50
                "
              />

              {/* Ring 2 */}

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: -360,
                      }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-5
                  rounded-full
                  border
                  border-indigo-300/40
                "
              />

              {/* Ring 3 */}

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-10
                  rounded-full
                  border
                  border-slate-200
                "
              />

              {/* Core */}

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [0.95, 1.04, 0.95],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white
                  shadow-[0_12px_35px_rgba(14,165,233,0.2)]
                  sm:h-20
                  sm:w-20
                "
                style={{
                  background:
                    `radial-gradient(circle at 35% 30%, #ffffff 0%, ${activeNode.accent}55 45%, ${activeNode.accent} 100%)`,
                }}
              >
                <Cpu
                  size={22}
                  className="
                    text-white
                    drop-shadow-md
                  "
                />
              </motion.div>

              {/* Nodes */}

              {QUANTUM_NODES.map(
                (node, idx) => {
                  const isSelected =
                    idx === activeIndex;

                  const pos =
                    QUANTUM_NODE_POSITIONS[idx];

                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      aria-label={`Select ${node.code}`}
                      onClick={() =>
                        handleSelectNode(idx)
                      }
                      animate={{
                        scale: isSelected
                          ? 1.18
                          : 1,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      style={{
                        x: `calc(var(--orbit-radius) * ${pos.cosVal})`,
                        y: `calc(var(--orbit-radius) * ${pos.sinVal})`,
                      }}
                      className="
                        absolute
                        flex
                        h-6
                        w-6
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        font-mono
                        text-[8px]
                        font-bold
                        sm:h-7
                        sm:w-7
                        sm:text-[9px]
                      "
                    >
                      <span
                        className={`
                          absolute
                          inset-0
                          rounded-full
                          ${
                            isSelected
                              ? "bg-slate-900 ring-2 ring-sky-400/40"
                              : "border border-slate-200 bg-white"
                          }
                        `}
                      />

                      <span
                        className={`
                          relative
                          z-10
                          ${
                            isSelected
                              ? "text-white"
                              : "text-slate-600"
                          }
                        `}
                      >
                        {idx + 1}
                      </span>
                    </motion.button>
                  );
                }
              )}
            </div>

            {/* Node Label */}

            <div
              className="
                absolute
                bottom-3
                left-1/2
                flex
                -translate-x-1/2
                items-center
                gap-1.5
                whitespace-nowrap
                rounded-full
                border
                border-slate-200/70
                bg-white/90
                px-2.5
                py-1
                font-mono
                text-[8px]
                shadow-sm
              "
            >
              <Atom
                size={9}
                style={{
                  color: activeNode.accent,
                }}
              />

              <span className="font-bold text-slate-900">
                {activeNode.code}
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-slate-500">
                {activeNode.company}
              </span>
            </div>
          </div>

          {/* ===============================================
              RIGHT — COMPACT TESTIMONIAL
          =============================================== */}

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                variants={quantumVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="
                  mx-auto
                  max-w-2xl
                "
              >
                {/* Signal Meta */}

                <div
                  className="
                    mb-3
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      px-2.5
                      py-1
                      shadow-sm
                    "
                  >
                    <Terminal
                      size={10}
                      style={{
                        color:
                          activeNode.accent,
                      }}
                    />

                    <span
                      className="
                        font-mono
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-700
                      "
                    >
                      {activeNode.category}
                    </span>
                  </div>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      font-mono
                      text-[8px]
                      text-slate-400
                    "
                  >
                    <Globe2 size={9} />

                    VERIFIED SIGNAL
                  </span>
                </div>

                {/* Small Testimonial */}

                <blockquote
                  className="
                    font-display
                    text-[17px]
                    font-extrabold
                    leading-[1.35]
                    tracking-tight
                    text-slate-900
                    sm:text-[20px]
                    md:text-[23px]
                  "
                >
                  “{activeNode.quoteLead}{" "}

                  <span
                    className="
                      bg-gradient-to-r
                      from-sky-500
                      via-indigo-500
                      to-violet-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    {activeNode.quoteHighlight}
                  </span>{" "}

                  {activeNode.quoteEnd}”
                </blockquote>

                {/* Small Metrics */}

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-3
                    gap-2
                    sm:max-w-md
                  "
                >
                  {activeNode.metrics.map(
                    (metric) => (
                      <div
                        key={metric.label}
                        className="
                          rounded-lg
                          border
                          border-slate-200/80
                          bg-white/70
                          px-2
                          py-2
                          text-center
                        "
                      >
                        <div
                          className="
                            font-display
                            text-sm
                            font-extrabold
                            sm:text-base
                          "
                          style={{
                            color:
                              activeNode.accent,
                          }}
                        >
                          {metric.value}%
                        </div>

                        <div
                          className="
                            mt-0.5
                            truncate
                            font-mono
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                            sm:text-[8px]
                          "
                        >
                          {metric.label}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Identity */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-[9px]
                      font-bold
                      text-white
                      shadow-sm
                    "
                    style={{
                      background:
                        `linear-gradient(135deg, ${activeNode.accent}, #1E1B4B)`,
                    }}
                  >
                    {activeNode.avatarInitials}
                  </div>

                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        items-center
                        gap-1
                      "
                    >
                      <h3
                        className="
                          truncate
                          font-display
                          text-xs
                          font-bold
                          text-slate-900
                        "
                      >
                        {activeNode.client}
                      </h3>

                      <ShieldCheck
                        size={11}
                        className="shrink-0 text-sky-500"
                      />
                    </div>

                    <p
                      className="
                        truncate
                        text-[8px]
                        text-slate-400
                        sm:text-[9px]
                      "
                    >
                      {activeNode.role}

                      <span className="mx-1 text-slate-300">
                        •
                      </span>

                      <span className="font-semibold text-slate-600">
                        {activeNode.company}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Signal Line */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      h-px
                      w-10
                      bg-gradient-to-r
                      from-sky-500
                      to-transparent
                    "
                  />

                  <Zap
                    size={9}
                    style={{
                      color:
                        activeNode.accent,
                    }}
                  />

                  <span
                    className="
                      font-mono
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-slate-400
                    "
                  >
                    Digital Signal Verified
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =================================================
            FOOTER / NODE SELECTOR
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-slate-200/80
            pt-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Arrows */}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <ChevronLeft size={13} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-600
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Node Selector */}

          <div
            className="
              flex
              max-w-full
              items-center
              gap-1.5
              overflow-x-auto
              py-0.5
              no-scrollbar
            "
          >
            {QUANTUM_NODES.map(
              (node, idx) => {
                const isActive =
                  idx === activeIndex;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() =>
                      handleSelectNode(idx)
                    }
                    className={`
                      flex
                      shrink-0
                      cursor-pointer
                      items-center
                      gap-1
                      rounded-full
                      px-2
                      py-1
                      font-mono
                      text-[7px]
                      font-bold
                      transition-all
                      duration-300
                      sm:text-[8px]
                      ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-500 hover:text-slate-900"
                      }
                    `}
                  >
                    {isActive && (
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                        "
                        style={{
                          backgroundColor:
                            node.accent,
                        }}
                      />
                    )}

                    <span>
                      {String(idx + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Status */}

          <div
            className="
              hidden
              items-center
              gap-1.5
              font-mono
              text-[8px]
              font-semibold
              uppercase
              tracking-wider
              text-slate-400
              lg:flex
            "
          >
            <Activity
              size={10}
              className="text-emerald-500"
            />

            <span>Signal Locked</span>
          </div>
        </div>
      </div>

      {/* ===================================================
          SMALL BOTTOM DECORATION
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-px
          w-1/2
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-sky-200
          to-transparent
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-20
          w-1/2
          -translate-x-1/2
          bg-sky-400/5
          blur-3xl
        "
      />
    </section>
  );
}