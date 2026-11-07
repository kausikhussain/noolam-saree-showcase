# NOOLAM — Rebuild Plan

Sources analysed
- `../WhatsApp Video 2026-11-08 at 12.57.21 AM.mp4` (46 s screen recording, frames extracted at 1 fps)
- `../noolam-saree-showcase/` (reference repo: PROMPTS.md, HOW-WE-MADE.md, 10 screenshots — **no source code**)

## How the original was built (reconstructed)
Next.js (App Router) single page, built section-by-section with Claude Code from one prompt per
section. AI-generated studio images for products/rack, stock photos for lifestyle, short MP4s for
the film/reels. House style: Inter bold headlines, maroon→gold gradient on the second half of each
headline, pure-white sections, maroon pill buttons with a white circular arrow, a fixed maroon
ticker with gold caps along the bottom of the viewport.

## Page order (as seen in the video)
| # | Section | id | Key interaction |
|---|---------|----|-----------------|
| 0 | Silk-curtain intro (video only) | — | red/gold paisley curtain parts on load |
| 1 | Hero "Woven for the Divine." | home | glass pill nav, showroom bg, 2 CTAs |
| – | Gold ticker (fixed bottom) | — | infinite marquee |
| 2 | Six Moods. Timeless Drapes | — | gopuram arch windows, lift+glow on hover |
| 3 | Try the Look. | look | drag/wheel carousel, centre sharp, sides blur; "In this look" panel, bundle −10% |
| 4 | Pick a Silk | silk | fanned arc of colour cards, tilt-to-cursor, press, + to bag |
| 5 | Every silk, on the rail. | rack | chrome rod + hangers, filter chips w/ counts, hover lift + caption |
| 6 | Rack detail | rack | hanger lifts to centre, rail blurs, Front/Back, sizes 34–42, arrows, Close × |
| 7 | The Muse Film "Feel the drape" | muse | 16:9 film in gold bracket frame, sound pill, opposite-scrolling photo columns |
| 8 | The Muse Reels "Silk, in motion." | — | 3D curved arc of reel cards, autoplay progress, prev/pause/next, full-screen viewer |
| 9 | The Bridal Collection | bridal | arch-top cards on a curve, centre gold border, discount tags |
| 10 | Three silks, one weave. (video only) | weave | three.js ribbons flowing → braid on scroll; pick silks to braid, live price |
| 11 | Footer "Woven with heritage. Draped for today." (video only) | — | maroon footer, NOOLAM wordmark |

## Tech
- Next.js 15 + React 19 + TypeScript, plain CSS (`app/globals.css`), `three` for the weave.
- Fonts via `next/font/google`: Inter (UI), Anton (Pick-a-Silk card titles), Cormorant Garamond (wordmark).
- Global bag store (React context) — every "+" / "Add to bag" increments the nav bag + toast.

## Images & video
The original images/videos are not in the repo. Every image slot uses `<Photo src=… art=…>`:
it loads `public/images/...` if the file exists, otherwise renders a procedural SVG (saree drapes,
models, hangers, jewellery) in the correct colours. Drop real files at the paths listed in
`README.md` and the site matches the original pixel-for-pixel in layout.

## exFAT note
The SSD is exFAT (no symlinks): install with `npm install --no-bin-links`; scripts call
`node node_modules/next/dist/bin/next` directly.
