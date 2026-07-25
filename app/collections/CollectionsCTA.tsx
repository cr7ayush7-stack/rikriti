"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

export default function CollectionsCTA() {
  return (
    <section
      aria-labelledby="custom-cta-heading"
      className="relative bg-sage/[0.08] py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              One-of-a-kind Design
            </span>
          </div>

          <h2
            id="custom-cta-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-forest mb-6"
          >
            Something{" "}
            <em className="text-sage">completely yours.</em>
          </h2>

          <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed max-w-xl mx-auto mb-10">
            Have something specific in mind? Custom bouquets, personalised colors, special occasion pieces — we&apos;ll design it just for you.
          </p>

          {/* SINGLE CTA — Design Custom Piece */}
          <a
            href={buildWhatsAppLink({ type: "custom" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("custom_order", "collections_cta")}
            className="group inline-flex items-center justify-center gap-2 bg-forest text-cream px-10 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
          >
            <Sparkles
              className="w-4 h-4 transition-transform group-hover:rotate-12"
              aria-hidden="true"
            />
            Design Custom Piece
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-8 border-t border-taupe/30 max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
              <span className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                Quick Response
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
              <span className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                Personal Touch
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
              <span className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                Free Gift Note
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}