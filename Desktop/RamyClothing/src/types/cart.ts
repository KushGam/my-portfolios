import type { MoneyCents } from "@/types/product";

export type CartLine = {
  /** Stable line id (e.g. variant id + timestamp) for React keys. */
  lineId: string;
  productId: string;
  variantId: string;
  slug: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  colorLabel: string;
  size: string;
  quantity: number;
  unitPriceCents: MoneyCents;
};
