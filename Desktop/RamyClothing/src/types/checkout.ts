/**
 * Checkout draft — persist via sessionStorage until payment provider (Stripe, etc.) takes over.
 */

export type CheckoutAddress = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type ShippingMethodOption = {
  id: string;
  label: string;
  description: string;
  priceCents: number;
  eta: string;
};

export type PaymentMethodOption = {
  id: string;
  label: string;
  description?: string;
};

export type CheckoutDraft = {
  guest: boolean;
  email: string;
  shipping?: CheckoutAddress;
  shippingMethodId?: string;
  paymentMethodId?: string;
  promoCode?: string;
};
