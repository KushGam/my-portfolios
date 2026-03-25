"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ColorToken, Product, SizeToken } from "@/types/product";
import { PRODUCT_COLORS, PRODUCT_SIZES } from "@/data/products";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 6;

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

function productMatchesColor(p: Product, colors: ColorToken[]) {
  if (colors.length === 0) return true;
  return p.variants.some((v) => colors.includes(v.color));
}

function productMatchesSize(p: Product, sizes: SizeToken[]) {
  if (sizes.length === 0) return true;
  return p.variants.some((v) => sizes.includes(v.size));
}

function minPrice(p: Product) {
  return Math.min(...p.variants.map((v) => v.priceCents));
}

function productMatchesPrice(
  p: Product,
  minCents: number | null,
  maxCents: number | null
) {
  const price = minPrice(p);
  if (minCents !== null && price < minCents) return false;
  if (maxCents !== null && price > maxCents) return false;
  return true;
}

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  if (sort === "price-asc") {
    copy.sort((a, b) => minPrice(a) - minPrice(b));
  } else if (sort === "price-desc") {
    copy.sort((a, b) => minPrice(b) - minPrice(a));
  } else if (sort === "newest") {
    copy.sort((a, b) => {
      const an = a.badges?.includes("new") ? 0 : 1;
      const bn = b.badges?.includes("new") ? 0 : 1;
      if (an !== bn) return an - bn;
      return a.title.localeCompare(b.title);
    });
  } else {
    copy.sort((a, b) => {
      const ab = a.badges?.includes("bestseller") ? 1 : 0;
      const bb = b.badges?.includes("bestseller") ? 1 : 0;
      return bb - ab;
    });
  }
  return copy;
}

type ProductListingProps = {
  products: Product[];
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
};

export function ProductListing({
  products,
  title,
  description,
  breadcrumbs,
}: ProductListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort");
  const colorParam = searchParams.get("color");
  const sizeParam = searchParams.get("size");
  const minPriceParam = searchParams.get("min");
  const maxPriceParam = searchParams.get("max");
  const fitParam = searchParams.get("fit");

  const sort = (sortParam as SortKey) || "featured";
  const colorFilters = useMemo(
    () => (colorParam?.split(",").filter(Boolean) ?? []) as ColorToken[],
    [colorParam]
  );
  const sizeFilters = useMemo(
    () => (sizeParam?.split(",").filter(Boolean) ?? []) as SizeToken[],
    [sizeParam]
  );
  const fitRelaxed = fitParam === "relaxed";
  const minCents = minPriceParam ? Math.round(Number(minPriceParam) * 100) : null;
  const maxCents = maxPriceParam ? Math.round(Number(maxPriceParam) * 100) : null;

  const [visible, setVisible] = useState(PAGE_SIZE);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      });
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      setVisible(PAGE_SIZE);
    },
    [pathname, router, searchParams]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => productMatchesColor(p, colorFilters));
    list = list.filter((p) => productMatchesSize(p, sizeFilters));
    list = list.filter((p) => productMatchesPrice(p, minCents, maxCents));
    if (fitRelaxed) {
      list = list.filter(
        (p) => p.tags.includes("relaxed") || p.title.toLowerCase().includes("relaxed")
      );
    }
    return sortProducts(list, sort);
  }, [
    products,
    colorFilters,
    sizeFilters,
    minCents,
    maxCents,
    fitRelaxed,
    sort,
  ]);

  const slice = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function toggleColor(c: ColorToken) {
    const set = new Set(colorFilters);
    if (set.has(c)) set.delete(c);
    else set.add(c);
    const val = [...set].join(",");
    updateParams({ color: val || null });
  }

  function toggleSize(s: SizeToken) {
    const set = new Set(sizeFilters);
    if (set.has(s)) set.delete(s);
    else set.add(s);
    const val = [...set].join(",");
    updateParams({ size: val || null });
  }

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Colour
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_COLORS.map((c) => {
            const active = colorFilters.includes(c.token);
            return (
              <li key={c.token}>
                <button
                  type="button"
                  onClick={() => toggleColor(c.token)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  )}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Size
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_SIZES.map((s) => {
            const active = sizeFilters.includes(s);
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={cn(
                    "flex min-w-10 items-center justify-center rounded-md border px-2 py-2 text-sm font-medium",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  )}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Price (AUD)
        </p>
        <div className="mt-3 flex gap-2">
          <div className="flex-1">
            <Label htmlFor="min-price" className="sr-only">
              Minimum price
            </Label>
            <Input
              id="min-price"
              inputMode="decimal"
              placeholder="Min"
              defaultValue={minPriceParam ?? ""}
              onBlur={(e) =>
                updateParams({
                  min: e.target.value || null,
                })
              }
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="max-price" className="sr-only">
              Maximum price
            </Label>
            <Input
              id="max-price"
              inputMode="decimal"
              placeholder="Max"
              defaultValue={maxPriceParam ?? ""}
              onBlur={(e) =>
                updateParams({
                  max: e.target.value || null,
                })
              }
            />
          </div>
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4 rounded border-border"
            checked={fitRelaxed}
            onChange={(e) =>
              updateParams({ fit: e.target.checked ? "relaxed" : null })
            }
          />
          Relaxed fit only
        </label>
        <p className="mt-1 text-xs text-foreground-subtle">
          Placeholder filter — maps to product tags / attributes when connected
          to Supabase.
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => router.push(pathname, { scroll: false })}
      >
        Clear all
      </Button>
    </div>
  );

  return (
    <>
      <PageHeader title={title} description={description} eyebrow="Shop" />
      <Container className="py-8 sm:py-10">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground-muted">
                {filtered.length}{" "}
                {filtered.length === 1 ? "style" : "styles"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      type="button"
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-sm">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto px-6 py-4">{filterPanel}</div>
                  </SheetContent>
                </Sheet>
                <label className="flex items-center gap-2 text-sm text-foreground-muted">
                  <span className="sr-only">Sort by</span>
                  <span aria-hidden>Sort</span>
                  <select
                    className="h-10 rounded-md border border-border bg-background-elevated px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={sort}
                    onChange={(e) =>
                      updateParams({
                        sort:
                          e.target.value === "featured"
                            ? null
                            : e.target.value,
                      })
                    }
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to high</option>
                    <option value="price-desc">Price: High to low</option>
                  </select>
                </label>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-16 rounded-lg border border-dashed border-border bg-background-elevated px-6 py-16 text-center">
                <p className="font-display text-2xl tracking-tight">
                  No products match
                </p>
                <p className="mt-2 text-sm text-foreground-muted">
                  Adjust filters or explore the full range.
                </p>
                <Button
                  className="mt-6"
                  variant="secondary"
                  type="button"
                  onClick={() => router.push(pathname)}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <>
                <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {slice.map((p, i) => (
                    <li key={p.id}>
                      <ProductCard product={p} priority={i < 3} />
                    </li>
                  ))}
                </ul>
                {hasMore ? (
                  <div className="mt-12 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    >
                      Load more
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
