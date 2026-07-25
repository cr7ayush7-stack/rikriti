"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { HOT_DROPS } from "@/lib/products";

export default function HotDrops() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      id="hot-drops"
      aria-labelledby="hot-drops-heading"
      className="relative bg-cream"
    >
      {/* ── SECTION HEADER ── */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              This Season&apos;s Favourites
            </span>
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </div>

          <h2
            id="hot-drops-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-forest mb-6"
          >
            Made with love,{" "}
            <em className="text-sage">chosen with care.</em>
          </h2>

          <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed">
            Three collections. Countless stories. Each piece hand-crocheted in Mulund with intention and love.
          </p>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          DESKTOP: STICKY SWITCH (lg+)
          ═══════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 relative">
            {/* LEFT: Sticky Text Panel */}
            <div className="relative">
              <div className="sticky top-32 h-[calc(100vh-10rem)] flex items-center">
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <div className="inline-flex items-center gap-3 mb-8">
                        <span className="font-display italic text-5xl text-sage">
                          {HOT_DROPS[activeIndex].number}
                        </span>
                        <span className="h-px w-16 bg-sage/40" aria-hidden="true" />
                        <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage/70">
                          {String(activeIndex + 1).padStart(2, "0")} / {String(HOT_DROPS.length).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-sage mb-4">
                        {HOT_DROPS[activeIndex].subtitle}
                      </p>

                      <h3 className="font-display text-5xl xl:text-6xl leading-[1.05] text-forest mb-6">
                        {HOT_DROPS[activeIndex].title}
                      </h3>

                      <p className="font-body text-lg text-forest/70 leading-relaxed max-w-md mb-10">
                        {HOT_DROPS[activeIndex].description}
                      </p>

                      {/* ── NAVIGATE TO /collections ── */}
                      <Link
                        href="/collections"
                        onClick={() => trackWhatsAppClick("hot_drops", `explore_${HOT_DROPS[activeIndex].category}`)}
                        className="group inline-flex items-center gap-2 bg-forest text-cream px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                        aria-label={`Explore ${HOT_DROPS[activeIndex].title} in the full collection`}
                      >
                        Explore Collection
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>

                      <div className="flex items-center gap-2 mt-12">
                        {HOT_DROPS.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              i === activeIndex ? "w-12 bg-sage" : "w-6 bg-sage/25"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT: Scrolling Image Panels */}
            <div>
              {HOT_DROPS.map((drop, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={drop.number}
                    ref={(el) => {
                      sectionRefs.current[index] = el;
                    }}
                    className="min-h-screen flex items-center justify-center py-16"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.92,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="relative w-full max-w-lg aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
                    >
                      {drop.imageUrl.startsWith("URL_HERE") ? (
                        <div
                          className="w-full h-full bg-gradient-to-br from-sage/25 via-butter/30 to-taupe/25 flex flex-col items-center justify-center relative"
                          aria-hidden="true"
                        >
                          <Sparkles className="w-20 h-20 text-sage/50 mb-6" />
                          <span className="text-sm font-display italic text-forest/60 mb-2">
                            {drop.title}
                          </span>
                          <span className="text-[10px] font-body text-forest/40 tracking-[0.3em] uppercase">
                            {drop.category}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={drop.imageUrl}
                          alt={drop.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      )}

                      <div
                        className="absolute inset-0 bg-gradient-to-t from-forest/15 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />

                      <div className="absolute top-6 right-6 z-10">
                        <span className="inline-flex items-center justify-center w-14 h-14 bg-cream/95 backdrop-blur-sm text-sage font-display italic text-2xl rounded-full shadow-lg border border-sage/20">
                          {drop.number}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE: STACKED CARDS
          ═══════════════════════════════════════════════════ */}
      <div className="lg:hidden pb-24">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8">
            {HOT_DROPS.map((drop, index) => (
              <motion.article
                key={drop.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative"
              >
                {/* ── NAVIGATE TO /collections ── */}
                <Link
                  href="/collections"
                  onClick={() => trackWhatsAppClick("hot_drops", `mobile_${drop.category}`)}
                  className="block bg-ivory rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4"
                  aria-label={`Explore ${drop.title} in the full collection`}
                >
                  <div className="relative w-full aspect-[4/5] bg-taupe/10 overflow-hidden">
                    {drop.imageUrl.startsWith("URL_HERE") ? (
                      <div
                        className="w-full h-full bg-gradient-to-br from-sage/15 via-butter/20 to-taupe/15 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Sparkles className="w-12 h-12 text-sage/30" />
                      </div>
                    ) : (
                      <Image
                        src={drop.imageUrl}
                        alt={drop.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    <div
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest/85 via-forest/40 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center justify-center w-11 h-11 bg-cream/95 backdrop-blur-sm text-sage font-display italic text-xl rounded-full shadow-sm border border-sage/20">
                        {drop.number}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <span className="inline-block text-[10px] font-body font-semibold tracking-[0.25em] uppercase text-sage mb-2">
                        {drop.subtitle}
                      </span>
                      <h3 className="font-display text-2xl text-cream mb-3 leading-tight">
                        {drop.title}
                      </h3>
                      <p className="font-body text-sm text-cream/80 leading-relaxed line-clamp-2 mb-4">
                        {drop.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-widest uppercase text-cream">
                        <span>Explore Collection</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          BOTTOM CTA — "Or design something custom"
          ═══════════════════════════════════════════════════ */}
      <div className="bg-cream py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="font-body text-sm text-forest/60 tracking-wider mb-4">
            Looking for something specific?
          </p>
          <a
            href={buildWhatsAppLink({ type: "custom" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hot_drops", "custom_order")}
            className="inline-flex items-center gap-2 text-sm font-body font-semibold tracking-[0.15em] uppercase text-forest hover:text-sage border-b border-forest/25 hover:border-sage pb-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 rounded"
          >
            Design a Custom Piece
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}