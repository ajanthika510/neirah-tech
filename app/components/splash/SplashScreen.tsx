"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

import AIUniverse from "./AIUniverse";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, linear progress bar counter
    const startTime = Date.now();
    const duration = 3200; // 3.2 seconds total duration

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
      }
    }, 30);

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 3400);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 4000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExiting(true);
        setTimeout(() => onComplete?.(), 400);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => onComplete?.(), 400);
  };

  return (
    <motion.section
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[#030712] text-white ${
        exiting ? "pointer-events-none" : "pointer-events-auto"
      }`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 1.05 : 1,
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* SKIP INTRO BUTTON */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip introduction"
        className="absolute top-6 right-6 z-50 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase text-white/70 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white cursor-pointer"
      >
        Skip Intro
      </button>

      {/* 3D FLOATING PARTICLES */}
      <AIUniverse exiting={exiting} />

      {/* AMBIENT BACKGROUND GLOW ORBS */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-[450px] w-[450px] rounded-full bg-sky-500/15 blur-[120px] sm:h-[600px] sm:w-[600px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute h-[350px] w-[350px] rounded-full bg-indigo-500/15 blur-[100px] sm:h-[450px] sm:w-[450px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* MAIN CENTERSTAGE: NEIRO HEARTBEAT CORE */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative flex flex-col items-center justify-center text-center space-y-8">
          
          {/* NEIRO PNG WITH ORGANIC DUAL-PULSE HEARTBEAT */}
          <div className="relative flex items-center justify-center">
            
            {/* CONCENTRIC HEARTBEAT RIPPLE RINGS */}
            {[0, 1, 2].map((ringIndex) => (
              <motion.div
                key={ringIndex}
                className="absolute rounded-full border border-sky-400/30 bg-sky-400/5 shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                style={{
                  width: "160px",
                  height: "160px",
                }}
                animate={{
                  scale: [0.8, 2.5],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.215, 0.61, 0.355, 1],
                  delay: ringIndex * 0.5,
                }}
              />
            ))}

            {/* NEIRO MASCOT IMAGE CONTAINER WITH HEARTBEAT PULSE */}
            <motion.div
              className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 group cursor-pointer"
              animate={{
                scale: [1, 1.12, 1.04, 1.18, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.15, 0.3, 0.45, 1],
              }}
            >
              {/* Soft radial aura under Neiro */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/20 via-cyan-400/30 to-indigo-500/20 blur-xl animate-pulse" />

              <Image
                src="/images/Neiro.png"
                alt="Neiro Ecosystem Mascot"
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
                className="h-full w-full object-contain drop-shadow-[0_10px_35px_rgba(56,189,248,0.45)] transition-transform"
              />
            </motion.div>
          </div>

          {/* BRAND TITLE & TAGLINE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              NEIRAH
            </h1>
            <p className="font-mono text-xs sm:text-sm text-sky-400/90 tracking-widest uppercase">
              Technology for Every Layer of Business
            </p>
          </motion.div>

          {/* SMOOTH CONTINUOUS PROGRESS BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-48 sm:w-64 space-y-2 pt-2"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 p-0.5 border border-white/10 backdrop-blur-md">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
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
      </div>
    </motion.section>
  );
}