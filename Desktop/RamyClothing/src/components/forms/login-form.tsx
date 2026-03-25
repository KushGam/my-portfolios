"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(data: Values) {
    void data;
    /* Supabase: signInWithPassword */
    router.push(next);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <Link
            href="/account/forgot-password"
            className="text-xs font-medium underline-offset-4 hover:underline"
          >
            Forgot?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-full" size="lg">
        Sign in
      </Button>
      <p className="text-center text-sm text-foreground-muted">
        New to Ramy?{" "}
        <Link
          href="/account/register"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
