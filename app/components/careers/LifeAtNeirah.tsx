"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";

const cultureItems = [
  {
    icon: Users,
    title: "People first",
  },
  {
    icon: Lightbulb,
    title: "Ideas matter",
  },
  {
    icon: Sparkles,
    title: "Innovation always",
  },
  {
    icon: HeartHandshake,
    title: "Grow together",
  },
];

export default function LifeAtNeirah() {
  return (
    <section
      id="life-at-neirah"
      className="relative scroll-mt-24 overflow-hidden bg-white px-6 py-12 sm:py-16 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto h-[480px] w-full max-w-[540px]"
        >
          <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-blue-50 via-white to-cyan-50" />

          {/* main panel */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-white bg-white/90 p-6 shadow-[0_30px_80px_rgba(37,99,235,0.13)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  TEAM CULTURE
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#14213D]">
                  Create. Learn. Grow.
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Sparkles size={20} />
              </div>
            </div>

            {/* fake dashboard */}
            <div className="mt-7 space-y-4">
              {[80, 60, 90].map((width, index) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between text-[10px] text-slate-400">
                    <span>
                      {["Innovation", "Collaboration", "Learning"][index]}
                    </span>
                    <span>{width}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + index * 0.2,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex -space-x-2">
              {["A", "M", "S", "N", "+"].map((item, index) => (
                <div
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* floating card */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 left-0 rounded-2xl border border-white bg-white p-4 shadow-[0_15px_40px_rgba(30,64,175,0.12)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <HeartHandshake size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#17233d]">
                  Great teamwork
                </p>
                <p className="text-[10px] text-slate-400">
                  Every voice matters
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
            }}
            className="absolute right-0 top-14 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-xl"
          >
            <Lightbulb size={24} />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Life at Neirah Tech
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#14213D] sm:text-4xl lg:text-5xl">
            Work with people
            <br />
            <span className="text-blue-600">who care.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-slate-500">
            Great technology starts with great people. We believe in creating
            a workplace where curiosity is encouraged, ideas are respected,
            and everyone has the opportunity to grow.
          </p>

          <p className="mt-4 text-base leading-7 text-slate-500">
            Whether you&apos;re an experienced engineer or starting your career,
            you&apos;ll have the opportunity to work on meaningful projects and
            learn from people who love what they do.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {cultureItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#F8FAFF] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <Icon size={17} />
                  </div>

                  <span className="text-xs font-semibold text-[#17233d]">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}