"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   
   Fixed bottom-right corner. Appears after user scrolls 300px.
   Features gentle pulse ring animation to draw attention
   without being intrusive.
   ═══════════════════════════════════════════════════════════ */

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltipOnce, setHasShownTooltipOnce] = useState(false);

  /* ── Show button after scrolling 300px ── */
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

  /* ── Show tooltip once when button first appears ── */
  useEffect(() => {
    if (isVisible && !hasShownTooltipOnce) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltipOnce(true);

        // Auto-hide after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasShownTooltipOnce]);

  /* ── Click handler with analytics ── */
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
          {/* ── TOOLTIP (appears once, dismissible) ── */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-1/2 right-full translate-y-1/2 mr-3 bg-forest text-cream px-4 py-3 rounded-2xl shadow-lg whitespace-nowrap flex items-center gap-3"
                role="tooltip"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-body font-semibold tracking-wider uppercase text-sage">
                    Chat with rikriti
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
                  className="ml-1 p-1 text-cream/60 hover:text-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
                  aria-label="Dismiss tooltip"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                {/* Arrow pointing to button */}
                <div
                  className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rotate-45 bg-forest"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FLOATING BUTTON with pulse ring ── */}
          <a
            href={buildWhatsAppLink({ type: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-sage hover:bg-sage-dark text-cream rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-sage/40 group"
            aria-label="Chat with rikriti on WhatsApp"
          >
            {/* Pulse ring animation */}
            <span
              className="absolute inset-0 rounded-full bg-sage animate-ping opacity-40 pointer-events-none"
              aria-hidden="true"
            />

            {/* Secondary pulse for depth */}
            <span
              className="absolute inset-0 rounded-full bg-sage/60 pointer-events-none"
              style={{
                animation: "pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
              aria-hidden="true"
            />

            {/* WhatsApp icon */}
            <MessageCircle
              className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}