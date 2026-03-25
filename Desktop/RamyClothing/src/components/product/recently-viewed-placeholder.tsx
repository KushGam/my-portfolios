import { Container } from "@/components/common/container";

/**
 * Structure for future personalization (localStorage / Supabase / Algolia).
 * UI shell keeps layout ready without faking product history.
 */
export function RecentlyViewedPlaceholder() {
  return (
    <section className="border-t border-border py-12" aria-hidden="false">
      <Container>
        <h2 className="font-display text-xl tracking-tight text-foreground-muted">
          Recently viewed
        </h2>
        <p className="mt-2 max-w-xl text-sm text-foreground-subtle">
          When connected to analytics and session storage, recently viewed
          products will render here as a slim rail — same grid system as the
          rest of the catalogue.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 opacity-40 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-sm bg-border"
              aria-hidden
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
