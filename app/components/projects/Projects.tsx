"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Search,
  X,
} from "lucide-react";

import { getProjects, type Project } from "../../actions/projectActions";

/* =========================================================
   FALLBACK PROJECTS
========================================================= */

const fallbackProjects: Project[] = [
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
   FLAGS
========================================================= */

const flagMap: Record<string, string> = {
  LK: "🇱🇰",
  DE: "🇩🇪",
  GB: "🇬🇧",
  US: "🇺🇸",
  CH: "🇨🇭",
  NO: "🇳🇴",
  AU: "🇦🇺",
  CA: "🇨🇦",
  FR: "🇫🇷",
  IT: "🇮🇹",
  NL: "🇳🇱",
  AE: "🇦🇪",
  IN: "🇮🇳",
};

/* =========================================================
   DESIGN TOKENS
   Technology / premium blue-white palette
========================================================= */

const pageBackground = "#F7FBFD";
const sectionBackground = "#F5FAFF";

const white = "#FFFFFF";

const primaryText = "#020617";
const secondaryText = "#64748B";
const mutedText = "#94A3B8";

const border = "#E2E8F0";

const sky = "#0EA5E9";
const skyLight = "#BAE6FD";

const indigo = "#6366F1";
const violet = "#8B5CF6";

const success = "#10B981";
const development = "#F59E0B";

const gradient =
  "linear-gradient(135deg, #0EA5E9 0%, #6366F1 52%, #8B5CF6 100%)";

const gradientText =
  "linear-gradient(135deg, #0284C7 0%, #4F46E5 52%, #7C3AED 100%)";

const easePremium = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   PREMIUM FONT SYSTEM
========================================================= */

const fontSans =
  '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const fontDisplay =
  '"Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* =========================================================
   HELPERS
========================================================= */

function normalizeWebsite(url?: string) {
  if (!url) return "";

  const value = String(url).trim();

  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `https://${value}`;
}

function getDomain(url?: string) {
  try {
    return new URL(normalizeWebsite(url))
      .hostname
      .replace("www.", "");
  } catch {
    return "";
  }
}

function getWebsitePreview(url?: string) {
  const website = normalizeWebsite(url);

  if (!website) return "";

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    website
  )}?w=1800`;
}

/* =========================================================
   RESPONSIVE INTENSITY
========================================================= */

function useResponsiveIntensity() {
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;

      if (w < 640) {
        setFactor(0.32);
      } else if (w < 1024) {
        setFactor(0.6);
      } else {
        setFactor(1);
      }
    };

    compute();

    window.addEventListener("resize", compute);

    return () => window.removeEventListener("resize", compute);
  }, []);

  return factor;
}

/* =========================================================
   MAIN
========================================================= */

export default function Projects({ initialProjects }: { initialProjects?: Project[] }) {
  const [projectsList, setProjectsList] = useState<Project[]>(
    initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects
  );

  const [loading, setLoading] = useState(!initialProjects || initialProjects.length === 0);

  const [search, setSearch] = useState("");

  const [countryFilter, setCountryFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) return;
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);

        const data = await getProjects();

        if (mounted && Array.isArray(data)) {
          setProjectsList(data as Project[]);
        }
      } catch (error) {
        console.error(
          "Failed to load projects:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredProjects = useMemo(
    () => projectsList.slice(0, 6),
    [projectsList]
  );

  const countries = useMemo(
    () =>
      Array.from(
        new Set(
          projectsList
            .map((p) => p.country)
            .filter(Boolean)
        )
      ).sort(),
    [projectsList]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          projectsList
            .map((p) => p.category)
            .filter(Boolean)
        )
      ).sort(),
    [projectsList]
  );

  const archiveProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projectsList.filter((project) => {
      const matchesSearch =
        !query ||
        project.title
          ?.toLowerCase()
          .includes(query) ||
        project.category
          ?.toLowerCase()
          .includes(query) ||
        project.country
          ?.toLowerCase()
          .includes(query) ||
        project.description
          ?.toLowerCase()
          .includes(query);

      const matchesCountry =
        countryFilter === "All" ||
        project.country === countryFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        project.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesCategory
      );
    });
  }, [
    projectsList,
    search,
    countryFilter,
    categoryFilter,
  ]);

  const scrollToArchive = () => {
    document
      .getElementById("project-archive")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundColor: pageBackground,
        color: primaryText,
        fontFamily: fontSans,
      }}
    >
      <ProjectsHero
        count={projectsList.length}
        loading={loading}
        onExplore={scrollToArchive}
      />

      <ScrollGallery projects={featuredProjects} />

      <CuriosityCTA
        count={projectsList.length}
        onExplore={scrollToArchive}
      />

      <ProjectArchive
        projects={archiveProjects}
        total={projectsList.length}
        search={search}
        setSearch={setSearch}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        countries={countries}
        categories={categories}
      />
    </main>
  );
}

/* =========================================================
   HERO
========================================================= */



        /* =========================================================
   HERO
   Reference-inspired:
   - Extra bold display typography
   - Individual line reveal
   - Smooth upward entrance
   - Stronger visual hierarchy
========================================================= */

function ProjectsHero({
  count,
  loading,
  onExplore,
}: {
  count: number;
  loading: boolean;
  onExplore: () => void;
}) {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, 0.15]
  );

  const heroY = useTransform(
    scrollY,
    [0, 500],
    [0, -35]
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        pt-28
        sm:pt-32
        md:pt-36
        lg:pt-40
      "
      style={{
        backgroundColor: pageBackground,
      }}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-0
          h-[420px]
          w-[420px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.10), transparent 68%)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[360px]
          w-[360px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07), transparent 68%)",
        }}
      />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
        }}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[72vh]
          max-w-[1400px]
          flex-col
          justify-center
          px-6
          pb-20
          sm:px-10
          sm:pb-24
          lg:px-16
        "
      >
        {/* =====================================================
            EYEBROW
        ===================================================== */}

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
            duration: 0.9,
            delay: 0.15,
            ease: easePremium,
          }}
          className="
            mb-8
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-8
              sm:w-10
            "
            style={{
              background: gradient,
            }}
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
            "
            style={{
              color: sky,
              fontFamily: fontSans,
            }}
          >
            Neirah — Selected Work
          </span>
        </motion.div>

        {/* =====================================================
            MAIN TITLE

            IMPORTANT:
            Each line owns its own clipping container.
            This prevents the text from being permanently hidden.
        ===================================================== */}

        <h1
          className="
            font-extrabold
            tracking-[-0.065em]
            leading-[0.88]
            
            
          "
          style={{
            fontFamily: fontDisplay,
            color: primaryText,
            fontSize:
              "clamp(3.4rem, 9.2vw, 8.5rem)",
          }}
        >
          {/* -------------------------------------------------
              LINE 1
          ------------------------------------------------- */}

          <span
            className="
              block
              overflow-hidden
            "
            style={{
              paddingBottom: "0.03em",
            }}
          >
            <motion.span
              initial={{
                y: "110%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              transition={{
                duration: 1.05,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                block
                will-change-transform
              "
            >
              Work that holds
            </motion.span>
          </span>

          {/* -------------------------------------------------
              LINE 2
          ------------------------------------------------- */}

          <span
            className="
              block
              overflow-hidden
            "
            style={{
              paddingBottom: "0.12em",
            }}
          >
            <motion.span
              initial={{
                y: "110%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              transition={{
                duration: 1.05,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                block
                will-change-transform
              "
              style={{
                backgroundImage: gradientText,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              your attention.
            </motion.span>
          </span>
        </h1>

        {/* =====================================================
            DESCRIPTION / COUNT / CTA
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.95,
            ease: easePremium,
          }}
          className="
            mt-12
            flex
            flex-col
            gap-8
            sm:mt-14
            sm:gap-10
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* -------------------------------------------------
              DESCRIPTION
          ------------------------------------------------- */}

          <p
            className="
              max-w-md
              text-base
              leading-8
            "
            style={{
              color: secondaryText,
            }}
          >
            Not a grid of screenshots — a small
            collection, presented one piece at a
            time.
          </p>

          {/* -------------------------------------------------
              COUNT + BUTTON
          ------------------------------------------------- */}

          <div
            className="
              flex
              items-center
              gap-5
              sm:gap-6
            "
          >
            {/* PROJECT COUNT */}

            <div className="shrink-0">
              <span
                className="
                  block
                  text-3xl
                  font-extrabold
                  tracking-[-0.04em]
                "
                style={{
                  color: primaryText,
                  fontFamily: fontDisplay,
                }}
              >
                {loading ? "—" : count}
              </span>

              <span
                className="
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color: mutedText,
                }}
              >
                projects
              </span>
            </div>

            {/* ARCHIVE BUTTON */}

            <button
              onClick={onExplore}
              className="
                group
                flex
                items-center
                gap-3
                rounded-full
                border
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                transition-all
                duration-500
                hover:-translate-y-1
                sm:px-5
                sm:py-3
              "
              style={{
                borderColor: border,
                color: primaryText,
                boxShadow:
                  "0 10px 30px -20px rgba(15,23,42,0.3)",
              }}
            >
              <span>
                Explore the archive
              </span>

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  transition-transform
                  duration-500
                  group-hover:translate-y-1
                "
                style={{
                  background: gradient,
                }}
              >
                <ArrowDown size={13} />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


/* =========================================================
   SCROLL GALLERY
========================================================= */

function ScrollGallery({
  projects,
}: {
  projects: Project[];
}) {
  const containerRef =
    useRef<HTMLElement | null>(null);

  const total = projects.length;

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });

  const [activeIndex, setActiveIndex] =
    useState(0);

  useMotionValueEvent(
    progress,
    "change",
    (v) => {
      const idx = Math.min(
        total - 1,
        Math.max(
          0,
          Math.round(v * total - 0.5)
        )
      );

      if (idx !== activeIndex) {
        setActiveIndex(idx);
      }
    }
  );

  const headerOpacity = useTransform(
    progress,
    [0, 0.4 / total],
    [1, 0]
  );

  const headerY = useTransform(
    progress,
    [0, 0.4 / total],
    [0, -30]
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (reducedMotion) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const nx =
      (e.clientX - rect.left) /
        rect.width -
      0.5;

    const ny =
      (e.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(nx);
    mouseY.set(ny);
  };

  if (!total) return null;

  if (reducedMotion) {
    return (
      <section
        className="relative py-28"
        style={{
          backgroundColor: sectionBackground,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHeading />

          <div className="mt-16 flex flex-col gap-24">
            {projects.map((project, i) => (
              <StaticProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${(total + 1) * 100}vh`,
        backgroundColor: sectionBackground,
      }}
    >
      <div
        className="sticky top-0 flex h-screen w-full flex-col overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{
            opacity: headerOpacity,
            y: headerY,
          }}
          className="pointer-events-none absolute left-0 right-0 top-0 z-20 mx-auto max-w-[1400px] px-6 pt-16 sm:px-10 lg:px-16 lg:pt-24"
        >
          <SectionHeading />
        </motion.div>

        <div
          className="relative z-10 flex h-full w-full items-center justify-center"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          {projects.map((project, index) =>
            Math.abs(index - activeIndex) <= 1 ? (
              <GalleryCard
                key={project.id}
                project={project}
                index={index}
                total={total}
                progress={progress}
                isActive={index === activeIndex}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading() {
  return (
    <div className="flex items-end justify-between gap-8">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span
            className="h-px w-10"
            style={{
              background: gradient,
            }}
          />

          <span
            className="text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{
              color: sky,
            }}
          >
            Selected work
          </span>
        </div>

        <h2
          className="text-4xl font-extrabold leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          style={{
            color: primaryText,
            fontFamily: fontDisplay,
          }}
        >
          A few things
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
            worth seeing.
          </span>
        </h2>
      </div>

      <p
        className="hidden max-w-[16rem] pb-1 text-right text-[10px] font-bold uppercase leading-6 tracking-[0.18em] lg:block"
        style={{
          color: mutedText,
        }}
      >
        Scroll to move
        <br />
        through the collection.
      </p>
    </div>
  );
}

/* =========================================================
   GALLERY CARD
========================================================= */

function GalleryCard({
  project,
  index,
  total,
  progress,
  isActive,
  mouseX,
  mouseY,
}: {
  project: Project;
  index: number;
  total: number;
  progress: any;
  isActive: boolean;
  mouseX: any;
  mouseY: any;
}) {
  const intensity = useResponsiveIntensity();

  const seg = 1 / total;

  const p_start = index * seg;
  const p_center = p_start + seg * 0.5;
  const p_away = p_start + seg;

  const t0 = p_start - seg * 0.35;
  const t1 = p_start;
  const t2 = p_start + seg * 0.28;
  const t3 = p_start + seg * 0.42;
  const t4 = p_center - seg * 0.04;
  const t5 = p_center;
  const t6 = p_away;

  const stageInputs = [
    t0,
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
  ];

  const scale = useTransform(
    progress,
    stageInputs,
    [
      0.35,
      0.45,
      0.6,
      0.78,
      1.03,
      1,
      0.75,
    ]
  );

  const opacity = useTransform(
    progress,
    stageInputs,
    [
      0,
      0.55,
      0.75,
      0.95,
      1,
      1,
      0.25,
    ]
  );

  const rotateYBase = [
    -45,
    -35,
    -25,
    -12,
    1,
    0,
    15,
  ].map((v) => v * intensity);

  const rotateXBase = [
    10,
    8,
    5,
    2,
    0,
    0,
    0,
  ].map((v) => v * intensity);

  const xVwBase = [
    45,
    35,
    22,
    8,
    0,
    0,
    0,
  ].map((v) => v * intensity);

  const zBase = [
    -340,
    -250,
    -150,
    -50,
    0,
    0,
    -150,
  ];

  const scrollRotateY = useTransform(
    progress,
    stageInputs,
    rotateYBase
  );

  const scrollRotateX = useTransform(
    progress,
    stageInputs,
    rotateXBase
  );

  const xVw = useTransform(
    progress,
    stageInputs,
    xVwBase
  );

  const z = useTransform(
    progress,
    stageInputs,
    zBase
  );

  const mouseRotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-3, 3]
  );

  const mouseRotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [2, -2]
  );

  const rotateY = useTransform(
    [scrollRotateY, mouseRotateY],
    (vals: number[]) =>
      isActive
        ? vals[0] + vals[1]
        : vals[0]
  );

  const rotateX = useTransform(
    [scrollRotateX, mouseRotateX],
    (vals: number[]) =>
      isActive
        ? vals[0] + vals[1]
        : vals[0]
  );

  const x = useMotionTemplate`${xVw}vw`;

  const pointerEvents = useTransform(
    progress,
    [t3, t5, t6],
    ["none", "auto", "none"]
  );

  const revealNumber = useTextReveal(
    progress,
    t0,
    t1,
    t2,
    t6
  );

  const revealTitle = useTextReveal(
    progress,
    t1,
    t2,
    t3,
    t6
  );

  const revealMeta = useTextReveal(
    progress,
    t2,
    t3,
    t4,
    t6
  );

  const revealBody = useTextReveal(
    progress,
    t3,
    t4,
    t5,
    t6
  );

  const website = normalizeWebsite(
    project.website
  );

  const preview = getWebsitePreview(
    project.website
  );

  const flag =
    flagMap[project.countryCode] || "🌎";

  const [imageError, setImageError] =
    useState(false);

  return (
    <motion.div
      className="absolute flex w-full max-w-[1080px] flex-col items-center justify-between px-6 lg:flex-row lg:px-0"
      style={{
        scale,
        rotateY,
        rotateX,
        x,
        z,
        opacity,
        transformStyle: "preserve-3d",
        pointerEvents: pointerEvents as any,
      }}
    >
      <div className="relative w-full shrink-0 lg:w-[56%]">
        <a
          href={website || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
        >
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[22px] border bg-white transition-all duration-500 group-hover:border-sky-200"
            style={{
              borderColor: border,
              boxShadow:
                "0 30px 80px -32px rgba(15,23,42,0.24)",
            }}
          >
            {!imageError && preview ? (
              <img
                src={preview}
                alt={`${project.title} website`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                onError={() =>
                  setImageError(true)
                }
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #F0F9FF, #EEF2FF)",
                }}
              >
                <Globe2
                  className="h-10 w-10"
                  style={{
                    color: sky,
                  }}
                />
              </div>
            )}

            <div
              className="absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-bold backdrop-blur-md"
              style={{
                borderColor:
                  "rgba(255,255,255,0.55)",
                backgroundColor:
                  "rgba(255,255,255,0.86)",
                color: primaryText,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    project.status === "Live"
                      ? success
                      : development,
                  boxShadow:
                    project.status === "Live"
                      ? "0 0 0 3px rgba(16,185,129,0.12)"
                      : "0 0 0 3px rgba(245,158,11,0.12)",
                }}
              />

              {project.status}
            </div>
          </div>
        </a>
      </div>

      <div className="mt-8 flex w-full flex-col justify-center pl-0 lg:mt-0 lg:w-[38%] lg:pl-12">
        <motion.div
          style={revealNumber}
          className="mb-5 flex items-center gap-4"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold tracking-[0.08em]"
            style={{
              borderColor: skyLight,
              color: sky,
              backgroundColor:
                "rgba(255,255,255,0.6)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className="h-px w-10"
            style={{
              backgroundColor: border,
            }}
          />
        </motion.div>

        <motion.h3
          style={{
            ...revealTitle,
            fontFamily: fontDisplay,
            color: primaryText,
          }}
          className="text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] lg:text-5xl"
        >
          {project.title}
        </motion.h3>

        <motion.div
          style={revealMeta}
          className="mb-6 mt-5"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{
              borderColor: skyLight,
              color: sky,
              backgroundColor:
                "rgba(239,246,255,0.7)",
            }}
          >
            {project.category}
          </span>
        </motion.div>

        <motion.p
          style={{
            ...revealBody,
            color: secondaryText,
          }}
          className="mb-6 max-w-sm text-sm leading-relaxed"
        >
          {project.description}
        </motion.p>

        <motion.div
          style={revealBody}
          className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]"
        >
          <span className="text-base">
            {flag}
          </span>

          <span
            style={{
              color: secondaryText,
            }}
          >
            {project.country}
          </span>
        </motion.div>

        <motion.div style={revealBody}>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-bold"
              style={{
                color: primaryText,
              }}
            >
              <span className="transition-colors group-hover:text-sky-500">
                View project
              </span>

              <ArrowUpRight
                size={14}
                className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                style={{
                  color: sky,
                }}
              />
            </a>
          ) : (
            <span
              className="text-xs font-semibold"
              style={{
                color: mutedText,
              }}
            >
              In development
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   TEXT REVEAL
========================================================= */

function useTextReveal(
  progress: any,
  hiddenAt: number,
  revealStart: number,
  revealEnd: number,
  exitAt: number
) {
  const opacity = useTransform(
    progress,
    [
      hiddenAt,
      revealStart,
      revealEnd,
      exitAt,
    ],
    [0, 0, 1, 0.15]
  );

  const y = useTransform(
    progress,
    [
      hiddenAt,
      revealStart,
      revealEnd,
      exitAt,
    ],
    [16, 16, 0, -6]
  );

  const blurAmount = useTransform(
    progress,
    [
      hiddenAt,
      revealStart,
      revealEnd,
      exitAt,
    ],
    [6, 6, 0, 3]
  );

  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  return {
    opacity,
    y,
    filter,
  };
}

/* =========================================================
   REDUCED MOTION
========================================================= */

function StaticProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const website = normalizeWebsite(
    project.website
  );

  const preview = getWebsitePreview(
    project.website
  );

  const flag =
    flagMap[project.countryCode] || "🌎";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
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
        duration: 0.6,
        ease: easePremium,
      }}
      className="flex flex-col gap-8 lg:flex-row lg:items-center"
    >
      <a
        href={website || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full lg:w-[56%]"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[22px] border bg-white"
          style={{
            borderColor: border,
            boxShadow:
              "0 25px 60px -30px rgba(15,23,42,0.2)",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt={project.title}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #F0F9FF, #EEF2FF)",
              }}
            >
              <Globe2
                className="h-10 w-10"
                style={{
                  color: sky,
                }}
              />
            </div>
          )}
        </div>
      </a>

      <div className="w-full lg:w-[38%]">
        <span
          className="text-[10px] font-bold tracking-[0.1em]"
          style={{
            color: sky,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.035em]"
          style={{
            fontFamily: fontDisplay,
            color: primaryText,
          }}
        >
          {project.title}
        </h3>

        <p
          className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{
            color: sky,
          }}
        >
          {project.category}
        </p>

        <p
          className="mt-4 text-sm leading-relaxed"
          style={{
            color: secondaryText,
          }}
        >
          {project.description}
        </p>

        <div
          className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
            color: secondaryText,
          }}
        >
          <span>{flag}</span>
          <span>{project.country}</span>
        </div>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold"
            style={{
              color: primaryText,
            }}
          >
            View project
            <ArrowUpRight
              size={14}
              style={{
                color: sky,
              }}
            />
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   CURIOSITY CTA
========================================================= */

function CuriosityCTA({
  count,
  onExplore,
}: {
  count: number;
  onExplore: () => void;
}) {
  return (
    <section
      className="relative overflow-hidden py-32 sm:py-40"
      style={{
        backgroundColor: pageBackground,
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.07), rgba(99,102,241,0.04), transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        <p
          className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{
            color: sky,
          }}
        >
          And that's only the beginning
        </p>

        <motion.h2
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
          }}
          transition={{
            duration: 0.8,
            ease: easePremium,
          }}
          className="text-4xl font-extrabold leading-[0.96] tracking-[-0.045em] sm:text-6xl"
          style={{
            fontFamily: fontDisplay,
            color: primaryText,
          }}
        >
          There are{" "}
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
            {count}
          </span>{" "}
          stories
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
            waiting below.
          </span>
        </motion.h2>

        <p
          className="mx-auto mt-7 max-w-lg text-sm leading-7"
          style={{
            color: secondaryText,
          }}
        >
          Search the full archive and find the
          one that makes you stop.
        </p>

        <button
          onClick={onExplore}
          className="group mx-auto mt-10 flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-bold text-white shadow-[0_18px_45px_-20px_rgba(14,165,233,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-20px_rgba(99,102,241,0.6)]"
          style={{
            background: gradient,
          }}
        >
          Explore all projects

          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   ARCHIVE
========================================================= */

function ProjectArchive({
  projects,
  total,
  search,
  setSearch,
  countryFilter,
  setCountryFilter,
  categoryFilter,
  setCategoryFilter,
  countries,
  categories,
}: {
  projects: Project[];
  total: number;
  search: string;
  setSearch: (value: string) => void;
  countryFilter: string;
  setCountryFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  countries: string[];
  categories: string[];
}) {
  return (
    <section
      id="project-archive"
      className="relative py-28 sm:py-36"
      style={{
        backgroundColor: sectionBackground,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
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
            margin: "-100px",
          }}
          transition={{
            duration: 0.7,
            ease: easePremium,
          }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-3">
            <span
              className="h-px w-10"
              style={{
                background: gradient,
              }}
            />

            <span
              className="text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{
                color: sky,
              }}
            >
              The complete archive
            </span>

            <span
              className="rounded-full border bg-white px-2.5 py-0.5 text-[9px] font-bold"
              style={{
                borderColor: border,
                color: secondaryText,
              }}
            >
              {total}
            </span>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="max-w-4xl text-4xl font-extrabold leading-[0.94] tracking-[-0.045em] sm:text-6xl"
              style={{
                fontFamily: fontDisplay,
                color: primaryText,
              }}
            >
              Every project
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
                leaves a trace.
              </span>
            </h2>

            <p
              className="max-w-sm text-sm leading-7"
              style={{
                color: secondaryText,
              }}
            >
              A map of problems, experiments and
              businesses we've turned into
              something real.
            </p>
          </div>
        </motion.div>

        {/* FILTER BAR */}

        <div className="mb-10 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{
                color: mutedText,
              }}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search projects…"
              className="h-14 w-full rounded-2xl border bg-white pl-11 pr-5 text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              style={{
                borderColor: border,
                color: primaryText,
              }}
            />
          </div>

          <ArchiveFilter
            value={countryFilter}
            onChange={setCountryFilter}
            options={countries}
            placeholder="All countries"
          />

          <ArchiveFilter
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categories}
            placeholder="All industries"
          />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="text-xl font-semibold"
              style={{
                fontFamily: fontDisplay,
                color: primaryText,
              }}
            >
              {projects.length}
            </span>

            <span
              className="text-xs"
              style={{
                color: secondaryText,
              }}
            >
              projects found
            </span>
          </div>

          {(search ||
            countryFilter !== "All" ||
            categoryFilter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setCountryFilter("All");
                setCategoryFilter("All");
              }}
              className="flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-[10px] font-bold transition-colors hover:border-sky-300 hover:text-sky-500"
              style={{
                borderColor: border,
                color: secondaryText,
              }}
            >
              <X size={12} />
              Reset
            </button>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ArchiveProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <ArchiveEmpty />
        )}
      </div>
    </section>
  );
}

/* =========================================================
   ARCHIVE FILTER
========================================================= */

function ArchiveFilter({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative min-w-[180px]">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-14 w-full appearance-none rounded-2xl border bg-white px-5 pr-10 text-sm font-medium outline-none transition-all duration-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
        style={{
          borderColor: border,
          color: primaryText,
        }}
      >
        <option value="All">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        style={{
          color: secondaryText,
        }}
      />
    </div>
  );
}

/* =========================================================
   ARCHIVE PROJECT CARD
========================================================= */

function ArchiveProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const website = normalizeWebsite(
    project.website
  );

  const preview = getWebsitePreview(
    project.website
  );

  const flag =
    flagMap[project.countryCode] || "🌎";

  const [imageError, setImageError] =
    useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        delay: Math.min(
          index * 0.04,
          0.28
        ),
        duration: 0.6,
        ease: easePremium,
      }}
      className="group"
    >
      <div
        className="overflow-hidden rounded-[22px] border bg-white transition-all duration-500 group-hover:-translate-y-1 group-hover:border-sky-200 group-hover:shadow-[0_28px_65px_-28px_rgba(15,23,42,0.3)]"
        style={{
          borderColor: border,
        }}
      >
        <a
          href={website || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
        >
          <div className="relative aspect-[1.35/1] overflow-hidden">
            {!imageError && preview ? (
              <img
                src={preview}
                alt={`${project.title} website`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                onError={() =>
                  setImageError(true)
                }
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #F0F9FF, #EEF2FF)",
                }}
              >
                <Globe2
                  size={38}
                  style={{
                    color: sky,
                  }}
                />
              </div>
            )}

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,6,23,0.52), rgba(2,6,23,0.03) 65%, transparent)",
              }}
            />

            <div
              className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border px-2.5 text-[9px] font-bold backdrop-blur-md"
              style={{
                borderColor:
                  "rgba(255,255,255,0.5)",
                backgroundColor:
                  "rgba(255,255,255,0.88)",
                color: primaryText,
              }}
            >
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-1.5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/85">
                <span>{flag}</span>
                {project.country}
              </div>

              <h3
                className="text-xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-2xl"
                style={{
                  fontFamily: fontDisplay,
                }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        </a>

        <div className="p-5">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <span
              className="truncate text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{
                color: sky,
              }}
            >
              {project.category}
            </span>

            <span
              className="shrink-0 text-[9px]"
              style={{
                color: mutedText,
              }}
            >
              {getDomain(project.website)}
            </span>
          </div>

          <p
            className="line-clamp-2 text-sm leading-6"
            style={{
              color: secondaryText,
            }}
          >
            {project.description}
          </p>

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border-t pt-4 text-[10px] font-bold transition-colors hover:text-sky-500"
              style={{
                borderColor: border,
                color: primaryText,
              }}
            >
              View project

              <ArrowUpRight
                size={12}
                style={{
                  color: sky,
                }}
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function ArchiveEmpty() {
  return (
    <div
      className="rounded-[22px] border bg-white px-6 py-24 text-center"
      style={{
        borderColor: border,
      }}
    >
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border"
        style={{
          borderColor: skyLight,
          color: sky,
          backgroundColor: "#F0F9FF",
        }}
      >
        <Search size={20} />
      </div>

      <h3
        className="mt-6 text-2xl font-extrabold tracking-[-0.03em]"
        style={{
          fontFamily: fontDisplay,
          color: primaryText,
        }}
      >
        Nothing here yet.
      </h3>

      <p
        className="mx-auto mt-2.5 max-w-md text-sm leading-7"
        style={{
          color: secondaryText,
        }}
      >
        Try another search or remove one of
        the filters.
      </p>
    </div>
  );
}