"use client";

import React, { useId, useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
  MotionValue,
} from "framer-motion";

export interface RevealTextProps extends React.HTMLAttributes<HTMLElement> {
  /** The text string or node content to reveal */
  children?: React.ReactNode;
  text?: string;
  /** HTML tag wrapper (default: 'span') */
  as?: React.ElementType;
  /** Mode: 'viewport' (plays on scroll into view) or 'scroll' (scrubbed to scroll progress) */
  mode?: "viewport" | "scroll";
  /** Reveal mode: word by word or character by character */
  revealBy?: "words" | "chars";
  /** Stagger time in seconds between words (default: 0.07) */
  stagger?: number;
  /** Initial delay before starting reveal (default: 0) */
  delay?: number;
  /** Duration of each word animation (default: 0.6) */
  duration?: number;
  /** Distance from below in px or % for masked emergence (default: "115%") */
  yOffset?: string | number;
  /** Blur intensity in px (default: 8) */
  blurAmount?: number;
  /** Words to highlight with custom gradient/styling class */
  highlightWords?: string[];
  /** Custom class for highlighted words */
  highlightClass?: string;
  /** Viewport amount trigger threshold (0 to 1, default: 0.25) */
  viewportAmount?: number;
  /** Trigger animation only once (default: true) */
  once?: boolean;
  /** Extra container className */
  className?: string;
}

interface ParsedWord {
  id: string;
  text: string;
  isHighlight: boolean;
  chars?: string[];
}

export default function RevealText({
  children,
  text,
  as: Component = "span",
  mode = "viewport",
  revealBy = "words",
  stagger = 0.07,
  delay = 0,
  duration = 0.6,
  yOffset = "115%",
  blurAmount = 8,
  highlightWords = [],
  highlightClass = "",
  viewportAmount = 0.25,
  once = true,
  className = "",
  ...props
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = Component as any;

  // Extract raw text content if string or passed in text prop
  const rawText = useMemo(() => {
    if (typeof text === "string") return text;
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children
        .map((child) => (typeof child === "string" ? child : ""))
        .join(" ");
    }
    return "";
  }, [text, children]);

  // Parse words & highlight tags
  const parsedWords = useMemo<ParsedWord[]>(() => {
    if (!rawText) return [];

    const normalizedHighlights = highlightWords.map((w) =>
      w.toLowerCase().trim()
    );

    return rawText.trim().split(/\s+/).map((wordStr, index) => {
      const cleanWord = wordStr.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
      const isHighlight =
        normalizedHighlights.includes(cleanWord) ||
        wordStr.startsWith("*") ||
        wordStr.endsWith("*");

      const displayWord = wordStr.replace(/\*/g, "");

      return {
        id: `${rawId}-w-${index}-${displayWord}`,
        text: displayWord,
        isHighlight,
        chars: displayWord.split(""),
      };
    });
  }, [rawText, highlightWords, rawId]);

  // Scroll-driven animation hooks if mode === 'scroll'
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  // Container variants for viewport mode
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Individual word variants
  const wordVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, filter: "none" }
      : {
          opacity: 0,
          y: yOffset,
          filter: `blur(${blurAmount}px)`,
        },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Smooth premium easeOut curve
      },
    },
  };

  // If children is complex JSX elements rather than a plain string, render inline wrappers smartly
  if (!rawText && children) {
    return (
      <Tag
        ref={containerRef}
        className={`inline-block ${className}`}
        {...props}
      >
        <motion.span
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={mode === "viewport" ? "visible" : undefined}
          viewport={{ once, amount: viewportAmount }}
          variants={containerVariants}
          className="inline-block"
        >
          {React.Children.map(children, (child, idx) => {
            if (typeof child === "string") {
              const words = child.split(/\s+/).filter(Boolean);
              return words.map((w, wIdx) => (
                <span
                  key={`${rawId}-child-${idx}-${wIdx}`}
                  className="inline-block overflow-hidden align-bottom py-[0.1em] mr-[0.25em]"
                >
                  <motion.span
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                </span>
              ));
            }
            return (
              <span className="inline-block overflow-hidden align-bottom py-[0.1em] mr-[0.25em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {child}
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      {...props}
    >
      <motion.span
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={mode === "viewport" ? "visible" : undefined}
        viewport={{ once, amount: viewportAmount }}
        variants={containerVariants}
        className="inline flex-wrap leading-tight"
      >
        {parsedWords.map((wordObj, i) => {
          // If scroll mode, calculate continuous scroll progress per word
          if (mode === "scroll" && !shouldReduceMotion) {
            return (
              <ScrollWordItem
                key={wordObj.id}
                wordObj={wordObj}
                index={i}
                totalWords={parsedWords.length}
                scrollYProgress={scrollYProgress}
                yOffset={yOffset}
                blurAmount={blurAmount}
                highlightClass={highlightClass}
              />
            );
          }

          return (
            <span
              key={wordObj.id}
              className="inline-block overflow-hidden align-bottom py-[0.12em] mr-[0.28em] last:mr-0"
            >
              <motion.span
                variants={wordVariants}
                className={`inline-block ${
                  wordObj.isHighlight && highlightClass ? highlightClass : ""
                }`}
              >
                {revealBy === "chars" && wordObj.chars ? (
                  wordObj.chars.map((char, cIdx) => (
                    <motion.span
                      key={`${wordObj.id}-c-${cIdx}`}
                      variants={{
                        hidden: { opacity: 0, y: yOffset },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))
                ) : (
                  wordObj.text
                )}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/**
 * Sub-component for scroll progress driven word reveals
 */
function ScrollWordItem({
  wordObj,
  index,
  totalWords,
  scrollYProgress,
  yOffset,
  blurAmount,
  highlightClass,
}: {
  wordObj: ParsedWord;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
  yOffset: string | number;
  blurAmount: number;
  highlightClass: string;
}) {
  const step = 1 / totalWords;
  const start = index * step * 0.85;
  const end = Math.min(1, start + step * 1.5);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [typeof yOffset === "number" ? `${yOffset}px` : yOffset, "0%"]
  );
  const blur = useTransform(
    scrollYProgress,
    [start, end],
    [`blur(${blurAmount}px)`, "blur(0px)"]
  );

  return (
    <span className="inline-block overflow-hidden align-bottom py-[0.12em] mr-[0.28em] last:mr-0">
      <motion.span
        style={{ opacity, y, filter: blur }}
        className={`inline-block ${
          wordObj.isHighlight && highlightClass ? highlightClass : ""
        }`}
      >
        {wordObj.text}
      </motion.span>
    </span>
  );
}
