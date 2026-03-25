import type { OrderSummary } from "@/types/order";
import type { AccountProfile, SavedAddress } from "@/types/user";

/** Replace with Supabase session + profiles table. */
export const MOCK_PROFILE: AccountProfile = {
  id: "usr_demo",
  email: "hello@example.com",
  firstName: "Alex",
  lastName: "Morgan",
  phone: "+61 400 000 000",
  role: "customer",
  marketingEmail: true,
  marketingSms: false,
};

export const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "Alex",
    lastName: "Morgan",
    line1: "12 William Street",
    line2: "Apt 4",
    city: "Sydney",
    state: "NSW",
    postalCode: "2011",
    country: "Australia",
    phone: "+61 400 000 000",
    isDefaultShipping: true,
  },
  {
    id: "addr-2",
    label: "Office",
    firstName: "Alex",
    lastName: "Morgan",
    line1: "100 George Street",
    city: "Sydney",
    state: "NSW",
    postalCode: "2000",
    country: "Australia",
    isDefaultShipping: false,
  },
];

export const MOCK_ORDERS: OrderSummary[] = [
  {
    id: "ord_1001",
    number: "RC-10482",
    placedAt: "2026-02-12T10:22:00.000Z",
    status: "delivered",
    subtotalCents: 178_00,
    shippingCents: 0,
    taxCents: 0,
    totalCents: 178_00,
    currency: "AUD",
    trackingNumber: "AU7829910234",
    estimatedDelivery: "2026-02-16",
    shippingAddress: MOCK_ADDRESSES[0],
    lines: [
      {
        title: "Essential Crew Tee",
        variantLabel: "White · M",
        quantity: 2,
        unitPriceCents: 89_00,
        imageSrc:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      },
    ],
  },
  {
    id: "ord_1002",
    number: "RC-10501",
    placedAt: "2026-03-02T14:05:00.000Z",
    status: "shipped",
    subtotalCents: 95_00,
    shippingCents: 9_95,
    taxCents: 0,
    totalCents: 104_95,
    currency: "AUD",
    trackingNumber: "AU8821004455",
    estimatedDelivery: "2026-03-08",
    shippingAddress: MOCK_ADDRESSES[0],
    lines: [
      {
        title: "Relaxed Pocket Tee",
        variantLabel: "Heather Grey · L",
        quantity: 1,
        unitPriceCents: 95_00,
        imageSrc:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&q=80",
      },
    ],
  },
];
