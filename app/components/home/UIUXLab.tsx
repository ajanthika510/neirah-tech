"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  Palette,
  Smartphone,
  Zap,
  Wrench,
  MousePointer2,
  Layers3,
  Sparkles,
  Eye,
  type LucideIcon,
} from "lucide-react";

import { useRef } from "react";

/* =========================================================
   DATA
========================================================= */

const principles = [
  {
    icon: Palette,
    number: "01",
    title: "Beautiful by Design",
    description:
      "Clean, modern interfaces that make your business look professional and memorable.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Works Everywhere",
    description:
      "Experiences designed to feel natural on phones, tablets, laptops, and desktops.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Fast & Smooth",
    description:
      "Thoughtful interactions and lightweight experiences that keep visitors engaged.",
  },
  {
    icon: Wrench,
    number: "04",
    title: "Made for Your Business",
    description:
      "Every screen is designed around your customers, goals, and business needs.",
  },
];

const projects = [
  {
    number: "01",
    title: "Travel Experience",
    category: "Tourism",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    number: "02",
    title: "Commerce Platform",
    category: "E-Commerce",
    gradient: "from-indigo-400 to-blue-600",
  },
  {
    number: "03",
    title: "Business Dashboard",
    category: "Business",
    gradient: "from-cyan-400 to-sky-500",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function UIUXLab() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateX = useTransform(
    smoothY,
    [-400, 400],
    [6, -6]
  );

  const rotateY = useTransform(
    smoothX,
    [-600, 600],
    [-6, 6]
  );

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect =
      sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      e.clientX - rect.left - rect.width / 2
    );

    mouseY.set(
      e.clientY - rect.top - rect.height / 2
    );
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="uiux-lab"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#F8FAFC] text-[#0F172A]"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FF] to-[#EEF2FF]" />

      {/* Grid */}

      <div
        className="
          absolute inset-0
          opacity-[0.45]
          bg-[linear-gradient(rgba(14,165,233,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.06)_1px,transparent_1px)]
          bg-[size:65px_65px]
        "
      />

      {/* =====================================================
          AMBIENT GLOWS
      ===================================================== */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-48
          top-20
          h-[450px]
          w-[450px]
          rounded-full
          bg-sky-400/15
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-150px]
          top-[35%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-400/10
          blur-[130px]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8">

        {/* ===================================================
            HERO
        =================================================== */}

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* Label */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#BAE6FD]
                bg-white/70
                px-5
                py-2.5
                text-sm
                font-bold
                text-[#2563EB]
                shadow-[0_8px_30px_rgba(14,165,233,.08)]
                backdrop-blur-xl
              "
            >

              <span className="relative flex h-2.5 w-2.5">

                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[#22D3EE]
                    opacity-70
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#0EA5E9]
                  "
                />

              </span>

              UI / UX LAB

            </motion.div>

            {/* Heading */}

            <h2
              className="
                mt-8
                text-5xl
                font-black
                leading-[1.02]
                tracking-tight
                text-[#0F172A]
                sm:text-6xl
                lg:text-7xl
              "
            >

              We don't just

              <span className="block">
                design screens.
              </span>

              <span
                className="
                  mt-2
                  block
                  bg-gradient-to-r
                  from-[#0EA5E9]
                  via-[#22D3EE]
                  to-[#6366F1]
                  bg-clip-text
                  text-transparent
                "
              >
                We design experiences.
              </span>

            </h2>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-xl
                text-lg
                leading-8
                text-[#475569]
              "
            >
              From the first click to the final conversion,
              we design digital experiences that are beautiful,
              simple, and built around how real people use
              your business.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-wrap gap-4">

              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 15px 40px rgba(14,165,233,.25)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#0EA5E9]
                  px-7
                  py-4
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(14,165,233,.2)]
                "
              >
                Explore Our Work

                <ArrowUpRight
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                className="
                  rounded-full
                  border
                  border-[#BAE6FD]
                  bg-white/70
                  px-7
                  py-4
                  font-semibold
                  text-[#2563EB]
                  shadow-sm
                  backdrop-blur-xl
                  transition
                  hover:bg-white
                "
              >
                Our Process
              </motion.button>

            </div>

            {/* Stats */}

            <div
              className="
                mt-12
                grid
                grid-cols-2
                gap-x-8
                gap-y-6
                border-t
                border-[#E2E8F0]
                pt-8
                sm:grid-cols-4
              "
            >

              <Stat
                value="30+"
                label="Websites"
              />

              <Stat
                value="7+"
                label="Industries"
              />

              <Stat
                value="98%"
                label="Satisfaction"
              />

              <Stat
                value="11+"
                label="Years"
              />

            </div>

          </motion.div>

          {/* =================================================
              INTERACTIVE DESIGN CANVAS
          ================================================= */}

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
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
              duration: 1,
            }}
            className="
              relative
              mx-auto
              h-[560px]
              w-full
              max-w-[620px]
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                inset-16
                rounded-full
                bg-sky-400/20
                blur-[100px]
              "
            />

            {/* Main canvas */}

            <div
              className="
                absolute
                inset-4
                overflow-hidden
                rounded-[40px]
                border
                border-white/80
                bg-white/65
                shadow-[0_30px_90px_rgba(15,23,42,.12)]
                backdrop-blur-2xl
              "
            >

              {/* Browser top */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#E2E8F0]
                  bg-white/50
                  px-6
                  py-5
                "
              >

                <div className="flex gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />

                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-5
                    py-1.5
                    text-xs
                    font-medium
                    text-[#64748B]
                    shadow-sm
                  "
                >
                  neirahtech.design
                </div>

                <div className="w-12" />

              </div>

              {/* Canvas */}

              <div className="relative h-full p-8">

                {/* Browser */}

                <FloatingBrowser />

                {/* Phone */}

                <FloatingPhone />

                {/* Center */}

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    z-20
                    w-[215px]
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >

                  <div
                    className="
                      rounded-[28px]
                      border
                      border-[#BAE6FD]
                      bg-white/90
                      p-5
                      shadow-[0_25px_60px_rgba(37,99,235,.15)]
                      backdrop-blur-2xl
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-[#0EA5E9]
                          to-[#6366F1]
                          text-white
                          shadow-lg
                        "
                      >
                        <Layers3 size={22} />
                      </div>

                      <div>

                        <p className="text-sm font-bold text-[#0F172A]">
                          Design System
                        </p>

                        <p className="text-[10px] text-[#64748B]">
                          Building consistency
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 space-y-3">

                      <div className="h-2 rounded-full bg-[#E2E8F0]">

                        <motion.div
                          animate={{
                            width: [
                              "30%",
                              "80%",
                              "55%",
                              "75%",
                            ],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                          }}
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-[#0EA5E9]
                            to-[#22D3EE]
                          "
                        />

                      </div>

                      <div className="h-2 w-[70%] rounded-full bg-[#E2E8F0]" />

                      <div className="h-2 w-[45%] rounded-full bg-[#E2E8F0]" />

                    </div>

                  </div>

                </motion.div>

                {/* User First */}

                <FloatingTag
                  icon={Eye}
                  text="User First"
                  className="bottom-20 left-8"
                  delay={0}
                />

                {/* Pixel Perfect */}

                <FloatingTag
                  icon={Sparkles}
                  text="Pixel Perfect"
                  className="right-7 top-32"
                  delay={0.8}
                />

                {/* Cursor */}

                <motion.div
                  animate={{
                    x: [0, 90, 40, 120, 0],
                    y: [0, -40, 60, 20, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    left-[35%]
                    top-[42%]
                    z-30
                  "
                >

                  <MousePointer2
                    size={30}
                    fill="#0F172A"
                    className="text-[#0F172A] drop-shadow-lg"
                  />

                </motion.div>

              </div>

            </div>

            {/* Decorative rings */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-0
                top-20
                h-20
                w-20
                rounded-3xl
                border
                border-[#BAE6FD]
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                bottom-10
                right-0
                h-16
                w-16
                rounded-full
                border
                border-[#BAE6FD]
              "
            />

          </motion.div>

        </div>

        {/* ===================================================
            DESIGN APPROACH
        =================================================== */}

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
          }}
          className="mt-36"
        >

          <div className="mx-auto max-w-3xl text-center">

            <span
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#0EA5E9]
              "
            >
              HOW WE DESIGN
            </span>

            <h3
              className="
                mt-5
                text-4xl
                font-black
                text-[#0F172A]
                sm:text-5xl
              "
            >
              Beautiful is only

              <span
                className="
                  ml-2
                  bg-gradient-to-r
                  from-[#0EA5E9]
                  to-[#6366F1]
                  bg-clip-text
                  text-transparent
                "
              >
                the beginning.
              </span>
            </h3>

            <p
              className="
                mt-5
                text-lg
                leading-8
                text-[#475569]
              "
            >
              Every decision has a purpose. We combine visual
              design, usability, performance, and business
              thinking to create experiences people actually
              enjoy using.
            </p>

          </div>

          {/* Principle Cards */}

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {principles.map((item, index) => (
              <PrincipleCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}

          </div>

        </motion.div>

        {/* ===================================================
            SELECTED WORK
        =================================================== */}

        <div className="mt-36">

          <div
            className="
              flex
              flex-col
              justify-between
              gap-6
              sm:flex-row
              sm:items-end
            "
          >

            <div>

              <span
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#0EA5E9]
                "
              >
                SELECTED WORK
              </span>

              <h3
                className="
                  mt-4
                  text-4xl
                  font-black
                  text-[#0F172A]
                  sm:text-5xl
                "
              >
                From idea

                <span className="text-[#2563EB]">
                  {" "}to interface.
                </span>
              </h3>

            </div>

            <button
              className="
                flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#2563EB]
                transition
                hover:text-[#0EA5E9]
              "
            >
              View all projects
              <ArrowUpRight size={17} />
            </button>

          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">

            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>

      <p
        className="
          text-2xl
          font-black
          text-[#0EA5E9]
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-xs
          font-medium
          text-[#64748B]
        "
      >
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   FLOATING BROWSER
========================================================= */

function FloatingBrowser() {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [-2, 1, -2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        left-7
        top-14
        z-10
        w-[230px]
        rounded-2xl
        border
        border-[#E2E8F0]
        bg-white/90
        p-3
        shadow-[0_25px_50px_rgba(15,23,42,.12)]
        backdrop-blur-xl
      "
    >

      <div className="mb-3 flex gap-1.5">

        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

      </div>

      <div
        className="
          h-28
          rounded-xl
          bg-gradient-to-br
          from-[#E0F2FE]
          to-[#EEF2FF]
          p-4
        "
      >

        <div className="h-3 w-20 rounded bg-[#0EA5E9]/70" />

        <div className="mt-3 h-2 w-28 rounded bg-[#94A3B8]/40" />

        <div className="mt-6 flex gap-2">

          <div className="h-10 flex-1 rounded-lg bg-white shadow-sm" />

          <div className="h-10 flex-1 rounded-lg bg-[#0EA5E9]/20" />

        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   FLOATING PHONE
========================================================= */

function FloatingPhone() {
  return (
    <motion.div
      animate={{
        y: [0, 18, 0],
        rotate: [4, 7, 4],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        bottom-10
        right-12
        z-20
        w-[145px]
        rounded-[25px]
        border
        border-[#BAE6FD]
        bg-white
        p-2
        shadow-[0_30px_60px_rgba(15,23,42,.15)]
      "
    >

      <div
        className="
          rounded-[19px]
          bg-gradient-to-b
          from-[#E0F2FE]
          to-[#EEF2FF]
          p-4
        "
      >

        <div className="mx-auto h-1.5 w-10 rounded-full bg-[#94A3B8]/40" />

        <div className="mt-7 h-16 rounded-xl bg-white shadow-sm" />

        <div className="mt-3 space-y-2">

          <div className="h-2 w-16 rounded bg-[#0EA5E9]/60" />

          <div className="h-2 w-20 rounded bg-[#94A3B8]/30" />

          <div className="h-8 rounded-lg bg-[#0EA5E9]/20" />

        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   FLOATING TAG
========================================================= */

function FloatingTag({
  icon: Icon,
  text,
  className,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        z-30
        flex
        items-center
        gap-2
        rounded-full
        border
        border-[#BAE6FD]
        bg-white/90
        px-4
        py-2
        text-xs
        font-bold
        text-[#2563EB]
        shadow-[0_12px_30px_rgba(14,165,233,.12)]
        backdrop-blur-xl
        ${className}
      `}
    >

      <Icon
        size={14}
        className="text-[#0EA5E9]"
      />

      {text}

    </motion.div>
  );
}

/* =========================================================
   PRINCIPLE CARD
========================================================= */

function PrincipleCard({
  item,
  index,
}: {
  item: (typeof principles)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
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
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#E2E8F0]
        bg-white/75
        p-7
        shadow-[0_15px_40px_rgba(15,23,42,.05)]
        backdrop-blur-xl
        transition-shadow
        hover:shadow-[0_20px_50px_rgba(14,165,233,.12)]
      "
    >

      {/* Hover glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#22D3EE]/10
          blur-2xl
          transition
          duration-500
          group-hover:bg-[#0EA5E9]/20
        "
      />

      {/* Icon */}

      <div
        className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-[#E0F2FE]
          to-[#EEF2FF]
          text-[#0EA5E9]
          ring-1
          ring-[#BAE6FD]
        "
      >
        <Icon size={26} />
      </div>

      <h4
        className="
          mt-7
          text-xl
          font-bold
          text-[#0F172A]
        "
      >
        {item.title}
      </h4>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-[#64748B]
        "
      >
        {item.description}
      </p>

      <div
        className="
          mt-7
          h-px
          w-full
          bg-gradient-to-r
          from-[#BAE6FD]
          to-transparent
        "
      />

      <span
        className="
          mt-5
          block
          text-xs
          font-black
          tracking-widest
          text-[#CBD5E1]
        "
      >
        {item.number}
      </span>

    </motion.div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
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
      }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
      }}
      whileHover={{
        y: -10,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-[#E2E8F0]
        bg-white
        shadow-[0_15px_40px_rgba(15,23,42,.05)]
        transition-shadow
        hover:shadow-[0_25px_60px_rgba(14,165,233,.14)]
      "
    >

      {/* Visual */}

      <div
        className={`
          relative
          h-[300px]
          overflow-hidden
          bg-gradient-to-br
          ${project.gradient}
          p-6
        `}
      >

        {/* white glow */}

        <div
          className="
            absolute
            -right-10
            -top-10
            h-40
            w-40
            rounded-full
            bg-white/20
            blur-3xl
          "
        />

        {/* Browser */}

        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: -1,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          className="
            relative
            mx-auto
            mt-8
            h-[205px]
            max-w-[280px]
            rounded-t-[20px]
            border
            border-white/60
            bg-white/95
            p-3
            shadow-[0_25px_50px_rgba(15,23,42,.2)]
          "
        >

          <div className="flex gap-1.5">

            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

          </div>

          <div
            className="
              mt-3
              grid
              grid-cols-[55px_1fr]
              gap-3
            "
          >

            <div className="space-y-2">

              <div className="h-2 rounded bg-[#E2E8F0]" />

              <div className="h-2 rounded bg-[#E2E8F0]" />

              <div className="h-2 rounded bg-[#E2E8F0]" />

              <div className="h-8 rounded-lg bg-[#E0F2FE]" />

            </div>

            <div>

              <div className="h-8 rounded-lg bg-[#E0F2FE]" />

              <div className="mt-3 grid grid-cols-2 gap-2">

                <div className="h-14 rounded-lg bg-[#F1F5F9]" />

                <div className="h-14 rounded-lg bg-[#DBEAFE]" />

              </div>

              <div className="mt-2 h-10 rounded-lg bg-[#E0F2FE]" />

            </div>

          </div>

        </motion.div>

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <span
              className="
                text-xs
                font-black
                uppercase
                tracking-widest
                text-[#0EA5E9]
              "
            >
              {project.category}
            </span>

            <h4
              className="
                mt-2
                text-xl
                font-bold
                text-[#0F172A]
              "
            >
              {project.title}
            </h4>

          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#E2E8F0]
              bg-[#F8FAFC]
              text-[#2563EB]
              transition
              duration-300
              group-hover:border-[#0EA5E9]
              group-hover:bg-[#0EA5E9]
              group-hover:text-white
            "
          >
            <ArrowUpRight size={18} />
          </div>

        </div>

        <span
          className="
            mt-6
            block
            text-xs
            font-black
            text-[#CBD5E1]
          "
        >
          / {project.number}
        </span>

      </div>

    </motion.div>
  );
}