import Link from "next/link";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">Reset password</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        We will email a secure link to reset your password.
      </p>
      <div className="mt-8">
        <ForgotPasswordForm />
      </div>
      <p className="mt-6 text-sm">
        <Link href="/account/login" className="underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
