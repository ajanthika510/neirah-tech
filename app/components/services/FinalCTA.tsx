"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ctaWords = ["LET'S", "BUILD", "SOMETHING", "MEANINGFUL."];

export default function FinalCTA({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const sectionOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const sectionY = useTransform(smoothProgress, [0, 0.2], [60, 0]);

  return (
    <section
      ref={ref}
      data-chapter="4"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50/80 to-violet-100/60 py-20 sm:py-32"
      onMouseEnter={onEnter}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-200/40 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-violet-200/35 blur-[140px]"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 w-full"
      >
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 flex items-center justify-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-500">
            Chapter V — Let's Talk
          </span>
          <div className="h-px w-8 bg-gradient-to-r from-violet-400 to-transparent" />
        </motion.div>

        {/* Headline — word by word reveal */}
        <div className="mb-10 sm:mb-16">
          {ctaWords.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <h2
                className={`
                  block font-extrabold leading-[0.95] tracking-tight break-words
                  text-[clamp(2.2rem,8.5vw,7.5rem)]
                  ${word === "MEANINGFUL."
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

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed mb-10 sm:mb-12 font-light px-2"
        >
          Tell us what you want to build. We'll find the right way to build it.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-white font-bold text-base shadow-[0_12px_40px_rgba(99,102,241,0.3)] hover:shadow-[0_16px_50px_rgba(99,102,241,0.4)] transition-shadow duration-500 cursor-pointer"
            >
              Start a conversation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.div>
          </Link>

          <Link href="/projects" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center justify-center gap-2 w-full sm:w-auto py-3 px-6 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
            >
              View our work
              <ArrowRight size={14} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Bottom subtle ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-24 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-violet-300 to-transparent origin-center"
        />

        {/* Final brand note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 sm:mt-8 text-xs font-semibold tracking-[0.3em] uppercase text-slate-400"
        >
          Neirah Tech Solution · Est. 2020
        </motion.p>
      </motion.div>
    </section>
  );
}
