"use client";

import { CartDrawer } from "@/components/layout/cart-drawer";
import { CartProvider } from "@/context/cart-context";
import { CheckoutProvider } from "@/context/checkout-context";
import { WishlistProvider } from "@/context/wishlist-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <CheckoutProvider>
          {children}
          <CartDrawer />
        </CheckoutProvider>
      </CartProvider>
    </WishlistProvider>
  );
}
