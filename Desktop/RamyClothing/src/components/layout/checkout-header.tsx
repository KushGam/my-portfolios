import Link from "next/link";
import { LogoMinimal } from "@/components/layout/logo";
import { Container } from "@/components/common/container";

export function CheckoutHeader() {
  return (
    <header className="border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between">
        <LogoMinimal />
        <Link
          href="/cart"
          className="text-sm font-medium text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to bag
        </Link>
      </Container>
    </header>
  );
}
