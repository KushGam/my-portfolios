import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function FooterCta() {
  return (
    <section className="border-t border-border py-12">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-display text-2xl tracking-tight sm:text-3xl">
          Build your foundation in three pieces.
        </p>
        <p className="max-w-lg text-sm text-foreground-muted">
          Start with a crew, add a relaxed pocket for weekends, and layer with
          our long sleeve when the temperature drops.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Shop the edit</Link>
        </Button>
      </Container>
    </section>
  );
}
