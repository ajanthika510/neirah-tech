"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const words = ["Technology", "should", "feel", "human."];

export default function ChapterHero({
  onEnter,
}: {
  onEnter: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.6],
    [1, 0]
  );

  const heroY = useTransform(
    smoothProgress,
    [0, 0.6],
    [0, -60]
  );

  const bgScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, 1.08]
  );

  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.15],
    [1, 0]
  );

  return (
    <section
      ref={ref}
      data-chapter="0"
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-white
        via-sky-50/60
        to-indigo-50/80
      "
      onMouseEnter={onEnter}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-40
            -left-40
            w-[600px]
            h-[600px]
            rounded-full
            bg-sky-200/30
            blur-[120px]
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-40
            -right-40
            w-[700px]
            h-[700px]
            rounded-full
            bg-indigo-200/25
            blur-[140px]
          "
        />

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-1/3
            right-1/4
            w-[400px]
            h-[400px]
            rounded-full
            bg-violet-100/30
            blur-[100px]
          "
        />
      </motion.div>

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT

          Added top spacing to account for fixed navbar.
          The content now starts lower instead of being hidden.
      ===================================================== */}

      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="
          relative
          z-10
          w-full
          max-w-5xl
          mx-auto
          px-6

          pt-28
          sm:pt-32
          md:pt-36
          lg:pt-40
          xl:pt-44

          pb-24
          text-center
        "
      >
        {/* =====================================================
            CHAPTER LABEL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-10
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
              bg-gradient-to-r
              from-transparent
              to-sky-400
            "
          />

          <span
            className="
              text-[11px]
              font-bold
              tracking-[0.3em]
              uppercase
              text-sky-500
            "
          >
            Chapter I — The Invitation
          </span>

          <div
            className="
              h-px
              w-8
              bg-gradient-to-r
              from-sky-400
              to-transparent
            "
          />
        </motion.div>

        {/* =====================================================
            MAIN HEADLINE
        ===================================================== */}

        <div className="overflow-hidden">
          <h1
            className="
              text-6xl
              sm:text-7xl
              md:text-8xl
              lg:text-9xl
              font-extrabold
              tracking-tight
              leading-none
              text-slate-900
            "
          >
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{
                  y: "110%",
                  opacity: 0,
                }}
                animate={{
                  y: "0%",
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  inline-block
                  mr-[0.25em]

                  ${
                    word === "human." ||
                    word === "feel"
                      ? `
                        bg-gradient-to-r
                        from-sky-500
                        via-indigo-500
                        to-violet-500
                        bg-clip-text
                        text-transparent
                      `
                      : ""
                  }
                `}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* =====================================================
            SUPPORTING TEXT
        ===================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-10
            text-lg
            md:text-xl
            text-slate-500
            max-w-xl
            mx-auto
            leading-relaxed
            font-light
          "
        >
          We build digital products that businesses
          love and people actually use.
        </motion.p>

        {/* =====================================================
            BRAND TAG
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
          className="mt-8"
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-sky-200/80
              bg-white/60
              backdrop-blur-sm
              text-xs
              font-semibold
              tracking-widest
              text-sky-600
              uppercase
            "
          >
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-sky-400
                animate-pulse
              "
            />

            Neirah Tech Solution
          </span>
        </motion.div>
      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        style={{
          opacity: scrollIndicatorOpacity,
        }}
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-3
        "
      >
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2,
            duration: 1,
          }}
          className="
            text-[10px]
            font-bold
            tracking-[0.3em]
            uppercase
            text-slate-400
          "
        >
          Scroll to explore
        </motion.span>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            w-5
            h-8
            rounded-full
            border
            border-slate-300
            flex
            items-start
            justify-center
            pt-1.5
          "
        >
          <div
            className="
              w-1
              h-2
              rounded-full
              bg-gradient-to-b
              from-sky-400
              to-indigo-400
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}