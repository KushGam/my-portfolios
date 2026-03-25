import type { AccountRole } from "@/types/user";

export type NavItem = {
  label: string;
  href: string;
  /** If set, only show for these roles once auth exists (Supabase). */
  roles?: AccountRole[];
  /** B2B / wholesale teaser — full portal ships later. */
  badge?: "soon";
};

export const MAIN_NAV: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "T-Shirts", href: "/collections/t-shirts" },
  { label: "About", href: "/about" },
  { label: "Sizing", href: "/sizing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SHOP = [
  { label: "All products", href: "/shop" },
  { label: "T-Shirts", href: "/collections/t-shirts" },
  { label: "New arrivals", href: "/shop?sort=newest" },
] as const;

export const FOOTER_HELP = [
  { label: "Sizing guide", href: "/sizing" },
  { label: "Shipping & returns", href: "/shipping-returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
] as const;
