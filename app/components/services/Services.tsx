"use client";

import FloatingBackground from "./FloatingBackground";
import SectionHeading from "./SectionHeading";
import BusinessGoals from "./BusinessGoals";

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-indigo-50 py-28">

      <FloatingBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <SectionHeading />

        <BusinessGoals />

      </div>

    </section>
  );
}