/* ═══════════════════════════════════════════════════════════
   RIKRITI — CUSTOMER REVIEWS DATA
   
   Used in: Social Proof section (infinite marquee)
   To add real reviews → replace placeholder data below.
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
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

export interface InstagramMention {
  id: string;
  handle: string;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
}

/* ═══════════════════════════════════════════════════════════
   CUSTOMER REVIEWS
   
   ⚠️  Replace placeholder reviews with real testimonials
   ⚠️  Add real avatar images later (URL_HERE placeholders)
   ═══════════════════════════════════════════════════════════ */

export const REVIEWS: Review[] = [
  {
    id: "review-01",
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    quote:
      "The sunflower bouquet is even more beautiful in person. My mom cried when I gave it to her — she said it was the most thoughtful gift she's ever received.",
    productPurchased: "Sunflower Sunshine Bouquet",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_01",
    instagramHandle: "@ananya.s",
    date: "Nov 2024",
    verified: true,
  },
  {
    id: "review-02",
    name: "Priya Mehta",
    location: "Bangalore",
    rating: 5,
    quote:
      "Ordered a custom bouquet for my sister's wedding. The attention to detail is unreal. Every petal looks like it was made with love.",
    productPurchased: "Custom Bridal Bouquet",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_02",
    instagramHandle: "@priyamehta",
    date: "Oct 2024",
    verified: true,
  },
  {
    id: "review-03",
    name: "Rhea Kapoor",
    location: "Delhi",
    rating: 5,
    quote:
      "I bought the rose scrunchie and now I get compliments every single day. The quality is incredible for the price.",
    productPurchased: "Rose Garden Scrunchie",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_03",
    instagramHandle: "@rhea.k",
    date: "Nov 2024",
    verified: true,
  },
  {
    id: "review-04",
    name: "Sneha Iyer",
    location: "Chennai",
    rating: 5,
    quote:
      "The WhatsApp experience is so personal. Felt like I was chatting with a friend who happens to make magic with yarn.",
    productPurchased: "The Bloom Gift Box",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_04",
    instagramHandle: "@snehaiyer",
    date: "Oct 2024",
    verified: true,
  },
  {
    id: "review-05",
    name: "Kavya Nair",
    location: "Kochi",
    rating: 5,
    quote:
      "My tulip bouquet is 6 months old and still looks brand new. Real flowers wilt in a week — these are forever.",
    productPurchased: "Pastel Tulip Cluster",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_05",
    instagramHandle: "@kavya.n",
    date: "Sep 2024",
    verified: true,
  },
  {
    id: "review-06",
    name: "Ishita Roy",
    location: "Kolkata",
    rating: 5,
    quote:
      "The lace scarf is so light and elegant. I wore it to a wedding and everyone asked where I got it. rikriti has a new lifelong customer.",
    productPurchased: "Botanical Lace Scarf",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_06",
    instagramHandle: "@ishita.r",
    date: "Nov 2024",
    verified: true,
  },
  {
    id: "review-07",
    name: "Meera Desai",
    location: "Pune",
    rating: 5,
    quote:
      "Got the daisy clips for my little sister. She hasn't taken them off since. Perfect gift for anyone who loves cottagecore.",
    productPurchased: "Daisy Meadow Clip",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_07",
    instagramHandle: "@meerad",
    date: "Oct 2024",
    verified: true,
  },
  {
    id: "review-08",
    name: "Zara Khan",
    location: "Hyderabad",
    rating: 5,
    quote:
      "The tote bag is my new go-to. Sturdy, gorgeous, and gets compliments everywhere. Worth every rupee.",
    productPurchased: "Meadow Tote Bag",
    avatarUrl: "URL_HERE_REVIEW_AVATAR_08",
    instagramHandle: "@zarakhan",
    date: "Nov 2024",
    verified: true,
  },
];

/* ═══════════════════════════════════════════════════════════
   INSTAGRAM MENTIONS
   
   For displaying user-generated content in the marquee
   ═══════════════════════════════════════════════════════════ */

export const INSTAGRAM_MENTIONS: InstagramMention[] = [
  {
    id: "ig-01",
    handle: "@ananya.s",
    imageUrl: "URL_HERE_IG_MENTION_01",
    imageAlt: "Customer unboxing rikriti bouquet",
    caption: "In love with my new rikriti bouquet 🌻",
  },
  {
    id: "ig-02",
    handle: "@priyamehta",
    imageUrl: "URL_HERE_IG_MENTION_02",
    imageAlt: "Bridal bouquet on wedding day",
    caption: "The wedding bouquet of my dreams",
  },
  {
    id: "ig-03",
    handle: "@rhea.k",
    imageUrl: "URL_HERE_IG_MENTION_03",
    imageAlt: "Rose scrunchie styled in hair",
    caption: "My favourite hair accessory ✨",
  },
  {
    id: "ig-04",
    handle: "@kavya.n",
    imageUrl: "URL_HERE_IG_MENTION_04",
    imageAlt: "Tulip bouquet on bedside table",
    caption: "Blooms that never wither 🌷",
  },
  {
    id: "ig-05",
    handle: "@ishita.r",
    imageUrl: "URL_HERE_IG_MENTION_05",
    imageAlt: "Lace scarf worn at wedding",
    caption: "Every compliment tonight was for this scarf",
  },
];

/* ═══════════════════════════════════════════════════════════
   TRUST METRICS — Numbers for social proof section
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
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Get reviews split into two rows for opposite-direction marquees
 * Row 1: first half of reviews
 * Row 2: second half (moves in opposite direction)
 */
export function getReviewsInRows(): { row1: Review[]; row2: Review[] } {
  const midpoint = Math.ceil(REVIEWS.length / 2);
  return {
    row1: REVIEWS.slice(0, midpoint),
    row2: REVIEWS.slice(midpoint),
  };
}

/**
 * Get only 5-star reviews
 */
export function getTopReviews(): Review[] {
  return REVIEWS.filter((r) => r.rating === 5);
}

/**
 * Get average rating across all reviews
 */
export function getAverageRating(): number {
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
  return Number((total / REVIEWS.length).toFixed(1));
}

/**
 * Get total review count
 */
export function getReviewCount(): number {
  return REVIEWS.length;
}