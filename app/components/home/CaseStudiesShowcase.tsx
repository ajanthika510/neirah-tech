"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ChevronRight,
  Lock,
  Award,
} from "lucide-react";

import { getCaseStudies, type CaseStudy } from "../../actions/caseStudyActions";

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
    subtitle: "High-conversion digital product suite serving global enterprise users.",
    description:
      "Engineered a fluid multi-brand design system with sub-100ms page transitions, real-time analytics, and instant multi-language switching.",
    image: "/images/lantravia.png",
    year: "2026",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Design Systems"],
    impactMetric: "+184%",
    impactLabel: "Checkout Conversion Growth",
    url: "/case-studies",
    accentColor: "#0EA5E9",
    accentGradient: "from-sky-500 via-cyan-400 to-indigo-500",
  },
  {
    id: "neirah-lab",
    number: "02",
    category: "AI, R&D & Swarm Automation",
    title: "Neirah Lab Agent Swarm",
    subtitle: "Autonomous developer agent platform processing 10M+ tasks daily.",
    description:
      "Built an intelligent agentic control center featuring live WebSocket trace telemetry, automated code refactoring, and zero-latency prompt response pipelines.",
    image: "/images/neirah_lab.png",
    year: "2026",
    technologies: ["Python", "TypeScript", "Vector Embeddings", "WebSockets", "React"],
    impactMetric: "10M+",
    impactLabel: "Tasks Processed Daily",
    url: "/case-studies",
    accentColor: "#8B5CF6",
    accentGradient: "from-violet-500 via-purple-500 to-indigo-500",
  },
  {
    id: "mugilix",
    number: "03",
    category: "Enterprise Business OS",
    title: "Mugilix Operating System",
    subtitle: "Connected cloud platform powering operations for 2.4M+ business users.",
    description:
      "Unified ERP, HRM, and financial analytics into a single high-performance dashboard with sub-second search and automated tax payroll runs.",
    image: "/images/mugilix.png",
    year: "2026",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    impactMetric: "2.4M+",
    impactLabel: "Active Enterprise Users",
    url: "/case-studies",
    accentColor: "#6366F1",
    accentGradient: "from-indigo-500 via-blue-500 to-purple-500",
  },
  {
    id: "pothify",
    number: "04",
    category: "Logistics & Mobility SaaS",
    title: "Pothify Delivery Infrastructure",
    subtitle: "Real-time dispatch engine matching fleet orders under 2.1 seconds.",
    description:
      "Developed an ultra-low latency dispatch algorithm connecting food delivery fleets, courier drivers, and merchant kitchens with live GPS telemetry.",
    image: "/images/veera.png",
    year: "2025",
    technologies: ["Next.js", "WebSockets", "Mapbox GL", "Go", "Tailwind CSS"],
    impactMetric: "< 2.1s",
    impactLabel: "Instant Driver Dispatch",
    url: "/case-studies",
    accentColor: "#10B981",
    accentGradient: "from-emerald-500 via-teal-400 to-cyan-500",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CaseStudiesShowcase() {
  const [studies, setStudies] = useState<ShowcaseCaseStudy[]>(SHOWCASE_DATASET);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Fetch DB case studies if available
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCaseStudies();
        if (data && data.length > 0) {
          const enriched: ShowcaseCaseStudy[] = data.map((item: CaseStudy, idx: number) => {
            const fallback = SHOWCASE_DATASET[idx % SHOWCASE_DATASET.length];
            return {
              id: item.id,
              number: item.number || String(idx + 1).padStart(2, "0"),
              category: item.category || fallback.category,
              title: item.title || fallback.title,
              subtitle: item.subtitle || fallback.subtitle,
              description: item.description || fallback.description,
              image: item.image || fallback.image,
              year: item.year || fallback.year,
              technologies: Array.isArray(item.services) && item.services.length > 0
                ? item.services
                : fallback.technologies,
              impactMetric: fallback.impactMetric,
              impactLabel: fallback.impactLabel,
              url: "/case-studies",
              accentColor: fallback.accentColor,
              accentGradient: fallback.accentGradient,
            };
          });
          setStudies(enriched);
        }
      } catch (err) {
        console.error("Failed to load DB case studies:", err);
      }
    }
    loadData();
  }, []);

  const activeStudy = studies[activeIndex] || studies[0];
  const accentColor = activeStudy.accentColor || "#0EA5E9";

  return (
    <section className="relative overflow-hidden bg-[#F8FBFF] text-[#0F172A] py-24 sm:py-32">
      {/* Background Precision Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(14,165,233,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      
      {/* Subtle Background Accent Lighting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] rounded-full blur-[150px] opacity-15 transition-colors duration-700"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================
            1. SECTION INTRO HEADER
        =================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-200 bg-white px-4 py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] shadow-2xs">
              <Award size={14} className="text-[#0EA5E9]" />
              <span>CASE STUDIES IN ACTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.06] tracking-tight text-[#0F172A]">
              Real Business Impact. <br />
              <span className="bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Engineered for Scale.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              Explore how we design and build high-performance products, AI systems, and digital platforms.
            </p>
          </div>

          {/* Top Action CTA */}
          <div className="shrink-0">
            <Link
              href="/case-studies"
              className="
                inline-flex items-center gap-2.5 rounded-full bg-[#0F172A] px-6 py-3.5
                text-xs font-extrabold uppercase tracking-wider text-white shadow-xl
                transition-all duration-300 hover:bg-[#0EA5E9] hover:shadow-[#0EA5E9]/25 hover:-translate-y-0.5
                active:scale-95 cursor-pointer
              "
            >
              <span>Explore All Case Studies</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* ===================================================
            2. INTERACTIVE SHOWCASE STAGE
        =================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: PROJECT SELECTOR CARDS STRIP */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {studies.map((study, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={study.id || idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 text-left
                    transition-all duration-300 cursor-pointer overflow-hidden
                    ${
                      isSelected
                        ? "bg-white text-[#0F172A] border-[#0EA5E9] shadow-[0_15px_40px_rgba(14,165,233,0.12)]"
                        : "bg-white/80 text-slate-700 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs"
                    }
                  `}
                >
                  {/* Active Indicator Accent Strip */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: study.accentColor || "#0EA5E9" }}
                    />
                  )}

                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`
                        font-mono text-xs font-black px-2.5 py-1 rounded-lg transition-colors
                        ${isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}
                      `}
                    >
                      {study.number}
                    </span>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block truncate">
                        {study.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[#0F172A] truncate mt-0.5">
                        {study.title}
                      </h4>
                    </div>
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-3">
                    <span
                      className="font-mono text-xs font-black"
                      style={{ color: isSelected ? study.accentColor : "#475569" }}
                    >
                      {study.impactMetric}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 ${isSelected ? "translate-x-1 text-[#0EA5E9]" : "text-slate-300"}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: FEATURED SHOWCASE FRAME */}
          <div className="lg:col-span-7 relative w-full flex">
            {/* Main Cockpit Frame */}
            <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-[36px] border border-slate-200/80 bg-white p-5 sm:p-8 shadow-[0_25px_70px_rgba(15,23,42,0.1)] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStudy.id || activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Browser Mockup Window */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg group">
                    
                    {/* Top Browser Header Bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-slate-200/70 bg-white/90 backdrop-blur-md px-3.5 py-2.5 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      </div>

                      <div className="flex max-w-[240px] items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-0.5 font-mono text-[10px] text-slate-500 shadow-inner">
                        <Lock size={10} className="shrink-0 text-emerald-500" />
                        <span className="truncate">{activeStudy.url}</span>
                      </div>

                      <Globe2 size={12} className="text-slate-400" />
                    </div>

                    {/* Screenshot Image */}
                    <Image
                      src={activeStudy.image}
                      alt={activeStudy.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      priority
                      className="h-full w-full object-cover object-top pt-8 transition-transform duration-500 group-hover:scale-103"
                    />

                    {/* Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80" />

                    {/* Metric Badge */}
                    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2.5 rounded-2xl border border-white/30 bg-slate-950/85 backdrop-blur-md px-4 py-2 text-white shadow-xl">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        <TrendingUp size={15} />
                      </div>
                      <div>
                        <span className="font-mono text-sm font-black text-white block leading-none">
                          {activeStudy.impactMetric}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-wider block mt-0.5">
                          {activeStudy.impactLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Project Details */}
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
                          style={{
                            borderColor: `${accentColor}40`,
                            backgroundColor: `${accentColor}12`,
                            color: accentColor,
                          }}
                        >
                          {activeStudy.category} • {activeStudy.year}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
                          {activeStudy.title}
                        </h3>
                      </div>

                      <Link
                        href={activeStudy.url}
                        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0EA5E9]"
                      >
                        <span>View Project</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {activeStudy.description}
                    </p>

                    {/* Stack Pills */}
                    {activeStudy.technologies && activeStudy.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeStudy.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80"
                          >
                            <CheckCircle2 size={11} className="text-emerald-500" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
