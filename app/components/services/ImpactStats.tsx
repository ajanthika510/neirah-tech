"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { impactStats } from "./servicesData";

function CountUp({ target, inView }: { target: string; inView: boolean }) {
  const hasPlus = target.includes("+");
  const num = parseInt(target.replace("+", ""), 10);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplay(num);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <span>
      {display}
      {hasPlus ? "+" : ""}
    </span>
  );
}

export default function ImpactStats({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      data-chapter="3"
      className="relative py-20 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-violet-50/50"
      onMouseEnter={onEnter}
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-200/30 blur-[140px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-20 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-500">
            Chapter IV — The Impact
          </span>
        </motion.div>

        {/* Intro line */}
        <motion.div
          initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-20 overflow-hidden"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Results that
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              {" "}speak.
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-6 sm:p-8 rounded-[28px] bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_rgba(99,102,241,0.08)] hover:shadow-[0_12px_60px_rgba(99,102,241,0.14)] transition-shadow duration-500"
            >
              {/* Gradient accent */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-[28px] bg-gradient-to-r from-sky-300 via-indigo-400 to-violet-400 opacity-50" />

              {/* Number */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black leading-none tracking-tight bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                <CountUp target={stat.number} inView={inView} />
              </div>

              {/* Label — appears slightly after number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
              >
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-slate-900">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-slate-400 font-medium leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-sky-50/0 to-indigo-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-indigo-300 to-transparent origin-center"
        />
      </div>
    </section>
  );
}
