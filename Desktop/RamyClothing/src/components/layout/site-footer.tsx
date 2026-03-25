import Link from "next/link";
import {
  FOOTER_HELP,
  FOOTER_LEGAL,
  FOOTER_SHOP,
} from "@/constants/navigation";
import { SITE_NAME, SOCIAL_LINKS } from "@/constants/site";
import { Container } from "@/components/common/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <p className="font-display text-3xl tracking-tight">Ramy</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/70">
              {SITE_NAME} is an Australian brand making premium everyday
              essentials — organic fabrics, honest fits, and pieces designed to
              earn a permanent place in your wardrobe.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/80 underline-offset-4 hover:text-background hover:underline"
                >
                  {s.display}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Shop
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_SHOP.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-background/80 hover:text-background"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Customer care
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_HELP.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-background/80 hover:text-background"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/wholesale"
                  className="text-background/80 hover:text-background"
                >
                  Wholesale{" "}
                  <span className="text-background/50">(coming soon)</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Newsletter
            </p>
            <p className="mt-4 text-sm text-background/70">
              Early access to releases, restocks, and journal stories — no
              clutter.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="dark" />
            </div>
            <p className="mt-6 text-xs text-background/50">
              Prices shown in AUD. International orders may display approximate
              local currency at checkout when your payment provider supports it.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-background/15 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ramy Clothing. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-background">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
