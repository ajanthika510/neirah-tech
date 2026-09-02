"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = 3200; // 3.2 seconds duration
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
      }
    }, 25);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        onComplete?.();
      }, 700);
    }, 3500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExiting(true);
        setTimeout(() => onComplete?.(), 400);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => onComplete?.(), 400);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#030712] text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* SKIP INTRO BUTTON */}
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip intro"
            className="absolute top-6 right-6 z-50 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white/70 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white cursor-pointer"
          >
            Skip Intro
          </button>

          {/* AMBIENT BACKGROUND GLOW ORBS */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-500/20 via-rose-500/15 to-purple-600/20 blur-[130px]"
              animate={{
                scale: [0.85, 1.15, 0.95, 1.2, 0.85],
                opacity: [0.3, 0.6, 0.4, 0.65, 0.3],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* SUBTLE BACKGROUND GRID */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* CENTRAL CORE: GLOWING HEART + NEIRO MASCOT */}
          <div className="relative flex flex-col items-center justify-center text-center space-y-6 z-10">

            {/* HEART CONTAINER */}
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[370px] sm:h-[370px]">
              
              {/* HEART SVG WITH VIBRANT GRADIENT & ECG PULSE */}
              <motion.svg
                viewBox="0 0 400 360"
                className="absolute inset-0 h-full w-full pointer-events-none"
                animate={{
                  filter: [
                    "drop-shadow(0 0 15px rgba(56,189,248,0.3))",
                    "drop-shadow(0 0 35px rgba(244,63,94,0.5))",
                    "drop-shadow(0 0 20px rgba(168,85,247,0.4))",
                    "drop-shadow(0 0 40px rgba(56,189,248,0.6))",
                    "drop-shadow(0 0 15px rgba(56,189,248,0.3))",
                  ],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <defs>
                  {/* Rich Vibrant Gradient */}
                  <linearGradient id="neirahHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="35%" stopColor="#818cf8" />
                    <stop offset="70%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>

                  <linearGradient id="ecgPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="heartGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Inner Heart Fill (Translucent Crystal) */}
                <motion.path
                  d="
                    M 200 330
                    C 120 270 40 200 40 125
                    C 40 60 90 25 148 25
                    C 178 25 194 42 200 55
                    C 206 42 222 25 252 25
                    C 310 25 360 60 360 125
                    C 360 200 280 270 200 330
                    Z
                  "
                  fill="url(#neirahHeartGrad)"
                  fillOpacity="0.08"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Outer Heart Outline Stroke */}
                <motion.path
                  d="
                    M 200 330
                    C 120 270 40 200 40 125
                    C 40 60 90 25 148 25
                    C 178 25 194 42 200 55
                    C 206 42 222 25 252 25
                    C 310 25 360 60 360 125
                    C 360 200 280 270 200 330
                    Z
                  "
                  fill="none"
                  stroke="url(#neirahHeartGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#heartGlowFilter)"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />

                {/* Dynamic ECG Heartbeat Wave */}
                <motion.path
                  d="
                    M 30 160
                    L 110 160
                    L 130 160
                    L 145 125
                    L 165 210
                    L 185 85
                    L 205 235
                    L 225 160
                    L 250 160
                    L 370 160
                  "
                  fill="none"
                  stroke="url(#ecgPulseGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#heartGlowFilter)"
                  pathLength={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0.5] }}
                  transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Traveling Heartbeat Particle Dot */}
                <motion.circle
                  r="5"
                  fill="#ffffff"
                  filter="url(#heartGlowFilter)"
                  initial={{ opacity: 0, cx: 30, cy: 160 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    cx: [30, 110, 145, 185, 225, 370],
                    cy: [160, 160, 125, 85, 160, 160],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </motion.svg>

              {/* NEIRO MASCOT IMAGE PERFECTLY CENTERED INSIDE THE HEART */}
              <div className="absolute inset-0 flex items-center justify-center pb-6">
                <motion.div
                  className="relative w-36 h-36 sm:w-44 sm:h-44"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: [0.92, 1.08, 1.02, 1.14, 0.92],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.3 },
                    scale: {
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.18, 0.36, 0.54, 1],
                    },
                  }}
                >
                  <Image
                    src="/images/Neiro.png"
                    alt="Neiro Ecosystem Mascot"
                    fill
                    priority
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                  />
                </motion.div>
              </div>
            </div>

            {/* BRAND TITLE & TAGLINE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2 -mt-4"
            >
              <h1 className="font-black text-3xl sm:text-5xl tracking-tight bg-gradient-to-r from-sky-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                NEIRAH
              </h1>
              <p className="font-mono text-xs sm:text-sm text-sky-300/80 tracking-widest uppercase">
                Technology for Every Layer of Business
              </p>
            </motion.div>

            {/* SMOOTH CONTINUOUS PROGRESS BAR */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-48 sm:w-64 space-y-2 pt-2"
            >
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 p-0.5 border border-white/10 backdrop-blur-md">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-rose-500 to-purple-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 tracking-wider">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}