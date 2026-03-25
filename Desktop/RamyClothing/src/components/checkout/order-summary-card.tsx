"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatMoney } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "@/constants/site";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCheckoutDraft } from "@/context/checkout-context";

type OrderSummaryCardProps = {
  showPromo?: boolean;
};

export function OrderSummaryCard({ showPromo = true }: OrderSummaryCardProps) {
  const { lines, subtotalCents } = useCart();
  const { draft, setDraft } = useCheckoutDraft();

  const shippingCents = 9_95;
  const taxCents = 0;
  const discountCents =
    draft.promoCode === "WELCOME10" ? Math.round(subtotalCents * 0.1) : 0;
  const freeShip = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const effectiveShipping = freeShip ? 0 : shippingCents;
  const totalCents = Math.max(
    0,
    subtotalCents + effectiveShipping + taxCents - discountCents
  );

  return (
    <aside className="rounded-lg border border-border bg-background-elevated p-6">
      <h2 className="font-display text-lg tracking-tight">Order summary</h2>
      <ul className="mt-4 max-h-64 space-y-4 overflow-y-auto">
        {lines.map((line) => (
          <li key={line.lineId} className="flex gap-3">
            <div className="relative size-16 shrink-0 bg-sand">
              <Image
                src={line.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug">{line.title}</p>
              <p className="text-xs text-foreground-muted">
                {line.colorLabel} · {line.size}
              </p>
              <p className="mt-1 text-sm tabular-nums">
                {formatMoney(line.unitPriceCents * line.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {showPromo ? (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const code = String(fd.get("promo") ?? "").trim();
            setDraft({ promoCode: code || undefined });
          }}
        >
          <Input name="promo" placeholder="Promo code" defaultValue={draft.promoCode} />
          <Button type="submit" variant="secondary">
            Apply
          </Button>
        </form>
      ) : null}

      <Separator className="my-4" />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-foreground-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatMoney(subtotalCents)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-foreground-muted">Shipping</dt>
          <dd className="tabular-nums">
            {freeShip ? (
              <span className="text-success">Complimentary</span>
            ) : (
              formatMoney(shippingCents)
            )}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-foreground-muted">Tax</dt>
          <dd className="tabular-nums">{formatMoney(taxCents)}</dd>
        </div>
        {discountCents > 0 ? (
          <div className="flex justify-between text-success">
            <dt>Discount</dt>
            <dd className="tabular-nums">−{formatMoney(discountCents)}</dd>
          </div>
        ) : null}
      </dl>
      <Separator className="my-4" />
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span className="tabular-nums">{formatMoney(totalCents)}</span>
      </div>
      <p className="mt-2 text-xs text-foreground-muted">
        Estimated delivery shown after shipping step. AUD.
      </p>
      <Link
        href="/cart"
        className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
      >
        Edit bag
      </Link>
    </aside>
  );
}
