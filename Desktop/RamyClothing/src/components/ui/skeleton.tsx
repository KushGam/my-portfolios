import { cn } from "@/lib/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-border/80 dark:bg-border/80",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
