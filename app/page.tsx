"use client";

import { useState } from "react";

import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import ServiceSection from "./components/home/ServiceSection";
import FeaturedProjects from "./components/home/FeaturedProjects";
import ProjectCTA from "./components/home/ProjectCTA";
import UIUXLab from "./components/home/UIUXLab";
import Testimonials from "./components/home/Testimonials";
import SplashScreen from "./components/splash/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Main Website */}
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
    </>
  );
}