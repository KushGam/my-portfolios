export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: "orders" | "shipping" | "product" | "account";
};

export type SizeGuideRow = {
  size: string;
  chestCm: string;
  lengthCm: string;
  shoulderCm: string;
};

export type HomeSection =
  | { type: "hero"; id: string }
  | { type: "featured_collection"; id: string; handle: string }
  | { type: "value_strip"; id: string }
  | { type: "product_rail"; id: string; title: string; productIds: string[] }
  | { type: "editorial"; id: string }
  | { type: "trust"; id: string }
  | { type: "fit"; id: string }
  | { type: "shipping"; id: string }
  | { type: "story"; id: string }
  | { type: "social_grid"; id: string }
  | { type: "newsletter"; id: string };
