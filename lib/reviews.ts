/* ═══════════════════════════════════════════════════════════
   RIKRITI ON INSTAGRAM — Social Proof Content
   ═══════════════════════════════════════════════════════════ */

export type InstaItemType = "photo" | "video" | "testimonial";

export interface InstaItem {
  id: string;
  type: InstaItemType;
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  author: string;
  handle?: string;
  location?: string;
}

/* ═══════════════════════════════════════════════════════════
   INSTAGRAM FEED — Just photos, video, and testimonial quotes
   ═══════════════════════════════════════════════════════════ */

export const INSTA_FEED: InstaItem[] = [
  {
    id: "insta-1",
    type: "photo",
    imageUrl: "/images/insta-photo-1.jpg",
    caption: "",
    author: "",
  },
  {
    id: "insta-2",
    type: "testimonial",
    caption:
      "The bouquet arrived beautifully wrapped with a handwritten note. My mom cried when she saw it. Thank you rikriti for making moments so special.",
    author: "Ananya S.",
  },
  {
    id: "insta-3",
    type: "video",
    videoUrl: "/videos/insta-video-founder.mp4",
    caption: "",
    author: "",
  },
  {
    id: "insta-4",
    type: "photo",
    imageUrl: "/images/insta-photo-2.jpg",
    caption: "",
    author: "",
  },
  {
    id: "insta-5",
    type: "testimonial",
    caption:
      "I got a custom order for my sister's wedding — Anaya made it EXACTLY as I imagined. The quality is worth every rupee. Highly recommend!",
    author: "Rhea K.",
  },
  {
    id: "insta-6",
    type: "photo",
    imageUrl: "/images/insta-photo-3.jpg",
    caption: "",
    author: "",
  },
  {
    id: "insta-7",
    type: "testimonial",
    caption:
      "These are not just crochet pieces, they're heirlooms. Something to keep forever. Rikriti has a new fan for life.",
    author: "Meera D.",
  },
];

/* ═══════════════════════════════════════════════════════════
   TRUST METRICS
   ═══════════════════════════════════════════════════════════ */

export interface TrustMetric {
  value: string;
  label: string;
  suffix?: string;
}

export const TRUST_METRICS: TrustMetric[] = [
  {
    value: "500",
    suffix: "+",
    label: "Happy Hearts",
  },
  {
    value: "1,200",
    suffix: "+",
    label: "Blooms Crafted",
  },
  {
    value: "4.9",
    suffix: "★",
    label: "Average Rating",
  },
  {
    value: "100",
    suffix: "%",
    label: "Handmade",
  },
];

/* ═══════════════════════════════════════════════════════════
   LEGACY REVIEWS (for backwards compatibility)
   ═══════════════════════════════════════════════════════════ */

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  productPurchased?: string;
  avatarUrl?: string;
  instagramHandle?: string;
  date?: string;
  verified?: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: "review-01",
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    quote: "The bouquet arrived beautifully wrapped.",
    verified: true,
  },
];

export function getReviewsInRows(): { row1: Review[]; row2: Review[] } {
  return { row1: REVIEWS, row2: REVIEWS };
}

export function getTopReviews(): Review[] {
  return REVIEWS;
}

export function getAverageRating(): number {
  return 4.9;
}

export function getReviewCount(): number {
  return 500;
}