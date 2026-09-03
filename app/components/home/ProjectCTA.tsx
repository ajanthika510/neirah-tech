"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  Check,
  MoveUpRight,
} from "lucide-react";

import Link from "next/link";
import SchedulerModal from "./SchedulerModal";
import RevealText from "../ui/RevealText";

const benefits = [
  "Custom Software",
  "AI Solutions",
  "Enterprise Systems",
];

export default function ProjectCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  /*
  ============================================================
  SCROLL PROGRESS

  The animation is NOT once-only.

  Every time the user enters/leaves this section,
  the animation follows the scroll position.
  ============================================================
  */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.8,
  });

  /*
  ============================================================
  MYSTERY OBJECT
  ============================================================
  */

  // Comes from below
  const objectY = useTransform(
    progress,
    [0, 0.25, 0.55, 1],
    [420, 240, 40, 0]
  );

  // Starts tiny
  const objectScale = useTransform(
    progress,
    [0, 0.25, 0.55, 0.8, 1],
    [0.18, 0.32, 0.68, 0.92, 1]
  );

  /*
  Starts almost edge-on.

  This is the important part that creates
  the "what is that?" feeling.
  */

  const rotateX = useTransform(
    progress,
    [0, 0.2, 0.45, 0.7, 1],
    [65, 52, 30, 8, 0]
  );

  const rotateY = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [-70, -50, -28, -8, 0]
  );

  const rotateZ = useTransform(
    progress,
    [0, 0.3, 0.6, 1],
    [-18, -10, -4, 0]
  );

  /*
  ============================================================
  OBJECT OPACITY
  ============================================================
  */

  const objectOpacity = useTransform(
    progress,
    [0, 0.08, 0.3],
    [0, 0.6, 1]
  );

  /*
  ============================================================
  MYSTERY CORE
  ============================================================
  */

  const coreScale = useTransform(
    progress,
    [0.05, 0.3, 0.6, 1],
    [0.1, 0.35, 0.8, 1.2]
  );

  const coreOpacity = useTransform(
    progress,
    [0, 0.15, 0.45, 0.7],
    [0, 0.35, 0.8, 0]
  );

  /*
  ============================================================
  ORBIT
  ============================================================
  */

  const orbitScale = useTransform(
    progress,
    [0, 0.3, 0.6, 1],
    [0.1, 0.45, 0.8, 1]
  );

  const orbitOpacity = useTransform(
    progress,
    [0, 0.15, 0.45, 0.8],
    [0, 0.3, 0.7, 1]
  );

  const orbitRotate = useTransform(
    progress,
    [0, 1],
    [-120, 360]
  );

  const orbitRotateReverse = useTransform(
    progress,
    [0, 1],
    [90, -360]
  );

  /*
  ============================================================
  REVEAL
  ============================================================
  */

  /*
  The actual CTA remains hidden until
  the mystery object is mostly discovered.
  */

  const contentOpacity = useTransform(
    progress,
    [0.58, 0.7, 0.82],
    [0, 0.35, 1]
  );

  const contentY = useTransform(
    progress,
    [0.55, 0.7, 0.85],
    [80, 30, 0]
  );

  const contentBlur = useTransform(
    progress,
    [0.55, 0.7, 0.85],
    [14, 5, 0]
  );

  /*
  ============================================================
  LIGHT REVEAL
  ============================================================
  */

  const lightOpacity = useTransform(
    progress,
    [0.25, 0.5, 0.72, 1],
    [0, 0.2, 0.7, 1]
  );

  const lightScale = useTransform(
    progress,
    [0, 0.45, 0.8, 1],
    [0.3, 0.55, 0.9, 1.1]
  );

  /*
  ============================================================
  LIGHT SWEEP
  ============================================================
  */

  const sweepX = useTransform(
    progress,
    [0.45, 0.75],
    ["-120%", "120%"]
  );

  const sweepOpacity = useTransform(
    progress,
    [0.4, 0.55, 0.75, 0.9],
    [0, 0.5, 0.9, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[900px]
        overflow-hidden
        bg-[#F8FBFF]
        py-16
        sm:py-20
        flex
        items-center
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Central light */}

        <motion.div
          style={{
            scale: lightScale,
            opacity: lightOpacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[650px]
            h-[650px]
            rounded-full
            bg-sky-300/20
            blur-[150px]
          "
        />

        {/* Cyan atmosphere */}

        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[5%]
            top-[15%]
            w-[350px]
            h-[350px]
            rounded-full
            bg-cyan-300/20
            blur-[120px]
          "
        />

        {/* Indigo atmosphere */}

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[5%]
            bottom-[5%]
            w-[400px]
            h-[400px]
            rounded-full
            bg-indigo-300/20
            blur-[130px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
          "
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#0ea5e9 1px,transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(circle at center,black,transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center,black,transparent 75%)",
          }}
        />

        {/* Top transition */}

        <div
          className="
            absolute
            top-0
            inset-x-0
            h-48
            bg-gradient-to-b
            from-[#F8FBFF]
            to-transparent
          "
        />

        {/* Bottom transition */}

        <div
          className="
            absolute
            bottom-0
            inset-x-0
            h-48
            bg-gradient-to-t
            from-[#F8FBFF]
            to-transparent
          "
        />
      </div>

      {/* ======================================================
          3D STAGE
      ======================================================= */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-6
          [perspective:1800px]
        "
      >
        {/* ====================================================
            MYSTERY CORE

            Initially this is almost invisible.

            The user sees a small glowing point
            before understanding what is coming.
        ===================================================== */}

        <motion.div
          style={{
            scale: coreScale,
            opacity: coreOpacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-32
            h-32
            rounded-full
            bg-gradient-to-br
            from-sky-300
            via-cyan-400
            to-indigo-400
            blur-[35px]
          "
        />

        {/* ====================================================
            ORBIT 1
        ===================================================== */}

        <motion.div
          style={{
            scale: orbitScale,
            opacity: orbitOpacity,
            rotate: orbitRotate,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[430px]
            h-[430px]
            rounded-full
            border
            border-sky-300/30
          "
        />

        {/* ====================================================
            ORBIT 2
        ===================================================== */}

        <motion.div
          style={{
            scale: orbitScale,
            opacity: orbitOpacity,
            rotate: orbitRotateReverse,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[600px]
            h-[600px]
            rounded-full
            border
            border-indigo-300/20
          "
        />

        {/* ====================================================
            MAIN MYSTERY BOX
        ===================================================== */}

        <motion.div
          style={{
            y: objectY,
            scale: objectScale,
            rotateX,
            rotateY,
            rotateZ,
            opacity: objectOpacity,
            transformStyle: "preserve-3d",
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-6xl
            min-h-[700px]
            rounded-[48px]
            overflow-hidden
            border
            border-white
            bg-white/70
            backdrop-blur-3xl
            shadow-[0_50px_140px_rgba(15,23,42,.14)]
          "
        >
          {/* ==================================================
              GLASS LAYER
          =================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-white/95
              via-white/60
              to-sky-50/80
            "
          />

          {/* ==================================================
              INNER BLUE GLOW
          =================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[550px]
              h-[550px]
              rounded-full
              bg-sky-300/10
              blur-[120px]
            "
          />

          {/* ==================================================
              LIGHT SWEEP
          =================================================== */}

          <motion.div
            style={{
              x: sweepX,
              opacity: sweepOpacity,
            }}
            className="
              absolute
              top-[-20%]
              bottom-[-20%]
              w-[18%]
              skew-x-[-18deg]
              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
              blur-2xl
              z-20
            "
          />

          {/* ==================================================
              MYSTERY LABEL

              Appears BEFORE actual content.
          =================================================== */}

          <motion.div
            style={{
              opacity: useTransform(
                progress,
                [0.2, 0.4, 0.55],
                [0, 1, 0]
              ),
            }}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
              z-30
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  border
                  border-sky-300/50
                  bg-white/70
                  backdrop-blur-xl
                  shadow-[0_20px_60px_rgba(14,165,233,.18)]
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles
                  size={24}
                  className="text-sky-500"
                />
              </div>

              <span
                className="
                  text-xs
                  tracking-[0.35em]
                  uppercase
                  font-bold
                  text-sky-500/70
                "
              >
                Something is coming
              </span>
            </div>
          </motion.div>

          {/* ==================================================
              REAL CONTENT

              Hidden until the mystery is discovered.
          =================================================== */}

          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
              filter: `blur(${contentBlur}px)`,
            }}
            className="
              relative
              z-40
              min-h-[700px]
              flex
              items-center
              justify-center
              px-7
              py-20
              md:px-20
            "
          >
            <div
              className="
                max-w-4xl
                mx-auto
                text-center
              "
            >
              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-full
                  bg-sky-50
                  border
                  border-sky-200
                  text-sky-700
                  text-sm
                  font-semibold
                  shadow-sm
                "
              >
                <Sparkles size={15} />

                <RevealText text="Let's Build Something Amazing" mode="viewport" stagger={0.06} duration={0.4} blurAmount={3} />
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-8
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  tracking-[-0.045em]
                  leading-[.98]
                  text-slate-900
                "
              >
                <RevealText text="Ready to Start Your" mode="viewport" stagger={0.08} duration={0.6} blurAmount={8} />

                <span
                  className="
                    block
                    mt-2
                    bg-gradient-to-r
                    from-sky-500
                    via-indigo-600
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  <RevealText text="Next Project?" mode="viewport" delay={0.25} stagger={0.08} duration={0.6} blurAmount={8} />
                </span>
              </h2>

              <RevealText
                as="p"
                mode="viewport"
                delay={0.5}
                stagger={0.04}
                duration={0.5}
                blurAmount={4}
                yOffset="70%"
                className="
                  mt-7
                  max-w-2xl
                  mx-auto
                  text-base
                  md:text-lg
                  leading-relaxed
                  text-slate-600
                "
              >
                Have an idea? Let&apos;s transform it into a powerful digital solution with modern software, AI, cloud and automation.
              </RevealText>

              {/* Buttons */}

              <div
                className="
                  mt-10
                  flex
                  flex-col
                  sm:flex-row
                  justify-center
                  gap-4
                  relative z-20
                "
              >
                <Link
                  href="/contact"
                  className="
                    group
                    relative
                    overflow-hidden
                    w-full
                    sm:w-auto
                    min-w-[210px]
                    px-8
                    py-4
                    rounded-full
                    bg-gradient-to-r
                    from-sky-500
                    to-cyan-400
                    text-white
                    font-bold
                    shadow-[0_18px_45px_rgba(14,165,233,.3)]
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_22px_50px_rgba(14,165,233,.4)]
                    active:translate-y-0
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                    pointer-events-auto
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      bg-white/20
                      translate-x-[-100%]
                      group-hover:translate-x-[100%]
                      transition-transform
                      duration-700
                      pointer-events-none
                    "
                  />

                  <span
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                      gap-3
                      pointer-events-none
                    "
                  >
                    Start Your Project

                    <ArrowRight
                      size={18}
                      className="
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSchedulerOpen(true)}
                  className="
                    group
                    w-full
                    sm:w-auto
                    min-w-[210px]
                    px-8
                    py-4
                    rounded-full
                    bg-white/80
                    border
                    border-slate-200
                    text-slate-800
                    font-bold
                    shadow-sm
                    hover:bg-white
                    hover:shadow-md
                    hover:-translate-y-1
                    active:translate-y-0
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-2
                    cursor-pointer
                    pointer-events-auto
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                  "
                >
                  <span>Book Consultation</span>

                  <MoveUpRight
                    size={17}
                    className="
                      text-slate-400
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      transition-transform
                      pointer-events-none
                    "
                  />
                </button>
              </div>

              {/* Benefits */}

              <div
                className="
                  mt-12
                  flex
                  flex-wrap
                  justify-center
                  gap-x-8
                  gap-y-4
                "
              >
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-500
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        w-5
                        h-5
                        rounded-full
                        bg-sky-50
                        border
                        border-sky-200
                      "
                    >
                      <Check
                        size={11}
                        className="text-sky-600"
                      />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
      />
    </section>
  );
}