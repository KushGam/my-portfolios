"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { MAIN_NAV } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0">
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="sr-only">Main menu</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className="flex flex-col px-2 py-4" aria-label="Mobile primary">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-3 text-lg font-display tracking-tight hover:bg-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 border-t border-border px-4 pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-foreground-subtle">
              Account
            </p>
            <Link
              href="/account/login"
              className="block rounded-md py-2 text-sm hover:underline"
            >
              Sign in
            </Link>
            <Link
              href="/account/register"
              className="block rounded-md py-2 text-sm hover:underline"
            >
              Create account
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
