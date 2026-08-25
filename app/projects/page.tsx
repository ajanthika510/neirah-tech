import type { Metadata } from "next";
import Header from "../components/layout/Header";  
import Footer from "../components/layout/Footer";
import Projects from "../components/projects/Projects";
import { getProjects } from "../actions/projectActions";

export const metadata: Metadata = {
  title: "Our Projects | Neirah Tech",
  description:
    "Explore websites, platforms, e-commerce solutions and digital experiences developed by Neirah Tech for businesses around the world.",
};

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return (
    <main className="min-h-screen bg-[#f5faff]">
      <Header />
      <Projects initialProjects={initialProjects} />
      <Footer />
    </main>
  );
}