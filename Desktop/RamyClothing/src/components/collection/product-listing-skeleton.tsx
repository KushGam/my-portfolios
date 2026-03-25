import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductListingSkeleton() {
  return (
    <div>
      <div className="border-b border-border bg-background py-10">
        <Container>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-12 w-2/3 max-w-md" />
          <Skeleton className="mt-3 h-16 w-full max-w-xl" />
        </Container>
      </div>
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div className="hidden space-y-4 lg:block">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
