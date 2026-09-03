"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCaseStudies } from "../../actions/caseStudyActions";
import RevealText from "../ui/RevealText";
import { easeCustom as ease, revealUp, staggerContainer } from "@/lib/motion";

/* =========================================================
   TYPES
========================================================= */

type CaseStudyItem = {
  id?: string;
  number: string;
  category: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  year: string;
  services: string[];
  slug?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function formatProjectNumber(value: unknown, fallback: number) {
  const parsed = Number(value);

  if (Number.isFinite(parsed)) {
    return String(parsed).padStart(2, "0");
  }

  return String(fallback).padStart(2, "0");
}

function normalizeCaseStudy(
  item: Record<string, unknown> | null | undefined,
  index: number
): CaseStudyItem {
  return {
    id: item?.id ? String(item.id) : undefined,

    number: formatProjectNumber(
      item?.number,
      index + 1
    ),

    category:
      (item?.category as string) ||
      (item?.industry as string) ||
      "Digital",

    type:
      (item?.type as string) ||
      (item?.projectType as string) ||
      "Web Project",

    title:
      (item?.title as string) ||
      (item?.name as string) ||
      "Untitled Project",

    subtitle:
      (item?.subtitle as string) ||
      (item?.shortDescription as string) ||
      "",

    description:
      (item?.description as string) ||
      "",

    image:
      (item?.image as string) ||
      (item?.imageUrl as string) ||
      "/images/case-studies/default.jpg",

    year: String(
      item?.year ||
      new Date().getFullYear()
    ),

    services: Array.isArray(item?.services)
      ? item.services.map(String)
      : [],

    slug:
      item?.slug
        ? String(item.slug)
        : undefined,
  };
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CaseStudiesPage({ initialCaseStudies }: { initialCaseStudies?: Record<string, unknown>[] }) {
  const [projects, setProjects] = useState<CaseStudyItem[]>(() => {
    if (initialCaseStudies && initialCaseStudies.length > 0) {
      return initialCaseStudies
        .map((item: Record<string, unknown>, index: number) => normalizeCaseStudy(item, index))
        .filter(Boolean) as CaseStudyItem[];
    }
    return [];
  });

  const [loading, setLoading] = useState(!initialCaseStudies || initialCaseStudies.length === 0);

  const [error, setError] = useState(false);

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  useEffect(() => {
    if (initialCaseStudies && initialCaseStudies.length > 0) return;
    let mounted = true;

    const loadCaseStudies = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getCaseStudies();

        if (!mounted) return;

        if (Array.isArray(data)) {
          const normalizedProjects =
            data
              .map((item: unknown, index: number) =>
                normalizeCaseStudy(item as Record<string, unknown>, index)
              )
              .sort((a, b) => {
                const aNumber = Number(a.number);
                const bNumber = Number(b.number);

                if (
                  Number.isFinite(aNumber) &&
                  Number.isFinite(bNumber)
                ) {
                  return aNumber - bNumber;
                }

                return a.number.localeCompare(
                  b.number
                );
              });

          setProjects(normalizedProjects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error(
          "Failed to load case studies:",
          err
        );

        if (mounted) {
          setError(true);
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCaseStudies();

    return () => {
      mounted = false;
    };
  }, [initialCaseStudies]);



  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAFC]
          text-[#0F172A]
        "
      >
        <div className="flex flex-col items-center gap-5">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              h-12
              w-12
              rounded-full
              border-2
              border-[#E2E8F0]
              border-t-[#0EA5E9]
            "
          />

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#64748B]
            "
          >
            Loading projects
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAFC]
          px-6
          text-[#0F172A]
        "
      >
        <div className="max-w-md text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-red-100
              bg-red-50
            "
          >
            <Sparkles
              size={24}
              className="text-red-500"
            />
          </div>

          <h1
            className="
              mt-6
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Unable to load projects
          </h1>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            Something went wrong while loading
            the case studies. Please try again.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="
              mt-7
              inline-flex
              min-h-[48px]
              items-center
              gap-3
              rounded-full
              bg-[#0F172A]
              px-6
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-white
              transition
              hover:bg-[#0EA5E9]
            "
          >
            Try again
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!projects.length) {
    return (
      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[#F8FAFC]
          px-6
          text-[#0F172A]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-300/10
            blur-[120px]
          "
        />

        <div className="relative max-w-xl text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-[#BAE6FD]
              bg-white
              shadow-[0_20px_50px_rgba(14,165,233,0.12)]
            "
          >
            <Sparkles
              size={24}
              className="text-[#0EA5E9]"
            />
          </div>

          <p
            className="
              mt-7
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#0EA5E9]
            "
          >
            Project archive
          </p>

          <h1
            className="
              mt-5
              text-4xl
              font-semibold
              leading-[0.95]
              tracking-[-0.05em]
              sm:text-5xl
            "
          >
            No projects
            <br />
            <span className="text-[#151aad]">
              published yet.
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-md
              text-sm
              leading-7
              text-[#64748B]
            "
          >
            Our latest digital projects will
            appear here once they are published.
          </p>

          <Link
            href="/contact"
            className="
              mt-8
              inline-flex
              min-h-[52px]
              items-center
              gap-4
              rounded-full
              bg-[#0F172A]
              px-7
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-white
              shadow-[0_20px_40px_rgba(15,23,42,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#0EA5E9]
            "
          >
            Start your project

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/10
              "
            >
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const featuredProject = projects[0];

  const archiveProjects =
    projects.slice(1);

  const projectCount =
    String(projects.length).padStart(2, "0");

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F8FAFC]
        text-[#0F172A]
      "
    >
      {/* =====================================================
          GLOBAL ATMOSPHERE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* Sky atmosphere */}

        <div
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-sky-300/10
            blur-[120px]
            sm:h-[600px]
            sm:w-[600px]
            lg:h-[700px]
            lg:w-[700px]
            lg:blur-[150px]
          "
        />

        {/* Indigo */}

        <div
          className="
            absolute
            right-[-220px]
            top-[35%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-indigo-300/10
            blur-[120px]
            sm:h-[500px]
            sm:w-[500px]
          "
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-5
          pb-24
          pt-32
          sm:px-8
          sm:pb-28
          sm:pt-36
          lg:px-12
          lg:pb-36
          lg:pt-44
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              grid
              gap-14
              lg:grid-cols-[1fr_300px]
              lg:items-end
              lg:gap-20
            "
          >
            {/* LEFT */}

            <div>
              {/* Eyebrow */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="
                  mb-7
                  flex
                  items-center
                  gap-4
                  sm:mb-8
                "
              >
                <span
                  className="
                    relative
                    flex
                    h-3
                    w-3
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      relative
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-cyan-500
                    "
                  />
                </span>

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#0EA5E9]
                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                >
                  Selected Work · 2026
                </span>
              </motion.div>

              {/* H1 */}

              <h1
  className="
    max-w-5xl
    mx-auto
    text-[clamp(3rem,7vw,6.8rem)]
    font-semibold
    leading-[0.85]
    tracking-[-0.065em]
    text-[#0F172A]
  "
>
  <span className="block">
    <RevealText
      text="Digital"
      mode="viewport"
      stagger={0.09}
      duration={0.65}
      blurAmount={8}
    />
  </span>

  <span
    className="
      block
      -mt-[0.08em]
      bg-gradient-to-r
      from-[#22D3EE]
      via-[#0EA5E9]
      to-[#4F46E5]
      bg-clip-text
      text-transparent
    "
  >
    <RevealText
      text="experiences"
      mode="viewport"
      delay={0.2}
      stagger={0.09}
      duration={0.65}
      blurAmount={8}
    />
  </span>

  <span className="block -mt-[0.08em]">
    <RevealText
      text="that move."
      mode="viewport"
      delay={0.4}
      stagger={0.09}
      duration={0.65}
      blurAmount={8}
    />
  </span>
</h1>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.8,
                ease,
              }}
              className="hidden lg:block"
            >
              <div
                className="
                  mb-8
                  h-px
                  w-16
                  bg-[#CBD5E1]
                "
              />

              <p
                className="
                  text-sm
                  leading-7
                  text-[#64748B]
                "
              >
                A collection of digital products,
                platforms and identities crafted
                for ambitious brands.
              </p>

              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#CBD5E1]
                    bg-white
                    text-sm
                  "
                >
                  ↓
                </div>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#64748B]
                  "
                >
                  Explore projects
                </span>
              </div>
            </motion.div>
          </div>

          {/* MOBILE DESCRIPTION */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 0.8,
            }}
            className="
              mt-10
              max-w-xl
              lg:hidden
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-[#64748B]
                sm:text-base
                sm:leading-8
              "
            >
              A collection of digital products,
              platforms and identities crafted
              for ambitious brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECT
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-5
          pb-28
          sm:px-8
          sm:pb-36
          lg:px-12
          lg:pb-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          {/* LABEL */}

          <div
            className="
              mb-7
              flex
              items-center
              justify-between
              sm:mb-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#0EA5E9]
                  sm:w-12
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#64748B]
                  sm:text-xs
                "
              >
                Featured project
              </span>
            </div>

            <span
              className="
                font-mono
                text-xs
                text-[#94A3B8]
              "
            >
              01 — {projectCount}
            </span>
          </div>

          {/* FEATURED CARD */}

          <motion.article
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 1,
              ease,
            }}
            className="
              group
              relative
              min-h-[580px]
              overflow-hidden
              rounded-[1.75rem]
              bg-[#0B1220]
              sm:min-h-[650px]
              sm:rounded-[2rem]
              lg:min-h-[700px]
            "
          >
            {/* IMAGE */}

            <motion.div
              initial={{
                scale: 1.1,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.5,
                ease,
              }}
              className="absolute inset-0"
            >
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                priority
                sizes="100vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1.8s]
                  ease-out
                  group-hover:scale-105
                "
              />
            </motion.div>

            {/* GRADIENT */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#020617]/90
                via-[#020617]/45
                to-transparent
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#020617]/90
                via-transparent
                to-transparent
              "
            />

            {/* TOP */}

            <div
              className="
                absolute
                left-5
                right-5
                top-5
                flex
                items-center
                justify-between
                sm:left-8
                sm:right-8
                sm:top-8
                lg:left-10
                lg:right-10
                lg:top-10
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  backdrop-blur-xl
                  sm:px-4
                  sm:py-2
                  sm:text-xs
                "
              >
                {featuredProject.type}
              </span>

              <span
                className="
                  font-mono
                  text-xs
                  text-white/60
                  sm:text-sm
                "
              >
                {featuredProject.number}
              </span>
            </div>

            {/* CONTENT */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease,
              }}
              className="
                absolute
                bottom-5
                left-5
                max-w-xl
                sm:bottom-8
                sm:left-8
                lg:bottom-10
                lg:left-10
              "
            >
              <div
                className="
                  rounded-[1.25rem]
                  border
                  border-white/15
                  bg-white/[0.09]
                  p-5
                  backdrop-blur-2xl
                  sm:rounded-[1.5rem]
                  sm:p-7
                  lg:p-8
                "
              >
                <p
                  className="
                    mb-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-cyan-300
                    sm:text-xs
                  "
                >
                  {featuredProject.category} ·{" "}
                  {featuredProject.year}
                </p>

                <h2
                  className="
                    text-3xl
                    font-semibold
                    tracking-[-0.04em]
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {featuredProject.title}
                </h2>

                {featuredProject.subtitle && (
                  <p
                    className="
                      mt-2
                      text-sm
                      text-white/70
                      sm:text-base
                      lg:text-lg
                    "
                  >
                    {featuredProject.subtitle}
                  </p>
                )}

                {featuredProject.description && (
                  <p
                    className="
                      mt-4
                      max-w-lg
                      text-xs
                      leading-6
                      text-white/55
                      sm:mt-5
                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    {featuredProject.description}
                  </p>
                )}

                <a
                  href={
                    featuredProject.slug
                      ? `/case-studies/${featuredProject.slug}`
                      : "#case-studies-archive"
                  }
                  onClick={(e) => {
                    if (!featuredProject.slug) {
                      e.preventDefault();
                      document.getElementById("case-studies-archive")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="
                    group/link
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    sm:mt-7
                    sm:text-xs
                  "
                >
                  View case study

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#0F172A]
                      transition-transform
                      duration-500
                      group-hover/link:rotate-45
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* ORBIT */}

            <div
              className="
                absolute
                right-[10%]
                top-[25%]
                hidden
                h-28
                w-28
                rounded-full
                border
                border-white/10
                lg:block
              "
            >
              <div
                className="
                  absolute
                  right-0
                  top-1/2
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_20px_#67E8F9]
                "
              />
            </div>
          </motion.article>
        </div>
      </section>

      {/* =====================================================
          PROJECT ARCHIVE
      ===================================================== */}

      {archiveProjects.length > 0 && (
        <section
          id="case-studies-archive"
          className="
            relative
            z-10
            scroll-mt-24
            bg-[#EEF8FC]
            px-5
            py-28
            sm:px-8
            sm:py-32
            lg:px-12
            lg:py-40
          "
        >
          <div className="mx-auto max-w-[1400px]">
            {/* HEADER */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                mb-16
                grid
                gap-8
                sm:mb-20
                lg:grid-cols-[1fr_400px]
                lg:items-end
              "
            >
              <div>
                <motion.p
                  variants={revealUp}
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#0EA5E9]
                    sm:text-xs
                  "
                >
                  Project archive
                </motion.p>

                <motion.h2
                  variants={revealUp}
                  className="
                    mt-4
                    max-w-3xl
                    text-4xl
                    font-semibold
                    leading-[0.92]
                    tracking-[-0.055em]
                    text-[#0F172A]
                    sm:text-5xl
                    md:text-6xl
                    lg:text-[5.8rem]
                  "
                >
                  Different

                  <br />

                  <span className="text-[#151aad]">
                    problems.
                  </span>

                  <br />

                  One approach.
                </motion.h2>
              </div>

              <motion.p
                variants={revealUp}
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-[#64748B]
                  sm:text-base
                  sm:leading-8
                "
              >
                Every project starts with a
                different challenge. Our process
                combines strategy, design and
                technology to create digital
                experiences that feel intentional.
              </motion.p>
            </motion.div>

            {/* ALL BACKEND PROJECTS */}

            <div
              className="
                space-y-10
                sm:space-y-14
              "
            >
              {archiveProjects.map(
                (project, index) => (
                  <EditorialProject
                    key={
                      project.id ||
                      `${project.number}-${project.title}-${index}`
                    }
                    project={project}
                    index={index}
                    reverse={index % 2 === 1}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          METRICS
      ===================================================== */}

      <section
        className="
          relative
          z-10
          overflow-hidden
          bg-[#0B1220]
          text-white
        "
      >
        <div
          className="
            absolute
            inset-0
            opacity-30
          "
        >
          <div
            className="
              absolute
              inset-0
              [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
              [background-size:80px_80px]
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            max-w-[1400px]
            px-5
            py-24
            sm:px-8
            sm:py-28
            lg:px-12
            lg:py-36
          "
        >
          <div
            className="
              mb-14
              flex
              flex-col
              justify-between
              gap-6
              md:flex-row
              md:items-end
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-cyan-300
                  sm:text-xs
                "
              >
                By the numbers
              </p>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Work with measurable impact.
              </h2>
            </div>

            <Sparkles
              className="
                hidden
                text-cyan-300
                md:block
              "
              size={30}
            />
          </div>

          <div
            className="
              grid
              border-l
              border-white/10
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[
              [
                `${projects.length}+`,
                "Digital Projects",
              ],
              ["12", "Industries"],
              ["98%", "Client Satisfaction"],
              ["24/7", "Digital Support"],
            ].map(
              ([number, label], index) => (
                <Metric
                  key={label}
                  number={number}
                  label={label}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="
          relative
          z-10
          overflow-hidden
          bg-[#F8FAFC]
          px-5
          py-28
          sm:px-8
          sm:py-36
          lg:px-12
          lg:py-44
        "
      >
        {/* MAIN ORB */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[400px]
            w-[400px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-300/25
            blur-[120px]
            sm:h-[500px]
            sm:w-[500px]
            lg:h-[600px]
            lg:w-[600px]
          "
        />

        {/* SECONDARY ORB */}

        <motion.div
          animate={{
            x: [-60, 60, -60],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[5%]
            top-[20%]
            h-28
            w-28
            rounded-full
            bg-indigo-300/20
            blur-[70px]
            sm:h-36
            sm:w-36
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-5xl
            text-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 45,
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
              duration: 0.9,
              ease,
            }}
          >
            {/* ICON */}

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                mb-7
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-[#BAE6FD]
                bg-white
                shadow-[0_20px_50px_rgba(14,165,233,0.12)]
                sm:mb-8
                sm:h-16
                sm:w-16
              "
            >
              <Sparkles
                size={22}
                className="text-[#0EA5E9]"
              />
            </motion.div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#0EA5E9]
                sm:text-xs
                sm:tracking-[0.3em]
              "
            >
              Your project could be next
            </p>

            {/* CTA H2 */}

            <h2
              className="
                mt-6
                text-4xl
                font-semibold
                leading-[0.92]
                tracking-[-0.055em]
                text-[#0F172A]
                sm:text-5xl
                md:text-6xl
                lg:text-[6.2rem]
              "
            >
              Let&apos;s build

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#0EA5E9]
                  via-[#2563EB]
                  to-[#6366F1]
                  bg-clip-text
                  text-transparent
                "
              >
                something
              </span>

              <br />

              unforgettable.
            </h2>

            <p
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-sm
                leading-7
                text-[#64748B]
                sm:mt-8
                sm:text-base
                sm:leading-8
              "
            >
              Have a business idea, website
              redesign or digital product in mind?
              Let&apos;s turn it into an experience
              people remember.
            </p>

            {/* BUTTONS */}

            <div
              className="
                mt-9
                flex
                flex-col
                justify-center
                gap-3
                sm:mt-10
                sm:flex-row
                sm:gap-4
              "
            >
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-4
                  rounded-full
                  bg-[#0F172A]
                  px-7
                  text-xs
                  font-bold
                  text-white
                  shadow-[0_20px_40px_rgba(15,23,42,0.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#0EA5E9]
                  sm:px-8
                  sm:text-sm
                "
              >
                Start your project

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                href="/services"
                className="
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#CBD5E1]
                  bg-white/80
                  px-7
                  text-xs
                  font-bold
                  text-[#475569]
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#0EA5E9]
                  hover:text-[#0EA5E9]
                  sm:px-8
                  sm:text-sm
                "
              >
                Explore services

                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   EDITORIAL PROJECT
========================================================= */

function EditorialProject({
  project,
  index,
  reverse,
}: {
  project: CaseStudyItem;
  index: number;
  reverse: boolean;
}) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    setMouse({
      x:
        ((event.clientX - rect.left) /
          rect.width) *
        100,

      y:
        ((event.clientY - rect.top) /
          rect.height) *
        100,
    });
  };

  const caseStudyHref = project.slug
    ? `/case-studies/${project.slug}`
    : "/contact";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease,
      }}
      className="
        group
        relative
        grid
        gap-7
        lg:grid-cols-[80px_1fr]
      "
    >
      {/* NUMBER */}

      <div className="hidden lg:block">
        <div
          className="
            sticky
            top-32
            flex
            flex-col
            items-center
          "
        >
          <span
            className="
              font-mono
              text-sm
              text-[#0EA5E9]
            "
          >
            {project.number}
          </span>

          <div
            className="
              mt-4
              h-20
              w-px
              bg-[#CBD5E1]
            "
          />
        </div>
      </div>

      {/* CARD */}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="
          relative
          overflow-hidden
          rounded-[1.75rem]
          border
          border-[#D7E6ED]
          bg-white
          shadow-[0_20px_70px_rgba(15,23,42,0.05)]
          sm:rounded-[2rem]
        "
      >
        {/* MOUSE GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          style={{
            background: `radial-gradient(
              450px circle at ${mouse.x}% ${mouse.y}%,
              rgba(14,165,233,0.10),
              transparent 55%
            )`,
          }}
        />

        <div
          className={`
            grid
            lg:grid-cols-2
            ${
              reverse
                ? "lg:[&>div:first-child]:order-2"
                : ""
            }
          `}
        >
          {/* IMAGE */}

          <div
            className="
              relative
              h-[320px]
              overflow-hidden
              sm:h-[420px]
              lg:h-[560px]
            "
          >
            <motion.div
              initial={{
                scale: 1.1,
                clipPath:
                  "inset(7% 7% 7% 7%)",
              }}
              whileInView={{
                scale: 1,
                clipPath:
                  "inset(0% 0% 0% 0%)",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
                ease,
              }}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="
                  (max-width: 1024px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-[1.5s]
                  ease-out
                  group-hover:scale-110
                "
              />
            </motion.div>

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#020617]/60
                via-transparent
                to-transparent
              "
            />

            {/* NUMBER */}

            <div
              className="
                absolute
                left-5
                top-5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-black/20
                font-mono
                text-[10px]
                text-white
                backdrop-blur-xl
                sm:left-6
                sm:top-6
                sm:h-11
                sm:w-11
                sm:text-xs
              "
            >
              {project.number}
            </div>

            {/* TYPE */}

            <div
              className="
                absolute
                bottom-5
                left-5
                sm:bottom-6
                sm:left-6
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-white/25
                  bg-white/15
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  backdrop-blur-xl
                  sm:px-4
                  sm:py-2
                  sm:text-xs
                "
              >
                {project.type}
              </span>
            </div>
          </div>

          {/* CONTENT */}

          <div
            className="
              flex
              flex-col
              justify-between
              p-6
              sm:p-9
              lg:p-12
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#0EA5E9]
                    sm:text-xs
                  "
                >
                  {project.category}
                </span>

                <span
                  className="
                    font-mono
                    text-[10px]
                    text-[#94A3B8]
                    sm:text-xs
                  "
                >
                  {project.year}
                </span>
              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-9
                  text-3xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-[#0F172A]
                  sm:mt-10
                  sm:text-4xl
                  lg:mt-12
                  lg:text-[3.2rem]
                "
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <p
                  className="
                    mt-2
                    text-base
                    text-[#475569]
                    sm:text-lg
                  "
                >
                  {project.subtitle}
                </p>
              )}

              {project.description && (
                <p
                  className="
                    mt-6
                    max-w-lg
                    text-xs
                    leading-7
                    text-[#64748B]
                    sm:mt-7
                    sm:text-sm
                    sm:leading-8
                  "
                >
                  {project.description}
                </p>
              )}
            </div>

            {/* BOTTOM */}

            <div
              className="
                mt-10
                sm:mt-12
              "
            >
              {/* SERVICES */}

              {project.services.length > 0 && (
                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {project.services.map(
                    (service, serviceIndex) => (
                      <span
                        key={`${service}-${serviceIndex}`}
                        className="
                          rounded-full
                          border
                          border-[#D7E6ED]
                          bg-[#F8FAFC]
                          px-3
                          py-1.5
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-[#64748B]
                          transition-all
                          duration-300
                          group-hover:border-[#7DD3FC]
                          group-hover:bg-[#F0F9FF]
                          sm:px-4
                          sm:py-2
                          sm:text-[10px]
                        "
                      >
                        {service}
                      </span>
                    )
                  )}
                </div>
              )}

              {/* LINK */}

              <Link
                href={caseStudyHref}
                className="
                  group/link
                  mt-8
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#E2E8F0]
                  pt-5
                  sm:mt-9
                  sm:pt-6
                "
              >
                <span
                  className="
                    text-xs
                    font-bold
                    text-[#0F172A]
                    sm:text-sm
                  "
                >
                  View case study
                </span>

                <motion.span
                  whileHover={{
                    scale: 1.08,
                    rotate: 45,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0F172A]
                    text-white
                    transition-colors
                    duration-300
                    group-hover/link:bg-[#0EA5E9]
                    sm:h-11
                    sm:w-11
                  "
                >
                  <MoveUpRight size={16} />
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  number,
  label,
  index,
}: {
  number: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
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
        amount: 0.4,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease,
      }}
      className="
        group
        border-r
        border-b
        border-white/10
        px-5
        py-10
        last:border-r-0
        sm:px-8
        sm:py-12
        lg:border-b-0
        lg:px-10
        lg:py-8
      "
    >
      <motion.div
        whileHover={{
          x: 5,
        }}
        className="
          text-4xl
          font-semibold
          tracking-[-0.05em]
          text-white
          transition-colors
          duration-300
          group-hover:text-cyan-300
          sm:text-5xl
          lg:text-6xl
        "
      >
        {number}
      </motion.div>

      <p
        className="
          mt-3
          text-[9px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-white/40
          sm:mt-4
          sm:text-[10px]
          sm:text-xs
        "
      >
        {label}
      </p>

      <div
        className="
          mt-6
          h-px
          w-8
          bg-cyan-300/50
          transition-all
          duration-500
          group-hover:w-16
          sm:mt-7
        "
      />
    </motion.div>
  );
}

