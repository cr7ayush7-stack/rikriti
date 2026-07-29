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
  | "wearables";

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
  { slug: "accessories", label: "Accessories" },
  { slug: "wearables", label: "Wearables" },
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
      "Handcrafted crochet flowers — lilies, tulips, roses. Wrapped and gifted, made to last a lifetime.",
    imageUrl: "/images/product-bouquet-lily-indoor.jpg",
    imageAlt: "Handcrafted crochet lily bouquet wrapped in turquoise tissue",
    category: "bouquets",
    rotation: "-3deg",
  },
  {
    number: "02",
    title: "Indo-Western Wearables",
    subtitle: "Softness you can wear",
    description:
      "Chunky knit bags, delicate accessories. Handmade pieces that add warmth to your everyday.",
    imageUrl: "/images/product-bag-shoulder-yellow.jpg",
    imageAlt: "Pastel butter yellow crochet shoulder bag lifestyle shot",
    category: "wearables",
    rotation: "0deg",
  },
  {
    number: "03",
    title: "Hair Aesthetics",
    subtitle: "Adornments for every occasion",
    description:
      "Traditional mogra gajras, floral clips, and hair accessories. Timeless pieces for special moments.",
    imageUrl: "/images/product-gajra-mogra.jpg",
    imageAlt: "Handcrafted white mogra jasmine crochet gajra hair garland",
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
    id: "bouquet-tulip-cluster",
    name: "Pastel Tulip Cluster",
    category: "bouquets",
    price: 1299,
    description:
      "Cream tulips with delicate pink accents, wrapped in vibrant magenta tissue and finished with a satin bow. A romantic bouquet for every occasion.",
    imageUrl: "/images/product-bouquet-tulip-yellow.jpg",
    imageAlt: "Handcrafted crochet cream tulips wrapped in magenta tissue paper against yellow background",
    featured: true,
    bestSeller: true,
    isNew: true,
    craftDays: 6,
    colors: ["Cream", "Pastel Pink", "Sage"],
  },
  {
    id: "bouquet-lily-classic",
    name: "Classic Lily Bloom",
    category: "bouquets",
    price: 1699,
    description:
      "Two elegant lily blooms with yellow crocheted stamens and detailed petal work. Timeless florals that celebrate quiet beauty.",
    imageUrl: "/images/product-bouquet-lily-terracotta.jpg",
    imageAlt: "Handcrafted crochet white lily bouquet against warm terracotta background",
    featured: true,
    craftDays: 8,
    colors: ["Cream White", "Butter Yellow", "Sage Green"],
  },

  /* ── HAIR ACCESSORIES / KEYCHAINS ── */
  {
    id: "keychain-octopus-pair",
    name: "Bestie Octopus Duo",
    category: "accessories",
    price: 599,
    description:
      "A pair of pastel octopus keychains — pink and lavender — with sweet embroidered faces and dangling tentacles. Perfect for matching with your bestie.",
    imageUrl: "/images/product-keychain-octopus-pair.jpg",
    imageAlt: "Pair of pastel pink and purple crochet octopus keychains with gold rings",
    bestSeller: true,
    isNew: true,
    craftDays: 4,
    colors: ["Pastel Pink", "Lavender Purple"],
  },
  {
    id: "keychain-dachshund",
    name: "Dachshund Charm",
    category: "accessories",
    price: 449,
    description:
      "A cute chocolate brown dachshund keychain with floppy ears, tiny scarf, and a curled tail. Because your keys deserve personality too.",
    imageUrl: "/images/product-keychain-dachshund.jpg",
    imageAlt: "Handcrafted dark chocolate brown crochet dachshund keychain with white scarf",
    isNew: true,
    craftDays: 3,
    colors: ["Chocolate Brown", "Cream"],
  },
  {
    id: "keychain-cat-plush",
    name: "Kitty Amigurumi Keychain",
    category: "accessories",
    price: 399,
    description:
      "A tiny cream kitty with rosy cheeks, embroidered whiskers, and little paws. Small enough for your keys, cute enough for your heart.",
    imageUrl: "/images/product-keychain-cat.jpg",
    imageAlt: "Handcrafted cream white crochet cat keychain with embroidered face",
    bestSeller: true,
    craftDays: 3,
    colors: ["Cream White", "Pink Accent"],
  },
  {
    id: "gajra-mogra",
    name: "Mogra Gajra",
    category: "accessories",
    price: 899,
    description:
      "Traditional Indian jasmine hair garland recreated in delicate crochet. Perfect for weddings, festive occasions, and cultural celebrations.",
    imageUrl: "/images/product-gajra-mogra.jpg",
    imageAlt: "Handcrafted white mogra jasmine crochet gajra hair garland",
    featured: true,
    craftDays: 5,
    colors: ["Cream White", "Green Base"],
  },

  /* ── WEARABLES ── */
  {
    id: "bag-butter-yellow",
    name: "Butter Yellow Shoulder Bag",
    category: "wearables",
    price: 2299,
    description:
      "Chunky pastel butter yellow shoulder bag with thick woven basket weave. Structured, sturdy, and beautifully everyday.",
    imageUrl: "/images/product-bag-shoulder-yellow.jpg",
    imageAlt: "Pastel butter yellow crochet shoulder bag styled with white pinstripe shirt",
    featured: true,
    bestSeller: true,
    craftDays: 10,
    colors: ["Pastel Butter Yellow"],
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