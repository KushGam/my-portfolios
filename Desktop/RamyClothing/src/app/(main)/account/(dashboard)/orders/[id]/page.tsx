import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_ORDERS } from "@/data/mock-account";
import { formatMoney, formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div>
      <Breadcrumbs
        className="mb-8"
        items={[
          { label: "Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: order.number },
        ]}
      />
      <h1 className="font-display text-3xl tracking-tight">Order {order.number}</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Placed {formatDate(order.placedAt)} · {order.currency}
      </p>
      {order.trackingNumber ? (
        <p className="mt-2 text-sm">
          Tracking:{" "}
          <span className="font-mono text-sm">{order.trackingNumber}</span>
        </p>
      ) : null}
      <ul className="mt-10 space-y-6 border-t border-border pt-8">
        {order.lines.map((line, i) => (
          <li key={i} className="flex gap-4">
            <div className="relative size-20 shrink-0 bg-sand">
              <Image
                src={line.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{line.title}</p>
              <p className="text-sm text-foreground-muted">{line.variantLabel}</p>
              <p className="mt-1 text-sm">Qty {line.quantity}</p>
            </div>
            <p className="text-sm font-medium tabular-nums">
              {formatMoney(line.unitPriceCents * line.quantity)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-10 max-w-sm space-y-2 border-t border-border pt-8 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Subtotal</span>
          <span className="tabular-nums">{formatMoney(order.subtotalCents)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Shipping</span>
          <span className="tabular-nums">{formatMoney(order.shippingCents)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Tax</span>
          <span className="tabular-nums">{formatMoney(order.taxCents)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatMoney(order.totalCents)}</span>
        </div>
      </div>
      <div className="mt-10 rounded-lg border border-border bg-background-elevated p-6 text-sm">
        <h2 className="font-medium">Shipping address</h2>
        <p className="mt-2 text-foreground-muted leading-relaxed">
          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          <br />
          {order.shippingAddress.line1}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.postalCode}
          <br />
          {order.shippingAddress.country}
        </p>
      </div>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/account/orders">Back to orders</Link>
      </Button>
    </div>
  );
}
