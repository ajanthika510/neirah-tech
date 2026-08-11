"use client";

import { useState } from "react";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Solutions from "./components/Solutions";
import Footer from "./components/layout/Footer";
import ServiceSection from "./components/home/ServiceSection";  
import FeaturedProjects from "./components/home/FeaturedProjects";
import ProjectCTA from "./components/home/ProjectCTA";  
import UIUXLab from "./components/home/UIUXLab";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-deep text-text-white antialiased overflow-x-hidden">
      {/* Dynamic Navigation */}
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      {/* Main Page Layout */}
      <main className="flex-grow">
        <Hero />
        <ServiceSection />
        <UIUXLab />
        <FeaturedProjects />
        <ProjectCTA />
        <Testimonials />
      </main>

      {/* Footer and Interactive Contacts */}
      <Footer />
    </div>
  );
}
