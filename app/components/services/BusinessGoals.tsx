"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import ServicePreview from "./ServicePreview";

const goals = [
  {
    id: 1,
    title: "I Need a Professional Website",
    icon: Globe,
    color: "from-sky-500 to-cyan-500",
    description:
      "Build trust, attract customers, and showcase your business online.",
    features: [
      "Modern Responsive Design",
      "Google SEO Ready",
      "Fast Loading Speed",
      "Contact & Inquiry Forms",
    ],
  },

  {
    id: 2,
    title: "I Want a Mobile App",
    icon: Smartphone,
    color: "from-indigo-500 to-sky-500",
    description:
      "Give customers instant access to your services from anywhere.",
    features: [
      "Android & iPhone",
      "Push Notifications",
      "Easy Updates",
      "Secure Login",
    ],
  },

  {
    id: 3,
    title: "I Want to Automate My Business",
    icon: Bot,
    color: "from-cyan-500 to-sky-600",
    description:
      "Reduce repetitive work and save time with smart automation.",
    features: [
      "AI Assistants",
      "WhatsApp Automation",
      "Email Automation",
      "Workflow Automation",
    ],
  },

  {
    id: 4,
    title: "I Want More Customers",
    icon: TrendingUp,
    color: "from-sky-600 to-indigo-500",
    description:
      "Increase your online visibility and bring more people to your business.",
    features: [
      "Search Engine Optimization",
      "Google Advertising",
      "Social Media Marketing",
      "Brand Growth",
    ],
  },

  {
    id: 5,
    title: "I Need Business Software",
    icon: BarChart3,
    color: "from-indigo-600 to-cyan-500",
    description:
      "Manage sales, inventory, customers, and reports in one place.",
    features: [
      "Sales Management",
      "Inventory Management",
      "Customer Management",
      "Business Reports",
    ],
  },

  {
    id: 6,
    title: "I Need Expert Advice",
    icon: ShieldCheck,
    color: "from-sky-500 to-indigo-600",
    description:
      "Not sure where to start? We'll help you choose the right solution.",
    features: [
      "Business Planning",
      "Technology Roadmap",
      "Team Training",
      "Ongoing Support",
    ],
  },
];

export default function BusinessGoals() {
  const [active, setActive] = useState(goals[0]);

  return (
    <section className="mt-20">

      {/* SECTION INTRO */}

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
        className="mb-10 text-center"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
          Start with your goal
        </p>

        <h3 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
          What would you like to achieve?
        </h3>

        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          You don't need to understand technology. Just tell us what you want
          your business to achieve.
        </p>
      </motion.div>

      {/* MAIN EXPERIENCE */}

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">

        {/* GOALS */}

        <div className="space-y-3">

          {goals.map((goal) => {
            const Icon = goal.icon;

            const isActive = active.id === goal.id;

            return (
              <motion.button
                key={goal.id}
                onClick={() => setActive(goal)}
                whileHover={{
                  x: isActive ? 0 : 5,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-sky-300 bg-white shadow-lg shadow-sky-100"
                    : "border-slate-200/80 bg-white/60 hover:border-sky-200 hover:bg-white"
                }`}
              >

                {/* Active indicator */}

                {isActive && (
                  <motion.div
                    layoutId="activeGoal"
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-400 to-indigo-500"
                  />
                )}

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${goal.color} text-white shadow-lg`
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0">

                    <h4
                      className={`text-sm font-bold ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-700"
                      }`}
                    >
                      {goal.title}
                    </h4>

                    <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                      {goal.description}
                    </p>

                  </div>

                </div>

              </motion.button>
            );
          })}

        </div>

        {/* PREVIEW */}

        <div className="min-w-0">

          <AnimatePresence mode="wait">
            <ServicePreview
              key={active.id}
              goal={active}
            />
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}