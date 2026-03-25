import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCollectionByHandle, getProductsForCollection } from "@/lib/catalog";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

type FeaturedCollectionProps = {
  handle: string;
};

export function FeaturedCollection({ handle }: FeaturedCollectionProps) {
  const collection = getCollectionByHandle(handle);
  const products = getProductsForCollection(handle).slice(0, 3);

  if (!collection) return null;

  return (
    <Section className="bg-background-elevated">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              {collection.title}
            </h2>
            <p className="mt-3 text-foreground-muted">{collection.description}</p>
          </div>
          <Button asChild variant="ghost" className="group self-start sm:self-auto">
            <Link
              href={`/collections/${handle}`}
              className="inline-flex items-center gap-2"
            >
              View collection
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
