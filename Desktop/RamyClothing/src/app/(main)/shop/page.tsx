import { Suspense } from "react";
import { getAllProducts } from "@/lib/catalog";
import { ProductListing } from "@/components/collection/product-listing";
import { ProductListingSkeleton } from "@/components/collection/product-listing-skeleton";

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing
        products={products}
        title="All products"
        description="Premium basics with honest fabrics and fits you can plan a wardrobe around."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
    </Suspense>
  );
}
