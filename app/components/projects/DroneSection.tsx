"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Radio,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Scan,
  Activity,
  Flame,
  Binary,
  Target,
  Zap,
} from "lucide-react";

/* =========================================================
   CURIOUS VISION MODES & TELEMETRY HOTSPOTS
========================================================= */

type VisionMode = "rgb" | "thermal" | "neural";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  badge: string;
  detail: string;
  metric: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "sensor",
    top: "32%",
    left: "48%",
    title: "Dual Multi-Spectral LiDAR Payload",
    badge: "2.4M PTS/SEC",
    detail: "High-density photogrammetric 3D elevation scanning with dual thermal infrared channels.",
    metric: "0.8cm Vertical Accuracy",
  },
  {
    id: "ai-core",
    top: "45%",
    left: "68%",
    title: "Edge Neural Co-Processor",
    badge: "6ms INFERENCE",
    detail: "On-board TPU executing sub-10ms real-time object classification and perimeter anomaly detection.",
    metric: "12.8 TFLOPS Spatial AI",
  },
  {
    id: "navigation",
    top: "62%",
    left: "35%",
    title: "RTK Multi-Axis Navigation Mesh",
    badge: "360° AVOIDANCE",
    detail: "Sub-centimeter GPS/GNSS satellite positioning with autonomous dynamic obstacle avoidance.",
    metric: "< 1.5 cm Kinematic RTK",
  },
  {
    id: "telemetry-mesh",
    top: "78%",
    left: "75%",
    title: "Encrypted Telemetry Mesh",
    badge: "100+ KM RANGE",
    detail: "Zero-latency encrypted satellite & cellular bridge feeding real-time command dashboards.",
    metric: "256-Bit Encrypted Link",
  },
];

const CAPABILITIES = [
  {
    id: "autonomous-flight",
    number: "01",
    title: "Autonomous Flight & Waypoint Navigation",
    question: "How does it navigate without human control?",
    description:
      "Multi-axis LiDAR obstacle matrix coupled with real-time kinematic satellite mapping allows mission execution across unmapped terrains without human intervention.",
    icon: Compass,
    accent: "#0EA5E9",
    metricLabel: "RTK Precision",
    metricValue: "< 1.5 cm",
  },
  {
    id: "lidar-thermal",
    number: "02",
    title: "Real-Time LiDAR & Thermal Imaging",
    question: "Can it see through darkness, fog, and dense foliage?",
    description:
      "Fusing dual thermal infrared wavelengths with 2.4 million 3D laser points per second to generate real-time heat signatures and topographical elevation models.",
    icon: Layers,
    accent: "#06B6D4",
    metricLabel: "Laser Density",
    metricValue: "2.4M pts/sec",
  },
  {
    id: "edge-ai",
    number: "03",
    title: "Edge Neural AI & Spatial Intelligence",
    question: "What happens when it detects a critical anomaly?",
    description:
      "On-board neural networks classify structural stress, agricultural crop stress, or unauthorized security breaches instantly—triggering automated alerts before landing.",
    icon: Cpu,
    accent: "#6366F1",
    metricLabel: "AI Latency",
    metricValue: "< 6 ms",
  },
  {
    id: "telemetry",
    number: "04",
    title: "Industrial & Agricultural Telemetry",
    question: "How does aerial intelligence transform operations?",
    description:
      "Streams real-time geospatial analytics to energy grid operators, large-scale agricultural managers, and emergency response teams across 100+ km encrypted channels.",
    icon: Radio,
    accent: "#3B82F6",
    metricLabel: "Telemetry Radius",
    metricValue: "100+ km",
  },
];

const METRICS_LIST = [
  { value: "100+ km", label: "Encrypted Telemetry Radius", detail: "Long-Range Spatial Mesh" },
  { value: "99.8%", label: "Geospatial Precision Rate", detail: "Centimeter RTK Mapping" },
  { value: "< 6 ms", label: "On-Board Neural AI Latency", detail: "Real-Time Edge Inference" },
  { value: "2.4M", label: "LiDAR Laser Points / Sec", detail: "Multi-Spectral 3D Scan" },
];

export default function DroneSection() {
  const [visionMode, setVisionMode] = useState<VisionMode>("rgb");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);
  const [activeCapIndex, setActiveCapIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-28 text-slate-950 sm:py-36">
      {/* =========================================================
         TOP BLENDED SECTION BREAK LINE
      ========================================================= */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 via-indigo-300/60 to-transparent z-20" />

      {/* =========================================================
         BACKGROUND AMBIENT LIGHTING GLOWS & GRID
      ========================================================= */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[700px] w-[700px] rounded-full bg-sky-200/40 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[700px] w-[700px] rounded-full bg-indigo-200/35 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/25 blur-[180px]" />

      {/* MATRIX BACKGROUND DOT GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(14,165,233,0.8) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* =========================================================
           SECTION HEADER (TEASER HOOK)
        ========================================================= */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* EYEBROW */}
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-sky-600">
                AERIAL TELEMETRY // PROJECT 04: NEIRAH DRONE
              </span>
            </div>

            {/* HEADLINE */}
            <h2
              className="text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl text-slate-950"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              What if the sky had <br />
              <span className="bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                its own neural network?
              </span>
            </h2>
          </motion.div>

          {/* INTRO CALLOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md space-y-3 lg:pb-2"
          >
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base font-medium">
              An autonomous aerial ecosystem engineered for deep geospatial surveillance, LiDAR thermal mapping, and edge AI telemetry.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-600 font-bold">
              <Sparkles size={14} className="animate-spin text-sky-500" />
              <span>Click spatial hotspots & switch scanner lenses to decrypt telemetry.</span>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
           VISION MODE SELECTOR (INTERACTIVE LENS BAR)
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-between gap-4 pb-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
            <Scan size={15} className="text-sky-600" />
            <span>Select Optical Scanner Lens:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* MODE 1: RGB */}
            <button
              onClick={() => setVisionMode("rgb")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                visionMode === "rgb"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "bg-white/80 border border-slate-200/90 text-slate-600 hover:text-slate-950 hover:border-sky-300 shadow-sm backdrop-blur-sm"
              }`}
            >
              <Eye size={14} />
              <span>01. RGB Telemetry</span>
            </button>

            {/* MODE 2: THERMAL */}
            <button
              onClick={() => setVisionMode("thermal")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                visionMode === "thermal"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-white/80 border border-slate-200/90 text-slate-600 hover:text-slate-950 hover:border-sky-300 shadow-sm backdrop-blur-sm"
              }`}
            >
              <Flame size={14} />
              <span>02. Thermal LiDAR Heatmap</span>
            </button>

            {/* MODE 3: NEURAL */}
            <button
              onClick={() => setVisionMode("neural")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                visionMode === "neural"
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/80 border border-slate-200/90 text-slate-600 hover:text-slate-950 hover:border-sky-300 shadow-sm backdrop-blur-sm"
              }`}
            >
              <Binary size={14} />
              <span>03. Neural AI Scanner</span>
            </button>
          </div>
        </motion.div>

        {/* OPTICAL BAR DIVIDER LINE */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-300/80 via-indigo-300/80 to-transparent" />

        {/* =========================================================
           MAIN VISUAL INTERACTIVE CANVAS & HOTSPOT DECRYPTION
        ========================================================= */}
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* LEFT: DRONE GRAPHIC WITH DYNAMIC SCANNER & HOTSPOT PINGS (7 COLS) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative lg:col-span-7"
          >
            {/* AMBIENT BACKDROP GLOW */}
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-sky-400/20 via-cyan-300/15 to-indigo-400/20 blur-3xl opacity-80" />

            {/* CANVAS CONTAINER */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border-2 border-white bg-slate-900/10 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15)] backdrop-blur-md">
              {/* BASE DRONE IMAGE */}
              <Image
                src="/images/drone.jpeg"
                alt="Neirah Autonomous Aerial System"
                fill
                className={`object-cover object-center transition-all duration-700 ${
                  visionMode === "thermal"
                    ? "hue-rotate-180 saturate-200 contrast-125 brightness-90"
                    : visionMode === "neural"
                    ? "contrast-150 brightness-75 invert-[0.1]"
                    : "saturate-110"
                }`}
                priority
              />

              {/* OVERLAY FX ACCORDING TO VISION MODE */}
              {/* LASER SCANNER BEAM ANIMATION */}
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className={`pointer-events-none absolute left-0 right-0 h-1 backdrop-blur-none ${
                  visionMode === "thermal"
                    ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
                    : visionMode === "neural"
                    ? "bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_#8b5cf6]"
                    : "bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#0ea5e9]"
                }`}
              />

              {/* NEURAL AI BOUNDING BOXES OVERLAY */}
              {visionMode === "neural" && (
                <div className="pointer-events-none absolute inset-0 font-mono text-[10px]">
                  {/* TARGET BOX 1 */}
                  <div className="absolute left-[20%] top-[25%] h-28 w-36 border border-dashed border-indigo-400/80 p-1.5 text-indigo-300">
                    <div className="flex items-center justify-between bg-indigo-950/80 px-1 py-0.5 font-bold">
                      <span>[TARGET: STRUCTURE]</span>
                      <span className="text-emerald-400">99.4%</span>
                    </div>
                    <span className="absolute bottom-1 right-1 text-[8px] text-slate-400">LAT 6.927° N</span>
                  </div>

                  {/* TARGET BOX 2 */}
                  <div className="absolute right-[18%] bottom-[20%] h-24 w-32 border border-dashed border-cyan-400/80 p-1.5 text-cyan-300">
                    <div className="flex items-center justify-between bg-cyan-950/80 px-1 py-0.5 font-bold">
                      <span>[TERRAIN: RTK]</span>
                      <span className="text-emerald-400">1.2cm</span>
                    </div>
                    <span className="absolute bottom-1 right-1 text-[8px] text-slate-400">ALT 120m</span>
                  </div>
                </div>
              )}

              {/* THERMAL HEATMAP GRID OVERLAY */}
              {visionMode === "thermal" && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              )}

              {/* DARK BOTTOM GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

              {/* FLOATING TOP STATUS HUD */}
              <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full bg-slate-950/85 px-4 py-2 text-xs font-mono text-sky-300 backdrop-blur-xl border border-sky-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>
                  {visionMode === "rgb"
                    ? "LIVE TELEMETRY FEED: 60 FPS"
                    : visionMode === "thermal"
                    ? "THERMAL INFRARED STREAM: ACTIVE"
                    : "NEURAL OBJECT INFERENCE: 6ms"}
                </span>
              </div>

              {/* INTERACTIVE TELEMETRY HOTSPOT PINGS */}
              {HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;

                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveHotspot(spot)}
                      className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-125"
                    >
                      {/* PULSE RINGS */}
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                        isSelected ? "bg-cyan-400" : "bg-sky-400/50"
                      }`} />

                      <span className={`relative inline-flex h-4 w-4 rounded-full transition-colors ${
                        isSelected ? "bg-cyan-300 shadow-[0_0_12px_#06b6d4]" : "bg-sky-400 group-hover:bg-cyan-300"
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: HOTSPOT DECRYPTION PANEL & CAPABILITIES (5 COLS) */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* HOTSPOT TELEMETRY DECRYPTION CARD */}
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl bg-white/90 p-6 backdrop-blur-xl border border-sky-100/90 shadow-[0_15px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-sky-600">
                      Decrypted Telemetry Node
                    </span>
                    <span className="rounded-full bg-sky-50 border border-sky-100 px-3 py-1 text-[10px] font-mono font-bold text-sky-700">
                      {activeHotspot.badge}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-slate-950 sm:text-2xl"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {activeHotspot.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {activeHotspot.detail}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                    <CheckCircle2 size={14} />
                    <span>Verified Spec: {activeHotspot.metric}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CAPABILITY STREAM SELECTOR */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
                Curious Insights
              </span>

              <div className="flex flex-col gap-2.5">
                {CAPABILITIES.map((cap, i) => {
                  const isCapActive = activeCapIndex === i;
                  const IconC = cap.icon;

                  return (
                    <div
                      key={cap.id}
                      onClick={() => setActiveCapIndex(i)}
                      className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 ${
                        isCapActive
                          ? "bg-white border border-sky-200 text-slate-950 shadow-md"
                          : "bg-white/60 border border-slate-200/80 text-slate-600 hover:bg-white hover:text-slate-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-bold ${isCapActive ? "text-sky-600" : "text-slate-400"}`}>
                            {cap.number}
                          </span>
                          <h4 className="text-sm font-semibold sm:text-base">
                            {cap.title}
                          </h4>
                        </div>
                        <IconC size={16} className={isCapActive ? "text-sky-600" : "text-slate-400"} />
                      </div>

                      {isCapActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-xs leading-relaxed text-slate-600"
                        >
                          <p className="mb-2 italic text-sky-600 font-medium">
                            &quot;{cap.question}&quot;
                          </p>
                          <p>{cap.description}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER LINE */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-300/80 via-indigo-300/80 to-transparent mt-24 mb-16" />

        {/* =========================================================
           FLOATING TELEMETRY METRICS PILLARS
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {METRICS_LIST.map((metric, idx) => (
            <div key={idx} className="relative space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-sm" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600">
                  {metric.detail}
                </span>
              </div>

              <div
                className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                {metric.value}
              </div>

              <div className="text-xs font-medium text-slate-600">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* =========================================================
           BOTTOM CURIOUS BANNER CTA
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 p-8 sm:flex-row sm:px-12 sm:py-10 text-white shadow-xl shadow-sky-500/15"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4
              className="text-xl font-bold text-white sm:text-2xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Curious how aerial intelligence fits your operations?
            </h4>
            <p className="text-xs text-sky-100 sm:text-sm">
              Schedule a live aerial simulation or custom LiDAR site consultation.
            </p>
          </div>

          <a
            href="/contact"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-slate-950 px-7 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:bg-white hover:text-slate-950 shadow-lg hover:-translate-y-0.5"
          >
            <span>Request Drone Simulation</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>

      {/* BOTTOM SECTION BREAK LINE */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent z-20" />
    </section>
  );
}
