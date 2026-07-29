"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   
   Real WhatsApp logo for instant brand recognition
   Fixed bottom-right corner, appears after 300px scroll
   Pulse ring animation to draw attention
   ═══════════════════════════════════════════════════════════ */

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltipOnce, setHasShownTooltipOnce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible((prev) => {
        const shouldShow = window.scrollY > 300;
        return prev !== shouldShow ? shouldShow : prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !hasShownTooltipOnce) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltipOnce(true);

        setTimeout(() => setShowTooltip(false), 5000);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasShownTooltipOnce]);

  const handleClick = () => {
    trackWhatsAppClick("floating_button");
    setShowTooltip(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="hidden lg:block fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          {/* ── TOOLTIP ── */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute bottom-1/2 right-full translate-y-1/2 mr-4
                  bg-forest text-cream 
                  px-4 py-3 rounded-2xl
                  shadow-lg
                  whitespace-nowrap
                  flex items-center gap-3
                "
                role="tooltip"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-body font-semibold tracking-wider uppercase text-butter">
                    Chat on WhatsApp
                  </span>
                  <span className="text-sm font-body">
                    Instant replies · Ready to help 🌸
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="
                    ml-1 p-1
                    text-cream/60 hover:text-cream
                    transition-colors
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded
                  "
                  aria-label="Dismiss tooltip"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                <div
                  className="
                    absolute top-1/2 -right-1 -translate-y-1/2
                    w-3 h-3 rotate-45
                    bg-forest
                  "
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FLOATING BUTTON with WhatsApp logo ── */}
          <a
            href={buildWhatsAppLink({ type: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="
              relative
              flex items-center justify-center
              w-16 h-16
              bg-[#25D366] hover:bg-[#20BA5A]
              text-white
              rounded-full
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-110 active:scale-95
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40
              group
            "
            aria-label="Chat with rikriti on WhatsApp"
          >
            {/* Pulse ring animation — outer */}
            <span
              className="
                absolute inset-0 rounded-full 
                bg-[#25D366]
                animate-ping opacity-40
                pointer-events-none
              "
              aria-hidden="true"
            />

            {/* Secondary pulse ring */}
            <span
              className="
                absolute inset-0 rounded-full 
                bg-[#25D366]/60 
                pointer-events-none
              "
              style={{
                animation: "pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
              aria-hidden="true"
            />

            {/* Official WhatsApp Logo SVG */}
            <svg
              className="relative z-10 w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.128 6.746 3.048 9.378L1.05 31.328l6.156-1.968A15.906 15.906 0 0 0 16 32c8.826 0 16-7.174 16-16S24.826 0 16.004 0zm9.31 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826s1.166-3.416 1.636-3.896c.386-.394.836-.574 1.166-.574.13 0 .246.006.352.012.336.014.504.034.726.564.276.664.948 2.36 1.028 2.526.082.166.164.392.052.612-.106.226-.2.328-.366.518-.166.19-.324.336-.49.54-.152.176-.324.364-.132.696.192.324.854 1.408 1.83 2.276 1.258 1.12 2.28 1.478 2.646 1.63.272.112.598.086.798-.126.254-.274.566-.728.884-1.176.226-.322.512-.362.812-.248.306.106 1.928.91 2.258 1.076.33.166.548.246.628.386.078.14.078.798-.308 1.888z"
              />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}