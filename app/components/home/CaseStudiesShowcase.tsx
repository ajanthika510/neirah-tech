"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
} from "lucide-react";

import {
  getCaseStudies,
  type CaseStudy,
} from "../../actions/caseStudyActions";

/* =========================================================
   TYPES
========================================================= */

interface ShowcaseCaseStudy {
  id: string | number;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  year: string;
  technologies: string[];
  impactMetric: string;
  impactLabel: string;
  url: string;
  accentColor: string;
  accentGradient: string;
}

/* =========================================================
   FALLBACK DATASET
========================================================= */

const SHOWCASE_DATASET: ShowcaseCaseStudy[] = [
  {
    id: "lantriva",
    number: "01",
    category: "UI/UX & Digital Experience",
    title: "Lantriva Digital Ecosystem",
    subtitle:
      "High-conversion digital product suite serving global enterprise users.",
    description:
      "Engineered a fluid multi-brand design system with sub-100ms page transitions, real-time analytics, and instant multi-language switching.",
    image: "/images/lantravia.png",
    year: "2026",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Design Systems",
    ],
    impactMetric: "+184%",
    impactLabel: "Checkout Conversion Growth",
    url: "/case-studies",
    accentColor: "#0EA5E9",
    accentGradient:
      "from-sky-500 via-cyan-400 to-indigo-500",
  },

  {
    id: "neirah-lab",
    number: "02",
    category: "AI, R&D & Swarm Automation",
    title: "Neirah Lab Agent Swarm",
    subtitle:
      "Autonomous developer agent platform processing 10M+ tasks daily.",
    description:
      "Built an intelligent agentic control center featuring live WebSocket trace telemetry, automated code refactoring, and zero-latency prompt response pipelines.",
    image: "/images/neirah_lab.png",
    year: "2026",
    technologies: [
      "Python",
      "TypeScript",
      "Vector Embeddings",
      "WebSockets",
      "React",
    ],
    impactMetric: "10M+",
    impactLabel: "Tasks Processed Daily",
    url: "/case-studies",
    accentColor: "#8B5CF6",
    accentGradient:
      "from-violet-500 via-purple-500 to-indigo-500",
  },

  {
    id: "mugilix",
    number: "03",
    category: "Enterprise Business OS",
    title: "Mugilix Operating System",
    subtitle:
      "Connected cloud platform powering operations for 2.4M+ business users.",
    description:
      "Unified ERP, HRM, and financial analytics into a single high-performance dashboard with sub-second search and automated tax payroll runs.",
    image: "/images/mugilix.png",
    year: "2026",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
    ],
    impactMetric: "2.4M+",
    impactLabel: "Active Enterprise Users",
    url: "/case-studies",
    accentColor: "#6366F1",
    accentGradient:
      "from-indigo-500 via-blue-500 to-purple-500",
  },

  {
    id: "pothify",
    number: "04",
    category: "Logistics & Mobility SaaS",
    title: "Pothify Delivery Infrastructure",
    subtitle:
      "Real-time dispatch engine matching fleet orders under 2.1 seconds.",
    description:
      "Developed an ultra-low latency dispatch algorithm connecting food delivery fleets, courier drivers, and merchant kitchens with live GPS telemetry.",
    image: "/images/veera.png",
    year: "2025",
    technologies: [
      "Next.js",
      "WebSockets",
      "Mapbox GL",
      "Go",
      "Tailwind CSS",
    ],
    impactMetric: "< 2.1s",
    impactLabel: "Instant Driver Dispatch",
    url: "/case-studies",
    accentColor: "#10B981",
    accentGradient:
      "from-emerald-500 via-teal-400 to-cyan-500",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CaseStudiesShowcase() {
  const [studies, setStudies] =
    useState<ShowcaseCaseStudy[]>(SHOWCASE_DATASET);

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  /* =======================================================
     LOAD DATABASE CASE STUDIES
  ======================================================= */

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCaseStudies();

        if (data && data.length > 0) {
          const enriched: ShowcaseCaseStudy[] =
            data.map(
              (item: CaseStudy, idx: number) => {
                const fallback =
                  SHOWCASE_DATASET[
                    idx % SHOWCASE_DATASET.length
                  ];

                return {
                  id: item.id,

                  number:
                    item.number ||
                    String(idx + 1).padStart(2, "0"),

                  category:
                    item.category ||
                    fallback.category,

                  title:
                    item.title ||
                    fallback.title,

                  subtitle:
                    item.subtitle ||
                    fallback.subtitle,

                  description:
                    item.description ||
                    fallback.description,

                  image:
                    item.image ||
                    fallback.image,

                  year:
                    item.year ||
                    fallback.year,

                  technologies:
                    Array.isArray(item.services) &&
                    item.services.length > 0
                      ? item.services
                      : fallback.technologies,

                  impactMetric:
                    fallback.impactMetric,

                  impactLabel:
                    fallback.impactLabel,

                  url: "/case-studies",

                  accentColor:
                    fallback.accentColor,

                  accentGradient:
                    fallback.accentGradient,
                };
              }
            );

          setStudies(enriched);
        }
      } catch (err) {
        console.error(
          "Failed to load DB case studies:",
          err
        );
      }
    }

    loadData();
  }, []);

  /* =======================================================
     ACTIVE STUDY
  ======================================================= */

  const activeStudy =
    studies[activeIndex] || studies[0];

  if (!activeStudy) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FBFF]
        text-[#0F172A]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =================================================
          BACKGROUND GRID
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.22]
          [background-image:linear-gradient(rgba(14,165,233,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.05)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* =================================================
          AMBIENT LIGHT
      ================================================= */}

      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/3
          -translate-x-1/2
          -translate-y-1/2
          h-[420px]
          w-[700px]
          sm:h-[500px]
          sm:w-[1000px]
          rounded-full
          blur-[140px]
        "
        style={{
          backgroundColor:
            activeStudy.accentColor,
        }}
        aria-hidden="true"
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 text-center sm:mb-14 lg:mb-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              mb-3
              inline-flex
              items-center
              gap-2
              font-mono
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#0EA5E9]
            "
          >
            <Award size={13} />
            <span>Case Studies</span>
          </motion.div>

          <motion.h2
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
              duration: 0.7,
              delay: 0.05,
            }}
            className="
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-[#0F172A]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Real Business Impact.
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
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
              delay: 0.15,
            }}
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-relaxed
              text-slate-500
              sm:text-base
            "
          >
            Explore the systems, products, and digital
            experiences we engineered to solve real
            business problems.
          </motion.p>

          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            whileInView={{
              scaleX: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              mx-auto
              mt-5
              h-px
              w-14
              origin-center
              bg-[#0EA5E9]/50
            "
          />
        </div>

        {/* =================================================
            ACCORDION
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-3
            lg:h-[560px]
            lg:flex-row
          "
        >
          {studies.map((study, index) => {
            const isActive =
              activeIndex === index;

            return (
              <motion.article
                key={study.id || index}
                layout
                initial={false}
                onClick={() =>
                  setActiveIndex(index)
                }
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 110,
                    damping: 20,
                  },
                }}
                whileHover={{
                  y: isActive ? 0 : -5,
                }}
                className={`
                  group
                  relative
                  cursor-pointer
                  overflow-hidden
                  rounded-2xl
                  border
                  select-none
                  shadow-xl
                  lg:rounded-3xl
                  ${
                    isActive
                      ? "h-[430px] sm:h-[500px] lg:h-full lg:flex-[4.5]"
                      : "h-[82px] sm:h-[96px] lg:h-full lg:flex-1"
                  }
                  ${
                    isActive
                      ? "border-slate-200"
                      : "border-slate-200/80"
                  }
                  transition-[border-color,box-shadow]
                  duration-500
                `}
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: isActive
                      ? 1.045
                      : 1,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="
                      (max-width: 1024px) 100vw,
                      60vw
                    "
                    className="
                      object-cover
                      object-center
                    "
                  />
                </motion.div>

                {/* =================================================
                    IMAGE COLOR TREATMENT
                ================================================= */}

                <div
                  className={`
                    absolute
                    inset-0
                    transition-all
                    duration-700
                    ${
                      isActive
                        ? "bg-slate-950/25"
                        : "bg-slate-950/65"
                    }
                  `}
                />

                {/* =================================================
                    ACTIVE BOTTOM GRADIENT
                ================================================= */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-slate-950/85
                    via-slate-950/20
                    to-transparent
                    transition-opacity
                    duration-500
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-70"
                    }
                  `}
                />

                {/* =================================================
                    ACCENT EDGE
                ================================================= */}

                <motion.div
                  animate={{
                    opacity: isActive
                      ? 1
                      : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    absolute
                    left-0
                    top-0
                    bottom-0
                    w-1.5
                  "
                  style={{
                    backgroundColor:
                      study.accentColor,
                  }}
                />

                {/* =================================================
                    INACTIVE CONTENT
                ================================================= */}

                <AnimatePresence mode="wait">
                  {!isActive && (
                    <motion.div
                      key="collapsed"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            rounded-lg
                            bg-black/20
                            px-2.5
                            py-1.5
                            font-mono
                            text-[10px]
                            font-bold
                            text-white/70
                            backdrop-blur-sm
                          "
                        >
                          {study.number}
                        </span>

                        <span
                          className="
                            font-serif
                            text-base
                            uppercase
                            tracking-[0.25em]
                            text-white
                            drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]
                            sm:text-lg
                            lg:-rotate-90
                            lg:whitespace-nowrap
                          "
                        >
                          {study.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    ACTIVE CONTENT
                ================================================= */}

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="expanded"
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        z-20
                        p-5
                        sm:p-7
                        lg:p-8
                      "
                    >
                      {/* =================================================
                          TOP META
                      ================================================= */}

                      <div
                        className="
                          mb-3
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              shrink-0
                              rounded-lg
                              bg-black/25
                              px-2.5
                              py-1.5
                              font-mono
                              text-[10px]
                              font-black
                              text-white
                              backdrop-blur-md
                            "
                          >
                            {study.number}
                          </span>

                          <span
                            className="
                              truncate
                              rounded-full
                              border
                              border-white/20
                              bg-black/20
                              px-3
                              py-1.5
                              font-mono
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-widest
                              text-white/80
                              backdrop-blur-md
                              sm:text-[10px]
                            "
                          >
                            {study.category}
                          </span>
                        </div>

                        <span
                          className="
                            shrink-0
                            font-mono
                            text-[10px]
                            font-bold
                            text-white/60
                            sm:text-xs
                          "
                        >
                          {study.year}
                        </span>
                      </div>

                      {/* =================================================
                          TITLE
                      ================================================= */}

                      <motion.h3
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.22,
                          duration: 0.45,
                        }}
                        className="
                          max-w-3xl
                          font-serif
                          text-2xl
                          font-bold
                          uppercase
                          leading-[1.05]
                          tracking-[0.08em]
                          text-white
                          drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]
                          sm:text-3xl
                          md:text-4xl
                          lg:text-5xl
                        "
                      >
                        {study.title}
                      </motion.h3>

                      {/* =================================================
                          SUBTITLE
                      ================================================= */}

                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.3,
                          duration: 0.4,
                        }}
                        className="
                          mt-3
                          max-w-2xl
                          text-xs
                          leading-relaxed
                          text-white/80
                          sm:text-sm
                        "
                      >
                        {study.subtitle}
                      </motion.p>

                      {/* =================================================
                          DESCRIPTION
                      ================================================= */}

                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.36,
                          duration: 0.4,
                        }}
                        className="
                          mt-2
                          hidden
                          max-w-2xl
                          text-xs
                          leading-relaxed
                          text-white/65
                          sm:block
                          sm:text-sm
                        "
                      >
                        {study.description}
                      </motion.p>

                      {/* =================================================
                          BOTTOM ROW
                      ================================================= */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.42,
                          duration: 0.4,
                        }}
                        className="
                          mt-5
                          flex
                          flex-col
                          gap-4
                          sm:flex-row
                          sm:items-end
                          sm:justify-between
                        "
                      >
                        {/* TECHNOLOGIES */}

                        <div
                          className="
                            flex
                            max-w-xl
                            flex-wrap
                            gap-1.5
                          "
                        >
                          {study.technologies
                            .slice(0, 4)
                            .map(
                              (
                                technology,
                                techIndex
                              ) => (
                                <span
                                  key={`${technology}-${techIndex}`}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-black/20
                                    px-2.5
                                    py-1.5
                                    font-mono
                                    text-[9px]
                                    font-bold
                                    text-white/70
                                    backdrop-blur-md
                                  "
                                >
                                  <CheckCircle2
                                    size={10}
                                    style={{
                                      color:
                                        study.accentColor,
                                    }}
                                  />

                                  {technology}
                                </span>
                              )
                            )}
                        </div>

                        {/* IMPACT + CTA */}

                        <div
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className="
                              hidden
                              text-right
                              sm:block
                            "
                          >
                            <span
                              className="
                                block
                                font-mono
                                text-lg
                                font-black
                                leading-none
                                text-white
                              "
                            >
                              {study.impactMetric}
                            </span>

                            <span
                              className="
                                mt-1
                                block
                                max-w-[130px]
                                font-mono
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-white/50
                              "
                            >
                              {study.impactLabel}
                            </span>
                          </div>

                          <Link
                            href={study.url}
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              border
                              border-white/20
                              bg-white
                              px-4
                              py-2.5
                              text-[10px]
                              font-black
                              uppercase
                              tracking-wider
                              text-[#0F172A]
                              shadow-xl
                              transition-all
                              duration-300
                              hover:-translate-y-0.5
                              hover:bg-[#0EA5E9]
                              hover:text-white
                              sm:px-5
                            "
                          >
                            <span>
                              View Case
                            </span>

                            <ArrowUpRight
                              size={13}
                            />
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    ACTIVE BORDER
                ================================================= */}

                {isActive && (
                  <motion.div
                    layoutId="case-study-active-border"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-30
                      rounded-2xl
                      border-2
                      lg:rounded-3xl
                    "
                    style={{
                      borderColor:
                        study.accentColor,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />
                )}

                {/* =================================================
                    ACTIVE CORNER ACCENT
                ================================================= */}

                {isActive && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.4,
                    }}
                    className="
                      pointer-events-none
                      absolute
                      right-5
                      top-5
                      z-30
                      h-2
                      w-2
                      rounded-full
                      shadow-[0_0_20px_currentColor]
                    "
                    style={{
                      color: study.accentColor,
                      backgroundColor:
                        study.accentColor,
                    }}
                  />
                )}
              </motion.article>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-8
            flex
            justify-center
            sm:mt-10
          "
        >
          <Link
            href="/case-studies"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-[#0F172A]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#0EA5E9]
              hover:text-[#0EA5E9]
              hover:shadow-lg
            "
          >
            <span>
              Explore All Case Studies
            </span>

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}