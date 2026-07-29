"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — Editorial Boutique
   
   Center-aligned bold statement with sage highlighted word
   Real product photo floating below with soft shadow
   Clean, focused, editorial magazine feel
   Mobile-optimized (no polaroid clutter)
   ═══════════════════════════════════════════════════════════ */

export default function Hero() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("hero");
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream pt-8 pb-16 lg:pt-16 lg:pb-24 min-h-[95vh] flex items-center"
    >
      {/* ═══════════════════════════════════════════════════
          DECORATIVE BACKGROUND ELEMENTS
          ═══════════════════════════════════════════════════ */}

      {/* Sage blur orb - top right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage/8 blur-3xl pointer-events-none"
      />

      {/* Butter blur orb - bottom left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-butter/20 blur-3xl pointer-events-none"
      />

      {/* Floating sparkles - top left decoration */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="hidden lg:block absolute top-24 left-16 pointer-events-none"
        aria-hidden="true"
      >
        <Sparkles className="w-6 h-6 text-sage/40" strokeWidth={1.5} />
      </motion.div>

      {/* Floating sparkles - top right decoration */}
      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="hidden lg:block absolute top-40 right-20 pointer-events-none"
        aria-hidden="true"
      >
        <Sparkles className="w-8 h-8 text-butter/50" strokeWidth={1.5} />
      </motion.div>

      {/* Floating sparkles - bottom right */}
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="hidden lg:block absolute bottom-32 right-32 pointer-events-none"
        aria-hidden="true"
      >
        <Sparkles className="w-5 h-5 text-sage/30" strokeWidth={1.5} />
      </motion.div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* ═══════════════════════════════════════════════════
              KICKER — Location badge
              ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 lg:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-body font-semibold tracking-[0.3em] uppercase text-sage">
              Handmade in Mulund · Mumbai
            </span>
            <Sparkles className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              HEADLINE — Big bold with sage highlighter
              ═══════════════════════════════════════════════════ */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-forest mb-6 lg:mb-8 tracking-tight"
          >
            Blooms that never{" "}
            <span className="relative inline-block">
              {/* Sage highlighter effect */}
              <span
                className="relative z-10 italic text-forest"
                style={{
                  backgroundImage: `linear-gradient(
                    to bottom,
                    transparent 55%,
                    rgba(134, 145, 121, 0.4) 55%,
                    rgba(134, 145, 121, 0.4) 92%,
                    transparent 92%
                  )`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  padding: "0 0.15em",
                  display: "inline-block",
                  transform: "rotate(-1deg)",
                }}
              >
                wither.
              </span>
            </span>
          </motion.h1>

          {/* ═══════════════════════════════════════════════════
              DESCRIPTION
              ═══════════════════════════════════════════════════ */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-base sm:text-lg lg:text-xl leading-relaxed text-forest/70 max-w-xl mx-auto mb-8 lg:mb-10 px-4"
          >
            Crochet florals gifted from the heart — handmade with love, thread by thread, in a quiet Mulund studio.
          </motion.p>

          {/* ═══════════════════════════════════════════════════
              CTAs — WhatsApp + Shop Collection
              ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 lg:mb-16 w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            <a
              href={buildWhatsAppLink({ type: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="group inline-flex items-center justify-center gap-2 bg-forest text-cream px-8 py-4 rounded-full text-xs sm:text-sm font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
              aria-label="Order via WhatsApp"
            >
              <MessageCircle
                className="w-4 h-4 transition-transform group-hover:rotate-12"
                aria-hidden="true"
              />
              Order via WhatsApp
            </a>

            <Link
              href="/collections"
              className="group inline-flex items-center justify-center gap-2 border border-forest/25 bg-transparent text-forest px-8 py-4 rounded-full text-xs sm:text-sm font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage/10 hover:border-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
              aria-label="Shop the collection"
            >
              Shop Collection
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              HERO IMAGE — Photo #5 (Lily Bouquet)
              Floating with soft shadow, slight tilt
              ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
          >
            {/* Photo container with soft shadow and slight tilt */}
            <div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-[-1deg] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(44, 51, 42, 0.25), 0 10px 20px -5px rgba(134, 145, 121, 0.15)",
              }}
            >
              <Image
                src="/images/hero-bouquet-lily-outdoor.jpg"
                alt="Handcrafted crochet lily bouquet wrapped in turquoise tissue paper — held outdoors"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                className="object-cover"
              />

              {/* Subtle overlay for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest/10 via-transparent to-transparent pointer-events-none"
              />
            </div>

            {/* Floating badge on photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 z-20"
              aria-hidden="true"
            >
              <div className="bg-butter text-forest px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border-2 border-cream">
                <p className="font-display italic text-xs sm:text-sm leading-none">
                  new
                </p>
              </div>
            </motion.div>

            {/* Decorative sparkle on photo corner */}
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="absolute -bottom-4 -left-4 z-20"
              aria-hidden="true"
            >
              <Sparkles
                className="w-8 h-8 text-sage"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              TRUST BADGES — Bottom
              ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 lg:mt-14 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-sage"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs font-body text-forest/60 tracking-[0.15em] uppercase">
                100% Handcrafted
              </span>
            </div>
            <span
              className="h-4 w-px bg-taupe hidden sm:block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-sage"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs font-body text-forest/60 tracking-[0.15em] uppercase">
                Made to Order
              </span>
            </div>
            <span
              className="h-4 w-px bg-taupe hidden sm:block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-sage"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-xs font-body text-forest/60 tracking-[0.15em] uppercase">
                Ships All India
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}