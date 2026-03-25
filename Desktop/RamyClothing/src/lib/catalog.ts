/**
 * Catalog access layer — swap implementation for Supabase / Storefront API.
 */

import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import type { Collection, Product } from "@/types/product";

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export function getProductsForCollection(handle: string): Product[] {
  const col = getCollectionByHandle(handle);
  if (!col) return [];
  return col.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.description.toLowerCase().includes(q)
  );
}
