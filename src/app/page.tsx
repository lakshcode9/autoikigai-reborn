import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeBuildSection from "@/components/sections/WhatWeBuildSection";
import WhySection from "@/components/sections/WhySection";
import PricingSection from "@/components/sections/PricingSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

// Hidden sections - keep components, enable when we have real results
// import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <WhatWeBuildSection />
      <WhySection />
      <PricingSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
