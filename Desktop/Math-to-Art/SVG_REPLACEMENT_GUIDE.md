# 📋 Complete Guide: Replacing Placeholder SVG Files

## 🎯 What You Need to Do

Replace placeholder SVG files with **real artwork** images. The app currently shows a filled shape from dots, but with real SVGs, it will show your actual artwork!

---

## 📁 Step 1: Find the Files Location

All placeholder SVG files are located in:
```
/Users/kushal/Desktop/Math-to-Art/assets/packs/
```

### Folder Structure:
```
assets/packs/
├── animals/          (23 animals)
│   ├── dolphin/
│   │   └── outline.svg    ← REPLACE THIS
│   ├── lion/
│   │   └── outline.svg    ← REPLACE THIS
│   ├── tiger/
│   │   └── outline.svg    ← REPLACE THIS
│   └── ... (20 more)
│
├── birds/            (23 birds)
│   ├── eagle/
│   │   └── outline.svg    ← REPLACE THIS
│   ├── parrot/
│   │   └── outline.svg    ← REPLACE THIS
│   └── ... (21 more)
│
├── vehicles/         (23 vehicles)
│   ├── car/
│   │   └── outline.svg   ← REPLACE THIS
│   ├── bus/
│   │   └── outline.svg   ← REPLACE THIS
│   └── ... (21 more)
│
└── plants/          (23 plants)
    ├── rose/
    │   └── outline.svg    ← REPLACE THIS
    └── ... (22 more)
```

**Total: ~92 SVG files to replace**

---

## 📍 Step 2: Exact File Paths (First 20 Examples)

Here are the exact paths where you need to replace files:

### Animals (Animals Pack):
1. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/dolphin/outline.svg`
2. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/lion/outline.svg`
3. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/tiger/outline.svg`
4. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/elephant/outline.svg`
5. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/giraffe/outline.svg`
6. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/zebra/outline.svg`
7. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/panda/outline.svg`
8. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/koala/outline.svg`
9. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/kangaroo/outline.svg`
10. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/hippo/outline.svg`
11. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/rhino/outline.svg`
12. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/bear/outline.svg`
13. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/fox/outline.svg`
14. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/wolf/outline.svg`
15. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/deer/outline.svg`
16. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/monkey/outline.svg`
17. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/camel/outline.svg`
18. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/crocodile/outline.svg`
19. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/turtle/outline.svg`
20. `/Users/kushal/Desktop/Math-to-Art/assets/packs/animals/penguin/outline.svg`
... (and 3 more: seal, otter, zebra)

### Vehicles (Vehicles Pack):
1. `/Users/kushal/Desktop/Math-to-Art/assets/packs/vehicles/car/outline.svg`
2. `/Users/kushal/Desktop/Math-to-Art/assets/packs/vehicles/bus/outline.svg`
3. `/Users/kushal/Desktop/Math-to-Art/assets/packs/vehicles/truck/outline.svg`
4. `/Users/kushal/Desktop/Math-to-Art/assets/packs/vehicles/motorcycle/outline.svg`
5. `/Users/kushal/Desktop/Math-to-Art/assets/packs/vehicles/bicycle/outline.svg`
... (18 more vehicles)

### Birds (Birds Pack):
1. `/Users/kushal/Desktop/Math-to-Art/assets/packs/birds/eagle/outline.svg`
2. `/Users/kushal/Desktop/Math-to-Art/assets/packs/birds/parrot/outline.svg`
... (21 more birds)

### Plants (Plants Pack):
1. `/Users/kushal/Desktop/Math-to-Art/assets/packs/plants/rose/outline.svg`
2. `/Users/kushal/Desktop/Math-to-Art/assets/packs/plants/sunflower/outline.svg`
... (21 more plants)

---

## ✏️ Step 3: How to Replace a File

### Option A: Using Finder (Mac)
1. Open **Finder**
2. Navigate to: `Desktop → Math-to-Art → assets → packs`
3. Go into the specific folder (e.g., `animals → dolphin`)
4. **Right-click** `outline.svg`
5. Select **"Get Info"** to see current file
6. **Replace** the file with your new SVG artwork
7. **Keep the same filename**: `outline.svg`

### Option B: Using Code Editor
1. Open VS Code or your editor
2. Navigate to the file: `assets/packs/animals/dolphin/outline.svg`
3. **Delete all content**
4. **Paste your new SVG code**
5. **Save the file**

---

## 📝 Step 4: SVG File Format Requirements

Your replacement SVG **MUST** follow this format:

### ✅ Required Structure:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280">
  <!-- Your artwork paths here -->
  <path d="M..." fill="none" stroke="#000000" stroke-width="4"/>
  <!-- More paths as needed -->
</svg>
```

### ✅ Required Elements:
1. **`xmlns` attribute**: Must include `xmlns="http://www.w3.org/2000/svg"`
2. **`viewBox` attribute**: Use `viewBox="0 0 320 280"` (same as placeholders)
3. **`<path>` elements**: Use path elements for your artwork
4. **File extension**: Must be `.svg`

### ✅ Example - Good SVG:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280">
  <!-- Dolphin outline -->
  <path d="M80,140 Q100,100 140,100 Q180,100 200,140 Q200,180 160,200 Q120,200 80,180 Z" 
        fill="none" 
        stroke="#1E88E5" 
        stroke-width="6"
        stroke-linecap="round"/>
  <!-- Dolphin fin -->
  <path d="M140,140 L130,120 L150,120 Z" 
        fill="#1E88E5" 
        stroke="#1565C0" 
        stroke-width="2"/>
</svg>
```

### ❌ Avoid:
- Complex gradients (keep it simple)
- Embedded images (`<image>` tags)
- Text elements (fonts may not load)
- Very detailed/complex paths (keep kid-friendly)

---

## 🎨 Step 5: Where to Get SVG Artwork

You can:

1. **Create your own** using:
   - Adobe Illustrator
   - Inkscape (free)
   - Figma (export as SVG)
   - Any SVG editor

2. **Download free SVGs** from:
   - [Flaticon](https://www.flaticon.com/) - Search "outline" or "line art"
   - [Freepik](https://www.freepik.com/) - SVG format
   - [Vecteezy](https://www.vecteezy.com/)
   - [The Noun Project](https://thenounproject.com/)

3. **Convert images** using:
   - Online SVG converters
   - Image trace in Illustrator

---

## 🔍 Step 6: Check Current Placeholder (Example)

Here's what the **current placeholder** looks like:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9FAFB" stop-opacity="1"/>
      <stop offset="100%" stop-color="#E5E7EB" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="24" fill="url(#grad)"/>
  <path d="M160,40 C180,30..." fill="none" stroke="#D1D5DB" stroke-width="8"/>
  <text x="50%" y="92%" text-anchor="middle" font-size="20">Dolphin</text>
</svg>
```

**Replace this entire file** with your real artwork SVG!

---

## 🚀 Step 7: After Replacing Files

1. **Save all files**
2. **Stop the running app** (if it's running)
3. **Rebuild the app**:
   ```bash
   npx expo run:android
   ```
4. **Test**: Complete a puzzle to see your artwork!

---

## 📊 Quick Checklist

- [ ] Located `assets/packs/` folder
- [ ] Opened a specific folder (e.g., `animals/dolphin/`)
- [ ] Found `outline.svg` file
- [ ] Created/prepared your SVG artwork
- [ ] SVG has `viewBox="0 0 320 280"`
- [ ] SVG uses `<path>` elements
- [ ] Replaced the placeholder file
- [ ] Kept filename as `outline.svg`
- [ ] Rebuilt the app
- [ ] Tested by completing a puzzle

---

## 💡 Pro Tips

1. **Start with one file** - Replace just the dolphin SVG first to test
2. **Keep it simple** - Simple outlines work best for kids
3. **Test frequently** - Replace a few files, rebuild, test
4. **Match the viewBox** - Keep `viewBox="0 0 320 280"` for consistency
5. **Use black strokes** - Easier to see against colored backgrounds

---

## 🆘 Need Help?

If SVGs don't appear:
1. Check file is saved correctly
2. Check SVG format is valid (open in browser)
3. Rebuild app completely
4. Check console for errors
5. Verify file path matches exactly

---

## 📌 Summary

**What:** Replace placeholder SVG files with real artwork  
**Where:** `assets/packs/{pack}/{id}/outline.svg`  
**How:** Delete placeholder, add your SVG, keep same filename  
**Format:** SVG with `viewBox="0 0 320 280"` and path elements  
**After:** Rebuild app to see changes

