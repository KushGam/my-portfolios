import { Container } from "@/components/common/container";
import { CheckoutGuard } from "@/components/checkout/checkout-guard";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummaryCard } from "@/components/checkout/order-summary-card";
import { ShippingMethodForm } from "@/components/checkout/shipping-method-form";

export default function CheckoutShippingMethodPage() {
  return (
    <CheckoutGuard>
      <CheckoutSteps current={1} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Shipping method
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Choose how fast you would like your Ramy pieces to arrive.
          </p>
          <div className="mt-8 max-w-xl">
            <ShippingMethodForm />
          </div>
        </div>
        <div className="lg:pt-6">
          <OrderSummaryCard />
        </div>
      </Container>
    </CheckoutGuard>
  );
}
