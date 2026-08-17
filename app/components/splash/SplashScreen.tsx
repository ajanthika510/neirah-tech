"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import AIUniverse from "./AIUniverse";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({
  onComplete,
}: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    /*
     * =========================================================
     * SYSTEM BOOT TIMELINE
     * =========================================================
     *
     * 0.0s  - Digital environment starts
     * 0.5s  - System UI appears
     * 1.2s  - Particle system becomes active
     * 1.8s  - Core begins synchronizing
     * 2.8s  - System reaches stable state
     * 3.5s  - Final loading phase
     * 4.2s  - Cinematic exit
     * 5.2s  - Splash complete
     *
     * =========================================================
     */

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 4200);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 5200);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.section
      className="
        fixed
        inset-0
        z-[9999]
        overflow-hidden
        bg-[#030712]
      "
      initial={{
        opacity: 1,
        scale: 1,
      }}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 1.06 : 1,
      }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* =====================================================
          3D DIGITAL ENVIRONMENT
      ===================================================== */}

      <div className="absolute inset-0">
        <AIUniverse exiting={exiting} />
      </div>

      {/* =====================================================
          BACKGROUND VIGNETTE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
        "
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(3,7,18,0.05) 30%, rgba(3,7,18,0.78) 100%)",
        }}
      />

      {/* =====================================================
          CENTRAL ATMOSPHERE
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-10
          h-[360px]
          w-[360px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/[0.06]
          blur-[110px]
          sm:h-[500px]
          sm:w-[500px]
        "
        animate={{
          scale: [0.75, 1.15, 0.85],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TOP LEFT SYSTEM LABEL
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-6
          top-6
          z-30
          flex
          items-center
          gap-3
          sm:left-10
          sm:top-10
        "
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.3,
        }}
      >
        <motion.div
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-300
            shadow-[0_0_14px_rgba(103,232,249,0.9)]
          "
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <span
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-slate-600
            sm:text-[9px]
          "
        >
          DIGITAL ENVIRONMENT
        </span>
      </motion.div>

      {/* =====================================================
          TOP RIGHT SYSTEM STATUS
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-6
          top-6
          z-30
          sm:right-10
          sm:top-10
        "
        initial={{
          opacity: 0,
          x: 12,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.6,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.28em]
              text-slate-700
              sm:text-[8px]
            "
          >
            SYSTEM BOOT
          </span>

          <motion.span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
              shadow-[0_0_10px_rgba(103,232,249,0.8)]
            "
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* =====================================================
          CENTER SYSTEM CORE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
        "
      >
        <motion.div
          className="
            flex
            flex-col
            items-center
          "
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: exiting ? 0 : 1,
            y: exiting ? -20 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* =================================================
              CORE VISUAL
          ================================================= */}

          <div className="relative flex items-center justify-center">

            {/* Large atmospheric glow */}

            <motion.div
              className="
                absolute
                h-[180px]
                w-[180px]
                rounded-full
                bg-blue-500/[0.08]
                blur-[55px]
                sm:h-[230px]
                sm:w-[230px]
              "
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.25, 0.65, 0.25],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Outer ring */}

            <motion.div
              className="
                absolute
                h-[155px]
                w-[155px]
                rounded-full
                border
                border-cyan-400/[0.12]
                sm:h-[195px]
                sm:w-[195px]
              "
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Outer segmented ring */}

            <motion.div
              className="
                absolute
                h-[140px]
                w-[140px]
                rounded-full
                border
                border-dashed
                border-blue-400/[0.18]
                sm:h-[175px]
                sm:w-[175px]
              "
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner ring */}

            <motion.div
              className="
                absolute
                h-[105px]
                w-[105px]
                rounded-full
                border
                border-cyan-300/[0.10]
                sm:h-[135px]
                sm:w-[135px]
              "
              animate={{
                rotate: 360,
                scale: [0.95, 1.04, 0.95],
              }}
              transition={{
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Scanning arc */}

            <motion.div
              className="
                absolute
                h-[155px]
                w-[155px]
                rounded-full
                border-t
                border-cyan-300/60
                sm:h-[195px]
                sm:w-[195px]
              "
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center core */}

            <motion.div
              className="
                relative
                z-10
                flex
                h-[54px]
                w-[54px]
                items-center
                justify-center
                rounded-full
                border
                border-cyan-300/20
                bg-[#030712]/90
                shadow-[0_0_40px_rgba(34,211,238,0.18)]
                sm:h-[64px]
                sm:w-[64px]
              "
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Core glow */}

              <motion.div
                className="
                  absolute
                  h-5
                  w-5
                  rounded-full
                  bg-cyan-400/20
                  blur-md
                "
                animate={{
                  scale: [0.7, 1.5, 0.7],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
              />

              {/* Core point */}

              <motion.div
                className="
                  relative
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-200
                  shadow-[0_0_20px_rgba(103,232,249,1)]
                "
                animate={{
                  scale: [0.7, 1.5, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Small orbital nodes */}

            {[0, 90, 180, 270].map((rotation) => (
              <motion.div
                key={rotation}
                className="
                  absolute
                  h-1
                  w-1
                  rounded-full
                  bg-blue-300
                  shadow-[0_0_8px_rgba(96,165,250,0.9)]
                "
                style={{
                  transform: `rotate(${rotation}deg) translateY(-82px)`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 1.6,
                  delay: rotation / 360,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* =================================================
              STATUS TEXT
          ================================================= */}

          <motion.div
            className="
              mt-10
              flex
              flex-col
              items-center
            "
            initial={{
              opacity: 0,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: exiting ? 0 : 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
          >
            <motion.p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.45em]
                text-slate-300
                sm:text-xs
              "
              animate={{
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Initializing
            </motion.p>

            <motion.p
              className="
                mt-3
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-slate-600
                sm:text-[8px]
              "
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Processing digital environment
            </motion.p>
          </motion.div>

          {/* =================================================
              LOADING BAR
          ================================================= */}

          <div
            className="
              mt-6
              h-px
              w-[180px]
              overflow-hidden
              bg-slate-800
              sm:w-[240px]
            "
          >
            <motion.div
              className="
                h-full
                w-1/2
                bg-gradient-to-r
                from-transparent
                via-cyan-300
                to-transparent
              "
              animate={{
                x: [
                  "-150%",
                  "300%",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* =================================================
              SYSTEM METRICS
          ================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              text-[6px]
              uppercase
              tracking-[0.22em]
              text-slate-700
              sm:gap-4
              sm:text-[7px]
            "
          >
            <span>CORE</span>

            <span className="text-cyan-500/50">
              ACTIVE
            </span>

            <span className="h-3 w-px bg-slate-800" />

            <span>DATA</span>

            <span className="text-cyan-500/50">
              SYNC
            </span>

            <span className="h-3 w-px bg-slate-800" />

            <span>ENV</span>

            <span className="text-cyan-500/50">
              READY
            </span>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM SYSTEM MESSAGE
      ===================================================== */}

      <motion.div
        className="
          absolute
          bottom-6
          left-0
          right-0
          z-30
          flex
          justify-center
          sm:bottom-8
        "
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
          y: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
        }}
      >
        <div className="flex items-center gap-3">

          <motion.div
            className="
              h-1
              w-1
              rounded-full
              bg-blue-400
              shadow-[0_0_8px_rgba(96,165,250,0.8)]
            "
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />

          <motion.span
            className="
              text-[7px]
              uppercase
              tracking-[0.3em]
              text-slate-600
              sm:text-[8px]
              sm:tracking-[0.35em]
            "
          >
            Establishing secure runtime environment
          </motion.span>
        </div>
      </motion.div>

      {/* =====================================================
          CORNER UI — TOP LEFT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          z-30
          h-10
          w-10
          border-l
          border-t
          border-blue-400/10
        "
        animate={{
          opacity: exiting ? 0 : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* =====================================================
          CORNER UI — TOP RIGHT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          z-30
          h-10
          w-10
          border-r
          border-t
          border-blue-400/10
        "
        animate={{
          opacity: exiting ? 0 : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      {/* =====================================================
          CORNER UI — BOTTOM LEFT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-5
          z-30
          h-10
          w-10
          border-b
          border-l
          border-blue-400/10
        "
        animate={{
          opacity: exiting ? 0 : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      />

      {/* =====================================================
          CORNER UI — BOTTOM RIGHT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          z-30
          h-10
          w-10
          border-b
          border-r
          border-blue-400/10
        "
        animate={{
          opacity: exiting ? 0 : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5,
        }}
      />

      {/* =====================================================
          CINEMATIC EXIT FLASH
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-50
          h-[20px]
          w-[20px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-100
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: exiting
            ? [0, 0.25, 0]
            : 0,
          scale: exiting
            ? [0, 8, 30]
            : 0,
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* =====================================================
          EXIT SCAN LINE
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-1/2
          z-40
          h-px
          bg-cyan-300/0
        "
        animate={{
          backgroundColor: exiting
            ? [
                "rgba(103,232,249,0)",
                "rgba(103,232,249,0.5)",
                "rgba(103,232,249,0)",
              ]
            : "rgba(103,232,249,0)",
          scaleX: exiting
            ? [0, 1, 1.4]
            : 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.section>
  );
}