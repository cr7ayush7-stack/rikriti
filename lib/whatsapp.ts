/* ═══════════════════════════════════════════════════════════
   WHATSAPP UTILITY — Simple, clean messages
   ═══════════════════════════════════════════════════════════ */

const WHATSAPP_NUMBER = "919XXXXXXXXX";
// ⚠️ Update with real number: country code + number, no + or spaces
// Example: "919876543210" for +91 98765 43210

const BUSINESS_NAME = "rikriti";
const EMOJI = "🌸";

/* ═══════════════════════════════════════════════════════════
   TYPES
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
   MESSAGE TEMPLATES — Short & Simple
   ═══════════════════════════════════════════════════════════ */

/**
 * Product enquiry — clean and simple
 */
function buildProductMessage(product: WhatsAppProduct): string {
  const priceText = product.price ? `\nPrice: ₹${product.price}` : "";

  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'd like to order: *${product.name}*` +
    priceText +
    `\n\nCan you share more details?`
  );
}

/**
 * Custom order — bespoke request
 */
function buildCustomOrderMessage(): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'd love to place a *custom order*. Can we discuss the details?`
  );
}

/**
 * General enquiry
 */
function buildGeneralMessage(): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'd love to know more about your work. Can you help me?`
  );
}

/**
 * Category enquiry
 */
function buildCategoryMessage(category: string): string {
  return (
    `Hi ${BUSINESS_NAME}! ${EMOJI}\n\n` +
    `I'm interested in your *${category}* collection. Can you share more?`
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN LINK BUILDER
   ═══════════════════════════════════════════════════════════ */

export interface WhatsAppLinkOptions {
  type?: "product" | "custom" | "general" | "category";
  product?: WhatsAppProduct;
  category?: string;
  customMessage?: string;
}

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
   ANALYTICS TRACKING
   ═══════════════════════════════════════════════════════════ */

export function trackWhatsAppClick(
  source: WhatsAppSource,
  productName?: string
): void {
  if (typeof window === "undefined") return;

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
    // Silently fail
  }
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

export const generalWhatsAppLink = (): string =>
  buildWhatsAppLink({ type: "general" });

export const customOrderLink = (): string =>
  buildWhatsAppLink({ type: "custom" });

export const getWhatsAppNumber = (): string => WHATSAPP_NUMBER;

export function getFormattedPhoneNumber(): string {
  const num = WHATSAPP_NUMBER;
  if (num.length !== 12) return `+${num}`;
  const country = num.slice(0, 2);
  const first = num.slice(2, 6);
  const second = num.slice(6);
  return `+${country} ${first} ${second}`;
}