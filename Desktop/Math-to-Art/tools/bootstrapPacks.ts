/* Bootstraps 4 packs with 22 items each:
   - creates assets/packs/<category>/<id>/{outline.svg, animated.json}
   - writes src/packs/{animals|birds|vehicles|plants}.manifest.json
   - writes src/packs/assetMap.ts with static require()s
   Run:  npm run bootstrap:packs
*/
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

type Item = { id: string; title: string; theme: string; tint?: string };

const root = process.cwd();

// ---- 1) Master lists --------------------------------------------------------
const animals: Item[] = [
  {id:"dolphin",title:"Dolphin",theme:"ANIMALS",tint:"#54D0FF"},
  {id:"lion",title:"Lion",theme:"ANIMALS",tint:"#FF9F1C"},
  {id:"tiger",title:"Tiger",theme:"ANIMALS",tint:"#FF6B6B"},
  {id:"elephant",title:"Elephant",theme:"ANIMALS",tint:"#9CA3AF"},
  {id:"giraffe",title:"Giraffe",theme:"ANIMALS",tint:"#FBBF24"},
  {id:"zebra",title:"Zebra",theme:"ANIMALS",tint:"#111827"},
  {id:"panda",title:"Panda",theme:"ANIMALS",tint:"#E5E7EB"},
  {id:"koala",title:"Koala",theme:"ANIMALS",tint:"#A7F3D0"},
  {id:"kangaroo",title:"Kangaroo",theme:"ANIMALS",tint:"#F59E0B"},
  {id:"hippo",title:"Hippo",theme:"ANIMALS",tint:"#93C5FD"},
  {id:"rhino",title:"Rhino",theme:"ANIMALS",tint:"#64748B"},
  {id:"bear",title:"Bear",theme:"ANIMALS",tint:"#92400E"},
  {id:"fox",title:"Fox",theme:"ANIMALS",tint:"#FB923C"},
  {id:"wolf",title:"Wolf",theme:"ANIMALS",tint:"#6B7280"},
  {id:"deer",title:"Deer",theme:"ANIMALS",tint:"#A3E635"},
  {id:"monkey",title:"Monkey",theme:"ANIMALS",tint:"#A16207"},
  {id:"camel",title:"Camel",theme:"ANIMALS",tint:"#FDE68A"},
  {id:"crocodile",title:"Crocodile",theme:"ANIMALS",tint:"#34D399"},
  {id:"turtle",title:"Turtle",theme:"ANIMALS",tint:"#10B981"},
  {id:"penguin",title:"Penguin (Animal)",theme:"ANIMALS",tint:"#60A5FA"},
  {id:"seal",title:"Seal",theme:"ANIMALS",tint:"#67E8F9"},
  {id:"otter",title:"Otter",theme:"ANIMALS",tint:"#F59E0B"},
];

const birds: Item[] = [
  {id:"eagle",title:"Eagle",theme:"BIRDS",tint:"#F59E0B"},
  {id:"parrot",title:"Parrot",theme:"BIRDS",tint:"#22C55E"},
  {id:"sparrow",title:"Sparrow",theme:"BIRDS",tint:"#A3A3A3"},
  {id:"peacock",title:"Peacock",theme:"BIRDS",tint:"#3B82F6"},
  {id:"flamingo",title:"Flamingo",theme:"BIRDS",tint:"#FB7185"},
  {id:"owl",title:"Owl",theme:"BIRDS",tint:"#9CA3AF"},
  {id:"penguin_bird",title:"Penguin (Bird)",theme:"BIRDS",tint:"#60A5FA"},
  {id:"toucan",title:"Toucan",theme:"BIRDS",tint:"#111827"},
  {id:"hummingbird",title:"Hummingbird",theme:"BIRDS",tint:"#A78BFA"},
  {id:"kingfisher",title:"Kingfisher",theme:"BIRDS",tint:"#22D3EE"},
  {id:"swan",title:"Swan",theme:"BIRDS",tint:"#F8FAFC"},
  {id:"duck",title:"Duck",theme:"BIRDS",tint:"#FACC15"},
  {id:"goose",title:"Goose",theme:"BIRDS",tint:"#D1D5DB"},
  {id:"hawk",title:"Hawk",theme:"BIRDS",tint:"#6B7280"},
  {id:"falcon",title:"Falcon",theme:"BIRDS",tint:"#64748B"},
  {id:"crane",title:"Crane",theme:"BIRDS",tint:"#E5E7EB"},
  {id:"heron",title:"Heron",theme:"BIRDS",tint:"#93C5FD"},
  {id:"macaw",title:"Macaw",theme:"BIRDS",tint:"#0EA5E9"},
  {id:"cockatoo",title:"Cockatoo",theme:"BIRDS",tint:"#FDE68A"},
  {id:"canary",title:"Canary",theme:"BIRDS",tint:"#FCD34D"},
  {id:"woodpecker",title:"Woodpecker",theme:"BIRDS",tint:"#EF4444"},
  {id:"robin",title:"Robin",theme:"BIRDS",tint:"#F97316"},
];

const vehicles: Item[] = [
  {id:"car",title:"Car",theme:"VEHICLES",tint:"#60A5FA"},
  {id:"bus",title:"Bus",theme:"VEHICLES",tint:"#F59E0B"},
  {id:"truck",title:"Truck",theme:"VEHICLES",tint:"#93C5FD"},
  {id:"motorcycle",title:"Motorcycle",theme:"VEHICLES",tint:"#EF4444"},
  {id:"bicycle",title:"Bicycle",theme:"VEHICLES",tint:"#22C55E"},
  {id:"train",title:"Train",theme:"VEHICLES",tint:"#4B5563"},
  {id:"airplane",title:"Airplane",theme:"VEHICLES",tint:"#38BDF8"},
  {id:"helicopter",title:"Helicopter",theme:"VEHICLES",tint:"#A78BFA"},
  {id:"rocket",title:"Rocket",theme:"VEHICLES",tint:"#FB7185"},
  {id:"submarine",title:"Submarine",theme:"VEHICLES",tint:"#22D3EE"},
  {id:"boat",title:"Boat",theme:"VEHICLES",tint:"#3B82F6"},
  {id:"ship",title:"Ship",theme:"VEHICLES",tint:"#1E3A8A"},
  {id:"tractor",title:"Tractor",theme:"VEHICLES",tint:"#65A30D"},
  {id:"bulldozer",title:"Bulldozer",theme:"VEHICLES",tint:"#FACC15"},
  {id:"excavator",title:"Excavator",theme:"VEHICLES",tint:"#F59E0B"},
  {id:"ambulance",title:"Ambulance",theme:"VEHICLES",tint:"#EF4444"},
  {id:"fire_truck",title:"Fire Truck",theme:"VEHICLES",tint:"#DC2626"},
  {id:"police_car",title:"Police Car",theme:"VEHICLES",tint:"#0EA5E9"},
  {id:"taxi",title:"Taxi",theme:"VEHICLES",tint:"#FDE047"},
  {id:"scooter",title:"Scooter",theme:"VEHICLES",tint:"#34D399"},
  {id:"hot_air_balloon",title:"Hot Air Balloon",theme:"VEHICLES",tint:"#F472B6"},
  {id:"sailboat",title:"Sailboat",theme:"VEHICLES",tint:"#60A5FA"},
];

const plants: Item[] = [
  {id:"rose",title:"Rose",theme:"PLANTS",tint:"#EF4444"},
  {id:"sunflower",title:"Sunflower",theme:"PLANTS",tint:"#FACC15"},
  {id:"tulip",title:"Tulip",theme:"PLANTS",tint:"#FB7185"},
  {id:"daisy",title:"Daisy",theme:"PLANTS",tint:"#FDE68A"},
  {id:"lotus",title:"Lotus",theme:"PLANTS",tint:"#F472B6"},
  {id:"lavender",title:"Lavender",theme:"PLANTS",tint:"#A78BFA"},
  {id:"hibiscus",title:"Hibiscus",theme:"PLANTS",tint:"#F43F5E"},
  {id:"orchid",title:"Orchid",theme:"PLANTS",tint:"#C084FC"},
  {id:"cherry_blossom",title:"Cherry Blossom",theme:"PLANTS",tint:"#F9A8D4"},
  {id:"cactus",title:"Cactus",theme:"PLANTS",tint:"#22C55E"},
  {id:"bamboo",title:"Bamboo",theme:"PLANTS",tint:"#65A30D"},
  {id:"maple_tree",title:"Maple Tree",theme:"PLANTS",tint:"#EA580C"},
  {id:"oak_tree",title:"Oak Tree",theme:"PLANTS",tint:"#166534"},
  {id:"palm_tree",title:"Palm Tree",theme:"PLANTS",tint:"#10B981"},
  {id:"pine_tree",title:"Pine Tree",theme:"PLANTS",tint:"#065F46"},
  {id:"fern",title:"Fern",theme:"PLANTS",tint:"#84CC16"},
  {id:"aloe",title:"Aloe",theme:"PLANTS",tint:"#22C55E"},
  {id:"bonsai",title:"Bonsai",theme:"PLANTS",tint:"#16A34A"},
  {id:"mushroom",title:"Mushroom",theme:"PLANTS",tint:"#E11D48"},
  {id:"wheat",title:"Wheat",theme:"PLANTS",tint:"#F59E0B"},
  {id:"corn",title:"Corn",theme:"PLANTS",tint:"#FCD34D"},
  {id:"pumpkin",title:"Pumpkin",theme:"PLANTS",tint:"#F97316"},
];

// ---- 2) Helpers --------------------------------------------------------------
const packs: Record<string, Item[]> = {
  animals, birds, vehicles, plants
};

const pastelBG = "#F9FAFB";
const stroke = "#D1D5DB";

// Simple generic placeholder path (rounded blob)
// Generate theme-appropriate placeholder paths
function getThemePath(theme: string, label: string): string {
  const paths: Record<string, string> = {
    'ANIMALS': "M160,40 C180,30 200,25 220,30 C240,35 260,45 270,60 C280,75 285,95 280,115 C275,135 265,150 250,160 C235,170 220,175 200,175 C180,175 165,170 150,165 C135,160 120,150 110,135 C100,120 95,100 100,80 C105,60 120,45 140,40 Z",
    'BIRDS': "M160,50 C140,40 120,45 110,60 C100,75 95,95 100,115 C105,130 115,145 130,155 C145,165 160,168 180,165 C200,162 220,155 235,145 C250,135 260,120 265,100 C270,80 265,60 250,50 Z",
    'VEHICLES': "M80,140 L120,100 L200,100 L240,140 L240,180 L200,200 L120,200 L80,180 Z M100,120 L220,120 L220,160 L200,175 L100,175 Z",
    'PLANTS': "M160,40 L170,80 L160,120 L150,80 Z M140,80 L180,80 M160,120 L160,200 M140,200 L180,200",
  };
  
  return paths[theme] || paths['ANIMALS'];
}

const placeholderSVG = (label: string, theme: string = 'ANIMALS') =>
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9FAFB" stop-opacity="1"/>
      <stop offset="100%" stop-color="#E5E7EB" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="24" fill="url(#grad)"/>
  <path d="${getThemePath(theme, label)}" fill="none" stroke="${stroke}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50%" y="92%" text-anchor="middle" font-size="20" font-family="Verdana" font-weight="bold" fill="#6B7280">${label}</text>
</svg>
`;

const placeholderLottie =
`{
  "v":"5.7.6","fr":30,"ip":0,"op":45,"w":300,"h":300,"nm":"spark",
  "ddd":0,"assets":[],"layers":[
    {"ddd":0,"ind":1,"ty":4,"nm":"dot","sr":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},
    "p":{"a":1,"k":[{"i":{"x":0.4,"y":1},"o":{"x":0.6,"y":0},"t":0,"s":[50,250,0]},{"t":45,"s":[250,50,0]}]},
    "a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},
    "shapes":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":0,"k":[16,16]},"nm":"circle"},
              {"ty":"fl","c":{"a":0,"k":[0.3,0.65,1,1]},"o":{"a":0,"k":100},"nm":"fill"}],
    "ip":0,"op":45,"st":0,"bm":0}
  ]
}`;

function ensureDir(p: string) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function writeIfMissing(path: string, content: string) {
  if (!existsSync(path)) writeFileSync(path, content, "utf8");
}

function saveManifest(name: string, items: Item[]) {
  const mPath = join(root, "src", "packs", `${name}.manifest.json`);
  ensureDir(join(root, "src", "packs"));
  writeFileSync(mPath, JSON.stringify({ id: name, title: `${cap(name)} Pack`, items }, null, 2));
}

function cap(s: string){ return s.charAt(0).toUpperCase() + s.slice(1); }

// ---- 3) Generate assets + manifests + assetMap -------------------------------
for (const [packName, items] of Object.entries(packs)) {
  for (const it of items) {
    const base = join(root, "assets", "packs", packName, it.id);
    ensureDir(base);
    // Pass theme for better placeholder shapes
    const theme = packName === 'birds' ? 'BIRDS' : packName === 'vehicles' ? 'VEHICLES' : packName === 'plants' ? 'PLANTS' : 'ANIMALS';
    writeIfMissing(join(base, "outline.svg"), placeholderSVG(cap(it.title), theme));
    writeIfMissing(join(base, "animated.json"), placeholderLottie);
    // (thumb optional; we can render SVG in UI; add thumb.png later if desired)
  }
  saveManifest(packName, items);
}

// assetMap.ts with static requires
const mapLines: string[] = [];
mapLines.push(`export function getLocalAssets(id: string): { outline?: any; anim?: any } {`);
mapLines.push(`  switch(id) {`);

for (const [packName, items] of Object.entries(packs)) {
  for (const it of items) {
    const reqOutline = `require("../../assets/packs/${packName}/${it.id}/outline.svg")`;
    const reqAnim    = `require("../../assets/packs/${packName}/${it.id}/animated.json")`;
    mapLines.push(`    case "${it.id}": return { outline: ${reqOutline}, anim: ${reqAnim} };`);
  }
}

mapLines.push(`    default: return {};`);
mapLines.push(`  }`);
mapLines.push(`}`);

ensureDir(join(root, "src", "packs"));
writeFileSync(join(root, "src", "packs", "assetMap.ts"), mapLines.join("\n"), "utf8");

console.log("✅ Packs bootstrapped with placeholders. Replace any outline.svg/animated.json later with real art.");

