import Services from "../components/services/Services";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      <Services />
      <Footer />
    </main>
  );
}
