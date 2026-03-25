"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ColorToken, Product, SizeToken } from "@/types/product";
import { PRODUCT_COLORS } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type ProductBuyBoxProps = {
  product: Product;
};

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const router = useRouter();
  const { addLine, openCart } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);

  const defaultColor = product.variants[0]?.color ?? "white";
  const defaultSize = product.variants[0]?.size ?? null;
  const [color, setColor] = useState<ColorToken>(defaultColor);
  const [size, setSize] = useState<SizeToken | null>(defaultSize);
  const [qty, setQty] = useState(1);

  const sizesForColor = useMemo(() => {
    const set = new Set<SizeToken>();
    product.variants
      .filter((v) => v.color === color)
      .forEach((v) => set.add(v.size));
    return (["S", "M", "L"] as SizeToken[]).filter((s) => set.has(s));
  }, [product.variants, color]);

  const resolvedSize =
    size && sizesForColor.includes(size) ? size : sizesForColor[0] ?? null;

  const variant = useMemo(() => {
    if (!resolvedSize) return undefined;
    return product.variants.find(
      (v) => v.color === color && v.size === resolvedSize
    );
  }, [product.variants, color, resolvedSize]);

  const price = variant?.priceCents ?? product.variants[0]?.priceCents ?? 0;
  const compareAt = variant?.compareAtCents;

  function buildPayload() {
    if (!variant) return null;
    const img = product.images[0];
    return {
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      title: product.title,
      imageSrc: img.src,
      imageAlt: img.alt,
      colorLabel: variant.colorLabel,
      size: variant.size,
      unitPriceCents: variant.priceCents,
    };
  }

  function handleAddToCart() {
    const p = buildPayload();
    if (!p) return;
    addLine({ ...p, quantity: qty });
    openCart();
  }

  function handleBuyNow() {
    const p = buildPayload();
    if (!p) return;
    addLine({ ...p, quantity: qty });
    router.push("/checkout/shipping");
  }

  const inStock = variant?.inStock ?? false;
  const lowStock = variant?.lowStock;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {product.badges?.map((b) => (
            <Badge key={b} variant="dark">
              {b === "bestseller" ? "Bestseller" : "New"}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          {product.title}
        </h1>
        {product.subtitle ? (
          <p className="mt-2 text-foreground-muted">{product.subtitle}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-medium tabular-nums">
            {formatMoney(price)}
          </span>
          {compareAt && compareAt > price ? (
            <span className="text-base text-foreground-muted line-through tabular-nums">
              {formatMoney(compareAt)}
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
          {product.description.slice(0, 220)}
          {product.description.length > 220 ? "…" : ""}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Colour
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRODUCT_COLORS.filter((c) =>
            product.variants.some((v) => v.color === c.token)
          ).map((c) => (
            <button
              key={c.token}
              type="button"
              onClick={() => {
                setColor(c.token);
                setSize((prev) => {
                  const avail = product.variants
                    .filter((v) => v.color === c.token)
                    .map((v) => v.size);
                  if (prev && avail.includes(prev)) return prev;
                  return (
                    (["S", "M", "L"] as SizeToken[]).find((s) => avail.includes(s)) ??
                    null
                  );
                });
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                color === c.token
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Size
          </p>
          <Link
            href="/sizing"
            className="text-xs font-medium underline-offset-4 hover:underline"
          >
            Size guide
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizesForColor.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "flex min-w-11 items-center justify-center rounded-md border px-3 py-2 text-sm font-medium",
                resolvedSize === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-foreground-muted">Availability</span>
        {inStock ? (
          <span className={cn(lowStock && "text-amber-800")}>
            {lowStock ? "Low stock" : "In stock"}
          </span>
        ) : (
          <span className="text-foreground-muted">Out of stock</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground-muted">Quantity</span>
        <div className="flex items-center border border-border">
          <button
            type="button"
            className="flex size-10 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-10 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            className="flex size-10 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          className="flex-1"
          size="lg"
          disabled={!inStock || !variant || !resolvedSize}
          onClick={handleAddToCart}
        >
          Add to bag
        </Button>
        <Button
          className="flex-1"
          size="lg"
          variant="outline"
          disabled={!inStock || !variant || !resolvedSize}
          onClick={handleBuyNow}
        >
          Buy now
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn(wishlisted && "border-red-200 text-red-600")}
          aria-pressed={wishlisted}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={() => toggle(product.id)}
        >
          <Heart className={cn("size-5", wishlisted && "fill-current")} />
        </Button>
      </div>

      <div className="rounded-md border border-border bg-background-elevated p-4 text-sm text-foreground-muted">
        <p>
          <strong className="text-foreground">Delivery</strong> — Australian
          orders ship within 1–2 business days. International delivery windows
          shown at checkout.
        </p>
        <p className="mt-2">
          <strong className="text-foreground">Returns</strong> — 30 days,
          unworn with tags.{" "}
          <Link href="/shipping-returns" className="underline underline-offset-4">
            Read policy
          </Link>
        </p>
      </div>
    </div>
  );
}
