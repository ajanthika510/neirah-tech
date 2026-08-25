"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BookingEngine from "../scheduler/BookingEngine";

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function SchedulerModal({
  isOpen,
  onClose,
  defaultService,
}: SchedulerModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-3 py-4 sm:px-6 sm:py-8 backdrop-blur-md overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_25px_90px_rgba(15,23,42,0.18)] text-slate-900 flex flex-col md:flex-row my-auto"
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sky-400/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-400/10 blur-[100px]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200/80 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <BookingEngine isModal onClose={onClose} defaultService={defaultService} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}