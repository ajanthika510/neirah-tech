"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Globe2,
  Sparkles,
  Cpu,
  Users,
  Compass,
  ShieldCheck,
  Box,
} from "lucide-react";

import StorytellingSection from "./StorytellingSection";

/* =========================================================
   SMALL REVEAL COMPONENT
========================================================= */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   HERO (NO RIGHT SIDE GRAPHIC — DELETED AS REQUESTED)
========================================================= */

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const scrollToNext = () => {
    const el = document.getElementById("intro");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[85svh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b1329] to-slate-900 text-white pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-44 lg:pb-36"
    >
      {/* AMBIENT BACKGROUND GLOWS MATCHING POSTER */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[600px] w-[600px] rounded-full bg-sky-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-6 sm:px-10 lg:px-16 text-center">
        {/* CENTERED EDITORIAL HERO CONTENT */}
        <motion.div style={{ y: textY }} className="mx-auto max-w-4xl space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full bg-sky-500/10 px-4 py-2 border border-sky-400/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-300">
                ABOUT NEIRAH
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl xl:text-9xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              It started <br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                with two friends.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mx-auto max-w-2xl space-y-2 text-lg font-medium text-slate-300 sm:text-2xl sm:leading-relaxed">
              <p>A conversation became an idea.</p>
              <p className="text-sky-400 font-semibold">The idea became something much bigger.</p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="pt-4">
              <button
                onClick={scrollToNext}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-xl shadow-sky-500/10 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <span>Let's Start</span>
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* ORGANIC BOTTOM SVG WAVE DIVIDER */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 lg:h-20 fill-[#f8fbff]"
        >
          <path d="M0,0 C180,90 400,-30 600,50 C800,130 1020,20 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}

/* =========================================================
   INTRO SECTION: LET'S START
========================================================= */

function IntroSection() {
  return (
    <section id="intro" className="relative overflow-hidden bg-[#f8fbff] py-20 sm:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-sky-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-600">
                LET'S START
              </span>
              <span className="h-px w-8 bg-sky-500" />
            </div>

            <h2
              className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Every company has a beginning.
            </h2>

            <p className="text-lg leading-relaxed text-slate-600 sm:text-2xl sm:leading-relaxed max-w-2xl mx-auto font-medium">
              Ours didn't begin with a product, a pitch deck, or a business plan. It began with two people sitting down and asking what could be different.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   TURNING POINT SECTION
========================================================= */

function TurningPoint() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0.75, 1, 1.05]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="turning-point"
      ref={ref}
      className="relative overflow-hidden bg-[#f8fbff] py-24 sm:py-32 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1350px] px-6 sm:px-10 lg:px-16">
        <motion.div style={{ opacity }} className="relative text-center flex flex-col items-center">
          <Reveal>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-600">
              THE TURNING POINT
            </span>

            <h2
              className="mt-6 max-w-5xl text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              We solved one problem. <br />
              <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Then we saw another.
              </span>
            </h2>
          </Reveal>

          {/* SYSTEM DIAGRAM NODES */}
          <div className="relative mt-12 h-[220px] w-full max-w-4xl sm:mt-16 sm:h-[260px]">
            {/* CONNECTORS */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
              viewBox="0 0 1000 240"
              preserveAspectRatio="none"
            >
              <line
                x1="200"
                y1="120"
                x2="500"
                y2="120"
                stroke="rgba(14,165,233,.3)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
              <line
                x1="800"
                y1="120"
                x2="500"
                y2="120"
                stroke="rgba(99,102,241,.3)"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
            </svg>

            {/* HARDWARE NODE */}
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 sm:left-[10%]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-sky-300 bg-white/90 text-center text-xs font-bold uppercase tracking-wider text-sky-600 shadow-[0_15px_40px_rgba(14,165,233,0.15)] backdrop-blur-md sm:h-28 sm:w-28 sm:text-sm">
                Hardware
              </div>
            </div>

            {/* SOFTWARE NODE */}
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 sm:right-[10%]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-indigo-300 bg-white/90 text-center text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-[0_15px_40px_rgba(99,102,241,0.15)] backdrop-blur-md sm:h-28 sm:w-28 sm:text-sm">
                Software
              </div>
            </div>

            {/* CENTRAL CONNECTED SYSTEMS NODE */}
            <motion.div
              style={{ scale }}
              className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-200 bg-white text-center text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:h-36 sm:w-36 sm:text-sm"
            >
              Connected <br /> systems
            </motion.div>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              Communication. Data. Automation. Customers. Digital workflows. Everything was connected.
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FUTURE SECTION (THE NEXT CHAPTER: FROM PHYSICAL TO DIGITAL)
========================================================= */

function FutureSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.8],
    [0.8, 1, 1.05]
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f8fbff] py-24 sm:py-32 lg:py-36">
      <div className="relative z-10 mx-auto max-w-[1350px] px-6 sm:px-10 lg:px-16 text-center flex flex-col items-center">
        <Reveal>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-indigo-600">
            THE NEXT CHAPTER
          </span>

          <h2
            className="mt-6 max-w-5xl text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            From physical <br />
            <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              to digital.
            </span>
          </h2>
        </Reveal>

        {/* ORBIT GRAPHIC WITH DIGITAL SOLUTIONS AT CENTER */}
        <motion.div
          style={{ scale }}
          className="relative mt-12 h-[220px] w-[220px] sm:mt-16 sm:h-[320px] sm:w-[320px]"
        >
          <div className="absolute inset-0 rounded-full border border-sky-200" />
          <div className="absolute inset-[12%] rounded-full border border-indigo-200" />
          <div className="absolute inset-[24%] rounded-full border border-violet-200" />

          {/* CENTER NODE */}
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-center text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-[0_15px_50px_rgba(15,23,42,0.12)] sm:h-28 sm:w-28 sm:text-sm">
            Digital <br /> solutions
          </div>

          {/* ORBIT NODES */}
          {[
            ["Data", "top-0 left-1/2 -translate-x-1/2"],
            ["Automation", "right-0 top-1/2 -translate-y-1/2"],
            ["Customers", "bottom-0 left-1/2 -translate-x-1/2"],
            ["Systems", "left-0 top-1/2 -translate-y-1/2"],
          ].map(([label, position], index) => (
            <motion.div
              key={label}
              className={`absolute ${position} flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[9px] font-bold uppercase tracking-wider text-slate-700 shadow-md sm:h-11 sm:px-4 sm:text-xs`}
              animate={{
                y: [0, index % 2 === 0 ? -6 : 6, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            Today, we're building digital products and connected experiences that help businesses move forward.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   WHAT DRIVES US
========================================================= */

function WhatDrivesUs() {
  const pillars = [
    {
      number: "01",
      title: "Think beyond the obvious.",
      description: "We question what exists before deciding what should exist next.",
      icon: Users,
    },
    {
      number: "02",
      title: "Build for real problems.",
      description: "Every product starts with a genuine human or business friction point.",
      icon: Compass,
    },
    {
      number: "03",
      title: "Make technology feel human.",
      description: "Complex digital systems should feel intuitive, alive, and accessible.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-20 sm:py-28 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT EDITORIAL STATEMENT */}
          <Reveal className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-sky-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-600">
                WHAT DRIVES US
              </span>
            </div>

            <h2
              className="text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              The idea changed. <br />
              <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                The mindset didn't.
              </span>
            </h2>
          </Reveal>

          {/* RIGHT COLUMN: EDITORIAL PRINCIPLES LIST */}
          <div className="lg:col-span-7 space-y-0">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;

              return (
                <Reveal key={pillar.title} delay={idx * 0.1}>
                  <div className="group relative flex items-start gap-6 border-b border-slate-200/80 py-8 first:border-t transition-colors hover:border-sky-400">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50/90 text-sky-600 border border-sky-100 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white">
                      <IconComp size={22} />
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-sky-500">{pillar.number}</span>
                        <h3
                          className="text-xl font-bold text-slate-950 sm:text-2xl transition-colors group-hover:text-sky-600"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                        {pillar.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="shrink-0 text-slate-300 opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-sky-500 mt-2"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white sm:py-36">
      <div className="pointer-events-none absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-sky-500/15 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-6 text-center sm:px-10 lg:px-16">
        <Reveal>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-400">
            THE STORY CONTINUES
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Your problem could be <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              our next conversation.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            We started by talking about problems. We still do. The difference is that today, we have the experience, technology and team to help turn those conversations into solutions.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-sky-500 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-sky-500/20 hover:bg-sky-400 transition-all duration-300"
            >
              <span>Start a conversation</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <main className="relative overflow-hidden bg-[#f8fbff] text-slate-950">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600"
      />

      <AboutHero />

      <IntroSection />

      {/* 5 Storytelling Chapters */}
      <StorytellingSection />

      <TurningPoint />

      <FutureSection />

      <WhatDrivesUs />

      <FinalCTA />
    </main>
  );
}