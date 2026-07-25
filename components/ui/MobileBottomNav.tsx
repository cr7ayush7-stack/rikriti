"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  BookOpen,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════
   MOBILE BOTTOM NAV — Enhanced Liquid Glass Floating Bar
   
   Fixed bottom on mobile (< lg breakpoint)
   Auto-hides on scroll down, shows on scroll up
   Context-aware navigation (Home on collections page = go back)
   Story button scrolls to story section on homepage
   ═══════════════════════════════════════════════════════════ */

interface NavItem {
  label: string;
  icon: React.ElementType;
  type: "scroll-top" | "link" | "scroll-anchor" | "whatsapp" | "custom-whatsapp";
  href?: string;
  anchor?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: Home,
    type: "scroll-top",
    href: "/",
  },
  {
    label: "Shop",
    icon: ShoppingBag,
    type: "link",
    href: "/collections",
  },
  {
    label: "Custom",
    icon: Sparkles,
    type: "custom-whatsapp",
  },
  {
    label: "Story",
    icon: BookOpen,
    type: "scroll-anchor",
    href: "/",
    anchor: "story",
  },
  {
    label: "Chat",
    icon: MessageCircle,
    type: "whatsapp",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLabel, setActiveLabel] = useState("Home");

  /* ── Set active tab based on page + scroll position ── */
  useEffect(() => {
    if (pathname === "/collections") {
      setActiveLabel("Shop");
    } else {
      setActiveLabel("Home");
    }
  }, [pathname]);

  /* ── Hide on scroll down, show on scroll up ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Update active tab based on scroll position (homepage only)
      if (pathname === "/") {
        const storySection = document.getElementById("story");
        if (storySection) {
          const rect = storySection.getBoundingClientRect();
          // Story is "active" when it's in the middle of viewport
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveLabel("Story");
          } else if (rect.top > window.innerHeight / 2) {
            setActiveLabel("Home");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  /* ── Handle Home click — scroll to top or navigate ── */
  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveLabel("Home");
    }
    // If on another page, let the link navigate normally
  }, [pathname]);

  /* ── Handle Story click — smart anchor scroll ── */
  const handleStoryClick = useCallback((e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const storySection = document.getElementById("story");
      if (storySection) {
        storySection.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveLabel("Story");
      }
    }
    // If on another page, let the link navigate to /#story
  }, [pathname]);

  const handleItemClick = (item: NavItem) => {
    if (item.type === "whatsapp") {
      trackWhatsAppClick("floating_button", "bottom_nav_chat");
    } else if (item.type === "custom-whatsapp") {
      trackWhatsAppClick("floating_button", "bottom_nav_custom");
    } else {
      setActiveLabel(item.label);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe"
          aria-label="Mobile navigation"
          role="navigation"
        >
          {/* Backdrop fade — soft gradient at top for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-16 h-16 bg-gradient-to-t from-cream/60 to-transparent pointer-events-none"
          />

          {/* Nav container with ENHANCED LIQUID GLASS */}
          <div className="relative px-4 pb-4 pt-2">
            <div
              className="
                relative
                flex items-center justify-around
                max-w-md mx-auto
                px-2 py-2.5
                rounded-full
                bg-forest/70
                backdrop-blur-2xl backdrop-saturate-150
                border border-cream/15
                shadow-[0_8px_32px_rgba(44,51,42,0.25),0_2px_8px_rgba(44,51,42,0.15),inset_0_1px_0_rgba(253,253,253,0.15)]
                before:content-[''] before:absolute before:inset-0 before:rounded-full
                before:bg-gradient-to-b before:from-cream/[0.08] before:to-transparent
                before:pointer-events-none
              "
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeLabel === item.label;
                const isWhatsApp =
                  item.type === "whatsapp" || item.type === "custom-whatsapp";

                /* ── WhatsApp Items ── */
                if (isWhatsApp) {
                  return (
                    <a
                      key={item.label}
                      href={buildWhatsAppLink({
                        type: item.type === "custom-whatsapp" ? "custom" : "general",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleItemClick(item)}
                      className={`
                        relative flex flex-col items-center justify-center
                        min-w-[56px] min-h-[56px]
                        px-3 py-2 rounded-full
                        transition-colors duration-300
                        active:scale-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest
                        text-cream/70 hover:text-cream
                      `}
                      aria-label={item.label}
                    >
                      <Icon
                        className={`w-5 h-5 relative z-10 ${
                          item.label === "Chat" ? "animate-pulse-slow" : ""
                        }`}
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      <span className="text-[9px] font-body font-semibold tracking-wider uppercase mt-1 relative z-10">
                        {item.label}
                      </span>
                    </a>
                  );
                }

                /* ── Home Button (special scroll-top behavior) ── */
                if (item.type === "scroll-top") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      onClick={handleHomeClick}
                      className={`
                        relative flex flex-col items-center justify-center
                        min-w-[56px] min-h-[56px]
                        px-3 py-2 rounded-full
                        transition-colors duration-300
                        active:scale-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest
                        ${
                          isActive
                            ? "text-cream"
                            : "text-cream/70 hover:text-cream"
                        }
                      `}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-pill"
                          className="absolute inset-0 bg-sage/90 rounded-full -z-10 shadow-lg"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className="w-5 h-5 relative z-10"
                        aria-hidden="true"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <span className="text-[9px] font-body font-semibold tracking-wider uppercase mt-1 relative z-10">
                        {item.label}
                      </span>
                    </Link>
                  );
                }

                /* ── Story Button (anchor scroll) ── */
                if (item.type === "scroll-anchor") {
                  return (
                    <Link
                      key={item.label}
                      href={`${item.href}#${item.anchor}`}
                      onClick={handleStoryClick}
                      className={`
                        relative flex flex-col items-center justify-center
                        min-w-[56px] min-h-[56px]
                        px-3 py-2 rounded-full
                        transition-colors duration-300
                        active:scale-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest
                        ${
                          isActive
                            ? "text-cream"
                            : "text-cream/70 hover:text-cream"
                        }
                      `}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-nav-pill"
                          className="absolute inset-0 bg-sage/90 rounded-full -z-10 shadow-lg"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className="w-5 h-5 relative z-10"
                        aria-hidden="true"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <span className="text-[9px] font-body font-semibold tracking-wider uppercase mt-1 relative z-10">
                        {item.label}
                      </span>
                    </Link>
                  );
                }

                /* ── Regular Link (Shop → /collections) ── */
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => handleItemClick(item)}
                    className={`
                      relative flex flex-col items-center justify-center
                      min-w-[56px] min-h-[56px]
                      px-3 py-2 rounded-full
                      transition-colors duration-300
                      active:scale-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest
                      ${
                        isActive
                          ? "text-cream"
                          : "text-cream/70 hover:text-cream"
                      }
                    `}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        className="absolute inset-0 bg-sage/90 rounded-full -z-10 shadow-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      className="w-5 h-5 relative z-10"
                      aria-hidden="true"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-[9px] font-body font-semibold tracking-wider uppercase mt-1 relative z-10">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}