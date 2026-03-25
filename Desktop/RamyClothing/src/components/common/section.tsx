import { cn } from "@/lib/cn";

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("py-14 sm:py-20 lg:py-24", className)}
      {...props}
    />
  );
}
