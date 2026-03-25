"use client";

import { useRouter } from "next/navigation";
import { useCheckoutDraft } from "@/context/checkout-context";
import { PAYMENT_METHODS } from "@/data/payment-methods";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PaymentMethodForm() {
  const router = useRouter();
  const { draft, setDraft } = useCheckoutDraft();
  const selected = draft.paymentMethodId ?? "card";

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          Payment method
        </legend>
        <ul className="mt-3 space-y-2">
          {PAYMENT_METHODS.map((m) => {
            const active = selected === m.id;
            return (
              <li key={m.id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg border p-4",
                    active
                      ? "border-foreground"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={active}
                      onChange={() => setDraft({ paymentMethodId: m.id })}
                    />
                    <div>
                      <span className="font-medium">{m.label}</span>
                      {m.description ? (
                        <p className="text-sm text-foreground-muted">
                          {m.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {selected === "card" ? (
        <div className="rounded-lg border border-dashed border-border p-6">
          <p className="text-sm font-medium">Card details</p>
          <p className="mt-1 text-xs text-foreground-muted">
            {/* Stripe Elements / Payment Element mounts here post-integration. */}
            Placeholder fields — connect Stripe Payment Element in production.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="card-number">Card number</Label>
              <Input
                id="card-number"
                placeholder="4242 4242 4242 4242"
                autoComplete="cc-number"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="exp">Expiry</Label>
              <Input id="exp" placeholder="MM / YY" disabled />
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" disabled />
            </div>
          </div>
        </div>
      ) : null}

      <Button type="button" size="lg" onClick={() => router.push("/checkout/review")}>
        Review order
      </Button>
    </div>
  );
}
