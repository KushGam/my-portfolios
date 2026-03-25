import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

export function ShippingSection() {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
            Australia first · International ready
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
            From Sydney to your door — and beyond.
          </h2>
          <p className="mt-4 text-foreground-muted leading-relaxed">
            We launched with Australian customers in mind: fast metro delivery,
            straightforward returns, and human support in local time zones.
            International shipping is fully enabled at checkout with duties
            messaging where applicable.
          </p>
        </div>
        <dl className="grid gap-6 border border-border bg-background-elevated p-8">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              Australian orders
            </dt>
            <dd className="mt-2 text-sm text-foreground-muted">
              Standard 2–4 business days metro · Express available · Free
              standard over $120 AUD
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              International
            </dt>
            <dd className="mt-2 text-sm text-foreground-muted">
              Tracked courier · Delivery windows shown at checkout · Currency
              display via payment provider
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              Packaging
            </dt>
            <dd className="mt-2 text-sm text-foreground-muted">
              Recyclable mailers and FSC-certified cards — minimal branding,
              maximum protection.
            </dd>
          </div>
        </dl>
      </Container>
    </Section>
  );
}
