"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import RevealText from "../ui/RevealText";

function FacebookIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],

  services: [
    { name: "Business Website", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "AI Assistant", href: "/services" },
    { name: "Digital Marketing", href: "/services" },
    { name: "Business Software", href: "/services" },
    { name: "Consulting", href: "/services" },
    { name: "Smart Devices & IoT", href: "/services" },
    { name: "Innovation Lab", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#020617] text-white pointer-events-auto">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[130px]"
        />

      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">

        {/* =================================================
            TOP CTA
        ================================================= */}

        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 md:p-12">

          {/* CTA glow */}

          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-4 py-2">

                <Sparkles
                  size={14}
                  className="text-sky-400"
                />

                <RevealText
                  as="span"
                  text="LET'S BUILD SOMETHING"
                  stagger={0.05}
                  duration={0.4}
                  blurAmount={3}
                  className="text-xs font-bold tracking-[0.2em] text-sky-300"
                />

              </div>

              <h2 className="text-3xl font-black leading-tight md:text-5xl">

                <RevealText text="Have a problem?" stagger={0.06} duration={0.5} blurAmount={5} />

                <span className="block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  <RevealText text="Let's start a conversation." delay={0.2} stagger={0.06} duration={0.5} blurAmount={5} />
                </span>

              </h2>

              <RevealText
                as="p"
                text="Tell us what you're trying to solve. We'll help you explore the right technology and turn the idea into something useful."
                delay={0.3}
                stagger={0.03}
                duration={0.5}
                blurAmount={4}
                className="mt-5 max-w-xl leading-7 text-slate-400"
              />

            </div>

            <motion.a
              href="https://wa.me/94760041594?text=Hello%2C%20I%20would%20like%20to%20start%20a%20conversation"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-7 py-4 font-bold shadow-[0_15px_50px_rgba(14,165,233,.18)]"
            >

              Start a Conversation

              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </motion.a>

          </div>

        </div>

        {/* =================================================
            FOOTER CONTENT
        ================================================= */}

        <div className="grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >

              {/* Logo */}

              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_0_35px_rgba(56,189,248,.22)]">
              <Image
                src="/images/logo.png"
                alt="Neirah Tech Solutions"
                width={48}
                height={48}
                priority
                className="h-10 w-10 object-contain"
              />
            </div>

              <div>

                <p className="text-xl font-black tracking-tight">
                  Neirah
                  <span className="text-sky-400">
                    Tech
                  </span>
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
                  Solutions
                </p>

              </div>

            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-slate-500">
              Technology solutions built around real business problems.
              From hardware beginnings to modern software solutions,
              we&apos;re continuing the journey.
            </p>

            {/* Social */}

            <div className="mt-7 flex items-center gap-3">

              <SocialIcon
                href="https://lk.linkedin.com/company/neirah-tech-solution"
                label="LinkedIn"
              >
                <LinkedInIcon size={17} />
              </SocialIcon>

              <SocialIcon
                href="https://www.facebook.com/neirahtech/"
                label="Facebook"
              >
                <FacebookIcon size={17} />
              </SocialIcon>

              <SocialIcon
                href="https://www.instagram.com/neirah_tech/"
                label="Instagram"
              >
                <InstagramIcon size={17} />
              </SocialIcon>
            </div>

          </div>

          {/* =================================================
              COMPANY
          ================================================= */}

          <FooterColumn
            title="Company"
            links={footerLinks.company}
          />

          {/* =================================================
              SERVICES
          ================================================= */}

          <FooterColumn
            title="Solutions"
            links={footerLinks.services}
          />

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
              Get in touch
            </h3>

            <div className="mt-7 space-y-5">

              <ContactItem
                icon={<Mail size={17} />}
                text="info@neirahtech.com"
                href="mailto:info@neirahtech.com"
              />

              <ContactItem
                icon={<Phone size={17} />}
                text="+94 76 004 1594"
                href="tel:+94760041594"
              />

              <ContactItem
                icon={<MapPin size={17} />}
                text="Sri Lanka"
                href="/contact"
              />

            </div>

          </div>

        </div>

        {/* =================================================
            GLOBAL PROOF
        ================================================= */}

        <div className="border-y border-white/[0.06] py-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-slate-500">
              Building technology across borders.
            </p>

            <div className="flex items-center gap-7">

              <Proof
                value="10+"
                label="Years"
              />

              <div className="h-8 w-px bg-white/10" />

              <Proof
                value="11+"
                label="Countries"
              />

            </div>

          </div>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="flex flex-col gap-5 pt-7 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Neirah Tech Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-slate-300"
            >
              Terms
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}) {
  return (
    <div>

      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>

      <ul className="mt-7 space-y-4">

        {links.map((link) => (
          <li key={link.name}>

            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors duration-300 hover:text-white"
            >

              <span>
                {link.name}
              </span>

              <ArrowUpRight
                size={13}
                className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
              />

            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500 transition-colors hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-400"
    >
      {children}
    </motion.a>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-500 transition-colors group-hover:bg-sky-400/10 group-hover:text-sky-400">
        {icon}
      </div>

      <span className="pt-1 text-sm text-slate-500 transition-colors group-hover:text-white">
        {text}
      </span>

    </a>
  );
}

/* =========================================================
   PROOF
========================================================= */

function Proof({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-xl font-black text-white">
        {value}
      </span>

      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
        {label}
      </span>

    </div>
  );
}