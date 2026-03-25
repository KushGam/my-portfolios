import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";

const TOC = [
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use data" },
  { id: "rights", label: "Your rights" },
  { id: "contact", label: "Contact" },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy policy"
        description="Last updated March 2026. Plain-language summary of how Ramy Clothing handles personal information for this storefront."
        eyebrow="Legal"
      />
      <Container className="py-14">
        <nav
          aria-label="Policy sections"
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
          <p>
            This policy describes the information practices for the Ramy
            Clothing website. When you connect Supabase, Stripe, or analytics
            tools, update this page to reflect subprocessors and retention
            windows.
          </p>
          <section id="collect" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              What we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Account details such as name, email, and phone when you
                register.
              </li>
              <li>
                Order and delivery information including shipping addresses.
              </li>
              <li>
                Payment metadata processed by payment providers — we do not
                store full card numbers on Ramy servers.
              </li>
              <li>
                Device and usage data when analytics integrations are enabled.
              </li>
            </ul>
          </section>
          <section id="use" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              How we use data
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Fulfil orders, provide support, and process returns.</li>
              <li>
                Send transactional messages (order confirmations, shipping
                updates).
              </li>
              <li>
                Send marketing communications when you opt in — you can
                unsubscribe anytime.
              </li>
              <li>Improve our website experience and detect fraud.</li>
            </ul>
          </section>
          <section id="rights" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Your rights
            </h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may request access,
              correction, deletion, or portability of personal data. Australian
              customers may contact us to exercise rights under the Privacy Act;
              EU/UK customers may have additional GDPR rights.
            </p>
          </section>
          <section id="contact" className="scroll-mt-28">
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Contact
            </h2>
            <p className="mt-3">
              Privacy questions:{" "}
              <a
                href="mailto:privacy@ramyclothing.com.au"
                className="font-medium text-foreground underline underline-offset-4"
              >
                privacy@ramyclothing.com.au
              </a>
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
