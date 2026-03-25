import { Container } from "@/components/common/container";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border">
      <Container className="grid gap-10 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <AccountSidebar />
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}
