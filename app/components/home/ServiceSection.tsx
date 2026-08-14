"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Bot,
  Smartphone,
  BarChart3,
  Megaphone,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  
} from "lucide-react";

const services = [
  {
    title: "Business Websites",
    icon: Globe,
    description:
      "Build a professional website that helps customers discover and trust your business.",
    features: [
      "Company Website",
      "Online Booking",
      "SEO Ready",
      "Fast Performance",
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    description:
      "Reduce repetitive work and save valuable time with intelligent automation.",
    features: [
      "AI Chatbot",
      "WhatsApp Automation",
      "Email Automation",
      "Task Automation",
    ],
  },
  {
    title: "Mobile Apps",
    icon: Smartphone,
    description:
      "Connect with your customers anytime through Android and iPhone applications.",
    features: [
      "Android Apps",
      "iOS Apps",
      "Cross Platform",
      "Modern UI",
    ],
  },
  {
    title: "Business Systems",
    icon: BarChart3,
    description:
      "Manage sales, inventory, customers and reports from one dashboard.",
    features: [
      "Inventory",
      "Sales",
      "Reports",
      "CRM",
    ],
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    description:
      "Reach more customers and grow your brand through online marketing.",
    features: [
      "Social Media",
      "Google Ads",
      "Facebook Ads",
      "Branding",
    ],
  },
  {
    title: "Technology Consulting",
    icon: Lightbulb,
    description:
      "We'll recommend the right technology for your business goals.",
    features: [
      "Business Analysis",
      "Planning",
      "Implementation",
      "Support",
    ],
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-indigo-50 py-28">

      {/* Background Glow */}

      <div className="absolute left-0 top-32 h-80 w-80 rounded-full bg-sky-300/30 blur-[140px]" />

      <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-indigo-300/30 blur-[160px]" />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-sky-200 bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700">
            OUR SERVICES
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Solutions That Help Your Business Grow
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We build practical digital solutions that save time,
            improve customer experience, and help your business grow.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .1,
                  duration: .6,
                }}
                whileHover={{
                  y: -12,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 backdrop-blur-xl shadow-xl transition-all duration-500"
              >

                {/* Hover Glow */}

                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-sky-400/0 to-indigo-500/0 transition-all duration-500 group-hover:from-sky-300/10 group-hover:to-indigo-400/10" />

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.12,
                  }}
                  className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_40px_rgba(14,165,233,.35)]"
                >
                  <Icon size={30} />
                </motion.div>

                <h3 className="relative text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="relative mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="relative mt-8 space-y-3">

                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        className="text-sky-500"
                        size={18}
                      />

                      <span className="text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>


                <Link
  href="/services"
  className="
    relative
    mt-10
    flex
    items-center
    gap-2
    font-semibold
    text-sky-600
    transition-all
    duration-300
    group-hover:gap-4
  "
>
  Learn More
  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          className="relative mt-28 overflow-hidden rounded-[40px] border border-white/60 bg-white/70 px-10 py-16 text-center shadow-2xl backdrop-blur-xl"
        >

          <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 via-white/20 to-indigo-100/50" />

          <div className="relative">

            <h2 className="text-4xl font-bold text-slate-900">
              Ready to Grow Your Business?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Let's discuss how technology can simplify your work,
              attract more customers, and increase your business growth.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">

              <Link href="#hero" >
              <button className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-[0_0_50px_rgba(14,165,233,.35)] transition hover:scale-105">
                Free Consultation
              </button>
              </Link>

              <Link
              href="/projects"
              className="rounded-full border-2 border-sky-500 px-8 py-4 font-semibold text-sky-600 transition hover:bg-sky-500 hover:text-white"
            >
              View Portfolio
            </Link>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}