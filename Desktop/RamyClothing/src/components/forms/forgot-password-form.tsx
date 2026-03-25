"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email(),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(data: Values) {
    void data;
    /* Supabase: resetPasswordForEmail */
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-foreground-muted">
        If an account exists for that email, you will receive reset instructions
        shortly. Return to{" "}
        <Link href="/account/login" className="font-medium underline">
          sign in
        </Link>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
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
      <Button type="submit" className="w-full">
        Send reset link
      </Button>
    </form>
  );
}
