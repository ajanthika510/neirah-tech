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

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
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

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 bottom-0 h-[220px] w-[220px] rounded-full bg-sky-500/10 blur-[90px]"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 top-5 h-[220px] w-[220px] rounded-full bg-indigo-500/10 blur-[90px]"
        />
      </div>

      {/* MAIN FOOTER CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* COMPACT TOP CTA CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-500/10 blur-[60px]" />

          <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="max-w-lg space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-3 py-0.5">
                <Sparkles size={11} className="text-sky-400" />
                <RevealText
                  as="span"
                  text="LET'S BUILD SOMETHING"
                  stagger={0.03}
                  duration={0.3}
                  blurAmount={2}
                  className="text-[10px] font-bold tracking-[0.18em] text-sky-300"
                />
              </div>

              <h2 className="text-lg sm:text-xl font-black leading-tight">
                <RevealText text="Have a problem?" stagger={0.04} duration={0.35} blurAmount={3} />{" "}
                <span className="inline-block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  <RevealText text="Let's start a conversation." delay={0.1} stagger={0.04} duration={0.35} blurAmount={3} />
                </span>
              </h2>
            </div>

            <motion.a
              href="https://wa.me/94760041594?text=Hello%2C%20I%20would%20like%20to%20start%20a%20conversation"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>
        </div>

        {/* COMPACT FOOTER COLUMNS */}
        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1fr]">

          {/* BRAND */}
          <div className="space-y-2.5">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Neirah Tech Solutions"
                  width={30}
                  height={30}
                  priority
                  className="h-6 w-6 object-contain"
                />
              </div>

              <div>
                <p className="text-base font-black tracking-tight leading-none">
                  Neirah<span className="text-sky-400">Tech</span>
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600 mt-0.5">
                  Solutions
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-[11px] leading-relaxed text-slate-400">
              Technology solutions built around real business problems. From hardware beginnings to modern software platforms.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-0.5">
              <SocialIcon href="https://lk.linkedin.com/company/neirah-tech-solution" label="LinkedIn">
                <LinkedInIcon size={14} />
              </SocialIcon>

              <SocialIcon href="https://www.facebook.com/neirahtech/" label="Facebook">
                <FacebookIcon size={14} />
              </SocialIcon>

              <SocialIcon href="https://www.instagram.com/neirah_tech/" label="Instagram">
                <InstagramIcon size={14} />
              </SocialIcon>
            </div>
          </div>

          {/* COMPANY */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* SOLUTIONS */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Solutions
            </h3>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-[11px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="truncate">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Get in touch
            </h3>

            <div className="mt-2.5 space-y-2">
              <ContactItem
                icon={<Mail size={13} />}
                text="info@neirahtech.com"
                href="mailto:info@neirahtech.com"
              />

              <ContactItem
                icon={<Phone size={13} />}
                text="+94 76 004 1594"
                href="tel:+94760041594"
              />

              <ContactItem
                icon={<MapPin size={13} />}
                text="Sri Lanka"
                href="/contact"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Neirah Tech Solutions. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition-colors hover:text-slate-300">
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
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>

      <ul className="mt-2.5 space-y-1.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-[11px] text-slate-400 transition-colors duration-200 hover:text-white"
            >
              <span>{link.name}</span>
              <ArrowUpRight
                size={11}
                className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-sky-400"
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
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-400 transition-colors hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-400"
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
    <a href={href} className="group flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-slate-400 transition-colors group-hover:bg-sky-400/10 group-hover:text-sky-400">
        {icon}
      </div>
      <span className="text-[11px] text-slate-400 transition-colors group-hover:text-white">
        {text}
      </span>
    </a>
  );
}