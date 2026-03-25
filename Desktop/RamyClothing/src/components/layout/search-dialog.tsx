"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { getAllProducts } from "@/lib/catalog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/format";

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const all = getAllProducts();
    if (!query) return all.slice(0, 5);
    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.tags.some((t) => t.includes(query))
    );
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
        <div className="border-b border-border px-6 py-5">
          <DialogTitle className="sr-only">Search products</DialogTitle>
          <DialogDescription className="sr-only">
            Find products by name or tag
          </DialogDescription>
          <label className="flex items-center gap-3 text-foreground-muted">
            <Search className="size-5 shrink-0" aria-hidden />
            <Input
              autoFocus
              placeholder="Search tees, fits, fabrics…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
              aria-label="Search query"
            />
          </label>
        </div>
        <div className="max-h-[min(60vh,420px)] overflow-y-auto px-2 py-2">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-foreground-muted">
              No matches. Try &quot;crew&quot;, &quot;organic&quot;, or
              &quot;pocket&quot;.
            </p>
          ) : (
            <ul>
              {results.map((p) => {
                const img = p.images[0];
                const price = p.variants[0]?.priceCents ?? 0;
                return (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => {
                        onOpenChange(false);
                        setQ("");
                      }}
                      className="flex gap-4 rounded-md px-3 py-3 hover:bg-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-sand">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span className="font-medium text-foreground">
                          {p.title}
                        </span>
                        <span className="text-sm text-foreground-muted">
                          {p.subtitle}
                        </span>
                      </div>
                      <span className="shrink-0 self-center text-sm tabular-nums">
                        {formatMoney(price)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border px-6 py-3 text-center text-xs text-foreground-muted">
          <Link
            href="/search"
            onClick={() => onOpenChange(false)}
            className="underline-offset-4 hover:underline"
          >
            Advanced search
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
