"use client";

import { useState } from "react";
import { MOCK_PROFILE } from "@/data/mock-account";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CommunicationPage() {
  const [email, setEmail] = useState(MOCK_PROFILE.marketingEmail);
  const [sms, setSms] = useState(MOCK_PROFILE.marketingSms);

  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
        Communication preferences
      </h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Control marketing messages. Transactional emails (orders, shipping)
        remain on while you have an account.
      </p>
      <div className="mt-10 max-w-md space-y-6 rounded-lg border border-border bg-background-elevated p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="m-email" className="text-base">
              Product launches &amp; stories
            </Label>
            <p className="mt-1 text-sm text-foreground-muted">
              Occasional editorial emails — no daily noise.
            </p>
          </div>
          <input
            id="m-email"
            type="checkbox"
            className="mt-1 size-4 rounded border-border"
            checked={email}
            onChange={(e) => setEmail(e.target.checked)}
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="m-sms" className="text-base">
              SMS updates
            </Label>
            <p className="mt-1 text-sm text-foreground-muted">
              Delivery and restock alerts where supported.
            </p>
          </div>
          <input
            id="m-sms"
            type="checkbox"
            className="mt-1 size-4 rounded border-border"
            checked={sms}
            onChange={(e) => setSms(e.target.checked)}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            /* Supabase: update preferences JSON */
          }}
        >
          Update preferences
        </Button>
      </div>
    </div>
  );
}
