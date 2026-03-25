import Link from "next/link";
import { SIZE_GUIDE_NOTES, SIZE_GUIDE_ROWS } from "@/data/size-guide";
import { Container } from "@/components/common/container";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export default function SizingPage() {
  return (
    <>
      <PageHeader
        title="Sizing guide"
        description="Garment measurements for our core tee block. When in doubt, email us with your chest and shoulder measurements."
        eyebrow="Fit"
      />
      <Container className="space-y-14 py-14">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="sr-only">
              T-shirt size guide, measurements in centimetres
            </caption>
            <thead className="border-b border-border bg-background-elevated text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Size
                </th>
                <th scope="col" className="px-4 py-3">
                  Chest (cm)
                </th>
                <th scope="col" className="px-4 py-3">
                  Length (cm)
                </th>
                <th scope="col" className="px-4 py-3">
                  Shoulder (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_ROWS.map((row) => (
                <tr key={row.size} className="border-b border-border last:border-0">
                  <th scope="row" className="px-4 py-4 font-medium">
                    {row.size}
                  </th>
                  <td className="px-4 py-4 text-foreground-muted">{row.chestCm}</td>
                  <td className="px-4 py-4 text-foreground-muted">{row.lengthCm}</td>
                  <td className="px-4 py-4 text-foreground-muted">{row.shoulderCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-2xl text-sm text-foreground-muted leading-relaxed">
          {SIZE_GUIDE_NOTES}
        </p>
        <section className="grid gap-8 border-t border-border pt-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl tracking-tight">How we fit</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Our Essential Crew is true to size with a slightly dropped shoulder.
              Relaxed styles add ease through the body without changing sleeve
              length dramatically. Boxy fits run shorter in length — check each
              product page for notes.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl tracking-tight">Need help?</h2>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Send shoulder-to-shoulder and chest measurements to customer care
              and we will recommend a size across styles.
            </p>
            <Button asChild variant="secondary" className="mt-4">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
