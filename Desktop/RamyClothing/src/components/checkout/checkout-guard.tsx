"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { lines, hydrated } = useCart();

  useEffect(() => {
    if (!hydrated) return;
    if (lines.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, lines.length, router]);

  if (!hydrated) {
    return (
      <Container className="py-16">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-6 h-64 w-full max-w-xl" />
      </Container>
    );
  }

  if (lines.length === 0) {
    return null;
  }

  return <>{children}</>;
}
