import { cn } from "@/lib/cn";
import { Container } from "@/components/common/container";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("border-b border-border bg-background", className)}>
      <Container className="py-10 sm:py-14">
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">
            {description}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
