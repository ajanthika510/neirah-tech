"use client";

import { useEffect, useState } from "react";

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
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Only show splash screen once per browser session
    const hasSeen = sessionStorage.getItem("splash_seen");
    if (!hasSeen) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splash_seen", "1");
  };

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
        />
      )}

      {/* Main Website */}
      <div className="flex min-h-screen flex-col bg-[#F8FBFF] text-slate-900 antialiased">
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