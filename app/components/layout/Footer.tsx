"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],

  services: [
    { name: "Software Solutions", href: "/services" },
    { name: "Web Development", href: "/services" },
    { name: "Business Solutions", href: "/services" },
    { name: "Technology Consulting", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617] text-white">

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

                <span className="text-xs font-bold tracking-[0.2em] text-sky-300">
                  LET'S BUILD SOMETHING
                </span>

              </div>

              <h2 className="text-3xl font-black leading-tight md:text-5xl">

                Have a problem?

                <span className="block bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Let's start a conversation.
                </span>

              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                Tell us what you're trying to solve. We'll help you explore
                the right technology and turn the idea into something useful.
              </p>

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

            <a
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

            </a>


            <p className="mt-7 max-w-sm text-sm leading-7 text-slate-500">
              Technology solutions built around real business problems.
              From hardware beginnings to modern software solutions,
              we're continuing the journey.
            </p>


            {/* Social */}

            <div className="mt-7 flex items-center gap-3">

              <SocialIcon
  href="https://www.bing.com/ck/a?!&&p=375376f650a805c56689b35f5c5171864d69fee92a89c6867d4f098cc2f57a49JmltdHM9MTc4NjQ5MjgwMA&ptn=3&ver=2&hsh=4&fclid=0e98dcc1-51b3-634b-2ad5-cb8b50d36262&psq=neirah+tech&u=a1aHR0cHM6Ly9say5saW5rZWRpbi5jb20vY29tcGFueS9uZWlyYWgtdGVjaC1zb2x1dGlvbg"
  label="LinkedIn"
>
  <FaLinkedinIn size={17} />
</SocialIcon>

<SocialIcon
  href="https://www.bing.com/ck/a?!&&p=e3c89d34bd57e2d7e5bd0155c8cf0278a2ad22b29ebc8c7953fcdaef8b0a5203JmltdHM9MTc4NjQ5MjgwMA&ptn=3&ver=2&hsh=4&fclid=0e98dcc1-51b3-634b-2ad5-cb8b50d36262&psq=neirah+tech&u=a1aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL25laXJhaHRlY2gv"
  label="Facebook"
>
  <FaFacebookF size={17} />
</SocialIcon>

<SocialIcon
  href="https://www.bing.com/ck/a?!&&p=ebc15db7b6300c476c7bd2b2410e5b8f31828da989d6083beb79ccbd2f8be3f7JmltdHM9MTc4NjQ5MjgwMA&ptn=3&ver=2&hsh=4&fclid=0e98dcc1-51b3-634b-2ad5-cb8b50d36262&psq=neirah+tech&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9uZWlyYWhfdGVjaC8"
  label="Instagram"
>
  <FaInstagram size={17} />
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
                href="#"
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

            <a
              href="/privacy"
              className="transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="transition-colors hover:text-slate-300"
            >
              Terms
            </a>

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

            <a
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

            </a>

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