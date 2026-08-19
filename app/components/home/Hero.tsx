"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cpu,
  Palette,
  Truck,
  Building2,
  ArrowUpRight,
} from "lucide-react";

import Image from "next/image";
import HeroBackground from "./HeroBackground";
import SchedulerModal from "./SchedulerModal";

export default function Hero() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ==========================================
     RESPONSIVE ORBIT
  ========================================== */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ==========================================
     NEIRAH SERVICE ECOSYSTEM

     These are services/capabilities,
     NOT individual products.
  ========================================== */

  const services = [
    {
      name: "Digital Product Design",
      shortName: "Digital Design",
      icon: <Palette className="w-4 h-4 text-sky-600" />,
      angle: 0,
    },
    {
      name: "AI & Automation",
      shortName: "AI & Automation",
      icon: <Brain className="w-4 h-4 text-sky-600" />,
      angle: 72,
    },
    {
      name: "Business Software",
      shortName: "Business Software",
      icon: <Building2 className="w-4 h-4 text-sky-600" />,
      angle: 144,
    },
    {
      name: "Mobility & Delivery",
      shortName: "Mobility",
      icon: <Truck className="w-4 h-4 text-sky-600" />,
      angle: 216,
    },
    {
      name: "IoT & Smart Systems",
      shortName: "IoT & Smart Systems",
      icon: <Cpu className="w-4 h-4 text-sky-600" />,
      angle: 288,
    },
  ];

  /*
    Smaller radius on mobile so the orbit
    stays inside the viewport.
  */
  const radius = isMobile ? 125 : 190;

  return (
    <>
      <section
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
          bg-gradient-to-br
          from-white
          via-sky-50
          to-indigo-50
          overflow-hidden
        "
      >
        <HeroBackground />

        {/* ==========================================
            AMBIENT GLOW
        ========================================== */}

        <div
          className="
            absolute
            top-1/4
            left-1/4
            -translate-x-1/2
            -translate-y-1/2
            w-64
            h-64
            sm:w-96
            sm:h-96
            bg-sky-300/30
            rounded-full
            blur-[120px]
            sm:blur-[140px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            bottom-1/4
            right-1/4
            translate-x-1/2
            translate-y-1/2
            w-64
            h-64
            sm:w-96
            sm:h-96
            bg-indigo-300/30
            rounded-full
            blur-[120px]
            sm:blur-[140px]
            pointer-events-none
          "
        />

        {/* ==========================================
            DOT GRID
        ========================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            pointer-events-none
          "
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px,#0ea5e9 1px,transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ==========================================
            MAIN CONTENT
        ========================================== */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-10
            lg:gap-12
            items-center
            relative
            z-10
            w-full
          "
        >
          {/* ==========================================
              LEFT CONTENT
          ========================================== */}

          <div
            className="
              lg:col-span-6
              space-y-7
              sm:space-y-8
              text-center
              lg:text-left
            "
          >
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                bg-sky-100
                border
                border-sky-200
                text-sky-700
                text-xs
                font-medium
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-sky-500
                  animate-pulse
                "
              />

              Technology for Every Layer of Business
            </motion.div>

            {/* ==========================================
                HEADING
            ========================================== */}

            <div className="space-y-4">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="
                  font-display
                  font-extrabold
                  text-[2.5rem]
                  leading-[1.05]
                  sm:text-5xl
                  md:text-6xl
                  text-slate-900
                  tracking-tight
                "
              >
                Technology That
                <br />

                <span
                  className="
                    bg-clip-text
                    text-transparent
                    bg-gradient-to-r
                    from-sky-500
                    via-indigo-600
                    to-sky-500
                    bg-[length:200%_auto]
                    animate-[pulse_6s_linear_infinite]
                  "
                >
                  Connects Business.
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="
                  text-slate-600
                  text-base
                  sm:text-lg
                  md:text-xl
                  leading-relaxed
                  max-w-xl
                  mx-auto
                  lg:mx-0
                "
              >
                We design digital experiences, build intelligent software,
                automate businesses and connect technology with the physical
                world.
              </motion.p>
            </div>

            {/* ==========================================
                ACTION BUTTONS
            ========================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                lg:justify-start
                gap-3
                sm:gap-4
              "
            >
              {/* BOOK DEMO */}

              <button
                type="button"
                onClick={() => setSchedulerOpen(true)}
                className="
                  group
                  w-full
                  sm:w-auto
                  px-7
                  sm:px-8
                  py-3.5
                  sm:py-4
                  rounded-full
                  bg-gradient-to-r
                  from-sky-500
                  to-cyan-400
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(14,165,233,.35)]
                  flex
                  items-center
                  justify-center
                  gap-2
                  cursor-pointer
                "
              >
                Book a Demo

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* EXPLORE */}

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/services";
                }}
                className="
                  group
                  w-full
                  sm:w-auto
                  px-7
                  sm:px-8
                  py-3.5
                  sm:py-4
                  rounded-full
                  bg-white
                  border
                  border-slate-200
                  text-slate-800
                  font-semibold
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-slate-50
                  hover:-translate-y-1
                  flex
                  items-center
                  justify-center
                  gap-2
                  cursor-pointer
                "
              >
                Explore Solutions

                <ArrowUpRight
                  className="
                    w-4
                    h-4
                    text-slate-500
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </button>
            </motion.div>

            {/* ==========================================
                TRUST STATS
            ========================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="
                pt-5
                sm:pt-6
                border-t
                border-slate-200
                flex
                flex-wrap
                items-center
                justify-center
                lg:justify-start
                gap-5
                sm:gap-8
              "
            >
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  250+
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-xs
                    text-slate-500
                    font-medium
                    uppercase
                    tracking-wider
                  "
                >
                  Projects
                </p>
              </div>

              <div
                className="
                  w-px
                  h-8
                  bg-slate-300
                  hidden
                  sm:block
                "
              />

              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  98%
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-xs
                    text-slate-500
                    font-medium
                    uppercase
                    tracking-wider
                  "
                >
                  Satisfaction
                </p>
              </div>

              <div
                className="
                  w-px
                  h-8
                  bg-slate-300
                  hidden
                  sm:block
                "
              />

              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  10+
                </p>

                <p
                  className="
                    text-[10px]
                    sm:text-xs
                    text-slate-500
                    font-medium
                    uppercase
                    tracking-wider
                  "
                >
                  Years
                </p>
              </div>
            </motion.div>
          </div>

          {/* ==========================================
              RIGHT SERVICE ECOSYSTEM
          ========================================== */}

          <div
            className="
              lg:col-span-6
              relative
              flex
              items-center
              justify-center
              min-h-[390px]
              sm:min-h-[480px]
              lg:min-h-[560px]
              mt-2
              lg:mt-0
            "
          >
            {/* ==========================================
                ORBIT
            ========================================== */}

            <motion.div
              variants={orbitVariants}
              animate="animate"
              className="
                relative
                w-[250px]
                h-[250px]
                sm:w-[420px]
                sm:h-[420px]
                rounded-full
                border
                border-sky-200
                bg-white/40
                backdrop-blur-xl
                shadow-[0_20px_80px_rgba(14,165,233,.15)]
                flex
                items-center
                justify-center
              "
            >
              {/* ==========================================
                  ORBIT LINE
              ========================================== */}

              <svg
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  -rotate-90
                  pointer-events-none
                  opacity-40
                "
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="1"
                  strokeDasharray="6,12"
                />
              </svg>

              {/* Secondary Orbit */}

              <div
                className="
                  absolute
                  inset-[12%]
                  rounded-full
                  border
                  border-dashed
                  border-indigo-200/50
                "
              />

              {/* ==========================================
                  SERVICE CARDS
              ========================================== */}

              {services.map((item) => {
                const radian =
                  (item.angle * Math.PI) / 180;

                const x = Math.round(
                  Math.cos(radian) * radius
                );

                const y = Math.round(
                  Math.sin(radian) * radius
                );

                return (
                  <div
                    key={item.name}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                    "
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <motion.div
                      variants={cardVariants}
                      animate="animate"
                      whileHover={{
                        scale: 1.08,
                      }}
                      className="
                        flex
                        w-[132px]
                        sm:w-[165px]
                        items-center
                        gap-2
                        sm:gap-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-white/95
                        p-2.5
                        sm:p-3.5
                        shadow-[0_10px_30px_rgba(15,23,42,.08)]
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-sky-300
                        hover:shadow-[0_0_25px_rgba(14,165,233,.25)]
                      "
                    >
                      {/* Icon */}

                      <div
                        className="
                          shrink-0
                          rounded-lg
                          border
                          border-sky-100
                          bg-sky-50
                          p-1.5
                          sm:p-2
                        "
                      >
                        {item.icon}
                      </div>

                      {/* Name */}

                      <span
                        className="
                          text-[10px]
                          sm:text-xs
                          font-semibold
                          leading-tight
                          tracking-wide
                          text-slate-800
                        "
                      >
                        <span className="sm:hidden">
                          {item.shortName}
                        </span>

                        <span className="hidden sm:block">
                          {item.name}
                        </span>
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* ==========================================
                CENTRAL NEIRAH CORE
            ========================================== */}

            <div
              className="
                absolute
                w-[100px]
                h-[100px]
                sm:w-40
                sm:h-40
                rounded-full
                bg-white
                border
                border-sky-200
                flex
                items-center
                justify-center
                shadow-[0_0_80px_rgba(14,165,233,.25)]
                backdrop-blur-xl
                select-none
              "
            >
              {/* Inner Glow */}

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-2
                  sm:inset-3
                  rounded-full
                  bg-gradient-to-tr
                  from-sky-300/40
                  via-blue-300/30
                  to-indigo-300/40
                  blur-xl
                "
              />

             {/* Logo */}
<div
  className="
    relative
    z-10
    flex
    items-center
    justify-center
    w-24
    h-24
    sm:w-32
    sm:h-32
    md:w-36
    md:h-36
    lg:w-40
    lg:h-40
    rounded-full
    bg-white/80
    border
    border-sky-200
    backdrop-blur-md
    shadow-[0_0_40px_rgba(14,165,233,.25)]
    overflow-hidden
  "
>
  <Image
  src="/images/hero.png"
  alt="Neirah Tech"
  width={180}
  height={180}
  priority
  className="
    w-28
    h-28
    sm:w-32
    sm:h-32
    md:w-36
    md:h-36
    lg:w-40
    lg:h-40
    object-contain
    drop-shadow-[0_0_25px_rgba(14,165,233,.5)]
  "
/>
</div>
              {/* Blue Ring */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  -inset-3
                  sm:-inset-4
                  rounded-full
                  border
                  border-sky-300/50
                "
              />

              {/* Purple Ring */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  -inset-6
                  sm:-inset-8
                  rounded-full
                  border
                  border-indigo-300/40
                "
              />

              {/* Floating Nodes */}

              <div
                className="
                  absolute
                  -inset-[32px]
                  sm:-inset-[45px]
                  rounded-full
                  border
                  border-dashed
                  border-sky-300/40
                  animate-spin
                  [animation-duration:15s]
                "
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION BLEND
        ========================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-20
            sm:h-28
            z-10
            bg-gradient-to-b
            from-transparent
            to-[#f8fbff]
          "
        />
      </section>

      {/* ==========================================
          SCHEDULER MODAL
      ========================================== */}

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
      />
    </>
  );
}

/* ==========================================
   ORBIT ANIMATION
========================================== */

const orbitVariants = {
  animate: {
    rotate: 360,

    transition: {
      duration: 40,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};

/* ==========================================
   CARD COUNTER ROTATION
========================================== */

const cardVariants = {
  animate: {
    rotate: -360,

    transition: {
      duration: 40,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};