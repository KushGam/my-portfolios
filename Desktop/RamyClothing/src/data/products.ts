import type {
  ColorToken,
  Product,
  ProductVariant,
  SizeToken,
} from "@/types/product";

const COLORS: { token: ColorToken; label: string }[] = [
  { token: "white", label: "White" },
  { token: "black", label: "Black" },
  { token: "grey", label: "Heather Grey" },
];

const SIZES: SizeToken[] = ["S", "M", "L"];

function variantsFor(
  baseSku: string,
  priceCents: number,
  compareAtCents?: number
): ProductVariant[] {
  const out: ProductVariant[] = [];
  for (const c of COLORS) {
    for (const s of SIZES) {
      const id = `${baseSku}-${c.token}-${s}`;
      out.push({
        id,
        sku: id.replace(/-/g, "").toUpperCase(),
        color: c.token,
        colorLabel: c.label,
        size: s,
        priceCents,
        compareAtCents,
        inStock: true,
        lowStock: c.token === "white" && s === "S",
      });
    }
  }
  return out;
}

export const PRODUCTS: Product[] = [
  {
    id: "p-essential-crew",
    slug: "essential-crew-tee",
    title: "Essential Crew Tee",
    subtitle: "Midweight organic cotton",
    description:
      "Our signature crew neck — clean lines, substantial hand-feel, and a fit that sits between slim and relaxed. Designed as the tee you reach for most days: understated enough to layer, refined enough to wear on its own.",
    fabric:
      "100% GOTS-certified organic cotton jersey, 180gsm. Milled in Portugal, cut and sewn with flatlock seams for durability.",
    care: "Machine wash cold with like colours. Line dry or tumble dry low. Cool iron if needed.",
    fitNotes:
      "True to size with a slightly dropped shoulder. Size up for a looser drape; size down if you prefer closer to the body.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["basics", "organic", "core"],
    badges: ["bestseller"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
        alt: "White crew neck t-shirt on neutral background",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80",
        alt: "Folded minimal t-shirts in neutral tones",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80",
        alt: "Black t-shirt detail fabric texture",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("esscrew", 89_00, 99_00),
  },
  {
    id: "p-relaxed-pocket",
    slug: "relaxed-pocket-tee",
    title: "Relaxed Pocket Tee",
    subtitle: "Easy drape, chest pocket",
    description:
      "A roomier silhouette with a single patch pocket — relaxed without looking oversized. The neckline keeps its shape wash after wash.",
    fabric: "100% organic cotton, 165gsm. Brushed finish for softness.",
    care: "Cold wash. Do not bleach. Reshape while damp.",
    fitNotes: "Relaxed fit. Take your usual size for intended ease.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["basics", "relaxed"],
    badges: ["new"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
        alt: "Grey pocket t-shirt flat lay",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1622445275576-7212ffc5e72f?w=1200&q=80",
        alt: "Model in minimal pocket tee",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80",
        alt: "Neutral wardrobe essentials folded",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("relpock", 95_00),
  },
  {
    id: "p-boxy-tee",
    slug: "boxy-tee",
    title: "Boxy Tee",
    subtitle: "Structured silhouette",
    description:
      "A modern boxy cut with a wider body and slightly cropped length. Pairs cleanly with tailored trousers or denim.",
    fabric: "Heavyweight organic cotton, 200gsm.",
    care: "Machine wash cold. Lay flat to dry preferred.",
    fitNotes: "Boxy — length runs slightly shorter than our Essential Crew.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["structured", "organic"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
        alt: "White boxy t-shirt on hanger",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80",
        alt: "Fabric detail close-up",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
        alt: "Editorial fashion portrait in tee",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("boxtee", 92_00),
  },
  {
    id: "p-long-sleeve",
    slug: "essential-long-sleeve-tee",
    title: "Essential Long Sleeve",
    subtitle: "Year-round layer",
    description:
      "The long-sleeve counterpart to our crew — same fabric weight and collar profile, extended for layering through cooler months.",
    fabric: "100% organic cotton jersey, 180gsm.",
    care: "Cold wash with similar colours.",
    fitNotes: "True to size. Sleeve length is standard.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["layering"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1618517048289-4646902edaf5?w=1200&q=80",
        alt: "Long sleeve shirt neutral tone",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1554568218-0f1715e57654?w=1200&q=80",
        alt: "Minimal long sleeve top",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1598033129183-c4f50c78f0ae?w=1200&q=80",
        alt: "Grey long sleeve folded",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("longess", 105_00),
  },
  {
    id: "p-slim-tee",
    slug: "slim-fit-tee",
    title: "Slim Fit Tee",
    subtitle: "Closer to the body",
    description:
      "A leaner block through the chest and sleeve — ideal under tailoring or when you want a sharper line.",
    fabric: "Organic cotton with 5% elastane for recovery.",
    care: "Cold wash. Do not tumble dry high heat.",
    fitNotes: "Slim fit. If between sizes, size up.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["slim"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1200&q=80",
        alt: "Slim black tee product shot",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1564859221718-8c44ae7ff999?w=1200&q=80",
        alt: "White slim fit t-shirt",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
        alt: "Minimal menswear styling",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("slimtee", 89_00),
  },
  {
    id: "p-vintage-wash",
    slug: "vintage-wash-tee",
    title: "Vintage Wash Tee",
    subtitle: "Garment-dyed finish",
    description:
      "Garment-dyed for subtle variation and a lived-in hand. Each piece may vary slightly in tone — part of the process.",
    fabric: "100% organic cotton, garment dyed.",
    care: "Wash separately first wears. Cold wash thereafter.",
    fitNotes: "True to size with a soft drape after first wash.",
    collectionHandles: ["all", "t-shirts"],
    tags: ["dyed"],
    badges: ["new"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1503341457453-7102f1c64b8f?w=1200&q=80",
        alt: "Washed cotton tee texture",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1473966968600-fa801bb869a8?w=1200&q=80",
        alt: "Earth tone apparel stack",
        width: 1200,
        height: 1500,
      },
      {
        src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
        alt: "Fashion editorial neutral clothing",
        width: 1200,
        height: 1500,
      },
    ],
    variants: variantsFor("vintwash", 98_00),
  },
];

export { COLORS as PRODUCT_COLORS, SIZES as PRODUCT_SIZES };
