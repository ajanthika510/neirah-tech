"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
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
  // 03. Neirah IoT (Object Center -> Heading Center-Top)
  { objectSide: "center", headingSide: "center", entryDirection: "from-right" },
  // 04. Neirah Drone (Object Upper-Left -> Heading Lower-Right)
  { objectSide: "diagonal-left", headingSide: "right", entryDirection: "from-right" },
  // 05. Mugilix (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 06. HRVio (Object Center -> Heading Center-Top)
  { objectSide: "center", headingSide: "center", entryDirection: "from-left" },
  // 07. Pothify (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 08. Tricobites (Object Right -> Heading Left)
  { objectSide: "right", headingSide: "left", entryDirection: "from-left" },
  // 09. Rideya (Object Left -> Heading Right)
  { objectSide: "left", headingSide: "right", entryDirection: "from-right" },
  // 10. Neirah BrandOS (Object Center -> Heading Center-Top)
  { objectSide: "center", headingSide: "center", entryDirection: "from-right" },
];

export default function ProductEditorialOverlay({
  products,
  activeIndex,
  progress,
  onConsult,
}: ProductEditorialOverlayProps) {
  const activeProduct = products[activeIndex] || products[0];
  const comp = PRODUCT_COMPOSITIONS[activeIndex % PRODUCT_COMPOSITIONS.length];

  // The heading ONLY appears once the 3D object has settled in foreground
  const distFromActive = Math.abs(progress - activeIndex);
  const isSettled = distFromActive < 0.22;

  const Icon = activeProduct.icon;
  const letters = Array.from(activeProduct.name);

  // Letter reveal animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.22, // Short anticipation settling pause
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.18, ease: "easeOut" },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      x: comp.entryDirection === "from-right" ? 18 : -18,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const detailsVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        delay: 0.22 + letters.length * 0.035, // Appears smoothly right after letters reveal
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* ========================================================
          TOP WHISPER: DISCOVERY RADAR & ACTIVE PHASE MONOGRAM
      ======================================================== */}
      <div className="w-full flex items-center justify-between max-w-6xl mx-auto pt-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>Discovery Universe</span>
        </div>

        <div className="flex items-center gap-2 tracking-widest uppercase text-[11px]">
          <Compass size={12} className="text-slate-400 animate-spin" style={{ animationDuration: "14s" }} />
          <span>Horizon Index {String(activeIndex + 1).padStart(2, "0")} / 10</span>
        </div>
      </div>

      {/* ========================================================
          EDITORIAL SPATIAL TYPOGRAPHY STAGE (BESIDE 3D OBJECT)
      ======================================================== */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-end lg:items-center pb-4 sm:pb-0">
        <AnimatePresence mode="wait">
          {isSettled && (
            <motion.div
              key={`editorial-${activeProduct.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pointer-events-none ${
                comp.headingSide === "right"
                  ? "lg:justify-items-end"
                  : comp.headingSide === "left"
                  ? "lg:justify-items-start"
                  : "justify-items-center text-center"
              }`}
            >
              {/* Left Column Heading Container (Desktop left, Mobile full) */}
              {comp.headingSide === "left" && (
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 pointer-events-auto bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
                  {/* Phase & Layer Monogram */}
                  <motion.div
                    variants={detailsVariants}
                    className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
                  >
                    <span className="text-slate-900 font-black">{activeProduct.number}</span>
                    <span>/</span>
                    <span>{activeProduct.layer}</span>
                  </motion.div>

                  {/* Letter-by-Letter Hero Product Heading */}
                  <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] flex flex-wrap justify-center lg:justify-start drop-shadow-xs">
                    {letters.map((char, i) => (
                      <motion.span
                        key={`${activeProduct.id}-${char}-${i}`}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </h2>

                  {/* Category & Storytelling Narrative */}
                  <motion.div variants={detailsVariants} className="space-y-2.5 sm:space-y-3 max-w-md">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center lg:justify-start">
                      <Icon size={14} style={{ color: activeProduct.accent }} />
                      <span>{activeProduct.category}</span>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                      {activeProduct.description}
                    </p>

                    {/* Refined Capability Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5 justify-center lg:justify-start">
                      {activeProduct.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/60 text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-xs"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Quiet Luxury Consultation CTA */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onConsult(activeProduct)}
                        className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide shadow-md hover:bg-sky-600 transition-all cursor-pointer"
                      >
                        <span>Explore {activeProduct.name}</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Center Spacer when heading is right */}
              {comp.headingSide === "right" && <div className="hidden lg:block lg:col-span-6" />}

              {/* Right Column Heading Container (Desktop right, Mobile full) */}
              {comp.headingSide === "right" && (
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 pointer-events-auto bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
                  {/* Phase & Layer Monogram */}
                  <motion.div
                    variants={detailsVariants}
                    className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
                  >
                    <span className="text-slate-900 font-black">{activeProduct.number}</span>
                    <span>/</span>
                    <span>{activeProduct.layer}</span>
                  </motion.div>

                  {/* Letter-by-Letter Hero Product Heading */}
                  <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] flex flex-wrap justify-center lg:justify-start drop-shadow-xs">
                    {letters.map((char, i) => (
                      <motion.span
                        key={`${activeProduct.id}-${char}-${i}`}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </h2>

                  {/* Category & Storytelling Narrative */}
                  <motion.div variants={detailsVariants} className="space-y-2.5 sm:space-y-3 max-w-md">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center lg:justify-start">
                      <Icon size={14} style={{ color: activeProduct.accent }} />
                      <span>{activeProduct.category}</span>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
                      {activeProduct.description}
                    </p>

                    {/* Refined Capability Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5 justify-center lg:justify-start">
                      {activeProduct.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/60 text-[10px] sm:text-[11px] font-semibold text-slate-700 shadow-xs"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Quiet Luxury Consultation CTA */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onConsult(activeProduct)}
                        className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide shadow-md hover:bg-sky-600 transition-all cursor-pointer"
                      >
                        <span>Explore {activeProduct.name}</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Center Composition Heading Container */}
              {comp.headingSide === "center" && (
                <div className="lg:col-span-12 flex flex-col items-center text-center space-y-3 pointer-events-auto max-w-xl mx-auto -mt-24 sm:-mt-40 bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 sm:p-6 lg:p-0 rounded-3xl lg:rounded-none border border-slate-200/50 lg:border-none shadow-xs lg:shadow-none">
                  <motion.div
                    variants={detailsVariants}
                    className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold"
                  >
                    <span className="text-slate-900 font-black">{activeProduct.number}</span>
                    <span>/</span>
                    <span>{activeProduct.layer}</span>
                  </motion.div>

                  <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[0.92] flex justify-center flex-wrap drop-shadow-xs">
                    {letters.map((char, i) => (
                      <motion.span
                        key={`${activeProduct.id}-${char}-${i}`}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </h2>

                  <motion.div variants={detailsVariants} className="space-y-2.5 sm:space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 justify-center">
                      <Icon size={14} style={{ color: activeProduct.accent }} />
                      <span>{activeProduct.category}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                      {activeProduct.description}
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onConsult(activeProduct)}
                        className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide shadow-md hover:bg-sky-600 transition-all cursor-pointer"
                      >
                        <span>Explore {activeProduct.name}</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Spacer to align with HUD */}
      <div className="h-10" />
    </div>
  );
}
