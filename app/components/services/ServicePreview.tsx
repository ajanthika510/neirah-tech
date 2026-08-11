"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Clock3,
  TrendingUp,
} from "lucide-react";

interface Goal {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  features: string[];
}

interface ServicePreviewProps {
  goal: Goal;
}

export default function ServicePreview({
  goal,
}: ServicePreviewProps) {
  const Icon = goal.icon;

  return (
    <motion.div
      key={goal.id}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
    >
      {/* ------------------------------------------------ */}
      {/* BACKGROUND GLOW */}
      {/* ------------------------------------------------ */}

      <div
        className={`absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br ${goal.color} opacity-10 blur-3xl`}
      />

      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

      {/* ------------------------------------------------ */}
      {/* TOP VISUAL */}
      {/* ------------------------------------------------ */}

      <div className="relative p-6 sm:p-8 lg:p-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_260px]">

          {/* LEFT */}

          <div>

            {/* Label */}

            <div className="flex items-center gap-2">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100">
                <Sparkles
                  size={14}
                  className="text-sky-600"
                />
              </span>

              <span className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                Your Solution
              </span>

            </div>

            {/* Icon */}

            <motion.div
              initial={{
                scale: 0.7,
                rotate: -10,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className={`mt-7 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br ${goal.color} text-white shadow-[0_15px_40px_rgba(14,165,233,0.25)]`}
            >
              <Icon size={38} />
            </motion.div>

            <h2 className="mt-7 max-w-2xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {goal.title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {goal.description}
            </p>

          </div>

          {/* VISUAL CARD */}

          <div className="relative hidden h-[230px] overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 lg:block">

            {/* Orbit */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/70"
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/70"
            />

            {/* Center */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 rgba(14,165,233,0)",
                  "0 0 35px rgba(14,165,233,.25)",
                  "0 0 0 rgba(14,165,233,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-gradient-to-br ${goal.color} text-white`}
            >
              <Icon size={32} />
            </motion.div>

            {/* Floating dots */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute left-8 top-8 h-3 w-3 rounded-full bg-sky-400"
            />

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
              }}
              className="absolute bottom-8 right-8 h-3 w-3 rounded-full bg-indigo-400"
            />

            <motion.div
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute right-12 top-12 h-2 w-2 rounded-full bg-cyan-400"
            />

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* BENEFITS */}
        {/* ------------------------------------------------ */}

        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-lg font-bold text-slate-900">
              What you get
            </h3>

            <span className="text-sm font-medium text-slate-400">
              Simple. Practical. Effective.
            </span>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            {goal.features.map((feature, index) => (

              <motion.div
                key={feature}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.1 + index * 0.08,
                }}
                whileHover={{
                  x: 5,
                  backgroundColor: "rgba(239,246,255,0.8)",
                }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

                  <CheckCircle2
                    size={19}
                    className="text-sky-500"
                  />

                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {feature}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* BUSINESS OUTCOMES */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">

          <OutcomeCard
            icon={TrendingUp}
            title="Grow"
            description="Reach more customers"
            delay={0}
          />

          <OutcomeCard
            icon={Clock3}
            title="Save Time"
            description="Reduce manual work"
            delay={0.1}
          />

          <OutcomeCard
            icon={Users}
            title="Connect"
            description="Serve customers better"
            delay={0.2}
          />

        </div>

      </div>

      {/* ------------------------------------------------ */}
      {/* CTA */}
      {/* ------------------------------------------------ */}

      <div className="relative border-t border-slate-100 bg-slate-50/60 p-6 sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-lg font-bold text-slate-900">
              Not sure what you need?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tell us about your business and we'll guide you.
            </p>

          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
              x: 3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-7 py-4 font-bold text-white shadow-lg shadow-sky-500/20"
          >
            Let's Talk

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}

/* ------------------------------------------------ */
/* OUTCOME CARD */
/* ------------------------------------------------ */

interface OutcomeCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function OutcomeCard({
  icon: Icon,
  title,
  description,
  delay,
}: OutcomeCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      whileHover={{
        y: -4,
      }}
      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">

          <Icon
            size={19}
            className="text-sky-600"
          />

        </div>

        <div>

          <p className="font-bold text-slate-900">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            {description}
          </p>

        </div>

      </div>

    </motion.div>
  );
}