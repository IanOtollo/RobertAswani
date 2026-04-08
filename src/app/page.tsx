import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorksSection from "@/components/home/WorksSection";
import PricingSection from "@/components/home/PricingSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="relative bg-transparent w-full min-h-screen z-10">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AboutSection />
        <ServicesSection />
        <WorksSection />
        <PricingSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}

