// Maps puzzle IDs (easy_1, med_5, etc.) to pack asset IDs (dolphin, lion, etc.)
// Puzzle titles now match asset folder names exactly

const puzzleToAssetMap: Record<string, string> = {
  // EASY - 22 puzzles
  // Animals (10)
  'easy_1': 'dolphin',
  'easy_2': 'panda',
  'easy_3': 'koala',
  'easy_4': 'penguin',
  'easy_5': 'turtle',
  'easy_6': 'seal',
  'easy_7': 'otter',
  'easy_8': 'bear',
  'easy_9': 'fox',
  'easy_10': 'deer',
  // Vehicles (8)
  'easy_11': 'car',
  'easy_12': 'bicycle',
  'easy_13': 'boat',
  'easy_14': 'scooter',
  'easy_15': 'taxi',
  'easy_16': 'bus',
  'easy_17': 'train',
  'easy_18': 'truck',
  // Birds (4)
  'easy_19': 'duck',
  'easy_20': 'sparrow',
  'easy_21': 'canary',
  'easy_22': 'robin',
  
  // MEDIUM - 22 puzzles
  // Animals (7)
  'med_1': 'lion',
  'med_2': 'tiger',
  'med_3': 'elephant',
  'med_4': 'giraffe',
  'med_5': 'zebra',
  'med_6': 'hippo',
  'med_7': 'rhino',
  // Vehicles (8)
  'med_8': 'airplane',
  'med_9': 'helicopter',
  'med_10': 'rocket',
  'med_11': 'sailboat',
  'med_12': 'fire_truck',
  'med_13': 'police_car',
  'med_14': 'ambulance',
  'med_15': 'hot_air_balloon',
  // Birds (4)
  'med_16': 'eagle',
  'med_17': 'parrot',
  'med_18': 'owl',
  'med_19': 'flamingo',
  // Plants (3)
  'med_20': 'rose',
  'med_21': 'sunflower',
  'med_22': 'tulip',
  
  // HARD - 22 puzzles
  // Animals (5)
  'hard_1': 'wolf',
  'hard_2': 'camel',
  'hard_3': 'crocodile',
  'hard_4': 'kangaroo',
  'hard_5': 'monkey',
  // Vehicles (5)
  'hard_6': 'ship',
  'hard_7': 'motorcycle',
  'hard_8': 'tractor',
  'hard_9': 'scooter',
  'hard_10': 'rocket',
  // Birds (7)
  'hard_11': 'peacock',
  'hard_12': 'swan',
  'hard_13': 'hawk',
  'hard_14': 'falcon',
  'hard_15': 'crane',
  'hard_16': 'heron',
  'hard_17': 'macaw',
  'hard_18': 'cockatoo',
  // Plants (5)
  'hard_19': 'cherry_blossom',
  'hard_20': 'maple_tree',
  'hard_21': 'oak_tree',
  'hard_22': 'pine_tree',
};

export function getAssetIdFromPuzzleId(puzzleId: string): string | null {
  return puzzleToAssetMap[puzzleId] || null;
}

// Helper to extract base name from puzzle title for fallback matching
export function getAssetIdFromTitle(title: string): string | null {
  const lower = title.toLowerCase().replace(/\s+/g, '_'); // Convert spaces to underscores
  
  // All asset names (from folder structure)
  const assets = [
    // Animals
    'dolphin', 'panda', 'koala', 'penguin', 'turtle', 'seal', 'otter', 'bear', 'fox', 'deer',
    'lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'hippo', 'rhino', 'wolf', 'camel',
    'crocodile', 'kangaroo', 'monkey',
    // Vehicles
    'car', 'bicycle', 'boat', 'scooter', 'taxi', 'bus', 'train', 'truck', 'airplane',
    'helicopter', 'rocket', 'sailboat', 'fire_truck', 'police_car', 'ambulance',
    'hot_air_balloon', 'ship', 'motorcycle', 'tractor',
    // Birds
    'duck', 'sparrow', 'canary', 'robin', 'eagle', 'parrot', 'owl', 'flamingo', 'peacock',
    'swan', 'hawk', 'falcon', 'crane', 'heron', 'macaw', 'cockatoo',
    // Plants
    'rose', 'sunflower', 'tulip', 'cherry_blossom', 'maple_tree', 'oak_tree', 'pine_tree',
  ];
  
  // Try exact match first
  if (assets.includes(lower)) return lower;
  
  // Try without underscores/spaces
  const noSpaces = lower.replace(/[_\s]/g, '');
  for (const asset of assets) {
    if (asset.replace(/[_\s]/g, '') === noSpaces) return asset;
  }
  
  // Try partial match (for multi-word like "cherry blossom")
  for (const asset of assets) {
    const assetWords = asset.split('_');
    const titleWords = lower.split(/[_\s]+/);
    if (assetWords.some(w => titleWords.includes(w)) && assetWords.length === titleWords.length) {
      return asset;
    }
  }
  
  return null;
}

