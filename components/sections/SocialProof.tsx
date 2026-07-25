"use client";

import { motion } from "framer-motion";
import { Star, Camera, ArrowUpRight, MessageSquareQuote } from "lucide-react";
import { getReviewsInRows, TRUST_METRICS } from "@/lib/reviews";
import type { Review } from "@/lib/reviews";

/* ═══════════════════════════════════════════════════════════
   SOCIAL PROOF SECTION
   ═══════════════════════════════════════════════════════════ */

export default function SocialProof() {
  const { row1, row2 } = getReviewsInRows();

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative bg-cream py-20 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-butter/8 blur-3xl pointer-events-none"
      />

      <div className="relative">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-sage" aria-hidden="true" />
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
                Loved by Hundreds
              </span>
              <span className="h-px w-8 bg-sage" aria-hidden="true" />
            </div>

            <h2
              id="reviews-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-forest mb-6"
            >
              Words from the{" "}
              <em className="text-sage">rikriti family.</em>
            </h2>

            <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed">
              Real stories from real hearts across India. Every review is a little love letter to what we do.
            </p>
          </motion.div>

          {/* ── TRUST METRICS BAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 lg:mb-20"
          >
            {TRUST_METRICS.map((metric, index) => (
              <div
                key={index}
                className="text-center border-l border-taupe/30 first:border-l-0 sm:border-l"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display italic text-4xl sm:text-5xl text-forest">
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="font-display italic text-2xl sm:text-3xl text-sage">
                      {metric.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[10px] sm:text-xs font-body font-medium tracking-[0.2em] uppercase text-forest/60">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── ROW 1 — Scrolling LEFT ── */}
        <div className="marquee-container mb-4 sm:mb-6">
          <div
            className="marquee-track gap-4 sm:gap-6"
            style={{ ["--marquee-duration" as string]: "50s" }}
          >
            {[...row1, ...row1, ...row1].map((review, idx) => (
              <ReviewCard key={`row1-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* ── ROW 2 — Scrolling RIGHT ── */}
        <div className="marquee-container mb-16">
          <div
            className="marquee-track gap-4 sm:gap-6"
            style={{
              ["--marquee-duration" as string]: "60s",
              animationDirection: "reverse",
            }}
          >
            {[...row2, ...row2, ...row2].map((review, idx) => (
              <ReviewCard key={`row2-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* ── INSTAGRAM CTA ── */}
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center pt-8 border-t border-taupe/30 max-w-md mx-auto"
          >
            <p className="font-body text-sm text-forest/60 mb-4">
              Share your rikriti moment
            </p>
            <a
              href="https://instagram.com/rikriti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
              aria-label="Follow rikriti on Instagram"
            >
              <Camera className="w-4 h-4" aria-hidden="true" />
              @rikriti on Instagram
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   REVIEW CARD SUBCOMPONENT
   ═══════════════════════════════════════════════════════════ */

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="shrink-0 w-[280px] sm:w-[340px] lg:w-[380px] bg-ivory border border-taupe/40 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Star rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < review.rating ? "fill-butter text-butter" : "text-taupe/40"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{review.rating} out of 5 stars</span>

        {review.verified && (
          <span className="ml-2 text-[9px] font-body font-semibold tracking-[0.15em] uppercase text-sage/70">
            · Verified
          </span>
        )}
      </div>

      {/* Quote icon */}
      <MessageSquareQuote
        className="w-6 h-6 text-sage/30 mb-3"
        aria-hidden="true"
        strokeWidth={1.5}
      />

      {/* Review text */}
      <p className="font-body text-sm sm:text-base text-forest/80 leading-relaxed mb-6 flex-1">
        {review.quote}
      </p>

      {/* Author info */}
      <div className="pt-4 border-t border-taupe/25">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display italic text-base text-forest">
              {review.name}
            </p>
            <p className="text-[10px] font-body text-forest/50 tracking-wider mt-0.5">
              {review.location}
              {review.date && ` · ${review.date}`}
            </p>
          </div>
          {review.instagramHandle && (
            <span className="text-[10px] font-body text-sage tracking-wider">
              {review.instagramHandle}
            </span>
          )}
        </div>

        {review.productPurchased && (
          <p className="mt-3 text-[10px] font-body text-forest/50 tracking-wider">
            <span className="text-sage/70">✦</span> {review.productPurchased}
          </p>
        )}
      </div>
    </article>
  );
}