import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";

const TOC = [
  { id: "agreement", label: "Agreement" },
  { id: "orders", label: "Orders & pricing" },
  { id: "liability", label: "Liability" },
  { id: "law", label: "Governing law" },
] as const;

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & conditions"
        description="Terms governing use of this website and purchases from Ramy Clothing. Review with legal counsel before launch."
        eyebrow="Legal"
      />
      <Container className="py-14">
        <nav
          aria-label="Terms sections"
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
        <div className="mx-auto mt-12 max-w-2xl space-y-10 text-sm text-foreground-muted leading-relaxed">
          <p className="text-foreground-subtle">
            Draft storefront terms — replace with counsel-approved copy at
            incorporation.
          </p>
          <section id="agreement" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Agreement
            </h2>
            <p className="mt-3">
              By accessing this website you agree to these terms. If you do not
              agree, please discontinue use. We may update terms periodically;
              continued use constitutes acceptance of revised terms.
            </p>
          </section>
          <section id="orders" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Orders &amp; pricing
            </h2>
            <p className="mt-3">
              Product descriptions, imagery, and pricing aim to be accurate.
              Occasional errors may occur — we reserve the right to cancel orders
              affected by manifest pricing mistakes. Risk of loss passes on
              delivery to the carrier unless otherwise required by law.
            </p>
          </section>
          <section id="liability" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, Ramy Clothing is not liable
              for indirect or consequential loss arising from use of this site
              or products. Nothing excludes rights that cannot be limited under
              the Australian Consumer Law.
            </p>
          </section>
          <section id="law" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of New South Wales, Australia.
              Courts in Sydney have non-exclusive jurisdiction.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
