"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Heart } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   STORY SECTION — "Behind Every Stitch"
   
   Editorial magazine storytelling with:
   - Letter-reveal heading
   - Asymmetric photo gallery
   - Hover-image-reveal quote list (desktop)
   - Mobile-optimized image reveal (tap to expand)
   - Curved signature closing
   ═══════════════════════════════════════════════════════════ */

/* Story photos with placeholders */
const STORY_PHOTOS = [
  {
    id: "founder",
    imageUrl: "URL_HERE_STORY_FOUNDER",
    imageAlt: "richa, the founder of rikriti",
    caption: "richa",
    gridClass: "col-span-2 row-span-2 aspect-square",
  },
  {
    id: "workspace",
    imageUrl: "URL_HERE_STORY_WORKSPACE",
    imageAlt: "The rikriti home studio in Mulund",
    caption: "The studio",
    gridClass: "col-span-1 row-span-1 aspect-square",
  },
  {
    id: "hands",
    imageUrl: "URL_HERE_STORY_HANDS",
    imageAlt: "Hands crocheting a floral piece",
    caption: "The making",
    gridClass: "col-span-1 row-span-1 aspect-square",
  },
  {
    id: "detail",
    imageUrl: "URL_HERE_STORY_DETAIL",
    imageAlt: "Close-up of finished crochet flower",
    caption: "The detail",
    gridClass: "col-span-2 row-span-1 aspect-[2/1]",
  },
];

/* Quote list with hover reveal images */
const STORY_QUOTES = [
  {
    id: "why-crochet",
    question: "Why crochet?",
    answer: "Because every loop is a moment. Every stitch a decision. Nothing rushed, nothing wasted.",
    imageUrl: "URL_HERE_STORY_YARN",
    imageAlt: "Colorful yarn balls",
  },
  {
    id: "why-mulund",
    question: "Why Mulund?",
    answer: "Because home is where hands feel steadiest. Mumbai's quietest corner, where I learned to make.",
    imageUrl: "URL_HERE_STORY_MULUND",
    imageAlt: "Mulund neighborhood",
  },
  {
    id: "why-handmade",
    question: "Why handmade?",
    answer: "Because factories make products. Hands make gifts. Yours will always be unmistakably yours.",
    imageUrl: "URL_HERE_STORY_HANDMADE",
    imageAlt: "Hands weaving crochet",
  },
  {
    id: "why-forever",
    question: "Why blooms that never wither?",
    answer: "Because some feelings deserve to last. A bouquet you can keep. A memory you can hold.",
    imageUrl: "URL_HERE_STORY_BLOOMS",
    imageAlt: "Handcrafted crochet flowers",
  },
];

export default function Story() {
  const [hoveredQuote, setHoveredQuote] = useState<number | null>(null);
  const [activeQuoteMobile, setActiveQuoteMobile] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for hover reveal (desktop only)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 25, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 150, damping: 25, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative bg-cream py-20 lg:py-32 overflow-hidden"
    >
      {/* Subtle texture background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C332A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ═══════════════════════════════════════════════════
            SECTION 1 — INTRO HEADING (Letter Reveal)
            ═══════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
            · The Making
            </span>
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </motion.div>

          {/* Letter-reveal heading */}
          <LetterRevealHeading />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-base sm:text-lg text-forest/70 leading-relaxed mt-8 max-w-xl mx-auto"
          >
            One founder. One home studio in Mulund. One loop at a time — turning yarn into gifts that outlive their season.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 2 — ASYMMETRIC PHOTO GALLERY
            ═══════════════════════════════════════════════════ */}
        <div className="mb-20 lg:mb-32">
          <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-4 lg:gap-5 max-w-4xl mx-auto">
            {STORY_PHOTOS.map((photo, index) => {
              const isPlaceholder = photo.imageUrl.startsWith("URL_HERE");

              return (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500 group ${photo.gridClass}`}
                >
                  {isPlaceholder ? (
                    <div className="w-full h-full bg-gradient-to-br from-sage/20 via-butter/25 to-taupe/20 flex flex-col items-center justify-center p-4">
                      <Sparkles className="w-8 h-8 text-sage/40 mb-2" aria-hidden="true" />
                      <span className="text-[10px] font-body text-forest/40 tracking-[0.25em] uppercase text-center">
                        {photo.caption}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={photo.imageUrl}
                      alt={photo.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Caption overlay on hover */}
                  <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-body text-cream tracking-[0.25em] uppercase">
                      {photo.caption}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-xs font-body text-sage/70 tracking-[0.2em] uppercase"
          >
            A studio built with love · Mulund, Mumbai
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 3 — HOVER REVEAL QUOTES (Desktop)
                        TAP TO REVEAL (Mobile)
            ═══════════════════════════════════════════════════ */}
        <div className="mb-16 lg:mb-24">
          {/* Chapter label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-12 lg:mb-16"
          >
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              Chapter II · The Why
            </span>
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </motion.div>

          {/* ── DESKTOP: Hover reveal with cursor-following image ── */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="hidden md:block relative max-w-3xl mx-auto"
          >
            {/* Cursor-following image */}
            <motion.div
              style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{ opacity: hoveredQuote !== null ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute top-0 left-0 w-[280px] h-[360px] rounded-xl overflow-hidden shadow-2xl z-20"
            >
              {hoveredQuote !== null && (
                <div className="relative w-full h-full">
                  {STORY_QUOTES[hoveredQuote].imageUrl.startsWith("URL_HERE") ? (
                    <div className="w-full h-full bg-gradient-to-br from-sage/30 via-butter/35 to-taupe/30 flex flex-col items-center justify-center p-6">
                      <Sparkles className="w-12 h-12 text-sage/50 mb-3" aria-hidden="true" />
                      <span className="text-[10px] font-body text-forest/50 tracking-[0.25em] uppercase text-center">
                        {STORY_QUOTES[hoveredQuote].imageAlt}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={STORY_QUOTES[hoveredQuote].imageUrl}
                      alt={STORY_QUOTES[hoveredQuote].imageAlt}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  )}
                </div>
              )}
            </motion.div>

            {/* Quote list */}
            <ul className="space-y-8 lg:space-y-10 relative z-10">
              {STORY_QUOTES.map((quote, index) => (
                <motion.li
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onMouseEnter={() => setHoveredQuote(index)}
                  onMouseLeave={() => setHoveredQuote(null)}
                  className="group cursor-pointer border-b border-taupe/30 pb-8 lg:pb-10 last:border-0"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3
                        className={`font-display italic text-4xl lg:text-5xl leading-tight transition-colors duration-300 ${
                          hoveredQuote === index
                            ? "text-forest"
                            : hoveredQuote !== null
                            ? "text-forest/25"
                            : "text-forest/80"
                        }`}
                      >
                        {quote.question}
                      </h3>
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: hoveredQuote === index ? 1 : 0,
                          height: hoveredQuote === index ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-body text-base text-forest/70 leading-relaxed mt-3 max-w-xl"
                      >
                        {quote.answer}
                      </motion.p>
                    </div>
                    <span
                      className={`font-display italic text-xl transition-colors duration-300 shrink-0 mt-3 ${
                        hoveredQuote === index ? "text-sage" : "text-sage/30"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── MOBILE: Tap to reveal answer ── */}
          <div className="md:hidden max-w-lg mx-auto">
            <ul className="space-y-4">
              {STORY_QUOTES.map((quote, index) => (
                <motion.li
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="bg-ivory border border-taupe/30 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveQuoteMobile(activeQuoteMobile === index ? null : index)
                    }
                    className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 rounded-xl"
                    aria-expanded={activeQuoteMobile === index}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-display italic text-sm text-sage">
                          0{index + 1}
                        </span>
                        <span className="h-px w-8 bg-sage/40" aria-hidden="true" />
                      </div>
                      <h3 className="font-display italic text-2xl text-forest leading-tight">
                        {quote.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        activeQuoteMobile === index ? "rotate-45" : ""
                      }`}
                    >
                      <span className="text-sage text-lg leading-none">+</span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeQuoteMobile === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          {/* Image preview */}
                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                            {quote.imageUrl.startsWith("URL_HERE") ? (
                              <div className="w-full h-full bg-gradient-to-br from-sage/20 via-butter/25 to-taupe/20 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-sage/40" aria-hidden="true" />
                              </div>
                            ) : (
                              <Image
                                src={quote.imageUrl}
                                alt={quote.imageAlt}
                                fill
                                sizes="100vw"
                                className="object-cover"
                              />
                            )}
                          </div>

                          {/* Answer */}
                          <p className="font-body text-sm text-forest/75 leading-relaxed">
                            {quote.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION 4 — SIGNATURE CLOSING
            ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Heart divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px flex-1 max-w-[80px] bg-sage/40" aria-hidden="true" />
            <Heart
              className="w-5 h-5 text-sage/60"
              aria-hidden="true"
              strokeWidth={1.5}
              fill="currentColor"
            />
            <span className="h-px flex-1 max-w-[80px] bg-sage/40" aria-hidden="true" />
          </div>

          <p className="font-display italic text-3xl sm:text-4xl lg:text-5xl text-forest leading-tight mb-6">
            &quot;Every stitch,{" "}
            <span className="text-sage">a promise.</span>&quot;
          </p>

          <p className="font-display italic text-lg text-sage mb-10">
            — richa, founder of rikriti
          </p>

          {/* CTA */}
          <a
            href={buildWhatsAppLink({ type: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            className="inline-flex items-center gap-2 bg-forest text-cream px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
          >
            <Heart className="w-4 h-4" aria-hidden="true" fill="currentColor" />
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LETTER REVEAL HEADING SUBCOMPONENT
   ═══════════════════════════════════════════════════════════ */

function LetterRevealHeading() {
  const line1 = "Meet richa.";
  const line2 = "The hands behind rikriti.";

  return (
    <div className="overflow-hidden">
      {/* Line 1 */}
      <div className="overflow-hidden">
        <motion.h2
          id="story-heading"
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-forest"
        >
          {line1}
        </motion.h2>
      </div>

      {/* Line 2 with word stagger */}
      <div className="overflow-hidden mt-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
          className="font-display italic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-sage inline-block"
        >
          {line2.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}