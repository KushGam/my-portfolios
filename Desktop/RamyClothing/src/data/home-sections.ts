import type { HomeSection } from "@/types/content";

/** CMS-ready ordering — swap for Supabase / Sanity later. */
export const HOME_SECTIONS: HomeSection[] = [
  { type: "hero", id: "hero-main" },
  { type: "featured_collection", id: "feat-tees", handle: "t-shirts" },
  { type: "value_strip", id: "values" },
  {
    type: "product_rail",
    id: "bestsellers",
    title: "Best sellers",
    productIds: ["p-essential-crew", "p-relaxed-pocket", "p-boxy-tee"],
  },
  {
    type: "product_rail",
    id: "new-arrivals",
    title: "New arrivals",
    productIds: ["p-vintage-wash", "p-relaxed-pocket", "p-long-sleeve"],
  },
  { type: "editorial", id: "fabric" },
  { type: "trust", id: "trust" },
  { type: "fit", id: "fit-confidence" },
  { type: "shipping", id: "shipping-au" },
  { type: "story", id: "story" },
  { type: "social_grid", id: "social" },
  { type: "newsletter", id: "newsletter" },
];
