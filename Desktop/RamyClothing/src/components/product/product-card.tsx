import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { ProductWishlistButton } from "@/components/product/product-wishlist-button";
import { PRODUCT_COLORS } from "@/data/products";

type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
};

export function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const img = product.images[0];
  const fromPrice = Math.min(...product.variants.map((v) => v.priceCents));
  const defaultVariant = product.variants[0];
  const compareAt =
    defaultVariant?.compareAtCents &&
    defaultVariant.compareAtCents > defaultVariant.priceCents
      ? defaultVariant.compareAtCents
      : undefined;
  const colorTokens = Array.from(
    new Set(product.variants.map((v) => v.color))
  );

  return (
    <article
      className={cn("group flex flex-col", className)}
      aria-labelledby={`product-${product.id}-title`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-labelledby={`product-${product.id}-title`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            priority={priority}
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1">
          {product.badges?.includes("bestseller") ? (
            <Badge variant="dark">Bestseller</Badge>
          ) : null}
          {product.badges?.includes("new") ? (
            <Badge variant="default" className="bg-background/90">
              New
            </Badge>
          ) : null}
        </div>
        <div className="pointer-events-auto absolute right-2 top-2 z-10">
          <ProductWishlistButton productId={product.id} />
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              id={`product-${product.id}-title`}
              className="font-display text-lg tracking-tight"
            >
              <Link
                href={`/products/${product.slug}`}
                className="hover:underline hover:decoration-foreground/30"
              >
                {product.title}
              </Link>
            </h3>
            {product.subtitle ? (
              <p className="mt-0.5 text-sm text-foreground-muted">
                {product.subtitle}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium tabular-nums">
            {formatMoney(fromPrice)}
            {compareAt ? (
              <span className="ml-2 text-foreground-muted line-through">
                {formatMoney(compareAt)}
              </span>
            ) : null}
          </p>
        </div>
        <ul className="flex gap-1.5" aria-label="Available colours">
          {PRODUCT_COLORS.filter((c) => colorTokens.includes(c.token)).map(
            (c) => (
              <li key={c.token}>
                <span
                  className={cn(
                    "block size-4 rounded-full border border-border ring-offset-2 ring-offset-background",
                    c.token === "white" && "bg-white",
                    c.token === "black" && "bg-foreground",
                    c.token === "grey" && "bg-stone"
                  )}
                  title={c.label}
                />
              </li>
            )
          )}
        </ul>
        <Link
          href={`/products/${product.slug}`}
          className="mt-2 text-xs font-medium uppercase tracking-wider text-foreground-muted underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:underline"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
