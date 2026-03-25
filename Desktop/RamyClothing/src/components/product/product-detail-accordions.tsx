"use client";

import type { Product } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductDetailAccordions({ product }: { product: Product }) {
  return (
    <Accordion type="single" collapsible className="w-full border-t border-border">
      <AccordionItem value="desc">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <p className="whitespace-pre-line">{product.description}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fabric">
        <AccordionTrigger>Fabric &amp; care</AccordionTrigger>
        <AccordionContent>
          <p className="font-medium text-foreground">Fabric</p>
          <p className="mt-1">{product.fabric}</p>
          <p className="mt-4 font-medium text-foreground">Care</p>
          <p className="mt-1">{product.care}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fit">
        <AccordionTrigger>Fit guidance</AccordionTrigger>
        <AccordionContent>
          <p>{product.fitNotes}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping &amp; returns</AccordionTrigger>
        <AccordionContent>
          <p>
            Tracked delivery on all orders. Australian metro typically 2–4
            business days after dispatch. International timelines shown at
            checkout. Returns accepted within 30 days for unworn items with tags.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
