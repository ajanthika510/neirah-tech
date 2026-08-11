"use client";

import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import ServiceSection from "./components/home/ServiceSection";
import FeaturedProjects from "./components/home/FeaturedProjects";
import ProjectCTA from "./components/home/ProjectCTA";
import UIUXLab from "./components/home/UIUXLab";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-bg-deep text-text-white antialiased">
      {/* Navigation */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-grow">
        <Hero />
        <ServiceSection />
        <UIUXLab />
        <FeaturedProjects />
        <ProjectCTA />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

