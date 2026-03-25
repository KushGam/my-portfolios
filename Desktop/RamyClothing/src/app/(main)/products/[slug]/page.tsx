import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
} from "@/lib/catalog";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductDetailAccordions } from "@/components/product/product-detail-accordions";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductMobileCta } from "@/components/product/product-mobile-cta";
import { RecentlyViewedPlaceholder } from "@/components/product/recently-viewed-placeholder";
import { RelatedProducts } from "@/components/product/related-products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  const img = product.images[0];
  return {
    title: product.title,
    description: product.description.slice(0, 155),
    openGraph: {
      images: [{ url: img.src, width: img.width, height: img.height }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Container className="py-6 sm:py-10">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.title },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <ProductGallery
            images={product.images}
            productTitle={product.title}
          />
          <div id="purchase" className="scroll-mt-28 lg:scroll-mt-32">
            <ProductBuyBox product={product} />
          </div>
        </div>
        <div className="mt-14 max-w-3xl">
          <ProductDetailAccordions product={product} />
        </div>
      </Container>
      <RelatedProducts current={product} />
      <RecentlyViewedPlaceholder />
      <ProductMobileCta product={product} />
      {/* Spacer so fixed mobile CTA does not cover content */}
      <div className="h-20 lg:hidden" aria-hidden />
    </>
  );
}
