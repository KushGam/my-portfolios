"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  topic: z.string().min(1, "Choose a topic"),
  message: z.string().min(10, "Tell us a little more"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema) });

  function onSubmit(data: Values) {
    void data;
    /* Supabase edge function / Help Scout / Zendesk */
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="c-name">Name</Label>
        <Input id="c-name" {...register("name")} />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="c-email">Email</Label>
        <Input id="c-email" type="email" {...register("email")} />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="c-topic">Topic</Label>
        <select
          id="c-topic"
          className="flex h-11 w-full rounded-md border border-border bg-background-elevated px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("topic")}
        >
          <option value="">Select…</option>
          <option value="order">Order help</option>
          <option value="fit">Sizing &amp; fit</option>
          <option value="wholesale">Wholesale</option>
          <option value="press">Press</option>
          <option value="other">Other</option>
        </select>
        {errors.topic ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.topic.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="c-msg">Message</Label>
        <Textarea id="c-msg" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>
      <Button type="submit">Send message</Button>
      {isSubmitSuccessful ? (
        <p className="text-sm text-foreground-muted" role="status">
          Thank you — we typically respond within one business day.
        </p>
      ) : null}
    </form>
  );
}
