"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/cn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type ProductGalleryProps = {
  images: ProductImage[];
  productTitle: string;
};

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
      <ul
        className="flex flex-row gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-y-auto"
        aria-label="Product thumbnails"
      >
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-sand ring-offset-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full",
                i === active && "ring-2 ring-foreground"
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative min-h-[min(70vh,560px)] flex-1 bg-sand">
        <button
          type="button"
          className="relative block size-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setZoomOpen(true)}
          aria-label={`Enlarge ${productTitle} image`}
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 55vw"
          />
        </button>
      </div>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{productTitle} — enlarged</DialogTitle>
          <div className="relative aspect-[3/4] w-full max-h-[85vh] bg-sand">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
