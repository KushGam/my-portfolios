"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CheckoutDraft } from "@/types/checkout";

const STORAGE_KEY = "ramy_checkout_v1";

const defaultDraft: CheckoutDraft = {
  guest: true,
  email: "",
};

type CheckoutContextValue = {
  draft: CheckoutDraft;
  setDraft: (patch: Partial<CheckoutDraft>) => void;
  reset: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<CheckoutDraft>(defaultDraft);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CheckoutDraft;
        if (parsed && typeof parsed === "object") {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only persistence
          setDraftState({ ...defaultDraft, ...parsed });
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }, [draft, hydrated]);

  const setDraft = useCallback((patch: Partial<CheckoutDraft>) => {
    setDraftState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setDraftState(defaultDraft);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ draft, setDraft, reset }),
    [draft, setDraft, reset]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutDraft() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckoutDraft must be used within CheckoutProvider");
  }
  return ctx;
}
