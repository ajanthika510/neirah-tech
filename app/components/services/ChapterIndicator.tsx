"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "./servicesData";

interface ChapterIndicatorProps {
  activeChapter: number;
}

export default function ChapterIndicator({ activeChapter }: ChapterIndicatorProps) {
  const chapter = chapters[activeChapter] ?? chapters[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-1/2 right-6 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      {/* Chapter dots */}
      <div className="flex flex-col gap-2">
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.number}
            animate={{
              scale: i === activeChapter ? 1 : 0.6,
              opacity: i === activeChapter ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-full transition-all duration-500 ${
              i === activeChapter
                ? "w-2 h-6 bg-gradient-to-b from-sky-500 to-indigo-500"
                : "w-1.5 h-1.5 bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Chapter label */}
      <div className="mt-2 -rotate-90 origin-center whitespace-nowrap">
        <AnimatePresence mode="wait">
          <motion.span
            key={chapter.number}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400"
          >
            {chapter.number} — {chapter.name}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
