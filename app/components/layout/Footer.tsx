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
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
    { name: "Case Studies", href: "/case-studies" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],

  services: [
    { name: "Business Website", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "AI Assistant & Agents", href: "/services" },
    { name: "Digital Marketing", href: "/services" },
    { name: "Enterprise Software", href: "/services" },
    { name: "Smart Devices & IoT", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-slate-800/80 bg-[#020617] text-white pointer-events-auto select-none">
      {/* AMBIENT FLOATING GLOW LIGHTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle Precision Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-sky-500/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[130px]"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-6 sm:px-8 sm:pt-14 sm:pb-8 lg:px-10">
        {/* =========================================================
            STREAMLINED COMPACT CALL-TO-ACTION BAR
        ========================================================= */}
        <div className="relative overflow-hidden rounded-2xl border border-sky-400/20 bg-slate-900/80 p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-sky-400/40">
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-500/10 blur-[40px]" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                <Sparkles size={15} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Have a problem? <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Let&apos;s start a conversation.</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Partner with our engineering team to build your next digital product.</p>
              </div>
            </div>

            <motion.a
              href="https://wa.me/94760041594?text=Hello%2C%20I%20would%20like%20to%20start%20a%20conversation%20with%20Neirah%20Tech"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md transition-all hover:shadow-sky-500/25 cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>
        </div>

        {/* =========================================================
            FOUR-COLUMN ENTERPRISE FOOTER NAVIGATION
        ========================================================= */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-12 lg:text-left items-start border-b border-slate-800/80 pb-10">
          
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="lg:col-span-4 space-y-4 flex flex-col items-center lg:items-start">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-sky-400/40 p-1.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Neirah Tech Official Mark"
                  width={34}
                  height={34}
                  priority
                  className="h-full w-full object-contain drop-shadow"
                />
              </div>

              <div className="text-left">
                <p className="text-lg font-black tracking-tight text-white leading-none">
                  Neirah<span className="text-sky-400">Tech</span>
                </p>
                <p className="mt-1 text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-slate-400">
                  SOLUTIONS
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Engineering high-impact digital experiences, autonomous AI systems, and smart connected software built around core business growth.
            </p>

            {/* LIVE SYSTEM STATUS BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Systems Operational • 99.9% Uptime</span>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-2.5 pt-2">
              <SocialIcon href="https://lk.linkedin.com/company/neirah-tech-solution" label="LinkedIn">
                <LinkedInIcon size={15} />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/neirahtech/" label="Facebook">
                <FacebookIcon size={15} />
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/neirah_tech/" label="Instagram">
                <InstagramIcon size={15} />
              </SocialIcon>
            </div>
          </div>

          {/* COLUMN 2: COMPANY LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-sky-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="text-sky-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES & SOLUTIONS */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-sky-400">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="text-sky-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: DIRECT CONTACT & LOCATION */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-sky-400">
              Get In Touch
            </h4>
            <div className="space-y-3 w-full max-w-xs">
              <ContactCard
                icon={<Mail size={14} className="text-sky-400" />}
                label="Direct Email"
                value="info@neirahtech.com"
                href="mailto:info@neirahtech.com"
              />
              <ContactCard
                icon={<Phone size={14} className="text-sky-400" />}
                label="Phone Consultation"
                value="+94 76 004 1594"
                href="tel:+94760041594"
              />
              <ContactCard
                icon={<MapPin size={14} className="text-sky-400" />}
                label="Global Hub"
                value="Sri Lanka • Worldwide"
                href="/contact"
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT BAR & LEGAL LINKS
        ========================================================= */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>© {new Date().getFullYear()} Neirah Tech Solutions. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-6 font-medium text-slate-400">
            <Link href="/privacy" className="transition-colors hover:text-sky-400">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="transition-colors hover:text-sky-400">
              Terms of Service
            </Link>
            <span className="text-slate-700">•</span>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   HELPERS & SUBCOMPONENTS
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
      whileHover={{ y: -2, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
    >
      {children}
    </motion.a>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:border-sky-400/40 hover:bg-sky-400/[0.06] hover:shadow-[0_4px_20px_rgba(14,165,233,0.15)]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-sky-400 transition-colors group-hover:border-sky-400/40">
        {icon}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-xs font-bold text-slate-200 truncate group-hover:text-sky-300 transition-colors">{value}</p>
      </div>
      <ArrowUpRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </a>
  );
}

