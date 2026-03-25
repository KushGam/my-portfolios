"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function ProductWishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      className={cn(
        "rounded-full border-0 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background",
        active && "text-red-600",
        className
      )}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
    >
      <Heart
        className={cn("size-4", active && "fill-current")}
        aria-hidden
      />
    </Button>
  );
}
