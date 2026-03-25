"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/types/cart";

const STORAGE_KEY = "ramy_cart_v1";

export type AddCartPayload = Omit<CartLine, "lineId"> & { quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  /** True after localStorage hydration — avoid redirect flash in checkout. */
  hydrated: boolean;
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addLine: (payload: AddCartPayload) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function newLineId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `line_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        /* Hydrate cart from localStorage after mount — avoids SSR/client mismatch. */
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only persistence hydrate
          setLines(parsed);
        }
      }
    } catch {
      /* corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota */
    }
  }, [lines, hydrated]);

  const setCartOpen = useCallback((open: boolean) => setOpen(open), []);
  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const addLine = useCallback((payload: AddCartPayload) => {
    setLines((prev) => {
      const { quantity: qtyOpt, ...rest } = payload;
      const qty = qtyOpt ?? 1;
      const existing = prev.find((l) => l.variantId === payload.variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === payload.variantId
            ? { ...l, quantity: l.quantity + qty }
            : l
        );
      }
      return [...prev, { ...rest, lineId: newLineId(), quantity: qty }];
    });
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((l) => l.lineId !== lineId);
      }
      return prev.map((l) =>
        l.lineId === lineId ? { ...l, quantity } : l
      );
    });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalCents = lines.reduce(
      (n, l) => n + l.unitPriceCents * l.quantity,
      0
    );
    return {
      lines,
      hydrated,
      itemCount,
      subtotalCents,
      isOpen,
      setCartOpen,
      openCart,
      closeCart,
      addLine,
      updateQuantity,
      removeLine,
      clear,
    };
  }, [
    lines,
    hydrated,
    isOpen,
    setCartOpen,
    openCart,
    closeCart,
    addLine,
    updateQuantity,
    removeLine,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
