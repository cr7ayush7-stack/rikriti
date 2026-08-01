"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

interface NavItem {
  label: string;
  icon: React.ElementType | "whatsapp";
  type: "scroll-top" | "link" | "scroll-anchor" | "whatsapp";
  href?: string;
  anchor?: string;
}

/* ── 5 nav items: Home | Shop | Policies | Story | Chat ── */
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
    label: "Policies",
    icon: FileText,
    type: "link",
    href: "/policies",
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
    icon: "whatsapp",
    type: "whatsapp",
  },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.128 6.746 3.048 9.378L1.05 31.328l6.156-1.968A15.906 15.906 0 0 0 16 32c8.826 0 16-7.174 16-16S24.826 0 16.004 0zm9.31 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826s1.166-3.416 1.636-3.896c.386-.394.836-.574 1.166-.574.13 0 .246.006.352.012.336.014.504.034.726.564.276.664.948 2.36 1.028 2.526.082.166.164.392.052.612-.106.226-.2.328-.366.518-.166.19-.324.336-.49.54-.152.176-.324.364-.132.696.192.324.854 1.408 1.83 2.276 1.258 1.12 2.28 1.478 2.646 1.63.272.112.598.086.798-.126.254-.274.566-.728.884-1.176.226-.322.512-.362.812-.248.306.106 1.928.91 2.258 1.076.33.166.548.246.628.386.078.14.078.798-.308 1.888z"
    />
  </svg>
);

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLabel, setActiveLabel] = useState("Home");

  useEffect(() => {
    if (pathname === "/collections") {
      setActiveLabel("Shop");
    } else if (pathname === "/policies") {
      setActiveLabel("Policies");
    } else {
      setActiveLabel("Home");
    }
  }, [pathname]);

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

      if (pathname === "/") {
        const storySection = document.getElementById("story");
        if (storySection) {
          const rect = storySection.getBoundingClientRect();
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

  const handleHomeClick = useCallback((e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveLabel("Home");
    }
  }, [pathname]);

  const handleStoryClick = useCallback((e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const storySection = document.getElementById("story");
      if (storySection) {
        storySection.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveLabel("Story");
      }
    }
  }, [pathname]);

  const handleItemClick = (item: NavItem) => {
    if (item.type === "whatsapp") {
      trackWhatsAppClick("floating_button", "bottom_nav_chat");
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
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-16 h-16 bg-gradient-to-t from-cream/60 to-transparent pointer-events-none"
          />

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
                const isActive = activeLabel === item.label;
                const isChatButton = item.label === "Chat";

                /* ── Chat WhatsApp Item ── */
                if (isChatButton) {
                  return (
                    <a
                      key={item.label}
                      href={buildWhatsAppLink({ type: "general" })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleItemClick(item)}
                      className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-full transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest text-[#25D366] hover:text-[#20BA5A]"
                      aria-label={item.label}
                    >
                      <div className="relative">
                        <span
                          className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-md animate-pulse-slow"
                          aria-hidden="true"
                        />
                        <WhatsAppIcon className="relative z-10 w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-body font-semibold tracking-wider uppercase mt-1 relative z-10">
                        {item.label}
                      </span>
                    </a>
                  );
                }

                /* ── Home Button ── */
                if (item.type === "scroll-top") {
                  const Icon = item.icon as React.ElementType;
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      onClick={handleHomeClick}
                      className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-full transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${
                        isActive ? "text-cream" : "text-cream/70 hover:text-cream"
                      }`}
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

                /* ── Story Anchor Button ── */
                if (item.type === "scroll-anchor") {
                  const Icon = item.icon as React.ElementType;
                  return (
                    <Link
                      key={item.label}
                      href={`${item.href}#${item.anchor}`}
                      onClick={handleStoryClick}
                      className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-full transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${
                        isActive ? "text-cream" : "text-cream/70 hover:text-cream"
                      }`}
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

                /* ── Regular Link (Shop, Policies) ── */
                const Icon = item.icon as React.ElementType;
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => handleItemClick(item)}
                    className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[56px] px-3 py-2 rounded-full transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${
                      isActive ? "text-cream" : "text-cream/70 hover:text-cream"
                    }`}
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