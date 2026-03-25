"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const {
    lines,
    subtotalCents,
    isOpen,
    setCartOpen,
    updateQuantity,
    removeLine,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
  const progress = Math.min(
    100,
    (subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100
  );

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your bag</SheetTitle>
          <SheetDescription>
            {lines.length === 0
              ? "Your bag is empty — discover our latest drops."
              : `${lines.length} ${lines.length === 1 ? "item" : "items"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
              <p className="max-w-xs text-sm text-foreground-muted">
                Thoughtfully made tees and essentials — start with our crew
                neck or relaxed pocket fit.
              </p>
              <Button asChild variant="primary">
                <Link href="/shop" onClick={() => setCartOpen(false)}>
                  Shop all
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto px-6 py-2">
                {lines.map((line) => (
                  <li
                    key={line.lineId}
                    className="flex gap-4 border-b border-border py-5 first:pt-0"
                  >
                    <Link
                      href={`/products/${line.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-sand"
                    >
                      <Image
                        src={line.imageSrc}
                        alt={line.imageAlt}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div>
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-medium text-foreground hover:underline"
                        >
                          {line.title}
                        </Link>
                        <p className="text-sm text-foreground-muted">
                          {line.colorLabel} · {line.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            className="flex size-9 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(line.lineId, line.quantity - 1)
                            }
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex size-9 items-center justify-center hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(line.lineId, line.quantity + 1)
                            }
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="rounded-sm p-2 text-foreground-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`Remove ${line.title}`}
                          onClick={() => removeLine(line.lineId)}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-sm font-medium tabular-nums">
                        {formatMoney(line.unitPriceCents * line.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border bg-background px-6 py-5">
                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-foreground-muted">
                      Free shipping progress
                    </span>
                    <span className="tabular-nums text-foreground-muted">
                      {remaining > 0
                        ? `${formatMoney(remaining)} to go`
                        : "Unlocked"}
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full bg-border"
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progress toward free shipping"
                  >
                    <div
                      className="h-full bg-foreground transition-[width] duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span className="font-medium tabular-nums">
                    {formatMoney(subtotalCents)}
                  </span>
                </div>
                <p className="mb-4 text-xs text-foreground-muted">
                  Shipping and taxes calculated at checkout. AUD pricing shown.
                </p>
                <Separator className="mb-4" />
                <div className="flex flex-col gap-2">
                  <Button asChild variant="primary" className="w-full">
                    <Link href="/checkout/shipping" onClick={() => setCartOpen(false)}>
                      Checkout
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/cart" onClick={() => setCartOpen(false)}>
                      View full bag
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
