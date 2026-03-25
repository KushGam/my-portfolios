"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account/communication", label: "Communication" },
] as const;

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Account">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
          Account
        </p>
        <ul className="mt-4 space-y-1">
          {LINKS.map((l) => {
            const active =
              l.href === "/wishlist"
                ? pathname === "/wishlist"
                : l.href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-border/60 text-foreground"
                      : "text-foreground-muted hover:bg-border/40 hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-xs leading-relaxed text-foreground-subtle">
          {/* Future: wholesale portal link when role === 'wholesale' from Supabase */}
          Wholesale customers: a dedicated ordering experience is on the
          roadmap — contact us for early access.
        </p>
      </nav>
    </aside>
  );
}
