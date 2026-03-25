import Link from "next/link";
import { Container } from "@/components/common/container";

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Promotional announcement"
      className="flex h-[var(--announcement-h)] items-center border-b border-border bg-foreground text-background text-center text-xs font-medium tracking-wide"
    >
      <Container className="flex items-center justify-center gap-2 px-4">
        <span>Free standard shipping on Australian orders over $120</span>
        <span className="hidden text-background/60 sm:inline">·</span>
        <Link
          href="/shipping-returns"
          className="hidden underline-offset-4 hover:underline sm:inline"
        >
          Details
        </Link>
      </Container>
    </div>
  );
}
