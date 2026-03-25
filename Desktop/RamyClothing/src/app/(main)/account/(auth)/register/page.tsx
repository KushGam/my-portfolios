import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">Create account</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        One account for shopping, reordering, and future wholesale tools.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
      <p className="mt-8 text-center text-xs text-foreground-subtle">
        <Link href="/" className="underline-offset-4 hover:underline">
          Back to store
        </Link>
      </p>
    </div>
  );
}
