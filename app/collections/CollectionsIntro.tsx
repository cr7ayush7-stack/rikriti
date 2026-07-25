"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

/* ═══════════════════════════════════════════════════════════
   COLLECTIONS INTRO — Compact intro strip
   
   Just the "Back to Home" link + stats
   Full "Every piece" headline lives inside ProductCatalog
   Prevents duplicate headings
   ═══════════════════════════════════════════════════════════ */

export default function CollectionsIntro() {
  return (
    <section
      aria-label="Collections page intro"
      className="relative bg-cream pt-16 lg:pt-24 pb-4 lg:pb-6"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest/60 hover:text-sage transition-colors duration-300 group"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to Home
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-taupe/20 pb-4"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sage" aria-hidden="true" />
            <span className="text-xs font-body text-forest/70 tracking-wider">
              <span className="font-semibold text-forest">{PRODUCTS.length}</span> handcrafted pieces
            </span>
          </div>
          <div className="h-4 w-px bg-taupe hidden sm:block" aria-hidden="true" />
          <div className="text-xs font-body text-forest/60 tracking-wider">
            <span className="font-semibold text-forest">{CATEGORIES.length - 1}</span> categories
          </div>
          <div className="h-4 w-px bg-taupe hidden sm:block" aria-hidden="true" />
          <div className="text-xs font-body text-forest/60 tracking-wider">
            Made to order · Mulund, Mumbai
          </div>
        </motion.div>
      </div>
    </section>
  );
}