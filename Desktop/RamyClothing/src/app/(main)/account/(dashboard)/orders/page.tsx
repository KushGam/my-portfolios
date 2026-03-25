import Link from "next/link";
import { MOCK_ORDERS } from "@/data/mock-account";
import { formatMoney, formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

const statusLabel: Record<string, string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
        Order history
      </h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Reorder favourites once line-item APIs are wired to Supabase.
      </p>
      {MOCK_ORDERS.length === 0 ? (
        <p className="mt-10 text-sm text-foreground-muted">No orders yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-border border-t border-border">
          {MOCK_ORDERS.map((o) => (
            <li key={o.id} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/account/orders/${o.id}`}
                  className="font-medium hover:underline"
                >
                  {o.number}
                </Link>
                <p className="text-sm text-foreground-muted">
                  Placed {formatDate(o.placedAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">{statusLabel[o.status]}</Badge>
                <span className="text-sm font-medium tabular-nums">
                  {formatMoney(o.totalCents)}
                </span>
                <Link
                  href={`/account/orders/${o.id}`}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
