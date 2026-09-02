"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Compass,
  CheckCircle2,
  X,
  ShieldCheck,
  type LucideIcon,
  Palette,
  BrainCircuit,
  Plane,
  Building2,
  Users,
  Truck,
  Utensils,
  Car,
  Megaphone,
  Sparkles,
} from "lucide-react";

import SchedulerModal from "./SchedulerModal";

/* =========================================================
   TYPES & DATA MODEL
========================================================= */

export type ProductLayer =
  | "ALL"
  | "DESIGN"
  | "INTELLIGENCE"
  | "BUSINESS"
  | "DELIVERY & MOBILITY"
  | "PHYSICAL WORLD";

export interface EcosystemProduct {
  phase: number;
  number: string;
  id: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  builtFor?: string;
  icon: LucideIcon;
  accentColor: string;
  accent: string;
  gradient: [string, string];
  layer: ProductLayer;
  image: string;
  stats?: { label: string; value: string };
  rating?: string;
  status?: string;
}

export type MiniatureProduct = EcosystemProduct;
export type Product = EcosystemProduct;
export type EditorialCaseStudy = EcosystemProduct;

/* =========================================================
   FULL 9 NEIRAH PRODUCT ECOSYSTEM DATASET (MERGED IOT & DRONE)
========================================================= */

export const NEIRAH_ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    phase: 1,
    number: "01",
    id: "lantriva",
    name: "Lantriva",
    category: "UI/UX & Digital Experience",
    description:
      "Designing memorable digital products, interfaces and experiences that elevate user engagement and brand authority.",
    capabilities: [
      "UI/UX",
      "Product Design",
      "Web",
      "SaaS",
      "Design Systems",
    ],
    builtFor: "Global Enterprises & Modern Digital Products",
    icon: Palette,
    accentColor: "#F59E0B",
    accent: "#F59E0B",
    gradient: ["#D97706", "#F59E0B"],
    layer: "DESIGN",
    image: "/images/lantravia.png",
    stats: { label: "Design Resonance", value: "99.8%" },
    rating: "4.9 ★",
    status: "Live Production",
  },
  {
    phase: 2,
    number: "02",
    id: "neirah-lab",
    name: "Neirah Lab",
    category: "AI, R&D & Automation",
    description:
      "Researching and building intelligent systems that automate complex work across industries with neural agent precision.",
    capabilities: [
      "AI",
      "Agents",
      "Automation",
      "R&D",
      "Intelligent Systems",
    ],
    builtFor: "Autonomous Swarm Engineering & R&D Teams",
    icon: BrainCircuit,
    accentColor: "#8B5CF6",
    accent: "#8B5CF6",
    gradient: ["#7C3AED", "#A855F7"],
    layer: "INTELLIGENCE",
    image: "/images/neirah_lab.png",
    stats: { label: "Task Processing", value: "10M+/day" },
    rating: "5.0 ★",
    status: "Active R&D Swarm",
  },
  {
    phase: 3,
    number: "03",
    id: "neirah-iot-drone",
    name: "Neirah IoT & Drone",
    category: "IoT, Embedded, Drones & Smart Agriculture",
    description:
      "Connecting software with the physical world through intelligent devices, autonomous aerial drones, environmental telemetry, and smart sensor mesh systems.",
    capabilities: [
      "IoT",
      "Embedded",
      "Drones",
      "Autonomous Systems",
      "Agriculture",
      "Organic Farming",
      "Sensors",
      "Automation",
    ],
    builtFor: "GIS Operators, Smart Cities & Precision Agriculture Networks",
    icon: Plane,
    accentColor: "#06B6D4",
    accent: "#06B6D4",
    gradient: ["#0891B2", "#06B6D4"],
    layer: "PHYSICAL WORLD",
    image: "/images/drone and iot.png",
    stats: { label: "Flight Area Coverage", value: "500 ha/hr" },
    rating: "4.9 ★",
    status: "Flight Operational",
  },
  {
    phase: 4,
    number: "04",
    id: "mugilix",
    name: "Mugilix",
    category: "Business Operating System",
    description:
      "One connected platform for managing the core operations of modern businesses—ERP, CRM, tax payroll, and real-time workflows.",
    capabilities: [
      "CRM",
      "ERP",
      "HRM",
      "Payroll",
      "Operations",
      "Workflow Automation",
    ],
    builtFor: "Global Corporate Operations & Financial Directors",
    icon: Building2,
    accentColor: "#6366F1",
    accent: "#6366F1",
    gradient: ["#4F46E5", "#6366F1"],
    layer: "BUSINESS",
    image: "/images/mugilix.png",
    stats: { label: "Active Users", value: "2.4M+" },
    rating: "4.9 ★",
    status: "Global Scale",
  },
  {
    phase: 5,
    number: "05",
    id: "hrvio",
    name: "HRVio",
    category: "Human Intelligence",
    description:
      "Transforming workforce data into intelligent insights for better people decisions, performance telemetry, and business growth.",
    capabilities: [
      "HR Intelligence",
      "Analytics",
      "Performance",
      "Workforce Planning",
      "Automation",
    ],
    builtFor: "Chief People Officers & Workforce Leaders",
    icon: Users,
    accentColor: "#EC4899",
    accent: "#EC4899",
    gradient: ["#DB2777", "#EC4899"],
    layer: "INTELLIGENCE",
    image: "/images/hr.png",
    stats: { label: "Workforce Insights", value: "99.4%" },
    rating: "4.8 ★",
    status: "Live Platform",
  },
  {
    phase: 6,
    number: "06",
    id: "pothify",
    name: "Pothify",
    category: "Delivery Management SaaS",
    description:
      "The technology infrastructure behind modern delivery businesses. Pothify helps businesses manage their complete delivery operation from one intelligent platform.",
    capabilities: [
      "Order Management",
      "Delivery Management",
      "Driver Management",
      "Dispatch",
      "Tracking",
      "Business Analytics",
      "Automation",
    ],
    builtFor:
      "Restaurants, retailers, pharmacies, supermarkets, logistics companies and delivery businesses.",
    icon: Truck,
    accentColor: "#10B981",
    accent: "#10B981",
    gradient: ["#059669", "#10B981"],
    layer: "DELIVERY & MOBILITY",
    image: "/images/veera.png",
    stats: { label: "Dispatch Latency", value: "< 2.1 sec" },
    rating: "5.0 ★",
    status: "Enterprise Dispatch",
  },
  {
    phase: 7,
    number: "07",
    id: "tricobites",
    name: "Tricobites",
    category: "Food Delivery Ecosystem",
    description:
      "A consumer-focused food delivery platform connecting customers, restaurants and delivery partners through an ultra-fast digital experience.",
    capabilities: [
      "Food Ordering",
      "Restaurants",
      "Delivery",
      "Customers",
      "Partners",
    ],
    builtFor: "Consumer Food Marketplaces & Restaurant Networks",
    icon: Utensils,
    accentColor: "#F97316",
    accent: "#F97316",
    gradient: ["#EA580C", "#F97316"],
    layer: "DELIVERY & MOBILITY",
    image: "/images/trincobites.png",
    stats: { label: "Active Orders", value: "50k+/day" },
    rating: "4.9 ★",
    status: "Live Marketplace",
  },
  {
    phase: 8,
    number: "08",
    id: "rideya",
    name: "Rideya",
    category: "Mobility Ecosystem",
    description:
      "Connecting passengers, drivers and transportation businesses through intelligent mobility technology, fleet dispatch, and instant payments.",
    capabilities: [
      "Ride Booking",
      "Drivers",
      "Fleet",
      "Tracking",
      "Payments",
      "Analytics",
    ],
    builtFor: "Transit Operators & Urban Fleet Networks",
    icon: Car,
    accentColor: "#0284C7",
    accent: "#0284C7",
    gradient: ["#0369A1", "#0284C7"],
    layer: "DELIVERY & MOBILITY",
    image: "/images/ridiya.png",
    stats: { label: "Trip Telemetry", value: "99.9%" },
    rating: "4.9 ★",
    status: "Operational",
  },
  {
    phase: 9,
    number: "09",
    id: "brandos",
    name: "Neirah BrandOS",
    category: "Brand & Growth Infrastructure",
    description:
      "Helping businesses build their identity, communicate with customers and automate their digital presence through integrated messaging and growth engines.",
    capabilities: [
      "Branding",
      "Storytelling",
      "Social Media",
      "WhatsApp",
      "SMS",
      "Content",
      "Marketing Automation",
    ],
    builtFor: "Growth Marketers & Digital Brand Operations",
    icon: Megaphone,
    accentColor: "#84CC16",
    accent: "#84CC16",
    gradient: ["#65A30D", "#84CC16"],
    layer: "BUSINESS",
    image: "/images/brandos.png",
    stats: { label: "Reach Velocity", value: "+450%" },
    rating: "4.9 ★",
    status: "Active Infrastructure",
  },
];

// Compatibility exports
export const EDITORIAL_PROJECTS: EcosystemProduct[] = NEIRAH_ECOSYSTEM_PRODUCTS;
export const PRODUCTS: MiniatureProduct[] = NEIRAH_ECOSYSTEM_PRODUCTS;
export const products: Product[] = PRODUCTS;

/* =========================================================
   MAIN FEATURED PROJECTS COMPONENT — VERTICAL ANIMATED RUNWAY
========================================================= */

export default function FeaturedProjects() {
  const [selectedProduct, setSelectedProduct] = useState<EcosystemProduct | null>(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  return (
    <section
      id="featured-projects"
      className="relative overflow-hidden bg-[#FAF9F5] text-[#1C1917] py-24 sm:py-32"
    >
      {/* BACKGROUND FLOATING LIGHT ORBS */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-300/15 rounded-full blur-3xl" />

      {/* HEADER & BRAND INTRO */}
      <div className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2 font-mono text-xs font-bold text-stone-600 shadow-sm hover:shadow-md transition-shadow"
        >
          <Compass size={14} className="text-sky-500" />
          <span>ONE NEIRAH • NINE TECHNOLOGY ECOSYSTEMS</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-950 leading-[1.08] max-w-4xl mx-auto">
          Neirah Product Ecosystem <br />
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Technology for Every Layer of Business.
          </span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal pt-2">
          Neirah builds products that connect people, businesses, intelligence and the physical world.
        </p>
      </div>

      {/* 9 PRODUCTS VERTICAL EDITORIAL RUNWAY WITH ANIMATEPRESENCE LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 space-y-24">
        <AnimatePresence mode="popLayout">
          {NEIRAH_ECOSYSTEM_PRODUCTS.map((product, index) => (
            <VerticalEditorialProjectCard
              key={product.id}
              product={product}
              index={index}
              onInspect={() => setSelectedProduct(product)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* "THE BIGGER IDEA" ECOSYSTEM SYNERGY SECTION */}
      <EcosystemSynergySection />

      {/* PRODUCT INSPECTOR BLUEPRINT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductInspectorModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onBookDemo={() => {
              setSelectedProduct(null);
              setSchedulerOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
      />
    </section>
  );
}

/* =========================================================
   VERTICAL EDITORIAL PROJECT CARD WITH 3D TILT & HOVER MOTION
========================================================= */

function VerticalEditorialProjectCard({
  product,
  index,
  onInspect,
}: {
  product: EcosystemProduct;
  index: number;
  onInspect: () => void;
}) {
  const isEven = index % 2 === 0;

  // 3D Perspective Tilt Mechanics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(smoothY, [-150, 150], [6, -6]);
  const rotateY = useTransform(smoothX, [-200, 200], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 pt-12 border-t border-[#E5E5E0]"
    >
      {/* METADATA HEADER */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 uppercase tracking-widest pb-2">
        <span className="flex items-center gap-2 text-stone-900 font-extrabold">
          <span>{product.number} / 09</span>
          <span>•</span>
          <span className="text-sky-600">{product.layer} LAYER</span>
        </span>
        <span className="hidden sm:inline">{product.category}</span>
      </div>

      {/* ASYMMETRIC 12-COLUMN GRID WITH 3D TILT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* HERO EDITORIAL IMAGE COLUMN WITH 3D PERSPECTIVE */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onInspect}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className={`lg:col-span-7 relative group overflow-hidden rounded-3xl bg-stone-900 p-2 shadow-2xl cursor-pointer ${
            isEven ? "lg:order-1 order-1" : "lg:order-2 order-1"
          }`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-950">
            {/* Glowing Platform Ring */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-500/20 rounded-full blur-2xl animate-pulse" />

            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-stone-950/20 transition-opacity group-hover:opacity-0" />

            {/* TELEMETRY BADGE */}
            {product.status && (
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md text-stone-200 text-[10px] font-mono font-bold px-3.5 py-1.5 rounded-full border border-stone-800 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{product.status}</span>
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-stone-950/90 text-white text-xs font-mono font-bold px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-xl group-hover:scale-105 transition-transform">
              <span>INSPECT SPEC</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>

        {/* PROJECT INFORMATION COLUMN */}
        <div
          className={`lg:col-span-5 space-y-5 ${
            isEven ? "lg:order-2 order-2" : "lg:order-1 order-2"
          }`}
        >
          <div className="space-y-2">
            <span
              className="font-mono text-xs font-black uppercase px-3.5 py-1 rounded-full border inline-block"
              style={{
                color: product.accentColor,
                backgroundColor: `${product.accentColor}10`,
                borderColor: `${product.accentColor}30`,
              }}
            >
              {product.number}. {product.name}
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight leading-tight">
              {product.name}
            </h3>

            <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-snug font-normal pt-1">
              “{product.description}”
            </p>
          </div>

          {/* ANIMATED CAPABILITIES TAGS WITH HOVER POP */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-wider block">
              CAPABILITIES & STACK:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono font-semibold text-stone-700">
              {product.capabilities.map((cap, cIdx) => (
                <motion.span
                  key={cIdx}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full bg-white text-stone-800 border border-stone-200 shadow-sm hover:border-sky-400 hover:text-sky-600 transition-colors cursor-default"
                >
                  {cap}
                </motion.span>
              ))}
            </div>
          </div>

          {product.builtFor && (
            <p className="text-xs text-stone-500 font-mono">
              <strong className="text-stone-700">Built for:</strong> {product.builtFor}
            </p>
          )}

          {/* ACTION BUTTON */}
          <div className="pt-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onInspect}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-stone-900 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:bg-stone-950 hover:text-white cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>EXPLORE BLUEPRINT SPEC</span>
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   "THE BIGGER IDEA" ECOSYSTEM SYNERGY SECTION WITH ANIMATED FLOW STREAM
========================================================= */

function EcosystemSynergySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40, rotate: -2.5, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-32 origin-center"
    >
      <div
        className="relative overflow-hidden rounded-[40px] border-2 border-white/20 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-indigo-950/90 backdrop-blur-2xl p-8 sm:p-14 lg:p-16 space-y-12 shadow-[0_30px_90px_rgba(14,165,233,0.2)]"
      >
        {/* Background Sheen Glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[120px]" />

        {/* TITLE & DESCRIPTION WITH RIGHT NEIRO.PNG SHOWCASE */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 font-mono text-xs font-bold text-sky-300 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-sky-300" />
              <span>THE BIGGER IDEA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Neirah doesn&apos;t build isolated products. <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                We build technology that connects with technology.
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal pt-2">
              That&apos;s the real Neirah story. One ecosystem. Many industries. Infinite possibilities.
            </p>
          </div>

          {/* RIGHT SPACE: NEIRO.PNG SHOWCASE */}
          <div className="relative shrink-0 flex items-center justify-center lg:justify-end pt-4 lg:pt-0">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 group">
              <Image
                src="/images/Neiro.png"
                alt="Neirah Ecosystem Mascot - Neiro"
                fill
                sizes="(max-width: 640px) 192px, 256px"
                className="h-full w-full object-contain drop-shadow-[0_16px_35px_rgba(56,189,248,0.35)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* 5 LAYERS SUMMARY */}
        <div className="pt-4 border-t border-stone-800 space-y-4">
          <span className="font-mono text-xs font-bold uppercase text-stone-400 tracking-widest block">
            ONE NEIRAH • NINE TECHNOLOGY ECOSYSTEMS:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-1 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400 font-extrabold uppercase block text-[10px]">DESIGN</span>
              <p className="text-white font-bold">Lantriva</p>
            </div>

            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-1 hover:border-purple-500/50 transition-colors">
              <span className="text-purple-400 font-extrabold uppercase block text-[10px]">INTELLIGENCE</span>
              <p className="text-white font-bold">Neirah Lab • HRVio</p>
            </div>

            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-1 hover:border-indigo-500/50 transition-colors">
              <span className="text-indigo-400 font-extrabold uppercase block text-[10px]">BUSINESS</span>
              <p className="text-white font-bold">Mugilix • BrandOS</p>
            </div>

            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-1 hover:border-emerald-500/50 transition-colors">
              <span className="text-emerald-400 font-extrabold uppercase block text-[10px]">DELIVERY & MOBILITY</span>
              <p className="text-white font-bold">Pothify • Tricobites • Rideya</p>
            </div>

            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-1 hover:border-cyan-500/50 transition-colors">
              <span className="text-cyan-400 font-extrabold uppercase block text-[10px]">PHYSICAL WORLD</span>
              <p className="text-white font-bold">Neirah IoT & Drone</p>
            </div>
          </div>
        </div>

        {/* CONNECTED INDUSTRY EXAMPLES WITH ANIMATED FLOW PARTICLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* RESTAURANT ECOSYSTEM EXAMPLE */}
          <div className="bg-stone-900/90 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-4 hover:border-sky-500/40 transition-colors">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>A RESTAURANT COULD USE:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-amber-300 border border-amber-500/30">
                Lantriva → design
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-indigo-300 border border-indigo-500/30">
                Mugilix → business
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-emerald-300 border border-emerald-500/30">
                Pothify → delivery
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-purple-300 border border-purple-500/30">
                Neirah Lab → AI
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-lime-300 border border-lime-500/30">
                BrandOS → comms
              </span>
            </div>
          </div>

          {/* AGRICULTURE ECOSYSTEM EXAMPLE */}
          <div className="bg-stone-900/90 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-4 hover:border-emerald-500/40 transition-colors">
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>AN AGRICULTURE COMPANY COULD USE:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-cyan-300 border border-cyan-500/30">
                Neirah IoT & Drone → sensors & aerial
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-purple-300 border border-purple-500/30">
                Neirah Lab → AI analysis
              </span>
              <span className="text-stone-500">➔</span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-800 text-indigo-300 border border-indigo-500/30">
                Mugilix → operations
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   PRODUCT INSPECTOR BLUEPRINT MODAL
========================================================= */

function ProductInspectorModal({
  product,
  onClose,
  onBookDemo,
}: {
  product: EcosystemProduct;
  onClose: () => void;
  onBookDemo: () => void;
}) {
  const Icon = product.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[40px] border-2 border-white bg-white p-6 sm:p-8 shadow-2xl text-left space-y-6 text-stone-900"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-stone-700 transition-all hover:bg-stone-900 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center gap-4 border-b border-stone-100 pb-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})` }}
          >
            <Icon size={26} />
          </div>

          <div>
            <span className="font-mono text-xs font-black uppercase text-sky-600 bg-sky-50 px-3 py-0.5 rounded-full border border-sky-200">
              {product.category} • Venture #{product.number}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Image & Key Spec Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-200 shadow-md">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 300px"
              className="h-full w-full object-cover"
            />
            {product.status && (
              <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full">
                Status: {product.status}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            {product.builtFor && (
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Target Audience:</span>
                <p className="text-xs font-bold text-stone-800 mt-0.5">{product.builtFor}</p>
              </div>
            )}

            {product.stats && (
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Telemetry Metric:</span>
                <p className="font-mono text-lg font-black text-sky-600">{product.stats.label}: {product.stats.value}</p>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Full Neirah Shader Security Verified</span>
            </div>
          </div>
        </div>

        {/* Full Description & Capabilities */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 block">
              Core Technical Capabilities:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200"
                >
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBookDemo}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-xs font-extrabold text-white shadow-xl transition-all hover:bg-sky-500 hover:shadow-sky-500/25 active:scale-95 cursor-pointer"
          >
            <span>Book Live Product Demo</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3.5 rounded-full border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
          >
            Close Spec
          </button>
        </div>
      </motion.div>
    </div>
  );
}