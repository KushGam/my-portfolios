import { Container } from "@/components/common/container";
import { CheckoutGuard } from "@/components/checkout/checkout-guard";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummaryCard } from "@/components/checkout/order-summary-card";
import { ShippingAddressForm } from "@/components/checkout/shipping-address-form";

export default function CheckoutShippingPage() {
  return (
    <CheckoutGuard>
      <CheckoutSteps current={0} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Shipping details
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Where should we send your order?
          </p>
          <div className="mt-8">
            <ShippingAddressForm />
          </div>
        </div>
        <div className="lg:pt-6">
          <OrderSummaryCard />
        </div>
      </Container>
    </CheckoutGuard>
  );
}
