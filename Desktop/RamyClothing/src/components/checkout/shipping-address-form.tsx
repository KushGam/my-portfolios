"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  checkoutAddressSchema,
  type CheckoutAddressValues,
} from "@/lib/schemas/checkout";
import { useCheckoutDraft } from "@/context/checkout-context";
import type { CheckoutAddress } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function toDraftAddress(v: CheckoutAddressValues): CheckoutAddress {
  return {
    email: v.email,
    firstName: v.firstName,
    lastName: v.lastName,
    line1: v.line1,
    line2: v.line2,
    city: v.city,
    state: v.state,
    postalCode: v.postalCode,
    country: v.country,
    phone: v.phone,
  };
}

export function ShippingAddressForm() {
  const router = useRouter();
  const { draft, setDraft } = useCheckoutDraft();

  const defaults: CheckoutAddressValues = {
    email: draft.email || draft.shipping?.email || "",
    firstName: draft.shipping?.firstName ?? "",
    lastName: draft.shipping?.lastName ?? "",
    line1: draft.shipping?.line1 ?? "",
    line2: draft.shipping?.line2 ?? "",
    city: draft.shipping?.city ?? "",
    state: draft.shipping?.state ?? "",
    postalCode: draft.shipping?.postalCode ?? "",
    country: draft.shipping?.country ?? "Australia",
    phone: draft.shipping?.phone ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutAddressValues>({
    resolver: zodResolver(checkoutAddressSchema),
    defaultValues: defaults,
  });

  function onSubmit(values: CheckoutAddressValues) {
    setDraft({
      email: values.email,
      guest: true,
      shipping: toDraftAddress(values),
    });
    router.push("/checkout/shipping-method");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="rounded-lg border border-border bg-background-elevated p-6">
        <p className="text-sm text-foreground-muted">
          Have an account?{" "}
          <Link
            href="/account/login?next=/checkout/shipping"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>{" "}
          for saved addresses — guest checkout is always available.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
          {errors.firstName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
          {errors.lastName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="line1">Address line 1</Label>
          <Input id="line1" autoComplete="address-line1" {...register("line1")} />
          {errors.line1 ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.line1.message}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="line2">Apartment, suite (optional)</Label>
          <Input id="line2" autoComplete="address-line2" {...register("line2")} />
        </div>
        <div>
          <Label htmlFor="city">City / suburb</Label>
          <Input id="city" autoComplete="address-level2" {...register("city")} />
          {errors.city ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.city.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="state">State / region</Label>
          <Input id="state" autoComplete="address-level1" {...register("state")} />
          {errors.state ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.state.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="postalCode">Postcode</Label>
          <Input id="postalCode" autoComplete="postal-code" {...register("postalCode")} />
          {errors.postalCode ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.postalCode.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" autoComplete="country-name" {...register("country")} />
          {errors.country ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.country.message}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <Separator />

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Continue to shipping method
      </Button>
    </form>
  );
}
