import Link from "next/link";
import { cn } from "@/lib/cn";

const STEPS = [
  { href: "/checkout/shipping", label: "Details" },
  { href: "/checkout/shipping-method", label: "Shipping" },
  { href: "/checkout/payment", label: "Payment" },
  { href: "/checkout/review", label: "Review" },
] as const;

export function CheckoutSteps({ current }: { current: number }) {
  return (
    <nav aria-label="Checkout progress" className="border-b border-border">
      <ol className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-4 py-4 text-xs sm:gap-4 sm:text-sm">
        {STEPS.map((step, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <li key={step.href} className="flex items-center gap-2 sm:gap-4">
              {i > 0 ? (
                <span className="hidden text-foreground-subtle sm:inline">
                  /
                </span>
              ) : null}
              <Link
                href={step.href}
                className={cn(
                  "font-medium",
                  active && "text-foreground underline underline-offset-4",
                  done && "text-foreground-muted hover:text-foreground",
                  !active && !done && "text-foreground-subtle"
                )}
                aria-current={active ? "step" : undefined}
              >
                {i + 1}. {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
