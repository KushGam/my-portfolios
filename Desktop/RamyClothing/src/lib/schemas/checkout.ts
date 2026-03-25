import { z } from "zod";

/** Shared with future Supabase insert / Stripe ShippingDetails. */
export const checkoutAddressSchema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  line1: z.string().min(1, "Required"),
  line2: z.string().optional(),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  postalCode: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
  phone: z.string().min(6, "Enter a phone number"),
});

export type CheckoutAddressValues = z.infer<typeof checkoutAddressSchema>;
