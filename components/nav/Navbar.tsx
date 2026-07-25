"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, MessageCircle } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { ANNOUNCEMENTS } from "@/lib/products";

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "The Story", href: "/#story" },
  { label: "Reviews", href: "/#reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((prev) => {
        const scrolled = window.scrollY > 20;
        return prev !== scrolled ? scrolled : prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) =>
        prev === ANNOUNCEMENTS.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    trackWhatsAppClick("navbar");
  }, []);

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div
        className="bg-forest text-cream py-2.5 px-4 overflow-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="max-w-container mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-body font-medium tracking-widest text-center"
            >
              <Sparkles
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sage shrink-0"
                aria-hidden="true"
              />
              <span>{ANNOUNCEMENTS[announcementIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header
        className={`
          sticky top-0 z-40 w-full
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-cream/85 backdrop-blur-md shadow-sm border-b border-taupe/20 py-3"
              : "bg-transparent py-4"
          }
        `}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center flex-1">
              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="
                  lg:hidden 
                  p-2 -ml-2
                  text-forest hover:text-sage 
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 rounded
                "
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-drawer"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>

              {/* Desktop Nav Links (left group) */}
              <nav
                className="hidden lg:flex items-center gap-10"
                aria-label="Main navigation"
              >
                {NAV_LINKS.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      relative py-1
                      text-[11px] font-body font-medium 
                      tracking-[0.22em] uppercase 
                      text-forest hover:text-sage 
                      transition-colors duration-200
                      after:content-[''] after:absolute after:bottom-0 
                      after:left-0 after:w-0 after:h-px 
                      after:bg-sage hover:after:w-full 
                      after:transition-all after:duration-300
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* CENTER — Logo (BIGGER NOW) */}
            <Link
              href="/"
              className="
                flex flex-col items-center group shrink-0
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 rounded
              "
              aria-label="rikriti — Go to homepage"
              onClick={closeMobileMenu}
            >
              {/* Mobile: Circle Logo (slightly bigger) */}
              <div className="lg:hidden w-11 h-11 relative">
                <Image
                  src="/images/rikriti-logo-circle.png"
                  alt="rikriti"
                  fill
                  priority
                  sizes="44px"
                  className="object-contain"
                />
              </div>

              {/* Desktop: Text Logo — BIGGER + PROPER TRACKING */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="font-brand text-4xl xl:text-[42px] text-forest group-hover:text-sage transition-colors duration-300 tracking-wide leading-none">
                  rikriti
                </span>
                <span className="text-[10px] font-body tracking-[0.32em] uppercase text-sage/70 mt-1.5">
                  Indo Western Crochet
                </span>
              </div>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-6 lg:gap-10 flex-1">
              {/* Desktop Nav Links (right group) */}
              <nav
                className="hidden lg:flex items-center gap-10"
                aria-label="Additional navigation"
              >
                {NAV_LINKS.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      relative py-1
                      text-[11px] font-body font-medium 
                      tracking-[0.22em] uppercase 
                      text-forest hover:text-sage 
                      transition-colors duration-200
                      after:content-[''] after:absolute after:bottom-0 
                      after:left-0 after:w-0 after:h-px 
                      after:bg-sage hover:after:w-full 
                      after:transition-all after:duration-300
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* WhatsApp CTA */}
              <a
                href={buildWhatsAppLink({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="
                  flex items-center gap-2
                  bg-forest text-cream
                  px-4 py-2.5 lg:px-5 lg:py-3
                  rounded-full
                  text-[10px] lg:text-[11px] 
                  font-body font-semibold 
                  tracking-[0.15em] uppercase
                  hover:bg-sage 
                  transition-all duration-300
                  shadow-sm hover:shadow-md
                  hover:scale-[1.02] active:scale-[0.98]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2
                  min-h-[44px]
                "
                aria-label="Order via WhatsApp"
              >
                <MessageCircle
                  className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Order Now</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="lg:hidden fixed inset-0 z-40 bg-forest/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ transformOrigin: "top" }}
              className="
                lg:hidden 
                fixed top-0 left-0 right-0 z-50
                bg-cream border-b border-taupe/30
                pt-24 pb-8 px-6
                shadow-lg
              "
            >
              <nav
                className="flex flex-col items-center gap-6"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="
                        block py-3
                        text-sm font-body font-medium 
                        uppercase tracking-[0.25em] 
                        text-forest hover:text-sage 
                        transition-colors duration-200
                        min-h-[48px] flex items-center justify-center
                      "
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-xs mt-4"
                >
                  <a
                    href={buildWhatsAppLink({ type: "general" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      handleWhatsAppClick();
                      closeMobileMenu();
                    }}
                    className="
                      flex items-center justify-center gap-2
                      w-full
                      bg-forest text-cream
                      px-6 py-4 rounded-full
                      text-xs font-body font-semibold 
                      tracking-widest uppercase
                      hover:bg-sage transition-all duration-300
                      shadow-sm min-h-[48px]
                    "
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Order via WhatsApp
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}