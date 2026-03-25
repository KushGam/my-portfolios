import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getCollectionByHandle,
  getProductsForCollection,
} from "@/lib/catalog";
import { ProductListing } from "@/components/collection/product-listing";
import { ProductListingSkeleton } from "@/components/collection/product-listing-skeleton";
import type { Metadata } from "next";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const col = getCollectionByHandle(handle);
  if (!col) return { title: "Collection" };
  return {
    title: col.seoTitle,
    description: col.seoDescription,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) notFound();

  const products = getProductsForCollection(handle);

  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing
        products={products}
        title={collection.title}
        description={collection.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: collection.title },
        ]}
      />
    </Suspense>
  );
}
