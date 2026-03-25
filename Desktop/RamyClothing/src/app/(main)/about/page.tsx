import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our story"
        description="Ramy Clothing is an independent Australian label focused on premium everyday essentials — starting with the humble tee, executed with patience and precision."
        eyebrow="About"
      />
      <Container className="space-y-16 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1558171813-3c8f73e6e792?w=1200&q=85"
              alt="Tailor workspace with neutral fabrics and tools"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4 text-foreground-muted leading-relaxed">
            <h2 className="font-display text-2xl text-foreground tracking-tight">
              Quiet clothes, loud standards
            </h2>
            <p>
              We are not chasing drops for the sake of hype. Each release is
              narrow by design — fewer silhouettes, more attention to yarn
              quality, pattern grading, and how a garment settles after the
              third wash.
            </p>
            <p>
              Ramy is based in Australia with production partners in Europe who
              share our expectations around certification, wages, and
              environmental reporting.
            </p>
          </div>
        </div>
        <section className="grid gap-8 border-t border-border pt-16 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Values
            </h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Honest materials, transparent pricing architecture, and customer
              service that treats people like adults.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Product philosophy
            </h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              If a piece does not earn repeat wear in our own wardrobes, it does
              not ship. Basics should be boring only in the best sense — reliable.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground tracking-tight">
              Sustainability
            </h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Organic fibres, considered packaging, and small batches to reduce
              dead stock. We are imperfect but deliberate.
            </p>
          </div>
        </section>
        <div className="flex justify-center border-t border-border pt-16">
          <Button asChild size="lg">
            <Link href="/collections/t-shirts">Shop the collection</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
