import { motion, Variants } from "framer-motion";
import Hero from "../components/Hero";
import YouTubeSection from "../components/YouTubeSection";
import CatalogSection from "../components/CatalogSection";
import ServicesSection from "../components/ServicesSection";
import FeaturesSection from "../components/FeaturesSection";
import ContactSection from "../components/ContactSection";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      
      <motion.div 
        id="youtube" 
        className="scroll-mt-[100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <YouTubeSection />
      </motion.div>

      <motion.div 
        id="catalog" 
        className="scroll-mt-[100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <CatalogSection />
      </motion.div>

      <motion.div 
        id="services" 
        className="scroll-mt-[100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <FeaturesSection />
      </motion.div>

      <motion.div 
        id="contacts" 
        className="scroll-mt-[100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <ContactSection />
      </motion.div>
    </>
  );
}
