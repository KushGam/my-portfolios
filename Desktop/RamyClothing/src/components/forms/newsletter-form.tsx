"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type Values = z.infer<typeof schema>;

export function NewsletterForm({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(data: Values) {
    void data;
    /* Future: POST to Supabase edge function / ESP */
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-2 sm:flex-row sm:items-start", className)}
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          {...register("email")}
          className={cn(
            variant === "dark" &&
              "border-background/25 bg-background/10 text-background placeholder:text-background/45"
          )}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-300" role="alert">
            {errors.email.message}
          </p>
        ) : null}
        {isSubmitSuccessful ? (
          <p className="mt-1 text-xs text-background/80">
            Thank you — you&apos;re on the list.
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        variant={variant === "dark" ? "secondary" : "primary"}
        className={cn(
          "shrink-0 sm:mt-0",
          variant === "dark" && "border-background/30 bg-background text-foreground hover:bg-background/90"
        )}
      >
        Subscribe
      </Button>
    </form>
  );
}
