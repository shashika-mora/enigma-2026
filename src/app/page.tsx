import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoundsSection } from "@/components/sections/RoundsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { RulesSection } from "@/components/sections/RulesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E5E5E7] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoundsSection />
      <RulesSection />
      <TimelineSection />
      <RegistrationSection />
      <GallerySection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
