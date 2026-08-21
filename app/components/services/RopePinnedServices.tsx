"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "./servicesData";
import type { Service } from "./types";

/* ────────────────────────────────────────────────
   CONSTANTS
──────────────────────────────────────────────── */

/** Natural resting rotation per card (alternating tilt) — 8 entries */
const CARD_ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4, -2.0, 1.6];

/** Pin accent gradient per card — 8 entries */
const PIN_GRADIENTS = [
  "from-sky-400 to-sky-600",
  "from-indigo-400 to-indigo-600",
  "from-violet-400 to-violet-600",
  "from-cyan-400 to-sky-500",
  "from-purple-400 to-purple-600",
  "from-indigo-500 to-violet-600",
  "from-emerald-400 to-teal-500",   // IoT
  "from-fuchsia-400 to-purple-600", // Innovation Lab
];

/** Cards per row on large screens — used for both chunking and card width math */
const CARDS_PER_ROW = 3;

/* ────────────────────────────────────────────────
   ROPE SVG
   Catenary curve that slightly sags in the middle.
──────────────────────────────────────────────── */
function RopeSVG({ rowIndex }: { rowIndex: number }) {
  const gradId = `rope-grad-${rowIndex}`;
  return (
    <svg
      viewBox="0 0 1200 48"
      className="w-full"
      style={{ height: 48 }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#92400e" />
          <stop offset="20%"  stopColor="#d97706" />
          <stop offset="50%"  stopColor="#b45309" />
          <stop offset="80%"  stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Rope shadow */}
      <path
        d="M -20 18 Q 300 38 600 22 Q 900 6 1220 18"
        stroke="rgba(120,53,15,0.18)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Main rope body — slightly dashed for twisted texture */}
      <path
        d="M -20 16 Q 300 36 600 20 Q 900 4 1220 16"
        stroke={`url(#${gradId})`}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10 4"
      />

      {/* Rope highlight */}
      <path
        d="M -20 13 Q 300 33 600 17 Q 900 1 1220 13"
        stroke="rgba(253,230,138,0.45)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 6"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────
   THUMBTACK PIN
──────────────────────────────────────────────── */
function Pin({ gradient, delay }: { gradient: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, y: -16 }}
      whileInView={{ scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 340, damping: 16, delay }}
      className="flex flex-col items-center"
    >
      {/* Pin head */}
      <div
        className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} border-[3px] border-white shadow-[0_4px_14px_rgba(0,0,0,0.2)]`}
      />
      {/* Pin needle */}
      <div className="w-[2px] h-3 bg-gradient-to-b from-slate-400 to-slate-200" />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   STRING (rope → card)
──────────────────────────────────────────────── */
function CardString({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay + 0.15, ease: "easeOut" }}
      style={{ transformOrigin: "top" }}
      className="w-[1.5px] h-6 bg-gradient-to-b from-amber-400/70 via-amber-300/50 to-amber-200/20 mx-auto"
    />
  );
}

/* ────────────────────────────────────────────────
   SERVICE CARD
   Flies in from right, settles with spring physics,
   then gently sways in a continuous pendulum loop.
   Width is fixed via the wrapper (see RopeRow) so
   partial rows stay the same card size as full rows.
──────────────────────────────────────────────── */
interface CardProps {
  service: Service;
  globalIndex: number;
}

function PinnedCard({ service, globalIndex }: CardProps) {
  const restRotation = CARD_ROTATIONS[globalIndex % CARD_ROTATIONS.length];
  const pinGrad = PIN_GRADIENTS[globalIndex % PIN_GRADIENTS.length];
  const delay = (globalIndex % 3) * 0.14;
  const Icon = service.icon;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Pin + string */}
      <Pin gradient={pinGrad} delay={delay} />
      <CardString delay={delay} />

      {/* Card flyin */}
      <motion.div
        initial={{ x: 60, rotate: 12, opacity: 0, scale: 0.92 }}
        whileInView={{ x: 0, rotate: restRotation, opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{
          type: "spring",
          stiffness: 52,
          damping: 11,
          delay,
          opacity: { duration: 0.35, ease: "easeOut" },
          scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ transformOrigin: "top center" }}
        className="w-full"
      >
        {/* Gentle continuous pendulum sway after settling */}
        <motion.div
          animate={{
            rotate: [
              restRotation,
              restRotation - 0.6,
              restRotation + 0.4,
              restRotation - 0.2,
              restRotation,
            ],
          }}
          transition={{
            duration: 7 + globalIndex * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 + delay,
          }}
          whileHover={{
            rotate: 0,
            scale: 1.03,
            y: -8,
            transition: { type: "spring", stiffness: 260, damping: 18 },
          }}
          className="group relative overflow-hidden rounded-[26px] bg-white/90 backdrop-blur-xl
                     border border-white/90
                     shadow-[0_20px_50px_rgba(99,102,241,0.12),0_4px_16px_rgba(0,0,0,0.05)]
                     hover:shadow-[0_28px_70px_rgba(99,102,241,0.2),0_8px_24px_rgba(0,0,0,0.08)]
                     transition-shadow duration-500"
          style={{ transformOrigin: "top center" }}
        >
          {/* Top gradient bar */}
          <div
            className={`absolute inset-x-0 top-0 h-[3px] rounded-t-[26px] bg-gradient-to-r ${service.gradient}`}
          />

          {/* Subtle bg glow */}
          <div
            className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.07] blur-3xl pointer-events-none`}
          />

          {/* Chapter watermark */}
          <div className="absolute bottom-4 right-5 text-[64px] sm:text-[72px] font-black leading-none text-slate-100/60 select-none pointer-events-none">
            {service.chapter}
          </div>

          {/* Content */}
          <div className="relative p-5 sm:p-6">
            {/* Discipline label */}
            <p className={`text-[10px] font-black tracking-[0.28em] uppercase bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {service.discipline}
            </p>

            {/* Icon */}
            <div
              className={`mt-3 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon size={24} className="text-white" />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-[1.2rem] sm:text-[1.35rem] font-extrabold text-slate-900 leading-tight tracking-tight">
              {service.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {service.description}
            </p>

            {/* Divider */}
            <div className="mt-4 h-px bg-gradient-to-r from-slate-100 via-slate-200/80 to-transparent" />

            {/* Benefits */}
            <ul className="mt-4 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-sky-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-600">{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition-colors hover:text-sky-500 group-hover:translate-x-0.5 transition-transform"
              >
                Inquire about this
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ROPE ROW  (rope + up to CARDS_PER_ROW hanging cards)

   Fix for "last row not showing": the previous version
   faded the whole row in/out based on scroll position
   relative to the viewport (useScroll + useTransform with
   an ["start end", "end start"] offset). When the last row
   sits near the bottom of the page with little or no scroll
   space after it, that progress value can fail to reach the
   "fully visible" threshold, so the row stays at opacity 0.

   Replaced with a plain whileInView fade (via useInView),
   which only cares whether the row has entered the viewport
   once — independent of how much page exists after it.

   Fix for card sizing: cards are no longer grid items forced
   into equal grid-cols-3 columns (which either stretched or
   left a visible gap when a row had fewer than 3 items).
   They're now flex items with an explicit width that matches
   a 3-column layout exactly, so a 2-card last row centers
   with cards the same size as the rows above it.
──────────────────────────────────────────────── */
function RopeRow({
  rowServices,
  rowIndex,
}: {
  rowServices: Service[];
  rowIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="relative">
      {/* Rope line */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <RopeSVG rowIndex={rowIndex} />
      </motion.div>

      {/* Cards row — flex-wrap so a partial row (e.g. 2 of 3) centers
          instead of stretching or leaving an empty grid column */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-6 mt-0"
      >
        {rowServices.map((service, i) => {
          const globalIdx = rowIndex * CARDS_PER_ROW + i;
          return (
            <div
              key={service.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <PinnedCard service={service} globalIndex={globalIdx} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN EXPORT
──────────────────────────────────────────────── */
export default function RopePinnedServices({
  onEnter,
}: {
  onEnter: () => void;
}) {
  // Split services into rows of CARDS_PER_ROW (last row can be shorter —
  // RopeRow centers it automatically via flex-wrap)
  const rows: Service[][] = [];
  for (let i = 0; i < services.length; i += CARDS_PER_ROW) {
    rows.push(services.slice(i, i + CARDS_PER_ROW));
  }

  return (
    <section
      data-chapter="2"
      onMouseEnter={onEnter}
      className="relative overflow-hidden py-16 sm:py-28"
      style={{
        background:
          "linear-gradient(160deg, #f0f7ff 0%, #eef0ff 35%, #f5f0ff 65%, #f0f7ff 100%)",
      }}
    >
      {/* Dotted texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1.2px, transparent 1.2px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      {/* Large ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-200/30 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-violet-200/25 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[110px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400" />
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-indigo-500">
            Chapter III — Capabilities
          </span>
        </motion.div>

        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
            What we{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              deliver.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 max-w-md font-light">
            {services.length} capabilities, one vision — technology that moves your business forward.
          </p>
        </motion.div>

        {/* Rope rows */}
        <div className="space-y-16 sm:space-y-24">
          {rows.map((rowServices, rowIndex) => (
            <RopeRow key={rowIndex} rowServices={rowServices} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}