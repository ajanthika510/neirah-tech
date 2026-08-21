"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: "01",
    quote:
      "Neirah Tech transformed our idea into a reliable digital product. Their team understood our requirements quickly and delivered beyond our expectations.",
    name: "Sarah Johnson",
    role: "Founder & CEO",
    company: "TechVision",
    initials: "SJ",
    accent: "#2563EB",
  },
  {
    id: "02",
    quote:
      "What impressed us most was their ability to combine great design with solid engineering. The final product feels modern, fast and incredibly easy to use.",
    name: "Daniel Perera",
    role: "Product Manager",
    company: "Nova Solutions",
    initials: "DP",
    accent: "#06B6D4",
  },
  {
    id: "03",
    quote:
      "From the first discussion to the final delivery, the Neirah Tech team was professional, responsive and genuinely invested in our success.",
    name: "Michael Fernando",
    role: "Managing Director",
    company: "DigitalWave",
    initials: "MF",
    accent: "#6366F1",
  },
  {
    id: "04",
    quote:
      "We needed a technology partner who could understand our business, not just write code. Neirah Tech delivered exactly that.",
    name: "Emily Wilson",
    role: "Operations Director",
    company: "SmartCore",
    initials: "EW",
    accent: "#0891B2",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const testimonial = testimonials[active];

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-[#F8FBFF]
        px-6
        py-28
        sm:px-8
        lg:px-12
        lg:py-36
      "
    >
      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-40
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-sky-200/25
            blur-[130px]
          "
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-40
            bottom-0
            h-[520px]
            w-[520px]
            rounded-full
            bg-indigo-200/20
            blur-[140px]
          "
        />

        {/* fine grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(37,99,235,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.5)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

        {/* radial fade */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_15%,#F8FBFF_85%)]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

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
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-blue-500" />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-blue-600
                "
              >
                06 / Client Stories
              </span>
            </div>

            <h2
              className="
                mt-6
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.055em]
                text-[#14213D]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Built with
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-cyan-500
                  bg-clip-text
                  text-transparent
                "
              >
                trust.
              </span>
            </h2>
          </motion.div>

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
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="lg:pb-2 lg:pl-16"
          >
            <p className="max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              Great technology starts with understanding people.
              Here is what happens when ambitious ideas meet the
              Neirah ecosystem.
            </p>
          </motion.div>
        </div>

        {/* ===================================================
            EXPERIENCE
        =================================================== */}

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_190px]">

          {/* =================================================
              MAIN TESTIMONIAL
          ================================================= */}

          <div className="relative min-h-[520px] overflow-hidden rounded-[40px] border border-white bg-white/75 p-7 shadow-[0_35px_100px_rgba(30,64,175,0.10)] backdrop-blur-2xl sm:p-10 lg:p-14">

            {/* top metadata */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    text-[10px]
                    font-bold
                    text-blue-600
                  "
                >
                  {testimonial.id}
                </span>

                <span className="h-px w-10 bg-slate-200" />

                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-slate-400
                  "
                >
                  Client Experience
                </span>
              </div>

              <Sparkles className="h-4 w-4 text-blue-500" />

            </div>

            {/* decorative rings */}

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[360px] w-[360px] rounded-full border border-blue-100/70" />

            <div className="pointer-events-none absolute right-[-50px] top-[-50px] h-[260px] w-[260px] rounded-full border border-cyan-100/70" />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                right-[40px]
                top-[40px]
                h-[180px]
                w-[180px]
                rounded-full
                border
                border-dashed
                border-blue-200
              "
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            </motion.div>

            {/* quote */}

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  relative
                  z-10
                  mt-14
                  max-w-4xl
                "
              >
                {/* quote icon */}

                <div
                  className="
                    mb-8
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-400
                    text-white
                    shadow-[0_15px_35px_rgba(37,99,235,0.2)]
                  "
                >
                  <Quote size={21} />
                </div>

                {/* quote */}

                <blockquote
                  className="
                    text-2xl
                    font-medium
                    leading-[1.35]
                    tracking-[-0.035em]
                    text-[#17233D]
                    sm:text-3xl
                    lg:text-[40px]
                    lg:leading-[1.25]
                  "
                >
                  “{testimonial.quote}”
                </blockquote>

                {/* bottom */}

                <div
                  className="
                    mt-12
                    flex
                    flex-col
                    gap-8
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                  "
                >

                  {/* person */}

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-slate-900
                        to-blue-700
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                      "
                    >
                      {testimonial.initials}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#17233D]">
                        {testimonial.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {testimonial.role}
                      </p>

                      <p className="mt-0.5 text-xs font-medium text-blue-600">
                        {testimonial.company}
                      </p>
                    </div>

                  </div>

                  {/* rating */}

                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className="fill-blue-500 text-blue-500"
                        />
                      ))}
                    </div>

                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
                      Verified Experience
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* bottom line */}

            <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">

              <motion.div
                key={active}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 6.5,
                  ease: "linear",
                }}
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"
              />

            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="flex flex-row gap-3 lg:flex-col">

            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className={`
                  group
                  relative
                  flex
                  flex-1
                  items-center
                  gap-4
                  overflow-hidden
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition-all
                  duration-300
                  lg:flex-none
                  ${
                    index === active
                      ? "border-blue-200 bg-white shadow-[0_15px_40px_rgba(37,99,235,0.10)]"
                      : "border-transparent bg-white/40 hover:border-slate-200 hover:bg-white"
                  }
                `}
              >

                {/* active indicator */}

                <motion.div
                  initial={false}
                  animate={{
                    scaleY: index === active ? 1 : 0,
                  }}
                  className="
                    absolute
                    left-0
                    top-2
                    bottom-2
                    w-0.5
                    origin-center
                    rounded-full
                    bg-blue-600
                  "
                />

                <span
                  className={`
                    font-mono
                    text-[9px]
                    ${
                      index === active
                        ? "text-blue-600"
                        : "text-slate-400"
                    }
                  `}
                >
                  {item.id}
                </span>

                <span
                  className={`
                    hidden
                    text-xs
                    font-semibold
                    sm:block
                    lg:block
                    ${
                      index === active
                        ? "text-[#17233D]"
                        : "text-slate-400"
                    }
                  `}
                >
                  {item.company}
                </span>

              </button>
            ))}

            {/* mobile / desktop hint */}

            <div className="hidden items-center justify-center gap-2 pt-3 lg:flex">

              <ChevronDown className="h-3 w-3 text-blue-500" />

              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
                Explore Stories
              </span>

            </div>
          </div>
        </div>

        {/* ===================================================
            FOOTER TRUST
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-14
            flex
            flex-col
            items-center
            justify-between
            gap-5
            border-t
            border-slate-200/70
            pt-7
            sm:flex-row
          "
        >

          <div className="flex items-center gap-3">

            <div className="flex -space-x-2">

              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F8FBFF]
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-400
                    text-[7px]
                    font-bold
                    text-white
                  "
                >
                  {item.initials}
                </div>
              ))}

            </div>

            <span className="text-xs text-slate-400">
              Trusted by teams building what comes next.
            </span>

          </div>

          <Link
            href="/contact"
            className="group flex items-center gap-2 text-xs font-semibold text-[#17233D] transition-colors hover:text-blue-600"
          >
            <span>Let's build something meaningful</span>

            <ArrowUpRight
              size={15}
              className="
                text-blue-600
                transition-transform
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>

        </motion.div>

      </div>
    </section>
  );
}