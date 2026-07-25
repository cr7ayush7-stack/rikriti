/* ═══════════════════════════════════════════════════════════
   WHATSAPP UTILITY — Centralized message builder
   
   All WhatsApp CTAs across rikriti flow through this file.
   Change the phone number or message template in ONE place
   and every button on the site updates automatically.
   ═══════════════════════════════════════════════════════════ */

/* ── Configuration ── */

const WHATSAPP_NUMBER = "919XXXXXXXXX";
// ⚠️  Format: Country code + number, no spaces, no + sign
// ⚠️  Example: For +91 98765 43210 → use "919876543210"
// ⚠️  UPDATE THIS BEFORE DEPLOYMENT

const BUSINESS_NAME = "rikriti";
const EMOJI = "🌸";

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════ */

export type WhatsAppSource =
  | "hero"
  | "navbar"
  | "product_card"
  | "product_catalog"
  | "hot_drops"
  | "trust_pillars"
  | "footer"
  | "floating_button"
  | "custom_order"
  | "general_enquiry";

export interface WhatsAppProduct {
  name: string;
  category?: string;
  price?: number;
  variant?: string;
}

/* ═══════════════════════════════════════════════════════════
   MESSAGE TEMPLATES
   ═══════════════════════════════════════════════════════════ */

/**
 * Product enquiry with structured fields
 * User can fill in blanks before sending
 */
function buildProductMessage(product: WhatsAppProduct): string {
  const priceText = product.price ? `\nPrice: ₹${product.price}` : "";
  const categoryText = product.category ? `\nCategory: ${product.category}` : "";
  const variantText = product.variant ? `\nVariant: ${product.variant}` : "";

  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'd like to order: *${product.name}*` +
    categoryText +
    variantText +
    priceText +
    `\n\nA few quick details:\n` +
    `• Quantity needed: \n` +
    `• Occasion / event: \n` +
    `• Delivery date needed by: \n` +
    `• Custom note or personalization: \n` +
    `• Delivery pincode: \n\n` +
    `Looking forward to your reply! 😊`
  );
}

/**
 * Custom order — user wants something bespoke
 */
function buildCustomOrderMessage(): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'd love to place a *custom order*.\n\n` +
    `Here's what I have in mind:\n` +
    `• What I want made: \n` +
    `• Colour preferences: \n` +
    `• Size / dimensions: \n` +
    `• Occasion: \n` +
    `• Budget range: \n` +
    `• Delivery date: \n` +
    `• Delivery pincode: \n\n` +
    `Can we discuss the details? 😊`
  );
}

/**
 * General enquiry — no specific product
 */
function buildGeneralMessage(): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I came across your beautiful crochet work and would love to know more.\n\n` +
    `Could you please share:\n` +
    `• Available collections\n` +
    `• Pricing details\n` +
    `• Delivery options\n\n` +
    `Thank you! 😊`
  );
}

/**
 * Category-specific enquiry (from Hot Drops section)
 */
function buildCategoryMessage(category: string): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'm interested in your *${category}* collection.\n\n` +
    `Could you please share:\n` +
    `• Available designs & colours\n` +
    `• Pricing\n` +
    `• Custom options\n` +
    `• Delivery timeline\n\n` +
    `Looking forward to hearing from you! 😊`
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN LINK BUILDER — Use this in components
   ═══════════════════════════════════════════════════════════ */

export interface WhatsAppLinkOptions {
  type?: "product" | "custom" | "general" | "category";
  product?: WhatsAppProduct;
  category?: string;
  customMessage?: string;
}

/**
 * Build a WhatsApp deep link with pre-filled message.
 *
 * @example
 * // General enquiry
 * buildWhatsAppLink({ type: "general" })
 *
 * @example
 * // Product enquiry
 * buildWhatsAppLink({
 *   type: "product",
 *   product: { name: "Sunflower Bouquet", price: 899, category: "Bouquets" }
 * })
 *
 * @example
 * // Custom order
 * buildWhatsAppLink({ type: "custom" })
 *
 * @example
 * // Category enquiry
 * buildWhatsAppLink({ type: "category", category: "Hair Accessories" })
 */
export function buildWhatsAppLink(options: WhatsAppLinkOptions = {}): string {
  const { type = "general", product, category, customMessage } = options;

  let message: string;

  if (customMessage) {
    message = customMessage;
  } else if (type === "product" && product) {
    message = buildProductMessage(product);
  } else if (type === "custom") {
    message = buildCustomOrderMessage();
  } else if (type === "category" && category) {
    message = buildCategoryMessage(category);
  } else {
    message = buildGeneralMessage();
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/* ═══════════════════════════════════════════════════════════
   ANALYTICS TRACKING (Optional — for Vercel Analytics)
   ═══════════════════════════════════════════════════════════ */

/**
 * Track WhatsApp click events for conversion analytics.
 * Call this in onClick handlers alongside the link navigation.
 *
 * @example
 * <a
 *   href={buildWhatsAppLink({ type: "product", product })}
 *   onClick={() => trackWhatsAppClick("product_card", product.name)}
 * >
 */
export function trackWhatsAppClick(
  source: WhatsAppSource,
  productName?: string
): void {
  // Only track in production, not during development
  if (typeof window === "undefined") return;

    // Vercel Analytics custom event
  try {
    const win = window as unknown as {
      va?: (event: string, data: Record<string, unknown>) => void;
    };
    if (typeof win.va === "function") {
      win.va("event", {
        name: "whatsapp_click",
        data: {
          source,
          product: productName ?? "n/a",
          timestamp: new Date().toISOString(),
        },
      });
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
}

/* ═══════════════════════════════════════════════════════════
   HELPER — Simplified shorthand for common cases
   ═══════════════════════════════════════════════════════════ */

/**
 * Quick shorthand for general WhatsApp link (no options needed)
 */
export const generalWhatsAppLink = (): string =>
  buildWhatsAppLink({ type: "general" });

/**
 * Quick shorthand for custom order link
 */
export const customOrderLink = (): string =>
  buildWhatsAppLink({ type: "custom" });

/**
 * Get the raw WhatsApp number (for display purposes)
 */
export const getWhatsAppNumber = (): string => WHATSAPP_NUMBER;

/**
 * Get formatted phone number for display
 * @example "+91 9XXX XXXXX"
 */
export function getFormattedPhoneNumber(): string {
  const num = WHATSAPP_NUMBER;
  if (num.length !== 12) return `+${num}`;
  const country = num.slice(0, 2);
  const first = num.slice(2, 6);
  const second = num.slice(6);
  return `+${country} ${first} ${second}`;
}