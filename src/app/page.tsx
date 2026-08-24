import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeBuildSection from "@/components/sections/WhatWeBuildSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <WhatWeBuildSection />
      <CaseStudiesSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
