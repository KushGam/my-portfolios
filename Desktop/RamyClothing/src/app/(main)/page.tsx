import { FeaturedCollection } from "@/components/home/featured-collection";
import { FitSection } from "@/components/home/fit-section";
import { FooterCta } from "@/components/home/footer-cta";
import { EditorialBlock } from "@/components/home/editorial-block";
import { HeroSection } from "@/components/home/hero-section";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { ProductRail } from "@/components/home/product-rail";
import { ShippingSection } from "@/components/home/shipping-section";
import { SocialGrid } from "@/components/home/social-grid";
import { StoryPreview } from "@/components/home/story-preview";
import { TrustSection } from "@/components/home/trust-section";
import { ValueStrip } from "@/components/home/value-strip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollection handle="t-shirts" />
      <ValueStrip />
      <ProductRail
        title="Best sellers"
        productIds={["p-essential-crew", "p-relaxed-pocket", "p-boxy-tee"]}
        ctaHref="/shop?sort=bestsellers"
      />
      <ProductRail
        title="New arrivals"
        productIds={["p-vintage-wash", "p-relaxed-pocket", "p-long-sleeve"]}
        ctaHref="/shop?sort=newest"
      />
      <EditorialBlock />
      <TrustSection />
      <FitSection />
      <ShippingSection />
      <StoryPreview />
      <SocialGrid />
      <NewsletterCta />
      <FooterCta />
    </>
  );
}
