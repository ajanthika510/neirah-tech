import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BookingEngine from "../components/scheduler/BookingEngine";

export const metadata: Metadata = {
  title: "Schedule a Consultation | Neirah Tech Solution",
  description:
    "Reserve a 1-on-1 strategy and architecture session with our lead software engineers and AI consultants.",
};

export default function SchedulerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FBFF] text-slate-900 antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32 sm:pt-40 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-sky-400/10 blur-[140px]" />
        <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-indigo-400/10 blur-[120px]" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          {/* Page Hero Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={13} />
              Direct Architecture Consultation
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Schedule a Strategy Session with <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Neirah Tech</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Reserve a 1-on-1 strategy and architecture session with our lead software engineers and AI consultants. Let&apos;s map out your roadmap.
            </p>
          </div>

          {/* Main Scheduler Container */}
          <div className="rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] overflow-hidden">
            <BookingEngine />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}