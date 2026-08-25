"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Service } from "./types";

/* ─── Visual composition per service ─── */
function ServiceVisual({ service, progress }: { service: Service; progress: any }) {
  const scale = useTransform(progress, [0.3, 0.7], [0.92, 1]);
  const visualOpacity = useTransform(progress, [0.1, 0.35], [0, 1]);

  const Icon = service.icon;

  return (
    <motion.div
      style={{ scale, opacity: visualOpacity }}
      className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-white/80 shadow-[0_30px_80px_rgba(99,102,241,0.12)]"
    >
      {/* Gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-sky-50/70 to-indigo-50/80" />

      {/* Decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-sky-200/60"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-dashed border-indigo-200/50"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-dashed border-violet-200/50"
        aria-hidden="true"
      />

      {/* Center icon */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-[28px] bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl`}
      >
        <Icon size={40} className="text-white" />
      </motion.div>

      {/* Floating accent dots */}
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-8 left-8 w-3 h-3 rounded-full bg-sky-400/70"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-indigo-400/70"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute top-12 right-14 w-2 h-2 rounded-full bg-violet-300/80"
        aria-hidden="true"
      />

      {/* Chapter number watermark */}
      <div className="absolute bottom-6 right-8 text-[80px] font-black leading-none text-slate-100/70 pointer-events-none select-none">
        {service.chapter}
      </div>
    </motion.div>
  );
}

/* ─── Main ServiceScene ─── */
interface ServiceSceneProps {
  service: Service;
  index: number;
  isLast: boolean;
  onEnter: () => void;
}

export default function ServiceScene({ service, index, isLast, onEnter }: ServiceSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const sectionOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0.15, 0.4], [40, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);
  const descY = useTransform(smoothProgress, [0.3, 0.5], [30, 0]);
  const descOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const pillsOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      data-chapter="2"
      className={`relative min-h-screen flex items-center py-24 overflow-hidden ${
        isEven
          ? "bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/70"
          : "bg-gradient-to-bl from-white via-indigo-50/50 to-violet-50/70"
      }`}
      onMouseEnter={onEnter}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute ${isEven ? "-top-20 -right-20" : "-top-20 -left-20"} w-96 h-96 rounded-full blur-[100px] ${
            isEven ? "bg-sky-200/25" : "bg-violet-200/20"
          }`}
        />
      </div>

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center gap-3"
        >
          <div className={`h-px w-8 bg-gradient-to-r ${isEven ? "from-transparent to-sky-400" : "from-transparent to-violet-400"}`} />
          <span className={`text-[11px] font-bold tracking-[0.3em] uppercase ${isEven ? "text-sky-500" : "text-violet-500"}`}>
            Chapter III · {service.chapter}
          </span>
          <span className="text-[11px] font-medium tracking-wider text-slate-400">
            {service.discipline}
          </span>
        </motion.div>

        {/* Content grid — alternating layout */}
        <div className={`grid gap-12 lg:gap-20 items-center ${isEven ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"}`}>
          {/* Visual — shown first on even, second on odd */}
          <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
            <ServiceVisual service={service} progress={smoothProgress} />
          </div>

          {/* Text content */}
          <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
            {/* Number */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span
                className={`text-[120px] font-black leading-none bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent opacity-15 select-none`}
              >
                {service.chapter}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div style={{ y: titleY, opacity: titleOpacity }}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-none mb-2">
                {service.title.split(" ").map((word, i) => (
                  <span key={i} className={`block ${i === service.title.split(" ").length - 1 && service.title.split(" ").length > 1 ? `bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent` : ""}`}>
                    {word}
                  </span>
                ))}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              style={{ y: descY, opacity: descOpacity }}
              className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md"
            >
              {service.description}
            </motion.p>

            {/* Benefit pills */}
            <motion.div
              style={{ opacity: pillsOpacity }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {service.benefits.map((benefit, i) => (
                <motion.span
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border bg-white/80 backdrop-blur-sm shadow-sm text-slate-700 border-slate-200/80`}
                >
                  <CheckCircle2
                    size={13}
                    className={`${isEven ? "text-sky-500" : "text-violet-500"}`}
                  />
                  {benefit}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-3 text-sm font-bold tracking-wide bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent transition-transform duration-300 hover:translate-x-1`}
              >
                Learn more
                <ArrowRight
                  size={16}
                  className={`transition-transform duration-300 group-hover:translate-x-1 ${isEven ? "text-sky-500" : "text-violet-500"}`}
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Divider — except on last service */}
        {!isLast && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-24 h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-${isEven ? "sky" : "indigo"}-200 to-transparent origin-center`}
          />
        )}
      </motion.div>
    </section>
  );
}
