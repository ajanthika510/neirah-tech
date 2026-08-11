"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";

interface Service {
  title: string;
  icon: React.ElementType;
  description: string;
  items: string[];
  size: "small" | "medium" | "large";
}

interface Props {
  service: Service;
  index: number;
}

export default function ServiceCard({
  service,
  index,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20,
  });

  function handleMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const Icon = service.icon;

  const sizeClass =
    service.size === "large"
      ? "xl:col-span-2 xl:row-span-2"
      : service.size === "medium"
      ? "xl:col-span-2"
      : "";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-xl shadow-xl ${sizeClass}`}
    >
      {/* Mouse Spotlight */}

      <motion.div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Animated Border */}

      <motion.div
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-[32px] p-[1px]"
        style={{
          background:
            "linear-gradient(120deg,#38bdf8,#06b6d4,#6366f1,#38bdf8)",
          backgroundSize: "300% 300%",
        }}
      >
        <div className="h-full w-full rounded-[31px] bg-white/80 backdrop-blur-xl" />
      </motion.div>

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col p-8">
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.15,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-[0_0_35px_rgba(14,165,233,.35)]"
        >
          <Icon size={30} />
        </motion.div>

        <h3 className="mt-7 text-2xl font-bold text-slate-900">
          {service.title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {service.description}
        </p>

        <div className="mt-8 space-y-3">
          {service.items.map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100">
                <Check
                  size={14}
                  className="text-sky-600"
                />
              </div>

              <span className="text-slate-700">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{
            x: 6,
          }}
          className="mt-auto flex items-center gap-3 pt-10 font-semibold text-sky-600"
        >
          Learn More

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </div>

      {/* Shine */}

      <motion.div
        initial={{
          x: "-150%",
        }}
        whileHover={{
          x: "250%",
        }}
        transition={{
          duration: 1,
        }}
        className="absolute inset-y-0 w-24 rotate-12 bg-white/40 blur-xl"
      />
    </motion.div>
  );
}