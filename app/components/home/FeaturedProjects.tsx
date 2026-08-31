"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Palette,
  BrainCircuit,
  Cpu,
  Plane,
  Building2,
  Users,
  UtensilsCrossed,
  Car,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import SchedulerModal from "./SchedulerModal";
import ProductEditorialOverlay from "./product/ProductEditorialOverlay";

/* =========================================================
   CLIENT-ONLY THREE.JS CANVAS
========================================================= */

const ZAxisGalleryCanvas = dynamic(
  () => import("./product/ZAxisGalleryCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
      </div>
    ),
  }
);

/* =========================================================
   PRODUCT TYPE
========================================================= */

export type Product = {
  phase: number;
  number: string;
  id: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  builtFor?: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  accent: string;
  gradient: [string, string];
  layer:
    | "DESIGN"
    | "INTELLIGENCE"
    | "BUSINESS"
    | "DELIVERY & MOBILITY"
    | "PHYSICAL WORLD";
};

/* =========================================================
   10 PROPRIETARY VENTURES
========================================================= */

export const products: Product[] = [
  {
    phase: 1,
    number: "01",
    id: "lantriva",
    name: "Lantriva",
    category: "UI/UX & Digital Experience",
    description:
      "Designing memorable digital products, interfaces and scalable design systems.",
    capabilities: ["UI/UX", "Product Design", "SaaS Systems"],
    icon: Palette,
    accent: "#0EA5E9",
    gradient: ["#0284C7", "#0EA5E9"],
    layer: "DESIGN",
  },

  {
    phase: 2,
    number: "02",
    id: "neirah-lab",
    name: "Neirah Lab",
    category: "AI, R&D & Automation",
    description:
      "Building autonomous systems and machine intelligence that automate complex operations.",
    capabilities: ["Autonomous AI", "Agentic Systems", "R&D"],
    icon: BrainCircuit,
    accent: "#6366F1",
    gradient: ["#4F46E5", "#6366F1"],
    layer: "INTELLIGENCE",
  },

  {
    phase: 3,
    number: "03",
    id: "neirah-iot",
    name: "Neirah IoT",
    category: "IoT, Embedded & Smart Agriculture",
    description:
      "Bridging software with the physical world through telemetry devices and sensor matrices.",
    capabilities: ["Embedded Hardware", "Smart Agriculture", "Telemetry"],
    icon: Cpu,
    accent: "#06B6D4",
    gradient: ["#0891B2", "#06B6D4"],
    layer: "PHYSICAL WORLD",
  },

  {
    phase: 4,
    number: "04",
    id: "neirah-drone",
    name: "Neirah Drone",
    category: "Drone Engineering & Aerial Systems",
    description:
      "Engineering precision aerial robotics for agricultural inspection and geospatial monitoring.",
    capabilities: ["Autonomous Flight", "Aerial Systems", "Sensors"],
    icon: Plane,
    accent: "#2563EB",
    gradient: ["#1D4ED8", "#2563EB"],
    layer: "PHYSICAL WORLD",
  },

  {
    phase: 5,
    number: "05",
    id: "mugilix",
    name: "Mugilix",
    category: "Business Operating System",
    description:
      "A single unified platform powering enterprise resource planning, CRM, and workflow architecture.",
    capabilities: ["Enterprise ERP", "Unified CRM", "Operations"],
    icon: Building2,
    accent: "#7C3AED",
    gradient: ["#6D28D9", "#7C3AED"],
    layer: "BUSINESS",
  },

  {
    phase: 6,
    number: "06",
    id: "hrvio",
    name: "HRVio",
    category: "Human Intelligence",
    description:
      "Transforming workforce data into predictive intelligence for organizational decision-making.",
    capabilities: ["Workforce Analytics", "HR Intelligence", "Planning"],
    icon: Users,
    accent: "#0D9488",
    gradient: ["#0F766E", "#0D9488"],
    layer: "INTELLIGENCE",
  },

  {
    phase: 7,
    number: "07",
    id: "pothify",
    name: "Pothify",
    category: "Civic Infrastructure AI",
    description:
      "Computer vision platform for automated municipal road inspection and asset management.",
    capabilities: ["Computer Vision", "GIS Mapping", "Civic AI"],
    icon: Car,
    accent: "#E11D48",
    gradient: ["#BE123C", "#E11D48"],
    layer: "PHYSICAL WORLD",
  },

  {
    phase: 8,
    number: "08",
    id: "tricobites",
    name: "Tricobites",
    category: "Food Delivery Ecosystem",
    description:
      "An integrated consumer and merchant ecosystem connecting kitchens, diners and couriers.",
    capabilities: ["Food Ordering", "Merchant Network", "Logistics"],
    icon: UtensilsCrossed,
    accent: "#DB2777",
    gradient: ["#BE185D", "#DB2777"],
    layer: "DELIVERY & MOBILITY",
  },

  {
    phase: 9,
    number: "09",
    id: "rideya",
    name: "Rideya",
    category: "Mobility Ecosystem",
    description:
      "Next-generation mobility networks facilitating multi-modal transport and smart fleet routing.",
    capabilities: ["Smart Dispatch", "Fleet Telemetry", "Payments"],
    icon: Car,
    accent: "#D97706",
    gradient: ["#B45309", "#D97706"],
    layer: "DELIVERY & MOBILITY",
  },

  {
    phase: 10,
    number: "10",
    id: "brandos",
    name: "Neirah BrandOS",
    category: "Brand & Growth Infrastructure",
    description:
      "Automated omnichannel communication pipelines, brand governance and customer engagement.",
    capabilities: ["Omnichannel Growth", "Brand Governance", "Automation"],
    icon: Megaphone,
    accent: "#DC2626",
    gradient: ["#B91C1C", "#DC2626"],
    layer: "BUSINESS",
  },
  {
    phase: 11,
    number: "11",
    id: "neirah-cloud",
    name: "Neirah Cloud",
    category: "Global Enterprise Cloud",
    description:
      "Unified multi-region cloud platform, serverless compute grid & autonomous deployment network.",
    capabilities: ["Serverless Grid", "Edge Telemetry", "Autonomous Ops"],
    icon: Cpu,
    accent: "#059669",
    gradient: ["#047857", "#10B981"],
    layer: "PHYSICAL WORLD",
  },
];

/* =========================================================
   MAIN FEATURED PROJECTS
========================================================= */

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [currentProgressValue, setCurrentProgressValue] = useState(0);

  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [schedulerService, setSchedulerService] = useState("");

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  /* =======================================================
     RESPONSIVE DEVICE STATE
  ======================================================= */

  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const isMobile = viewport.width > 0 && viewport.width < 640;

  const isTablet =
    viewport.width >= 640 && viewport.width < 1024;

  const isDesktop = viewport.width >= 1024;

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  /* =======================================================
     PRODUCT / SCROLL CONFIG
  ======================================================= */

  const maxIndex = products.length - 1;

  /*
   * Desktop:
   * 850vh total storytelling space.
   *
   * Tablet:
   * 900vh gives slightly more breathing room.
   *
   * Mobile:
   * 1000vh gives each product enough vertical space
   * without making transitions feel too compressed.
   */

  const sectionHeight = useMemo(() => {
    if (isMobile) {
      return products.length * 100;
    }

    if (isTablet) {
      return products.length * 92;
    }

    return products.length * 85;
  }, [isMobile, isTablet]);

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, maxIndex]
  );

  const smoothProgress = useSpring(rawProgress, {
    stiffness: isMobile ? 140 : 120,
    damping: isMobile ? 26 : 24,
    mass: 0.5,
    restDelta: 0.001,
  });

  const lastProgressRef = useRef(0);
  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      const rounded = Math.round(latest);
      const clamped = Math.max(0, Math.min(maxIndex, rounded));

      // Update active product index only when integer step changes
      setActiveProductIndex((previous) => (previous === clamped ? previous : clamped));

      // Throttle floating point state update so React re-renders only when progress shifts noticeably (> 0.04) or index changes
      if (Math.abs(latest - lastProgressRef.current) > 0.04 || clamped !== activeProductIndex) {
        lastProgressRef.current = latest;
        setCurrentProgressValue(latest);
      }
    }
  );

  const activeProduct =
    products[activeProductIndex] || products[0];

  /* =======================================================
     MOUSE PARALLAX
     
     Disabled on mobile/tablet.
  ======================================================= */

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || prefersReducedMotion) {
        return;
      }

      const {
        clientX,
        clientY,
        currentTarget,
      } = e;

      const {
        width,
        height,
        left,
        top,
      } = currentTarget.getBoundingClientRect();

      const x =
        ((clientX - left) / width) * 2 - 1;

      const y =
        -(((clientY - top) / height) * 2 - 1);

      setMousePos({
        x,
        y,
      });
    },
    [isDesktop, prefersReducedMotion]
  );

  /* =======================================================
     SCROLL TO PRODUCT
  ======================================================= */

  const scrollToProduct = useCallback(
    (index: number) => {
      if (!containerRef.current) {
        return;
      }

      const clampedIndex = Math.max(
        0,
        Math.min(maxIndex, index)
      );

      const sectionTop =
        containerRef.current.getBoundingClientRect()
          .top + window.scrollY;

      const sectionHeight =
        containerRef.current.offsetHeight;

      /*
       * Sticky viewport consumes one viewport height.
       * Calculate the actual scrollable area inside
       * the storytelling section.
       */

      const scrollableDistance =
        Math.max(
          0,
          sectionHeight - window.innerHeight
        );

      const targetScroll =
        sectionTop +
        (clampedIndex / maxIndex) *
          scrollableDistance;

      window.scrollTo({
        top: targetScroll,
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth",
      });
    },
    [maxIndex, prefersReducedMotion]
  );

  /* =======================================================
     NEXT / PREVIOUS
  ======================================================= */

  const handleNext = useCallback(() => {
    if (activeProductIndex >= maxIndex) {
      return;
    }

    scrollToProduct(activeProductIndex + 1);
  }, [
    activeProductIndex,
    maxIndex,
    scrollToProduct,
  ]);

  const handlePrev = useCallback(() => {
    if (activeProductIndex <= 0) {
      return;
    }

    scrollToProduct(activeProductIndex - 1);
  }, [
    activeProductIndex,
    scrollToProduct,
  ]);

  /* =======================================================
     SCHEDULER
  ======================================================= */

  const openSchedulerForProduct = useCallback(
    (product: Product) => {
      setSchedulerService(
        `Proprietary Venture: ${product.name}`
      );

      setSchedulerOpen(true);
    },
    []
  );

  /* =======================================================
     TOUCH HANDLING
     
     Important:
     We DO NOT call preventDefault().
     
     Natural browser scrolling remains active.
     Swipe detection is only used for explicit
     next/previous product jumps when the gesture
     is strong enough.
  ======================================================= */

  const touchStartY = useRef<number | null>(null);

  const touchStartTime = useRef<number>(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile && !isTablet) {
        return;
      }

      if (!e.touches[0]) {
        return;
      }

      touchStartY.current =
        e.touches[0].clientY;

      touchStartTime.current =
        Date.now();
    },
    [isMobile, isTablet]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile && !isTablet) {
        return;
      }

      if (
        touchStartY.current === null ||
        !e.changedTouches[0]
      ) {
        return;
      }

      const touchEndY =
        e.changedTouches[0].clientY;

      const diff =
        touchStartY.current - touchEndY;

      const elapsed =
        Date.now() - touchStartTime.current;

      touchStartY.current = null;

      /*
       * Only treat a gesture as an explicit
       * product navigation gesture if:
       *
       * - movement is large enough
       * - gesture is reasonably quick
       */

      if (
        Math.abs(diff) > 100 &&
        elapsed < 700
      ) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [
      isMobile,
      isTablet,
      handleNext,
      handlePrev,
    ]
  );

  /* =======================================================
     END DETECTION
  ======================================================= */

  const isNearEnd =
    currentProgressValue >=
    maxIndex - 0.25;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="
        relative
        w-full
        bg-[#F8FBFF]
        text-slate-900
        select-none
      "
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      {/* =====================================================
          STICKY FULLSCREEN VIEWPORT
      ===================================================== */}

      <div
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="
          sticky
          top-0
          h-dvh
          min-h-[560px]
          w-full
          overflow-hidden
          flex
          flex-col
          justify-between
        "
        style={{
          touchAction: "pan-y",
        }}
      >
        {/* ===================================================
            BACKGROUND
        =================================================== */}

        <FeaturedBackgroundVisuals
          activeProduct={activeProduct}
          isMobile={isMobile}
          isTablet={isTablet}
          prefersReducedMotion={
            prefersReducedMotion
          }
        />

        {/* ===================================================
            3D WEBGL
        =================================================== */}

        <ZAxisGalleryCanvas
          products={products}
          progress={currentProgressValue}
          mousePos={mousePos}
          onSelectProduct={scrollToProduct}
        />

        {/* ===================================================
            EDITORIAL CONTENT
        =================================================== */}

        <ProductEditorialOverlay
          products={products}
          activeIndex={activeProductIndex}
          progress={currentProgressValue}
          onConsult={
            openSchedulerForProduct
          }
        />

        {/* ===================================================
            BOTTOM DISCOVERY HUD
        =================================================== */}

        <div
          className="
            relative
            z-20
            w-full
            mx-auto
            px-3
            sm:px-4
            pb-[max(12px,env(safe-area-inset-bottom))]
            sm:pb-6
            flex
            flex-col
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* ===============================================
              PRODUCT STATUS
          =============================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              w-full
              max-w-xl
              px-3
              sm:px-4
              py-1.5
              sm:py-2
              font-mono
              text-[10px]
              sm:text-xs
              text-slate-500
              bg-white/90
              backdrop-blur-xl
              rounded-full
              border
              border-slate-200/80
              shadow-sm
            "
          >
            <div
              className="
                flex
                items-center
                min-w-0
                gap-1.5
                sm:gap-2
              "
            >
              <span
                className="
                  text-sm
                  sm:text-base
                  font-black
                  text-slate-900
                "
              >
                {String(
                  activeProductIndex + 1
                ).padStart(2, "0")}
              </span>

              <span className="text-slate-300 font-bold">
                /
              </span>

              <span className="text-slate-400 font-semibold">
                10
              </span>

              <span
                className="
                  font-sans
                  font-bold
                  text-slate-800
                  ml-1
                  sm:ml-2
                  truncate
                  max-w-[120px]
                  sm:max-w-none
                "
              >
                • {activeProduct.name}
              </span>
            </div>

            {/* =============================================
                STEP CONTROLS
            ============================================= */}

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={
                  activeProductIndex === 0
                }
                aria-label="Previous Discovery"
                className="
                  flex
                  h-7
                  w-7
                  sm:h-6
                  sm:w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-slate-600
                  hover:bg-slate-100
                  active:scale-90
                  transition
                  disabled:opacity-20
                  cursor-pointer
                  disabled:cursor-default
                "
              >
                <ChevronLeft size={14} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  activeProductIndex ===
                  maxIndex
                }
                aria-label="Next Discovery"
                className="
                  flex
                  h-7
                  w-7
                  sm:h-6
                  sm:w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-slate-600
                  hover:bg-slate-100
                  active:scale-90
                  transition
                  disabled:opacity-20
                  cursor-pointer
                  disabled:cursor-default
                "
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ===============================================
              PROGRESS TRACK
          =============================================== */}

          <div
            className="
              relative
              h-0.5
              sm:h-1
              w-full
              max-w-xl
              rounded-full
              bg-slate-200/80
              overflow-hidden
            "
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${
                  ((currentProgressValue + 1) /
                    products.length) *
                  100
                }%`,
                backgroundColor:
                  activeProduct.accent,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </div>

          {/* ===============================================
              PRODUCT INDEX
          =============================================== */}

          <div
            className="
              flex
              items-center
              justify-start
              sm:justify-center
              gap-1
              sm:gap-1.5
              w-full
              max-w-full
              sm:max-w-4xl
              overflow-x-auto
              no-scrollbar
              py-1
              px-1
              sm:px-2
              overscroll-x-contain
            "
          >
            {products.map((product, index) => {
              const isSelected =
                activeProductIndex === index;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    scrollToProduct(index)
                  }
                  aria-label={`Go to ${product.name}`}
                  aria-current={
                    isSelected
                      ? "step"
                      : undefined
                  }
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-1
                    px-2
                    sm:px-2.5
                    py-1.5
                    sm:py-1
                    rounded-full
                    text-[9px]
                    sm:text-[11px]
                    font-bold
                    transition-all
                    duration-300
                    cursor-pointer
                    whitespace-nowrap
                    active:scale-95

                    ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-sm scale-105"
                        : "bg-white/75 border border-slate-200/70 text-slate-500 hover:bg-white hover:text-slate-900"
                    }
                  `}
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      shrink-0
                    "
                    style={{
                      backgroundColor:
                        isSelected
                          ? product.accent
                          : "#94A3B8",
                    }}
                  />

                  <span>
                    {product.number}
                  </span>

                  <span
                    className="
                      font-normal
                      text-[9px]
                      sm:text-[10px]
                      text-slate-400
                      hidden
                      md:inline
                    "
                  >
                    {product.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ===============================================
              MOBILE SWIPE HINT
          =============================================== */}

          {activeProductIndex === 0 &&
            (isMobile || isTablet) && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                }}
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  font-semibold
                  text-slate-400
                  pointer-events-none
                "
              >
                Scroll to explore
              </motion.div>
            )}

          {/* ===============================================
              NEXT SECTION BRIDGE
          =============================================== */}

          {isNearEnd && (
            <motion.button
              type="button"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                pt-1
                sm:pt-2
                text-center
                pointer-events-auto
                cursor-pointer
                flex
                items-center
                gap-1.5
                text-[9px]
                sm:text-[10px]
                font-bold
                tracking-[0.18em]
                sm:tracking-[0.2em]
                uppercase
                text-sky-600
                hover:text-sky-700
              "
              onClick={() => {
                const nextSection =
                  document.getElementById(
                    "project-cta"
                  );

                nextSection?.scrollIntoView({
                  behavior:
                    prefersReducedMotion
                      ? "auto"
                      : "smooth",
                });
              }}
            >
              <span>
                Explore The Next Chapter
              </span>

              <ChevronDown
                size={13}
                className={
                  prefersReducedMotion
                    ? ""
                    : "animate-bounce"
                }
              />
            </motion.button>
          )}
        </div>
      </div>

      {/* =====================================================
          SCHEDULER
      ===================================================== */}

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() =>
          setSchedulerOpen(false)
        }
        defaultService={
          schedulerService
        }
      />
    </section>
  );
}

/* =========================================================
   BACKGROUND VISUALS
========================================================= */

function FeaturedBackgroundVisuals({
  activeProduct,
  isMobile,
  isTablet,
  prefersReducedMotion,
}: {
  activeProduct: Product;
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
}) {
  /*
   * Keep decorative effects lighter on mobile.
   * This is important for WebGL-heavy pages.
   */

  const ambientBlobSize = isMobile
    ? "h-40 w-40"
    : isTablet
      ? "h-52 w-52"
      : "h-64 w-64";

  const rightBlobSize = isMobile
    ? "h-48 w-48"
    : isTablet
      ? "h-60 w-60"
      : "h-72 w-72";

  const auraSize = isMobile
    ? "h-[85vw] w-[85vw]"
    : isTablet
      ? "h-[520px] w-[520px]"
      : "h-[650px] w-[650px]";

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        select-none
      "
    >
      {/* ===================================================
          PRECISION GRID
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.15]
          sm:opacity-[0.18]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: isMobile
            ? "48px 48px"
            : isTablet
              ? "60px 60px"
              : "72px 72px",
        }}
      />

      {/* ===================================================
          LASER LINES
      =================================================== */}

      {!isMobile && (
        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-30
            sm:opacity-40
          "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="galleryLaser1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#38BDF8"
                stopOpacity="0.05"
              />

              <stop
                offset="50%"
                stopColor={
                  activeProduct.accent
                }
                stopOpacity="0.7"
              />

              <stop
                offset="100%"
                stopColor="#818CF8"
                stopOpacity="0.05"
              />
            </linearGradient>

            <linearGradient
              id="galleryLaser2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#6366F1"
                stopOpacity="0.05"
              />

              <stop
                offset="50%"
                stopColor="#22D3EE"
                stopOpacity="0.65"
              />

              <stop
                offset="100%"
                stopColor="#38BDF8"
                stopOpacity="0.05"
              />
            </linearGradient>

            <filter
              id="neonLaserGlow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur
                stdDeviation="4"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {!prefersReducedMotion && (
            <>
              <motion.path
                d="
                  M -100 240
                  C 320 120,
                  680 380,
                  1100 180
                  C 1300 90,
                  1500 210,
                  1600 250
                "
                fill="none"
                stroke="url(#galleryLaser1)"
                strokeWidth="2"
                filter="url(#neonLaserGlow)"
                animate={{
                  pathOffset: [0, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.path
                d="
                  M -80 660
                  C 350 780,
                  780 480,
                  1160 720
                  C 1360 810,
                  1560 620,
                  1640 680
                "
                fill="none"
                stroke="url(#galleryLaser2)"
                strokeWidth="1.5"
                filter="url(#neonLaserGlow)"
                animate={{
                  pathOffset: [1, 0],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </>
          )}
        </svg>
      )}

      {/* ===================================================
          LEFT AMBIENT BLOB
      =================================================== */}

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [-15, 20, -15],
                y: [-10, 15, -10],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`
          absolute
          -top-8
          -left-8
          sm:-top-12
          sm:-left-12
          ${ambientBlobSize}
          rounded-full
          opacity-20
          sm:opacity-30
          blur-2xl
          pointer-events-none
        `}
        style={{
          background: `
            radial-gradient(
              circle at 35% 35%,
              rgba(255,255,255,0.8) 0%,
              ${activeProduct.accent}40 45%,
              transparent 75%
            )
          `,
        }}
      />

      {/* ===================================================
          RIGHT AMBIENT BLOB
      =================================================== */}

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [20, -25, 20],
                y: [15, -15, 15],
                scale: [0.95, 1.1, 0.95],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`
          absolute
          top-1/3
          -right-12
          sm:-right-16
          ${rightBlobSize}
          rounded-full
          opacity-15
          sm:opacity-25
          blur-3xl
          pointer-events-none
        `}
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, rgba(99,102,241,0.35) 45%, transparent 75%)",
        }}
      />

      {/* ===================================================
          CENTRAL AURA
      =================================================== */}

      <div
        className={`
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          ${auraSize}
          rounded-full
          opacity-[0.08]
          sm:opacity-[0.12]
          blur-[100px]
          sm:blur-[150px]
          transition-colors
          duration-1000
          pointer-events-none
        `}
        style={{
          backgroundColor:
            activeProduct.accent,
        }}
      />

      {/* ===================================================
          MOBILE VIGNETTE
      =================================================== */}

      {isMobile && (
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-white/10
            via-transparent
            to-white/20
          "
        />
      )}
    </div>
  );
}