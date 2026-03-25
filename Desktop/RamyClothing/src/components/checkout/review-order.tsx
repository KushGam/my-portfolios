"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCheckoutDraft } from "@/context/checkout-context";
import { SHIPPING_METHODS } from "@/data/shipping-methods";
import { PAYMENT_METHODS } from "@/data/payment-methods";
import { formatMoney } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function ReviewOrder() {
  const router = useRouter();
  const { clear } = useCart();
  const { draft, reset } = useCheckoutDraft();

  const ship = SHIPPING_METHODS.find((m) => m.id === draft.shippingMethodId);
  const pay = PAYMENT_METHODS.find((m) => m.id === draft.paymentMethodId);

  function placeOrder() {
    /* Future: create PaymentIntent + Supabase order row. */
    clear();
    reset();
    router.push("/checkout/confirmation?order=RC-DEMO-10499");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-background-elevated p-6 text-sm">
        <h3 className="font-medium">Ship to</h3>
        {draft.shipping ? (
          <p className="mt-2 text-foreground-muted leading-relaxed">
            {draft.shipping.firstName} {draft.shipping.lastName}
            <br />
            {draft.shipping.line1}
            {draft.shipping.line2 ? (
              <>
                <br />
                {draft.shipping.line2}
              </>
            ) : null}
            <br />
            {draft.shipping.city}, {draft.shipping.state}{" "}
            {draft.shipping.postalCode}
            <br />
            {draft.shipping.country}
            <br />
            {draft.shipping.phone}
            <br />
            <span className="text-foreground-subtle">
              {draft.shipping.email || draft.email}
            </span>
          </p>
        ) : (
          <p className="mt-2 text-foreground-muted">No address on file.</p>
        )}
      </div>
      <div className="rounded-lg border border-border bg-background-elevated p-6 text-sm">
        <h3 className="font-medium">Delivery</h3>
        <p className="mt-2 text-foreground-muted">
          {ship?.label ?? "Standard"} — {ship?.eta ?? "—"}
        </p>
        <p className="mt-1 tabular-nums">
          {ship ? formatMoney(ship.priceCents) : "—"}
        </p>
      </div>
      <div className="rounded-lg border border-border bg-background-elevated p-6 text-sm">
        <h3 className="font-medium">Payment</h3>
        <p className="mt-2 text-foreground-muted">
          {pay?.label ?? "Card"} {pay?.description ? `· ${pay.description}` : ""}
        </p>
      </div>
      <Button type="button" size="lg" className="w-full sm:w-auto" onClick={placeOrder}>
        Place order (demo)
      </Button>
      <p className="text-xs text-foreground-muted">
        This button simulates success — wire to Stripe and Supabase for production.
      </p>
    </div>
  );
}
