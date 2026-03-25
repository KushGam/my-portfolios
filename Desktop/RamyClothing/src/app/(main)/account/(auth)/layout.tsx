import { Container } from "@/components/common/container";

export default function AccountAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-md py-16 sm:py-24">{children}</Container>
  );
}
