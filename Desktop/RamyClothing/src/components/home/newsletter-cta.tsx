import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterCta() {
  return (
    <Section className="border-t border-border bg-sand/30">
      <Container className="max-w-2xl text-center">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Join the list
        </h2>
        <p className="mt-3 text-foreground-muted">
          New colour drops, restocks, and journal notes — sent with restraint.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm />
        </div>
      </Container>
    </Section>
  );
}
