"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { ProductCard } from "@/components/product/product-card";
import { getAllProducts } from "@/lib/catalog";

export function CartPageView() {
  const {
    lines,
    subtotalCents,
    updateQuantity,
    removeLine,
    hydrated,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
  const progress = Math.min(
    100,
    (subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100
  );

  const suggest = getAllProducts().slice(0, 3);

  if (!hydrated) {
    return (
      <>
        <PageHeader title="Your bag" eyebrow="Cart" />
        <Container className="py-16 text-sm text-foreground-muted">
          Loading your bag…
        </Container>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHeader
          title="Your bag is empty"
          description="Discover premium organic cotton tees designed for everyday rotation."
          eyebrow="Cart"
        />
        <Container className="py-12">
          <div className="mx-auto max-w-xl text-center">
            <Button asChild size="lg">
              <Link href="/shop">Shop all products</Link>
            </Button>
          </div>
          <div className="mt-16">
            <h2 className="font-display text-2xl tracking-tight">
              You might like
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {suggest.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Your bag" eyebrow="Cart" />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <ul className="divide-y divide-border">
            {lines.map((line) => (
              <li
                key={line.lineId}
                className="flex flex-col gap-4 py-8 first:pt-0 sm:flex-row"
              >
                <Link
                  href={`/products/${line.slug}`}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-sand sm:w-40"
                >
                  <Image
                    src={line.imageSrc}
                    alt={line.imageAlt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${line.slug}`}
                      className="font-display text-xl tracking-tight hover:underline"
                    >
                      {line.title}
                    </Link>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {line.colorLabel} · {line.size}
                    </p>
                    <p className="mt-2 text-sm font-medium tabular-nums">
                      {formatMoney(line.unitPriceCents)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        className="flex size-10 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(line.lineId, line.quantity - 1)
                        }
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-10 text-center text-sm tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex size-10 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(line.lineId, line.quantity + 1)
                        }
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground"
                      onClick={() => removeLine(line.lineId)}
                    >
                      <Trash2 className="size-4" aria-hidden />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right sm:self-start">
                  <p className="text-sm font-medium tabular-nums">
                    {formatMoney(line.unitPriceCents * line.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-background-elevated p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg tracking-tight">Summary</h2>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-foreground-muted">Free shipping</span>
              <span className="text-xs text-foreground-muted">
                {remaining > 0
                  ? `${formatMoney(remaining)} away`
                  : "Unlocked"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-border">
              <div
                className="h-full bg-foreground transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input name="promo" placeholder="Promo code" />
            <Button type="submit" variant="secondary">
              Apply
            </Button>
          </form>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Subtotal</span>
            <span className="tabular-nums font-medium">
              {formatMoney(subtotalCents)}
            </span>
          </div>
          <p className="mt-2 text-xs text-foreground-muted">
            Shipping and taxes calculated at checkout.
          </p>
          <Button asChild className="mt-6 w-full" size="lg">
            <Link href="/checkout/shipping">Checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </Container>
    </>
  );
}
