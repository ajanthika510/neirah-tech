"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-bg-deep border-t border-white/5 pt-20 pb-8 text-xs font-normal relative select-none">
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/94771234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </a>

        {/* Back to Top Button */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-bg-secondary border border-white/10 hover:border-accent-cyan/30 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-accent-cyan" />
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-blue to-accent-cyan flex items-center justify-center font-display font-extrabold text-white text-lg tracking-wider">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Neirah<span className="text-accent-cyan">Tech</span>
              </span>
            </a>
            <p className="text-text-gray text-xs leading-relaxed max-w-sm font-normal">
              We design and engineer enterprise-grade ERP modules, POS solutions and secure custom AI software for retail owners, textile factories, and SMEs across Sri Lanka.
            </p>
          </div>

          {/* Solutions Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2.5 font-medium text-text-gray">
              <li>
                <button onClick={() => handleNavClick("solutions")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  POS Counter billing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("solutions")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  Inventory Control Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("solutions")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  Accounts & Tax Modules
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("solutions")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  AI Integration Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 font-medium text-text-gray">
              <li>
                <button onClick={() => handleNavClick("metrics")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  Performance Metrics
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("testimonials")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  Success Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("scheduler")} className="hover:text-accent-cyan hover:underline text-left cursor-pointer">
                  Demo Booking Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 font-medium text-text-gray">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span className="leading-relaxed">104 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-cyan shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
                <a href="mailto:info@neirahtech.com" className="hover:text-accent-cyan hover:underline">
                  info@neirahtech.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-text-gray font-medium">
          <p>&copy; {new Date().getFullYear()} Neirah Tech Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Rules</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Operations</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
