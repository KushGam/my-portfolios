// Lazy loader map - only loads when accessed to prevent hanging
const assetCache: Record<string, any> = {};

function lazyLoadAsset(id: string, path: string, type: 'outline' | 'anim'): any {
  const cacheKey = `${id}_${type}`;
  if (cacheKey in assetCache) {
    return assetCache[cacheKey];
  }
  try {
    const module = require(path);
    assetCache[cacheKey] = module;
    return module;
  } catch (error: any) {
    console.warn(`⚠️ Failed to load ${type} for ${id}:`, error?.message || error);
    assetCache[cacheKey] = null;
    return null;
  }
}

export function getLocalAssets(id: string): { outline?: any; anim?: any } {
  // Only load assets lazily when requested - prevents hanging on module load
  switch(id) {
    case "dolphin": return { 
      outline: lazyLoadAsset("dolphin", "../../assets/packs/animals/dolphin/outline.svg", "outline"),
      anim: lazyLoadAsset("dolphin", "../../assets/packs/animals/dolphin/animated.json", "anim")
    };
    case "lion": return { 
      outline: lazyLoadAsset("lion", "../../assets/packs/animals/lion/outline.svg", "outline"),
      anim: lazyLoadAsset("lion", "../../assets/packs/animals/lion/animated.json", "anim")
    };
    case "tiger": return { 
      outline: lazyLoadAsset("tiger", "../../assets/packs/animals/tiger/outline.svg", "outline"),
      anim: lazyLoadAsset("tiger", "../../assets/packs/animals/tiger/animated.json", "anim")
    };
    case "elephant": return { 
      outline: lazyLoadAsset("elephant", "../../assets/packs/animals/elephant/outline.svg", "outline"),
      anim: lazyLoadAsset("elephant", "../../assets/packs/animals/elephant/animated.json", "anim")
    };
    case "giraffe": return { 
      outline: lazyLoadAsset("giraffe", "../../assets/packs/animals/giraffe/outline.svg", "outline"),
      anim: lazyLoadAsset("giraffe", "../../assets/packs/animals/giraffe/animated.json", "anim")
    };
    case "zebra": return { 
      outline: lazyLoadAsset("zebra", "../../assets/packs/animals/zebra/outline.svg", "outline"),
      anim: lazyLoadAsset("zebra", "../../assets/packs/animals/zebra/animated.json", "anim")
    };
    case "panda": return { 
      outline: lazyLoadAsset("panda", "../../assets/packs/animals/panda/outline.svg", "outline"),
      anim: lazyLoadAsset("panda", "../../assets/packs/animals/panda/animated.json", "anim")
    };
    case "koala": return { 
      outline: lazyLoadAsset("koala", "../../assets/packs/animals/koala/outline.svg", "outline"),
      anim: lazyLoadAsset("koala", "../../assets/packs/animals/koala/animated.json", "anim")
    };
    case "kangaroo": return { 
      outline: lazyLoadAsset("kangaroo", "../../assets/packs/animals/kangaroo/outline.svg", "outline"),
      anim: lazyLoadAsset("kangaroo", "../../assets/packs/animals/kangaroo/animated.json", "anim")
    };
    case "hippo": return { 
      outline: lazyLoadAsset("hippo", "../../assets/packs/animals/hippo/outline.svg", "outline"),
      anim: lazyLoadAsset("hippo", "../../assets/packs/animals/hippo/animated.json", "anim")
    };
    case "rhino": return { 
      outline: lazyLoadAsset("rhino", "../../assets/packs/animals/rhino/outline.svg", "outline"),
      anim: lazyLoadAsset("rhino", "../../assets/packs/animals/rhino/animated.json", "anim")
    };
    case "bear": return { 
      outline: lazyLoadAsset("bear", "../../assets/packs/animals/bear/outline.svg", "outline"),
      anim: lazyLoadAsset("bear", "../../assets/packs/animals/bear/animated.json", "anim")
    };
    case "fox": return { 
      outline: lazyLoadAsset("fox", "../../assets/packs/animals/fox/outline.svg", "outline"),
      anim: lazyLoadAsset("fox", "../../assets/packs/animals/fox/animated.json", "anim")
    };
    case "wolf": return { 
      outline: lazyLoadAsset("wolf", "../../assets/packs/animals/wolf/outline.svg", "outline"),
      anim: lazyLoadAsset("wolf", "../../assets/packs/animals/wolf/animated.json", "anim")
    };
    case "deer": return { 
      outline: lazyLoadAsset("deer", "../../assets/packs/animals/deer/outline.svg", "outline"),
      anim: lazyLoadAsset("deer", "../../assets/packs/animals/deer/animated.json", "anim")
    };
    case "monkey": return { 
      outline: lazyLoadAsset("monkey", "../../assets/packs/animals/monkey/outline.svg", "outline"),
      anim: lazyLoadAsset("monkey", "../../assets/packs/animals/monkey/animated.json", "anim")
    };
    case "camel": return { 
      outline: lazyLoadAsset("camel", "../../assets/packs/animals/camel/outline.svg", "outline"),
      anim: lazyLoadAsset("camel", "../../assets/packs/animals/camel/animated.json", "anim")
    };
    case "crocodile": return { 
      outline: lazyLoadAsset("crocodile", "../../assets/packs/animals/crocodile/outline.svg", "outline"),
      anim: lazyLoadAsset("crocodile", "../../assets/packs/animals/crocodile/animated.json", "anim")
    };
    case "turtle": return { 
      outline: lazyLoadAsset("turtle", "../../assets/packs/animals/turtle/outline.svg", "outline"),
      anim: lazyLoadAsset("turtle", "../../assets/packs/animals/turtle/animated.json", "anim")
    };
    case "penguin": return { 
      outline: lazyLoadAsset("penguin", "../../assets/packs/animals/penguin/outline.svg", "outline"),
      anim: lazyLoadAsset("penguin", "../../assets/packs/animals/penguin/animated.json", "anim")
    };
    case "seal": return { 
      outline: lazyLoadAsset("seal", "../../assets/packs/animals/seal/outline.svg", "outline"),
      anim: lazyLoadAsset("seal", "../../assets/packs/animals/seal/animated.json", "anim")
    };
    case "otter": return { 
      outline: lazyLoadAsset("otter", "../../assets/packs/animals/otter/outline.svg", "outline"),
      anim: lazyLoadAsset("otter", "../../assets/packs/animals/otter/animated.json", "anim")
    };
    case "eagle": return { 
      outline: lazyLoadAsset("eagle", "../../assets/packs/birds/eagle/outline.svg", "outline"),
      anim: lazyLoadAsset("eagle", "../../assets/packs/birds/eagle/animated.json", "anim")
    };
    case "parrot": return { 
      outline: lazyLoadAsset("parrot", "../../assets/packs/birds/parrot/outline.svg", "outline"),
      anim: lazyLoadAsset("parrot", "../../assets/packs/birds/parrot/animated.json", "anim")
    };
    case "sparrow": return { 
      outline: lazyLoadAsset("sparrow", "../../assets/packs/birds/sparrow/outline.svg", "outline"),
      anim: lazyLoadAsset("sparrow", "../../assets/packs/birds/sparrow/animated.json", "anim")
    };
    case "peacock": return { 
      outline: lazyLoadAsset("peacock", "../../assets/packs/birds/peacock/outline.svg", "outline"),
      anim: lazyLoadAsset("peacock", "../../assets/packs/birds/peacock/animated.json", "anim")
    };
    case "flamingo": return { 
      outline: lazyLoadAsset("flamingo", "../../assets/packs/birds/flamingo/outline.svg", "outline"),
      anim: lazyLoadAsset("flamingo", "../../assets/packs/birds/flamingo/animated.json", "anim")
    };
    case "owl": return { 
      outline: lazyLoadAsset("owl", "../../assets/packs/birds/owl/outline.svg", "outline"),
      anim: lazyLoadAsset("owl", "../../assets/packs/birds/owl/animated.json", "anim")
    };
    case "penguin_bird": return { 
      outline: lazyLoadAsset("penguin_bird", "../../assets/packs/birds/penguin_bird/outline.svg", "outline"),
      anim: lazyLoadAsset("penguin_bird", "../../assets/packs/birds/penguin_bird/animated.json", "anim")
    };
    case "toucan": return { 
      outline: lazyLoadAsset("toucan", "../../assets/packs/birds/toucan/outline.svg", "outline"),
      anim: lazyLoadAsset("toucan", "../../assets/packs/birds/toucan/animated.json", "anim")
    };
    case "hummingbird": return { 
      outline: lazyLoadAsset("hummingbird", "../../assets/packs/birds/hummingbird/outline.svg", "outline"),
      anim: lazyLoadAsset("hummingbird", "../../assets/packs/birds/hummingbird/animated.json", "anim")
    };
    case "kingfisher": return { 
      outline: lazyLoadAsset("kingfisher", "../../assets/packs/birds/kingfisher/outline.svg", "outline"),
      anim: lazyLoadAsset("kingfisher", "../../assets/packs/birds/kingfisher/animated.json", "anim")
    };
    case "swan": return { 
      outline: lazyLoadAsset("swan", "../../assets/packs/birds/swan/outline.svg", "outline"),
      anim: lazyLoadAsset("swan", "../../assets/packs/birds/swan/animated.json", "anim")
    };
    case "duck": return { 
      outline: lazyLoadAsset("duck", "../../assets/packs/birds/duck/outline.svg", "outline"),
      anim: lazyLoadAsset("duck", "../../assets/packs/birds/duck/animated.json", "anim")
    };
    case "goose": return { 
      outline: lazyLoadAsset("goose", "../../assets/packs/birds/goose/outline.svg", "outline"),
      anim: lazyLoadAsset("goose", "../../assets/packs/birds/goose/animated.json", "anim")
    };
    case "hawk": return { 
      outline: lazyLoadAsset("hawk", "../../assets/packs/birds/hawk/outline.svg", "outline"),
      anim: lazyLoadAsset("hawk", "../../assets/packs/birds/hawk/animated.json", "anim")
    };
    case "falcon": return { 
      outline: lazyLoadAsset("falcon", "../../assets/packs/birds/falcon/outline.svg", "outline"),
      anim: lazyLoadAsset("falcon", "../../assets/packs/birds/falcon/animated.json", "anim")
    };
    case "crane": return { 
      outline: lazyLoadAsset("crane", "../../assets/packs/birds/crane/outline.svg", "outline"),
      anim: lazyLoadAsset("crane", "../../assets/packs/birds/crane/animated.json", "anim")
    };
    case "heron": return { 
      outline: lazyLoadAsset("heron", "../../assets/packs/birds/heron/outline.svg", "outline"),
      anim: lazyLoadAsset("heron", "../../assets/packs/birds/heron/animated.json", "anim")
    };
    case "macaw": return { 
      outline: lazyLoadAsset("macaw", "../../assets/packs/birds/macaw/outline.svg", "outline"),
      anim: lazyLoadAsset("macaw", "../../assets/packs/birds/macaw/animated.json", "anim")
    };
    case "cockatoo": return { 
      outline: lazyLoadAsset("cockatoo", "../../assets/packs/birds/cockatoo/outline.svg", "outline"),
      anim: lazyLoadAsset("cockatoo", "../../assets/packs/birds/cockatoo/animated.json", "anim")
    };
    case "canary": return { 
      outline: lazyLoadAsset("canary", "../../assets/packs/birds/canary/outline.svg", "outline"),
      anim: lazyLoadAsset("canary", "../../assets/packs/birds/canary/animated.json", "anim")
    };
    case "woodpecker": return { 
      outline: lazyLoadAsset("woodpecker", "../../assets/packs/birds/woodpecker/outline.svg", "outline"),
      anim: lazyLoadAsset("woodpecker", "../../assets/packs/birds/woodpecker/animated.json", "anim")
    };
    case "robin": return { 
      outline: lazyLoadAsset("robin", "../../assets/packs/birds/robin/outline.svg", "outline"),
      anim: lazyLoadAsset("robin", "../../assets/packs/birds/robin/animated.json", "anim")
    };
    case "car": return { 
      outline: lazyLoadAsset("car", "../../assets/packs/vehicles/car/outline.svg", "outline"),
      anim: lazyLoadAsset("car", "../../assets/packs/vehicles/car/animated.json", "anim")
    };
    case "bus": return { 
      outline: lazyLoadAsset("bus", "../../assets/packs/vehicles/bus/outline.svg", "outline"),
      anim: lazyLoadAsset("bus", "../../assets/packs/vehicles/bus/animated.json", "anim")
    };
    case "truck": return { 
      outline: lazyLoadAsset("truck", "../../assets/packs/vehicles/truck/outline.svg", "outline"),
      anim: lazyLoadAsset("truck", "../../assets/packs/vehicles/truck/animated.json", "anim")
    };
    case "motorcycle": return { 
      outline: lazyLoadAsset("motorcycle", "../../assets/packs/vehicles/motorcycle/outline.svg", "outline"),
      anim: lazyLoadAsset("motorcycle", "../../assets/packs/vehicles/motorcycle/animated.json", "anim")
    };
    case "bicycle": return { 
      outline: lazyLoadAsset("bicycle", "../../assets/packs/vehicles/bicycle/outline.svg", "outline"),
      anim: lazyLoadAsset("bicycle", "../../assets/packs/vehicles/bicycle/animated.json", "anim")
    };
    case "train": return { 
      outline: lazyLoadAsset("train", "../../assets/packs/vehicles/train/outline.svg", "outline"),
      anim: lazyLoadAsset("train", "../../assets/packs/vehicles/train/animated.json", "anim")
    };
    case "airplane": return { 
      outline: lazyLoadAsset("airplane", "../../assets/packs/vehicles/airplane/outline.svg", "outline"),
      anim: lazyLoadAsset("airplane", "../../assets/packs/vehicles/airplane/animated.json", "anim")
    };
    case "helicopter": return { 
      outline: lazyLoadAsset("helicopter", "../../assets/packs/vehicles/helicopter/outline.svg", "outline"),
      anim: lazyLoadAsset("helicopter", "../../assets/packs/vehicles/helicopter/animated.json", "anim")
    };
    case "rocket": return { 
      outline: lazyLoadAsset("rocket", "../../assets/packs/vehicles/rocket/outline.svg", "outline"),
      anim: lazyLoadAsset("rocket", "../../assets/packs/vehicles/rocket/animated.json", "anim")
    };
    case "submarine": return { 
      outline: lazyLoadAsset("submarine", "../../assets/packs/vehicles/submarine/outline.svg", "outline"),
      anim: lazyLoadAsset("submarine", "../../assets/packs/vehicles/submarine/animated.json", "anim")
    };
    case "boat": return { 
      outline: lazyLoadAsset("boat", "../../assets/packs/vehicles/boat/outline.svg", "outline"),
      anim: lazyLoadAsset("boat", "../../assets/packs/vehicles/boat/animated.json", "anim")
    };
    case "ship": return { 
      outline: lazyLoadAsset("ship", "../../assets/packs/vehicles/ship/outline.svg", "outline"),
      anim: lazyLoadAsset("ship", "../../assets/packs/vehicles/ship/animated.json", "anim")
    };
    case "tractor": return { 
      outline: lazyLoadAsset("tractor", "../../assets/packs/vehicles/tractor/outline.svg", "outline"),
      anim: lazyLoadAsset("tractor", "../../assets/packs/vehicles/tractor/animated.json", "anim")
    };
    case "bulldozer": return { 
      outline: lazyLoadAsset("bulldozer", "../../assets/packs/vehicles/bulldozer/outline.svg", "outline"),
      anim: lazyLoadAsset("bulldozer", "../../assets/packs/vehicles/bulldozer/animated.json", "anim")
    };
    case "excavator": return { 
      outline: lazyLoadAsset("excavator", "../../assets/packs/vehicles/excavator/outline.svg", "outline"),
      anim: lazyLoadAsset("excavator", "../../assets/packs/vehicles/excavator/animated.json", "anim")
    };
    case "ambulance": return { 
      outline: lazyLoadAsset("ambulance", "../../assets/packs/vehicles/ambulance/outline.svg", "outline"),
      anim: lazyLoadAsset("ambulance", "../../assets/packs/vehicles/ambulance/animated.json", "anim")
    };
    case "fire_truck": return { 
      outline: lazyLoadAsset("fire_truck", "../../assets/packs/vehicles/fire_truck/outline.svg", "outline"),
      anim: lazyLoadAsset("fire_truck", "../../assets/packs/vehicles/fire_truck/animated.json", "anim")
    };
    case "police_car": return { 
      outline: lazyLoadAsset("police_car", "../../assets/packs/vehicles/police_car/outline.svg", "outline"),
      anim: lazyLoadAsset("police_car", "../../assets/packs/vehicles/police_car/animated.json", "anim")
    };
    case "taxi": return { 
      outline: lazyLoadAsset("taxi", "../../assets/packs/vehicles/taxi/outline.svg", "outline"),
      anim: lazyLoadAsset("taxi", "../../assets/packs/vehicles/taxi/animated.json", "anim")
    };
    case "scooter": return { 
      outline: lazyLoadAsset("scooter", "../../assets/packs/vehicles/scooter/outline.svg", "outline"),
      anim: lazyLoadAsset("scooter", "../../assets/packs/vehicles/scooter/animated.json", "anim")
    };
    case "hot_air_balloon": return { 
      outline: lazyLoadAsset("hot_air_balloon", "../../assets/packs/vehicles/hot_air_balloon/outline.svg", "outline"),
      anim: lazyLoadAsset("hot_air_balloon", "../../assets/packs/vehicles/hot_air_balloon/animated.json", "anim")
    };
    case "sailboat": return { 
      outline: lazyLoadAsset("sailboat", "../../assets/packs/vehicles/sailboat/outline.svg", "outline"),
      anim: lazyLoadAsset("sailboat", "../../assets/packs/vehicles/sailboat/animated.json", "anim")
    };
    case "rose": return { 
      outline: lazyLoadAsset("rose", "../../assets/packs/plants/rose/outline.svg", "outline"),
      anim: lazyLoadAsset("rose", "../../assets/packs/plants/rose/animated.json", "anim")
    };
    case "sunflower": return { 
      outline: lazyLoadAsset("sunflower", "../../assets/packs/plants/sunflower/outline.svg", "outline"),
      anim: lazyLoadAsset("sunflower", "../../assets/packs/plants/sunflower/animated.json", "anim")
    };
    case "tulip": return { 
      outline: lazyLoadAsset("tulip", "../../assets/packs/plants/tulip/outline.svg", "outline"),
      anim: lazyLoadAsset("tulip", "../../assets/packs/plants/tulip/animated.json", "anim")
    };
    case "daisy": return { 
      outline: lazyLoadAsset("daisy", "../../assets/packs/plants/daisy/outline.svg", "outline"),
      anim: lazyLoadAsset("daisy", "../../assets/packs/plants/daisy/animated.json", "anim")
    };
    case "lotus": return { 
      outline: lazyLoadAsset("lotus", "../../assets/packs/plants/lotus/outline.svg", "outline"),
      anim: lazyLoadAsset("lotus", "../../assets/packs/plants/lotus/animated.json", "anim")
    };
    case "lavender": return { 
      outline: lazyLoadAsset("lavender", "../../assets/packs/plants/lavender/outline.svg", "outline"),
      anim: lazyLoadAsset("lavender", "../../assets/packs/plants/lavender/animated.json", "anim")
    };
    case "hibiscus": return { 
      outline: lazyLoadAsset("hibiscus", "../../assets/packs/plants/hibiscus/outline.svg", "outline"),
      anim: lazyLoadAsset("hibiscus", "../../assets/packs/plants/hibiscus/animated.json", "anim")
    };
    case "orchid": return { 
      outline: lazyLoadAsset("orchid", "../../assets/packs/plants/orchid/outline.svg", "outline"),
      anim: lazyLoadAsset("orchid", "../../assets/packs/plants/orchid/animated.json", "anim")
    };
    case "cherry_blossom": return { 
      outline: lazyLoadAsset("cherry_blossom", "../../assets/packs/plants/cherry_blossom/outline.svg", "outline"),
      anim: lazyLoadAsset("cherry_blossom", "../../assets/packs/plants/cherry_blossom/animated.json", "anim")
    };
    case "cactus": return { 
      outline: lazyLoadAsset("cactus", "../../assets/packs/plants/cactus/outline.svg", "outline"),
      anim: lazyLoadAsset("cactus", "../../assets/packs/plants/cactus/animated.json", "anim")
    };
    case "bamboo": return { 
      outline: lazyLoadAsset("bamboo", "../../assets/packs/plants/bamboo/outline.svg", "outline"),
      anim: lazyLoadAsset("bamboo", "../../assets/packs/plants/bamboo/animated.json", "anim")
    };
    case "maple_tree": return { 
      outline: lazyLoadAsset("maple_tree", "../../assets/packs/plants/maple_tree/outline.svg", "outline"),
      anim: lazyLoadAsset("maple_tree", "../../assets/packs/plants/maple_tree/animated.json", "anim")
    };
    case "oak_tree": return { 
      outline: lazyLoadAsset("oak_tree", "../../assets/packs/plants/oak_tree/outline.svg", "outline"),
      anim: lazyLoadAsset("oak_tree", "../../assets/packs/plants/oak_tree/animated.json", "anim")
    };
    case "palm_tree": return { 
      outline: lazyLoadAsset("palm_tree", "../../assets/packs/plants/palm_tree/outline.svg", "outline"),
      anim: lazyLoadAsset("palm_tree", "../../assets/packs/plants/palm_tree/animated.json", "anim")
    };
    case "pine_tree": return { 
      outline: lazyLoadAsset("pine_tree", "../../assets/packs/plants/pine_tree/outline.svg", "outline"),
      anim: lazyLoadAsset("pine_tree", "../../assets/packs/plants/pine_tree/animated.json", "anim")
    };
    case "fern": return { 
      outline: lazyLoadAsset("fern", "../../assets/packs/plants/fern/outline.svg", "outline"),
      anim: lazyLoadAsset("fern", "../../assets/packs/plants/fern/animated.json", "anim")
    };
    case "aloe": return { 
      outline: lazyLoadAsset("aloe", "../../assets/packs/plants/aloe/outline.svg", "outline"),
      anim: lazyLoadAsset("aloe", "../../assets/packs/plants/aloe/animated.json", "anim")
    };
    case "bonsai": return { 
      outline: lazyLoadAsset("bonsai", "../../assets/packs/plants/bonsai/outline.svg", "outline"),
      anim: lazyLoadAsset("bonsai", "../../assets/packs/plants/bonsai/animated.json", "anim")
    };
    case "mushroom": return { 
      outline: lazyLoadAsset("mushroom", "../../assets/packs/plants/mushroom/outline.svg", "outline"),
      anim: lazyLoadAsset("mushroom", "../../assets/packs/plants/mushroom/animated.json", "anim")
    };
    case "wheat": return { 
      outline: lazyLoadAsset("wheat", "../../assets/packs/plants/wheat/outline.svg", "outline"),
      anim: lazyLoadAsset("wheat", "../../assets/packs/plants/wheat/animated.json", "anim")
    };
    case "corn": return { 
      outline: lazyLoadAsset("corn", "../../assets/packs/plants/corn/outline.svg", "outline"),
      anim: lazyLoadAsset("corn", "../../assets/packs/plants/corn/animated.json", "anim")
    };
    case "pumpkin": return { 
      outline: lazyLoadAsset("pumpkin", "../../assets/packs/plants/pumpkin/outline.svg", "outline"),
      anim: lazyLoadAsset("pumpkin", "../../assets/packs/plants/pumpkin/animated.json", "anim")
    };
    default: return {};
  }
}