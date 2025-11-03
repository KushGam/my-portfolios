# How to Use Real SVG Images Instead of Placeholders

## Current Status
The app currently shows a **filled shape animation** created from the dots when puzzles are completed. To show **real SVG artwork images**, follow these steps:

## Step 1: Replace Placeholder SVG Files

1. **Find the placeholder SVG files**:
   - Location: `assets/packs/{pack}/{id}/outline.svg`
   - Example: `assets/packs/animals/dolphin/outline.svg`

2. **Replace with real SVG artwork**:
   - Get or create SVG files for each puzzle
   - Replace the placeholder files with your real artwork
   - Keep the same filename: `outline.svg`
   - Keep the same folder structure

## Step 2: SVG File Requirements

Your SVG files should:
- ✅ Be valid SVG format
- ✅ Use a `viewBox` (e.g., `viewBox="0 0 320 280"`)
- ✅ Contain `<path>` elements (the app extracts path data)
- ✅ Be kid-friendly, simple, recognizable shapes
- ✅ Work well at different sizes (will be scaled)

**Example SVG structure:**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280">
  <path d="M..." fill="none" stroke="#000" stroke-width="4"/>
</svg>
```

## Step 3: How It Works

The app:
1. Maps puzzle IDs (like `easy_1`) to asset IDs (like `dolphin`)
2. Loads the SVG file from `assets/packs/animals/dolphin/outline.svg`
3. Extracts the path data from the SVG
4. Renders it on top of the connected dots when puzzle completes
5. Shows sparkles and animations around the real image

## Step 4: Mapping Puzzles to Assets

The mapping is in `src/engine/puzzleToAssetMap.ts`:
- `easy_1` → `dolphin`
- `med_5` → `tiger`
- etc.

If a puzzle isn't mapped, the app falls back to the filled shape from dots.

## Step 5: Testing

After replacing SVG files:
1. **Rebuild the app** (since assets are bundled at build time):
   ```bash
   npx expo run:android  # or run:ios
   ```

2. **Complete a puzzle** to see if the real SVG appears

3. **If SVG doesn't appear**: Check:
   - File exists at correct path
   - SVG is valid format
   - Mapping exists in `puzzleToAssetMap.ts`

## Current Behavior

- **With placeholder SVG**: Shows filled shape from dots (works now)
- **With real SVG**: Will show the actual artwork image (after you replace files)

## No Code Changes Needed!

Once you replace the placeholder SVG files with real artwork and rebuild, the app will automatically use them! 🎨

