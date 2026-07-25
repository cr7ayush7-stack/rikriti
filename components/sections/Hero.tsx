"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { HERO_POLAROIDS } from "@/lib/products";

export default function Hero() {
  const [activePolaroidIndex, setActivePolaroidIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop breakpoint for polaroid rotation
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    if (mediaQuery.matches !== isDesktop) {
      setIsDesktop(mediaQuery.matches);
    }
  }

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("hero");
  };

  

  const mobileRotations = ["-2deg", "0deg", "2deg"];
  const desktopRotations = ["-6deg", "0deg", "6deg"];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream pt-8 pb-16 lg:pt-16 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="z-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-sage" aria-hidden="true" />
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
                Made in Mulund · Mumbai
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-forest mb-6 tracking-tight"
            >
              Blooms that
              <br />
              <em className="text-sage">never wither.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-body text-base sm:text-lg lg:text-xl leading-relaxed text-forest/75 max-w-lg mb-10"
            >
              Handcrafted crochet florals, bouquets, and gifting sets — made with love, thread by thread, for the people you love most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
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
                aria-label="Explore the full collection"
              >
                See the Collection
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sage" aria-hidden="true" />
                <span className="text-xs font-body text-forest/60 tracking-wider">
                  100% Handcrafted
                </span>
              </div>
              <div className="h-4 w-px bg-taupe hidden sm:block" aria-hidden="true" />
              <div className="text-xs font-body text-forest/60 tracking-wider">
                Made to Order
              </div>
              <div className="h-4 w-px bg-taupe hidden sm:block" aria-hidden="true" />
              <div className="text-xs font-body text-forest/60 tracking-wider">
                Ships Nationwide
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — POLAROID STACK ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-1 lg:order-2 flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] px-4 sm:px-8 lg:px-0"
          >
            <div className="relative w-[min(280px,calc(100vw-96px))] sm:w-[380px] lg:w-[420px] aspect-square">
              {HERO_POLAROIDS.map((polaroid, index) => {
                const mobilePositions = [
                  "translate-x-[-8%] translate-y-[3%]",
                  "translate-x-0 translate-y-0",
                  "translate-x-[8%] translate-y-[6%]",
                ];
                const desktopPositions = [
                  "sm:translate-x-[-15%] sm:translate-y-[5%]",
                  "sm:translate-x-0 sm:translate-y-0",
                  "sm:translate-x-[15%] sm:translate-y-[10%]",
                ];

                const isActive = activePolaroidIndex === index;
                const currentRotation = isDesktop
                  ? desktopRotations[index]
                  : mobileRotations[index];

                return (
                  <motion.div
                    key={index}
                    drag
                    dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 },
                    }}
                    whileDrag={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 20,
                      cursor: "grabbing",
                    }}
                    onHoverStart={() => setActivePolaroidIndex(index)}
                    onHoverEnd={() => setActivePolaroidIndex(null)}
                    initial={{ opacity: 0, y: 50, rotate: currentRotation }}
                    animate={{ opacity: 1, y: 0, rotate: currentRotation }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + index * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ zIndex: polaroid.zIndex }}
                    className={`absolute inset-0 ${mobilePositions[index]} ${desktopPositions[index]} cursor-grab active:cursor-grabbing touch-none`}
                  >
                    <div className="relative w-full h-full bg-ivory p-3 sm:p-4 pb-14 sm:pb-20 rounded-sm shadow-xl border border-taupe/20 transition-shadow duration-300 hover:shadow-2xl">
                      <div className="relative w-full h-[75%] bg-taupe/10 overflow-hidden">
                        {polaroid.imageUrl.startsWith("URL_HERE") ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sage/20 to-taupe/20">
                            <Sparkles
                              className="w-8 h-8 text-sage/40 mb-2"
                              aria-hidden="true"
                            />
                            <span className="text-[10px] font-body text-forest/40 tracking-widest uppercase text-center px-2">
                              {polaroid.productName}
                            </span>
                          </div>
                        ) : (
                          <Image
                            src={polaroid.imageUrl}
                            alt={polaroid.imageAlt}
                            fill
                            priority={index === 1}
                            sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
                            className="object-cover"
                            draggable={false}
                          />
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between">
                        <span className="font-display italic text-xs sm:text-base text-forest truncate max-w-[70%]">
                          {polaroid.productName}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-body text-sage tracking-widest uppercase shrink-0">
                          {isActive ? "· drag" : "rikriti"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-body text-forest/40 tracking-widest uppercase whitespace-nowrap pointer-events-none"
              >
                ✨ hover · drag · explore
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}