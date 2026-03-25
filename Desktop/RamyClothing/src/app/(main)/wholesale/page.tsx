import Link from "next/link";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export default function WholesalePage() {
  return (
    <>
      <PageHeader
        title="Wholesale"
        description="A dedicated B2B ordering experience is in development — net pricing, approvals, and catalogue controls will live alongside our retail storefront."
        eyebrow="B2B"
      />
      <Container className="space-y-10 py-14">
        <div className="mx-auto max-w-2xl space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>
            Ramy Clothing is architecting account roles (customer, wholesale,
            admin) so we can introduce
            wholesale portals without rewriting navigation or product surfaces.
          </p>
          <p>
            If you are a buyer or boutique interested in stocking Ramy, reach
            out with your store details. We will prioritise partners aligned with
            our quality and brand positioning.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Enquire</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">Browse retail catalogue</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
