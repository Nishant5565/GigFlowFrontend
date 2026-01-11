import React from "react";
import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import AudienceSection from "@/components/home/AudienceSection";
import CTA from "@/components/home/CTA";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <Features />
      <AudienceSection />
      <CTA />
    </main>
  );
};

export default HomePage;
