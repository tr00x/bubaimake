import Hero from "../components/Hero";
import YouTubeSection from "../components/YouTubeSection";
import CatalogSection from "../components/CatalogSection";
import ServicesSection from "../components/ServicesSection";
import FeaturesSection from "../components/FeaturesSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="youtube" className="scroll-mt-[100px]">
        <YouTubeSection />
      </div>
      <div id="catalog" className="scroll-mt-[100px]">
        <CatalogSection />
      </div>
      <div id="services" className="scroll-mt-[100px]">
        <ServicesSection />
      </div>
      <FeaturesSection />
      <div id="contacts" className="scroll-mt-[100px]">
        <ContactSection />
      </div>
    </>
  );
}
