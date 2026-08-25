import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Neirah Tech Solution",
  description: "Learn how Neirah Tech Solution collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] text-slate-900 antialiased">
      <Header />

      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-sky-400/10 blur-[140px]" />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-700 text-xs font-medium mb-6">
            <ShieldCheck size={14} />
            Privacy & Data Protection
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mb-12">
            Last updated: August 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Eye size={18} />
                </div>
                <h2>1. Information We Collect</h2>
              </div>
              <p>
                At Neirah Tech Solutions, we respect your privacy and are committed to protecting your personal data. We collect information you provide directly to us when contacting us, requesting demonstrations, scheduling consultations, or applying for open roles.
              </p>
              <p>
                This information may include your name, email address, phone number, company name, project details, and any attachments or messages you choose to share with us.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                  <Lock size={18} />
                </div>
                <h2>2. How We Use Your Information</h2>
              </div>
              <p>
                We use the information we collect strictly to deliver and improve our software development, design, and consulting services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Responding to inquiries, proposals, and project consultations</li>
                <li>Scheduling and hosting strategy and architecture sessions</li>
                <li>Processing career inquiries and applications</li>
                <li>Sending project updates, technical documentation, and administrative notices</li>
                <li>Ensuring security, compliance, and prevention of fraudulent activities</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <FileText size={18} />
                </div>
                <h2>3. Information Sharing and Security</h2>
              </div>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We employ industry-standard encryption, access controls, and security measures to protect your data from unauthorized access or disclosure.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg sm:text-xl">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <ShieldCheck size={18} />
                </div>
                <h2>4. Contact Us</h2>
              </div>
              <p>
                If you have questions about this Privacy Policy or how your data is handled, please reach out to us at:
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
