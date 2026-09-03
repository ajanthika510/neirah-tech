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
            ? "left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 bg-sky-200/20 sm:h-[520px] sm:w-[520px]"
            : "left-[5%] top-[15%] h-[260px] w-[260px] bg-sky-200/20 sm:h-[360px] sm:w-[360px]"
        }`}
      />

      <div
        className={`absolute rounded-full blur-[130px] ${
          variant === "soft"
            ? "bottom-[5%] right-[5%] h-[240px] w-[240px] bg-indigo-200/10 sm:h-[320px] sm:w-[320px]"
            : "bottom-[5%] right-[8%] h-[280px] w-[280px] bg-indigo-200/15 sm:h-[380px] sm:w-[380px]"
        }`}
      />

      <div className="absolute left-[45%] top-[45%] h-[160px] w-[160px] rounded-full bg-violet-200/10 blur-[100px] sm:h-[220px] sm:w-[220px]" />
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

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -140]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.92]
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
        min-h-[58svh]
        overflow-hidden
        bg-[#f8fbff]
        pt-24
        sm:min-h-[58svh]
        sm:pt-28
        lg:min-h-[60svh]
        lg:pt-28
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
          min-h-[calc(58svh-96px)]
          flex-col
          items-center
          justify-center
          px-5
          pb-10
          text-center
          sm:min-h-[calc(58svh-112px)]
          sm:px-6
          sm:pb-12
          lg:min-h-[calc(60svh-112px)]
          lg:pb-14
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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-4
            flex
            items-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.45em]
            text-sky-600
            sm:mb-5
            sm:text-xs
          "
        >
          <span className="h-px w-6 bg-sky-400/60 sm:w-10" />

          <span>OUR STORY</span>

          <span className="h-px w-6 bg-sky-400/60 sm:w-10" />
        </motion.div>

        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-6xl
            text-4xl
            font-black
            leading-[0.92]
            tracking-[-0.055em]
            text-slate-950
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
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
        </motion.h1>

        {/* DESCRIPTION */}

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
            delay: 0.45,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-5
            max-w-xl
            text-sm
            leading-6
            text-slate-500
            sm:mt-6
            sm:text-base
            sm:leading-7
          "
        >
          A conversation became an idea.
          <br />
          The idea became something much bigger.
        </motion.p>
      </motion.div>

      {/* BOTTOM FADE */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-20
          bg-gradient-to-t
          from-[#f8fbff]
          to-transparent
        "
      />
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
    [30, -30]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        px-5
        py-2
        sm:px-6
        sm:py-4
        lg:py-5
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
            mb-2
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-sky-600
            sm:mb-3
          "
        >
          <span className="h-px w-8 bg-sky-400" />

          Let's Start

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
            mt-3
            max-w-2xl
            text-base
            leading-7
            text-slate-500
            sm:mt-4
            sm:text-lg
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
    [50, 0, -50]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 0.94]
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
      index % 2 === 0 ? -40 : 40,
      0,
      0,
      index % 2 === 0 ? 20 : -20,
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
        overflow-hidden
        bg-[#f8fbff]
        py-1
        sm:py-2
        lg:py-3
      "
    >
      <AmbientBackground
        variant={index % 2 === 0 ? "default" : "soft"}
      />

      <div
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          items-center
          px-5
          py-1
          sm:px-6
          sm:py-2
          lg:py-2
        "
      >
        <div
          className={`grid w-full items-center gap-3 sm:gap-5 lg:grid-cols-2 lg:gap-8 ${
            isReversed
              ? "lg:[&>*:first-child]:order-2"
              : ""
          }`}
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
              max-w-[260px]
              sm:max-w-[340px]
              lg:max-w-[420px]
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
                blur-[50px]
                sm:blur-[70px]
              "
            />

            <div className="relative aspect-[1.15/1]">
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 50vw"
                className="
                  object-contain
                  drop-shadow-[0_15px_30px_rgba(15,23,42,0.08)]
                  sm:drop-shadow-[0_20px_40px_rgba(15,23,42,0.1)]
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
              ${isReversed ? "lg:justify-self-end" : ""}
            `}
          >
            {/* EYEBROW */}

            <div
              className="
                mb-2
                flex
                items-center
                justify-center
                gap-3
                sm:mb-3
                lg:justify-start
              "
            >
              <span className="h-px w-6 bg-sky-500 sm:w-8" />

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
                text-3xl
                font-black
                leading-[0.96]
                tracking-[-0.05em]
                text-slate-950
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              {scene.title}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-2
                max-w-lg
                text-sm
                leading-6
                text-slate-500
                sm:mt-3
                sm:text-base
                sm:leading-7
                lg:mx-0
              "
            >
              {scene.text}
            </p>

            {/* KEEP GOING */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                text-xs
                font-bold
                text-slate-950
                sm:mt-4
                sm:text-sm
                lg:justify-start
              "
            >
              <span>Keep going</span>

              <ArrowRight
                size={15}
                className="
                  text-sky-500
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
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
        overflow-hidden
        bg-[#f8fbff]
        py-3
        sm:py-5
        lg:py-6
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
          flex-col
          items-center
          justify-center
          px-4
          py-2
          text-center
          sm:px-6
          sm:py-4
        "
      >
        {/* LABEL */}

        <div
          className="
            mb-2
            text-[10px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-sky-600
            sm:mb-3
            sm:text-xs
          "
        >
          The turning point
        </div>

        {/* HEADING */}

        <h2
          className="
            max-w-5xl
            text-3xl
            font-black
            leading-[0.92]
            tracking-[-0.055em]
            text-slate-950
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
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
            mt-4
            h-[180px]
            w-full
            max-w-5xl
            sm:mt-6
            sm:h-[240px]
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
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
          >
            <line
              x1="200"
              y1="120"
              x2="500"
              y2="120"
              stroke="rgba(14,165,233,.25)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />

            <line
              x1="800"
              y1="120"
              x2="500"
              y2="120"
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
              top-[35px]
              h-[110px]
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
              top-[35px]
              -translate-y-1/2
              sm:left-[8%]
              sm:top-1/2
            "
          >
            <div
              className="
                flex
                h-16
                w-16
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
                shadow-[0_15px_40px_rgba(14,165,233,0.12)]
                backdrop-blur-md
                sm:h-24
                sm:w-24
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
              top-[35px]
              -translate-y-1/2
              sm:right-[8%]
              sm:top-1/2
            "
          >
            <div
              className="
                flex
                h-16
                w-16
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
                shadow-[0_15px_40px_rgba(99,102,241,0.12)]
                backdrop-blur-md
                sm:h-24
                sm:w-24
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
              top-[145px]
              flex
              h-24
              w-24
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
              shadow-[0_20px_60px_rgba(15,23,42,0.12)]
              backdrop-blur-xl
              sm:top-1/2
              sm:h-32
              sm:w-32
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
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            sm:mt-3
            sm:text-base
            sm:leading-7
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
    [50, -50]
  );

  return (
    <section
      ref={ref}
      className="
        relative
        overflow-hidden
        bg-[#f8fbff]
        py-3
        sm:py-5
        lg:py-6
      "
    >
      <AmbientBackground />

      <div
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-4
          py-2
          text-center
          sm:px-6
          sm:py-4
        "
      >
        {/* LABEL */}

        <div
          className="
            mb-2
            flex
            items-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-indigo-600
            sm:mb-3
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
            text-3xl
            font-black
            leading-[0.96]
            tracking-[-0.045em]
            text-slate-950
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
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
            mt-4
            h-[200px]
            w-[200px]
            sm:mt-6
            sm:h-[300px]
            sm:w-[300px]
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
              blur-2xl
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
              h-16
              w-16
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
              shadow-[0_15px_50px_rgba(15,23,42,0.12)]
              sm:h-24
              sm:w-24
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
                h-8
                min-w-8
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
                shadow-md
                sm:h-11
                sm:min-w-11
                sm:px-3
                sm:text-[9px]
              `}
              animate={{
                y: [
                  0,
                  index % 2 === 0 ? -6 : 6,
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
            mt-3
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            sm:mt-4
            sm:text-base
            sm:leading-7
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
        py-4
        sm:px-6
        sm:py-6
        lg:py-8
      "
    >
      <AmbientBackground variant="soft" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-3 sm:mb-5">
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
              mt-2
              max-w-4xl
              text-3xl
              font-black
              leading-[0.96]
              tracking-[-0.05em]
              text-slate-950
              sm:mt-3
              sm:text-5xl
              md:text-6xl
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
                py-2.5
                sm:py-4
              "
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-5">
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
                    text-base
                    font-black
                    tracking-[-0.035em]
                    text-slate-950
                    sm:text-2xl
                    md:text-3xl
                  "
                >
                  {value}
                </h3>
              </div>

              <ArrowRight
                size={18}
                className="
                  ml-3
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
        py-4
        text-slate-950
        sm:px-6
        sm:py-6
        lg:py-8
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
            mb-2
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-sky-200
            bg-white/70
            shadow-[0_15px_40px_rgba(14,165,233,0.1)]
            backdrop-blur-md
            sm:mb-3
            sm:h-16
            sm:w-16
          "
        >
          <Globe2
            size={30}
            strokeWidth={1.2}
            className="text-sky-500 sm:h-8 sm:w-8"
          />
        </motion.div>

        {/* HEADING */}

        <h2
          className="
            text-3xl
            font-black
            leading-[0.92]
            tracking-[-0.05em]
            text-slate-950
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
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
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-slate-500
            sm:mt-3
            sm:text-base
            sm:leading-7
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
        py-4
        text-center
        sm:px-6
        sm:py-8
        lg:py-10
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
            mt-2
            text-3xl
            font-black
            leading-[0.92]
            tracking-[-0.055em]
            text-slate-950
            sm:mt-3
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
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
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-slate-500
            sm:mt-3
            sm:text-base
            sm:leading-7
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
            mt-4
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-slate-950
            px-6
            py-3
            text-xs
            font-bold
            text-white
            shadow-xl
            shadow-slate-950/10
            transition-shadow
            hover:shadow-2xl
            sm:mt-5
            sm:px-7
            sm:py-3.5
            sm:text-sm
          "
        >
          Start a conversation

          <ArrowRight size={16} />
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