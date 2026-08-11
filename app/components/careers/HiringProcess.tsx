"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Search,
  MessageCircle,
  Rocket,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application and tell us what makes you a great fit.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Review",
    description:
      "Our team reviews your experience, skills and potential.",
    icon: Search,
  },
  {
    number: "03",
    title: "Interview",
    description:
      "Meet the team, discuss your experience and explore the role.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Join Us",
    description:
      "Welcome to Neirah Tech. Let's build something meaningful together.",
    icon: Rocket,
  },
];

export default function HiringProcess() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            How We Hire
          </span>

          <h2 className="mt-5 text-3xl font-bold text-[#14213D] sm:text-4xl">
            Simple, transparent,
            <br />
            <span className="text-blue-600">human.</span>
          </h2>
        </motion.div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* connector */}
          <div className="absolute left-[12%] right-[12%] top-14 hidden h-px bg-blue-100 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-[#F7FAFF] bg-white shadow-[0_10px_35px_rgba(37,99,235,0.12)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon size={25} />
                  </div>

                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#17233d]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[230px] text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}