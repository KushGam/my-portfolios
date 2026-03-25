import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        <div className="order-2 max-w-xl lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground-subtle">
            Australian designed · Organic cotton
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-tight">
            Wardrobe foundations, made to last seasons.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
            Ramy Clothing is built around premium everyday essentials —
            considered fits, honest fabrics, and a calm aesthetic that lets the
            clothes do the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/collections/t-shirts">Shop T-Shirts</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Our story</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-foreground-subtle">
            Free standard shipping on AU orders over $120 · Easy returns within
            30 days
          </p>
        </div>
        <div className="order-1 relative aspect-[4/5] w-full overflow-hidden bg-sand lg:order-2 lg:aspect-[3/4]">
          <Image
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85"
            alt="Editorial flat lay of neutral premium clothing on stone surface"
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
