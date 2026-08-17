"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Neirah Tech transformed our idea into a reliable digital product. Their team understood our requirements quickly and delivered beyond our expectations.",
    name: "Sarah Johnson",
    role: "Founder & CEO",
    company: "TechVision",
    initials: "SJ",
  },
  {
    quote:
      "What impressed us most was their ability to combine great design with solid engineering. The final product feels modern, fast and incredibly easy to use.",
    name: "Daniel Perera",
    role: "Product Manager",
    company: "Nova Solutions",
    initials: "DP",
  },
  {
    quote:
      "From the first discussion to the final delivery, the Neirah Tech team was professional, responsive and genuinely invested in our success.",
    name: "Michael Fernando",
    role: "Managing Director",
    company: "DigitalWave",
    initials: "MF",
  },
  {
    quote:
      "We needed a technology partner who could understand our business, not just write code. Neirah Tech delivered exactly that.",
    name: "Emily Wilson",
    role: "Operations Director",
    company: "SmartCore",
    initials: "EW",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  const previous = () => {
    setActive(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  // Automatic carousel
  useEffect(() => {
    const timer = setInterval(next, 5500);

    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F7FAFF] px-6 py-24 sm:px-8 lg:px-10"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-blue-300/15 blur-[120px]" />

        <div className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-cyan-300/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

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
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Client Stories
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#14213D] sm:text-4xl lg:text-5xl">
            What our clients
            <br />
            <span className="text-blue-600">say about us.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            We build long-term partnerships by turning ideas into
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* =================================================
            TESTIMONIAL
        ================================================= */}

        <div className="relative mx-auto mt-14 max-w-5xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -40,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white
                bg-white/90
                p-7
                shadow-[0_25px_80px_rgba(30,64,175,0.10)]
                backdrop-blur-xl
                sm:p-10
                lg:p-14
              "
            >

              {/* Decorative quote */}
              <div
                className="
                  absolute
                  -right-5
                  -top-5
                  text-[180px]
                  font-serif
                  leading-none
                  text-blue-50
                  select-none
                "
              >
                "
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">

                {/* LEFT */}
                <div>

                  {/* Stars */}
                  <div className="mb-7 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={17}
                        className="fill-blue-500 text-blue-500"
                      />
                    ))}
                  </div>

                  {/* Quote icon */}
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Quote size={21} />
                  </div>

                  <blockquote className="max-w-2xl text-xl font-medium leading-8 tracking-tight text-[#17233d] sm:text-2xl lg:text-[26px] lg:leading-10">
                    “{testimonial.quote}”
                  </blockquote>

                  {/* Person */}
                  <div className="mt-9 flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-400
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-blue-200
                      "
                    >
                      {testimonial.initials}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#17233d]">
                        {testimonial.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>

                  </div>
                </div>

                {/* RIGHT */}
                <div className="relative hidden lg:block">

                  <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">

                      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_15px_40px_rgba(37,99,235,0.12)]">

                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg">
                        <Quote size={34} />
                      </div>

                    </div>

                  </div>

                  {/* orbit */}
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500" />

                    <span className="absolute bottom-6 right-8 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  </motion.div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* =================================================
              ARROWS
          ================================================= */}

          <button
            onClick={previous}
            aria-label="Previous testimonial"
            className="
              absolute
              left-0
              top-1/2
              z-10
              flex
              h-11
              w-11
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-blue-600
              shadow-lg
              transition-all
              hover:bg-blue-600
              hover:text-white
              sm:h-12
              sm:w-12
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="
              absolute
              right-0
              top-1/2
              z-10
              flex
              h-11
              w-11
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-blue-600
              shadow-lg
              transition-all
              hover:bg-blue-600
              hover:text-white
              sm:h-12
              sm:w-12
            "
          >
            <ArrowRight size={18} />
          </button>

        </div>

        {/* =================================================
            DOTS
        ================================================= */}

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`View testimonial ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  index === active
                    ? "w-7 bg-blue-600"
                    : "w-2 bg-slate-300 hover:bg-blue-300"
                }
              `}
            />
          ))}
        </div>

        {/* =================================================
            TRUST TEXT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Trusted by businesses building what's next
          </p>
        </motion.div>

      </div>
    </section>
  );
}