"use client";

import { useMemo, useState } from "react";
import { FAQ_ITEMS } from "@/data/faqs";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqClient() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (f) =>
        f.question.toLowerCase().includes(s) ||
        f.answer.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div>
      <label className="sr-only" htmlFor="faq-filter">
        Filter questions
      </label>
      <Input
        id="faq-filter"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search questions…"
        className="max-w-md"
      />
      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-foreground-muted">No matching questions.</p>
      ) : (
        <Accordion type="single" collapsible className="mt-8 border-t border-border">
          {filtered.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
