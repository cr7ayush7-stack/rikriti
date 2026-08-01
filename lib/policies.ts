/* ═══════════════════════════════════════════════════════════
   RIKRITI — Shop Policies
   ═══════════════════════════════════════════════════════════ */

export interface Policy {
  id: string;
  icon: string;
  title: string;
  short: string;
  full: string;
}

export const POLICIES: Policy[] = [
  {
    id: "handmade",
    icon: "Feather",
    title: "100% Handmade",
    short: "Every stitch by hand",
    full:
      "Every rikriti piece is handcrafted in our Mulund, Mumbai studio. No factories, no shortcuts — just skilled hands and hours of love in every product.",
  },
  {
    id: "made-to-order",
    icon: "Clock",
    title: "Made to Order",
    short: "3-5 days crafting",
    full:
      "Since every piece is made just for you, please allow 3-5 days for crafting, plus shipping time based on your location.",
  },
  {
    id: "shipping",
    icon: "Truck",
    title: "Shipping Across India",
    short: "Ships nationwide",
    full:
      "We ship to all Indian cities. Shipping time varies by location — typically 3-7 business days after crafting is complete. Delivery timeline is shared with your order confirmation.",
  },
  {
    id: "no-cancellation",
    icon: "AlertCircle",
    title: "No Cancellations",
    short: "Made-to-order policy",
    full:
      "Because every piece is handcrafted specifically for you, cancellations are not accepted once making begins. Please confirm your order details carefully before we start crafting.",
  },
  {
    id: "custom-orders",
    icon: "Sparkles",
    title: "Custom Orders",
    short: "Bespoke pieces welcomed",
    full:
      "We love creating one-of-a-kind pieces just for you. Custom orders take longer than standard products — timelines depend on complexity. WhatsApp us to discuss your vision.",
  },
];