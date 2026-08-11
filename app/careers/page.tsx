import Navbar from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import CareersHero from "../components/careers/CareersHero";
import CareersBenefits from "../components/careers/CareersBenefits";
import LifeAtNeirah from "../components/careers/LifeAtNeirah";
import OpenPositions from "../components/careers/OpenPositions";
import HiringProcess from "../components/careers/HiringProcess";
import CareersCTA from "../components/careers/CareersCTA";

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7FAFF] text-[#14213D]">
      <Navbar />

      <CareersHero />

      <CareersBenefits />

      <LifeAtNeirah />

      <OpenPositions />

      <HiringProcess />


      <CareersCTA />

      <Footer />
    </main>
  );
}