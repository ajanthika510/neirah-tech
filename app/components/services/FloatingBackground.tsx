"use client";

import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <>
      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Blob */}

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
        }}
        className="absolute -left-40 top-24 h-[450px] w-[450px] rounded-full bg-sky-300/20 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 70, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-[150px]"
      />

      {/* Floating Shapes */}

      <motion.div
        animate={{
          rotate: 360,
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-[15%] top-52 h-12 w-12 rounded-xl border border-sky-300/40"
      />

      <motion.div
        animate={{
          rotate: -360,
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-[12%] top-72 h-14 w-14 rounded-full border border-cyan-300/40"
      />
    </>
  );
}