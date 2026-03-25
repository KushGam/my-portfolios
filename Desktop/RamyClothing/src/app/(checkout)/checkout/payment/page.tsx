import { Container } from "@/components/common/container";
import { CheckoutGuard } from "@/components/checkout/checkout-guard";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummaryCard } from "@/components/checkout/order-summary-card";
import { PaymentMethodForm } from "@/components/checkout/payment-method-form";

export default function CheckoutPaymentPage() {
  return (
    <CheckoutGuard>
      <CheckoutSteps current={2} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Payment
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Select how you would like to pay. No charges are processed in this
            frontend demo.
          </p>
          <div className="mt-8 max-w-xl">
            <PaymentMethodForm />
          </div>
        </div>
        <div className="lg:pt-6">
          <OrderSummaryCard />
        </div>
      </Container>
    </CheckoutGuard>
  );
}
