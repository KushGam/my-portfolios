"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email(),
    password: z.string().min(8, "At least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

type Values = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(data: Values) {
    void data;
    /* Supabase: signUp */
    router.push("/account");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="reg-fn">First name</Label>
          <Input id="reg-fn" autoComplete="given-name" {...register("firstName")} />
          {errors.firstName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="reg-ln">Last name</Label>
          <Input id="reg-ln" autoComplete="family-name" {...register("lastName")} />
          {errors.lastName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="reg-pw">Password</Label>
        <Input
          id="reg-pw"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="reg-confirm">Confirm password</Label>
        <Input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          {...register("confirm")}
        />
        {errors.confirm ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.confirm.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-full" size="lg">
        Create account
      </Button>
      <p className="text-center text-sm text-foreground-muted">
        Already have an account?{" "}
        <Link
          href="/account/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
