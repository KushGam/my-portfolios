import Link from "next/link";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export function FitSection() {
  return (
    <Section className="bg-foreground text-background">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-background/50">
            Sizing confidence
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
            Find your block without guesswork.
          </h2>
          <p className="mt-4 text-background/75 leading-relaxed">
            Each product notes its intended silhouette — slim, true, relaxed, or
            boxy. Our sizing guide translates measurements into the right Ramy
            size, and our team answers fit questions before you commit.
          </p>
          <Button
            asChild
            variant="secondary"
            className="mt-8 border-background/30 bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/sizing">Open sizing guide</Link>
          </Button>
        </div>
        <div className="grid gap-4 text-sm text-background/70">
          <div className="border border-background/15 p-6">
            <p className="font-medium text-background">Measure once</p>
            <p className="mt-2">
              Chest, shoulder, and length — three numbers that usually resolve
              sizing questions.
            </p>
          </div>
          <div className="border border-background/15 p-6">
            <p className="font-medium text-background">Between sizes?</p>
            <p className="mt-2">
              Prefer ease → size up. Prefer clean line under tailoring → size
              down on relaxed fits.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
