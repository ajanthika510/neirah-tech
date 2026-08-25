"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Globe2,
  Headphones,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { sendContactMessage } from "../../actions/contactActions";

const colors = {
  navy: "#0B1736",
  blue: "#0EA5E9",
  cyan: "#06B6D4",
  royal: "#2563EB",
  indigo: "#4F46E5",
  muted: "#52627A",
  bg: "#F7FCFF",
};

const services = [
  "Business Website",
  "Mobile Apps",
  "AI Assistant",
  "Digital Marketing",
  "Business Software",
  "Consulting",
  "Smart Devices & IoT",
  "Innovation Lab",
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ContactInfo {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  value: string;
  description: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email us",
    value: "info@neirahtech.com",
    description: "Send us your idea anytime.",
    href: "mailto:info@neirahtech.com",
  },
  {
    icon: Phone,
    title: "Call us",
    value: "+94 76 004 1594",
    description: "Let's talk about your project.",
    href: "tel:+94760041594",
  },
  {
    icon: MapPin,
    title: "Our location",
    value: "Sri Lanka",
    description: "Serving clients around the world.",
    href: "#contact-form",
  },
];

export default function Contact() {
  const [selectedService, setSelectedService] = useState(
    "Software Development"
  );

  const [submitted, setSubmitted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 100,
    damping: 25,
  });

  const springY = useSpring(mouseY, {
    stiffness: 100,
    damping: 25,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setSubmitted(true);

    try {
      await sendContactMessage({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        company: String(formData.get("company") || ""),
        service: selectedService,
        message: String(formData.get("message") || ""),
      });
      form.reset();
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }

  return (
    <main className="relative overflow-hidden bg-[#F7FCFF] text-[#0B1736]">
      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-24"
      >
        {/* Background grid */}

        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Mouse glow */}

        <motion.div
          className="pointer-events-none absolute h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px]"
          style={{
            left: springX,
            top: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Large ambient glows */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-sky-400/15 blur-[120px] sm:h-[500px] sm:w-[500px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-400/15 blur-[130px] sm:h-[520px] sm:w-[520px]"
        />

        {/* Floating dots */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-[#0EA5E9]"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute right-[12%] top-[28%] h-3 w-3 rounded-full bg-[#4F46E5]"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            {/* ===================================================== */}
            {/* LEFT HERO CONTENT */}
            {/* ===================================================== */}

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative z-20"
            >
              {/* Badge */}

              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-bold text-[#2563EB] shadow-[0_10px_30px_rgba(37,99,235,.08)] backdrop-blur-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4] opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#06B6D4]" />
                  </span>

                  LET&apos;S START A CONVERSATION
                </div>
              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={fadeUp}
                className="mt-7 max-w-3xl text-[2.65rem] font-black leading-[1.08] tracking-[-0.04em] text-[#0B1736] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Let&apos;s build
                <span className="block bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#4F46E5] bg-clip-text pb-1 text-transparent">
                  something smart
                </span>
                together.
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-7 text-[#52627A] sm:text-lg sm:leading-8"
              >
                Have an idea, a business challenge, or a digital product in
                mind? Tell us what you are trying to achieve. We&apos;ll help
                you find a practical way forward.
              </motion.p>

              {/* Proof points */}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  ["10+", "Years of experience"],
                  ["11+", "Countries served"],
                  ["1", "Connected team"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl"
                  >
                    <div className="text-xl font-black text-[#0B1736]">
                      {number}
                    </div>

                    <div className="mt-0.5 text-xs font-medium text-[#52627A]">
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Small reassurance */}

              <motion.div
                variants={fadeUp}
                className="mt-7 flex items-center gap-3 text-sm text-[#52627A]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2
                    size={17}
                    strokeWidth={2.5}
                    className="text-emerald-500"
                  />
                </div>

                <span>No pressure. Just a conversation about your idea.</span>
              </motion.div>
            </motion.div>

            {/* ===================================================== */}
            {/* RIGHT ANIMATED VISUAL */}
            {/* ===================================================== */}

            <div className="relative min-h-[390px] sm:min-h-[470px] lg:min-h-[560px]">
              {/* Connection rings */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0EA5E9]/15 sm:h-[390px] sm:w-[390px]"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4F46E5]/20 sm:h-[290px] sm:w-[290px]"
              />

              {/* Central glow */}

              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-[70px] sm:h-64 sm:w-64" />

              {/* Center */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border border-white/80 bg-white/90 shadow-[0_25px_70px_rgba(37,99,235,.18)] backdrop-blur-xl sm:h-32 sm:w-32 sm:rounded-[34px]"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0EA5E9] via-[#2563EB] to-[#4F46E5] text-white shadow-[0_15px_40px_rgba(37,99,235,.35)] sm:h-20 sm:w-20">
                  <MessageCircle size={30} strokeWidth={1.8} />

                  <motion.span
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-2xl border-2 border-sky-400"
                  />
                </div>
              </motion.div>

              {/* Connection lines */}

              <div className="absolute left-1/2 top-1/2 h-px w-[75%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] bg-gradient-to-r from-transparent via-[#0EA5E9]/40 to-transparent" />

              <div className="absolute left-1/2 top-1/2 h-px w-[75%] -translate-x-1/2 -translate-y-1/2 -rotate-[28deg] bg-gradient-to-r from-transparent via-[#4F46E5]/40 to-transparent" />

              {/* Card 1 */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-3, -1, -3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-[10%] z-10 w-[190px] rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_20px_50px_rgba(37,99,235,.12)] backdrop-blur-xl sm:left-[2%] sm:w-[220px] sm:rounded-3xl sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#0EA5E9]">
                    <Lightbulb size={20} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">
                      Your idea
                    </div>

                    <div className="text-xs text-[#52627A]">
                      Starts here
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-sky-50">
                  <motion.div
                    animate={{
                      width: ["20%", "80%", "45%", "90%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]"
                  />
                </div>
              </motion.div>

              {/* Card 2 */}

              <motion.div
                animate={{
                  y: [0, 14, 0],
                  rotate: [3, 1, 3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[8%] right-0 z-10 w-[205px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_50px_rgba(79,70,229,.13)] backdrop-blur-xl sm:right-[1%] sm:w-[235px] sm:rounded-3xl sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                    <Rocket size={20} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#0B1736]">
                      Our solution
                    </div>

                    <div className="text-xs text-[#52627A]">
                      Built to grow
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.div
                      key={item}
                      animate={{
                        height: [8, 18, 12, 22, 8],
                      }}
                      transition={{
                        duration: 2,
                        delay: item * 0.12,
                        repeat: Infinity,
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#2563EB] to-[#06B6D4]"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Small floating chip */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                }}
                className="absolute right-[5%] top-[8%] flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 text-xs font-semibold text-[#2563EB] shadow-lg backdrop-blur-xl sm:right-[8%]"
              >
                <Sparkles size={14} />
                Connected
              </motion.div>

              {/* Small node */}

              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute bottom-[20%] left-[12%] h-3 w-3 rounded-full bg-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,.7)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT FORM */}
      {/* ========================================================= */}

      <section className="relative px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          {/* LEFT INFO */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeUp}>
              <span className="text-sm font-black tracking-[0.2em] text-[#0EA5E9]">
                GET IN TOUCH
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0B1736] sm:text-4xl">
                Tell us what you&apos;re
                <span className="block text-[#2563EB]">
                  thinking about.
                </span>
              </h2>

              <p className="mt-5 max-w-md leading-7 text-[#52627A]">
                You don&apos;t need to know exactly what you need. Give us the
                situation, the problem, or simply the idea. We&apos;ll help
                make sense of it together.
              </p>
            </motion.div>

            {/* Contact cards */}

            <div className="mt-8 space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.title}
                    href={item.href || "#"}
                    variants={fadeUp}
                    whileHover={{
                      x: 6,
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_40px_rgba(11,23,54,.05)] transition-shadow hover:shadow-[0_18px_50px_rgba(37,99,235,.1)] sm:p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 text-[#2563EB] transition-transform group-hover:scale-105">
                      <Icon size={21} strokeWidth={2} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#0B1736]">
                        {item.title}
                      </div>

                      <div className="mt-0.5 truncate text-sm font-semibold text-[#2563EB]">
                        {item.value}
                      </div>

                      <div className="mt-0.5 text-xs text-[#52627A]">
                        {item.description}
                      </div>
                    </div>

                    <ArrowRight
                      size={17}
                      className="ml-auto shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#2563EB]"
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Response time */}

            <motion.div
              variants={fadeUp}
              className="mt-5 flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4"
            >
              <Clock3
                size={20}
                className="shrink-0 text-[#0EA5E9]"
              />

              <div>
                <div className="text-sm font-bold text-[#0B1736]">
                  Quick response
                </div>

                <div className="text-xs leading-5 text-[#52627A]">
                  We&apos;ll get back to you as soon as possible.
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ===================================================== */}
          {/* FORM */}
          {/* ===================================================== */}

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
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-sky-200/30 via-transparent to-indigo-200/30 blur-2xl" />

            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="relative scroll-mt-28 rounded-[28px] border border-white bg-white p-5 shadow-[0_25px_80px_rgba(11,23,54,.08)] sm:rounded-[32px] sm:p-8 lg:p-10"
            >
              {/* Form heading */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-black text-[#0B1736] sm:text-2xl">
                    Start a conversation
                  </div>

                  <p className="mt-1 text-sm text-[#52627A]">
                    A few details are enough to get started.
                  </p>
                </div>

                <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 text-[#2563EB] sm:flex">
                  <Send size={19} />
                </div>
              </div>

              {/* Inputs */}

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-[#0B1736]"
                  >
                    Your name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Smith"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFCFF] px-4 text-sm text-[#0B1736] outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-[#0B1736]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFCFF] px-4 text-sm text-[#0B1736] outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-bold text-[#0B1736]"
                >
                  Company
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAFCFF] px-4 text-sm text-[#0B1736] outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Services */}

              <div className="mt-7">
                <div className="mb-3 text-sm font-bold text-[#0B1736]">
                  What can we help with?
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {services.map((service) => {
                    const active = selectedService === service;

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                          active
                            ? "border-[#0EA5E9] bg-sky-50 text-[#2563EB] shadow-sm"
                            : "border-slate-200 bg-white text-[#52627A] hover:border-sky-200 hover:bg-sky-50/50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              active
                                ? "border-[#0EA5E9] bg-[#0EA5E9]"
                                : "border-slate-300"
                            }`}
                          >
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>

                          {service}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-[#0B1736]"
                >
                  Tell us a little about it
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you trying to build, improve, or solve?"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-[#FAFCFF] p-4 text-sm leading-6 text-[#0B1736] outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Submit */}

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="mt-6 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#4F46E5] px-6 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(37,99,235,.25)] transition-shadow hover:shadow-[0_18px_45px_rgba(37,99,235,.35)]"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={19} />
                    Message ready to send
                  </>
                ) : (
                  <>
                    Send your message
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By sending this message, you&apos;re simply starting a
                conversation with our team.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHAT HAPPENS NEXT */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/60 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
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
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-sm font-black tracking-[0.2em] text-[#0EA5E9]">
              WHAT HAPPENS NEXT
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0B1736] sm:text-4xl">
              Simple from the
              <span className="text-[#2563EB]"> first conversation.</span>
            </h2>

            <p className="mt-4 leading-7 text-[#52627A]">
              No complicated process. Just a clear path from your idea to the
              right solution.
            </p>
          </motion.div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            {/* Connecting line */}

            <div className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-[#0EA5E9]/20 via-[#2563EB]/40 to-[#4F46E5]/20 md:block" />

            {[
              {
                number: "01",
                icon: MessageCircle,
                title: "We listen",
                text: "You tell us about the challenge, idea, or goal.",
              },
              {
                number: "02",
                icon: Lightbulb,
                title: "We explore",
                text: "Together we identify the simplest useful solution.",
              },
              {
                number: "03",
                icon: Rocket,
                title: "We move",
                text: "Our team turns the plan into something real.",
              },
            ].map((step, index) => {
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
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                  }}
                  className="relative rounded-3xl border border-slate-100 bg-[#FAFCFF] p-6 text-center shadow-sm sm:p-8"
                >
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 text-[#2563EB]">
                    <Icon size={29} strokeWidth={1.8} />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1736] text-[10px] font-black text-white">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#0B1736]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#52627A]">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL CTA */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden px-5 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] bg-[#0B1736] px-6 py-12 text-center shadow-[0_30px_90px_rgba(11,23,54,.18)] sm:rounded-[40px] sm:px-10 sm:py-16">
            {/* CTA glow */}

            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0EA5E9]/25 blur-[100px]" />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#4F46E5]/20 blur-[80px]"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#67E8F9] backdrop-blur-xl">
                <Globe2 size={26} />
              </div>

              <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Your next idea could be
                <span className="block bg-gradient-to-r from-[#38BDF8] via-[#67E8F9] to-[#818CF8] bg-clip-text text-transparent">
                  the next big thing.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
                Neirah Tech Solutions brings together hardware experience,
                software expertise, and more than a decade of problem-solving
                to help businesses move forward.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0B1736] shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Start a conversation
                  <ArrowRight size={17} />
                </a>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-medium text-slate-300">
                  <Headphones size={17} className="text-[#67E8F9]" />
                  We&apos;re here to help
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}