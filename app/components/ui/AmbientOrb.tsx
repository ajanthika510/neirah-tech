"use client";

import { motion } from "framer-motion";

interface AmbientOrbProps {
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export default function AmbientOrb({
  className = "",
  duration = 15,
  reverse = false,
}: AmbientOrbProps) {
  return (
    <motion.div
      animate={{
        x: reverse ? [0, -60, 0] : [0, 60, 0],
        y: reverse ? [0, 40, 0] : [0, -40, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
    />
  );
}
