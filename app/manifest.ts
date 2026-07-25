import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "rikriti — Handcrafted Crochet Florals",
    short_name: "rikriti",
    description:
      "Handmade crochet florals, bouquets & gifting sets from Mulund, Mumbai. Order via WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1EEE7",
    theme_color: "#869179",
    orientation: "portrait",
    scope: "/",
    lang: "en-IN",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["shopping", "lifestyle", "art"],
  };
}