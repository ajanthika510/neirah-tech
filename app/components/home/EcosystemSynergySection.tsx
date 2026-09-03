"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function EcosystemSynergySection() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
        rotate: -2.5,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        mx-auto
        mt-24
        mb-20
        max-w-7xl
        origin-center
        px-6
        sm:px-8
        lg:px-12
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/20
          bg-gradient-to-br
          from-slate-900/90
          via-slate-950/95
          to-indigo-950/90
          p-8
          shadow-[0_30px_90px_rgba(14,165,233,0.2)]
          backdrop-blur-2xl
          sm:p-14
          lg:p-16
        "
      >
        {/* =====================================================
            BACKGROUND GLOWS
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-sky-500/20
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-32
            h-96
            w-96
            rounded-full
            bg-indigo-500/20
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-purple-500/10
            blur-[120px]
          "
        />

        {/* =====================================================
            MAIN INTRO
        ====================================================== */}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            justify-between
            gap-10
            lg:flex-row
            lg:items-center
          "
        >
          {/* LEFT CONTENT */}

          <div
            className="
              max-w-2xl
              space-y-5
              text-left
            "
          >
            {/* LABEL */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-sky-400/30
                bg-sky-400/10
                px-4
                py-1.5
                font-mono
                text-xs
                font-bold
                text-sky-300
                shadow-sm
                backdrop-blur-md
              "
            >
              <Sparkles
                size={14}
                className="text-sky-300"
              />

              <span>THE BIGGER IDEA</span>
            </motion.div>

            {/* HEADING */}

            <h2
              className="
                text-3xl
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Neirah doesn&apos;t build
              <br className="hidden sm:block" />
              isolated products.

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-sky-400
                  via-indigo-400
                  to-purple-400
                  bg-clip-text
                  text-transparent
                "
              >
                We build technology
                <br className="hidden sm:block" />
                that connects with technology.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                max-w-xl
                pt-2
                text-sm
                leading-7
                text-stone-300
                sm:text-base
              "
            >
              That&apos;s the real Neirah story.
              One ecosystem. Many industries.
              Infinite possibilities.
            </p>
          </div>

          {/* =================================================
              NEIRO
          ================================================== */}

          <div
            className="
              relative
              flex
              shrink-0
              items-center
              justify-center
              lg:justify-end
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                relative
                h-48
                w-48
                sm:h-56
                sm:w-56
                lg:h-64
                lg:w-64
              "
            >
              {/* Glow behind Neiro */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-10
                  rounded-full
                  bg-sky-400/20
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:bg-sky-400/35
                "
              />

              <Image
                src="/images/Neiro.png"
                alt="Neirah Ecosystem Mascot"
                fill
                sizes="
                  (max-width: 640px) 192px,
                  (max-width: 1024px) 224px,
                  256px
                "
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  object-contain
                  drop-shadow-[0_16px_35px_rgba(56,189,248,0.35)]
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div
          className="
            relative
            z-10
            my-10
            h-px
            bg-gradient-to-r
            from-transparent
            via-stone-700
            to-transparent
          "
        />

        {/* =====================================================
            PRODUCT CONNECTION EXAMPLES
        ====================================================== */}

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
        >
          {/* =================================================
              RESTAURANT
          ================================================== */}

          <IndustryFlow
            label="A RESTAURANT COULD USE"
            dotColor="bg-amber-400"
            borderColor="hover:border-sky-500/40"
            items={[
              {
                name: "Lantriva",
                role: "design",
                color: "text-amber-300",
                border: "border-amber-500/30",
              },
              {
                name: "Mugilix",
                role: "business",
                color: "text-indigo-300",
                border: "border-indigo-500/30",
              },
              {
                name: "Pothify",
                role: "delivery",
                color: "text-emerald-300",
                border: "border-emerald-500/30",
              },
              {
                name: "Neirah Lab",
                role: "AI",
                color: "text-purple-300",
                border: "border-purple-500/30",
              },
              {
                name: "BrandOS",
                role: "comms",
                color: "text-lime-300",
                border: "border-lime-500/30",
              },
            ]}
          />

          {/* =================================================
              AGRICULTURE
          ================================================== */}

          <IndustryFlow
            label="AN AGRICULTURE COMPANY COULD USE"
            dotColor="bg-emerald-400"
            borderColor="hover:border-emerald-500/40"
            items={[
              {
                name: "Neirah IoT & Drone",
                role: "sensors & aerial",
                color: "text-cyan-300",
                border: "border-cyan-500/30",
              },
              {
                name: "Neirah Lab",
                role: "AI analysis",
                color: "text-purple-300",
                border: "border-purple-500/30",
              },
              {
                name: "Mugilix",
                role: "operations",
                color: "text-indigo-300",
                border: "border-indigo-500/30",
              },
            ]}
          />
        </div>

        {/* =====================================================
            FINAL STATEMENT
        ====================================================== */}

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
            delay: 0.25,
          }}
          className="
            relative
            z-10
            mt-12
            text-center
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.35em]
              text-sky-300/70
            "
          >
            One ecosystem
          </p>

          <h3
            className="
              mt-3
              text-2xl
              font-black
              tracking-[-0.04em]
              text-white
              sm:text-3xl
            "
          >
            Many industries.
            <span className="text-sky-400">
              {" "}
              Infinite possibilities.
            </span>
          </h3>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   INDUSTRY FLOW
========================================================= */

interface FlowItem {
  name: string;
  role: string;
  color: string;
  border: string;
}

function IndustryFlow({
  label,
  dotColor,
  borderColor,
  items,
}: {
  label: string;
  dotColor: string;
  borderColor: string;
  items: FlowItem[];
}) {
  return (
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
      }}
      className={`
        group
        rounded-3xl
        border
        border-stone-800
        bg-stone-900/80
        p-6
        transition-colors
        duration-500
        sm:p-8
        ${borderColor}
      `}
    >
      {/* Label */}

      <div
        className="
          mb-5
          flex
          items-center
          gap-2
          font-mono
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-stone-400
        "
      >
        <span
          className={`
            h-2
            w-2
            rounded-full
            ${dotColor}
          `}
        />

        <span>{label}</span>
      </div>

      {/* Flow */}

      <div className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${item.role}`}
            className="flex items-center gap-2"
          >
            <motion.span
              whileHover={{
                y: -3,
                scale: 1.04,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                inline-flex
                items-center
                rounded-full
                border
                bg-stone-800
                px-3.5
                py-1.5
                font-mono
                text-[10px]
                font-bold
                transition-all
                duration-300
                ${item.color}
                ${item.border}
              `}
            >
              {item.name}

              <span className="ml-1 text-stone-500">
                → {item.role}
              </span>
            </motion.span>

            {index < items.length - 1 && (
              <motion.span
                initial={{
                  opacity: 0,
                  x: -5,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="text-stone-600"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
