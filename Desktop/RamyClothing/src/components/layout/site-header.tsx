"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { MAIN_NAV } from "@/constants/navigation";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/layout/search-dialog";
import { cn } from "@/lib/cn";

export function SiteHeader({ className }: { className?: string }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { ids: wishlistIds } = useWishlist();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
          className
        )}
      >
        <Container className="relative flex h-[var(--header-h)] items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-8">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <div className="hidden lg:block">
              <Logo />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0">
            <div className="lg:hidden">
              <Logo />
            </div>
            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary"
            >
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account/login" aria-label="Account">
                <User className="size-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <span className="relative inline-flex">
                  <Heart className="size-5" />
                  {wishlistIds.length > 0 ? (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                      {wishlistIds.length > 9 ? "9+" : wishlistIds.length}
                    </span>
                  ) : null}
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Shopping bag, ${itemCount} items`}
              onClick={openCart}
            >
              <span className="relative inline-flex">
                <ShoppingBag className="size-5" />
                {itemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                ) : null}
              </span>
            </Button>
          </div>
        </Container>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
