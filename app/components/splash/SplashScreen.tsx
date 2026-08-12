"use client";

import Image from "next/image";
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
    // ---------------------------------------------------------
    // TIMELINE
    // ---------------------------------------------------------
    //
    // 0.0s  - Universe starts
    // 1.4s  - Neural logo formation starts
    // 2.5s  - Neural logo formation completes
    // 2.8s  - Full logo appears
    // 3.3s  - Tagline appears
    // 4.0s  - Cinematic exit
    // 5.0s  - Splash complete
    //
    // ---------------------------------------------------------

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 4000);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 5000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.section
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#030712]"
      initial={{
        opacity: 1,
        scale: 1,
      }}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 1.08 : 1,
      }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* =====================================================
          3D AI UNIVERSE
      ===================================================== */}

      <div className="absolute inset-0">
        <AIUniverse exiting={exiting} />
      </div>

      {/* =====================================================
          DARK VIGNETTE
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(3,7,18,0.08) 32%, rgba(3,7,18,0.82) 100%)",
        }}
      />

      {/* =====================================================
          CENTRAL BLUE ATMOSPHERE
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[120px]
          sm:h-[550px]
          sm:w-[550px]
        "
        animate={{
          scale: [0.8, 1.15, 0.9],
          opacity: [0.2, 0.55, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TOP LEFT SYSTEM BRAND
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-6
          top-6
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
          delay: 0.4,
        }}
      >
        <motion.div
          className="
            h-2
            w-2
            rounded-full
            bg-cyan-300
            shadow-[0_0_14px_rgba(103,232,249,0.9)]
          "
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
        />

        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-slate-500
          "
        >
          NEIRAH / AI SYSTEM
        </span>
      </motion.div>

      {/* =====================================================
          TOP RIGHT STATUS
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-6
          top-6
          sm:right-10
          sm:top-10
        "
        initial={{
          opacity: 0,
          x: 10,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.8,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-slate-600
            "
          >
            NEURAL CORE
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
              opacity: [0.25, 1, 0.25],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* =====================================================
          CENTER BRAND AREA
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          flex
          items-end
          justify-center
          pb-[12vh]
          sm:pb-[9vh]
        "
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: exiting ? 0 : 1,
            y: exiting ? -30 : 0,
          }}
          transition={{
            opacity: {
              duration: 0.7,
            },
            y: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* =================================================
              LOGO CONTAINER
          ================================================= */}

          <motion.div
            className="relative"
            initial={{
              opacity: 0,
              scale: 0.82,
              filter: "blur(14px)",
            }}
            animate={{
              opacity: exiting ? 0 : 1,
              scale: exiting ? 1.05 : 1,
              filter: "blur(0px)",
            }}
            transition={{
              opacity: {
                duration: 0.7,
                delay: 2.75,
              },
              scale: {
                duration: 0.9,
                delay: 2.75,
                ease: [0.16, 1, 0.3, 1],
              },
              filter: {
                duration: 0.8,
                delay: 2.75,
              },
            }}
          >
            {/* =================================================
                OUTER LOGO GLOW
            ================================================= */}

            <motion.div
              className="
                absolute
                inset-0
                scale-75
                rounded-full
                bg-blue-500/20
                blur-[55px]
              "
              animate={{
                opacity: [0.25, 0.65, 0.25],
                scale: [0.72, 0.92, 0.72],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                CYAN INNER GLOW
            ================================================= */}

            <motion.div
              className="
                absolute
                inset-0
                scale-90
                rounded-full
                bg-cyan-400/10
                blur-[35px]
              "
              animate={{
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                REAL NEIRAH LOGO
            ================================================= */}

            <Image
              src="/images/logo.png"
              alt="Neirah Tech Solutions"
              width={500}
              height={250}
              priority
              className="
                relative
                z-10
                h-auto
                w-[235px]
                object-contain
                drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]
                sm:w-[320px]
                md:w-[380px]
              "
            />
          </motion.div>

          {/* =================================================
              TAGLINE
          ================================================= */}

          <motion.div
            className="mt-5 flex flex-col items-center"
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: exiting ? 0 : 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.7,
              delay: 3.25,
            }}
          >
            <p
              className="
                text-center
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-slate-400
                sm:text-xs
              "
            >
              Intelligent Digital Engineering
            </p>

            {/* =================================================
                TECHNOLOGY STACK
            ================================================= */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
                text-[7px]
                uppercase
                tracking-[0.22em]
                text-slate-600
                sm:gap-3
                sm:text-[8px]
              "
            >
              <span>AI</span>

              <span className="h-px w-3 bg-blue-500/30 sm:w-4" />

              <span>Software</span>

              <span className="h-px w-3 bg-blue-500/30 sm:w-4" />

              <span>Cloud</span>

              <span className="h-px w-3 bg-blue-500/30 sm:w-4" />

              <span>Data</span>
            </div>
          </motion.div>
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
          flex
          justify-center
          sm:bottom-8
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
        }}
        transition={{
          delay: 1.8,
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
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.3em]
              text-slate-600
              sm:text-[8px]
              sm:tracking-[0.35em]
            "
          >
            Engineering Digital Possibilities
          </span>
        </div>
      </motion.div>

      {/* =====================================================
          CORNER UI DETAILS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          h-10
          w-10
          border-l
          border-t
          border-blue-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-10
          w-10
          border-r
          border-t
          border-blue-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-5
          h-10
          w-10
          border-b
          border-l
          border-blue-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          h-10
          w-10
          border-b
          border-r
          border-blue-400/10
        "
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
          h-[20px]
          w-[20px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-200
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
    </motion.section>
  );
}