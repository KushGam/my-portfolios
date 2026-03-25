"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/catalog";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") ?? "";

  const results = useMemo(() => searchProducts(q), [q]);

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = String(fd.get("q") ?? "").trim();
    router.push(`${pathname}?q=${encodeURIComponent(next)}`);
  }

  return (
    <>
      <PageHeader
        title="Search"
        description="Find styles by name, tag, or keyword."
        eyebrow="Shop"
      />
      <Container className="py-8">
        <Breadcrumbs
          className="mb-8"
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />
        <form
          onSubmit={onSearch}
          className="mx-auto flex max-w-xl gap-2"
          role="search"
        >
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <Input
            id="site-search"
            name="q"
            defaultValue={q}
            placeholder="Search the catalogue"
            autoComplete="off"
          />
          <Button type="submit">Search</Button>
        </form>
        <p className="mx-auto mt-4 max-w-xl text-sm text-foreground-muted">
          {results.length} result{results.length === 1 ? "" : "s"}
          {q ? ` for “${q}”` : ""}
        </p>
        {results.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md text-center">
            <p className="font-display text-2xl tracking-tight">No matches</p>
            <p className="mt-2 text-sm text-foreground-muted">
              Try a shorter keyword or browse the T-Shirts collection.
            </p>
            <Button asChild className="mt-6">
              <Link href="/collections/t-shirts">View T-Shirts</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
