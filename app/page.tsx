import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ContactSection } from "@/components/sections/contact";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}
