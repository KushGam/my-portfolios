import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

type Props = { searchParams: Promise<{ order?: string }> };

export default async function CheckoutConfirmationPage({ searchParams }: Props) {
  const { order } = await searchParams;
  const ref = order ?? "RC-DEMO-10499";

  return (
    <Container className="max-w-xl py-16 text-center sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
        Thank you
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
        Your order is confirmed
      </h1>
      <p className="mt-4 text-foreground-muted">
        Order reference <span className="font-medium text-foreground">{ref}</span>.
        A confirmation email will arrive shortly with tracking once your parcel
        dispatches.
      </p>
      <p className="mt-3 text-sm text-foreground-subtle">
        {/* Supabase: insert into orders + send transactional email via Resend/SendGrid. */}
        Demo only — no email sent from this static frontend.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/account/orders">View order history</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </Container>
  );
}
