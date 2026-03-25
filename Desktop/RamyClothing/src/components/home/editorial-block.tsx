import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export function EditorialBlock() {
  return (
    <Section className="bg-sand/40">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85"
              alt="Close-up of premium cotton jersey fabric texture"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
              Fabric &amp; make
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              Weight you can feel — without bulk.
            </h2>
            <p className="mt-5 text-foreground-muted leading-relaxed">
              We favour midweight jerseys that hold their shape through washing
              cycles. Seams are reinforced; collars are taped where it matters.
              The result is a tee that reads quiet on the rack but confident on
              the body.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground-muted">
              <li>· GOTS-certified organic cotton across core styles</li>
              <li>· Partner mills in Portugal and Turkey</li>
              <li>· Small-batch drops to reduce overproduction</li>
            </ul>
            <Button asChild className="mt-8" variant="secondary">
              <Link href="/sizing">Understand our fit</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
