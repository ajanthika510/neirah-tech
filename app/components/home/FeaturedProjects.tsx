"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  Brain,
  Database,
  ShoppingCart,
  Smartphone,
} from "lucide-react";


// ============================================================
// PROJECT DATA
// ============================================================

const projects = [
  {
    title: "Enterprise ERP Platform",

    category: "Business Intelligence",

    description:
      "Complete ERP ecosystem connecting finance, inventory and operations.",

    tags: ["ERP", "Cloud", "Analytics"],

    icon: Database,

    image: "/images/projects/erp.png",
  },

  {
    title: "AI Analytics Engine",

    category: "Artificial Intelligence",

    description:
      "Transform complex business data into intelligent decisions.",

    tags: ["AI", "Machine Learning"],

    icon: Brain,

    image: "/images/projects/ai-analytics.png",
  },

  {
    title: "Smart POS Ecosystem",

    category: "Retail Technology",

    description:
      "Modern retail management with real-time inventory control.",

    tags: ["POS", "Retail"],

    icon: ShoppingCart,

    image: "/images/projects/pos.png",
  },

  {
    title: "Mobile Business Suite",

    category: "Mobile Platform",

    description:
      "Enterprise mobile solutions built for modern teams.",

    tags: ["iOS", "Android"],

    icon: Smartphone,

    image: "/images/projects/mobile.png",
  },
];


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FeaturedProjects() {
  const [active, setActive] = useState(0);

  const [pause, setPause] = useState(false);


  // ==========================================================
  // AUTO SLIDE
  // ==========================================================

  useEffect(() => {
    if (pause) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [pause]);


  // ==========================================================
  // NEXT / PREVIOUS
  // ==========================================================

  const nextProject = () => {
    setActive((prev) => (prev + 1) % projects.length);
  };

  const previousProject = () => {
    setActive(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-white
        via-sky-50
        to-indigo-50
        py-24
        sm:py-28
        lg:py-32
      "
    >

      {/* ======================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/3
          top-20
          h-72
          w-72
          rounded-full
          bg-sky-300/30
          blur-[140px]
          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-10
          right-1/3
          h-72
          w-72
          rounded-full
          bg-indigo-300/30
          blur-[150px]
          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          h-40
          w-40
          rounded-full
          bg-cyan-200/20
          blur-[100px]
        "
      />


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          text-center
          sm:px-8
          lg:px-10
        "
      >

        {/* ====================================================
            SECTION LABEL
        ==================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.35em]
            text-sky-600
          "
        >
          Featured Projects
        </motion.p>


        {/* ====================================================
            TITLE
        ==================================================== */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="
            mt-5
            text-4xl
            font-black
            tracking-tight
            text-slate-900
            sm:text-5xl
            md:text-6xl
          "
        >
          Digital Experiences

          <span
            className="
              block
              bg-gradient-to-r
              from-sky-500
              via-indigo-600
              to-cyan-500
              bg-clip-text
              text-transparent
            "
          >
            We Create
          </span>
        </motion.h2>


        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-7
            text-slate-500
            sm:text-base
          "
        >
          Explore some of the digital platforms, AI solutions and
          business systems we've designed to help organizations
          work smarter and grow faster.
        </motion.p>


        {/* ====================================================
            PROJECT CAROUSEL
        ==================================================== */}

        <div
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          className="
            relative
            mx-auto
            mt-14
            h-[560px]
            w-full
            sm:mt-20
            sm:h-[570px]
            lg:h-[540px]
          "
        >

          <AnimatePresence mode="popLayout">

            {projects.map((project, index) => {

              const position =
                (index - active + projects.length) %
                projects.length;


              let style = {
                x: 0,
                scale: 0.5,
                opacity: 0,
                rotateY: 0,
                zIndex: 0,
              };


              // =================================================
              // ACTIVE CARD
              // =================================================

              if (position === 0) {
                style = {
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  rotateY: 0,
                  zIndex: 30,
                };
              }


              // =================================================
              // RIGHT CARD
              // =================================================

              else if (position === 1) {
                style = {
                  x: 390,
                  scale: 0.78,
                  opacity: 0.55,
                  rotateY: -25,
                  zIndex: 20,
                };
              }


              // =================================================
              // LEFT CARD
              // =================================================

              else if (position === projects.length - 1) {
                style = {
                  x: -390,
                  scale: 0.78,
                  opacity: 0.55,
                  rotateY: 25,
                  zIndex: 20,
                };
              }


              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  style={style}
                  active={position === 0}
                />
              );
            })}

          </AnimatePresence>


          {/* ==================================================
              PREVIOUS BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={previousProject}
            aria-label="Previous project"
            className="
              absolute
              left-1
              top-1/2
              z-40
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur
              transition
              hover:bg-sky-500
              hover:text-white
              sm:left-4
              lg:left-8
          "
          >
            <ArrowRight
              size={18}
              className="rotate-180"
            />
          </button>


          {/* ==================================================
              NEXT BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={nextProject}
            aria-label="Next project"
            className="
              absolute
              right-1
              top-1/2
              z-40
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white/90
              text-slate-700
              shadow-lg
              backdrop-blur
              transition
              hover:bg-sky-500
              hover:text-white
              sm:right-4
              lg:right-8
            "
          >
            <ArrowRight size={18} />
          </button>

        </div>


        {/* ====================================================
            INDICATORS
        ==================================================== */}

        <div
          className="
            mt-2
            flex
            justify-center
            gap-3
          "
        >
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View ${project.title}`}
              className={`
                h-2
                cursor-pointer
                rounded-full
                transition-all
                duration-500

                ${
                  active === index
                    ? "w-10 bg-sky-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }
              `}
            />
          ))}
        </div>


        {/* ====================================================
            PROJECT COUNT
        ==================================================== */}

        <p className="mt-5 text-xs font-medium text-slate-400">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </p>

      </div>
    </section>
  );
}


// ============================================================
// PROJECT CARD
// ============================================================

function ProjectCard({
  project,
  style,
  active,
}: {
  project: (typeof projects)[number];

  style: {
    x: number;
    scale: number;
    opacity: number;
    rotateY: number;
    zIndex: number;
  };

  active: boolean;
}) {

  const Icon = project.icon;


  return (
    <motion.div
      initial={style}
      animate={style}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        absolute
        left-1/2
        top-0
        w-[calc(100%-32px)]
        -translate-x-1/2
        sm:w-[620px]
      "
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >

      {/* ======================================================
          CARD
      ====================================================== */}

      <motion.div
        whileHover={
          active
            ? {
                y: -6,
              }
            : {}
        }
        className={`
          group
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white
          bg-white/75
          p-5
          text-left
          shadow-[0_35px_100px_rgba(15,23,42,.14)]
          backdrop-blur-xl
          transition-all
          duration-500
          sm:rounded-[40px]
          sm:p-8

          ${
            active
              ? "shadow-[0_40px_110px_rgba(15,23,42,.18)]"
              : "blur-[1px]"
          }
        `}
      >

        {/* ==================================================
            TOP GLOW
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-sky-300/20
            blur-[70px]
            transition-all
            duration-500
            group-hover:bg-sky-400/30
          "
        />


        {/* ==================================================
            PROJECT IMAGE / DP
        ================================================== */}

        <div
          className="
            relative
            h-44
            overflow-hidden
            rounded-[24px]
            bg-slate-950
            sm:h-52
            sm:rounded-[28px]
          "
        >

          {/* Project Image */}

          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="
              (max-width: 640px) calc(100vw - 72px),
              620px
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />


          {/* Dark overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-slate-950/70
              via-slate-950/10
              to-transparent
            "
          />


          {/* =================================================
              SHINE ANIMATION
          ================================================= */}

          <motion.div
            animate={{
              x: ["-150%", "250%"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              top-[-30%]
              h-[160%]
              w-20
              rotate-12
              bg-white/20
              blur-xl
            "
          />


          {/* =================================================
              IMAGE LABEL
          ================================================= */}

          <div
            className="
              absolute
              bottom-4
              left-4
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-black/25
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
              backdrop-blur-md
            "
          >
            Featured Project
          </div>


          {/* Project number */}

          <div
            className="
              absolute
              right-4
              top-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/20
              text-xs
              font-bold
              text-white
              backdrop-blur-md
            "
          >
            {String(
              projects.findIndex(
                (item) => item.title === project.title
              ) + 1
            ).padStart(2, "0")}
          </div>

        </div>


        {/* ==================================================
            ICON + PROJECT LABEL
        ================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.05,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-sky-500
              to-indigo-600
              shadow-lg
              shadow-sky-200
            "
          >
            <Icon
              size={24}
              strokeWidth={1.8}
              className="text-white"
            />
          </motion.div>


          <span
            className="
              text-xs
              font-bold
              tracking-[0.2em]
              text-slate-400
            "
          >
            PROJECT
          </span>

        </div>


        {/* ==================================================
            TITLE
        ================================================== */}

        <h3
          className="
            mt-6
            text-2xl
            font-black
            tracking-tight
            text-slate-900
            sm:text-3xl
          "
        >
          {project.title}
        </h3>


        {/* ==================================================
            CATEGORY
        ================================================== */}

        <p
          className="
            mt-2
            font-semibold
            text-sky-600
          "
        >
          {project.category}
        </p>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-3
            max-w-xl
            text-sm
            leading-6
            text-slate-600
            sm:text-base
          "
        >
          {project.description}
        </p>


        {/* ==================================================
            TAGS
        ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                border
                border-sky-100
                bg-sky-50
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-sky-700
              "
            >
              {tag}
            </span>
          ))}
        </div>


        {/* ==================================================
            EXPLORE
        ================================================== */}

        <button
          type="button"
          className="
            group/explore
            mt-7
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-sky-600
            transition-colors
            hover:text-indigo-600
          "
        >
          Explore Project

          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover/explore:translate-x-1
            "
          />
        </button>

      </motion.div>
    </motion.div>
  );
}