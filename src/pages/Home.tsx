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
      <YouTubeSection />
      <CatalogSection />
      <ServicesSection />
      <FeaturesSection />
      <ContactSection />
    </>
  );
}
