"use client";

import { motion } from "framer-motion";

export default function SectionHeading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
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
      className="mx-auto max-w-3xl text-center"
    >
      <span className="rounded-full border border-sky-200 bg-white px-6 py-2 font-semibold text-sky-600 shadow-lg">
        OUR SERVICES
      </span>

      <h2 className="mt-8 text-5xl font-black text-slate-900 md:text-6xl">
        Helping Your Business
        <span className="block bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
          Grow with Smart Technology
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Whether you need more customers, a better website, a mobile app, or
        business automation, we build practical solutions that make your work
        easier and help your business grow.
      </p>
    </motion.div>
  );
}