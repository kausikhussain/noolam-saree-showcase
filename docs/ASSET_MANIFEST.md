# NOOLAM · Master Visual Asset Manifest & Creative Production Pipeline
**Document Version:** 1.0.0  
**Creative Direction:** Heritage Luxury Kanchipuram Silk Showroom & Contemporary Editorial  
**Total Catalogued Asset Slots:** 68 slots  

---

## 1. Important Product Authenticity & Creative Rules

> [!IMPORTANT]
> **The NOOLAM Authenticity Mandate:**
> 1. **Conceptual vs. Purchasable Distinction:** AI-generated imagery is strictly reserved for atmospheric brand campaigns, editorial mood storytelling ("Six Moods", "The Muse Film", and "The Muse Reels"), and showroom perspective visuals.
> 2. **SKU & Physical Product Integrity:** When a customer purchases a specific saree (e.g., *Mayilkan Violet with Korvai Border*), the product card and listing MUST represent the actual physical handloom piece. Never invent zari patterns, gold/silver composition, thread counts, or Silk Mark numbers.
> 3. **Procedural SVG Stand-ins:** If an AI asset or photoshoot asset is not yet available in `public/images/`, the system renders dynamic procedural SVG artwork in the exact palette and weave pattern of that saree. Broken image icons and empty layout shifts are strictly prevented.

---

## 2. Visual Production Manifest

| Slot Index | Section Name | Target File Path | Target Dimensions & Aspect | Generation Method / Tool | Purpose & Placement | Optimization Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **01** | **Hero Showroom** | `/images/hero-showroom.jpg` | 1920×1080 (16:9 Landscape) | Flux.1 Pro / Midjourney v6 | Full-viewport showroom perspective with carved teak shelves and warm ambient lighting | Staged / Fallback Active |
| **02–07** | **Six Moods** | `/images/moods/1.jpg` – `6.jpg` | 900×1200 (3:4 Portrait) | Flux.1 Pro / Editorial Photography | Six lifestyle campaign portraits framed inside golden gopuram temple arches | Staged / Fallback Active |
| **08–15** | **Try the Look Models** | `/images/looks/1.png` – `8.png` | 1024×1536 (2:3 Portrait) | Studio Photography / Transparent PNG | Full-length styled South Indian models with alpha transparency for drag carousel | Staged / Fallback Active |
| **16–39** | **Look Item Thumbnails** | `/images/look-items/*.png` | 600×600 (1:1 Square) | Flat-lay Studio Macro / Clean BG | Flat-lay product cutouts of matching blouses, chokers, jhumkas, ottiyanams, bangles | Staged / Fallback Active |
| **40–48** | **Pick a Silk Models** | `/images/silks/1.png` – `9.png` | 1024×1536 (2:3 Portrait) | Transparent Studio Cutout | Silhouetted models positioned in front of high-impact Anton typography cards | Staged / Fallback Active |
| **49–56** | **Muse Film Columns** | `/images/muse/left-*.jpg`, `right-*.jpg` | 600×900 (2:3 Portrait) | Editorial Campaign Stills | Ambient bidirectional vertical photo stream framing the central brand film | Staged / Fallback Active |
| **57–61** | **Muse Reels Posters** | `/images/reels/01.jpg` – `05.jpg` | 1080×1920 (9:16 Vertical) | High-Definition Video Frame Stills | Video thumbnail posters for the 3D curved arc carousel | Staged / Fallback Active |
| **62–68** | **Bridal Collection** | `/images/bridal/1.jpg` – `7.jpg` | 900×1400 (9:14 Portrait) | Bridal Studio Photography | Heirloom bridal Kanjivaram portraits with gold temple borders | Staged / Fallback Active |

---

## 3. Video Asset Manifest

| Asset ID | Target Path | Resolution & Aspect | Codec / Format | Purpose | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **VID-01** | `/media/muse-film.mp4` | 1920×1080 (16:9) | H.264 / AAC (Web-Optimized) | 30-second cinematic brand film "Feel the drape" with audio toggle | Procedural Fallback |
| **VID-02–06** | `/media/reels/01.mp4` – `05.mp4` | 1080×1920 (9:16) | H.264 / FastStart | Five vertical mobile reels showcasing silk drape in motion | Procedural Fallback |

---

## 4. Asset Ingestion Instructions

1. Generate or export high-resolution assets according to the exact dimensions specified above.
2. Run the audit script to check missing vs present files:
   ```powershell
   npm run check-images
   ```
3. Drop finished imagery into the respective folders within `public/images/` and `public/media/`.
4. Next.js automatically binds the real imagery immediately without requiring any code modifications.

