import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Feather, Clock, Truck, AlertCircle, Sparkles, type LucideIcon } from "lucide-react";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import { POLICIES } from "@/lib/policies";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ICON_MAP: Record<string, LucideIcon> = {
  Feather,
  Clock,
  Truck,
  AlertCircle,
  Sparkles,
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.128 6.746 3.048 9.378L1.05 31.328l6.156-1.968A15.906 15.906 0 0 0 16 32c8.826 0 16-7.174 16-16S24.826 0 16.004 0zm9.31 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826s1.166-3.416 1.636-3.896c.386-.394.836-.574 1.166-.574.13 0 .246.006.352.012.336.014.504.034.726.564.276.664.948 2.36 1.028 2.526.082.166.164.392.052.612-.106.226-.2.328-.366.518-.166.19-.324.336-.49.54-.152.176-.324.364-.132.696.192.324.854 1.408 1.83 2.276 1.258 1.12 2.28 1.478 2.646 1.63.272.112.598.086.798-.126.254-.274.566-.728.884-1.176.226-.322.512-.362.812-.248.306.106 1.928.91 2.258 1.076.33.166.548.246.628.386.078.14.078.798-.308 1.888z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Shop Policies — Shipping, Cancellations & More",
  description:
    "rikriti's shop policies: handmade timeline, shipping, cancellations, and custom orders. Everything you need to know before ordering.",
  openGraph: {
    title: "Shop Policies | rikriti",
    description: "Handmade timeline, shipping, cancellations, and custom orders info.",
  },
  alternates: {
    canonical: "https://rikriti.in/policies",
  },
};

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-cream pt-16 lg:pt-24 pb-8 lg:pb-12 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl pointer-events-none"
        />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest/60 hover:text-sage transition-colors duration-300 group"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Home
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-sage" aria-hidden="true" />
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
                The Fine Print
              </span>
              <span className="h-px w-8 bg-sage" aria-hidden="true" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-forest mb-6">
              Shop{" "}
              <em className="text-sage">Policies.</em>
            </h1>

            <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed max-w-xl mx-auto">
              Everything you need to know before placing an order. Transparency is important to us.
            </p>
          </div>
        </div>
      </section>

      {/* Policies List */}
      <section className="py-12 lg:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 lg:space-y-8">
            {POLICIES.map((policy, index) => {
              const Icon = ICON_MAP[policy.icon];

              return (
                <div
                  key={policy.id}
                  id={policy.id}
                  className="relative bg-ivory border border-taupe/40 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 scroll-mt-24"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sage/10 flex items-center justify-center">
                      {Icon && (
                        <Icon
                          className="w-5 h-5 sm:w-6 sm:h-6 text-sage"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-display italic text-2xl sm:text-3xl text-sage/70">
                          0{index + 1}
                        </span>
                        <h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-forest leading-tight">
                          {policy.title}
                        </h2>
                      </div>

                      <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-sage mb-3">
                        {policy.short}
                      </p>

                      <p className="font-body text-sm sm:text-base text-forest/75 leading-relaxed">
                        {policy.full}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 lg:mt-20 text-center">
            <div className="max-w-md mx-auto p-6 sm:p-8 bg-sage/[0.08] border border-sage/20 rounded-2xl">
              <p className="font-display italic text-xl sm:text-2xl text-forest mb-3 leading-tight">
                Have questions?
              </p>
              <p className="font-body text-sm text-forest/70 mb-6">
                We&apos;re happy to help clarify anything before you order.
              </p>
              <a
                href={buildWhatsAppLink({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg min-h-[48px]"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </main>
  );
}