import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle2, AlertCircle, FileCode } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Neirah Tech Solution",
  description: "Review the Terms of Service for using Neirah Tech Solution products, services, and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] text-slate-900 antialiased">
      <Header />

      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-400/10 blur-[140px]" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-medium mb-6">
            <Scale size={14} />
            Terms & Conditions
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mb-12">
            Last updated: August 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <CheckCircle2 size={18} />
                </div>
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p>
                By accessing or using the Neirah Tech Solutions website, digital platforms, consultation tools, and software services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                  <FileCode size={18} />
                </div>
                <h2>2. Services and Intellectual Property</h2>
              </div>
              <p>
                All content, designs, source code, visual interfaces, graphics, logos, and materials on this website are the intellectual property of Neirah Tech Solutions or our licensors and are protected by applicable copyright, trademark, and trade secret laws.
              </p>
              <p>
                Client project deliverables, code ownership, and license terms are governed by specific project statements of work (SOW) and service level agreements (SLA) executed between Neirah Tech and our clients.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <AlertCircle size={18} />
                </div>
                <h2>3. Consultation & Booking Terms</h2>
              </div>
              <p>
                Consultations, strategy sessions, and demo bookings scheduled via our booking engine are subject to availability and confirmation. Neirah Tech reserves the right to reschedule or cancel sessions in consultation with the client when technical or scheduling conflicts arise.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Scale size={18} />
                </div>
                <h2>4. Governing Law & Contact</h2>
              </div>
              <p>
                These terms are governed by and construed in accordance with the laws of Sri Lanka. For any questions or legal notices regarding these Terms of Service, please contact us at:
              </p>
              <div className="pt-2 text-slate-800 font-semibold space-y-1">
                <p>Neirah Tech Solutions</p>
                <p>Email: <a href="mailto:info@neirahtech.com" className="text-sky-600 hover:underline">info@neirahtech.com</a></p>
                <p>Phone: <a href="tel:+94760041594" className="text-sky-600 hover:underline">+94 76 004 1594</a></p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
