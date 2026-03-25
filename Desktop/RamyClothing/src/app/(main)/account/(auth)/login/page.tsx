import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        Access orders, addresses, and wishlist sync when authentication is
        connected.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-foreground-muted">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-8 text-center text-xs text-foreground-subtle">
        <Link href="/" className="underline-offset-4 hover:underline">
          Back to store
        </Link>
      </p>
    </div>
  );
}
