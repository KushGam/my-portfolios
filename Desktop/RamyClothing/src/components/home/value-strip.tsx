import { Container } from "@/components/common/container";

const ITEMS = [
  {
    title: "Organic first",
    body: "Certified cotton and responsible mills — no shortcuts on fibre quality.",
  },
  {
    title: "Fit, refined",
    body: "Blocks tested across sizes so drape and shoulder line stay consistent.",
  },
  {
    title: "Built to repeat",
    body: "Construction details chosen for longevity, not one-season novelty.",
  },
];

export function ValueStrip() {
  return (
    <section className="border-y border-border bg-background py-10">
      <Container>
        <ul className="grid gap-8 md:grid-cols-3 md:gap-12">
          {ITEMS.map((item) => (
            <li key={item.title}>
              <h2 className="font-display text-xl tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
