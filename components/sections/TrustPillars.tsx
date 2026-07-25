"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Feather,
  MessageCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { TRUST_PILLARS } from "@/lib/products";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Heart,
  Feather,
  MessageCircle,
};

export default function TrustPillars() {
  return (
    <section
      id="why-rikriti"
      aria-labelledby="trust-heading"
      className="relative bg-cream py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C332A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              The rikriti Promise
            </span>
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </div>

          <h2
            id="trust-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-forest mb-6"
          >
            Why every stitch{" "}
            <em className="text-sage">is a promise.</em>
          </h2>

          <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed">
            Four reasons rikriti feels different — because handmade with love isn&apos;t just a phrase, it&apos;s every single loop.
          </p>
        </motion.div>

        {/* ── PILLARS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TRUST_PILLARS.map((pillar, index) => {
            const Icon = ICON_MAP[pillar.iconName];

            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative h-auto sm:h-[320px] lg:h-[340px]"
              >
                {/* ── Dashed sage shadow behind card ── */}
                <span
                  className="absolute inset-0 border border-sage/40 rounded-2xl border-dashed pointer-events-none"
                  aria-hidden="true"
                />

                {/* ── Main Card ── */}
                <div
                  className="
                    relative h-full w-full
                    bg-ivory
                    border border-taupe/50
                    rounded-2xl
                    overflow-hidden
                    transition-all duration-500 ease-out
                    sm:group-hover:-translate-x-2 sm:group-hover:-translate-y-2
                    sm:group-hover:shadow-xl sm:group-hover:border-sage/50
                  "
                >
                  {/* ═══════════════════════════════════════
                      MOBILE LAYOUT (< sm breakpoint)
                      Static, shows all info at once
                      ═══════════════════════════════════════ */}
                  <div className="sm:hidden p-6">
                    {/* Top: Number + Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display italic text-4xl text-sage/80 leading-none">
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                        <Icon
                          className="w-4 h-4 text-sage"
                          aria-hidden="true"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Title + description */}
                    <h3 className="font-display text-xl leading-tight text-forest mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs text-forest/65 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* ═══════════════════════════════════════
                      DESKTOP REST STATE (≥ sm breakpoint)
                      Hidden on mobile, visible until hover
                      ═══════════════════════════════════════ */}
                  <div
                    className="
                      hidden sm:flex
                      absolute inset-0 
                      flex-col justify-between
                      p-7 lg:p-8
                      transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  >
                    {/* Top: Number + Icon */}
                    <div className="flex items-start justify-between">
                      <span className="font-display italic text-5xl text-sage/80 leading-none">
                        {pillar.number}
                      </span>
                      <div
                        className="
                          w-11 h-11 rounded-full 
                          bg-sage/10 
                          flex items-center justify-center
                          transition-all duration-500
                          group-hover:bg-sage/20 group-hover:rotate-[10deg]
                        "
                      >
                        <Icon
                          className="w-5 h-5 text-sage"
                          aria-hidden="true"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Bottom: Title + hover hint */}
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl leading-tight text-forest">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-[10px] font-body text-forest/40 tracking-[0.2em] uppercase">
                        Hover to learn more →
                      </p>
                    </div>
                  </div>

                  {/* ═══════════════════════════════════════
                      DESKTOP HOVER STATE (≥ sm breakpoint)
                      Hidden on mobile, appears on hover
                      ═══════════════════════════════════════ */}
                  <div
                    className="
                      hidden sm:flex
                      absolute inset-0
                      flex-col justify-between
                      p-7 lg:p-8
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 delay-100
                      bg-ivory
                    "
                  >
                    {/* Top: Small icon + number */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sage flex items-center justify-center">
                        <Icon
                          className="w-4 h-4 text-cream"
                          aria-hidden="true"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="font-display italic text-2xl text-sage">
                        {pillar.number}
                      </span>
                      <span className="h-px flex-1 bg-sage/20" aria-hidden="true" />
                    </div>

                    {/* Middle: Title + description */}
                    <div>
                      <h3 className="font-display text-xl lg:text-2xl leading-tight text-forest mb-3">
                        {pillar.title}
                      </h3>
                      <p className="font-body text-sm text-forest/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom: Learn more indicator */}
                    <div className="flex items-center gap-2 text-[11px] font-body font-semibold tracking-[0.2em] uppercase text-sage">
                      <span>Our Promise</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── BOTTOM ACCENT LINE ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 lg:mt-24 max-w-md mx-auto"
        >
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-sage/30" aria-hidden="true" />
            <span className="text-[11px] font-body font-semibold tracking-[0.3em] uppercase text-sage/70">
              made in mulund · with love
            </span>
            <span className="h-px flex-1 bg-sage/30" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}