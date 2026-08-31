"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";

import Link from "next/link";
import RevealText from "../ui/RevealText";

import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Palette,
  Smartphone,
  Zap,
  Wrench,
  MousePointer2,
  Sparkles,
  Eye,
  Code2,
  Braces,
  Terminal,
  PenTool,
  Component,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   DATA
========================================================= */

const principles = [
  {
    icon: Palette,
    number: "01",
    title: "Visual Design",
    description:
      "We create visual systems that make your brand feel clear, memorable, and unmistakably yours.",
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,.35)",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Responsive Experience",
    description:
      "Every interaction adapts naturally across mobile, tablet, desktop, and everything between.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,.35)",
  },
  {
    icon: Zap,
    number: "03",
    title: "Motion & Interaction",
    description:
      "Purposeful motion guides attention, creates feedback, and turns ordinary interfaces into experiences.",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,.35)",
  },
  {
    icon: Wrench,
    number: "04",
    title: "Built Around People",
    description:
      "We connect design decisions with real users, business goals, and measurable outcomes.",
    accent: "#2563EB",
    glow: "rgba(37,99,235,.35)",
  },
];

const projectImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1800&q=90",
];

const projectNames = [
  "Aurelia",
  "Velora",
  "Mira",
  "Novera",
  "Lunara",
  "Arden",
  "Solenne",
  "Veyra",
  "Elara",
  "Orbis",
  "Nexa",
  "Aster",
  "Monument",
  "Verve",
  "Sonder",
  "Alora",
  "Cinder",
  "Morrow",
  "Vanta",
  "Oriel",
];

const projectCategories = [
  "Digital Experience",
  "E-Commerce",
  "SaaS",
  "Fintech",
  "Healthcare",
  "Hospitality",
  "Real Estate",
  "Technology",
  "Education",
  "Travel",
  "Business",
  "AI Platform",
];

const projectLocations = [
  "Colombo, Sri Lanka",
  "London, UK",
  "Dubai, UAE",
  "Singapore",
  "Melbourne, Australia",
  "Berlin, Germany",
  "Toronto, Canada",
  "Amsterdam, Netherlands",
];

const projectTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "AI",
  "SaaS",
  "IoT",
  "Web Platform",
];

const projects = Array.from({ length: 120 }, (_, index) => {
  const imageIndex = index % projectImages.length;
  const nameIndex = index % projectNames.length;
  const categoryIndex = index % projectCategories.length;
  const locationIndex = index % projectLocations.length;
  const technologyIndex = index % projectTechnologies.length;

  return {
    id: index + 1,
    number: String(index + 1).padStart(3, "0"),
    title:
      index < 20
        ? projectNames[nameIndex]
        : `${projectNames[nameIndex]} ${Math.floor(index / 20) + 1}`,
    category: projectCategories[categoryIndex],
    location: projectLocations[locationIndex],
    technology: projectTechnologies[technologyIndex],
    image: projectImages[imageIndex],
    year: index < 24 ? "2026" : "2025",
  };
});

/* =========================================================
   MAIN
========================================================= */

export default function UIUXLab() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
  });

  const rotateX = useTransform(smoothY, [-500, 500], [7, -7]);
  const rotateY = useTransform(smoothX, [-700, 700], [-7, 7]);

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "15%"]
  );

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      e.clientX - rect.left - rect.width / 2
    );

    mouseY.set(
      e.clientY - rect.top - rect.height / 2
    );
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="uiux-lab"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        overflow-hidden
        bg-[#F8FBFF]
        text-[#0F172A]
      "
    >
      {/* =====================================================
          MOVING BACKGROUND
      ===================================================== */}

      <motion.div
        style={{ y: backgroundY }}
        className="
          pointer-events-none
          absolute
          -inset-[10%]
          bg-[#F8FBFF]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.35]
          bg-[linear-gradient(rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.055)_1px,transparent_1px)]
          bg-[size:70px_70px]
        "
      />

      {/* =====================================================
          AMBIENT ORBS
      ===================================================== */}

      <AmbientOrb
        className="
          -left-[180px]
          top-[8%]
          h-[500px]
          w-[500px]
          bg-cyan-300/20
        "
        duration={17}
      />

      <AmbientOrb
        className="
          -right-[180px]
          top-[30%]
          h-[550px]
          w-[550px]
          bg-indigo-300/20
        "
        duration={21}
        reverse
      />

      <AmbientOrb
        className="
          left-[25%]
          bottom-[8%]
          h-[420px]
          w-[420px]
          bg-sky-300/15
        "
        duration={19}
      />

      {/* PARTICLES */}

      <FloatingBubble
        className="left-[8%] top-[18%]"
        size="h-3 w-3"
        duration={8}
      />

      <FloatingBubble
        className="left-[30%] top-[42%]"
        size="h-2 w-2"
        duration={10}
      />

      <FloatingBubble
        className="right-[12%] top-[25%]"
        size="h-4 w-4"
        duration={11}
      />

      <FloatingBubble
        className="right-[28%] top-[62%]"
        size="h-2.5 w-2.5"
        duration={9}
      />

      <FloatingBubble
        className="left-[15%] bottom-[20%]"
        size="h-2 w-2"
        duration={12}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          py-24
          sm:px-6
          sm:py-32
          lg:px-8
        "
      >
        {/* ===================================================
            HERO
        =================================================== */}

        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-16
          "
        >
          {/* LEFT — COPY */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              flex
              flex-col
              items-start
              text-left
              w-full
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-sky-200
                bg-white/70
                px-4
                py-2.5
                text-xs
                font-black
                tracking-wide
                text-blue-600
                shadow-[0_10px_40px_rgba(14,165,233,.08)]
                backdrop-blur-xl
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="
                    absolute
                    inset-0
                    animate-ping
                    rounded-full
                    bg-cyan-400
                    opacity-70
                  "
                />

                <span
                  className="
                    relative
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-sky-500
                  "
                />
              </span>

              UI / UX LAB
            </div>

            <h2
              className="
                mt-8
                text-center
                mx-auto
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.04em]
                sm:text-5xl
                md:text-6xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              <RevealText text="We don't just" mode="viewport" stagger={0.07} duration={0.6} blurAmount={7} />

              <span className="block">
                <RevealText text="design screens." mode="viewport" delay={0.2} stagger={0.07} duration={0.6} blurAmount={7} />
              </span>

              <span
                className="
                  mt-2
                  block
                  bg-gradient-to-r
                  from-sky-500
                  via-cyan-400
                  to-indigo-500
                  bg-clip-text
                  text-transparent
                "
              >
                <RevealText text="We design experiences." mode="viewport" delay={0.4} stagger={0.07} duration={0.6} blurAmount={7} />
              </span>
            </h2>

            <RevealText
              as="p"
              mode="viewport"
              delay={0.65}
              stagger={0.035}
              duration={0.5}
              blurAmount={4}
              yOffset="80%"
              className="
                mt-7
                text-left
                max-w-xl
                text-base
                leading-8
                text-slate-500
                sm:text-lg
              "
            >
              From the first click to the final conversion, we design digital experiences that are beautiful, intuitive, and built around how real people interact with your business.
            </RevealText>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-start gap-3 relative z-20 w-full sm:w-auto">
              <Link
                href="/projects"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-sky-500
                  to-blue-600
                  px-7
                  py-4
                  font-bold
                  text-white
                  shadow-[0_18px_45px_rgba(14,165,233,.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_50px_rgba(14,165,233,.35)]
                  active:translate-y-0
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                  cursor-pointer
                  pointer-events-auto
                "
              >
                <span>Explore Our Work</span>

                <ArrowUpRight
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    pointer-events-none
                  "
                />
              </Link>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("design-process")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                  rounded-full
                  border
                  border-sky-200
                  bg-white/70
                  px-7
                  py-4
                  font-semibold
                  text-blue-600
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:-translate-y-0.5
                  active:translate-y-0
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                  cursor-pointer
                  pointer-events-auto
                "
              >
                Our Process
              </button>
            </div>

            <div
              className="
                mt-11
                grid
                grid-cols-2
                gap-6
                border-t
                border-slate-200
                pt-7
                sm:grid-cols-4
                w-full
                text-left
              "
            >
              <Stat value="30+" label="Websites" />
              <Stat value="7+" label="Industries" />
              <Stat value="98%" label="Satisfaction" />
              <Stat value="11+" label="Years" />
            </div>
          </motion.div>

          {/* =================================================
              RIGHT — CODE DRAWING EXPERIENCE
          ================================================= */}

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
            initial={{
              opacity: 0,
              scale: 0.88,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              mx-auto
              h-[470px]
              w-full
              max-w-[620px]
              sm:h-[550px]
            "
          >
            <div
              className="
                absolute
                inset-16
                rounded-full
                bg-sky-400/20
                blur-[110px]
              "
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[380px]
                w-[380px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-dashed
                border-sky-200
                sm:h-[450px]
                sm:w-[450px]
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[270px]
                w-[270px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-indigo-200/70
                sm:h-[330px]
                sm:w-[330px]
              "
            />

            {/* MAIN GLASS */}

            <div
              className="
                absolute
                inset-2
                overflow-hidden
                rounded-[35px]
                border
                border-white
                bg-white/60
                shadow-[0_35px_100px_rgba(15,23,42,.13)]
                backdrop-blur-2xl
                sm:inset-6
                sm:rounded-[42px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-200/80
                  bg-white/50
                  px-5
                  py-4
                  sm:px-7
                  sm:py-5
                "
              >
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-1.5
                    text-[10px]
                    font-bold
                    text-slate-400
                  "
                >
                  neirahtech.design
                </div>

                <div className="w-10" />
              </div>

              <div
                className="
                  relative
                  h-[calc(100%-65px)]
                  overflow-hidden
                  p-4
                  sm:p-8
                "
              >
                {/* ==========================================
                    NEW CODE → UI DRAWING ANIMATION
                ========================================== */}

                <CodeDrawingVisual />

                {/* FLOWING CONNECTION */}

                <svg
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                    opacity-60
                  "
                  viewBox="0 0 600 450"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="
                      M -30 360
                      C 100 180 150 430 260 250
                      C 350 100 380 300 470 170
                      C 520 100 570 150 630 80
                    "
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="7 14"
                    animate={{
                      strokeDashoffset: [0, -120],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>

                <FloatingTag
                  icon={Eye}
                  text="User First"
                  className="
                    bottom-8
                    left-3
                    sm:bottom-16
                    sm:left-8
                  "
                  delay={0}
                />

                <FloatingTag
                  icon={Sparkles}
                  text="Pixel Perfect"
                  className="
                    right-3
                    top-20
                    sm:right-8
                    sm:top-28
                  "
                  delay={0.8}
                />

                <motion.div
                  animate={{
                    x: [0, 80, 30, 110, 0],
                    y: [0, -40, 50, 15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    left-[30%]
                    top-[42%]
                    z-40
                  "
                >
                  <MousePointer2
                    size={28}
                    fill="#0F172A"
                    className="text-[#0F172A] drop-shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <DesignJourney />

        <SelectedWork />
      </div>
    </section>
  );
}

/* =========================================================
   CODE DRAWING VISUAL
   ---------------------------------------------------------
   The UI is "drawn" progressively from code:
   1. Terminal/code appears
   2. code lines type in
   3. connector line draws
   4. browser frame draws
   5. UI cards reveal
   6. cursor interacts with result
========================================================= */

function CodeDrawingVisual() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCycle((value) => value + 1);
    }, 11500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* CODE PANEL */}

      <motion.div
        key={`code-${cycle}`}
        initial={{ opacity: 0, x: -30, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          left-3
          top-8
          z-30
          w-[210px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-[#0F172A]/95
          shadow-[0_30px_70px_rgba(15,23,42,.24)]
          sm:left-5
          sm:top-10
          sm:w-[250px]
        "
      >
        {/* TERMINAL HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">
            <Terminal size={10} />
            code.tsx
          </div>
        </div>

        {/* CODE */}

        <div className="space-y-2 px-4 py-4 font-mono text-[8px] leading-none sm:text-[9px]">
          <CodeLine
            delay={0.2}
            number="01"
            parts={[
              ["text-indigo-300", "const"],
              ["text-white", " App"],
              ["text-cyan-300", " ="],
              ["text-white", " ()"],
              ["text-slate-400", " =>"],
            ]}
          />

          <CodeLine
            delay={0.45}
            number="02"
            parts={[
              ["text-white", "  return "],
              ["text-pink-300", "<main>"],
            ]}
          />

          <CodeLine
            delay={0.7}
            number="03"
            parts={[
              ["text-white", "    <"],
              ["text-sky-300", "Hero"],
              ["text-white", " "],
              ["text-cyan-300", "animate"],
              ["text-white", " />"],
            ]}
          />

          <CodeLine
            delay={0.95}
            number="04"
            parts={[
              ["text-white", "    <"],
              ["text-violet-300", "Card"],
              ["text-white", " "],
              ["text-cyan-300", "interactive"],
              ["text-white", " />"],
            ]}
          />

          <CodeLine
            delay={1.2}
            number="05"
            parts={[
              ["text-white", "    <"],
              ["text-indigo-300", "Button"],
              ["text-white", " />"],
            ]}
          />

          <CodeLine
            delay={1.45}
            number="06"
            parts={[
              ["text-white", "  </"],
              ["text-pink-300", "main"],
              ["text-white", ">"],
            ]}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 1.7,
              duration: 0.9,
              repeat: Infinity,
            }}
            className="ml-7 h-2 w-px bg-cyan-300"
          />
        </div>

        {/* BUILD STATUS */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="
            flex
            items-center
            gap-2
            border-t
            border-white/10
            px-4
            py-2.5
            text-[8px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-cyan-300
          "
        >
          <motion.span
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          />

          compiling experience...
        </motion.div>
      </motion.div>

      {/* CODE → DESIGN CONNECTION */}

      <svg
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          h-full
          w-full
        "
        viewBox="0 0 600 450"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 205 150 C 245 150, 235 210, 285 210"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="5 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.3, 0.75, 1],
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="285"
          cy="210"
          r="4"
          fill="#38BDF8"
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.3, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* RESULT BROWSER */}

      <motion.div
        key={`browser-${cycle}`}
        initial={{
          opacity: 0,
          scale: 0.82,
          x: 35,
          y: 35,
          rotate: 5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 0,
        }}
        transition={{
          delay: 2,
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          bottom-8
          right-3
          z-30
          h-[250px]
          w-[255px]
          overflow-hidden
          rounded-[24px]
          border
          border-white
          bg-white/95
          shadow-[0_35px_80px_rgba(15,23,42,.18)]
          sm:bottom-10
          sm:right-8
          sm:h-[285px]
          sm:w-[310px]
        "
      >
        {/* BROWSER BAR */}

        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="rounded-full bg-slate-50 px-4 py-1 text-[7px] font-bold text-slate-300">
            live-preview.app
          </div>

          <div className="w-5" />
        </div>

        {/* DRAWN UI */}

        <div className="relative h-[calc(100%-38px)] overflow-hidden bg-[#F8FBFF] p-4">
          {/* background grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
              bg-[linear-gradient(rgba(14,165,233,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.06)_1px,transparent_1px)]
              bg-[size:20px_20px]
            "
          />

          {/* NAV */}

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 2.35, duration: 0.7 }}
            className="relative z-10 flex items-center justify-between"
          >
            <div className="h-3 w-14 rounded-full bg-slate-900" />

            <div className="flex gap-2">
              <div className="h-2 w-8 rounded-full bg-slate-200" />
              <div className="h-2 w-8 rounded-full bg-slate-200" />
              <div className="h-2 w-8 rounded-full bg-sky-300" />
            </div>
          </motion.div>

          {/* HERO TITLE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              clipPath: "inset(100% 0 0 0)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0 0 0)",
            }}
            transition={{
              delay: 2.55,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 mt-7"
          >
            <div className="h-4 w-[72%] rounded bg-slate-900" />
            <div className="mt-2 h-4 w-[52%] rounded bg-gradient-to-r from-sky-500 to-indigo-500" />

            <div className="mt-3 h-2 w-[82%] rounded bg-slate-200" />
            <div className="mt-1.5 h-2 w-[65%] rounded bg-slate-100" />
          </motion.div>

          {/* BUTTON */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 3,
              type: "spring",
              stiffness: 220,
              damping: 16,
            }}
            className="
              relative
              z-10
              mt-5
              inline-flex
              rounded-full
              bg-gradient-to-r
              from-sky-500
              to-blue-600
              px-4
              py-2
              text-[7px]
              font-bold
              text-white
              shadow-lg
              shadow-sky-500/20
            "
          >
            Explore
          </motion.div>

          {/* CARDS */}

          <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 3.15 + index * 0.18,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  h-16
                  rounded-xl
                  border
                  border-white
                  bg-white
                  p-2
                  shadow-sm
                "
              >
                <div
                  className={`h-5 rounded-lg ${
                    index === 0
                      ? "bg-sky-100"
                      : index === 1
                      ? "bg-indigo-100"
                      : "bg-cyan-100"
                  }`}
                />

                <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-100" />
                <div className="mt-1 h-1.5 w-1/2 rounded bg-slate-100" />
              </motion.div>
            ))}
          </div>

          {/* CURSOR */}

          <motion.div
            animate={{
              x: [0, 45, 80, 40, 0],
              y: [0, 20, 60, 100, 0],
            }}
            transition={{
              delay: 3.8,
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[58%] top-[35%] z-30"
          >
            <MousePointerClick
              size={22}
              fill="#0F172A"
              className="text-[#0F172A] drop-shadow-lg"
            />

            <motion.span
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                delay: 4.7,
                duration: 1,
                repeat: Infinity,
              }}
              className="
                absolute
                -left-2
                -top-2
                h-8
                w-8
                rounded-full
                border
                border-sky-400
              "
            />
          </motion.div>
        </div>
      </motion.div>

      {/* CENTER DESIGN CORE */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-40
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <div
          className="
            relative
            flex
            h-[100px]
            w-[100px]
            items-center
            justify-center
            rounded-[28px]
            border
            border-sky-200
            bg-white/90
            shadow-[0_30px_80px_rgba(14,165,233,.18)]
            backdrop-blur-xl
            sm:h-[120px]
            sm:w-[120px]
          "
        >
          <div
            className="
              absolute
              -inset-4
              -z-10
              rounded-[40px]
              bg-cyan-300/20
              blur-2xl
            "
          />

          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -inset-4
                rounded-full
                border
                border-dashed
                border-sky-300
              "
            />

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-sky-500
                to-indigo-500
                text-white
                shadow-lg
                sm:h-14
                sm:w-14
              "
            >
              <Component size={25} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* SMALL CODE BADGES */}

      <FloatingCodeBadge
        icon={Braces}
        text="<UI />"
        className="right-5 top-8 sm:right-12 sm:top-12"
        delay={0}
      />

      <FloatingCodeBadge
        icon={Code2}
        text="motion"
        className="left-5 bottom-12 sm:left-12 sm:bottom-16"
        delay={1}
      />

      <FloatingCodeBadge
        icon={PenTool}
        text="design"
        className="right-[27%] bottom-[24%]"
        delay={1.8}
      />
    </div>
  );
}

/* =========================================================
   CODE LINE
========================================================= */

function CodeLine({
  number,
  parts,
  delay,
}: {
  number: string;
  parts: [string, string][];
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -12,
        clipPath: "inset(0 100% 0 0)",
      }}
      animate={{
        opacity: 1,
        x: 0,
        clipPath: "inset(0 0% 0 0)",
      }}
      transition={{
        delay,
        duration: 0.65,
        ease: "easeOut",
      }}
      className="flex gap-3 whitespace-nowrap"
    >
      <span className="w-4 select-none text-right text-white/20">
        {number}
      </span>

      <span>
        {parts.map(([color, text], index) => (
          <span key={`${text}-${index}`} className={color}>
            {text}
          </span>
        ))}
      </span>
    </motion.div>
  );
}

/* =========================================================
   FLOATING CODE BADGE
========================================================= */

function FloatingCodeBadge({
  icon: Icon,
  text,
  className,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        z-50
        flex
        items-center
        gap-2
        rounded-full
        border
        border-sky-200
        bg-white/90
        px-3
        py-2
        font-mono
        text-[9px]
        font-bold
        text-sky-600
        shadow-[0_15px_35px_rgba(14,165,233,.12)]
        backdrop-blur-xl
        ${className}
      `}
    >
      <Icon size={12} className="text-indigo-500" />
      {text}
    </motion.div>
  );
}

/* =========================================================
   DESIGN JOURNEY
========================================================= */

function DesignJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section
      id="design-process"
      ref={journeyRef}
      className="
        relative
        scroll-mt-24
        mt-40
        min-h-[1900px]
        sm:mt-52
        lg:mt-60
      "
    >
      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            inline-flex
            items-center
            gap-3
            text-xs
            font-black
            uppercase
            tracking-[0.3em]
            text-sky-500
          "
        >
          <span className="h-px w-8 bg-sky-400" />

          HOW WE DESIGN

          <span className="h-px w-8 bg-sky-400" />
        </motion.span>

        <h3
          className="
            mt-6
            text-4xl
            font-black
            leading-[1.03]
            tracking-[-0.04em]
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Scroll through

          <span
            className="
              block
              bg-gradient-to-r
              from-sky-500
              via-cyan-400
              to-indigo-500
              bg-clip-text
              text-transparent
            "
          >
            our design thinking.
          </span>
        </h3>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-slate-500
            sm:text-lg
          "
        >
          Each layer appears from a different direction,
          revealing another part of the experience as you
          move through the section.
        </p>
      </div>

      <div
        className="
          relative
          mx-auto
          mt-24
          max-w-6xl
          sm:mt-32
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent
            via-sky-200
            to-transparent
          "
        />

        <motion.div
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[3px]
            -translate-x-1/2
            rounded-full
            bg-gradient-to-b
            from-sky-400
            via-cyan-400
            to-indigo-500
            shadow-[0_0_20px_rgba(14,165,233,.45)]
          "
        />

        <JourneyOrb progress={scrollYProgress} top="18%" />
        <JourneyOrb progress={scrollYProgress} top="42%" />
        <JourneyOrb progress={scrollYProgress} top="67%" />
        <JourneyOrb progress={scrollYProgress} top="90%" />

        <div className="relative space-y-44 sm:space-y-56">
          {principles.map((item, index) => (
            <JourneyCard
              key={item.number}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JOURNEY CARD
========================================================= */

function JourneyCard({
  item,
  index,
}: {
  item: (typeof principles)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -160 : 160,
        rotateY: isLeft ? -18 : 18,
        rotateZ: isLeft ? -3 : 3,
        scale: 0.85,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.35,
      }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative
        grid
        min-h-[330px]
        items-center
        lg:grid-cols-2
      "
      style={{
        perspective: 1200,
      }}
    >
      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-30
          hidden
          -translate-x-1/2
          -translate-y-1/2
          lg:block
        "
      >
        <motion.div
          whileInView={{
            scale: [0.7, 1.15, 1],
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-white
            text-xs
            font-black
            text-sky-500
            shadow-[0_0_35px_rgba(14,165,233,.2)]
          "
        >
          <span
            className="
              absolute
              -inset-2
              rounded-full
              border
              border-sky-200
              opacity-70
            "
          />

          {item.number}
        </motion.div>
      </div>

      <div
        className={`
          relative
          flex
          items-center
          justify-center
          ${isLeft ? "lg:order-1" : "lg:order-2"}
        `}
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-72 w-72 rounded-full blur-[80px]"
          style={{
            background: item.glow,
          }}
        />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18 + index * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            h-[280px]
            w-[280px]
            rounded-full
            border
            border-dashed
            border-sky-200
            sm:h-[350px]
            sm:w-[350px]
          "
        />

        <motion.div
          whileHover={{
            scale: 1.04,
            rotateX: 4,
            rotateY: -4,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 20,
          }}
          className="
            relative
            z-10
            h-[250px]
            w-[280px]
            overflow-hidden
            rounded-[35px]
            border
            border-white
            bg-white/75
            shadow-[0_35px_90px_rgba(15,23,42,.13)]
            backdrop-blur-2xl
            sm:h-[290px]
            sm:w-[340px]
          "
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${item.glow}, transparent 55%)`,
            }}
          />

          <div className="absolute inset-8">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-4
                top-6
                h-24
                w-40
                rounded-2xl
                border
                border-white
                bg-white/80
                p-4
                shadow-xl
              "
            >
              <div
                className="h-2 w-16 rounded-full"
                style={{
                  background: item.accent,
                }}
              />

              <div className="mt-3 h-2 w-24 rounded-full bg-slate-200" />

              <div className="mt-4 flex gap-2">
                <div className="h-7 flex-1 rounded-lg bg-slate-100" />
                <div
                  className="h-7 flex-1 rounded-lg opacity-30"
                  style={{
                    background: item.accent,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [3, 6, 3],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-4
                right-2
                h-36
                w-24
                rounded-[22px]
                border
                border-white
                bg-white/90
                p-3
                shadow-2xl
              "
            >
              <div className="mx-auto h-1.5 w-7 rounded-full bg-slate-200" />

              <div
                className="
                  mt-4
                  h-12
                  rounded-xl
                  opacity-30
                "
                style={{
                  background: item.accent,
                }}
              />

              <div className="mt-3 h-2 w-12 rounded bg-slate-200" />

              <div className="mt-2 h-2 w-16 rounded bg-slate-100" />

              <div
                className="
                  mt-4
                  h-7
                  rounded-lg
                  opacity-30
                "
                style={{
                  background: item.accent,
                }}
              />
            </motion.div>
          </div>

          <motion.span
            animate={{
              y: [0, -18, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              right-8
              top-8
              h-4
              w-4
              rounded-full
            "
            style={{
              background: item.accent,
              boxShadow: `0 0 30px ${item.glow}`,
            }}
          />

          <motion.span
            animate={{
              y: [0, 14, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              bottom-8
              left-8
              h-2.5
              w-2.5
              rounded-full
            "
            style={{
              background: item.accent,
              boxShadow: `0 0 25px ${item.glow}`,
            }}
          />
        </motion.div>
      </div>

      <div
        className={`
          relative
          z-20
          mt-10
          flex
          flex-col
          items-center
          text-center
          mx-auto
          max-w-lg
          lg:max-w-none
          ${isLeft ? "lg:order-2 lg:pl-16" : "lg:order-1 lg:pr-16"}
        `}
      >
        <div
          className="
            mb-5
            flex
            items-center
            gap-3
            lg:hidden
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-xs
              font-black
              text-sky-500
              shadow-lg
            "
          >
            {item.number}
          </span>

          <span className="h-px flex-1 bg-sky-100" />
        </div>

        <span
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.25em]
            text-sky-500
          "
        >
          {item.number} / DESIGN PRINCIPLE
        </span>

        <h4
          className="
            mt-4
            text-4xl
            font-black
            tracking-[-0.03em]
            text-slate-900
            sm:text-5xl
          "
        >
          {item.title}
        </h4>

        <p
          className="
            mt-5
            max-w-md
            text-base
            leading-8
            text-slate-500
            sm:text-lg
          "
        >
          {item.description}
        </p>

        <div
          className="
            mt-7
            h-1
            w-16
            rounded-full
            mx-auto
          "
          style={{
            background: `linear-gradient(90deg, ${item.accent}, transparent)`,
          }}
        />

        <div className="mt-8 flex items-center justify-center gap-3 text-sm font-bold text-slate-400 mx-auto">
          <span
            className="
              h-2
              w-2
              rounded-full
            "
            style={{
              background: item.accent,
              boxShadow: `0 0 15px ${item.glow}`,
            }}
          />

          Scroll to discover
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   JOURNEY ORB
========================================================= */

function JourneyOrb({
  progress,
  top,
}: {
  progress: MotionValue<number>;
  top: string;
}) {
  const opacity = useTransform(
    progress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.3, 1, 1, 1, 0.3]
  );

  const scale = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.7, 1.25, 1, 1.25, 0.7]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        top,
      }}
      className="
        absolute
        left-1/2
        z-20
        hidden
        h-4
        w-4
        -translate-x-1/2
        rounded-full
        bg-cyan-400
        shadow-[0_0_30px_rgba(34,211,238,.9)]
        lg:block
      "
    />
  );
}

/* =========================================================
   SELECTED WORK
   Same blue/cyan/indigo language as UI/UX Lab.
========================================================= */

function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(1);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const galleryRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex];

  const previous =
    projects[(activeIndex - 1 + projects.length) % projects.length];

  const previousTwo =
    projects[(activeIndex - 2 + projects.length) % projects.length];

  const next =
    projects[(activeIndex + 1) % projects.length];

  const nextTwo =
    projects[(activeIndex + 2) % projects.length];

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = (index: number, forcedDir?: number) => {
    const nextIndex =
      (index + projects.length) % projects.length;

    if (forcedDir !== undefined) {
      setDirection(forcedDir);
    } else {
      setDirection(nextIndex >= activeIndex ? 1 : -1);
    }
    setActiveIndex(nextIndex);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const goPrevious = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const touchStartTime = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = (touchStartY.current || 0) - touchEndY;
    const elapsed = Date.now() - touchStartTime.current;

    // Detect horizontal swipe if deltaX > 25px and horizontal movement exceeds vertical
    // OR fast flick gesture
    if (
      (Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) ||
      (Math.abs(diffX) > 15 && elapsed < 350 && Math.abs(diffX) > Math.abs(diffY))
    ) {
      if (diffX > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      galleryRef.current?.getBoundingClientRect();

    if (!rect) return;

    setPointer({
      x:
        (event.clientX -
          rect.left -
          rect.width / 2) /
        rect.width,

      y:
        (event.clientY -
          rect.top -
          rect.height / 2) /
        rect.height,
    });
  };

  const resetPointer = () =>
    setPointer({ x: 0, y: 0 });

  return (
    <section
      className="
        relative
        mt-40
        sm:mt-56
      "
      aria-label="Selected work"
    >
      {/* ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-x-[-20%] top-0 h-[900px] overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[28%]
            top-[10%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-sky-300/20
            blur-[150px]
          "
        />

        <motion.div
          animate={{
            x: [0, -70, 30, 0],
            y: [0, 45, -20, 0],
            scale: [1, 0.94, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[5%]
            top-[22%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-indigo-300/20
            blur-[140px]
          "
        />

        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 30, -25, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[5%]
            top-[50%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-300/15
            blur-[130px]
          "
        />
      </div>

      {/* INTRO */}

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-center gap-4"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 42 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="h-px bg-sky-400"
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.5em]
              text-sky-600
            "
          >
            Selected Work / 120
          </span>

          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 42 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="h-px bg-sky-400"
          />
        </motion.div>

        <motion.h3
          initial={{
            opacity: 0,
            y: 35,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-7
            text-5xl
            font-black
            leading-[0.95]
            tracking-[-0.06em]
            text-slate-900
            sm:text-6xl
            md:text-7xl
            lg:text-[92px]
          "
        >
          Some work is seen.

          <span
            className="
              block
              bg-gradient-to-r
              from-sky-500
              via-cyan-400
              to-indigo-500
              bg-clip-text
              italic
              text-transparent
            "
          >
            Some work is felt.
          </span>
        </motion.h3>

        <motion.p
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="
            mx-auto
            mt-7
            max-w-2xl
            text-sm
            leading-7
            text-slate-500
            sm:text-base
          "
        >
          120 digital experiences. One moving archive.
          Drag, hover, or use the arrows to discover what
          comes next.
        </motion.p>
      </div>

      {/* GALLERY */}

      <div
        ref={galleryRef}
        onMouseMove={handlePointerMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          resetPointer();
        }}
        className="relative z-10 mt-14 sm:mt-20"
      >
        {/* CURSOR */}

        <motion.div
          animate={{
            opacity: isHovering ? 1 : 0,
            x: pointer.x * 16,
            y: pointer.y * 16,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 24,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-50
            hidden
            -translate-x-1/2
            -translate-y-1/2
            md:block
          "
        >
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-sky-950/25
              text-center
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-white/90
              shadow-2xl
              backdrop-blur-md
            "
          >
            Drag
            <br />
            to explore
          </div>
        </motion.div>

        <div
          className="
            mx-auto
            flex
            max-w-[1900px]
            items-center
            justify-center
            gap-3
            px-3
            sm:gap-5
            sm:px-6
            lg:gap-6
          "
          style={{
            perspective: 1800,
          }}
        >
          <GallerySideCard
            project={previousTwo}
            position="far-left"
            onClick={() => goTo(activeIndex - 2)}
          />

          <GallerySideCard
            project={previous}
            position="left"
            onClick={goPrevious}
          />

          {/* ACTIVE CARD CONTAINER */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="
              group
              relative
              h-[500px]
              w-[min(94vw,900px)]
              sm:h-[570px]
              sm:w-[min(84vw,900px)]
              lg:h-[650px]
              lg:w-[min(67vw,900px)]
              shrink-0
              overflow-hidden
              rounded-[24px]
              sm:rounded-[28px]
              bg-[#0F172A]
              shadow-[0_45px_120px_rgba(15,23,42,.24)]
              touch-pan-y
            "
            style={{
              transform: `rotateX(${pointer.y * -3}deg) rotateY(${pointer.x * 4}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
            >
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 100 : -100,
                    opacity: 0,
                    scale: 0.94,
                    filter: "blur(4px)",
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.35 },
                      filter: { duration: 0.3 },
                    },
                  },
                  exit: (dir: number) => ({
                    zIndex: 0,
                    x: dir < 0 ? 100 : -100,
                    opacity: 0,
                    scale: 0.94,
                    filter: "blur(4px)",
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      filter: { duration: 0.3 },
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.25}
                dragSnapToOrigin={true}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false);

                  if (
                    info.offset.x < -20 ||
                    info.velocity.x < -80
                  ) {
                    goNext();
                  } else if (
                    info.offset.x > 20 ||
                    info.velocity.x > 80
                  ) {
                    goPrevious();
                  }
                }}
                className={`
                  absolute inset-0 select-none
                  ${
                    isDragging
                      ? "cursor-grabbing"
                      : "cursor-grab"
                  }
                `}
              >
                <motion.div
                  className="absolute inset-[-3%] bg-cover bg-center"
                  animate={{
                    scale: isHovering ? 1.035 : 1,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                  style={{
                    backgroundImage: `url(${activeProject.image})`,
                  }}
                />

                <motion.div
                  animate={{
                    opacity: [0.1, 0.22, 0.1],
                    x: ["-15%", "15%", "-15%"],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    left-[-20%]
                    w-[55%]
                    skew-x-[-15deg]
                    bg-sky-300/10
                    blur-3xl
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/25 to-slate-950/90" />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-indigo-950/10" />

                {/* GRAIN */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.09]
                    mix-blend-overlay
                  "
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
                  }}
                />

                {/* TOP META */}

                <div
                  className="
                    absolute
                    left-6
                    right-6
                    top-6
                    flex
                    items-start
                    justify-between
                    sm:left-9
                    sm:right-9
                    sm:top-9
                  "
                >
                  <div>
                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.38em]
                        text-white/65
                      "
                    >
                      Neirah / Selected
                    </span>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        text-sky-200/60
                      "
                    >
                      {activeProject.year} —{" "}
                      {activeProject.category}
                    </p>
                  </div>

                  <Link
                    href="/projects"
                    aria-label="Explore all projects"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-sky-950/20
                      text-white
                      backdrop-blur-md
                      cursor-pointer
                      pointer-events-auto
                      transition-all
                      hover:scale-110
                      hover:bg-white/20
                      active:scale-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                    "
                  >
                    <ArrowUpRight size={17} className="pointer-events-none" />
                  </Link>
                </div>

                {/* VERTICAL */}

                <div
                  className="
                    absolute
                    right-6
                    top-1/2
                    hidden
                    -translate-y-1/2
                    lg:block
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.4em]
                      text-sky-100/40
                      [writing-mode:vertical-rl]
                    "
                  >
                    {activeProject.category} ·{" "}
                    {activeProject.technology}
                  </span>
                </div>

                {/* CURIOSITY */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.85,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    absolute
                    left-1/2
                    top-[44%]
                    hidden
                    -translate-x-1/2
                    -translate-y-1/2
                    md:block
                  "
                >
                  <div
                    className="
                      rounded-full
                      border
                      border-sky-200/20
                      bg-sky-950/20
                      px-5
                      py-3
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-white/80
                      backdrop-blur-md
                    "
                  >
                    Discover {activeProject.number}
                  </div>
                </motion.div>

                {/* BOTTOM */}

                <div
                  className="
                    absolute
                    inset-x-6
                    bottom-7
                    sm:inset-x-10
                    sm:bottom-10
                    lg:inset-x-14
                    lg:bottom-12
                    flex
                    flex-col
                    items-center
                    text-center
                  "
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 28,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.12,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.4em]
                        text-sky-100/60
                      "
                    >
                      {activeProject.location}
                    </p>

                    <h4
                      className="
                        mt-3
                        text-5xl
                        font-black
                        leading-none
                        tracking-[-0.055em]
                        text-white
                        sm:text-6xl
                        lg:text-8xl
                      "
                    >
                      {activeProject.title}
                    </h4>

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-4
                        gap-y-2
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-sky-100/55
                        text-center
                      "
                    >
                      <span>
                        {activeProject.technology}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-sky-200/40" />

                      <span>
                        {activeProject.category}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-sky-200/40" />

                      <span>
                        Project {activeProject.number}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* PROGRESS */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[2px]
                    bg-white/10
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${
                        ((activeIndex + 1) /
                          projects.length) *
                        100
                      }%`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      h-full
                      bg-gradient-to-r
                      from-sky-400
                      via-cyan-300
                      to-indigo-400
                    "
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* FLOATING DIRECT CARD ON-CARD SWAP ARROWS (TOP LAYER) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goPrevious();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
              aria-label="Previous project"
              className="
                absolute
                left-2.5
                sm:left-4
                top-1/2
                -translate-y-1/2
                z-50
                flex
                h-10
                w-10
                sm:h-12
                sm:w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-slate-950/60
                text-white
                shadow-xl
                backdrop-blur-md
                transition-all
                duration-200
                hover:scale-110
                hover:bg-sky-500
                hover:border-sky-300
                active:scale-90
                cursor-pointer
                pointer-events-auto
              "
              style={{
                transform: "translateZ(80px)",
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                goNext();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
              aria-label="Next project"
              className="
                absolute
                right-2.5
                sm:right-4
                top-1/2
                -translate-y-1/2
                z-50
                flex
                h-10
                w-10
                sm:h-12
                sm:w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-slate-950/60
                text-white
                shadow-xl
                backdrop-blur-md
                transition-all
                duration-200
                hover:scale-110
                hover:bg-sky-500
                hover:border-sky-300
                active:scale-90
                cursor-pointer
                pointer-events-auto
              "
              style={{
                transform: "translateZ(80px)",
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <GallerySideCard
            project={next}
            position="right"
            onClick={goNext}
          />

          <GallerySideCard
            project={nextTwo}
            position="far-right"
            onClick={() => goTo(activeIndex + 2)}
          />
        </div>
      </div>

      {/* NAVIGATION */}

      <div
        className="
          relative
          z-20
          mx-auto
          mt-7
          flex
          max-w-6xl
          items-center
          justify-between
          px-5
          sm:mt-10
          sm:px-8
        "
      >
        <div className="flex items-center gap-4">
          <motion.span
            key={activeProject.number}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              text-sm
              font-bold
              tracking-[0.15em]
              text-slate-700
            "
          >
            {activeProject.number}
          </motion.span>

          <div
            className="
              hidden
              h-px
              w-16
              bg-sky-300
              sm:block
            "
          />

          <span
            className="
              text-xs
              tracking-[0.15em]
              text-slate-400
            "
          >
            120
          </span>
        </div>

        <div className="flex items-center gap-2 relative z-30">
          <motion.button
            type="button"
            whileHover={{
              x: -4,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={(e) => {
              e.stopPropagation();
              goPrevious();
            }}
            aria-label="Previous project"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-sky-200
              bg-white/70
              text-slate-600
              shadow-sm
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-sky-600
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{
              x: 4,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next project"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-sky-200
              bg-white/70
              text-slate-600
              shadow-sm
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-sky-600
              cursor-pointer
            "
          >
            <ArrowRight size={17} />
          </motion.button>
        </div>
      </div>

      {/* HINT */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.8,
          duration: 0.8,
        }}
        className="mt-6 text-center"
      >
        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-slate-400
          "
        >
          ← drag / click / arrow keys →
        </span>
      </motion.div>

      {/* CTA */}

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
        }}
        className="
          mt-16
          text-center
          sm:mt-20
        "
      >
        <Link
          href="/projects"
          className="
            group
            inline-flex
            items-center
            gap-3
            border-b
            border-sky-400
            pb-2
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-slate-700
            transition-all
            duration-300
            hover:text-sky-600
            hover:border-sky-600
            cursor-pointer
            pointer-events-auto
          "
        >
          <span>Enter the full archive</span>

          <ArrowUpRight
            size={15}
            className="
              text-sky-500
              transition-transform
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              pointer-events-none
            "
          />
        </Link>
      </motion.div>
    </section>
  );
}

/* =========================================================
   GALLERY SIDE CARD
========================================================= */

function GallerySideCard({
  project,
  position,
  onClick,
}: {
  project: (typeof projects)[number];
  position:
    | "far-left"
    | "left"
    | "right"
    | "far-right";
  onClick: () => void;
}) {
  const isFar = position.includes("far");
  const isLeft = position.includes("left");

  return (
    <motion.button
      layout
      onClick={onClick}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: isFar ? 0.45 : 0.78,
        scale: 1,
      }}
      whileHover={{
        opacity: 1,
        scale: 1.025,
        y: -5,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        group
        relative
        shrink-0
        overflow-hidden
        rounded-[20px]
        bg-[#0F172A]
        shadow-[0_25px_70px_rgba(15,23,42,.16)]
        cursor-pointer
        ${
          isFar
            ? "hidden xl:block h-[520px] w-[90px]"
            : "hidden md:block h-[520px] w-[90px] lg:h-[590px] lg:w-[135px] xl:h-[650px] xl:w-[150px]"
        }
        ${isLeft ? "origin-right" : "origin-left"}
      `}
      aria-label={`Open ${project.title}`}
    >
      <motion.div
        className="
          absolute
          inset-[-8%]
          bg-cover
          bg-center
          grayscale-[20%]
        "
        whileHover={{
          scale: 1.1,
          filter:
            "brightness(0.8) grayscale(0%)",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          backgroundImage: `url(${project.image})`,
          filter: "brightness(0.58)",
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-slate-950/10
          via-slate-950/25
          to-slate-950/80
        "
      />

      <motion.div
        whileHover={{
          y: -4,
        }}
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-md
            border
            border-sky-200/10
            bg-slate-950/25
            px-3
            py-4
            backdrop-blur-md
          "
        >
          <span
            className="
              block
              rotate-180
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-white/90
              [writing-mode:vertical-rl]
            "
          >
            {project.title}
          </span>
        </div>
      </motion.div>

      <span
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          text-[8px]
          font-bold
          tracking-[0.3em]
          text-sky-100/45
        "
      >
        {project.number}
      </span>
    </motion.button>
  );
}

/* =========================================================
   AMBIENT ORB
========================================================= */

function AmbientOrb({
  className,
  duration,
  reverse = false,
}: {
  className: string;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      animate={{
        x: reverse
          ? [0, -70, 0]
          : [0, 70, 0],
        y: [0, -45, 0],
        scale: [1, 1.18, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        pointer-events-none
        absolute
        rounded-full
        blur-[120px]
        ${className}
      `}
    />
  );
}

/* =========================================================
   FLOATING BUBBLE
========================================================= */

function FloatingBubble({
  className,
  size,
  duration,
}: {
  className: string;
  size: string;
  duration: number;
}) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 25, 0],
        scale: [1, 1.4, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        pointer-events-none
        absolute
        z-10
        rounded-full
        bg-cyan-400
        shadow-[0_0_30px_rgba(34,211,238,.8)]
        ${size}
        ${className}
      `}
    />
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p
        className="
          text-2xl
          font-black
          text-sky-500
          text-center
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-xs
          font-medium
          text-slate-500
          text-center
        "
      >
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   FLOATING TAG
========================================================= */

function FloatingTag({
  icon: Icon,
  text,
  className,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        z-50
        flex
        items-center
        gap-2
        rounded-full
        border
        border-sky-200
        bg-white/90
        px-3
        py-2
        text-[10px]
        font-bold
        text-blue-600
        shadow-[0_12px_30px_rgba(14,165,233,.12)]
        backdrop-blur-xl
        sm:px-4
        sm:text-xs
        ${className}
      `}
    >
      <Icon
        size={13}
        className="text-sky-500"
      />

      {text}
    </motion.div>
  );
}