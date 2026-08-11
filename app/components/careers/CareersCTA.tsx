"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CareersCTA() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAFF] px-6 pb-24 pt-10 sm:px-8 lg:px-10">

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[#14213D] px-7 py-16 text-center sm:px-12 lg:py-20">

        {/* Glow */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/30 blur-[90px]" />

        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-[90px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300 backdrop-blur">
            <Sparkles size={23} />
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to build
            <br />
            <span className="text-cyan-300">the future?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            We're always looking for curious, creative and ambitious people
            who want to create meaningful technology.
          </p>

          <a
            href="#open-positions"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-50"
          >
            View Open Positions

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}