import type { Metadata } from "next";
import { Cormorant, Outfit } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SITE_NAME } from "@/constants/site";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramyclothing.com.au"),
  title: {
    default: `${SITE_NAME} — Premium everyday essentials`,
    template: "%s | Ramy Clothing",
  },
  description:
    "Australian fashion brand offering premium organic cotton t-shirts and wardrobe staples. Designed for repeat wear, shipped worldwide.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
