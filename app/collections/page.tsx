import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import ProductCatalog from "@/components/sections/ProductCatalog";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import CollectionsIntro from "./CollectionsIntro";
import CollectionsCTA from "./CollectionsCTA";

/* ═══════════════════════════════════════════════════════════
   COLLECTIONS PAGE — Metadata
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Collections — Handmade Crochet Florals",
  description:
    "Browse rikriti's complete collection of handcrafted crochet bouquets, hair accessories, wearables, and gifting sets. Made to order in Mulund, Mumbai.",
  openGraph: {
    title: "The Complete Collection | rikriti",
    description:
      "Explore handcrafted crochet florals, bouquets & accessories. Order via WhatsApp.",
    url: "https://rikriti.in/collections",
    type: "website",
  },
  alternates: {
    canonical: "https://rikriti.in/collections",
  },
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <CollectionsIntro />
      <ProductCatalog />
      <CollectionsCTA />
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </main>
  );
}