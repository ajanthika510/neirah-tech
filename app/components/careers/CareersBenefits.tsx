"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Users,
  Laptop,
  Rocket,
  Code2,
  GraduationCap,
} from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Cutting-edge AI",
    description:
      "Work with modern AI technologies and build intelligent solutions that create real-world impact.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description:
      "Work alongside talented people in an open, supportive and collaborative environment.",
  },
  {
    icon: Laptop,
    title: "Remote Flexibility",
    description:
      "Enjoy flexible working arrangements that help you do your best work from wherever you are.",
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description:
      "Take ownership, solve challenging problems and grow rapidly through meaningful opportunities.",
  },
  {
    icon: Code2,
    title: "Hackathons & Meetups",
    description:
      "Explore new ideas, experiment with technology and connect with the wider technology community.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Learn through mentorship, hands-on projects, workshops and access to new technologies.",
  },
];

export default function CareersBenefits() {
  return (
    <section
      id="why-join"
      className="relative bg-[#F7FAFF] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Why Join Neirah Tech
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#14213D] sm:text-4xl lg:text-5xl">
            More than a job.
            <br />
            <span className="text-blue-600">Build your future.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500">
            We create an environment where people can experiment, learn,
            collaborate and do work they're proud of.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={{
                  opacity: 0,
                  y: 35,
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
                  duration: 0.55,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[26px] border border-white bg-white p-7 shadow-[0_15px_45px_rgba(30,64,175,0.07)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(37,99,235,0.14)]"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100/50 blur-3xl transition-all duration-500 group-hover:bg-blue-200/60" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="relative mt-7 text-lg font-semibold text-[#17233d]">
                  {benefit.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}