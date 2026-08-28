"use client";

import { useState, useRef, useCallback } from "react";
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
  Truck,
  UtensilsCrossed,
  Car,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
} from "lucide-react";
import SchedulerModal from "./SchedulerModal";
import ProductEditorialOverlay from "./product/ProductEditorialOverlay";

// Client-only dynamic load for WebGL Three.js Canvas
const ZAxisGalleryCanvas = dynamic(
  () => import("./product/ZAxisGalleryCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
      </div>
    ),
  }
);

/* =========================================================
   10 PROPRIETARY VENTURES DATASET
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
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  accent: string;
  gradient: [string, string];
  layer: "DESIGN" | "INTELLIGENCE" | "BUSINESS" | "DELIVERY & MOBILITY" | "PHYSICAL WORLD";
};

export const products: Product[] = [
  // 01. LANTRIVA
  {
    phase: 1,
    number: "01",
    id: "lantriva",
    name: "Lantriva",
    category: "UI/UX & Digital Experience",
    description: "Designing memorable digital products, interfaces and scalable design systems.",
    capabilities: ["UI/UX", "Product Design", "SaaS Systems"],
    icon: Palette,
    accent: "#0EA5E9",
    gradient: ["#0284C7", "#0EA5E9"],
    layer: "DESIGN",
  },

  // 02. NEIRAH LAB
  {
    phase: 2,
    number: "02",
    id: "neirah-lab",
    name: "Neirah Lab",
    category: "AI, R&D & Automation",
    description: "Building autonomous systems and machine intelligence that automate complex operations.",
    capabilities: ["Autonomous AI", "Agentic Systems", "R&D"],
    icon: BrainCircuit,
    accent: "#6366F1",
    gradient: ["#4F46E5", "#6366F1"],
    layer: "INTELLIGENCE",
  },

  // 03. NEIRAH IOT
  {
    phase: 3,
    number: "03",
    id: "neirah-iot",
    name: "Neirah IoT",
    category: "IoT, Embedded & Smart Agriculture",
    description: "Bridging software with the physical world through telemetry devices and sensor matrices.",
    capabilities: ["Embedded Hardware", "Smart Agriculture", "Telemetry"],
    icon: Cpu,
    accent: "#06B6D4",
    gradient: ["#0891B2", "#06B6D4"],
    layer: "PHYSICAL WORLD",
  },

  // 04. NEIRAH DRONE
  {
    phase: 4,
    number: "04",
    id: "neirah-drone",
    name: "Neirah Drone",
    category: "Drone Engineering & Aerial Systems",
    description: "Engineering precision aerial robotics for agricultural inspection and geospatial monitoring.",
    capabilities: ["Autonomous Flight", "Aerial Systems", "Sensors"],
    icon: Plane,
    accent: "#2563EB",
    gradient: ["#1D4ED8", "#2563EB"],
    layer: "PHYSICAL WORLD",
  },

  // 05. MUGILIX
  {
    phase: 5,
    number: "05",
    id: "mugilix",
    name: "Mugilix",
    category: "Business Operating System",
    description: "A single unified platform powering enterprise resource planning, CRM, and workflow architecture.",
    capabilities: ["Enterprise ERP", "Unified CRM", "Operations"],
    icon: Building2,
    accent: "#7C3AED",
    gradient: ["#6D28D9", "#7C3AED"],
    layer: "BUSINESS",
  },

  // 06. HRVIO
  {
    phase: 6,
    number: "06",
    id: "hrvio",
    name: "HRVio",
    category: "Human Intelligence",
    description: "Transforming workforce data into predictive intelligence for organizational decision-making.",
    capabilities: ["Workforce Analytics", "HR Intelligence", "Planning"],
    icon: Users,
    accent: "#0D9488",
    gradient: ["#0F766E", "#0D9488"],
    layer: "INTELLIGENCE",
  },

  // 07. POTHIFY
  {
    phase: 7,
    number: "07",
    id: "pothify",
    name: "Pothify",
    category: "Civic Infrastructure AI",
    description: "Computer vision platform for automated municipal road inspection and asset management.",
    capabilities: ["Computer Vision", "GIS Mapping", "Civic AI"],
    icon: Car,
    accent: "#E11D48",
    gradient: ["#BE123C", "#E11D48"],
    layer: "PHYSICAL WORLD",
  },

  // 08. TRICOBITES
  {
    phase: 8,
    number: "08",
    id: "tricobites",
    name: "Tricobites",
    category: "Food Delivery Ecosystem",
    description: "An integrated consumer and merchant ecosystem connecting kitchens, diners and couriers.",
    capabilities: ["Food Ordering", "Merchant Network", "Logistics"],
    icon: UtensilsCrossed,
    accent: "#DB2777",
    gradient: ["#BE185D", "#DB2777"],
    layer: "DELIVERY & MOBILITY",
  },

  // 09. RIDEYA
  {
    phase: 9,
    number: "09",
    id: "rideya",
    name: "Rideya",
    category: "Mobility Ecosystem",
    description: "Next-generation mobility networks facilitating multi-modal transport and smart fleet routing.",
    capabilities: ["Smart Dispatch", "Fleet Telemetry", "Payments"],
    icon: Car,
    accent: "#D97706",
    gradient: ["#B45309", "#D97706"],
    layer: "DELIVERY & MOBILITY",
  },

  // 10. NEIRAH BRANDOS
  {
    phase: 10,
    number: "10",
    id: "brandos",
    name: "Neirah BrandOS",
    category: "Brand & Growth Infrastructure",
    description: "Automated omnichannel communication pipelines, brand governance and customer engagement.",
    capabilities: ["Omnichannel Growth", "Brand Governance", "Automation"],
    icon: Megaphone,
    accent: "#DC2626",
    gradient: ["#B91C1C", "#DC2626"],
    layer: "BUSINESS",
  },
];

/* =========================================================
   Z-AXIS 3D PRODUCT GALLERY - MAIN DISCOVERY SPACE
========================================================= */

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [currentProgressValue, setCurrentProgressValue] = useState<number>(0);
  const [schedulerOpen, setSchedulerOpen] = useState<boolean>(false);
  const [schedulerService, setSchedulerService] = useState<string>("");
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll depth tracking with generous storytelling breathing room
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxIndex = products.length - 1;
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, maxIndex]);

  // Spring physics for smooth physical inertia and responsive storytelling
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.65,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setCurrentProgressValue(latest);
    const rounded = Math.round(latest);
    const clamped = Math.max(0, Math.min(maxIndex, rounded));
    if (clamped !== activeProductIndex) {
      setActiveProductIndex(clamped);
    }
  });

  const activeProduct = products[activeProductIndex] || products[0];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -(((clientY - top) / height) * 2 - 1);
    setMousePos({ x, y });
  }, []);

  const scrollToProduct = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const totalScrollHeight =
        containerRef.current.scrollHeight - window.innerHeight;
      const targetScroll =
        containerRef.current.offsetTop +
        (index / maxIndex) * totalScrollHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [maxIndex]
  );

  const handleNext = useCallback(() => {
    const nextIdx = Math.min(maxIndex, activeProductIndex + 1);
    scrollToProduct(nextIdx);
  }, [activeProductIndex, maxIndex, scrollToProduct]);

  const handlePrev = useCallback(() => {
    const prevIdx = Math.max(0, activeProductIndex - 1);
    scrollToProduct(prevIdx);
  }, [activeProductIndex, scrollToProduct]);

  const openSchedulerForProduct = useCallback((product: Product) => {
    setSchedulerService(`Proprietary Venture: ${product.name}`);
    setSchedulerOpen(true);
  }, []);

  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const isNearEnd = currentProgressValue >= maxIndex - 0.25;

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative bg-[#F8FBFF] text-slate-900 select-none"
      style={{ height: `${products.length * 85}vh` }}
    >
      {/* Sticky Fullscreen 3D Discovery Viewport */}
      <div
        ref={stickyRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle Architectural Atmosphere & Gradient Aura */}
        <FeaturedBackgroundVisuals activeProduct={activeProduct} />

        {/* 3D WebGL Canvas Layer */}
        <ZAxisGalleryCanvas
          products={products}
          progress={currentProgressValue}
          mousePos={mousePos}
          onSelectProduct={scrollToProduct}
        />

        {/* Editorial Screen Typography Stage (Sequenced scroll-driven reveal) */}
        <ProductEditorialOverlay
          products={products}
          activeIndex={activeProductIndex}
          progress={currentProgressValue}
          onConsult={openSchedulerForProduct}
        />

        {/* ========================================================
            REFINED BOTTOM GALLERY DISCOVERY HUD
        ======================================================== */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pb-6 sm:pb-8 flex flex-col items-center gap-3">
          {/* Spatial Progress & Phase Number */}
          <div className="flex items-center justify-between w-full max-w-xl px-4 py-2 font-mono text-xs text-slate-500 bg-white/85 backdrop-blur-md rounded-full border border-slate-200/80 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-slate-900">
                {String(activeProductIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-300 font-bold">/</span>
              <span className="text-slate-400 font-semibold">10</span>
              <span className="font-sans font-bold text-slate-800 ml-2">
                • {activeProduct.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Step Controls */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeProductIndex === 0}
                aria-label="Previous Discovery"
                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition disabled:opacity-20 cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeProductIndex === maxIndex}
                aria-label="Next Discovery"
                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition disabled:opacity-20 cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Minimalist Linear Discovery Depth Track */}
          <div className="relative h-1 w-full max-w-xl rounded-full bg-slate-200/80 overflow-hidden">
            <motion.div
              className="h-full rounded-full transition-colors duration-500"
              style={{
                width: `${((currentProgressValue + 1) / products.length) * 100}%`,
                backgroundColor: activeProduct.accent,
              }}
            />
          </div>

          {/* 10 Gallery Index Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 flex-nowrap sm:flex-wrap max-w-full sm:max-w-4xl overflow-x-auto no-scrollbar py-1 px-2">
            {products.map((p, idx) => {
              const isSelected = activeProductIndex === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToProduct(idx)}
                  className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs scale-105"
                      : "bg-white/70 border border-slate-200/70 text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: isSelected ? p.accent : "#94A3B8" }}
                  />
                  <span>{p.number}</span>
                  <span className="font-normal text-[10px] text-slate-400 hidden md:inline">
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ending Bridge into Next Section */}
          {isNearEnd && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-2 text-center pointer-events-auto cursor-pointer flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-sky-600 hover:text-sky-700"
              onClick={() => {
                const nextSection = document.getElementById("project-cta");
                nextSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Explore The Next Chapter</span>
              <ChevronDown size={13} className="animate-bounce" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Unified Consultation Scheduler Modal */}
      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        defaultService={schedulerService}
      />
    </section>
  );
}

/* =========================================================
   SUBTLE ARCHITECTURAL BACKGROUND AMBIENCE
========================================================= */

function FeaturedBackgroundVisuals({
  activeProduct,
}: {
  activeProduct: Product;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* 1. Precision Grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* 2. GLOWING SVG LASER LINES */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="galleryLaser1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.05" />
            <stop offset="50%" stopColor={activeProduct.accent} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="galleryLaser2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.05" />
          </linearGradient>
          <filter id="neonLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M -100 240 C 320 120, 680 380, 1100 180 C 1300 90, 1500 210, 1600 250"
          fill="none"
          stroke="url(#galleryLaser1)"
          strokeWidth="2"
          filter="url(#neonLaserGlow)"
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <motion.path
          d="M -80 660 C 350 780, 780 480, 1160 720 C 1360 810, 1560 620, 1640 680"
          fill="none"
          stroke="url(#galleryLaser2)"
          strokeWidth="1.5"
          filter="url(#neonLaserGlow)"
          animate={{ pathOffset: [1, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* 3. Soft Ambient Floating 3D Blobs in Periphery */}
      <motion.div
        animate={{
          x: [-15, 20, -15],
          y: [-10, 15, -10],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-12 h-64 w-64 rounded-full opacity-30 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, ${activeProduct.accent}40 45%, transparent 75%)`,
        }}
      />

      <motion.div
        animate={{
          x: [20, -25, 20],
          y: [15, -15, 15],
          scale: [0.95, 1.1, 0.95],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-16 h-72 w-72 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, rgba(99,102,241,0.35) 45%, transparent 75%)",
        }}
      />

      {/* 4. Soft Chromatic Ambient Aura Core */}
      <div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full opacity-12 blur-[150px] transition-colors duration-1000 pointer-events-none"
        style={{
          backgroundColor: activeProduct.accent,
        }}
      />
    </div>
  );
}