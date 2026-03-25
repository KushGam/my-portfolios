import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

const ICONS = {
  truck: Truck,
  shield: ShieldCheck,
  refresh: RefreshCw,
} as const;

const ROWS = [
  {
    key: "truck",
    title: "Tracked delivery",
    body: "Transparent tracking on every order. Australian fulfilment for faster local delivery.",
  },
  {
    key: "shield",
    title: "Secure checkout",
    body: "PCI-aware flows ready for Stripe, PayPal, and digital wallets at integration.",
  },
  {
    key: "refresh",
    title: "30-day returns",
    body: "If the fit or fabric is not right, send it back unworn with tags attached.",
  },
] as const;

export function TrustSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Shop with confidence
          </h2>
          <p className="mt-3 text-foreground-muted">
            The details customers expect from a premium brand — clear policies,
            responsive support, and packaging that respects the product.
          </p>
        </div>
        <ul className="mt-12 grid gap-10 sm:grid-cols-3">
          {ROWS.map((row) => {
            const Icon = ICONS[row.key];
            return (
              <li key={row.key} className="text-center sm:text-left">
                <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full border border-border sm:mx-0">
                  <Icon className="size-5 text-foreground" aria-hidden />
                </div>
                <h3 className="font-display text-lg tracking-tight">
                  {row.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {row.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
