"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { getProductById } from "@/lib/catalog";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export function WishlistPageView() {
  const { ids } = useWishlist();
  const products = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHeader
        title="Wishlist"
        description="Saved pieces for later — sign in to sync across devices when accounts go live."
        eyebrow="Saved"
      />
      <Container className="py-10">
        {products.length === 0 ? (
          <div className="mx-auto max-w-md text-center">
            <p className="text-foreground-muted">
              Tap the heart on a product to keep it here. Your list is stored on
              this device until Supabase auth syncs it.
            </p>
            <Button asChild className="mt-6">
              <Link href="/shop">Browse shop</Link>
            </Button>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
