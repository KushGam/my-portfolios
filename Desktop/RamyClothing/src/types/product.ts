export type ColorToken = "white" | "black" | "grey";

export type SizeToken = "S" | "M" | "L";

export type MoneyCents = number;

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductVariant = {
  id: string;
  sku: string;
  color: ColorToken;
  colorLabel: string;
  size: SizeToken;
  priceCents: MoneyCents;
  compareAtCents?: MoneyCents;
  /** Mock stock — replace with inventory service. */
  inStock: boolean;
  lowStock?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  fabric: string;
  care: string;
  fitNotes: string;
  collectionHandles: string[];
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  /** Featured on home / PLP badges */
  badges?: ("bestseller" | "new")[];
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  productIds: string[];
};
