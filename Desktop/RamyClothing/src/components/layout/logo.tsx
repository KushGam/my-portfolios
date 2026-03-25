import Link from "next/link";
import { SITE_NAME } from "@/constants/site";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="font-display text-2xl tracking-tight sm:text-[1.65rem]">
        Ramy
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground-muted group-hover:text-foreground">
        Clothing
      </span>
    </Link>
  );
}

export function LogoMinimal({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-display text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={SITE_NAME}
    >
      Ramy
    </Link>
  );
}
