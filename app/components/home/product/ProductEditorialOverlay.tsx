"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { Product } from "../FeaturedProjects";

interface ProductEditorialOverlayProps {
  products: Product[];
  activeIndex: number;
  progress: number;
  onConsult: (product: Product) => void;
}

export type CompositionType = {
  objectSide: "left" | "right" | "center" | "diagonal-left" | "diagonal-right";
  headingSide: "right" | "left" | "center";
  entryDirection: "from-right" | "from-left";
};

export const PRODUCT_COMPOSITIONS: CompositionType[] = [
  {
    objectSide: "left",
    headingSide: "right",
    entryDirection: "from-right",
  },
  {
    objectSide: "right",
    headingSide: "left",
    entryDirection: "from-left",
  },
  {
    objectSide: "left",
    headingSide: "right",
    entryDirection: "from-right",
  },
  {
    objectSide: "right",
    headingSide: "left",
    entryDirection: "from-left",
  },
  {
    objectSide: "left",
    headingSide: "right",
    entryDirection: "from-right",
  },
  {
    objectSide: "right",
    headingSide: "left",
    entryDirection: "from-left",
  },
  {
    objectSide: "left",
    headingSide: "right",
    entryDirection: "from-right",
  },
  {
    objectSide: "right",
    headingSide: "left",
    entryDirection: "from-left",
  },
  {
    objectSide: "left",
    headingSide: "right",
    entryDirection: "from-right",
  },
  {
    objectSide: "right",
    headingSide: "left",
    entryDirection: "from-left",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  if (inMax === inMin) return outMin;

  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);

  return outMin + t * (outMax - outMin);
}

export default function ProductEditorialOverlay({
  products,
  activeIndex,
  progress,
  onConsult,
}: ProductEditorialOverlayProps) {
  const activeProduct = products[activeIndex] || products[0];

  if (!activeProduct) {
    return null;
  }

  const comp =
    PRODUCT_COMPOSITIONS[activeIndex % PRODUCT_COMPOSITIONS.length];

  const Icon = activeProduct.icon;

  /*
   * Continuous scroll offset.
   *
   * -1 = previous product
   *  0 = current product
   * +1 = next product
   */
  const offset = progress - activeIndex;

  /* ============================================================
     DISCOVERY PHASES
     ============================================================ */

  /**
   * Phase 1
   * Visual teaser
   *
   * Phase 2
   * Object settles
   *
   * Phase 3
   * Product title reveals
   *
   * Phase 4
   * Category + description
   *
   * Phase 5
   * Capability badges
   *
   * Phase 6
   * CTA
   *
   * Phase 7
   * Exit / next product
   */

  /* ============================================================
     TITLE
     ============================================================ */

  const titleOpacity = useMemo(() => {
    if (offset < -0.1) return 0;

    if (offset < 0.12) {
      return mapRange(offset, -0.1, 0.12, 0, 1);
    }

    if (offset < 0.68) return 1;

    if (offset < 0.88) {
      return mapRange(offset, 0.68, 0.88, 1, 0);
    }

    return 0;
  }, [offset]);

  const titleClipPercent = useMemo(() => {
    if (offset < -0.08) return 100;

    if (offset < 0.14) {
      return mapRange(offset, -0.08, 0.14, 100, 0);
    }

    return 0;
  }, [offset]);

  const titleTranslateX = useMemo(() => {
    const startX =
      comp.entryDirection === "from-right"
        ? 24
        : -24;

    const exitX =
      comp.entryDirection === "from-right"
        ? -24
        : 24;

    if (offset < -0.08) {
      return startX;
    }

    if (offset < 0.14) {
      return mapRange(offset, -0.08, 0.14, startX, 0);
    }

    if (offset > 0.68) {
      return mapRange(offset, 0.68, 0.88, 0, exitX);
    }

    return 0;
  }, [offset, comp.entryDirection]);

  /* ============================================================
     MONOGRAM / LAYER
     ============================================================ */

  const monogramOpacity = useMemo(() => {
    if (offset < -0.02) return 0;

    if (offset < 0.16) {
      return mapRange(offset, -0.02, 0.16, 0, 1);
    }

    if (offset < 0.65) return 1;

    if (offset < 0.85) {
      return mapRange(offset, 0.65, 0.85, 1, 0);
    }

    return 0;
  }, [offset]);

  const monogramY = useMemo(() => {
    if (offset < -0.02) return 10;

    if (offset < 0.16) {
      return mapRange(offset, -0.02, 0.16, 10, 0);
    }

    if (offset > 0.65) {
      return mapRange(offset, 0.65, 0.85, 0, -10);
    }

    return 0;
  }, [offset]);

  /* ============================================================
     DESCRIPTION
     ============================================================ */

  const descOpacity = useMemo(() => {
    if (offset < 0.08) return 0;

    if (offset < 0.24) {
      return mapRange(offset, 0.08, 0.24, 0, 1);
    }

    if (offset < 0.62) return 1;

    if (offset < 0.8) {
      return mapRange(offset, 0.62, 0.8, 1, 0);
    }

    return 0;
  }, [offset]);

  const descY = useMemo(() => {
    if (offset < 0.08) return 14;

    if (offset < 0.24) {
      return mapRange(offset, 0.08, 0.24, 14, 0);
    }

    if (offset > 0.62) {
      return mapRange(offset, 0.62, 0.8, 0, -12);
    }

    return 0;
  }, [offset]);

  /* ============================================================
     CAPABILITY BADGES
     ============================================================ */

  const badgesOpacity = useMemo(() => {
    if (offset < 0.18) return 0;

    if (offset < 0.32) {
      return mapRange(offset, 0.18, 0.32, 0, 1);
    }

    if (offset < 0.58) return 1;

    if (offset < 0.76) {
      return mapRange(offset, 0.58, 0.76, 1, 0);
    }

    return 0;
  }, [offset]);

  const badgesScale = useMemo(() => {
    if (offset < 0.18) return 0.92;

    if (offset < 0.32) {
      return mapRange(offset, 0.18, 0.32, 0.92, 1);
    }

    return 1;
  }, [offset]);

  /* ============================================================
     CTA
     ============================================================ */

  const ctaOpacity = useMemo(() => {
    if (offset < 0.28) return 0;

    if (offset < 0.42) {
      return mapRange(offset, 0.28, 0.42, 0, 1);
    }

    if (offset < 0.55) return 1;

    if (offset < 0.7) {
      return mapRange(offset, 0.55, 0.7, 1, 0);
    }

    return 0;
  }, [offset]);

  const ctaY = useMemo(() => {
    if (offset < 0.28) return 18;

    if (offset < 0.42) {
      return mapRange(offset, 0.28, 0.42, 18, 0);
    }

    if (offset > 0.55) {
      return mapRange(offset, 0.55, 0.7, 0, -10);
    }

    return 0;
  }, [offset]);

  const ctaScale = useMemo(() => {
    if (offset < 0.28) return 0.88;

    if (offset < 0.42) {
      return mapRange(offset, 0.28, 0.42, 0.88, 1);
    }

    return 1;
  }, [offset]);

  const isCtaInteractive = ctaOpacity > 0.4;

  /* ============================================================
     HUD PHASE
     ============================================================ */

  const currentDiscoveryPhase = useMemo(() => {
    if (offset < -0.1) {
      return "01 · Visual Teaser";
    }

    if (offset < 0.05) {
      return "02 · Geometry Settling";
    }

    if (offset < 0.2) {
      return "03 · Identity Revealed";
    }

    if (offset < 0.35) {
      return "04 · Capability Analysis";
    }

    if (offset < 0.6) {
      return "05 · Full Discovery";
    }

    return "06 · Transitioning";
  }, [offset]);

  /* ============================================================
     SHARED CONTENT
     ============================================================ */

  const content = (
    <>
      {/* ======================================================
          MONOGRAM
         ====================================================== */}

      <div
        style={{
          opacity: monogramOpacity,
          transform: `translateY(${monogramY}px)`,
          transition:
            "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
        className="
          flex
          items-center
          gap-2
          font-mono
          text-[11px]
          sm:text-xs
          uppercase
          tracking-widest
          text-slate-400
          font-semibold
        "
      >
        <span className="text-slate-900 font-black">
          {activeProduct.number}
        </span>

        <span>/</span>

        <span>{activeProduct.layer}</span>
      </div>

      {/* ======================================================
          TITLE
         ====================================================== */}

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateX(${titleTranslateX}px)`,
          clipPath: `inset(0% ${titleClipPercent}% 0% 0%)`,
          transition:
            "opacity 0.2s ease-out, transform 0.2s ease-out, clip-path 0.25s ease-out",
        }}
        className="overflow-hidden"
      >
        <h2
          className="
            text-4xl
            sm:text-6xl
            lg:text-7xl
            xl:text-8xl
            font-black
            tracking-tight
            text-slate-900
            leading-[0.92]
            drop-shadow-xs
          "
        >
          {activeProduct.name}
        </h2>
      </div>

      {/* ======================================================
          DESCRIPTION
         ====================================================== */}

      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          transition:
            "opacity 0.25s ease-out, transform 0.25s ease-out",
        }}
        className="space-y-2.5 sm:space-y-3 max-w-md"
      >
        {/* Category */}

        <div
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          <Icon
            size={14}
            style={{
              color: activeProduct.accent,
            }}
          />

          <span>{activeProduct.category}</span>
        </div>

        {/* Description */}

        <p
          className="
            text-xs
            sm:text-sm
            md:text-base
            text-slate-600
            font-normal
            leading-relaxed
          "
        >
          {activeProduct.description}
        </p>

        {/* ==================================================
            CAPABILITY BADGES
           ================================================== */}

        <div
          style={{
            opacity: badgesOpacity,
            transform: `scale(${badgesScale})`,
            transition:
              "opacity 0.2s ease-out, transform 0.2s ease-out",
          }}
          className="
            flex
            flex-wrap
            gap-1.5
            pt-0.5
          "
        >
          {activeProduct.capabilities
            .slice(0, 3)
            .map((capability) => (
              <span
                key={capability}
                className="
                  inline-flex
                  items-center
                  px-2.5
                  py-0.5
                  rounded-full
                  bg-white/90
                  border
                  border-slate-200/60
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  text-slate-700
                  shadow-xs
                  whitespace-nowrap
                "
              >
                {capability}
              </span>
            ))}
        </div>

        {/* ==================================================
            CTA
           ================================================== */}

        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
            pointerEvents: isCtaInteractive
              ? "auto"
              : "none",
            transition:
              "opacity 0.25s ease-out, transform 0.25s ease-out",
          }}
          className="pt-2"
        >
          <button
            type="button"
            onClick={() => onConsult(activeProduct)}
            disabled={!isCtaInteractive}
            aria-label={`Explore ${activeProduct.name}`}
            className="
              group
              inline-flex
              items-center
              gap-2.5
              px-6
              py-3
              rounded-full
              bg-gradient-to-r
              from-slate-900
              via-indigo-950
              to-slate-900
              text-white
              text-xs
              font-bold
              tracking-wide
              shadow-lg
              hover:shadow-xl
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              disabled:opacity-0
              disabled:cursor-default
            "
          >
            <Sparkles
              size={13}
              className="text-sky-300"
            />

            <span>
              Explore {activeProduct.name}
            </span>

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>
        </div>
      </div>
    </>
  );

  /* ============================================================
     MAIN
     ============================================================ */

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        flex
        flex-col
        justify-between
        p-6
        sm:p-10
        select-none
        overflow-hidden
      "
    >
      {/* ========================================================
          TOP HUD
         ======================================================== */}

      <div
        className="
          w-full
          flex
          items-center
          justify-between
          max-w-6xl
          mx-auto
          pt-2
          text-xs
          font-mono
          text-slate-400
        "
      >
        {/* Left HUD */}

        <div
          className="
            flex
            items-center
            gap-2
            tracking-widest
            uppercase
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-sky-400
              animate-pulse
            "
          />

          <span>
            Venture Discovery Corridor
          </span>
        </div>

        {/* Right HUD */}

        <div
          className="
            flex
            items-center
            gap-3
            tracking-widest
            uppercase
            text-[11px]
          "
        >
          <span className="text-slate-500 hidden sm:inline">
            {currentDiscoveryPhase}
          </span>

          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            <Compass
              size={12}
              className="
                text-sky-500
                animate-spin
              "
              style={{
                animationDuration: "14s",
              }}
            />

            <span>
              Horizon{" "}
              {String(activeIndex + 1).padStart(
                2,
                "0"
              )}{" "}
              / 10
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          EDITORIAL STAGE
         ======================================================== */}

      <div
        className="
          relative
          w-full
          max-w-6xl
          mx-auto
          flex-1
          flex
          items-end
          lg:items-center
          pb-4
          sm:pb-0
        "
      >
        {/* ======================================================
            DESKTOP COMPOSITION
           ====================================================== */}

        <div
          className={`
            w-full
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-6
            lg:gap-8
            items-center
            pointer-events-none

            ${
              comp.headingSide === "right"
                ? "lg:justify-items-end"
                : comp.headingSide === "left"
                ? "lg:justify-items-start"
                : "justify-items-center text-center"
            }
          `}
        >
          {/* ====================================================
              LEFT HEADING
             ==================================================== */}

          {comp.headingSide === "left" && (
            <>
              <div
                className="
                  lg:col-span-6
                  flex
                  flex-col
                  items-center
                  lg:items-start
                  text-center
                  lg:text-left
                  space-y-3
                  sm:space-y-4
                  pointer-events-auto

                  bg-white/70
                  lg:bg-transparent

                  backdrop-blur-md
                  lg:backdrop-blur-none

                  p-4
                  sm:p-6
                  lg:p-0

                  rounded-3xl
                  lg:rounded-none

                  border
                  border-slate-200/50
                  lg:border-none

                  shadow-xs
                  lg:shadow-none
                "
              >
                {content}
              </div>

              {/* Empty right space for 3D object */}

              <div className="hidden lg:block lg:col-span-6" />
            </>
          )}

          {/* ====================================================
              RIGHT HEADING
             ==================================================== */}

          {comp.headingSide === "right" && (
            <>
              {/* Empty left space for 3D object */}

              <div className="hidden lg:block lg:col-span-6" />

              <div
                className="
                  lg:col-span-6
                  flex
                  flex-col
                  items-center
                  lg:items-start
                  text-center
                  lg:text-left
                  space-y-3
                  sm:space-y-4
                  pointer-events-auto

                  bg-white/70
                  lg:bg-transparent

                  backdrop-blur-md
                  lg:backdrop-blur-none

                  p-4
                  sm:p-6
                  lg:p-0

                  rounded-3xl
                  lg:rounded-none

                  border
                  border-slate-200/50
                  lg:border-none

                  shadow-xs
                  lg:shadow-none
                "
              >
                {content}
              </div>
            </>
          )}

          {/* ====================================================
              CENTER HEADING
             ==================================================== */}

          {comp.headingSide === "center" && (
            <div
              className="
                lg:col-span-12

                flex
                flex-col
                items-center
                text-center

                space-y-3

                pointer-events-auto

                max-w-xl
                mx-auto

                -mt-24
                sm:-mt-40

                bg-white/70
                lg:bg-transparent

                backdrop-blur-md
                lg:backdrop-blur-none

                p-4
                sm:p-6
                lg:p-0

                rounded-3xl
                lg:rounded-none

                border
                border-slate-200/50
                lg:border-none

                shadow-xs
                lg:shadow-none
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  space-y-3
                "
              >
                {/* Center monogram */}

                <div
                  style={{
                    opacity: monogramOpacity,
                    transform: `translateY(${monogramY}px)`,
                    transition:
                      "opacity 0.2s ease-out, transform 0.2s ease-out",
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[11px]
                    sm:text-xs
                    uppercase
                    tracking-widest
                    text-slate-400
                    font-semibold
                  "
                >
                  <span className="text-slate-900 font-black">
                    {activeProduct.number}
                  </span>

                  <span>/</span>

                  <span>{activeProduct.layer}</span>
                </div>

                {/* Center title */}

                <div
                  style={{
                    opacity: titleOpacity,
                    clipPath: `inset(0% ${titleClipPercent}% 0% 0%)`,
                    transition:
                      "opacity 0.2s ease-out, clip-path 0.25s ease-out",
                  }}
                  className="overflow-hidden"
                >
                  <h2
                    className="
                      text-4xl
                      sm:text-6xl
                      lg:text-7xl
                      xl:text-8xl
                      font-black
                      tracking-tight
                      text-slate-900
                      leading-[0.92]

                      flex
                      justify-center
                      flex-wrap

                      drop-shadow-xs
                    "
                  >
                    {activeProduct.name}
                  </h2>
                </div>

                {/* Center description */}

                <div
                  style={{
                    opacity: descOpacity,
                    transform: `translateY(${descY}px)`,
                    transition:
                      "opacity 0.25s ease-out, transform 0.25s ease-out",
                  }}
                  className="
                    space-y-2.5
                    sm:space-y-3
                  "
                >
                  {/* Category */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                      justify-center
                    "
                  >
                    <Icon
                      size={14}
                      style={{
                        color:
                          activeProduct.accent,
                      }}
                    />

                    <span>
                      {activeProduct.category}
                    </span>
                  </div>

                  {/* Description */}

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      text-slate-600
                      font-normal
                      leading-relaxed
                      max-w-md
                      mx-auto
                    "
                  >
                    {activeProduct.description}
                  </p>

                  {/* Center capabilities */}

                  <div
                    style={{
                      opacity: badgesOpacity,
                      transform: `scale(${badgesScale})`,
                      transition:
                        "opacity 0.2s ease-out, transform 0.2s ease-out",
                    }}
                    className="
                      flex
                      flex-wrap
                      justify-center
                      gap-1.5
                      pt-0.5
                    "
                  >
                    {activeProduct.capabilities
                      .slice(0, 3)
                      .map((capability) => (
                        <span
                          key={capability}
                          className="
                            inline-flex
                            items-center
                            px-2.5
                            py-0.5
                            rounded-full
                            bg-white/90
                            border
                            border-slate-200/60
                            text-[10px]
                            sm:text-[11px]
                            font-semibold
                            text-slate-700
                            shadow-xs
                          "
                        >
                          {capability}
                        </span>
                      ))}
                  </div>

                  {/* Center CTA */}

                  <div
                    style={{
                      opacity: ctaOpacity,
                      transform: `translateY(${ctaY}px) scale(${ctaScale})`,
                      pointerEvents:
                        isCtaInteractive
                          ? "auto"
                          : "none",
                      transition:
                        "opacity 0.25s ease-out, transform 0.25s ease-out",
                    }}
                    className="pt-2"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onConsult(activeProduct)
                      }
                      disabled={!isCtaInteractive}
                      aria-label={`Explore ${activeProduct.name}`}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2.5
                        px-6
                        py-3
                        rounded-full

                        bg-gradient-to-r
                        from-slate-900
                        via-indigo-950
                        to-slate-900

                        text-white
                        text-xs
                        font-bold
                        tracking-wide

                        shadow-lg
                        hover:shadow-xl
                        hover:scale-105

                        transition-all
                        duration-300

                        cursor-pointer

                        disabled:opacity-0
                        disabled:cursor-default
                      "
                    >
                      <Sparkles
                        size={13}
                        className="text-sky-300"
                      />

                      <span>
                        Explore{" "}
                        {activeProduct.name}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="
                          transition-transform
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          BOTTOM SPACER
         ======================================================== */}

      <div className="h-10" />
    </div>
  );
}