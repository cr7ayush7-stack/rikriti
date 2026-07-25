import type { MetadataRoute } from "next";

/* ═══════════════════════════════════════════════════════════
   ROBOTS.TXT — Search Engine Instructions
   
   Tells crawlers what they can/cannot index
   Accessible at: https://rikriti.in/robots.txt
   ═══════════════════════════════════════════════════════════ */

const SITE_URL = "https://rikriti.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
        ],
      },
      // Special rules for Google
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      // Block AI training crawlers (optional, protects your content)
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}