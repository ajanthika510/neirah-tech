"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import SchedulerModal from "../home/SchedulerModal";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     MOBILE SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =====================================================
     OPEN SCHEDULER
  ===================================================== */

  const openScheduler = () => {
    setMobileOpen(false);
    setSchedulerOpen(true);
  };

  /* =====================================================
     CLOSE SCHEDULER
  ===================================================== */

  const closeScheduler = () => {
    setSchedulerOpen(false);
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <motion.header
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          px-3
          pt-3

          sm:px-5
          sm:pt-4

          lg:px-6
          lg:pt-5
        "
      >
        <motion.nav
          animate={{
            y: scrolled ? -1 : 0,
            scale: scrolled ? 0.99 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className={`
            mx-auto
            flex
            h-[52px]
            w-full
            max-w-[1450px]
            items-center
            justify-between
            px-1
            transition-all
            duration-300

            sm:h-[58px]
            sm:px-2

            lg:h-[82px]
            lg:rounded-full
            lg:border
            lg:border-white/80
            lg:bg-white/95
            lg:px-5
            lg:shadow-[0_10px_35px_rgba(37,99,235,0.07)]
            lg:backdrop-blur-xl

            xl:h-[86px]
            xl:px-6

            ${
              scrolled
                ? "lg:shadow-[0_12px_40px_rgba(37,99,235,0.11)]"
                : ""
            }
          `}
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            className="
              group
              relative
              flex
              shrink-0
              items-center
            "
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                relative
                h-[28px]
                w-[56px]

                sm:h-[31px]
                sm:w-[60px]

                md:h-[34px]
                md:w-[68px]

                lg:h-[40px]
                lg:w-[80px]

                xl:h-[43px]
                xl:w-[86px]
              "
            >
              <Image
                src="/images/logo.png"
                alt="Neirah Tech"
                fill
                priority
                className="
                  object-contain
                  object-left
                "
              />
            </motion.div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </div>
          </div>

          {/* ==================================================
              RIGHT ACTION
          ================================================== */}

          <div className="ml-auto flex items-center">

            {/* ==================================================
                DESKTOP BOOK DEMO BUTTON
            ================================================== */}

            <motion.button
              type="button"
              aria-label="Book a demo"
              onClick={openScheduler}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                group
                relative
                hidden
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#22D3EE]
                via-[#0EA5E9]
                to-[#4F46E5]
                shadow-[0_10px_30px_rgba(14,165,233,0.22)]

                lg:flex

                xl:h-[46px]
                xl:w-[46px]
              "
            >
              {/* Glow */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-[-9px]
                  -z-10
                  rounded-full
                  bg-[#0EA5E9]/20
                  blur-xl
                  opacity-70
                  transition-all
                  duration-300
                  group-hover:bg-[#0EA5E9]/35
                "
              />

              {/* Animated inner orb */}

              <motion.span
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  h-[24px]
                  w-[24px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  backdrop-blur-sm
                  xl:h-[26px]
                  xl:w-[26px]
                "
              >
                <CalendarDays
                  size={14}
                  strokeWidth={2.2}
                />
              </motion.span>

              {/* Hover ring */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-white/30
                  opacity-0
                  scale-90
                  transition-all
                  duration-300
                  group-hover:scale-100
                  group-hover:opacity-100
                "
              />
            </motion.button>

            {/* ==================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              onClick={() =>
                setMobileOpen((prev) => !prev)
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/80
                bg-white/90
                text-[#26364D]
                shadow-md
                backdrop-blur-md
                transition-all
                hover:bg-white
                hover:scale-105
                active:scale-95

                sm:h-11
                sm:w-11

                lg:hidden
              "
            >
              {mobileOpen ? (
                <X
                  size={20}
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  size={20}
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Background overlay */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMobileOpen(false)}
              className="
                fixed
                inset-0
                z-40
                bg-[#0D1B2A]/20
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* Menu panel */}

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-3
                right-3
                top-[86px]
                z-50
                overflow-hidden
                rounded-[26px]
                border
                border-white
                bg-white/95
                p-2.5
                shadow-[0_20px_60px_rgba(37,99,235,0.14)]
                backdrop-blur-xl

                sm:left-5
                sm:right-5
                sm:top-[92px]

                md:left-6
                md:right-6
                md:top-[96px]

                lg:hidden
              "
            >
              {/* ==================================================
                  NAV ITEMS
              ================================================== */}

              <div className="space-y-0.5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.045,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-3
                        text-[15px]
                        font-medium
                        text-[#334155]
                        transition-all
                        duration-200

                        sm:px-5
                        sm:py-3.5
                        sm:text-[16px]

                        hover:bg-[#F1F7FF]
                        hover:text-[#2875E8]
                      "
                    >
                      <span>
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="
                          opacity-0
                          -translate-x-1
                          transition-all
                          duration-200
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* ==================================================
                  MOBILE BOOK DEMO
              ================================================== */}

              <div
                onClick={openScheduler}
                className="
                  mt-2
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#F0F9FF]
                  via-[#F8FAFC]
                  to-[#EEF2FF]
                  p-3
                  cursor-pointer
                  transition-all
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  sm:p-3.5
                "
              >
                <div className="flex items-center gap-3">

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-[#22D3EE]
                      via-[#0EA5E9]
                      to-[#4F46E5]
                      text-white
                      shadow-[0_8px_22px_rgba(14,165,233,0.22)]

                      sm:h-12
                      sm:w-12
                    "
                  >
                    <CalendarDays
                      size={18}
                    />
                  </div>

                  {/* Text */}

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-[#0EA5E9]

                        sm:text-xs
                      "
                    >
                      Let&apos;s connect
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[13px]
                        font-semibold
                        text-[#26364D]

                        sm:text-sm
                      "
                    >
                      Schedule a Demo
                    </p>
                  </div>

                  {/* Button */}

                  <motion.button
                    type="button"
                    aria-label="Schedule a demo"
                    onClick={openScheduler}
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0F172A]
                      text-white
                      shadow-[0_8px_20px_rgba(15,23,42,0.18)]
                      transition-colors
                      duration-300
                      hover:bg-[#0EA5E9]

                      sm:h-11
                      sm:w-11
                    "
                  >
                    <ArrowUpRight
                      size={17}
                    />
                  </motion.button>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================
          SCHEDULER MODAL
      ================================================== */}

      <SchedulerModal
        isOpen={schedulerOpen}
        onClose={closeScheduler}
      />
    </>
  );
}

/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        flex
        h-[48px]
        items-center
        rounded-full
        px-3.5
        text-[14px]
        font-semibold
        tracking-[-0.01em]
        text-[#334155]
        transition-all
        duration-300
        cursor-pointer
        pointer-events-auto

        xl:h-[50px]
        xl:px-4
        xl:text-[15px]

        2xl:px-5
        2xl:text-[16px]
      "
    >
      {/* Hover background */}

      <span
        className="
          absolute
          inset-1
          -z-0
          rounded-full
          bg-[#F2F7FD]
          opacity-0
          scale-90
          transition-all
          duration-300
          group-hover:scale-100
          group-hover:opacity-100
          pointer-events-none
        "
      />

      {/* Hover blue line */}

      <span
        className="
          absolute
          bottom-1.5
          left-1/2
          h-[2px]
          w-0
          -translate-x-1/2
          rounded-full
          bg-[#4387F5]
          transition-all
          duration-300
          group-hover:w-5
          pointer-events-none
        "
      />

      <span
        className="
          relative
          z-10
          whitespace-nowrap
          transition-colors
          duration-300
          group-hover:text-[#2875E8]
          pointer-events-none
        "
      >
        {label}
      </span>
    </Link>
  );
}