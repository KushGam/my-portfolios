import type { ShippingMethodOption } from "@/types/checkout";

export const SHIPPING_METHODS: ShippingMethodOption[] = [
  {
    id: "standard-au",
    label: "Standard",
    description: "Tracked delivery via Australia Post",
    priceCents: 9_95,
    eta: "2–4 business days (metro)",
  },
  {
    id: "express-au",
    label: "Express",
    description: "Priority dispatch and delivery",
    priceCents: 14_95,
    eta: "1–2 business days (metro)",
  },
];
