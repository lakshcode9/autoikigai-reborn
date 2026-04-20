import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
