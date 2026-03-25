export const SITE_NAME = "Ramy Clothing";
export const SITE_TAGLINE = "Premium everyday essentials";
export const DEFAULT_CURRENCY = "AUD" as const;
export const FREE_SHIPPING_THRESHOLD_CENTS = 120_00;

/** Placeholder for future locale / storefront config (Supabase or CMS). */
export const DEFAULT_LOCALE = "en-AU";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    display: "@ramyclothing",
  },
  { label: "Pinterest", href: "https://pinterest.com", display: "Pinterest" },
] as const;
