// scripts/fill_with_openmoji.mjs
// Fills assets/packs/**/outline.svg using OpenMoji "black" SVGs by keyword.
// License note: OpenMoji is CC BY-SA 4.0. This script adds an ATTRIBUTION file.

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";

const ROOT = process.cwd();
const BASE = "assets/packs";
const TMP = path.join(os.tmpdir(), "openmoji_tmp_" + Date.now());

// Minimal mapping: folder slug -> search keywords (try exact first, then fuzzy)
const MAP = {
  // ANIMALS
  "animals/dolphin": ["dolphin"],
  "animals/lion": ["lion", "lion face"],
  "animals/tiger": ["tiger", "tiger face"],
  "animals/elephant": ["elephant"],
  "animals/giraffe": ["giraffe"],
  "animals/zebra": ["zebra"],
  "animals/panda": ["panda"],
  "animals/koala": ["koala"],
  "animals/kangaroo": ["kangaroo"],
  "animals/hippo": ["hippopotamus", "hippo"],
  "animals/rhino": ["rhinoceros", "rhino"],
  "animals/bear": ["bear", "bear face"],
  "animals/fox": ["fox"],
  "animals/wolf": ["wolf"],
  "animals/deer": ["deer"],
  "animals/monkey": ["monkey", "monkey face"],
  "animals/camel": ["camel", "two-hump camel", "bactrian camel", "dromedary camel"],
  "animals/crocodile": ["crocodile", "croc"],
  "animals/turtle": ["turtle"],
  "animals/penguin": ["penguin"],
  "animals/seal": ["seal"],
  "animals/otter": ["otter"],

  // VEHICLES
  "vehicles/car": ["automobile", "car"],
  "vehicles/bus": ["bus"],
  "vehicles/truck": ["delivery truck", "truck"],
  "vehicles/motorcycle": ["motorcycle"],
  "vehicles/bicycle": ["bicycle"],
  "vehicles/boat": ["motor boat", "boat"],
  "vehicles/airplane": ["airplane"],
  "vehicles/helicopter": ["helicopter"],
  "vehicles/rocket": ["rocket"],
  "vehicles/train": ["locomotive", "train"],
  "vehicles/sailboat": ["sailboat"],
  // "vehicles/submarine": ["submarine"], // Removed - not found in OpenMoji
  "vehicles/hot_air_balloon": ["balloon", "hot air balloon"],
  "vehicles/fire_truck": ["fire engine", "fire truck"],
  "vehicles/police_car": ["police car"],
  "vehicles/ambulance": ["ambulance"],
  "vehicles/taxi": ["taxi"],
  // "vehicles/bulldozer": ["construction vehicle", "bulldozer"], // Removed - not found in OpenMoji
  // "vehicles/excavator": ["excavator", "construction vehicle"], // Removed - not found in OpenMoji
  "vehicles/tractor": ["tractor"],
  "vehicles/scooter": ["kick scooter", "scooter"],
  "vehicles/ship": ["ship", "passenger ship"],

  // BIRDS
  "birds/eagle": ["eagle"],
  "birds/parrot": ["parrot"],
  "birds/sparrow": ["bird", "sparrow"],
  "birds/peacock": ["peacock"],
  "birds/flamingo": ["flamingo"],
  "birds/owl": ["owl"],
  // "birds/toucan": ["toucan"], // Removed - not found in OpenMoji
  // "birds/hummingbird": ["hummingbird"], // Removed - not found in OpenMoji
  "birds/kingfisher": ["kingfisher", "bird"],
  "birds/swan": ["swan"],
  "birds/duck": ["duck"],
  "birds/goose": ["goose", "bird"],
  "birds/hawk": ["hawk", "eagle"],
  "birds/falcon": ["falcon", "hawk", "eagle"],
  "birds/crane": ["crane bird", "crane"],
  "birds/heron": ["heron", "bird"],
  "birds/macaw": ["macaw", "parrot"],
  "birds/cockatoo": ["cockatoo", "parrot"],
  "birds/canary": ["canary", "bird"],
  // "birds/woodpecker": ["woodpecker"], // Removed - not found in OpenMoji
  "birds/robin": ["robin", "bird"],
  "birds/penguin_bird": ["penguin"],

  // PLANTS
  "plants/rose": ["rose"],
  "plants/sunflower": ["sunflower"],
  "plants/tulip": ["tulip"],
  "plants/daisy": ["blossom", "daisy"],
  "plants/lotus": ["lotus"],
  // "plants/orchid": ["orchid"], // Removed - not found in OpenMoji
  "plants/lavender": ["lavender", "flower"],
  "plants/hibiscus": ["hibiscus"],
  "plants/cherry_blossom": ["cherry blossom"],
  "plants/maple_tree": ["maple leaf", "tree"],
  "plants/oak_tree": ["deciduous tree", "tree"],
  "plants/pine_tree": ["evergreen tree", "tree"],
  "plants/palm_tree": ["palm tree"],
  "plants/bamboo": ["bamboo"],
  "plants/bonsai": ["potted plant", "herb"],
  "plants/cactus": ["cactus"],
  "plants/fern": ["leaf fluttering in wind", "leaf"],
  "plants/aloe": ["herb", "potted plant", "aloe"],
  "plants/mushroom": ["mushroom"],
  "plants/pumpkin": ["jack-o-lantern", "pumpkin"],
  "plants/corn": ["ear of corn", "corn"],
  "plants/wheat": ["sheaf of rice", "grain"]
};

// Helpers
const sh = cmd => execSync(cmd, { stdio: "pipe" }).toString().trim();
const ensureDir = async d => fs.mkdir(d, { recursive: true });

async function main() {
  await ensureDir(TMP);
  console.log("Downloading OpenMoji black SVGs + metadata...");
  // Latest stable zip or mirror is fine — using SourceForge mirror for simplicity:
  sh(`curl -L -o "${TMP}/openmoji-svg-black.zip" "https://sourceforge.net/projects/openmoji.mirror/files/16.0.0/openmoji-svg-black.zip/download"`);
  sh(`curl -L -o "${TMP}/openmoji.json" "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/data/openmoji.json"`);

  sh(`unzip -q -o "${TMP}/openmoji-svg-black.zip" -d "${TMP}/black"`);

  const meta = JSON.parse(await fs.readFile(`${TMP}/openmoji.json`, "utf8"));

  // Build lookup by name substring → codepoints
  const index = meta.map(e => {
    const tags = Array.isArray(e.tags) ? e.tags : (typeof e.tags === 'string' ? [e.tags] : []);
    const subgroups = Array.isArray(e.subgroups) ? e.subgroups : (e.subgroup ? [e.subgroup] : []);
    return {
      cp: e.hexcode, // e.g., "1F42C"
      name: (e.annotation || "").toLowerCase(),   // canonical name
      tags: tags.join(" ").toLowerCase(),
      group: (e.group || "").toLowerCase(),
      subgroup: subgroups.join(" ").toLowerCase()
    };
  });

  let missing = [];
  let placed = 0;

  for (const [slug, keywords] of Object.entries(MAP)) {
    const outPath = path.join(ROOT, BASE, slug, "outline.svg");
    await ensureDir(path.dirname(outPath));

    // Try exact then fuzzy keyword matches
    let found = null;
    for (const k of keywords) {
      const q = k.toLowerCase();
      // prefer exact annotation match
      found = index.find(e => e.name === q) ||
              index.find(e => e.name.includes(q)) ||
              index.find(e => e.tags.includes(q)) ||
              index.find(e => (e.group + " " + e.subgroup).includes(q));
      if (found) break;
    }

    if (!found) {
      missing.push(slug);
      continue;
    }

    const svgPath = path.join(TMP, "black", `${found.cp}.svg`);
    try {
      let svg = await fs.readFile(svgPath, "utf8");

      // Ensure stroke-only look (some OpenMoji black already is stroke; normalize anyway)
      svg = svg
        .replace(/fill="[^"]*"/g, 'fill="none"')
        .replace(/stroke="none"/g, 'stroke="#000"');

      if (!/stroke=/.test(svg)) {
        svg = svg.replace(
          /<svg /,
          '<svg stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" '
        );
      }

      await fs.writeFile(outPath, svg, "utf8");
      console.log(`✓ ${slug}  ←  OpenMoji ${found.name} (${found.cp})`);
      placed++;
    } catch {
      missing.push(slug);
    }
  }

  // Attribution file (license requirement)
  const attr = `
OpenMoji icons (black SVG set) used in this app.
License: CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/
Source: https://github.com/hfg-gmuend/openmoji (OpenMoji 16.0)
Attribution: OpenMoji — Open source emojis for designers, developers and everyone else.
`.trim() + "\n";
  await fs.writeFile(path.join(ROOT, BASE, "ATTRIBUTION_OpenMoji.txt"), attr, "utf8");

  console.log(`\nPlaced: ${placed}   Missing: ${missing.length}`);
  if (missing.length) {
    console.log("Needs manual/fallback (try different keywords):");
    for (const m of missing) console.log("  -", m);
    process.exitCode = 1;
  }
}

main().catch(e => { console.error(e); process.exit(1); });
