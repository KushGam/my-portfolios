"use client";

import { useRouter } from "next/navigation";
import { useCheckoutDraft } from "@/context/checkout-context";
import { SHIPPING_METHODS } from "@/data/shipping-methods";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function ShippingMethodForm() {
  const router = useRouter();
  const { draft, setDraft } = useCheckoutDraft();
  const selected = draft.shippingMethodId ?? SHIPPING_METHODS[0]?.id;

  function next() {
    router.push("/checkout/payment");
  }

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-foreground">Method</legend>
        <ul className="mt-3 space-y-2">
          {SHIPPING_METHODS.map((m) => {
            const active = selected === m.id;
            return (
              <li key={m.id}>
                <label
                  className={cn(
                    "flex cursor-pointer flex-col rounded-lg border p-4 transition-colors",
                    active
                      ? "border-foreground bg-background"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={m.id}
                        checked={active}
                        onChange={() => setDraft({ shippingMethodId: m.id })}
                        className="mt-1"
                      />
                      <div>
                        <span className="font-medium">{m.label}</span>
                        <p className="text-sm text-foreground-muted">
                          {m.description}
                        </p>
                        <p className="mt-1 text-xs text-foreground-subtle">
                          {m.eta}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm tabular-nums">
                      {formatMoney(m.priceCents)}
                    </span>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      <p className="text-xs text-foreground-muted">
        {/* Future: replace with live carrier quotes (Shippo, EasyPost, etc.). */}
        Rates shown are representative for frontend integration testing.
      </p>
      <Button type="button" size="lg" onClick={next}>
        Continue to payment
      </Button>
    </div>
  );
}
