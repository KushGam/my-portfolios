import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-border bg-background-elevated text-foreground-muted",
        dark: "border-transparent bg-foreground text-background-elevated",
        success: "border-transparent bg-success/10 text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
