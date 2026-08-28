"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { Product } from "../FeaturedProjects";

interface ProductEditorialOverlayProps {
  products: Product[];
  activeIndex: number;
  progress: number;
  onConsult: (product: Product) => void;
}

export type CompositionType = {
  objectSide: "left" | "right" | "center" | "diagonal-left" | "diagonal-right";
  headingSide: "right" | "left" | "center";
  entryDirection: "from-right" | "from-left";
};

export const PRODUCT_COMPOSITIONS: CompositionType[] = [
  // 01. Lantriva (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 02. Neirah Lab (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 03. Neirah IoT (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 04. Neirah Drone (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 05. Mugilix (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 06. HRVio (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 07. Pothify (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 08. Tricobites (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 09. Rideya (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 10. Neirah BrandOS (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
];

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  if (inMax === inMin) return outMin;
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

export default function ProductEditorialOverlay({
  products,
  activeIndex,
  progress,
  onConsult,
}: ProductEditorialOverlayProps) {
  const activeProduct = products[activeIndex] || products[0];
  const comp = PRODUCT_COMPOSITIONS[activeIndex % PRODUCT_COMPOSITIONS.length];
  const Icon = activeProduct.icon;
  const letters = useMemo(() => Array.from(activeProduct.name), [activeProduct.name]);

  // Compute offset of current continuous progress from the active index (-1 to +1)
  const offset = progress - activeIndex;

  /* ========================================================
     PROGRESSIVE REVEAL STAGES COMPUTATION (DRIVEN BY SCROLL)
     
     Phase 1 (-0.50 to -0.15): Visual Teaser (3D object arriving). Text is 0.
     Phase 2 (-0.15 to  0.00): 3D Object settles. Anticipation pause.
     Phase 3 ( 0.00 to  0.15): Title reveals (clip-path mask + blur-to-sharp).
     Phase 4 ( 0.10 to  0.30): Layer / Monogram + Category + Description.
     Phase 5 ( 0.25 to  0.40): Capability badges.
     Phase 6 ( 0.35 to  0.50): Explore CTA button appears last as reward.
     Phase 7 ( 0.65 to  0.85): Reverse exit transition as next project approaches.
  ======================================================== */

  // Title reveal values
  const titleOpacity = useMemo(() => {
    if (offset < -0.1) return 0;
    if (offset < 0.12) return mapRange(offset, -0.1, 0.12, 0, 1);
    if (offset < 0.68) return 1;
    if (offset < 0.88) return mapRange(offset, 0.68, 0.88, 1, 0);
    return 0;
  }, [offset]);

  const titleClipPercent = useMemo(() => {
    if (offset < -0.08) return 100;
    if (offset < 0.14) return mapRange(offset, -0.08, 0.14, 100, 0);
    return 0;
  }, [offset]);

  const titleTranslateX = useMemo(() => {
    if (offset < -0.08) return comp.entryDirection === "from-right" ? 24 : -24;
    if (offset < 0.14) {
      const startX = comp.entryDirection === "from-right" ? 24 : -24;
      return mapRange(offset, -0.08, 0.14, startX, 0);
    }
    if (offset > 0.68) {
      const exitX = comp.entryDirection === "from-right" ? -24 : 24;
      return mapRange(offset, 0.68, 0.88, 0, exitX);
    }
    return 0;
  }, [offset, comp.entryDirection]);

  // Monogram & Layer Badge
  const monogramOpacity = useMemo(() => {
    if (offset < -0.02) return 0;
    if (offset < 0.16) return mapRange(offset, -0.02, 0.16, 0, 1);
    if (offset < 0.65) return 1;
    if (offset < 0.85) return mapRange(offset, 0.65, 0.85, 1, 0);
    return 0;
  }, [offset]);

  const monogramY = useMemo(() => {
    if (offset < -0.02) return 10;
    if (offset < 0.16) return mapRange(offset, -0.02, 0.16, 10, 0);
    if (offset > 0.65) return mapRange(offset, 0.65, 0.85, 0, -10);
    return 0;
  }, [offset]);

  // Category & Description
  const descOpacity = useMemo(() => {
    if (offset < 0.08) return 0;
    if (offset < 0.24) return mapRange(offset, 0.08, 0.24, 0, 1);
    if (offset < 0.62) return 1;
    if (offset < 0.80) return mapRange(offset, 0.62, 0.80, 1, 0);
    return 0;
  }, [offset]);

  const descY = useMemo(() => {
    if (offset < 0.08) return 14;
    if (offset < 0.24) return mapRange(offset, 0.08, 0.24, 14, 0);
    if (offset > 0.62) return mapRange(offset, 0.62, 0.80, 0, -12);
    return 0;
  }, [offset]);

  // Capability Badges
  const badgesOpacity = useMemo(() => {
    if (offset < 0.18) return 0;
    if (offset < 0.32) return mapRange(offset, 0.18, 0.32, 0, 1);
    if (offset < 0.58) return 1;
    if (offset < 0.76) return mapRange(offset, 0.58, 0.76, 1, 0);
    return 0;
  }, [offset]);

  const badgesScale = useMemo(() => {
    if (offset < 0.18) return 0.92;
    if (offset < 0.32) return mapRange(offset, 0.18, 0.32, 0.92, 1);
    return 1;
  }, [offset]);

  // CTA Button (appears LAST as discovery reward)
  const ctaOpacity = useMemo(() => {
    if (offset < 0.28) return 0;
    if (offset < 0.42) return mapRange(offset, 0.28, 0.42, 0, 1);
    if (offset < 0.55) return 1;
    if (offset < 0.70) return mapRange(offset, 0.55, 0.70, 1, 0);
    return 0;
  }, [offset]);

  const ctaY = useMemo(() => {
    if (offset < 0.28) return 18;
    if (offset < 0.42) return mapRange(offset, 0.28, 0.42, 18, 0);
    if (offset > 0.55) return mapRange(offset, 0.55, 0.70, 0, -10);
    return 0;
  }, [offset]);

  const ctaScale = useMemo(() => {
    if (offset < 0.28) return 0.88;
    if (offset < 0.42) return mapRange(offset, 0.28, 0.42, 0.88, 1);
    return 1;
  }, [offset]);

  const isCtaInteractive = ctaOpacity > 0.4;

  // Active Discovery Phase label for HUD
  const currentDiscoveryPhase = useMemo(() => {
    if (offset < -0.1) return "01 · Visual Teaser";
    if (offset < 0.05) return "02 · Geometry Settling";
    if (offset < 0.2) return "03 · Identity Revealed";
    if (offset < 0.35) return "04 · Capability Analysis";
    if (offset < 0.6) return "05 · Full Discovery";
    return "06 · Transitioning";
  }, [offset]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* ========================================================
          TOP DISCOVERY SPACE BAR & ACTIVE PHASE MONOGRAM
      ======================================================== */}
      <div className="w-full flex items-center justify-between max-w-6xl mx-auto pt-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Venture Discovery Corridor</span>
        </div>

        <div className="flex items-center gap-3 tracking-widest uppercase text-[11px]">
          <span className="text-slate-500 hidden sm:inline">{currentDiscoveryPhase}</span>
          <div className="flex items-center gap-1.5">
            <Compass size={12} className="text-sky-500 animate-spin" style={{ animationDuration: "14s" }} />
            <span>Horizon {String(activeIndex + 1).padStart(2, "0")} / 10</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          EDITORIAL SPATIAL TYPOGRAPHY STAGE (BESIDE 3D OBJECT)
      ======================================================== */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-end lg:items-center pb-4 sm:pb-0">
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pointer-events-none ${
            comp.headingSide === "right"
              ? "lg:justify-items-end"
              : comp.headingSide === "left"
              ? "lg:justify-items-start"
              : "justify-items-center text-center"
          }`}
        >
          {/* Left Column Heading Container */}
          {comp.headingSide === "left" && (
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 pointer-events-auto bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
              {/* Phase & Layer Monogram (Phase 4) */}
              <div
                style={{
                  opacity: monogramOpacity,
                  transform: `translateY(${monogramY}px)`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                }}
                className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
              >
                <span className="text-slate-900 font-black">{activeProduct.number}</span>
                <span>/</span>
                <span>{activeProduct.layer}</span>
              </div>

              {/* Masked Hero Product Heading (Phase 3) */}
              <div
                style={{
                  opacity: titleOpacity,
                  transform: `translateX(${titleTranslateX}px)`,
                  clipPath: `inset(0% ${titleClipPercent}% 0% 0%)`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out, clip-path 0.25s ease-out",
                }}
                className="overflow-hidden"
              >
                <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] drop-shadow-xs">
                  {activeProduct.name}
                </h2>
              </div>

              {/* Category & Storytelling Narrative (Phase 4) */}
              <div
                style={{
                  opacity: descOpacity,
                  transform: `translateY(${descY}px)`,
                  transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                }}
                className="space-y-2.5 sm:space-y-3 max-w-md"
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center lg:justify-start">
                  <Icon size={14} style={{ color: activeProduct.accent }} />
                  <span>{activeProduct.category}</span>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Capability Badges (Phase 4) */}
                <div
                  style={{
                    opacity: badgesOpacity,
                    transform: `scale(${badgesScale})`,
                    transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                  }}
                  className="flex flex-wrap gap-1.5 pt-0.5 justify-center lg:justify-start"
                >
                  {activeProduct.capabilities.slice(0, 3).map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/60 text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* Consultation CTA (Phase 5 - Appears Last) */}
                <div
                  style={{
                    opacity: ctaOpacity,
                    transform: `translateY(${ctaY}px) scale(${ctaScale})`,
                    pointerEvents: isCtaInteractive ? "auto" : "none",
                    transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                  }}
                  className="pt-2"
                >
                  <button
                    type="button"
                    onClick={() => onConsult(activeProduct)}
                    disabled={!isCtaInteractive}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-0"
                  >
                    <Sparkles size={13} className="text-sky-300" />
                    <span>Explore {activeProduct.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Center Spacer when heading is right */}
          {comp.headingSide === "right" && <div className="hidden lg:block lg:col-span-6" />}

          {/* Right Column Heading Container */}
          {comp.headingSide === "right" && (
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 pointer-events-auto bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
              {/* Phase & Layer Monogram */}
              <div
                style={{
                  opacity: monogramOpacity,
                  transform: `translateY(${monogramY}px)`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                }}
                className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
              >
                <span className="text-slate-900 font-black">{activeProduct.number}</span>
                <span>/</span>
                <span>{activeProduct.layer}</span>
              </div>

              {/* Masked Hero Product Heading */}
              <div
                style={{
                  opacity: titleOpacity,
                  transform: `translateX(${titleTranslateX}px)`,
                  clipPath: `inset(0% ${titleClipPercent}% 0% 0%)`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out, clip-path 0.25s ease-out",
                }}
                className="overflow-hidden"
              >
                <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] drop-shadow-xs">
                  {activeProduct.name}
                </h2>
              </div>

              {/* Category & Storytelling Narrative */}
              <div
                style={{
                  opacity: descOpacity,
                  transform: `translateY(${descY}px)`,
                  transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                }}
                className="space-y-2.5 sm:space-y-3 max-w-md"
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center lg:justify-start">
                  <Icon size={14} style={{ color: activeProduct.accent }} />
                  <span>{activeProduct.category}</span>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Capability Badges */}
                <div
                  style={{
                    opacity: badgesOpacity,
                    transform: `scale(${badgesScale})`,
                    transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                  }}
                  className="flex flex-wrap gap-1.5 pt-0.5 justify-center lg:justify-start"
                >
                  {activeProduct.capabilities.slice(0, 3).map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/60 text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* Consultation CTA (Appears Last) */}
                <div
                  style={{
                    opacity: ctaOpacity,
                    transform: `translateY(${ctaY}px) scale(${ctaScale})`,
                    pointerEvents: isCtaInteractive ? "auto" : "none",
                    transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                  }}
                  className="pt-2"
                >
                  <button
                    type="button"
                    onClick={() => onConsult(activeProduct)}
                    disabled={!isCtaInteractive}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-0"
                  >
                    <Sparkles size={13} className="text-sky-300" />
                    <span>Explore {activeProduct.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Center Composition Heading Container */}
          {comp.headingSide === "center" && (
            <div className="lg:col-span-12 flex flex-col items-center text-center space-y-3 pointer-events-auto max-w-xl mx-auto -mt-24 sm:-mt-40 bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
              <div
                style={{
                  opacity: monogramOpacity,
                  transform: `translateY(${monogramY}px)`,
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                }}
                className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
              >
                <span className="text-slate-900 font-black">{activeProduct.number}</span>
                <span>/</span>
                <span>{activeProduct.layer}</span>
              </div>

              <div
                style={{
                  opacity: titleOpacity,
                  clipPath: `inset(0% ${titleClipPercent}% 0% 0%)`,
                  transition: "opacity 0.2s ease-out, clip-path 0.25s ease-out",
                }}
                className="overflow-hidden"
              >
                <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] flex justify-center flex-wrap drop-shadow-xs">
                  {activeProduct.name}
                </h2>
              </div>

              <div
                style={{
                  opacity: descOpacity,
                  transform: `translateY(${descY}px)`,
                  transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                }}
                className="space-y-2.5 sm:space-y-3"
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center">
                  <Icon size={14} style={{ color: activeProduct.accent }} />
                  <span>{activeProduct.category}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                  {activeProduct.description}
                </p>

                <div
                  style={{
                    opacity: ctaOpacity,
                    transform: `translateY(${ctaY}px) scale(${ctaScale})`,
                    pointerEvents: isCtaInteractive ? "auto" : "none",
                    transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                  }}
                  className="pt-2"
                >
                  <button
                    type="button"
                    onClick={() => onConsult(activeProduct)}
                    disabled={!isCtaInteractive}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-0"
                  >
                    <Sparkles size={13} className="text-sky-300" />
                    <span>Explore {activeProduct.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-10" />
    </div>
  );
}
