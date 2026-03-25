import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { FaqClient } from "@/components/content/faq-client";

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="FAQ"
        description="Orders, delivery, product care, and account questions — curated for clarity."
        eyebrow="Help"
      />
      <Container className="py-14">
        <FaqClient />
      </Container>
    </>
  );
}
