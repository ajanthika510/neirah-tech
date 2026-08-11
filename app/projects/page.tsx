import type { Metadata } from "next";
import Header from "../components/layout/Header";  
import Footer from "../components/layout/Footer";
import Projects from "../components/projects/Projects";

export const metadata: Metadata = {
  title: "Our Projects | Neirah Tech",
  description:
    "Explore websites, platforms, e-commerce solutions and digital experiences developed by Neirah Tech for businesses around the world.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f5faff]">
        <Header />
      <Projects />
      <Footer />
    </main>
  );
}