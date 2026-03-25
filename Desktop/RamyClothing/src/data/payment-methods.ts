import type { PaymentMethodOption } from "@/types/checkout";

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  { id: "card", label: "Card", description: "Visa, Mastercard, Amex" },
  { id: "paypal", label: "PayPal" },
  { id: "apple_pay", label: "Apple Pay" },
  { id: "google_pay", label: "Google Pay" },
  {
    id: "bnpl",
    label: "Buy now, pay later",
    description: "Afterpay, Klarna, or Zip where available",
  },
];
