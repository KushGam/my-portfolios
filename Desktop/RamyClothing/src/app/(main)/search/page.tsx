import { Suspense } from "react";
import { ProductListingSkeleton } from "@/components/collection/product-listing-skeleton";
import { SearchResults } from "@/components/collection/search-results";

export default function SearchPage() {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <SearchResults />
    </Suspense>
  );
}
