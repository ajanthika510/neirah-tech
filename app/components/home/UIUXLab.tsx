"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Palette,
  Zap,
  MousePointer2,
  Sparkles,
  Eye,
  Check,
  Compass,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Cpu,
  CheckCircle2,
  Move,
  RotateCcw,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

import RevealText from "../ui/RevealText";
import AmbientOrb from "../ui/AmbientOrb";

/* =========================================================
   UX MODES FOR NON-TECHNICAL USERS
========================================================= */

type UXExperienceMode = "visual" | "motion" | "conversion" | "responsive";
type DevicePreviewMode = "desktop" | "tablet" | "mobile";

interface UXModeConfig {
  id: UXExperienceMode;
  label: string;
  badge: string;
  icon: LucideIcon;
  accent: string;
  gradient: string;
  description: string;
  metric: string;
}

const UX_MODES: Record<UXExperienceMode, UXModeConfig> = {
  visual: {
    id: "visual",
    label: "Visual Elegance",
    badge: "BRAND & DESIGN",
    icon: Palette,
    accent: "#0EA5E9",
    gradient: "from-sky-500 via-cyan-400 to-indigo-500",
    description: "Vibrant visual design with frosted glass panels, custom color palettes, and instant brand authority.",
    metric: "99% Brand Resonance",
  },
  motion: {
    id: "motion",
    label: "Speed & Motion",
    badge: "FAST & SMOOTH",
    icon: Zap,
    accent: "#6366F1",
    gradient: "from-indigo-500 via-violet-500 to-pink-500",
    description: "60fps hardware-accelerated spring animations that respond instantly on every tap.",
    metric: "60fps Smooth Speed",
  },
  conversion: {
    id: "conversion",
    label: "Customer Conversion",
    badge: "USER-FIRST FLOW",
    icon: TrendingUp,
    accent: "#06B6D4",
    gradient: "from-cyan-500 via-teal-400 to-emerald-500",
    description: "Psychology-backed user flows engineered to turn website visitors into loyal paying clients.",
    metric: "+145% Lead Growth",
  },
  responsive: {
    id: "responsive",
    label: "Adaptive Scaling",
    badge: "ALL DEVICES",
    icon: Smartphone,
    accent: "#10B981",
    gradient: "from-emerald-500 via-teal-400 to-sky-500",
    description: "Fluid layout geometry that scales effortlessly across mobile phones, tablets, and 4K displays.",
    metric: "100% Cross-Platform",
  },
};

/* =========================================================
   DRAGGABLE STICKER CARDS DATA
========================================================= */

const DRAGGABLE_STICKERS = [
  {
    id: "sticker-1",
    title: "Aurelia Mobile UI",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=90",
    tag: "Fintech App",
    rotation: -6,
    top: "10%",
    left: "6%",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    id: "sticker-2",
    title: "Velora E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=90",
    tag: "+145% Sales",
    rotation: 5,
    top: "15%",
    right: "6%",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "sticker-3",
    title: "Mira AI Dashboard",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=90",
    tag: "0.2s Speed",
    rotation: -3,
    bottom: "12%",
    left: "10%",
    accent: "from-emerald-400 to-teal-500",
  },
];

/* =========================================================
   CLIENT SHOWCASE DATA
========================================================= */

const projectImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=90",
];

const projects = [
  {
    id: 1,
    title: "Aurelia Digital Portal",
    category: "Fintech",
    size: "hero",
    description: "Next-gen banking interface engineered with real-time biometric login, instant payment transfers, and customizable financial dashboards.",
    image: projectImages[0],
    accent: "#0EA5E9",
    metric: "4.9 ★ User Rating",
    tag: "Mobile & Web",
    year: "2026",
    location: "London, UK",
    url: "/projects",
  },
  {
    id: 2,
    title: "Velora E-Commerce",
    category: "E-Commerce",
    size: "medium",
    description: "High-conversion online retail store with 1-click checkout and personalized product AI algorithms.",
    image: projectImages[1],
    accent: "#6366F1",
    metric: "+145% Sales Growth",
    tag: "Online Store",
    year: "2026",
    location: "Dubai, UAE",
    url: "/projects",
  },
  {
    id: 3,
    title: "Mira AI Business Hub",
    category: "SaaS & AI",
    size: "medium",
    description: "Autonomous AI-powered business software automating customer inquiries and predictive revenue analytics.",
    image: projectImages[2],
    accent: "#06B6D4",
    metric: "0.2s Fast Latency",
    tag: "AI Automation",
    year: "2025",
    location: "Singapore",
    url: "/projects",
  },
  {
    id: 4,
    title: "Solenne Smart Hub",
    category: "Hardware & IoT",
    size: "hero",
    description: "Industrial IoT telemetry platform monitoring agricultural sensor grids and environmental telemetry in real time.",
    image: projectImages[4],
    accent: "#7C3AED",
    metric: "Real-Time Telemetry",
    tag: "Smart IoT",
    year: "2026",
    location: "Berlin, Germany",
    url: "/projects",
  },
  {
    id: 5,
    title: "Lunara Healthcare",
    category: "Healthcare",
    size: "medium",
    description: "HIPAA-compliant telemedicine portal connecting patients with medical specialists for instant consultations.",
    image: projectImages[3],
    accent: "#2563EB",
    metric: "100% Accessible",
    tag: "Medical App",
    year: "2025",
    location: "Toronto, Canada",
    url: "/projects",
  },
  {
    id: 6,
    title: "Novera Global Platform",
    category: "Fintech",
    size: "medium",
    description: "Unified enterprise management software powering multi-currency invoicing and automated tax compliance.",
    image: projectImages[5],
    accent: "#0D9488",
    metric: "2.4M Active Users",
    tag: "Enterprise System",
    year: "2025",
    location: "Amsterdam, NL",
    url: "/projects",
  },
];

/* =========================================================
   MAIN UI/UX LAB COMPONENT
========================================================= */

export default function UIUXLab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const rotateX = useTransform(smoothY, [-400, 400], [5, -5]);
  const rotateY = useTransform(smoothX, [-600, 600], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="uiux-lab"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#F8FBFF] text-[#0F172A] py-12 sm:py-16"
    >
      {/* SEAMLESS CONTINUATION FROM SERVICE SECTION */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F8FBFF] via-sky-50/40 to-transparent z-10" />

      {/* Connecting Beam from Service Section Root Tunnel */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-sky-400/60 to-transparent z-20" />

      {/* Background Precision Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.055)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Vibrant Multi-Color Floating Ambient Glow Orbs */}
      <AmbientOrb className="-left-[180px] top-[5%] h-[550px] w-[550px] bg-rose-300/20" duration={15} />
      <AmbientOrb className="-right-[180px] top-[30%] h-[580px] w-[580px] bg-indigo-300/20" duration={21} reverse />
      <AmbientOrb className="left-[30%] bottom-[5%] h-[450px] w-[450px] bg-cyan-300/20" duration={18} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER: SPATIAL WORKBENCH INTRO WITH NEIRO LOGO
        =================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-white/90 px-5 py-2 text-xs font-black tracking-wide text-sky-600 shadow-[0_10px_35px_rgba(14,165,233,.15)] backdrop-blur-xl"
          >
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-1 shadow-sm">
              <Image
                src="/images/Neiro.png"
                alt="Neiro Brand Mark"
                width={20}
                height={20}
                className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]"
              />
            </div>
            <RevealText text="NEIRAH LAB • INTERACTIVE STUDIO" mode="viewport" stagger={0.05} duration={0.4} blurAmount={3} />
          </motion.div>

          <h2 className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-slate-900 pb-1">
            <span>We don&apos;t just design screens.</span>
            <span className="block mt-1 bg-gradient-to-r from-sky-500 via-indigo-500 via-rose-500 to-cyan-500 bg-clip-text text-transparent pb-1">
              We design experiences built for growth.
            </span>
          </h2>

          <RevealText
            as="p"
            mode="viewport"
            delay={0.45}
            stagger={0.03}
            duration={0.5}
            blurAmount={4}
            className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            Explore real-world design modes, live responsiveness, and <span className="font-extrabold text-sky-600">drag image stickers around</span> inside our colorful interactive studio!
          </RevealText>
        </div>

        {/* ===================================================
            1. VIBRANT & DRAGGABLE NEIRAHTECH.LAB STUDIO
        =================================================== */}
        <div className="mt-10 sm:mt-14">
          <NeirahTechLabVisualStudio rotateX={isMobile ? 0 : rotateX} rotateY={isMobile ? 0 : rotateY} />
        </div>

        {/* ===================================================
            2. CLICK-TO-SPOTLIGHT BENTO SHOWCASE (CLICK TO EXPAND)
        =================================================== */}
        <div className="mt-16 sm:mt-20">
          <CircularMotionBentoShowcaseUI />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   1. VIBRANT NEIRAHTECH.LAB STUDIO WITH DRAGGABLE IMAGES
========================================================= */

function NeirahTechLabVisualStudio({
  rotateX,
  rotateY,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rotateX: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rotateY: any;
}) {
  const [activeMode, setActiveMode] = useState<UXExperienceMode>("visual");
  const [deviceMode, setDeviceMode] = useState<DevicePreviewMode>("desktop");
  const [accentColor, setAccentColor] = useState<string>("#0EA5E9");
  const [interactiveClicks, setInteractiveClicks] = useState<number>(0);
  const [dragResetKey, setDragResetKey] = useState<number>(0);

  const canvasBoundsRef = useRef<HTMLDivElement>(null);
  const mode = UX_MODES[activeMode];
  const currentAccent = accentColor || mode.accent;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="relative w-full max-w-5xl mx-auto select-none"
    >
      {/* Colorful Gradient Halo background */}
      <div
        className="absolute -inset-8 rounded-[60px] blur-3xl transition-all duration-700 opacity-70 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${currentAccent} 0%, rgba(99, 102, 241, 0.4) 50%, rgba(244, 63, 94, 0.2) 100%)` }}
      />

      {/* Main Glass Studio Cyber Deck */}
      <div className="relative overflow-hidden rounded-[44px] border-2 border-white/90 bg-white/90 p-6 sm:p-10 shadow-[0_35px_100px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-all duration-500">
        
        {/* Studio Window Header with Neirah Neiro Logo */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-rose-500 shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-amber-400 shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-sm" />
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
              <Cpu size={14} style={{ color: currentAccent }} className="transition-colors duration-300" /> NEIRAH SHADER ENGINE v3.6
            </div>
          </div>

          {/* Prominent Neiro Brand Mark Badge */}
          <div
            style={{ borderColor: `${currentAccent}60`, boxShadow: `0 4px 20px ${currentAccent}25` }}
            className="flex items-center gap-2.5 rounded-full border-2 bg-white/95 px-5 py-1.5 text-xs font-black text-slate-900 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 p-1">
              <Image
                src="/images/Neiro.png"
                alt="Neiro Official Brand Mark"
                width={20}
                height={20}
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(14,165,233,0.9)]"
              />
            </div>
            <span style={{ color: currentAccent }} className="font-mono font-black transition-colors duration-300">
              NEIRAH LAB
            </span>
            <span className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300" style={{ background: currentAccent }} />
          </div>

          {/* Right Status & Drag Reset Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDragResetKey((k) => k + 1)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-sky-50 hover:text-sky-600 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw size={12} /> Reset Draggables
            </button>
          </div>
        </div>

        {/* Color Palette & Device Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-gradient-to-r from-slate-50/90 via-sky-50/40 to-indigo-50/90 border border-slate-200/80">
          
          {/* Custom Theme Color Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Palette size={14} className="text-rose-500" /> Colorful Spectrum:
            </span>
            <div className="flex items-center gap-2">
              {[
                { name: "Sky", hex: "#0EA5E9" },
                { name: "Violet", hex: "#6366F1" },
                { name: "Pink", hex: "#F43F5E" },
                { name: "Cyan", hex: "#06B6D4" },
                { name: "Emerald", hex: "#10B981" },
              ].map((c) => {
                const isSelected = currentAccent.toLowerCase() === c.hex.toLowerCase();
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={`Select ${c.name} accent`}
                    onClick={() => setAccentColor(c.hex)}
                    className={`h-7 w-7 rounded-full transition-all border-2 cursor-pointer ${
                      isSelected
                        ? "scale-125 border-slate-900 ring-2 ring-slate-900/30 shadow-lg"
                        : "border-white hover:scale-110 opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      background: c.hex,
                      boxShadow: isSelected ? `0 0 14px ${c.hex}` : undefined,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Device Preview Switcher */}
          <div className="flex items-center gap-1.5 bg-white rounded-full p-1 border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => { setDeviceMode("desktop"); setActiveMode("visual"); setAccentColor(UX_MODES["visual"].accent); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                deviceMode === "desktop" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Monitor size={14} /> Widescreen
            </button>
            <button
              type="button"
              onClick={() => { setDeviceMode("tablet"); setActiveMode("responsive"); setAccentColor(UX_MODES["responsive"].accent); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                deviceMode === "tablet" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Tablet size={14} /> Tablet
            </button>
            <button
              type="button"
              onClick={() => { setDeviceMode("mobile"); setActiveMode("responsive"); setAccentColor(UX_MODES["responsive"].accent); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                deviceMode === "mobile" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Smartphone size={14} /> Mobile
            </button>
          </div>
        </div>

        {/* User-Friendly Mode Switcher Buttons with Rich Colorful Gradients */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(["visual", "motion", "conversion", "responsive"] as UXExperienceMode[]).map((mKey) => {
            const m = UX_MODES[mKey];
            const Icon = m.icon;
            const isSelected = activeMode === mKey;

            return (
              <button
                key={mKey}
                type="button"
                onClick={() => {
                  setActiveMode(mKey);
                  setAccentColor(m.accent);
                }}
                className={`flex flex-col gap-2 rounded-2xl p-4 text-left transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.03]"
                    : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white hover:border-sky-300"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white bg-gradient-to-r ${m.gradient} ${
                    isSelected ? "shadow-lg ring-2 ring-white/50" : ""
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold leading-tight">{m.label}</h5>
                  <p className={`text-[10px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                    {m.badge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Experience Canvas with DRAGGABLE IMAGE STICKERS */}
        <div
          ref={canvasBoundsRef}
          className="relative min-h-[440px] sm:min-h-[460px] rounded-3xl border-2 border-slate-200/80 p-4 pt-20 sm:p-8 transition-all duration-500 bg-gradient-to-br from-white via-sky-50/60 via-purple-50/30 to-pink-50/40 overflow-hidden flex items-center justify-center"
        >
          {/* Colorful Holographic Vector Beam */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
            viewBox="0 0 800 450"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M -20 360 C 180 180, 250 420, 400 220 C 550 80, 650 250, 820 100"
              fill="none"
              stroke={currentAccent}
              strokeWidth="3"
              strokeDasharray="8 12"
              animate={{ strokeDashoffset: [0, -120] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Floating Badges */}
          <FloatingTag icon={Eye} text="User First Experience" className="top-3 left-3 sm:top-6 sm:left-6" delay={0} accentColor={currentAccent} />
          <FloatingTag icon={Sparkles} text={mode.metric} className="top-12 right-3 sm:top-6 sm:right-6" delay={0.8} accentColor={currentAccent} />

          {/* ==================================================
              INTERACTIVE DRAGGABLE IMAGE CARDS / STICKERS!
          =================================================== */}
          {DRAGGABLE_STICKERS.map((sticker) => (
            <motion.div
              key={`${sticker.id}-${dragResetKey}`}
              drag
              dragConstraints={canvasBoundsRef}
              dragElastic={0.25}
              whileDrag={{ scale: 1.12, rotate: 6, zIndex: 50 }}
              initial={{ rotate: sticker.rotation }}
              style={{
                top: sticker.top,
                left: sticker.left,
                right: sticker.right,
                bottom: sticker.bottom,
              }}
              className="absolute z-30 cursor-grab active:cursor-grabbing max-w-[160px] sm:max-w-[200px] rounded-2xl border-2 border-white bg-white/95 p-2 shadow-[0_15px_35px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-shadow hover:shadow-2xl"
            >
              <div className="relative h-20 sm:h-24 w-full rounded-xl overflow-hidden mb-2">
                <Image
                  src={sticker.image}
                  alt={sticker.title}
                  fill
                  sizes="200px"
                  className="h-full w-full object-cover pointer-events-none"
                />
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  <Move size={10} /> Drag Me!
                </div>
              </div>

              <div className="px-1 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-center sm:text-left">
                <span className="text-[10px] font-extrabold text-slate-800 truncate text-center sm:text-left max-w-full">
                  {sticker.title}
                </span>
                <span className={`text-[9px] font-black text-white px-2.5 py-0.5 rounded-full bg-gradient-to-r ${sticker.accent} text-center flex items-center justify-center shrink-0`}>
                  {sticker.tag}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Central Live Web Preview Window */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{ borderColor: `${currentAccent}50` }}
            className="relative z-10 w-full max-w-xl mx-auto bg-white/95 rounded-3xl border-2 p-6 shadow-2xl backdrop-blur-xl space-y-5 transition-all duration-500"
          >
            {/* Inner Window Navigation with Neiro Logo */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md p-1.5 transition-colors duration-300"
                  style={{ background: currentAccent }}
                >
                  <Image
                    src="/images/Neiro.png"
                    alt="Neirah Tech Logo"
                    width={24}
                    height={24}
                    className="h-full w-full object-contain drop-shadow"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-slate-900">Neirah Digital Experience</h5>
                  <p className="text-[10px] text-slate-400 font-mono">device: {deviceMode}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={12} /> Live Interactive
              </span>
            </div>

            {/* Dynamic Content Switching based on Mode */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeMode}-${deviceMode}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {activeMode === "visual" && "High-End Visual Identity & Brand Craft"}
                    {activeMode === "motion" && "Instant Loading & Fluid Interactive Animations"}
                    {activeMode === "conversion" && "Designed to Turn Visitors into Paying Clients"}
                    {activeMode === "responsive" && "Fluid Geometry Across All Devices"}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {mode.description}
                </p>

                {/* Animated Equalizer Wave (if Motion Mode) */}
                {activeMode === "motion" && (
                  <div className="flex items-center gap-1.5 h-6 pt-1">
                    <span className="text-xs font-bold text-slate-400 mr-2">Kinetic Spring Engine:</span>
                    {[40, 85, 60, 100, 75, 45, 90, 50].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["20%", `${h}%`, "30%"] }}
                        transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 rounded-full transition-colors duration-300"
                        style={{ background: currentAccent }}
                      />
                    ))}
                  </div>
                )}

                {/* Interactive Action Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInteractiveClicks((c) => c + 1)}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-lg cursor-pointer transition-colors duration-300"
                    style={{ background: currentAccent }}
                  >
                    <span>Test Interaction</span>
                    <ArrowUpRight size={14} />
                  </motion.button>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                    <Check size={14} className="text-emerald-500" />
                    Clicks Triggered: <span className="font-mono font-extrabold transition-colors duration-300" style={{ color: currentAccent }}>{interactiveClicks}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Autonomous Animated Pointer */}
          <motion.div
            animate={{
              x: [0, 80, 20, 110, 0],
              y: [0, -35, 45, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[20%] top-[50%] z-30 pointer-events-none"
          >
            <MousePointer2 size={26} fill="#0F172A" className="text-[#0F172A] drop-shadow-lg" />
          </motion.div>
        </div>

        {/* Footer Summary */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-200/60 pt-4">
          <span className="font-semibold flex items-center gap-1.5">
            <Sparkles size={14} style={{ color: currentAccent }} className="transition-colors duration-300" />
            ✋ Try dragging the colorful project image cards around the studio canvas above!
          </span>
          <Link href="/projects" style={{ color: currentAccent }} className="font-bold hover:underline flex items-center gap-1 transition-colors duration-300">
            See Real Client Work <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   2. CLICK-TO-SPOTLIGHT BENTO SHOWCASE (EXPLORE MORE PROJECTS BUTTON)
========================================================= */

function CircularMotionBentoShowcaseUI() {
  const [activeHeroId, setActiveHeroId] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const totalPages = Math.ceil(projects.length / 3);

  // Active Hero Project
  const heroProject = projects.find((p) => p.id === activeHeroId) || projects[0];
  
  // Right side secondary projects (excluding current hero)
  const rightSideProjects = projects.filter((p) => p.id !== heroProject.id).slice(0, 2);

  const goNext = () => {
    const nextIdx = (pageIndex + 1) % totalPages;
    setPageIndex(nextIdx);
    if (projects[nextIdx * 3]) {
      setActiveHeroId(projects[nextIdx * 3].id);
    }
  };

  const goPrev = () => {
    const prevIdx = (pageIndex - 1 + totalPages) % totalPages;
    setPageIndex(prevIdx);
    if (projects[prevIdx * 3]) {
      setActiveHeroId(projects[prevIdx * 3].id);
    }
  };

  return (
    <div className="relative space-y-10 sm:space-y-12">
      {/* Sub Header & Explore More Projects Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-600">
            <Compass size={14} /> FEATURED PORTFOLIO & PRODUCTS
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Featured Digital Experiences
          </h3>
        </div>

        {/* Explore More Projects Link & Page Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:bg-sky-500 hover:shadow-sky-500/25 active:scale-95 cursor-pointer"
          >
            <span>Explore More Projects</span>
            <ArrowUpRight size={15} />
          </Link>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous showcase set"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-all hover:bg-sky-500 hover:text-white hover:border-sky-500 active:scale-95 cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>

              <span className="font-mono text-xs font-bold text-slate-500 px-1">
                {pageIndex + 1}/{totalPages}
              </span>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next showcase set"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-all hover:bg-sky-500 hover:text-white hover:border-sky-500 active:scale-95 cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CIRCULAR MOTION SPLIT BENTO LAYOUT (HERO LEFT + CLICK-TO-SPOTLIGHT RIGHT SIDE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ==================================================
            LEFT SIDE: PRIMARY HERO CARD (CURRENT ACTIVE HERO)
        =================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroProject.id}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group relative overflow-hidden rounded-[40px] border-2 border-white bg-white/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl flex flex-col justify-between"
          >
            {/* ROTATING DASHED CIRCULAR ORBITAL RING */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full border-2 border-dashed border-sky-400/30"
            />
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl opacity-30 transition-all group-hover:opacity-50"
              style={{ background: heroProject.accent }}
            />

            {/* Cover Image Frame */}
            <div className="relative h-[240px] sm:h-[320px] w-full rounded-[30px] overflow-hidden border border-white shadow-2xl">
              <Image
                src={heroProject.image}
                alt={heroProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <span className="font-mono text-xs font-black text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  {heroProject.category}
                </span>

                {/* LIVE BADGE */}
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-900 font-mono text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  {heroProject.metric}
                </div>
              </div>

              {/* Location & Year */}
              <div className="absolute bottom-4 left-5 text-white text-xs font-mono font-bold">
                {heroProject.location} • {heroProject.year}
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {heroProject.title}
                </h4>
                <span className="font-mono text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  {heroProject.tag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {heroProject.description}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-400">Featured Spotlight</span>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-extrabold text-white shadow-xl transition-all hover:bg-sky-500 hover:shadow-sky-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Explore Project</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ==================================================
            RIGHT SIDE: FEATURED PROJECT CARDS (DIRECT LINK TO LIVE PRODUCT)
        =================================================== */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between px-1 text-xs font-black uppercase tracking-wider text-slate-400">
            <span>Discover Featured Projects:</span>
            <span className="text-sky-600 font-mono">Live Products</span>
          </div>

          {rightSideProjects.map((project) => (
            <Link
              key={project.id}
              href={project.url || "/projects"}
              className="group relative overflow-hidden rounded-[36px] border-2 border-white bg-white/90 p-5 sm:p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_30px_90px_rgba(15,23,42,0.16)] hover:border-sky-300 flex-1 flex flex-col justify-between cursor-pointer"
            >
              {/* CIRCULAR ORBITAL GLOW DISC */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full border border-dashed border-indigo-300/40"
              />

              {/* Card Top Thumbnail & Details */}
              <div className="flex items-center gap-4 mb-3">
                <div className="relative h-20 w-24 shrink-0 rounded-2xl overflow-hidden border border-white shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="120px"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 right-1 bg-slate-900/80 backdrop-blur-md text-white rounded-full p-1 shadow-sm">
                    <ExternalLink size={10} />
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black text-sky-600 uppercase">
                      {project.category}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-slate-400">
                      {project.year}
                    </span>
                  </div>

                  <h5 className="text-base sm:text-lg font-black text-slate-900 truncate">
                    {project.title}
                  </h5>

                  <span className="inline-block text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {project.metric}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                {project.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs font-bold text-sky-600">
                <span className="flex items-center gap-1 group-hover:underline">
                  <ExternalLink size={12} /> Explore Project
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function FloatingTag({
  icon: Icon,
  text,
  className,
  delay,
  accentColor,
}: {
  icon: LucideIcon;
  text: string;
  className: string;
  delay: number;
  accentColor?: string;
}) {
  const accent = accentColor || "#0EA5E9";
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{
        color: accent,
        borderColor: `${accent}60`,
        boxShadow: `0 8px 25px ${accent}20`,
      }}
      className={`absolute z-30 flex items-center gap-1.5 sm:gap-2 rounded-full border bg-white/95 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-extrabold backdrop-blur-md max-w-[calc(100%-1.5rem)] sm:max-w-none transition-all duration-300 ${className}`}
    >
      <Icon size={14} style={{ color: accent }} className="shrink-0 transition-colors duration-300" />
      <span className="truncate">{text}</span>
    </motion.div>
  );
}