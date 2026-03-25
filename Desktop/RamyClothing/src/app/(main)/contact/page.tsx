import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Questions about fit, an order, or working together — our team reads every message."
        eyebrow="Help"
      />
      <Container className="grid gap-14 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl tracking-tight">Write to us</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-8 text-sm text-foreground-muted">
          <div>
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Customer care
            </h2>
            <p className="mt-2">
              <a
                href="mailto:hello@ramyclothing.com.au"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                hello@ramyclothing.com.au
              </a>
            </p>
            <p className="mt-2">Monday–Friday, 9am–5pm AEDT</p>
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Before you write
            </h2>
            <p className="mt-2">
              Many answers live in our{" "}
              <Link href="/faq" className="font-medium text-foreground underline">
                FAQ
              </Link>{" "}
              and{" "}
              <Link
                href="/shipping-returns"
                className="font-medium text-foreground underline"
              >
                Shipping &amp; returns
              </Link>{" "}
              pages.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background-elevated p-6">
            <p className="text-foreground">
              Press, partnerships, and wholesale enquiries are welcome — select
              the relevant topic in the form so we route your note correctly.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
