import Link from "next/link";
import type { Product } from "@/types/product";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function ProductMobileCta({ product }: { product: Product }) {
  const from = Math.min(...product.variants.map((v) => v.priceCents));
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="min-w-0">
        <p className="truncate text-xs text-foreground-muted">{product.title}</p>
        <p className="text-sm font-semibold tabular-nums">From {formatMoney(from)}</p>
      </div>
      <Button asChild className="flex-1 shrink-0">
        <Link href="#purchase">Select options</Link>
      </Button>
    </div>
  );
}
