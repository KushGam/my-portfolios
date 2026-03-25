import { Container } from "@/components/common/container";
import { CheckoutGuard } from "@/components/checkout/checkout-guard";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummaryCard } from "@/components/checkout/order-summary-card";
import { ReviewOrder } from "@/components/checkout/review-order";

export default function CheckoutReviewPage() {
  return (
    <CheckoutGuard>
      <CheckoutSteps current={3} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Review order
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Confirm your details before placing the order.
          </p>
          <div className="mt-8 max-w-xl">
            <ReviewOrder />
          </div>
        </div>
        <div className="lg:pt-6">
          <OrderSummaryCard showPromo={false} />
        </div>
      </Container>
    </CheckoutGuard>
  );
}
