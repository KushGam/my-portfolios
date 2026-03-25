import Link from "next/link";
import { MOCK_PROFILE } from "@/data/mock-account";
import { Button } from "@/components/ui/button";

export default function AccountDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
        Hello, {MOCK_PROFILE.firstName}
      </h1>
      <p className="mt-2 text-sm text-foreground-muted">
        {/* Replace greeting with Supabase user metadata. */}
        This dashboard uses mock data to demonstrate layout — connect `profiles`
        and `orders` tables when backend is ready.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-background-elevated p-6">
          <h2 className="font-medium">Recent order</h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Track shipments and request returns from your order history.
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/account/orders">View orders</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-background-elevated p-6">
          <h2 className="font-medium">Saved addresses</h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Speed up checkout with default shipping details.
          </p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/account/addresses">Manage addresses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
