import type { Collection } from "@/types/product";
import { PRODUCTS } from "@/data/products";

export const COLLECTIONS: Collection[] = [
  {
    handle: "all",
    title: "All products",
    description:
      "The full Ramy range — premium basics built for repeat wear, designed in Australia and shipped worldwide.",
    seoTitle: "Shop all | Ramy Clothing",
    seoDescription:
      "Explore premium organic cotton t-shirts and essentials from Ramy Clothing.",
    productIds: PRODUCTS.map((p) => p.id),
  },
  {
    handle: "t-shirts",
    title: "T-Shirts",
    description:
      "Our launch focus: considered fits, honest fabrics, and colours that work with the rest of your wardrobe.",
    seoTitle: "T-Shirts | Ramy Clothing",
    seoDescription:
      "Premium organic cotton t-shirts — crew necks, relaxed fits, and everyday essentials.",
    productIds: PRODUCTS.filter((p) =>
      p.collectionHandles.includes("t-shirts")
    ).map((p) => p.id),
  },
];
