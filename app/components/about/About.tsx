"use client";

import Image from "next/image";
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
} from "lucide-react";

import RevealText from "../ui/RevealText";

const scenes = [
  {
    number: "01",
    eyebrow: "THE BEGINNING",
    title: "It started with two friends.",
    text: "After years apart, two friends met again and started talking about business, technology, ideas, and the problems people face every day.",
    image: "/images/img1.jpg",
  },
  {
    number: "02",
    eyebrow: "THE IDEA",
    title: "Then came a simple question.",
    text: "What if we stopped talking about problems and started building practical solutions?",
    image: "/images/img2.jpg",
  },
  {
    number: "03",
    eyebrow: "THE FIRST CHAPTER",
    title: "Hardware was the beginning.",
    text: "The first chapter began with hardware-focused solutions. Physical products became the starting point for something much bigger.",
    image: "/images/img3.jpg",
  },
  {
    number: "04",
    eyebrow: "THE TURNING POINT",
    title: "But we saw a bigger problem.",
    text: "Hardware solved one part of the problem. Businesses were still struggling with communication, data, automation, customers, and disconnected digital workflows.",
    image: "/images/img4.jpg",
  },
  {
    number: "05",
    eyebrow: "THE NEXT CHAPTER",
    title: "So we moved into software.",
    text: "We expanded beyond hardware to build connected digital experiences, products, and systems that solve bigger problems.",
    image: "/images/img5.jpg",
  },
];

/* =========================================================
   AMBIENT BACKGROUND
========================================================= */

function AmbientBackground({
  variant = "default",
}: {
  variant?: "default" | "soft" | "center";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute rounded-full blur-[130px] ${
          variant === "center"
            ? "left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 bg-sky-200/20 sm:h-[600px] sm:w-[600px]"
            : "left-[5%] top-[15%] h-[300px] w-[300px] bg-sky-200/20 sm:h-[420px] sm:w-[420px]"
        }`}
      />

      <div
        className={`absolute rounded-full blur-[130px] ${
          variant === "soft"
            ? "bottom-[5%] right-[5%] h-[280px] w-[280px] bg-indigo-200/12 sm:h-[360px] sm:w-[360px]"
            : "bottom-[5%] right-[8%] h-[320px] w-[320px] bg-indigo-200/15 sm:h-[440px] sm:w-[440px]"
        }`}
      />

      <div className="absolute left-[45%] top-[45%] h-[180px] w-[180px] rounded-full bg-violet-200/10 blur-[100px] sm:h-[260px] sm:w-[260px]" />
    </div>
  );
}

/* =========================================================
   PARTICLES
========================================================= */

function Particles() {
  const particles = Array.from({ length: 24 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const left = `${(index * 37) % 100}%`;
        const top = `${(index * 61) % 100}%`;
        const size = 2 + (index % 3);

        return (
          <motion.span
            key={index}
            className="absolute rounded-full bg-sky-400/30"
            style={{
              left,
              top,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.12, 0.55, 0.12],
            }}
            transition={{
              duration: 3 + (index % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.08,
            }}
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   CONNECTION LINES
========================================================= */

function ConnectionLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M80 500 C240 350 260 560 430 390 S700 220 920 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-sky-400"
        strokeDasharray="5 10"
        animate={{
          strokeDashoffset: [0, -100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.path
        d="M120 180 C330 300 430 120 610 280 S800 470 960 390"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-indigo-400"
        strokeDasharray="3 12"
        animate={{
          strokeDashoffset: [0, 120],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.9]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.7, 0]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#f8fbff]
        pt-20
        sm:pt-24
      "
    >
      <AmbientBackground variant="center" />

      <Particles />

      <ConnectionLines />

      <motion.div
        style={{
          y,
          scale,
          opacity,
        }}
        className="
          relative
          z-10
          flex
          min-h-[calc(100svh-80px)]
          flex-col
          items-center
          justify-center
          px-5
          pb-12
          text-center
          sm:px-6
        "
      >
        {/* EYEBROW */}

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
            duration: 0.8,
          }}
          className="
            mb-7
            flex
            items-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-sky-600
            sm:mb-8
            sm:text-xs
          "
        >
          <span className="h-px w-7 bg-sky-400 sm:w-8" />

          Our story

          <span className="h-px w-7 bg-sky-400 sm:w-8" />
        </motion.div>

        {/* TITLE */}

        <h1
          className="
            max-w-6xl
            text-5xl
            font-black
            leading-[0.9]
            tracking-[-0.055em]
            text-slate-950
            sm:text-7xl
            md:text-8xl
            lg:text-[9rem]
          "
        >
          It started
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-500
              via-indigo-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            with two friends.
          </span>
        </h1>

        {/* DESCRIPTION */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="
            mt-7
            max-w-xl
            text-sm
            leading-7
            text-slate-500
            sm:mt-10
            sm:text-lg
          "
        >
          A conversation became an idea.
          <br />
          The idea became something much bigger.
        </motion.p>

        {/* SCROLL INDICATOR */}

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-7
            flex
            flex-col
            items-center
            gap-3
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-sky-600
            sm:bottom-10
            sm:text-[10px]
          "
        >
          Scroll to discover

          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   INTRO
========================================================= */

function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [40, -40]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        px-5
        py-24
        sm:px-6
        sm:py-32
        lg:py-36
      "
    >
      <AmbientBackground variant="soft" />

      <motion.div
        style={{
          y,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-7
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-sky-600
          "
        >
          <span className="h-px w-8 bg-sky-400" />

          Chapter one

          <span className="h-px w-8 bg-sky-400" />
        </div>

        <RevealText
          text="Every company has a beginning."
          mode="viewport"
          stagger={0.035}
        />

        <p
          className="
            mx-auto
            mt-7
            max-w-2xl
            text-base
            leading-8
            text-slate-500
            sm:mt-8
            sm:text-xl
          "
        >
          Ours didn&apos;t begin with a product, a pitch deck, or a
          business plan. It began with two people sitting down and
          asking what could be different.
        </p>
      </motion.div>
    </section>
  );
}

/* =========================================================
   STORY SCENE
========================================================= */

function StoryScene({
  scene,
  index,
}: {
  scene: (typeof scenes)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [70, 0, -70]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.88, 1, 0.92]
  );

  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      index % 2 === 0 ? -2.5 : 2.5,
      0,
      index % 2 === 0 ? 1.5 : -1.5,
    ]
  );

  const textX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [
      index % 2 === 0 ? -50 : 50,
      0,
      0,
      index % 2 === 0 ? 25 : -25,
    ]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 1],
    [0, 1, 1, 0]
  );

  const isReversed = index % 2 !== 0;

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[92svh]
        overflow-hidden
        bg-[#f8fbff]
        sm:min-h-[98svh]
        lg:min-h-[105svh]
      "
    >
      <AmbientBackground
        variant={index % 2 === 0 ? "default" : "soft"}
      />

      {/* CHAPTER NUMBER */}

      <div
        className="
          absolute
          left-5
          top-7
          z-20
          sm:left-8
          sm:top-12
          lg:left-10
          lg:top-16
        "
      >
        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-sky-500
            sm:text-[10px]
          "
        >
          Chapter
        </span>

        <div
          className="
            mt-1
            text-3xl
            font-black
            tracking-[-0.05em]
            text-slate-950
            sm:text-4xl
          "
        >
          {scene.number}
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[92svh]
          max-w-7xl
          items-center
          px-5
          py-20
          sm:min-h-[98svh]
          sm:px-6
          sm:py-24
          lg:min-h-[105svh]
          lg:py-28
        "
      >
        <div
          className={`
            grid
            w-full
            items-center
            gap-8
            sm:gap-10
            lg:grid-cols-2
            lg:gap-16
            ${
              isReversed
                ? "lg:[&>*:first-child]:order-2"
                : ""
            }
          `}
        >
          {/* IMAGE */}

          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
              rotate: imageRotate,
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[420px]
              sm:max-w-[520px]
              lg:max-w-[620px]
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[60%]
                w-[60%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-sky-300/20
                blur-[80px]
                sm:blur-[100px]
              "
            />

            <div className="relative aspect-square">
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 50vw"
                className="
                  object-contain
                  drop-shadow-[0_25px_55px_rgba(15,23,42,0.12)]
                  sm:drop-shadow-[0_35px_70px_rgba(15,23,42,0.14)]
                "
              />
            </div>
          </motion.div>

          {/* TEXT */}

          <motion.div
            style={{
              x: textX,
              opacity: textOpacity,
            }}
            className={`
              relative
              z-10
              mx-auto
              w-full
              max-w-xl
              text-center
              lg:text-left
              ${
                isReversed
                  ? "lg:justify-self-end"
                  : ""
              }
            `}
          >
            {/* EYEBROW */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                gap-3
                lg:justify-start
              "
            >
              <span className="h-px w-8 bg-sky-500 sm:w-10" />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-sky-600
                  sm:text-[10px]
                "
              >
                {scene.eyebrow}
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                text-4xl
                font-black
                leading-[0.94]
                tracking-[-0.05em]
                text-slate-950
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {scene.title}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-6
                max-w-lg
                text-base
                leading-7
                text-slate-500
                sm:mt-7
                sm:text-lg
                sm:leading-8
                lg:mx-0
              "
            >
              {scene.text}
            </p>

            {/* KEEP GOING */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-3
                text-sm
                font-bold
                text-slate-950
                sm:mt-8
                lg:justify-start
              "
            >
              <span>Keep going</span>

              <ArrowRight
                size={16}
                className="
                  text-sky-500
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TURNING POINT
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
    [0.75, 1, 1.08]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  const x1 = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    [-120, 0]
  );

  const x2 = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    [120, 0]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[110svh]
        overflow-hidden
        bg-[#f8fbff]
        sm:min-h-[125svh]
        lg:min-h-[135svh]
      "
    >
      <AmbientBackground variant="center" />

      {/* GRID */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.08) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <motion.div
        style={{
          opacity,
        }}
        className="
          relative
          z-10
          flex
          min-h-[110svh]
          flex-col
          items-center
          justify-center
          px-5
          text-center
          sm:min-h-[125svh]
          sm:px-6
          lg:min-h-[135svh]
        "
      >
        {/* LABEL */}

        <div
          className="
            mb-7
            text-[10px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-sky-600
            sm:mb-10
            sm:text-xs
          "
        >
          The turning point
        </div>

        {/* HEADING */}

        <h2
          className="
            max-w-5xl
            text-5xl
            font-black
            leading-[0.9]
            tracking-[-0.055em]
            text-slate-950
            sm:text-7xl
            md:text-8xl
          "
        >
          We solved one problem.
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-500
              via-indigo-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            Then we saw another.
          </span>
        </h2>

        {/* SYSTEM DIAGRAM */}

        <div
          className="
            relative
            mt-14
            h-[250px]
            w-full
            max-w-5xl
            sm:mt-20
            sm:h-[320px]
          "
        >
          {/* DESKTOP CONNECTORS */}

          <svg
            className="
              pointer-events-none
              absolute
              inset-0
              hidden
              h-full
              w-full
              sm:block
            "
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
          >
            <line
              x1="200"
              y1="160"
              x2="500"
              y2="160"
              stroke="rgba(14,165,233,.25)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />

            <line
              x1="800"
              y1="160"
              x2="500"
              y2="160"
              stroke="rgba(99,102,241,.25)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
          </svg>

          {/* MOBILE CONNECTOR */}

          <div
            className="
              absolute
              left-1/2
              top-[58px]
              h-[135px]
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-sky-300
              via-indigo-300
              to-violet-300
              sm:hidden
            "
          />

          {/* HARDWARE */}

          <motion.div
            style={{
              x: x1,
            }}
            className="
              absolute
              left-[1%]
              top-[58px]
              -translate-y-1/2
              sm:left-[8%]
              sm:top-1/2
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-sky-300
                bg-white/75
                px-2
                text-center
                text-[8px]
                font-bold
                uppercase
                tracking-wider
                text-sky-600
                shadow-[0_20px_60px_rgba(14,165,233,0.12)]
                backdrop-blur-md
                sm:h-28
                sm:w-28
                sm:text-xs
              "
            >
              Hardware
            </div>
          </motion.div>

          {/* SOFTWARE */}

          <motion.div
            style={{
              x: x2,
            }}
            className="
              absolute
              right-[1%]
              top-[58px]
              -translate-y-1/2
              sm:right-[8%]
              sm:top-1/2
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-indigo-300
                bg-white/75
                px-2
                text-center
                text-[8px]
                font-bold
                uppercase
                tracking-wider
                text-indigo-600
                shadow-[0_20px_60px_rgba(99,102,241,0.12)]
                backdrop-blur-md
                sm:h-28
                sm:w-28
                sm:text-xs
              "
            >
              Software
            </div>
          </motion.div>

          {/* CENTRAL NODE */}

          <motion.div
            style={{
              scale,
            }}
            className="
              absolute
              left-1/2
              top-[190px]
              flex
              h-28
              w-28
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-sky-200
              bg-white/90
              text-center
              text-[8px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-950
              shadow-[0_25px_80px_rgba(15,23,42,0.12)]
              backdrop-blur-xl
              sm:top-1/2
              sm:h-36
              sm:w-36
              sm:text-xs
            "
          >
            Connected
            <br />
            systems
          </motion.div>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-5
            max-w-2xl
            text-base
            leading-8
            text-slate-500
            sm:mt-8
            sm:text-lg
          "
        >
          Communication. Data. Automation. Customers. Digital workflows.
          Everything was connected.
        </p>
      </motion.div>
    </section>
  );
}

/* =========================================================
   FUTURE SECTION
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

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-5, 5]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [70, -70]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        min-h-[105svh]
        overflow-hidden
        bg-[#f8fbff]
        sm:min-h-[115svh]
      "
    >
      <AmbientBackground />

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[105svh]
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-5
          py-24
          text-center
          sm:min-h-[115svh]
          sm:px-6
          sm:py-32
        "
      >
        {/* LABEL */}

        <div
          className="
            mb-7
            flex
            items-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-indigo-600
            sm:mb-10
            sm:text-xs
          "
        >
          <Sparkles size={15} />

          The next chapter
        </div>

        {/* HEADING */}

        <h2
          className="
            max-w-6xl
            text-5xl
            font-black
            leading-[0.99]
            tracking-[-0.045em]
            text-slate-950
            sm:text-7xl
            md:text-8xl
            lg:text-[8rem]
          "
        >
          From physical
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-500
              via-indigo-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            to digital.
          </span>
        </h2>

        {/* ORBIT */}

        <motion.div
          style={{
            y,
            scale,
            rotate,
          }}
          className="
            relative
            mt-12
            h-[260px]
            w-[260px]
            sm:mt-16
            sm:h-[430px]
            sm:w-[430px]
          "
        >
          <div
            className="
              absolute
              inset-[20%]
              rounded-full
              bg-gradient-to-br
              from-sky-300/25
              via-indigo-300/15
              to-violet-300/25
              blur-3xl
            "
          />

          <div className="absolute inset-0 rounded-full border border-sky-200" />

          <div className="absolute inset-[12%] rounded-full border border-indigo-200" />

          <div className="absolute inset-[24%] rounded-full border border-violet-200" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-[35%]
              rounded-full
              border
              border-dashed
              border-sky-300
            "
          />

          {/* CENTER */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-20
              w-20
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-center
              text-[8px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-950
              shadow-[0_20px_70px_rgba(15,23,42,0.12)]
              sm:h-28
              sm:w-28
              sm:text-xs
            "
          >
            Digital
            <br />
            solutions
          </div>

          {/* ORBIT NODES */}

          {[
            ["Data", "top-0 left-1/2 -translate-x-1/2"],
            [
              "Automation",
              "right-0 top-1/2 -translate-y-1/2",
            ],
            [
              "Customers",
              "bottom-0 left-1/2 -translate-x-1/2",
            ],
            [
              "Systems",
              "left-0 top-1/2 -translate-y-1/2",
            ],
          ].map(([label, position], index) => (
            <motion.div
              key={label}
              className={`
                absolute
                ${position}
                flex
                h-10
                min-w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                px-2
                text-[7px]
                font-bold
                uppercase
                tracking-wider
                text-slate-700
                shadow-lg
                sm:h-14
                sm:min-w-14
                sm:px-4
                sm:text-[10px]
              `}
              animate={{
                y: [
                  0,
                  index % 2 === 0 ? -8 : 8,
                  0,
                ],
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

        {/* DESCRIPTION */}

        <p
          className="
            mt-8
            max-w-2xl
            text-base
            leading-8
            text-slate-500
            sm:mt-12
            sm:text-lg
          "
        >
          Today, we&apos;re building digital products and connected
          experiences that help businesses move forward.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   VALUES
========================================================= */

function Values() {
  const values = [
    "Think beyond the obvious.",
    "Build for real problems.",
    "Make technology feel human.",
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        px-5
        py-28
        sm:px-6
        sm:py-36
      "
    >
      <AmbientBackground variant="soft" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-14 sm:mb-20">
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-sky-600
              sm:text-xs
            "
          >
            What drives us
          </span>

          <h2
            className="
              mt-5
              max-w-4xl
              text-5xl
              font-black
              leading-[0.99]
              tracking-[-0.05em]
              text-slate-950
              sm:mt-6
              sm:text-7xl
            "
          >
            The idea changed.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-sky-500
                via-indigo-500
                to-violet-500
                bg-clip-text
                text-transparent
              "
            >
              The mindset didn&apos;t.
            </span>
          </h2>
        </div>

        {/* VALUES */}

        <div>
          {values.map((value, index) => (
            <motion.div
              key={value}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="
                group
                flex
                items-center
                justify-between
                border-t
                border-sky-100
                py-7
                sm:py-12
              "
            >
              <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                <span
                  className="
                    shrink-0
                    text-xs
                    font-bold
                    text-sky-500
                  "
                >
                  0{index + 1}
                </span>

                <h3
                  className="
                    text-lg
                    font-black
                    tracking-[-0.035em]
                    text-slate-950
                    sm:text-4xl
                  "
                >
                  {value}
                </h3>
              </div>

              <ArrowRight
                size={20}
                className="
                  ml-4
                  shrink-0
                  text-sky-300
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                  group-hover:text-sky-500
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GLOBAL
========================================================= */

function GlobalSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-10, 10]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.9]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        px-5
        py-28
        text-slate-950
        sm:px-6
        sm:py-40
      "
    >
      <AmbientBackground variant="center" />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          text-center
        "
      >
        {/* ICON */}

        <motion.div
          style={{
            rotate,
            scale,
          }}
          className="
            mx-auto
            mb-8
            flex
            h-18
            w-18
            items-center
            justify-center
            rounded-full
            border
            border-sky-200
            bg-white/70
            shadow-[0_20px_70px_rgba(14,165,233,0.1)]
            backdrop-blur-md
            sm:mb-10
            sm:h-20
            sm:w-20
          "
        >
          <Globe2
            size={38}
            strokeWidth={1.2}
            className="text-sky-500 sm:h-10 sm:w-10"
          />
        </motion.div>

        {/* HEADING */}

        <h2
          className="
            text-5xl
            font-black
            leading-[0.92]
            tracking-[-0.05em]
            text-slate-950
            sm:text-7xl
            md:text-8xl
          "
        >
          From an idea
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-500
              via-indigo-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            to a bigger world.
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-8
            max-w-xl
            text-base
            leading-8
            text-slate-500
            sm:mt-10
            sm:text-lg
          "
        >
          What began as a conversation between two people continues to
          grow into technology, products, and experiences built for a
          connected world.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [50, -50]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        px-5
        py-32
        text-center
        sm:px-6
        sm:py-48
      "
    >
      <AmbientBackground variant="center" />

      <motion.div
        style={{
          y,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-5xl
        "
      >
        {/* LABEL */}

        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-sky-600
            sm:text-xs
          "
        >
          What&apos;s next?
        </span>

        {/* HEADING */}

        <h2
          className="
            mt-6
            text-5xl
            font-black
            leading-[0.9]
            tracking-[-0.055em]
            text-slate-950
            sm:mt-7
            sm:text-7xl
            md:text-8xl
          "
        >
          This story
          <br />

          <span
            className="
              bg-gradient-to-r
              from-sky-500
              via-indigo-500
              to-violet-500
              bg-clip-text
              text-transparent
            "
          >
            isn&apos;t finished.
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            mt-7
            max-w-xl
            text-base
            leading-8
            text-slate-500
            sm:mt-10
            sm:text-lg
          "
        >
          We&apos;re still asking the same question:
          <br />
          what can we build next?
        </p>

        {/* CTA */}

        <motion.a
          href="/contact"
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            mx-auto
            mt-9
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-slate-950
            px-7
            py-4
            text-sm
            font-bold
            text-white
            shadow-xl
            shadow-slate-950/10
            transition-shadow
            hover:shadow-2xl
            sm:mt-12
          "
        >
          Start a conversation

          <ArrowRight size={17} />
        </motion.a>
      </motion.div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function About() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    }
  );

  const progressWidth = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <main
      className="
        relative
        w-full
        overflow-x-clip
        bg-[#f8fbff]
      "
    >
      {/* GLOBAL SCROLL PROGRESS */}

      <div
        className="
          fixed
          left-0
          top-0
          z-[100]
          h-[2px]
          w-full
          bg-transparent
        "
      >
        <motion.div
          style={{
            width: progressWidth,
          }}
          className="
            h-full
            bg-gradient-to-r
            from-sky-400
            via-indigo-500
            to-violet-500
          "
        />
      </div>

      {/* STORY */}

      <Hero />

      <Intro />

      {scenes.map((scene, index) => (
        <StoryScene
          key={scene.number}
          scene={scene}
          index={index}
        />
      ))}

      <TurningPoint />

      <FutureSection />

      <Values />

      <GlobalSection />

      <FinalCTA />
    </main>
  );
}