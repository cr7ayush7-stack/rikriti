import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import HotDrops from "@/components/sections/HotDrops";
import CurvedBrandBreak from "@/components/ui/CurvedBrandBreak";
import Story from "@/components/sections/Story";
import TrustPillars from "@/components/sections/TrustPillars";
import SocialProof from "@/components/sections/SocialProof";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileBottomNav from "@/components/ui/MobileBottomNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section — Polaroid stack + editorial headline */}
      <Hero />

      {/* Hot Drops — 3 featured categories (sticky content switch) */}
      <HotDrops />

      {/* Curved Brand Break — Editorial breath */}
      <CurvedBrandBreak />

      {/* Story Section — Behind Every Stitch */}
      <Story />

      {/* Trust Pillars — The rikriti Promise */}
      <TrustPillars />

      {/* Social Proof — Reviews marquee */}
      <SocialProof />

      {/* Footer — Editorial with flowers */}
      <Footer />

      {/* Floating WhatsApp Button (desktop only) */}
      <FloatingWhatsApp />

      {/* Mobile Bottom Nav (mobile only) */}
      <MobileBottomNav />
    </main>
  );
}