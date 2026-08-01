import type { Metadata, Viewport } from "next";
import { Fraunces, Marcellus, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════
   SITE CONFIGURATION
   ⚠️  UPDATE THESE VALUES BEFORE DEPLOYMENT
   ═══════════════════════════════════════════════════════════ */

const SITE_CONFIG = {
  name: "rikriti",
  fullName: "rikriti — Indo Western Crochet",
  domain: "https://rikriti.in", // ⚠️ Change to real domain when live
  description:
    "Handcrafted crochet florals, bouquets & accessories. " +
    "Handmade with love in Mulund, Mumbai. " +
    "Everlasting blooms, custom gifting sets & hair aesthetics. " +
    "Order via WhatsApp.",
  shortDescription: "Handmade crochet florals from Mulund, Mumbai",
  tagline: "Blooms that never wither",
  location: {
    city: "Mumbai",
    area: "Mulund",
    country: "India",
    countryCode: "IN",
  },
  whatsapp: "919XXXXXXXXX", // ⚠️ Add real WhatsApp number (with country code, no +)
    instagram: "@ri_kriti", // ⚠️ Add real Instagram handle
  email: "hello@rikriti.in", // ⚠️ Add real email if available
};

/* ═══════════════════════════════════════════════════════════
   FONT LOADING — Optimized with next/font
   ═══════════════════════════════════════════════════════════ */

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

/* ═══════════════════════════════════════════════════════════
   VIEWPORT — Mobile browser chrome color + responsive
   ═══════════════════════════════════════════════════════════ */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#2C332A" },
  ],
};

/* ═══════════════════════════════════════════════════════════
   METADATA — Complete SEO + Open Graph + Twitter Cards
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),

  title: {
    default: `${SITE_CONFIG.name} — Handcrafted Crochet Florals, Mumbai`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  keywords: [
    "crochet flowers mumbai",
    "handmade bouquet india",
    "crochet gifts mulund",
    "indo western crochet",
    "everlasting flowers",
    "custom crochet bouquets",
    "crochet hair accessories",
    "handmade gifts mumbai",
    "crochet wearables india",
    "rikriti",
    "artisan crochet",
    "personalized gifting mumbai",
  ],

  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Handmade Crafts",
  applicationName: SITE_CONFIG.name,
  generator: "Next.js",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  /* ── Open Graph (WhatsApp, Facebook, LinkedIn previews) ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
        images: [
      {
        url: "/images/og-image.png", // ⚠️ Create 1200×630 image later
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Handcrafted Crochet Florals`,
        type: "image/jpeg",
      },
    ],
  },

  /* ── Twitter/X Card ── */
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.shortDescription,
    images: ["/images/og-image.jpg"], // ⚠️ Same image as OG
    creator: SITE_CONFIG.instagram,
  },

  /* ── Robots / Search Engine Directives ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

    /* ── Icons (favicons + PWA + Apple touch) ── */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  /* ── PWA / Apple Web App ── */
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name,
  },

  /* ── Canonical URL ── */
  alternates: {
    canonical: SITE_CONFIG.domain,
  },

  /* ── Verification (add codes when connecting to services) ── */
  verification: {
    // google: "your-google-search-console-code",
    // other: { "facebook-domain-verification": "your-code" },
  },
};

/* ═══════════════════════════════════════════════════════════
   JSON-LD STRUCTURED DATA — LocalBusiness Schema
   Helps rikriti appear in Google Maps + local searches
   ═══════════════════════════════════════════════════════════ */

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_CONFIG.domain,
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.fullName,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.domain,
  logo: `${SITE_CONFIG.domain}/images/rikriti-logo-circle.png`,
  image: `${SITE_CONFIG.domain}/images/og-image.jpg`,
  telephone: `+${SITE_CONFIG.whatsapp}`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE_CONFIG.location.area,
    addressRegion: SITE_CONFIG.location.city,
    addressCountry: SITE_CONFIG.location.countryCode,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  sameAs: [
    `https://instagram.com/${SITE_CONFIG.instagram.replace("@", "")}`,
    `https://wa.me/${SITE_CONFIG.whatsapp}`,
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      category: "Handmade Crochet Florals",
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   PAGE LOADING FALLBACK
   ═══════════════════════════════════════════════════════════ */

function PageLoader() {
  return (
    <div className="min-h-svh bg-cream flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-sage border-t-transparent animate-spin" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT LAYOUT — Wraps every page
   ═══════════════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${marcellus.variable} ${plusJakarta.variable}`}
    >
      <head>
        {/* JSON-LD structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema),
          }}
        />
      </head>
      <body
        className="bg-cream text-forest font-body antialiased overflow-x-hidden min-h-svh selection:bg-sage/20 selection:text-forest"
      >
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}