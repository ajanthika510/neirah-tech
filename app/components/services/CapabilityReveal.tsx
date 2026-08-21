"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const lines = [
  { prefix: "WE", words: ["DESIGN"] },
  { prefix: "", words: ["DIGITAL", "PRODUCTS"] },
  { prefix: "", words: ["BRANDS"] },
  { prefix: "", words: ["EXPERIENCES"] },
  { prefix: "", words: ["SYSTEMS"] },
];

const allWords = ["DESIGN", "DIGITAL", "PRODUCTS", "BRANDS", "EXPERIENCES", "SYSTEMS"];

export default function CapabilityReveal({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const sectionOpacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(smoothProgress, [0, 0.1], [50, 0]);

  return (
    <section
      ref={ref}
      data-chapter="1"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-indigo-50/60 py-32"
      onMouseEnter={onEnter}
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-200/30 blur-[120px]"
        />
      </div>

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-indigo-500">
            Chapter II — We Build
          </span>
        </motion.div>

        {/* Intro line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-400 mb-8"
        >
          Our craft spans —
        </motion.p>

        {/* Giant progressive text */}
        <div className="space-y-2">
          {/* WE label */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <span className="block text-[13px] font-bold tracking-[0.35em] uppercase text-sky-500 mb-2">
              WE
            </span>
          </motion.div>

          {allWords.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 1.1,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <h2
                className={`
                  font-extrabold leading-[0.9] tracking-tight
                  text-[clamp(3.5rem,10vw,10rem)]
                  ${i % 2 === 0
                    ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent"
                    : "text-slate-900"
                  }
                `}
              >
                {word}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Supporting statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-lg"
        >
          <p className="text-slate-500 text-lg leading-relaxed">
            Every solution we build is guided by one principle:{" "}
            <em className="text-slate-700 not-italic font-medium">
              technology should remove friction, not create it.
            </em>
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px max-w-xs bg-gradient-to-r from-sky-300 via-indigo-400 to-transparent origin-left"
        />
      </motion.div>
    </section>
  );
}
