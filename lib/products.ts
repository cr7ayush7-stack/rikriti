/* ═══════════════════════════════════════════════════════════
   RIKRITI — PRODUCT CATALOG
   
   All products displayed on the site come from this file.
   To add/remove/edit products → modify the PRODUCTS array below.
   
   IMAGE PLACEHOLDERS:
   Every product has "URL_HERE_[NAME]" as image source.
   Replace these with real image paths when photos are ready.
   Format: "/images/product-bouquet-sunflower.jpg"
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════ */

export type ProductCategory =
  | "bouquets"
  | "accessories"
  | "wearables"
  | "gifting";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  craftDays?: number;
  colors?: string[];
}

export interface Category {
  slug: ProductCategory | "all";
  label: string;
  count?: number;
}

/* ═══════════════════════════════════════════════════════════
   CATEGORIES — Filter tabs
   ═══════════════════════════════════════════════════════════ */

export const CATEGORIES: Category[] = [
  { slug: "all", label: "All Pieces" },
  { slug: "bouquets", label: "Bouquets" },
  { slug: "accessories", label: "Hair Accessories" },
  { slug: "wearables", label: "Wearables" },
  { slug: "gifting", label: "Gifting Sets" },
];

/* ═══════════════════════════════════════════════════════════
   HOT DROPS — Featured category cards (Section 3)
   ═══════════════════════════════════════════════════════════ */

export interface HotDrop {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: ProductCategory;
  rotation: string;
}

export const HOT_DROPS: HotDrop[] = [
  {
    number: "01",
    title: "Everlasting Bouquets",
    subtitle: "Blooms that never wither",
    description:
      "Sunflowers, tulips, roses, lavender. Handcrafted floral arrangements that last forever.",
    imageUrl: "URL_HERE_HOTDROP_BOUQUETS",
    imageAlt: "Handcrafted crochet bouquet collection",
    category: "bouquets",
    rotation: "-3deg",
  },
  {
    number: "02",
    title: "Indo-Western Wearables",
    subtitle: "Softness you can wear",
    description:
      "Scarves, tote bags, shrugs. Delicate crochet pieces for your everyday elegance.",
    imageUrl: "URL_HERE_HOTDROP_WEARABLES",
    imageAlt: "Crochet scarves and wearable accessories",
    category: "wearables",
    rotation: "0deg",
  },
  {
    number: "03",
    title: "Hair Aesthetics",
    subtitle: "Floral crowns for every day",
    description:
      "Clips, scrunchies, headbands. Little details that make you feel like a garden goddess.",
    imageUrl: "URL_HERE_HOTDROP_HAIR",
    imageAlt: "Crochet hair accessories and floral clips",
    category: "accessories",
    rotation: "4deg",
  },
];

/* ═══════════════════════════════════════════════════════════
   PRODUCT CATALOG — Main product grid data
   ═══════════════════════════════════════════════════════════ */

export const PRODUCTS: Product[] = [
  /* ── BOUQUETS ── */
  {
    id: "bouquet-sunflower",
    name: "Sunflower Sunshine Bouquet",
    category: "bouquets",
    price: 1499,
    description:
      "A cheerful bouquet of hand-crocheted sunflowers with delicate green foliage. Perfect for birthdays and just-because moments.",
    imageUrl: "URL_HERE_PRODUCT_SUNFLOWER_BOUQUET",
    imageAlt: "Handcrafted crochet sunflower bouquet with green leaves",
    featured: true,
    bestSeller: true,
    craftDays: 7,
    colors: ["Sunshine Yellow", "Meadow Green"],
  },
  {
    id: "bouquet-tulip",
    name: "Pastel Tulip Cluster",
    category: "bouquets",
    price: 1299,
    description:
      "Soft pastel tulips gathered into a romantic bouquet. Comes wrapped in kraft paper with a handwritten note.",
    imageUrl: "URL_HERE_PRODUCT_TULIP_BOUQUET",
    imageAlt: "Pastel crochet tulips wrapped in kraft paper",
    isNew: true,
    craftDays: 6,
    colors: ["Blush Pink", "Butter Yellow", "Lavender"],
  },
  {
    id: "bouquet-rose",
    name: "Vintage Rose Bundle",
    category: "bouquets",
    price: 1699,
    description:
      "Deep burgundy and blush roses with intricate petal work. A timeless piece for anniversaries and heirlooms.",
    imageUrl: "URL_HERE_PRODUCT_ROSE_BOUQUET",
    imageAlt: "Vintage crochet rose bundle in burgundy and blush",
    featured: true,
    craftDays: 10,
    colors: ["Burgundy", "Dusty Rose", "Sage"],
  },
  {
    id: "bouquet-lavender",
    name: "Provence Lavender Stems",
    category: "bouquets",
    price: 899,
    description:
      "Slim lavender stems tied with jute twine. A minimalist bouquet that whispers rather than shouts.",
    imageUrl: "URL_HERE_PRODUCT_LAVENDER_BOUQUET",
    imageAlt: "Minimalist crochet lavender stems tied with jute",
    craftDays: 5,
    colors: ["Soft Purple", "Sage"],
  },

  /* ── HAIR ACCESSORIES ── */
  {
    id: "hair-daisy-clip",
    name: "Daisy Meadow Clip",
    category: "accessories",
    price: 299,
    description:
      "A set of two daisy hair clips. Sweet, simple, and perfect for a cottagecore aesthetic.",
    imageUrl: "URL_HERE_PRODUCT_DAISY_CLIP",
    imageAlt: "Crochet daisy hair clips set of two",
    bestSeller: true,
    craftDays: 3,
    colors: ["White & Yellow"],
  },
  {
    id: "hair-rose-scrunchie",
    name: "Rose Garden Scrunchie",
    category: "accessories",
    price: 399,
    description:
      "A soft scrunchie with a delicate crochet rose. Comfortable, elegant, and endlessly Instagrammable.",
    imageUrl: "URL_HERE_PRODUCT_ROSE_SCRUNCHIE",
    imageAlt: "Crochet rose scrunchie in blush pink",
    isNew: true,
    craftDays: 4,
    colors: ["Blush", "Sage", "Ivory"],
  },
  {
    id: "hair-floral-headband",
    name: "Floral Crown Headband",
    category: "accessories",
    price: 599,
    description:
      "A headband adorned with tiny crochet flowers. Feel like a woodland fairy every single day.",
    imageUrl: "URL_HERE_PRODUCT_FLORAL_HEADBAND",
    imageAlt: "Floral crown crochet headband with tiny flowers",
    craftDays: 5,
    colors: ["Mixed Pastels"],
  },

  /* ── WEARABLES ── */
  {
    id: "wearable-scarf",
    name: "Botanical Lace Scarf",
    category: "wearables",
    price: 1899,
    description:
      "A lightweight scarf with botanical lace patterns. Drapes beautifully over any outfit.",
    imageUrl: "URL_HERE_PRODUCT_LACE_SCARF",
    imageAlt: "Botanical crochet lace scarf in sage green",
    featured: true,
    craftDays: 12,
    colors: ["Sage", "Cream", "Dusty Rose"],
  },
  {
    id: "wearable-tote",
    name: "Meadow Tote Bag",
    category: "wearables",
    price: 1599,
    description:
      "A sturdy crochet tote with floral appliqué. Carry your world in something beautiful.",
    imageUrl: "URL_HERE_PRODUCT_TOTE_BAG",
    imageAlt: "Crochet tote bag with floral appliqué",
    bestSeller: true,
    craftDays: 8,
    colors: ["Natural", "Sage"],
  },
  {
    id: "wearable-shrug",
    name: "Whisper Shrug",
    category: "wearables",
    price: 2299,
    description:
      "A delicate open-front shrug for layered elegance. Perfect over a simple dress or kurta.",
    imageUrl: "URL_HERE_PRODUCT_SHRUG",
    imageAlt: "Delicate crochet whisper shrug in ivory",
    isNew: true,
    craftDays: 14,
    colors: ["Ivory", "Sage", "Dusty Rose"],
  },

  /* ── GIFTING SETS ── */
  {
    id: "gift-bloom-box",
    name: "The Bloom Gift Box",
    category: "gifting",
    price: 2499,
    description:
      "A curated box with a mini bouquet, matching hair clip, and handwritten note. Gift-ready packaging.",
    imageUrl: "URL_HERE_PRODUCT_BLOOM_BOX",
    imageAlt: "Curated gift box with bouquet, hair clip, and note",
    featured: true,
    bestSeller: true,
    craftDays: 10,
    colors: ["Customizable"],
  },
  {
    id: "gift-love-note",
    name: "The Love Note Set",
    category: "gifting",
    price: 1799,
    description:
      "A pocket-sized bouquet paired with a heartfelt crochet card. For the ones who mean the most.",
    imageUrl: "URL_HERE_PRODUCT_LOVE_NOTE",
    imageAlt: "Pocket bouquet with crochet love note card",
    isNew: true,
    craftDays: 7,
    colors: ["Blush", "Ivory"],
  },
];

/* ═══════════════════════════════════════════════════════════
   HERO POLAROID STACK — Featured 3 products for Hero section
   ═══════════════════════════════════════════════════════════ */

export interface PolaroidImage {
  imageUrl: string;
  imageAlt: string;
  productName: string;
  rotation: string;
  zIndex: number;
}

export const HERO_POLAROIDS: PolaroidImage[] = [
  {
    imageUrl: "URL_HERE_HERO_POLAROID_1",
    imageAlt: "Handcrafted crochet sunflower bouquet",
    productName: "Sunflower Sunshine",
    rotation: "-6deg",
    zIndex: 1,
  },
  {
    imageUrl: "URL_HERE_HERO_POLAROID_2",
    imageAlt: "Rose garden scrunchie in blush",
    productName: "Rose Garden",
    rotation: "0deg",
    zIndex: 3,
  },
  {
    imageUrl: "URL_HERE_HERO_POLAROID_3",
    imageAlt: "Vintage rose bundle bouquet",
    productName: "Vintage Rose",
    rotation: "6deg",
    zIndex: 2,
  },
];

/* ═══════════════════════════════════════════════════════════
   TRUST PILLARS — Section 5 content
   ═══════════════════════════════════════════════════════════ */

export interface TrustPillar {
  number: string;
  iconName: "Sparkles" | "Heart" | "Feather" | "MessageCircle";
  title: string;
  description: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    number: "01",
    iconName: "Sparkles",
    title: "100% Handcrafted",
    description:
      "Every loop and stitch is made by hand in Mulund, Mumbai. No two pieces are ever exactly alike.",
  },
  {
    number: "02",
    iconName: "Heart",
    title: "Everlasting Beauty",
    description:
      "Crochet blooms never wilt. Keep them forever as a reminder of a special moment or person.",
  },
  {
    number: "03",
    iconName: "Feather",
    title: "Personal Gift Notes",
    description:
      "Every order includes a handwritten note. Add a custom message to make it truly personal.",
  },
  {
    number: "04",
    iconName: "MessageCircle",
    title: "Instant WhatsApp Support",
    description:
      "Direct chat with the maker. Quick responses, order updates, and endless customization help.",
  },
];

/* ═══════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR — Rotating messages in navbar
   ═══════════════════════════════════════════════════════════ */

export const ANNOUNCEMENTS: string[] = [
  "🌸 New drop — Pastel Tulip Cluster now available",
  "💌 Free handwritten note with every order",
  "✨ Custom gifting sets — WhatsApp us to design yours",
];

/* ═══════════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Get all products in a specific category.
 * Pass "all" to get every product.
 */
export function getProductsByCategory(
  category: ProductCategory | "all"
): Product[] {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

/**
 * Get only bestseller products for highlighted sections.
 */
export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestSeller);
}

/**
 * Get newly launched products.
 */
export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

/**
 * Get featured products for hero/highlights.
 */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/**
 * Get a single product by ID.
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Get formatted price with ₹ symbol
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Get category label from slug
 */
export function getCategoryLabel(slug: ProductCategory): string {
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category?.label ?? slug;
}