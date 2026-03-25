import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

const TILES = [
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    alt: "Minimal wardrobe styling with neutral tones",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    alt: "Fashion editorial in soft daylight",
  },
  {
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    alt: "Person wearing plain premium tee",
  },
  {
    src: "https://images.unsplash.com/photo-1489987707025-afc232fdf7db?w=800&q=80",
    alt: "Folded apparel stack in earth tones",
  },
] as const;

export function SocialGrid() {
  return (
    <Section className="pb-6 pt-4">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
              Community
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">
              On body, in the wild
            </h2>
          </div>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Follow @ramyclothing
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {TILES.map((t) => (
            <li
              key={t.src}
              className="relative aspect-[3/4] overflow-hidden bg-sand"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width:640px) 50vw, 25vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
