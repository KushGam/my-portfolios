import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export function StoryPreview() {
  return (
    <Section className="border-t border-border bg-background-elevated">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-sand lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85"
              alt="Studio workspace with fabric samples and neutral garments"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
              Brand story
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              Calm clothes for busy lives.
            </h2>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              Ramy began as a reaction to noisy trends — a focus on garments you
              buy once and reach for weekly. We are independent, self-funded,
              and obsessive about textile hand-feel and proportion.
            </p>
            <p className="mt-4 text-foreground-muted leading-relaxed">
              This storefront is the first chapter: tees done properly, with
              categories expanding only when we can stand behind the make.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/about">Read the full story</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
