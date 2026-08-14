"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Globe2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { getProjects } from "../../actions/projectActions";

/* =========================================================
TYPES
========================================================= */

type Project = {
  id: number;
  title: string;
  category: string;
  country: string;
  countryCode: string;
  status: "Live" | "In Development";
  website: string;
  description: string;
};

/* =========================================================
PROJECT DATA
========================================================= */

const projects: Project[] = [
  {
    id: 4,
    title: "D Plus Landscaping",
    category: "Landscaping Services",
    country: "USA",
    countryCode: "US",
    status: "Live",
    website: "https://dpluslandscaping.com/",
    description:
      "Professional landscaping company website with portfolio showcase and service booking system.",
  },
  {
    id: 5,
    title: "KK99 Proline",
    category: "Apparel Manufacturing",
    country: "Sri Lanka",
    countryCode: "LK",
    status: "Live",
    website: "https://kk99proline.com/",
    description:
      "Custom apparel manufacturer platform with order management and design customization tools.",
  },
  {
    id: 6,
    title: "Chelmsford Master Cabs",
    category: "Transportation",
    country: "UK",
    countryCode: "GB",
    status: "Live",
    website: "https://chelmsfordmastercabs.com/",
    description:
      "Taxi booking platform with real-time tracking, fare calculation, and driver management.",
  },
  {
    id: 7,
    title: "Kesi Chauffeurs",
    category: "Luxury Transport",
    country: "UK",
    countryCode: "GB",
    status: "Live",
    website: "https://kesichauffeurs.co.uk/",
    description:
      "Premium chauffeur service platform with luxury vehicle booking and route optimization.",
  },
  {
    id: 11,
    title: "David Taxi",
    category: "Transportation",
    country: "Switzerland",
    countryCode: "CH",
    status: "Live",
    website: "https://davidtaxi.com/",
    description:
      "Swiss taxi service with multilingual support and airport region coverage.",
  },
  {
    id: 15,
    title: "Aqua Experts",
    category: "Aquarium Services",
    country: "Norway",
    countryCode: "NO",
    status: "Live",
    website: "https://aqua-experts.org/wexperts/",
    description:
      "Professional aquarium services with maintenance scheduling and fish care consultation.",
  },
  {
    id: 16,
    title: "Mamma Products",
    category: "Health Products",
    country: "Sri Lanka",
    countryCode: "LK",
    status: "Live",
    website: "https://mamma-products.com/",
    description:
      "Food products e-commerce with subscription management and health tracking.",
  },
  {
    id: 20,
    title: "Minlon Solar",
    category: "Renewable Energy",
    country: "Sri Lanka",
    countryCode: "LK",
    status: "Live",
    website: "https://miwonsolar.com/",
    description:
      "Solar energy solutions with system design calculator and installation management.",
  },
  {
    id: 22,
    title: "LS O'Hare Taxi",
    category: "Airport Transportation",
    country: "USA",
    countryCode: "US",
    status: "Live",
    website:
      "https://ls-oharetaxi.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F",
    description:
      "Chicago O'Hare airport taxi service with flight tracking and pre-booking system.",
  },
  {
    id: 23,
    title: "Nirosh Clean Rent",
    category: "Professional Cleaning Services",
    country: "USA",
    countryCode: "US",
    status: "Live",
    website:
      "https://niroshcleanrent.com/lander?oref=https%3A%2F%2Fwww.neirahtech.com%2F",
    description:
      "Professional cleaning service platform with booking system and quality assurance tracking.",
  },
];

/* =========================================================
FILTERS
========================================================= */

const filters = [
  { name: "All", flag: "🌐" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "UK", flag: "🇬🇧" },
  { name: "USA", flag: "🇺🇸" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Norway", flag: "🇳🇴" },
];

/* =========================================================
FLAGS
========================================================= */

const flagMap: Record<string, string> = {
  LK: "🇱🇰",
  DE: "🇩🇪",
  GB: "🇬🇧",
  US: "🇺🇸",
  CH: "🇨🇭",
  NO: "🇳🇴",
};

/* =========================================================
HELPERS
========================================================= */

function normalizeWebsite(url: string) {
  if (!url) return "";

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    return `https://${url}`;
  }

  return url;
}

function getDomain(url: string) {
  try {
    return new URL(
      normalizeWebsite(url)
    ).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function getWebsitePreview(url: string) {
  const website = normalizeWebsite(url);

  if (!website) return "";

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    website
  )}?w=1400`;
}

function getWebsiteFavicon(url: string) {
  const domain = getDomain(url);

  if (!domain) return "";

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    domain
  )}&sz=128`;
}

/* =========================================================
PAGE
========================================================= */

export default function Projects() {
  const [activeFilter, setActiveFilter] =
    useState("All");
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  useEffect(() => {
    getProjects().then((data) => {
      if (data && data.length > 0) {
        // Cast or map if status type difference arises, but Project types are compatible
        setProjectsList(data as Project[]);
      }
    });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsList;
    }

    return projectsList.filter(
      (project) =>
        project.country === activeFilter
    );
  }, [activeFilter, projectsList]);

  return (
    <section className="relative overflow-hidden bg-[#F7FAFF] pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue glow */}

        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-400/10 blur-[140px]" />

        {/* Cyan glow */}

        <div className="absolute right-[-120px] top-[15%] h-[550px] w-[550px] rounded-full bg-cyan-300/10 blur-[150px]" />

        {/* Indigo glow */}

        <div className="absolute bottom-[-150px] left-[25%] h-[500px] w-[500px] rounded-full bg-indigo-300/10 blur-[150px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

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
            margin: "-80px",
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          {/* Eyebrow */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white/80
              px-4
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-blue-600
              shadow-sm
              backdrop-blur-xl
            "
          >
            <Sparkles size={13} />

            Digital Experiences

            <span className="relative ml-1 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
            </span>
          </motion.div>

          {/* Heading */}

          <h2
            className="
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.045em]
              text-slate-950

              sm:text-5xl

              lg:text-6xl
            "
          >
            Digital work that{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              moves brands
            </span>
            .
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-[14px]
              leading-7
              text-slate-500

              sm:text-[15px]

              lg:text-base
            "
          >
            A curated collection of websites, platforms
            and digital experiences designed and
            developed for businesses around the world.
          </p>
        </motion.div>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <motion.div
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
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-9 flex justify-center"
        >
          <div
            className="
              flex
              max-w-full
              gap-1
              overflow-x-auto
              rounded-full
              border
              border-slate-200/80
              bg-white/80
              p-1.5
              shadow-[0_15px_45px_rgba(15,23,42,0.07)]
              backdrop-blur-xl
            "
          >
            {filters.map((filter) => {
              const active =
                activeFilter === filter.name;

              return (
                <button
                  key={filter.name}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter.name)
                  }
                  className={`
                    relative
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    px-3.5
                    py-2.5
                    text-[12px]
                    font-bold
                    transition-colors

                    sm:px-4
                    sm:text-[13px]

                    ${
                      active
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-900"
                    }
                  `}
                >
                  {active && (
                    <motion.span
                      layoutId="activeProjectFilter"
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-500
                        shadow-lg
                        shadow-blue-500/20
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10 text-[14px]">
                    {filter.flag}
                  </span>

                  <span className="relative z-10">
                    {filter.name}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ===================================================
            PORTFOLIO META
        =================================================== */}

        <div className="mb-5 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-bold text-slate-900">
              Selected work
            </span>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
              {filteredProjects.length}
            </span>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-slate-400

              sm:flex
            "
          >
            <Globe2 size={14} />

            Global Portfolio
          </div>
        </div>

        {/* ===================================================
            GRID
        =================================================== */}

        <motion.div
          layout
          className="
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2

            lg:grid-cols-3

            xl:gap-7
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================
            BOTTOM
        =================================================== */}

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
          className="mt-12 flex justify-center"
        >
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white/70
              px-5
              py-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
              shadow-sm
              backdrop-blur
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

            Showing {filteredProjects.length} projects
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const website = normalizeWebsite(
    project.website
  );

  const previewImage = getWebsitePreview(
    project.website
  );

  const favicon = getWebsiteFavicon(
    project.website
  );

  const [imageError, setImageError] =
    useState(false);

  const [faviconError, setFaviconError] =
    useState(false);

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 25,
        scale: 0.96,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(
          index * 0.04,
          0.3
        ),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_8px_35px_rgba(15,23,42,0.06)]
        transition-shadow
        duration-500
        hover:shadow-[0_25px_65px_rgba(37,99,235,0.14)]
      "
    >
      {/* =================================================
          CARD GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-1
          -z-10
          rounded-[30px]
          bg-gradient-to-br
          from-blue-500/0
          via-cyan-400/0
          to-indigo-500/0
          opacity-0
          blur-xl
          transition-all
          duration-500
          group-hover:from-blue-500/20
          group-hover:via-cyan-400/10
          group-hover:to-indigo-500/20
          group-hover:opacity-100
        "
      />

      {/* =================================================
          WEBSITE PREVIEW
      ================================================= */}

      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          bg-slate-100
        "
      >
        {!imageError && previewImage ? (
          <img
            src={previewImage}
            alt={`${project.title} website preview`}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.07]
            "
            onError={() =>
              setImageError(true)
            }
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500 px-6 text-center">
            <Globe2 className="mb-3 h-10 w-10 text-white/70" />

            <p className="text-[15px] font-bold text-white">
              {project.title}
            </p>

            <p className="mt-1 text-[11px] text-white/60">
              Website preview unavailable
            </p>
          </div>
        )}

        {/* Image overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-70" />

        {/* Top shine */}

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />

        {/* =================================================
            PROJECT NUMBER
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            h-8
            min-w-8
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-slate-950/30
            px-2
            text-[10px]
            font-bold
            text-white
            backdrop-blur-md
          "
        >
          {String(project.id).padStart(
            2,
            "0"
          )}
        </div>

        {/* =================================================
            STATUS
        ================================================= */}

        <div
          className={`
            absolute
            right-3
            top-3
            flex
            items-center
            gap-1.5
            rounded-full
            border
            px-3
            py-1.5
            text-[10px]
            font-bold
            shadow-lg
            backdrop-blur-md

            ${
              project.status === "Live"
                ? "border-emerald-200/70 bg-white/90 text-emerald-700"
                : "border-amber-200/70 bg-white/90 text-amber-700"
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full

              ${
                project.status === "Live"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }
            `}
          />

          {project.status}
        </div>

        {/* =================================================
            COUNTRY
        ================================================= */}

        <div
          className="
            absolute
            bottom-3
            left-3
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/30
            bg-slate-950/30
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-white
            backdrop-blur-md
          "
        >
          {flagMap[project.countryCode] ||
            "🌎"}

          {project.country}
        </div>

        {/* =================================================
            HOVER ACTION
        ================================================= */}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="
              absolute
              bottom-3
              right-3
              flex
              h-10
              w-10
              translate-y-4
              items-center
              justify-center
              rounded-full
              bg-white
              text-slate-900
              opacity-0
              shadow-xl
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              hover:bg-blue-600
              hover:text-white
            "
          >
            <ArrowUpRight size={18} />
          </a>
        )}
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-5 sm:p-6">
        {/* =================================================
            CATEGORY / COUNTRY
        ================================================= */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className="
              inline-flex
              max-w-[70%]
              truncate
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-blue-600

              sm:text-[11px]
            "
          >
            {project.category}
          </span>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-slate-400
            "
          >
            <MapPin size={12} />

            {project.country}
          </div>
        </div>

        {/* =================================================
            TITLE ROW
        ================================================= */}

        <div className="mb-4 flex items-center gap-3">
          {/* Website logo */}

          <div
            className="
              relative
              h-12
              w-12
              shrink-0
              overflow-hidden
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              shadow-sm
            "
          >
            {!faviconError && favicon ? (
              <img
                src={favicon}
                alt={`${project.title} logo`}
                className="h-full w-full object-cover"
                onError={() =>
                  setFaviconError(true)
                }
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
                <Globe2
                  size={20}
                  className="text-blue-600"
                />
              </div>
            )}
          </div>

          {/* Title */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                truncate
                text-[17px]
                font-extrabold
                leading-tight
                tracking-[-0.025em]
                text-slate-950

                sm:text-[18px]
              "
            >
              {project.title}
            </h3>

            <p
              className="
                mt-1
                truncate
                text-[11px]
                font-medium
                text-slate-400
              "
            >
              {getDomain(project.website)}
            </p>
          </div>

          {/* Arrow */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-50
              text-slate-400
              transition-all
              duration-300
              group-hover:bg-blue-50
              group-hover:text-blue-600
            "
          >
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            line-clamp-2
            min-h-[48px]
            text-[12px]
            leading-6
            text-slate-500

            sm:text-[13px]
          "
        >
          {project.description}
        </p>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="my-5 h-px bg-slate-100" />

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex items-center justify-between">
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/button
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-slate-950
                px-4
                py-2.5
                text-[11px]
                font-bold
                text-white
                transition-all
                duration-300

                sm:px-5
                sm:py-3

                hover:bg-blue-600
                hover:shadow-lg
                hover:shadow-blue-500/20
              "
            >
              View website

              <ArrowUpRight
                size={13}
                className="
                  transition-transform
                  duration-300
                  group-hover/button:translate-x-0.5
                  group-hover/button:-translate-y-0.5
                "
              />
            </a>
          ) : (
            <span
              className="
                rounded-full
                bg-slate-100
                px-4
                py-2.5
                text-[11px]
                font-bold
                text-slate-400
              "
            >
              Coming Soon
            </span>
          )}

          {/* Portfolio marker */}

          <div className="flex items-center gap-2">
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-300
              "
            >
              Digital
            </span>

            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

