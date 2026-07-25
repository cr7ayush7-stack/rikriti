"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Camera,
  Mail,
  ArrowUpRight,
  Heart,
  Sparkles,
  MapPin,
} from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

const EXPLORE_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Hot Drops", href: "/#hot-drops" },
  { label: "The Story", href: "/#story" },
  { label: "Reviews", href: "/#reviews" },
];

const STUDIO_LINKS = [
  { label: "Custom Orders", type: "custom" as const },
  { label: "Gifting Notes", type: "general" as const },
  { label: "Care Guide", type: "general" as const },
  { label: "Wholesale", type: "general" as const },
];

export default function Footer() {
  const handleWhatsAppClick = (source: string) => {
    trackWhatsAppClick("footer", source);
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative bg-cream overflow-hidden pt-20 lg:pt-28 pb-8"
    >
      <h2 id="footer-heading" className="sr-only">
        rikriti Footer
      </h2>

      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════
            HERO STATEMENT + FLOWERS (Side by Side)
            Left: Text + CTAs
            Right: BIG flower illustration
            ═══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          {/* Left side — Statement + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-sage" aria-hidden="true" />
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
                · Let&apos;s Chat
              </span>
            </div>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-forest mb-8">
              Let&apos;s stitch{" "}
              <em className="text-sage">something you&apos;ll</em>{" "}
              <em className="text-sage">never forget.</em>
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <a
                href={buildWhatsAppLink({ type: "general" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("hero_statement")}
                className="group inline-flex items-center justify-center gap-2 bg-forest text-cream px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
                aria-label="Order via WhatsApp"
              >
                <MessageCircle
                  className="w-4 h-4 transition-transform group-hover:rotate-12"
                  aria-hidden="true"
                />
                Order via WhatsApp
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={buildWhatsAppLink({ type: "custom" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("custom_design")}
                className="group inline-flex items-center justify-center gap-2 border border-forest/25 text-forest px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage/10 hover:border-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
              >
                Custom Design
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right side — BIG FLOWERS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end order-first lg:order-last"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-square">
              <Image
                src="/images/footer-flowers.png"
                alt=""
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 440px"
                className="object-contain"
                priority={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-gradient-to-r from-transparent via-taupe/40 to-transparent mb-12 lg:mb-16 origin-center"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════
            NAVIGATION COLUMNS
            ═══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16 lg:mb-20">
          {/* Explore Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase text-sage mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm font-body text-forest/75 hover:text-forest hover:gap-3 transition-all duration-300 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 text-sage"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Studio Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase text-sage mb-5">
              Studio
            </p>
            <ul className="space-y-3">
              {STUDIO_LINKS.map((link, i) => (
                <li key={i}>
                  <a
                    href={buildWhatsAppLink({ type: link.type })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsAppClick(link.label)}
                    className="inline-flex items-center gap-2 text-sm font-body text-forest/75 hover:text-forest hover:gap-3 transition-all duration-300 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 text-sage"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase text-sage mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppLink({ type: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("connect_whatsapp")}
                  className="inline-flex items-center gap-2 text-sm font-body text-forest/75 hover:text-forest hover:gap-3 transition-all duration-300 group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-sage/70" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rikriti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-body text-forest/75 hover:text-forest hover:gap-3 transition-all duration-300 group"
                >
                  <Camera className="w-3.5 h-3.5 text-sage/70" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@rikriti.in"
                  className="inline-flex items-center gap-2 text-sm font-body text-forest/75 hover:text-forest hover:gap-3 transition-all duration-300 group"
                >
                  <Mail className="w-3.5 h-3.5 text-sage/70" aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Studio Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 lg:col-span-1"
          >
            <p className="text-[10px] font-body font-semibold tracking-[0.3em] uppercase text-sage mb-5">
              The Studio
            </p>

            <p className="font-display italic text-lg text-forest leading-snug mb-3">
              A home studio in Mulund
            </p>

            <div className="flex items-start gap-2 mb-4">
              <MapPin
                className="w-3.5 h-3.5 text-sage/70 mt-1 shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm font-body text-forest/70 leading-relaxed">
                Mulund, Mumbai
                <br />
                India · 400080
              </p>
            </div>

            <p className="text-xs font-body text-forest/50 leading-relaxed">
              <span className="block">Mon–Sat · 10am – 8pm IST</span>
              <span className="block text-forest/40">Sunday · Family time</span>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-gradient-to-r from-transparent via-taupe/40 to-transparent mb-8 origin-center"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════
            BOTTOM BAR — Brand + Legal + Copyright
            ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          {/* Brand mark */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src="/images/rikriti-logo-circle.png"
                alt="rikriti"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-brand text-lg text-forest leading-none">
                rikriti
              </p>
              <p className="text-[10px] font-body text-forest/50 tracking-[0.2em] uppercase mt-1">
                Indo Western Crochet
              </p>
            </div>
          </div>

          {/* Legal links */}
          <ul className="flex flex-wrap gap-6 text-[11px] font-body text-forest/50">
            <li>
              <Link href="#" className="hover:text-forest transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-forest transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-forest transition-colors">
                Shipping
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-[11px] font-body text-forest/50 flex items-center gap-2">
            <span>© 2025 rikriti</span>
            <span className="text-forest/30" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              Handcrafted with
              <Heart
                className="w-3 h-3 text-sage"
                aria-hidden="true"
                fill="currentColor"
              />
              in Mumbai
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}