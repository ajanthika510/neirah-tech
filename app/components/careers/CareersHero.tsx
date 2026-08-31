"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  Code2,
  Sparkles,
} from "lucide-react";

const floatingCards = [
  {
    icon: Brain,
    title: "AI Innovation",
    text: "Build intelligent solutions",
    className: "left-0 top-16",
  },
  {
    icon: Code2,
    title: "Engineering",
    text: "Create what's next",
    className: "right-0 top-44",
  },
  {
    icon: Sparkles,
    title: "Growth",
    text: "Learn. Build. Grow.",
    className: "left-12 bottom-10",
  },
];

export default function CareersHero() {
  return (
    <section className="relative isolate min-h-[780px] overflow-hidden bg-[#F7FAFF]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-blue-300/20 blur-[120px]" />

        <div className="absolute right-[5%] top-[20%] h-96 w-96 rounded-full bg-cyan-300/15 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-200/20 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />
      </div>

      {/* Decorative particles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute left-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-blue-400"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute right-[14%] top-[30%] h-2 w-2 rounded-full bg-cyan-400"
      />

      <div className="mx-auto grid min-h-[780px] max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-2 lg:px-10">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>

            We&apos;re hiring talented people
          </motion.div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#14213D] sm:text-6xl lg:text-7xl">
            Build what&apos;s
            <br />

            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              next with us.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Join Neirah Tech and work with curious minds, creative thinkers,
            and engineers building intelligent digital experiences for the
            future.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#open-positions"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_18px_35px_rgba(37,99,235,0.32)]"
            >
              Explore Open Positions

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#life-at-neirah"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:border-blue-200 hover:text-blue-600"
            >
              Life at Neirah Tech
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>✓ Flexible work</span>
            <span>✓ Learning culture</span>
            <span>✓ AI-focused</span>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <div className="relative mx-auto h-[500px] w-full max-w-[550px]">

          {/* Main orb */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200/70 bg-white/70 shadow-[0_30px_100px_rgba(37,99,235,0.15)] backdrop-blur-xl sm:h-80 sm:w-80"
          >
            {/* rings */}
            <div className="absolute inset-5 rounded-full border border-blue-100" />
            <div className="absolute inset-12 rounded-full border border-blue-100/80" />
            <div className="absolute inset-20 rounded-full border border-blue-200/70" />

            {/* center */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 25px rgba(37,99,235,.15)",
                  "0 0 60px rgba(37,99,235,.3)",
                  "0 0 25px rgba(37,99,235,.15)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative flex h-28 w-28 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-xl"
            >
              <Brain size={48} strokeWidth={1.5} />

              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-blue-600">
                <Sparkles size={12} />
              </span>
            </motion.div>

            {/* Orbit dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-400/50" />
              <span className="absolute bottom-8 right-5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="absolute bottom-10 left-3 h-2 w-2 rounded-full bg-blue-300" />
            </motion.div>
          </motion.div>

          {/* Floating cards */}
          {floatingCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                  },
                  scale: {
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                  },
                  y: {
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`absolute ${card.className} hidden w-48 rounded-2xl border border-white bg-white/85 p-4 shadow-[0_18px_50px_rgba(30,64,175,0.12)] backdrop-blur-xl sm:block`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#17233d]">
                      {card.title}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#why-join"
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-slate-400"
      >
        Scroll to explore
        <ArrowDown size={15} />
      </motion.a>
    </section>
  );
}