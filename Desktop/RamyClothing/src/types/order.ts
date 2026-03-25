import type { MoneyCents } from "@/types/product";
import type { SavedAddress } from "@/types/user";

export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderLine = {
  title: string;
  variantLabel: string;
  quantity: number;
  unitPriceCents: MoneyCents;
  imageSrc: string;
};

export type OrderSummary = {
  id: string;
  number: string;
  placedAt: string;
  status: OrderStatus;
  subtotalCents: MoneyCents;
  shippingCents: MoneyCents;
  taxCents: MoneyCents;
  totalCents: MoneyCents;
  currency: string;
  lines: OrderLine[];
  shippingAddress: SavedAddress;
  trackingNumber?: string;
  estimatedDelivery?: string;
};
