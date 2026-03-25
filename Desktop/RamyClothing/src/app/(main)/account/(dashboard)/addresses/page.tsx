import { MOCK_ADDRESSES } from "@/data/mock-account";
import { Button } from "@/components/ui/button";

export default function AddressesPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
            Addresses
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            {/* Supabase: customer_addresses table + default flags */}
            Saved locations for faster checkout.
          </p>
        </div>
        <Button type="button" variant="secondary" disabled>
          Add address
        </Button>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {MOCK_ADDRESSES.map((a) => (
          <li
            key={a.id}
            className="rounded-lg border border-border bg-background-elevated p-6 text-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{a.label}</p>
              {a.isDefaultShipping ? (
                <span className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
                  Default
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-foreground-muted leading-relaxed">
              {a.firstName} {a.lastName}
              <br />
              {a.line1}
              {a.line2 ? (
                <>
                  <br />
                  {a.line2}
                </>
              ) : null}
              <br />
              {a.city}, {a.state} {a.postalCode}
              <br />
              {a.country}
              {a.phone ? (
                <>
                  <br />
                  {a.phone}
                </>
              ) : null}
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="ghost" type="button" disabled>
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
