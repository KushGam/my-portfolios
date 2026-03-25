"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MOCK_PROFILE } from "@/data/mock-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: MOCK_PROFILE.firstName,
      lastName: MOCK_PROFILE.lastName,
      phone: MOCK_PROFILE.phone,
    },
  });

  function onSubmit(data: Values) {
    void data;
    /* Supabase: update profiles */
  }

  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
        Profile
      </h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Personal details and contact information. Role today:{" "}
        <span className="font-medium capitalize text-foreground">
          {MOCK_PROFILE.role}
        </span>{" "}
        — extend for wholesale without breaking this layout.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 max-w-md space-y-5"
        noValidate
      >
        <div>
          <Label htmlFor="email-ro">Email</Label>
          <Input
            id="email-ro"
            defaultValue={MOCK_PROFILE.email}
            disabled
            readOnly
          />
          <p className="mt-1 text-xs text-foreground-subtle">
            Email changes require verification — wire via Supabase auth admin.
          </p>
        </div>
        <div>
          <Label htmlFor="fn">First name</Label>
          <Input id="fn" {...register("firstName")} />
          {errors.firstName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="ln">Last name</Label>
          <Input id="ln" {...register("lastName")} />
          {errors.lastName ? (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {errors.lastName.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="ph">Phone</Label>
          <Input id="ph" type="tel" {...register("phone")} />
        </div>
        <Button type="submit">Save changes</Button>
        {isSubmitSuccessful ? (
          <p className="text-sm text-foreground-muted">Saved (demo).</p>
        ) : null}
      </form>
    </div>
  );
}
