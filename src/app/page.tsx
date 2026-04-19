import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      {/* AboutSection, FAQSection, CTASection will be added in Plan 04 */}
    </main>
  );
}
