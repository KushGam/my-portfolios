import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductById } from "@/lib/catalog";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

type ProductRailProps = {
  title: string;
  productIds: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function ProductRail({
  title,
  productIds,
  ctaHref = "/shop",
  ctaLabel = "Shop all",
}: ProductRailProps) {
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {title}
          </h2>
          <Button asChild variant="ghost" size="sm" className="group hidden sm:inline-flex">
            <Link href={ctaHref} className="inline-flex items-center gap-2">
              {ctaLabel}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
