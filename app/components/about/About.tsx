"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

import { useState } from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Globe2,
  Lightbulb,
  MessageCircle,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type StoryItem = {
  id: number;
  year: string;
  title: string;
  text: string;
  icon: typeof Users;
};

type ValueItem = {
  number: string;
  title: string;
  text: string;
  icon: typeof MessageCircle;
};

/* =========================================================
   HERO ANIMATIONS
========================================================= */

const heroContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   STORY DATA
========================================================= */

const story: StoryItem[] = [
  {
    id: 1,
    year: "THE BEGINNING",
    title: "Two friends. One conversation.",
    text:
      "After years apart, two friends met again. What started as a simple conversation became a discussion about business, technology, ideas and the problems people face every day.",
    icon: Users,
  },

  {
    id: 2,
    year: "THE IDEA",
    title: "What if we built something?",
    text:
      "The conversation slowly became an idea. Instead of only talking about problems, they wanted to build practical solutions that could make a real difference.",
    icon: Lightbulb,
  },

  {
    id: 3,
    year: "THE FIRST CHAPTER",
    title: "Hardware was the beginning.",
    text:
      "The company started its journey by building hardware-focused solutions. It was the first step toward turning ideas into useful technology.",
    icon: Cpu,
  },

  {
    id: 4,
    year: "THE TURNING POINT",
    title: "Then we saw a bigger problem.",
    text:
      "Hardware could solve one part of a problem. But businesses were also struggling with communication, data, automation, customers and everyday digital work.",
    icon: Sparkles,
  },

  {
    id: 5,
    year: "THE NEXT CHAPTER",
    title: "So we moved into software.",
    text:
      "Neirah Tech expanded into software and digital solutions — helping businesses solve problems not only in the physical world, but also in the digital one.",
    icon: Code2,
  },
];

/* =========================================================
   VALUES
========================================================= */

const values: ValueItem[] = [
  {
    number: "01",
    title: "Understand First",
    text:
      "We don't start with technology. We start by understanding the problem.",
    icon: MessageCircle,
  },

  {
    number: "02",
    title: "Build With Purpose",
    text:
      "Every solution should have a reason to exist and a measurable purpose.",
    icon: Lightbulb,
  },

  {
    number: "03",
    title: "Keep Evolving",
    text:
      "Technology changes. Businesses change. We believe great solutions should evolve too.",
    icon: Rocket,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function About() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <main className="relative overflow-hidden bg-[#020617] text-white">

      {/* =====================================================
          GLOBAL BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Left glow */}

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-60 top-20 h-[550px] w-[550px] rounded-full bg-sky-500/20 blur-[150px]"
        />

        {/* Right glow */}

        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-200px] top-[45%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[160px]"
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 min-h-screen overflow-hidden">

        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">

          <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

            {/* =================================================
                HERO LEFT
            ================================================= */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroContainer}
              className="relative z-20"
            >

              {/* Label */}

              <motion.div variants={fadeUp}>

                <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-5 py-2.5 backdrop-blur-xl">

                  <span className="relative flex h-2.5 w-2.5">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />

                  </span>

                  <span className="text-xs font-bold tracking-[0.25em] text-sky-300">
                    THE NEIRAH TECH STORY
                  </span>

                </div>

              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={fadeUp}
                className="mt-8 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl xl:text-[84px]"
              >
                It started with

                <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  two friends.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-base leading-8 text-slate-400 sm:text-lg"
              >
                A meeting after years apart. A conversation about ideas,
                technology and real-world problems. And eventually, a
                decision to build something together.
              </motion.p>

              {/* Small line */}

              <motion.div
                variants={fadeUp}
                className="mt-10 flex items-center gap-4"
              >

                <div className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent" />

                <span className="text-sm font-medium text-slate-500">
                  Every journey starts somewhere.
                </span>

              </motion.div>

              {/* Scroll */}

              <motion.div
                variants={fadeUp}
                className="mt-12 flex items-center gap-4"
              >

                <motion.div
                  animate={{
                    y: [0, 7, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                >
                  <ArrowDown
                    size={17}
                    className="text-sky-400"
                  />
                </motion.div>

                <span className="text-xs font-medium tracking-wide text-slate-600">
                  Discover our journey
                </span>

              </motion.div>

            </motion.div>

            {/* =================================================
                HERO RIGHT
            ================================================= */}

            <div className="relative mx-auto h-[520px] w-full max-w-[580px] sm:h-[560px] lg:h-[600px]">

              {/* Atmospheric glow */}

              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.15, 0.28, 0.15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 blur-[120px]"
              />

              {/* Orbit 1 */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/[0.08]"
              />

              {/* Orbit 2 */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/[0.10]"
              />

              {/* Vertical connection */}

              <div className="absolute left-1/2 top-1/2 hidden h-[290px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-sky-400/40 to-transparent sm:block" />

              {/* Moving connection particle */}

              <motion.div
                animate={{
                  y: [-120, 120, -120],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,1)]"
              />

              {/* =================================================
                  FRIEND CARD
              ================================================= */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-[55px] z-20 w-[230px] rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl sm:left-4 sm:w-[245px]"
              >

                <div className="flex items-center gap-4">

                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500">

                    <Users
                      size={23}
                      className="text-white"
                    />

                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#020617] bg-emerald-400" />

                  </div>

                  <div>

                    <p className="text-sm font-bold text-white">
                      Two friends
                    </p>

                    <p className="text-xs text-slate-500">
                      After years apart
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-2xl bg-white/[0.05] p-4">

                  <p className="text-sm leading-6 text-slate-300">
                    “What if we built something useful?”
                  </p>

                </div>

                <div className="mt-4 flex items-center gap-2">

                  <MessageCircle
                    size={13}
                    className="text-sky-400"
                  />

                  <span className="text-[11px] text-slate-600">
                    One conversation
                  </span>

                </div>

              </motion.div>

              {/* =================================================
                  IDEA CARD
              ================================================= */}

              <motion.div
                animate={{
                  y: [0, 14, 0],
                  rotate: [1, -1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute right-0 top-[175px] z-20 w-[235px] rounded-[28px] border border-cyan-400/15 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-2xl sm:right-2 sm:w-[250px]"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">

                    <Lightbulb
                      size={24}
                      className="text-cyan-300"
                    />

                  </div>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                    Idea
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Let's solve real problems.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  And that's where the journey began.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">

                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  Turning conversations into ideas

                </div>

              </motion.div>

              {/* =================================================
                  HARDWARE → SOFTWARE CARD
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute bottom-[95px] left-1/2 z-30 w-[290px] -translate-x-1/2"
              >

                <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-2xl">

                  <div className="flex items-center justify-between">

                    {/* Hardware */}

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10">

                        <Cpu
                          size={17}
                          className="text-sky-400"
                        />

                      </div>

                      <span className="text-xs font-semibold text-slate-300">
                        Hardware
                      </span>

                    </div>

                    {/* Arrow */}

                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >

                      <ArrowRight
                        size={17}
                        className="text-cyan-400"
                      />

                    </motion.div>

                    {/* Software */}

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-400/10">

                        <Code2
                          size={17}
                          className="text-indigo-400"
                        />

                      </div>

                      <span className="text-xs font-semibold text-slate-300">
                        Software
                      </span>

                    </div>

                  </div>

                  <div className="mt-4 border-t border-white/[0.06] pt-3 text-center">

                    <p className="text-[11px] tracking-wide text-slate-500">
                      From physical solutions to digital possibilities
                    </p>

                  </div>

                </div>

              </motion.div>

              {/* =================================================
                  HERO STATS
              ================================================= */}

              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap">

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl"
                >

                  <p className="text-xl font-black text-white">
                    10<span className="text-sky-400">+</span>
                  </p>

                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                    Years
                  </p>

                </motion.div>

                <div className="h-8 w-px bg-white/10" />

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl"
                >

                  <p className="text-xl font-black text-white">
                    11<span className="text-cyan-400">+</span>
                  </p>

                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                    Countries
                  </p>

                </motion.div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONVERSATION SECTION
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >

              <span className="text-sm font-bold tracking-[0.3em] text-sky-400">
                ONE CONVERSATION
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                Sometimes the biggest ideas begin with a simple question.
              </h2>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="relative"
            >

              <div className="absolute -inset-10 rounded-full bg-sky-500/10 blur-[100px]" />

              <div className="relative rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">

                <MessageCircle
                  className="text-sky-400"
                  size={36}
                />

                <p className="mt-8 text-xl leading-9 text-slate-300">
                  “What if we could build something that actually solves
                  people's problems?”
                </p>

                <div className="mt-8 flex items-center gap-3">

                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500" />

                  <div>

                    <p className="font-semibold">
                      Two friends
                    </p>

                    <p className="text-sm text-slate-500">
                      One unexpected idea
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INTERACTIVE JOURNEY
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16">

            <span className="text-sm font-bold tracking-[0.3em] text-sky-400">
              OUR JOURNEY
            </span>

            <h2 className="mt-5 text-4xl font-black md:text-6xl">
              One chapter at a time.
            </h2>

            <p className="mt-5 max-w-2xl text-lg text-slate-400">
              Our story changed as we discovered new problems worth solving.
            </p>

          </div>

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">

            {/* Navigation */}

            <div className="space-y-3">

              {story.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveStory(index)
                    }
                    whileHover={{
                      x: 6,
                    }}
                    className={`relative flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                      activeStory === index
                        ? "bg-white/[0.08]"
                        : "bg-transparent hover:bg-white/[0.04]"
                    }`}
                  >

                    {activeStory === index && (
                      <motion.div
                        layoutId="activeStory"
                        className="absolute left-0 top-0 h-full w-1 rounded-full bg-sky-400"
                      />
                    )}

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        activeStory === index
                          ? "bg-sky-500/20 text-sky-400"
                          : "bg-white/[0.05] text-slate-500"
                      }`}
                    >

                      <Icon size={20} />

                    </div>

                    <div>

                      <p
                        className={`text-xs font-bold tracking-widest ${
                          activeStory === index
                            ? "text-sky-400"
                            : "text-slate-600"
                        }`}
                      >
                        {item.year}
                      </p>

                      <p
                        className={`mt-1 text-sm font-semibold ${
                          activeStory === index
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {item.title}
                      </p>

                    </div>

                  </motion.button>
                );
              })}

            </div>

            {/* Story content */}

            <AnimatePresence mode="wait">

              <motion.div
                key={story[activeStory].id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="relative min-h-[470px] overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04]"
              >

                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[100px]" />

                <div className="relative flex h-full flex-col justify-between p-8 md:p-14">

                  <div>

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-bold tracking-[0.3em] text-sky-400">
                        {story[activeStory].year}
                      </span>

                      <span className="text-6xl font-black text-white/[0.04] md:text-8xl">
                        0{story[activeStory].id}
                      </span>

                    </div>

                    <h3 className="mt-10 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                      {story[activeStory].title}
                    </h3>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
                      {story[activeStory].text}
                    </p>

                  </div>

                  <div className="mt-12 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      {story.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setActiveStory(index)
                          }
                          aria-label={`Go to chapter ${
                            index + 1
                          }`}
                          className={`h-2 rounded-full transition-all ${
                            activeStory === index
                              ? "w-10 bg-sky-400"
                              : "w-2 bg-white/20"
                          }`}
                        />
                      ))}

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStory(
                          activeStory ===
                            story.length - 1
                            ? 0
                            : activeStory + 1
                        )
                      }
                      className="flex items-center gap-2 text-sm font-semibold text-sky-400"
                    >
                      Next chapter
                      <ArrowRight size={17} />
                    </button>

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

      </section>

      {/* =====================================================
          HARDWARE → SOFTWARE
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-6xl">

          <div className="mb-16 text-center">

            <span className="text-sm font-bold tracking-[0.3em] text-sky-400">
              THE TURNING POINT
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-6xl">

              Hardware was the beginning.

              <span className="block text-slate-500">
                Software became the next possibility.
              </span>

            </h2>

          </div>

          <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-white/[0.04] p-6 md:p-12">

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 blur-[120px]"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">

              {/* Hardware */}

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="rounded-[32px] border border-sky-400/20 bg-sky-400/[0.05] p-8 md:p-10"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15">

                  <Cpu
                    size={30}
                    className="text-sky-400"
                  />

                </div>

                <p className="mt-8 text-sm font-bold tracking-[0.25em] text-sky-400">
                  CHAPTER ONE
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  Hardware
                </h3>

                <p className="mt-5 leading-8 text-slate-400">
                  We began by creating physical technology designed to solve
                  practical problems.
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">

                  <Zap size={15} />

                  Where our journey started

                </div>

              </motion.div>

              {/* Transformation */}

              <div className="flex flex-col items-center">

                <motion.div
                  animate={{
                    x: [-8, 8, -8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10"
                >

                  <ArrowRight
                    size={28}
                    className="text-cyan-300"
                  />

                </motion.div>

                <motion.div
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-widest text-cyan-400"
                >
                  We evolved
                </motion.div>

              </div>

              {/* Software */}

              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="rounded-[32px] border border-indigo-400/20 bg-indigo-400/[0.05] p-8 md:p-10"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15">

                  <Code2
                    size={30}
                    className="text-indigo-400"
                  />

                </div>

                <p className="mt-8 text-sm font-bold tracking-[0.25em] text-indigo-400">
                  CHAPTER TWO
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  Software
                </h3>

                <p className="mt-5 leading-8 text-slate-400">
                  We expanded into digital solutions to help businesses solve
                  bigger and more connected problems.
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">

                  <Rocket size={15} />

                  Where we're growing

                </div>

              </motion.div>

            </div>

            {/* Bottom statement */}

            <div className="relative mt-12 border-t border-white/10 pt-10 text-center">

              <p className="mx-auto max-w-3xl text-xl leading-9 text-slate-300 md:text-2xl">

                We didn't leave hardware behind.

                <span className="text-sky-400">
                  {" "}
                  We simply realized there were more problems we could solve.
                </span>

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-3">

            <StatCard
              value="10+"
              label="Years"
              text="A decade of building, learning and evolving."
            />

            <StatCard
              value="11+"
              label="Countries"
              text="Serving businesses and ideas beyond borders."
            />

            <StatCard
              value="∞"
              label="Possibilities"
              text="Because there are always new problems worth solving."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <span className="text-sm font-bold tracking-[0.3em] text-sky-400">
              WHAT GUIDES US
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-6xl">

              Technology is only useful

              <span className="block text-slate-500">
                when it solves something.
              </span>

            </h2>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {values.map((value, index) => {

              const Icon = value.icon;

              return (
                <motion.div
                  key={value.number}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group rounded-[32px] border border-white/10 bg-white/[0.04] p-8"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-black text-sky-400">
                      {value.number}
                    </span>

                    <Icon
                      size={24}
                      className="text-slate-600 transition-colors group-hover:text-sky-400"
                    />

                  </div>

                  <h3 className="mt-12 text-2xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {value.text}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          GLOBAL REACH
      ===================================================== */}

      <section className="relative z-10 px-6 py-32">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative overflow-hidden rounded-[44px] border border-white/10 bg-gradient-to-br from-sky-500/10 via-white/[0.03] to-indigo-500/10 p-10 text-center md:p-20"
          >

            {/* Orbit */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-400/10"
            />

            <div className="relative">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-[0_0_60px_rgba(56,189,248,.3)]">

                <Globe2 size={38} />

              </div>

              <p className="mt-10 text-sm font-bold tracking-[0.3em] text-sky-400">
                BEYOND BORDERS
              </p>

              <h2 className="mt-6 text-5xl font-black md:text-7xl">
                11+
              </h2>

              <p className="mt-3 text-2xl font-bold">
                Countries Served
              </p>

              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                What began as a conversation between two friends has grown
                into a journey reaching businesses across borders.
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative z-10 px-6 pb-40 pt-20">

        <div className="mx-auto max-w-5xl text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >

            <p className="text-sm font-bold tracking-[0.3em] text-sky-400">
              THE STORY CONTINUES
            </p>

            <h2 className="mt-6 text-4xl font-black md:text-7xl">

              Your problem could be

              <span className="block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                our next conversation.
              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              We started by talking about problems. We still do.
              The difference is that today, we have the experience,
              technology and team to help turn those conversations into
              solutions.
            </p>

            <motion.a
              href="/contact"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 font-bold shadow-[0_15px_50px_rgba(14,165,233,.2)]"
            >

              Start a Conversation

              <ArrowUpRight size={20} />

            </motion.a>

          </motion.div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  value,
  label,
  text,
}: {
  value: string;
  label: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10"
    >

      <p className="text-6xl font-black text-white md:text-7xl">
        {value}
      </p>

      <p className="mt-3 text-xl font-bold">
        {label}
      </p>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

    </motion.div>
  );
}