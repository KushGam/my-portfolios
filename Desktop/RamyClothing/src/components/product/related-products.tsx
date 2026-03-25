import { getAllProducts } from "@/lib/catalog";
import type { Product } from "@/types/product";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { ProductCard } from "@/components/product/product-card";

export function RelatedProducts({ current }: { current: Product }) {
  const related = getAllProducts()
    .filter((p) => p.id !== current.id)
    .filter((p) =>
      p.collectionHandles.some((h) => current.collectionHandles.includes(h))
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Section className="border-t border-border bg-background-elevated">
      <Container>
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
          You may also like
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
