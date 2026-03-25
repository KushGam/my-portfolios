import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";

const TOC = [
  { id: "dispatch", label: "Dispatch" },
  { id: "au", label: "Australia" },
  { id: "intl", label: "International" },
  { id: "returns", label: "Returns" },
  { id: "exchanges", label: "Exchanges" },
] as const;

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader
        title="Shipping & returns"
        description="Transparent timelines, fair return windows, and packaging that protects your pieces in transit."
        eyebrow="Policies"
      />
      <Container className="py-14">
        <nav
          aria-label="On this page"
          className="flex flex-wrap gap-3 border-b border-border pb-8 text-sm"
        >
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="rounded-full border border-border px-3 py-1 font-medium hover:border-foreground/40"
            >
              {t.label}
            </a>
          ))}
        </nav>
        <div className="mx-auto mt-12 max-w-2xl space-y-12">
          <section id="dispatch" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Dispatch</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Orders placed before 10am AEDT on business days typically dispatch
              same day from our Sydney fulfilment partner. During peak periods,
              allow an additional business day for processing.
            </p>
          </section>
          <section id="au" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Australia</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Standard delivery to metro areas is generally 2–4 business days
              after dispatch. Regional areas may require additional time.
              Express services reduce transit where available. Complimentary
              standard shipping applies on orders over $120 AUD before tax.
            </p>
          </section>
          <section id="intl" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">
              International
            </h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              International orders ship with tracked couriers. Delivery windows
              and duties/taxes vary by destination — estimates are shown at
              checkout where possible. Customers are responsible for import
              charges where applicable.
            </p>
          </section>
          <section id="returns" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Returns</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Full-price items may be returned within 30 days of delivery,
              unworn and with original tags attached. Initiate a return through
              your account or by contacting customer care with your order
              number. Refunds are issued to the original payment method once
              goods are inspected.
            </p>
          </section>
          <section id="exchanges" className="scroll-mt-28">
            <h2 className="font-display text-2xl tracking-tight">Exchanges</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Size exchanges are subject to stock availability. We recommend
              placing a new order for the preferred size and returning the
              original piece for refund where exchange stock is limited.
            </p>
          </section>
          <p className="text-sm text-foreground-subtle">
            Questions?{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
