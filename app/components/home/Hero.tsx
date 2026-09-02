"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  ChevronDown,
  Cpu,
  Palette,
  Truck,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import HeroBackground from "./HeroBackground";
import SchedulerModal from "./SchedulerModal";

function HeroCountUp({ target }: { target: string }) {
  const hasPlus = target.includes("+");
  const hasPercent = target.includes("%");
  const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || isNaN(num)) return;
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
    <span ref={ref}>
      {display}
      {hasPlus ? "+" : ""}
      {hasPercent ? "%" : ""}
    </span>
  );
}

export default function Hero() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  /* ==========================================
     RESPONSIVE ORBIT TIERS
  ========================================== */
  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 380) {
        setRadius(108);
      } else if (w < 640) {
        setRadius(126);
      } else if (w < 1024) {
        setRadius(175);
      } else {
        setRadius(200);
      }
    };

    updateRadius();
    let frame: number;
    const handleResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateRadius);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* ==========================================
     NEIRAH SERVICE ECOSYSTEM
  ========================================== */
  const services = useMemo(
    () => [
      {
        name: "Digital Product Design",
        shortName: "Digital Design",
        icon: Palette,
        angle: 0,
        accent: "text-sky-600",
        iconBg: "bg-sky-50 border-sky-100",
        ring: "rgba(14,165,233,.35)",
      },
      {
        name: "AI & Automation",
        shortName: "AI & Automation",
        icon: Brain,
        angle: 72,
        accent: "text-violet-600",
        iconBg: "bg-violet-50 border-violet-100",
        ring: "rgba(139,92,246,.35)",
      },
      {
        name: "Business Software",
        shortName: "Business Software",
        icon: Building2,
        angle: 144,
        accent: "text-indigo-600",
        iconBg: "bg-indigo-50 border-indigo-100",
        ring: "rgba(99,102,241,.35)",
      },
      {
        name: "Mobility & Delivery",
        shortName: "Mobility",
        icon: Truck,
        angle: 216,
        accent: "text-cyan-600",
        iconBg: "bg-cyan-50 border-cyan-100",
        ring: "rgba(6,182,212,.35)",
      },
      {
        name: "IoT & Smart Systems",
        shortName: "IoT & Smart Systems",
        icon: Cpu,
        angle: 288,
        accent: "text-emerald-600",
        iconBg: "bg-emerald-50 border-emerald-100",
        ring: "rgba(16,185,129,.35)",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { value: "250+", label: "Projects" },
      { value: "98%", label: "Satisfaction" },
      { value: "10+", label: "Years" },
    ],
    []
  );

  const orbitVariants: Variants = {
    animate: prefersReducedMotion
      ? { rotate: 0 }
      : {
          rotate: 360,
          transition: { duration: 40, ease: "linear", repeat: Infinity },
        },
  };

  const cardVariants: Variants = {
    animate: prefersReducedMotion
      ? { rotate: 0 }
      : {
          rotate: -360,
          transition: { duration: 40, ease: "linear", repeat: Infinity },
        },
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(
    heroScroll,
    [0, 0.75],
    prefersReducedMotion ? [1, 1] : [1, 0.35]
  );
  const heroScale = useTransform(
    heroScroll,
    [0, 0.85],
    prefersReducedMotion ? [1, 1] : [1, 0.96]
  );
  const heroY = useTransform(
    heroScroll,
    [0, 0.85],
    prefersReducedMotion ? [0, 0] : [0, -35]
  );

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="
          relative
          min-h-screen
          pt-28
          sm:pt-32
          pb-16
          sm:pb-20
          flex
          items-center
          justify-center
          bg-gradient-to-b
          from-[#F8FBFF]
          via-sky-50/40
          to-[#F8FBFF]
          overflow-hidden
        "
      >
        <HeroBackground />

        {/* AURORA FIELD */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { x: [0, 40, 0], y: [0, -25, 0] }
            }
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-sky-300/30 rounded-full blur-[80px] sm:blur-[140px]"
          />
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { x: [0, -35, 0], y: [0, 30, 0] }
            }
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-300/30 rounded-full blur-[80px] sm:blur-[140px]"
          />
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.06, 1] }
            }
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-cyan-200/20 rounded-full blur-[100px]"
          />
        </div>

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* DOT GRID */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#0ea5e9 1px,transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* MAIN CONTENT */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="
            max-w-7xl mx-auto px-5 sm:px-6
            grid grid-cols-1 lg:grid-cols-12
            gap-10 lg:gap-12 items-center
            relative z-10 w-full
          "
        >
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 space-y-7 sm:space-y-8 text-center lg:text-left">
            {/* Badge (Static Text) */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-sky-400" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-sky-500">
                Technology for Every Layer of Business
              </span>
              <div className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
            </div>

            {/* HEADING (Static Text - No Animation) */}
            <div className="space-y-4">
              <h1
                className="
                  font-display font-extrabold
                  text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem]
                  tracking-tight leading-[1.08] sm:leading-[1.04]
                  text-slate-900
                "
              >
                Technology That{" "}
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent block sm:inline">
                  Connects Business.
                </span>
              </h1>

              <p
                className="
                  text-slate-500 text-base sm:text-lg md:text-xl
                  font-light leading-relaxed max-w-xl mx-auto lg:mx-0
                "
              >
                We design digital experiences, build intelligent software, automate businesses and connect technology with the physical world.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div
              className="
                relative z-20
                flex flex-col sm:flex-row items-center
                justify-center lg:justify-start gap-3 sm:gap-4
              "
            >
              <button
                type="button"
                onClick={() => setSchedulerOpen(true)}
                aria-label="Book a demo"
                aria-haspopup="dialog"
                aria-expanded={schedulerOpen}
                className="
                  group relative w-full sm:w-auto
                  px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                  bg-gradient-to-r from-sky-500 to-cyan-400
                  text-white font-bold tracking-wide overflow-hidden
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(14,165,233,.35)]
                  active:translate-y-0
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                  flex items-center justify-center gap-2 cursor-pointer
                  pointer-events-auto select-none
                "
              >
                <span
                  className="
                    absolute inset-0 -translate-x-full group-hover:translate-x-full
                    transition-transform duration-700 ease-out
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    pointer-events-none
                  "
                />
                <span className="relative pointer-events-none">Book a Demo</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 pointer-events-none" />
              </button>

              <Link
                href="/services"
                aria-label="Explore Solutions"
                className="
                  group w-full sm:w-auto
                  px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                  bg-white border border-slate-200 text-slate-800
                  font-bold tracking-wide shadow-sm transition-all duration-300
                  hover:bg-slate-50 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_10px_30px_rgba(15,23,42,.06)]
                  active:translate-y-0
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                  flex items-center justify-center gap-2 cursor-pointer
                  pointer-events-auto select-none
                "
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 pointer-events-none" />
              </Link>
            </div>

            {/* TRUST STATS WITH RUNNING NUMBERS (Static Labels) */}
            <div
              className="
                pt-5 sm:pt-6 border-t border-slate-200
                flex flex-wrap items-center justify-center lg:justify-start
                gap-5 sm:gap-8
              "
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-5 sm:gap-8">
                  {i > 0 && <div className="w-px h-8 bg-slate-300 hidden sm:block" />}
                  <div className="text-center lg:text-left">
                    <p className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                      <HeroCountUp target={stat.value} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SERVICE ECOSYSTEM */}
          <div
            className="
              lg:col-span-6 relative flex items-center justify-center
              min-h-[390px] sm:min-h-[480px] lg:min-h-[560px]
              mt-2 lg:mt-0
            "
          >
            <motion.div
              variants={orbitVariants}
              animate="animate"
              className="
                relative w-[220px] min-[380px]:w-[260px] sm:w-[440px]
                h-[220px] min-[380px]:h-[260px] sm:h-[440px]
                rounded-full border border-sky-200 bg-white/40 backdrop-blur-xl
                shadow-[0_20px_80px_rgba(14,165,233,.15)]
                flex items-center justify-center will-change-transform
              "
            >
              {/* ORBIT LINE */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-40">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="1"
                  strokeDasharray="6,12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
                />
              </svg>

              {/* Secondary orbit */}
              <div className="absolute inset-[12%] rounded-full border border-dashed border-indigo-200/50 pointer-events-none" />

              {/* SERVICE CARDS */}
              {services.map((item, index) => {
                const radian = (item.angle * Math.PI) / 180;
                const x = Math.round(Math.cos(radian) * radius);
                const y = Math.round(Math.sin(radian) * radius);
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="absolute left-1/2 top-1/2 pointer-events-auto"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <Link
                      href="/services"
                      aria-label={`Explore ${item.name}`}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl pointer-events-auto"
                    >
                      <motion.div
                        variants={cardVariants}
                        animate="animate"
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          opacity: { duration: 0.5, delay: 0.5 + index * 0.1 },
                          scale: {
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                            delay: 0.5 + index * 0.1,
                          },
                        }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: `0 0 25px ${item.ring}`,
                        }}
                        className="
                          flex items-center gap-1.5 min-[380px]:gap-2 sm:gap-2.5
                          w-max min-w-[114px] max-w-[155px] min-[400px]:min-w-[130px] min-[400px]:max-w-[180px] sm:min-w-[185px] sm:max-w-none
                          rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95
                          p-1.5 min-[380px]:p-2 sm:py-2.5 sm:px-3.5 shadow-[0_10px_30px_rgba(15,23,42,.08)]
                          backdrop-blur-xl transition-colors duration-300
                          hover:border-sky-300 cursor-pointer
                        "
                      >
                        <div className={`shrink-0 rounded-lg sm:rounded-xl border p-1 sm:p-1.5 ${item.iconBg}`}>
                          <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.accent}`} />
                        </div>
                        <span className="text-[10px] min-[380px]:text-[11px] sm:text-xs font-bold leading-snug tracking-tight text-slate-800 whitespace-normal sm:whitespace-nowrap">
                          <span className="min-[440px]:hidden">{item.shortName}</span>
                          <span className="hidden min-[440px]:inline">{item.name}</span>
                        </span>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </motion.div>

            {/* CENTRAL NEIRAH CORE */}
            <div
              className="
                absolute w-[80px] h-[80px] min-[380px]:w-[100px] min-[380px]:h-[100px] sm:w-40 sm:h-40 rounded-full
                bg-white border border-sky-200 flex items-center justify-center
                shadow-[0_0_80px_rgba(14,165,233,.25)] backdrop-blur-xl select-none pointer-events-none
              "
            >
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }
                }
                transition={{ duration: 4, repeat: Infinity }}
                className="
                  absolute inset-1.5 min-[380px]:inset-2 sm:inset-3 rounded-full
                  bg-gradient-to-tr from-sky-300/40 via-blue-300/30 to-indigo-300/40 blur-xl
                "
              />

              <div
                className="
                  relative z-10 flex items-center justify-center
                  w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
                  rounded-full bg-white/80 border border-sky-200 backdrop-blur-md
                  shadow-[0_0_40px_rgba(14,165,233,.25)] overflow-hidden
                "
              >
                <Image
                  src="/images/Neiro.png"
                  alt="Neirah Tech"
                  width={180}
                  height={180}
                  priority
                  className="
                    w-20 h-20 min-[380px]:w-28 min-[380px]:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
                    object-contain drop-shadow-[0_0_25px_rgba(14,165,233,.5)]
                  "
                />
              </div>

              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2.5 min-[380px]:-inset-3 sm:-inset-4 rounded-full border border-sky-300/50"
              />
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 min-[380px]:-inset-6 sm:-inset-8 rounded-full border border-indigo-300/40"
              />
              <div
                className="
                  absolute -inset-[24px] min-[380px]:-inset-[32px] sm:-inset-[45px] rounded-full
                  border border-dashed border-sky-300/40
                "
              />
            </div>
          </div>
        </motion.div>

        {/* SCROLL CUE */}
        <button
          type="button"
          onClick={() => {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Scroll to services"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer select-none transition-transform hover:scale-105 pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-400 pointer-events-none">
            Scroll
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none"
          >
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </motion.div>
        </button>

        {/* SECTION BLEND */}
        <div
          className="
            pointer-events-none absolute bottom-0 left-0 right-0
            h-20 sm:h-28 z-10 bg-gradient-to-b from-transparent to-[#f8fbff]
          "
        />
      </section>

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
      />
    </>
  );
}