"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const STATS = [
  ["50+", "Projects Delivered"],
  ["20+", "Happy Clients"],
  ["08+", "Years of Innovation"],
  ["30+", "Team Members"],
];

/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   FLOATING DOT
========================================================= */

function FloatingDot({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`
        pointer-events-none
        absolute
        z-20
        h-1.5
        w-1.5
        rounded-full
        bg-indigo-500
        ${className}
      `}
      animate={{
        y: [0, -8, 0],
        opacity: [0.2, 0.7, 0.2],
        scale: [0.8, 1.15, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* =========================================================
   ORGANIC AMBIENT
========================================================= */

function OrganicBlob({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      animate={{
        borderRadius: [
          "48% 52% 58% 42% / 42% 45% 55% 58%",
          "58% 42% 45% 55% / 52% 58% 42% 48%",
          "42% 58% 55% 45% / 58% 42% 58% 42%",
          "48% 52% 58% 42% / 42% 45% 55% 58%",
        ],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        opacity: {
          duration: 1.2,
          delay,
        },
        scale: {
          duration: 1.2,
          delay,
        },
        borderRadius: {
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  );
}

/* =========================================================
   HERO ORBIT
========================================================= */

function HeroOrbit() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        right-[-14%]
        top-[5%]
        hidden
        h-[560px]
        w-[560px]
        lg:block
      "
    >
      <motion.div
        className="
          absolute
          inset-[12%]
          rounded-full
          border
          border-indigo-500/[0.07]
        "
        animate={{ rotate: 360 }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="
          absolute
          inset-[27%]
          rounded-full
          border
          border-indigo-500/[0.08]
        "
        animate={{ rotate: -360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="
          absolute
          left-1/2
          top-[12%]
          h-2
          w-2
          -translate-x-1/2
          rounded-full
          bg-indigo-500
          shadow-[0_0_30px_rgba(99,102,241,0.45)]
        "
        animate={{ rotate: 360 }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "0 210px",
        }}
      />

      <div
        className="
          absolute
          inset-[42%]
          rounded-full
          bg-indigo-500/[0.05]
          blur-3xl
        "
      />
    </div>
  );
}

/* =========================================================
   FLOW PARTICLE
========================================================= */

function FlowParticle({
  progress,
  index,
}: {
  progress: any;
  index: number;
}) {
  const left = useTransform(
    progress,
    [0, 1],
    [`${18 + index * 16}%`, `${24 + index * 13}%`]
  );

  const top = useTransform(
    progress,
    [0, 1],
    [
      `${20 + Math.sin(index * 1.7) * 25}%`,
      `${65 + Math.cos(index * 1.4) * 20}%`,
    ]
  );

  return (
    <motion.span
      style={{
        left,
        top,
      }}
      className="
        absolute
        h-1
        w-1
        rounded-full
        bg-indigo-500/25
      "
    />
  );
}

/* =========================================================
   STORY THREAD
========================================================= */

function StoryThread() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
  });

  const pathLength = useTransform(
    progress,
    [0, 1],
    [0, 1]
  );

  return (
    <div
      ref={ref}
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        z-0
        h-full
        overflow-hidden
      "
    >
      <svg
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
        className="
          absolute
          left-1/2
          h-full
          w-full
          -translate-x-1/2
        "
        fill="none"
      >
        <motion.path
          d="
            M 500 0
            C 430 170, 620 290, 500 470
            C 350 680, 650 820, 500 1050
            C 360 1250, 650 1420, 500 1630
            C 350 1830, 650 2050, 500 2250
            C 390 2460, 630 2700, 500 3000
          "
          stroke="rgba(99,102,241,0.08)"
          strokeWidth="1"
          strokeDasharray="3 12"
          style={{ pathLength }}
        />
      </svg>

      {[0, 1, 2, 3, 4].map((index) => (
        <FlowParticle
          key={index}
          progress={progress}
          index={index}
        />
      ))}
    </div>
  );
}

/* =========================================================
   STORY IMAGE
========================================================= */

function StoryImage({
  src,
  alt,
  className = "",
  shape = "one",
}: {
  src: string;
  alt: string;
  className?: string;
  shape?: "one" | "two" | "three" | "four";
}) {
  const shapes = {
    one: "rounded-[54%_46%_48%_52%/46%_56%_44%_54%]",
    two: "rounded-[44%_56%_52%_48%/56%_44%_58%_42%]",
    three: "rounded-[52%_48%_42%_58%/44%_52%_48%_56%]",
    four: "rounded-[46%_54%_56%_44%/52%_42%_58%_48%]",
  };

  return (
    <motion.div
      className={`
        absolute
        overflow-hidden
        ${shapes[shape]}
        ${className}
      `}
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.025, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 48vw"
        />
      </motion.div>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.08]
          via-transparent
          to-black/[0.12]
        "
      />
    </motion.div>
  );
}

/* =========================================================
   CHAPTER
========================================================= */

function Chapter({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <Reveal>
      <div
        className="
          flex
          items-center
          justify-center
          gap-3
          text-center
          text-[9px]
          font-bold
          uppercase
          tracking-[0.25em]
          text-indigo-600
        "
      >
        <span className="h-px w-7 bg-indigo-500/40" />
        {number} / {label}
        <span className="h-px w-7 bg-indigo-500/40" />
      </div>
    </Reveal>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      className="text-center"
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
      }}
    >
      <div
        className="
          text-[2.5rem]
          font-black
          leading-none
          tracking-[-0.07em]
          text-neutral-950
          sm:text-5xl
        "
      >
        {value}
      </div>

      <div
        className="
          mt-2
          text-[8px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-neutral-400
        "
      >
        {label}
      </div>
    </motion.div>
  );
}

/* =========================================================
   PARTNER VISUAL
========================================================= */

function PartnerVisual() {
  return (
    <div
      className="
        relative
        h-[390px]
        w-full
        sm:h-[470px]
        lg:h-[500px]
      "
    >
      <StoryImage
        src="/images/story1.jpg"
        alt="Founder one"
        shape="one"
        className="
          left-[2%]
          top-[1%]
          h-[55%]
          w-[67%]
          shadow-[0_25px_70px_rgba(0,0,0,0.10)]
          sm:left-[5%]
          sm:w-[58%]
        "
      />

      <StoryImage
        src="/images/story2.jpg"
        alt="Founder two"
        shape="two"
        className="
          right-[1%]
          top-[30%]
          h-[55%]
          w-[67%]
          shadow-[0_25px_70px_rgba(0,0,0,0.10)]
          sm:right-[4%]
          sm:w-[58%]
        "
      />

      <svg
        viewBox="0 0 700 180"
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[37%]
          z-20
          h-[150px]
          w-[84%]
          overflow-visible
        "
        fill="none"
      >
        <motion.path
          d="
            M 10 90
            C 120 15, 220 165, 350 90
            C 480 15, 580 165, 690 90
          "
          stroke="rgba(79,70,229,0.42)"
          strokeWidth="1.4"
          strokeDasharray="4 9"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>

      <motion.div
        className="
          absolute
          left-1/2
          top-[45%]
          z-30
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-indigo-600
          shadow-[0_0_0_7px_rgba(99,102,241,0.08),0_0_25px_rgba(99,102,241,0.35)]
        "
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.7,
          type: "spring",
          stiffness: 180,
        }}
      />

      <div
        className="
          pointer-events-none
          select-none
          absolute
          left-[5%]
          top-[-4%]
          z-20
          text-[9px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-neutral-400
        "
      >
        FOUNDER 01
      </div>

      <div
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[-4%]
          right-[5%]
          z-20
          text-[9px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-neutral-400
        "
      >
        FOUNDER 02
      </div>

      <FloatingDot
        className="right-[7%] top-[5%]"
        delay={0.4}
      />

      <FloatingDot
        className="bottom-[10%] left-[12%]"
        delay={1.1}
      />
    </div>
  );
}

/* =========================================================
   JOURNEY VISUAL
========================================================= */

function JourneyVisual() {
  return (
    <div
      className="
        relative
        h-[390px]
        w-full
        sm:h-[460px]
        lg:h-[500px]
      "
    >
      <StoryImage
        src="/images/story3.jpg"
        alt="Hardware chapter"
        shape="three"
        className="
          right-[3%]
          top-[3%]
          h-[88%]
          w-[82%]
          shadow-[0_30px_80px_rgba(0,0,0,0.11)]
          sm:right-[5%]
          sm:w-[76%]
        "
      />

      <motion.div
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[0%]
          left-[2%]
          z-20
          max-w-[220px]
          text-left
          text-[11px]
          font-medium
          leading-relaxed
          text-neutral-400
          sm:text-sm
        "
        initial={{
          opacity: 0,
          x: -15,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Physical products were only the beginning.
      </motion.div>
    </div>
  );
}

/* =========================================================
   TURNING POINT VISUAL
========================================================= */

function TurningPointVisual() {
  return (
    <div
      className="
        relative
        h-[390px]
        w-full
        sm:h-[460px]
        lg:h-[500px]
      "
    >
      <StoryImage
        src="/images/story4.jpg"
        alt="The turning point"
        shape="four"
        className="
          left-[5%]
          top-[4%]
          h-[86%]
          w-[82%]
          shadow-[0_30px_80px_rgba(0,0,0,0.11)]
          sm:left-[8%]
          sm:w-[75%]
        "
      />

      <motion.div
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[0%]
          right-[2%]
          z-0
          text-[5rem]
          font-black
          leading-none
          tracking-[-0.1em]
          text-indigo-600/[0.06]
          sm:text-[7rem]
        "
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
      >
        04
      </motion.div>
    </div>
  );
}

/* =========================================================
   TEXT-ONLY CONTENT
========================================================= */

function CenterContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      {children}
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function StorytellingSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#fafafa]
        text-neutral-950
      "
    >
      {/* AMBIENT */}

      <OrganicBlob
        className="
          left-[-8%]
          top-[3%]
          h-[400px]
          w-[400px]
          bg-indigo-500/[0.025]
          blur-3xl
        "
      />

      <OrganicBlob
        className="
          right-[-10%]
          top-[30%]
          h-[450px]
          w-[450px]
          bg-violet-500/[0.022]
          blur-3xl
        "
        delay={0.2}
      />

      <OrganicBlob
        className="
          bottom-[18%]
          left-[-8%]
          h-[400px]
          w-[400px]
          bg-blue-500/[0.02]
          blur-3xl
        "
        delay={0.4}
      />

      <StoryThread />

      

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-12
          sm:px-10
          lg:px-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1100px]
            grid-cols-2
            gap-x-8
            gap-y-7
            border-t
            border-neutral-200
            pt-7
            sm:grid-cols-4
          "
        >
          {STATS.map(([value, label], index) => (
            <Stat
              key={label}
              value={value}
              label={label}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          BEGINNING — TEXT + IMAGE
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <div className="mx-auto max-w-[1350px]">
          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-2
              lg:gap-12
            "
          >
            {/* TEXT AREA */}

            <div className="flex flex-col items-center text-center lg:pr-8">
              <Chapter
                number="002"
                label="THE BEGINNING"
              />

              <Reveal delay={0.08}>
                <h2
                  className="
                    mt-5
                    max-w-xl
                    text-center
                    text-[clamp(2.5rem,5vw,5.25rem)]
                    font-black
                    leading-[1.05]
                    tracking-[-0.04em]
                  "
                >
                  It started with
                  
                  <br />
                  <span className="text-indigo-600">
                      two friends.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.18}>
                <p
                  className="
                    mt-6
                    max-w-md
                    text-center
                    text-sm
                    leading-relaxed
                    text-neutral-500
                    sm:text-base
                    sm:leading-7
                  "
                >
                  After years apart, two friends met
                  again and started talking about business,
                  technology, ideas, and the problems people
                  face every day.
                </p>
              </Reveal>
            </div>

            {/* IMAGE AREA */}

            <PartnerVisual />
          </div>
        </div>
      </section>

      {/* =====================================================
          IDEA — NO IMAGE = CENTER
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <CenterContent>
          <Chapter
            number="003"
            label="THE IDEA"
          />

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1100px]
                text-center
                text-[clamp(2.5rem,5.5vw,5.5rem)]
                font-black
                leading-[1.05]
                tracking-[-0.04em]
              "
            >
              Then came  a simple 
              <br />
        
              <span className="text-indigo-600">
                question.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="
                mt-6
                max-w-2xl
                text-center
                text-sm
                leading-relaxed
                text-neutral-500
                sm:text-base
                sm:leading-7
              "
            >
              What if we stopped talking about problems
              and started building practical solutions?
            </p>
          </Reveal>

          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-5
              border-t
              border-neutral-200
              pt-5
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-neutral-300
              "
            >
              THE QUESTION
            </span>

            <span
              className="
                text-sm
                font-medium
                text-neutral-700
              "
            >
              Build something useful.
            </span>
          </div>
        </CenterContent>
      </section>

      {/* =====================================================
          HARDWARE — IMAGE + TEXT
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <div className="mx-auto max-w-[1350px]">
          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-2
              lg:gap-12
            "
          >
            {/* IMAGE */}

            <JourneyVisual />

            {/* TEXT */}

            <div className="flex flex-col items-center text-center lg:pl-8">
              <Chapter
                number="004"
                label="THE FIRST CHAPTER"
              />

              <Reveal delay={0.08}>
                <h2
                  className="
                    mt-5
                    max-w-xl
                    text-center
                    text-[clamp(2.5rem,5vw,5.25rem)]
                    font-black
                    leading-[1.05]
                    tracking-[-0.04em]
                  "
                >
                  Hardware
                  <br />
                  was the
                  <br />
                  <span className="text-indigo-600">
                    beginning.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.18}>
                <p
                  className="
                    mt-6
                    max-w-md
                    text-center
                    text-sm
                    leading-relaxed
                    text-neutral-500
                    sm:text-base
                    sm:leading-7
                  "
                >
                  The first chapter began with
                  hardware-focused solutions. Physical
                  products became the starting point for
                  something much bigger.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TURNING POINT — NO IMAGE NEAR TEXT
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <CenterContent>
          <Chapter
            number="005"
            label="THE TURNING POINT"
          />

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1100px]
                text-center
                text-[clamp(2.5rem,5.5vw,5.5rem)]
                font-black
                leading-[1.05]
                tracking-[-0.04em]
              "
            >
              But we saw
              a bigger
              <br />
              <span className="text-indigo-600">
                problem.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="
                mt-6
                max-w-2xl
                text-center
                text-sm
                leading-relaxed
                text-neutral-500
                sm:text-base
                sm:leading-7
              "
            >
              Hardware solved one part of the problem.
              Businesses were still struggling with
              communication, data, automation, customers,
              and disconnected digital workflows.
            </p>
          </Reveal>

          <div
            className="
              mt-7
              flex
              max-w-4xl
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-3
              border-y
              border-neutral-200
              py-5
            "
          >
            {[
              "Communication",
              "Data",
              "Automation",
              "Customers",
              "Workflows",
            ].map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.04}
              >
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-neutral-400
                  "
                >
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </CenterContent>
      </section>

      {/* =====================================================
          SOFTWARE — TEXT + IMAGE
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <div className="mx-auto max-w-[1350px]">
          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-2
              lg:gap-12
            "
          >
            {/* TEXT */}

            <div className="flex flex-col items-center text-center lg:pr-8">
              <Chapter
                number="006"
                label="THE NEXT CHAPTER"
              />

              <Reveal delay={0.08}>
                <h2
                  className="
                    mt-5
                    max-w-xl
                    text-center
                    text-[clamp(2.5rem,5vw,5.25rem)]
                    font-black
                    leading-[1.05]
                    tracking-[-0.04em]
                  "
                >
                  So we moved
                  <br />
                  into
                  <br />
                  <span className="text-indigo-600">
                    software.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.18}>
                <p
                  className="
                    mt-6
                    max-w-md
                    text-center
                    text-sm
                    leading-relaxed
                    text-neutral-500
                    sm:text-base
                    sm:leading-7
                  "
                >
                  We expanded beyond hardware to build
                  connected digital experiences, products,
                  and systems that solve bigger problems.
                </p>
              </Reveal>
            </div>

            {/* IMAGE */}

            <TurningPointVisual />
          </div>
        </div>
      </section>

      {/* =====================================================
          BIGGER PICTURE — CENTER
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <CenterContent>
          <Chapter
            number="007"
            label="THE BIGGER PICTURE"
          />

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1300px]
                text-center
                text-[clamp(2.75rem,6.5vw,6.5rem)]
                font-black
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              From physical
              <br />
             
              
              <span className="text-indigo-600">
                  to digital.
              </span>
            </h2>
          </Reveal>

          <div
            className="
              mt-8
              grid
              w-full
              max-w-4xl
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[
              "Digital solutions",
              "Data",
              "Automation",
              "Customers",
            ].map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.05}
              >
                <div className="group flex flex-col items-center py-3 text-center">
                  <div
                    className="
                      mb-3
                      h-px
                      w-7
                      bg-indigo-500/40
                      transition-all
                      duration-500
                      group-hover:w-14
                    "
                  />

                  <div
                    className="
                      text-lg
                      font-bold
                      tracking-[-0.03em]
                      text-neutral-900
                    "
                  >
                    {item}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p
              className="
                mt-6
                max-w-2xl
                text-center
                text-sm
                leading-relaxed
                text-neutral-500
                sm:text-base
                sm:leading-7
              "
            >
              Today, we're building digital products and
              connected experiences that help businesses
              move forward.
            </p>
          </Reveal>
        </CenterContent>
      </section>

      {/* =====================================================
          BELIEF — CENTER
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-12
          sm:px-10
          sm:py-14
          lg:px-20
          lg:py-16
        "
      >
        <CenterContent>
          <Chapter
            number="008"
            label="WHAT DRIVES US"
          />

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1350px]
                text-center
                text-[clamp(2.75rem,6.5vw,6.5rem)]
                font-black
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              The idea changed.
              <br />
              <span className="text-indigo-600">
                The mindset didn't.
              </span>
            </h2>
          </Reveal>

          <div
            className="
              mt-8
              grid
              w-full
              max-w-4xl
              gap-7
              border-t
              border-neutral-200
              pt-7
              text-center
              md:grid-cols-3
            "
          >
            {[
              [
                "01",
                "Think beyond the obvious.",
              ],
              [
                "02",
                "Build for real problems.",
              ],
              [
                "03",
                "Make technology feel human.",
              ],
            ].map(([number, title], index) => (
              <Reveal
                key={number}
                delay={index * 0.07}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.2em]
                      text-indigo-600
                    "
                  >
                    {number}
                  </div>

                  <h3
                    className="
                      mt-3
                      max-w-xs
                      text-center
                      text-2xl
                      font-black
                      leading-[1.08]
                      tracking-[-0.045em]
                      sm:text-3xl
                    "
                  >
                    {title}
                  </h3>

                  <div
                    className="
                      mt-5
                      h-px
                      w-12
                      bg-neutral-200
                    "
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </CenterContent>
      </section>

      {/* =====================================================
          HUMAN — CENTER
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          py-14
          sm:px-10
          sm:py-16
          lg:px-20
          lg:py-20
        "
      >
        <CenterContent>
          <Reveal>
            <div
              className="
                text-center
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-indigo-600
              "
            >
              THE PRINCIPLE
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1400px]
                text-center
                text-[clamp(2.75rem,7vw,7rem)]
                font-black
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              Technology  should
              <br />
              <span className="text-indigo-600">
                feel human.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="
                mt-7
                max-w-2xl
                text-center
                text-sm
                leading-relaxed
                text-neutral-500
                sm:text-base
                sm:leading-7
              "
            >
              The best technology isn't the one that looks
              complicated. It's the one that makes something
              difficult feel simple.
            </p>
          </Reveal>
        </CenterContent>
      </section>

      {/* =====================================================
          FINAL — CENTER
      ===================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-20
          pt-12
          sm:px-10
          sm:pb-24
          sm:pt-16
          lg:px-20
          lg:pb-28
          lg:pt-20
        "
      >
        <CenterContent>
          <Chapter
            number="009"
            label="THE NEXT CHAPTER"
          />

          <Reveal delay={0.08}>
            <h2
              className="
                mt-5
                max-w-[1400px]
                text-center
                text-[clamp(3rem,8vw,8rem)]
                font-black
                leading-[1.02]
                tracking-[-0.04em]
              "
            >
              Still
              <br />
              <span className="text-indigo-600">
                building.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                border-t
                border-neutral-200
                pt-7
                text-center
              "
            >
              <div
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-neutral-300
                "
              >
                THE STORY ISN'T FINISHED
              </div>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-center
                  text-sm
                  leading-6
                  text-neutral-500
                  sm:text-base
                  sm:leading-7
                "
              >
                What began as a conversation between two
                people continues to grow into technology,
                products, and experiences built for a
                connected world.
              </p>

              <a
                href="#"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-4
                  text-sm
                  font-bold
                  text-neutral-950
                "
              >
                What's next?

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-600
                    text-white
                    shadow-[0_10px_30px_rgba(79,70,229,0.20)]
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                >
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </div>
          </Reveal>
        </CenterContent>

        <FloatingDot
          className="right-[12%] top-[15%]"
          delay={0.4}
        />

        <FloatingDot
          className="left-[18%] bottom-[10%]"
          delay={1.2}
        />

        <FloatingDot
          className="right-[34%] bottom-[6%]"
          delay={1.8}
        />
      </section>
    </section>
  );
}