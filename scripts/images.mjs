// Builds IMAGE-PROMPTS.md (one exact prompt per image slot) and checks which images are missing.
//   npm run image-prompts   -> writes IMAGE-PROMPTS.md
//   npm run check-images    -> lists missing / present images
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { looks, silkCards, bridal, reels, moods } from "../lib/data.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const EXTS = [".png", ".jpg", ".jpeg", ".webp"];
const found = (base) => EXTS.map((e) => base + e).find((f) => existsSync(join(root, "public", f)));

/* ---------- shared style blocks (keep every image in one house style) ---------- */
const PHOTO = "photorealistic, shot on a full-frame camera, 85mm lens, crisp focus, natural skin texture, rich silk sheen, fine gold zari detail, no text, no watermark";
const STUDIO = `pure white seamless studio background, soft diffused key light, gentle floor shadow under the feet, ${PHOTO}`;
const CUTOUT = "TRANSPARENT background (PNG with alpha). If your tool can't do transparency, use a pure white background and remove it afterwards (remove.bg / Photoroom / ChatGPT 'make background transparent')";
const MODEL = (saree, blouse, extra = "") =>
  `Full-length fashion photograph of a young South Indian woman wearing a ${saree}, draped in classic Kanchipuram style with neat front pleats and the pallu over her left shoulder, paired with a ${blouse}, traditional gold temple jewellery (choker, jhumkas, waist belt, bangles), hair in a long braid with jasmine, standing gracefully facing the camera, whole body visible from head to feet.${extra ? " " + extra : ""}`;

const slots = [];
const add = (section, file, size, prompt, cutout = false, optional = false) => slots.push({ section, file, size, prompt: cutout ? `${prompt} ${CUTOUT}.` : prompt, cutout, optional });

/* 1. Hero */
add(
  "1. Hero",
  "/images/hero-showroom",
  "1920×1080 (16:9, landscape)",
  `Wide interior photograph of a grand, luxurious Kanchipuram silk saree showroom: tall carved teak wooden shelves on both walls stacked floor-to-ceiling with folded silk sarees in every colour, a polished marble floor, warm golden recessed ceiling lights and a crystal chandelier, a small shrine with a brass deity at the far end, several silk sarees hanging from the ceiling, and white mannequins draped in maroon-and-gold and green Kanjivaram silk sarees. On the right foreground a white mannequin in a crimson and gold zari Kanjivaram saree. Deep perspective down the centre aisle, the left side slightly darker so white text stays readable. Warm, divine, heritage atmosphere, ${PHOTO}.`
);

/* 2. Six moods */
const moodScenes = [
  "a woman walking through a sunlit heritage courtyard with arches, wearing a red and green zari wedding Kanjivaram saree with an all-over brocade pattern",
  "a woman standing against a muted olive-green wall wearing a rani-pink Kanchipuram silk saree with a wide green and gold border",
  "two women seated together on a carved wooden sofa wearing rich purple and mustard Banarasi brocade sarees, dark moody heritage interior",
  "a smiling woman sitting on the grass in a garden at golden hour wearing a marigold-orange silk saree, trees behind her",
  "a close portrait of a woman in a deep green Kanjivaram saree with magenta border and heavy gold temple jewellery, warm lamp-lit background with brass lamps",
  "a bride in a red silk saree surrounded by bridesmaids in parrot-green silk sarees, joyful candid moment, lush green setting",
];
moods.forEach((m, i) =>
  add("2. Six Moods", `/images/moods/${i + 1}`, "900×1200 (3:4, portrait)", `Editorial lifestyle photograph: ${moodScenes[i]}. Mood: "${m.label}". Subject centred with space above the head (the image is cropped into a temple-arch window), ${PHOTO}.`)
);

/* 3. Try the look — models */
looks.forEach((l, i) => {
  const saree = l.items.find((x) => x.kind === "saree").name;
  const blouse = l.items.find((x) => x.kind === "blouse").name;
  add("3. Try the Look — models", `/images/looks/${i + 1}`, "1024×1536 (2:3, portrait)", `${MODEL(`${saree} silk saree`, blouse.toLowerCase())} Look name: "${l.name}". ${STUDIO}.`, true);
});

/* 3b. Try the look — item thumbnails (deduplicated by product name) */
const itemDesc = {
  saree: (n) => `A neatly folded ${n} silk saree showing its gold zari border and pallu corner`,
  blouse: (n) => `A ${n.toLowerCase()} (short-sleeve saree blouse) laid flat, with gold zari trim on the sleeves`,
  choker: (n) => `A ${n.toLowerCase()}: South Indian gold temple-jewellery choker necklace with coloured stones and a small pendant`,
  jhumka: () => "A pair of gold temple jhumka earrings with small pearl drops",
  ottiyanam: () => "A gold ottiyanam (South Indian bridal waist belt) with an elephant motif centrepiece",
  bangles: (n) => `A stack of bangles: ${n.toLowerCase()}`,
};
const seen = new Set();
looks.forEach((l) =>
  l.items.forEach((it) => {
    const s = slug(it.name);
    if (seen.has(s)) return;
    seen.add(s);
    add("3b. Try the Look — item thumbnails", `/images/look-items/${s}`, "600×600 (1:1, square)", `E-commerce product photo. ${itemDesc[it.kind](it.name)}, centred, on a soft off-white (#F6F1EA) background, top-down / three-quarter view, ${PHOTO}.`);
  })
);

/* 4. Pick a silk */
const cardBg = { "#f08a1c": "orange", "#8e2fb8": "purple", "#b5192b": "red", "#f0a733": "mustard", "#d4174f": "crimson", "#f5c518": "yellow", "#1e9e4a": "green", "#1565c0": "blue", "#7b1022": "maroon" };
const silkSaree = {
  "Sindoor Korvai": "sindoor-orange korvai silk saree with a contrasting mango-yellow border",
  "Magenta Shot Silk": "magenta shot-silk Kanjivaram saree with a purple and gold border",
  "Palace Check": "violet-blue and gold palace-check Kanjivaram silk saree",
  "Bengal Garden": "ivory silk saree with small woven floral garden motifs and a green border",
  "Kanchi Rani": "rani-pink Kanjivaram silk saree with a bottle-green and gold border",
  "Benares Gold": "all-over gold Banarasi brocade silk saree",
  "Koorai Check": "red and navy koorai check silk saree with gold border",
  "Mayil Neelam": "peacock-teal Kanjivaram silk saree with a purple border and peacock buttas",
  "Arakku Mangal": "arakku-maroon Kanjivaram silk saree with a wide gold brocade border",
};
silkCards.forEach((c, i) =>
  add("4. Pick a Silk", `/images/silks/${i + 1}`, "1024×1536 (2:3, portrait)", `${MODEL(silkSaree[c.title] ?? c.title, "matching silk blouse")} She sits on a ${cardBg[c.bg] ?? "coloured"} poster card, so keep the outline clean. ${PHOTO}.`, true)
);

/* 5. The rack — rendered live in 3D (lib/silk), no photos needed */

/* 6. Muse film side columns */
const museL = [
  "a woman in a red and mustard silk saree standing beside an antique wooden side table in a heritage room with a green tiled floor",
  "a woman lounging on the grass under trees wearing a marigold-orange silk saree",
  "two women laughing together in yellow silk sarees in front of marigold garlands",
  "a woman in a crimson silk saree in a sunlit cream-walled room",
];
const museR = [
  "a woman in a maroon silk saree in a softly lit festive room with fairy lights",
  "two friends sitting on a garden bench in teal and purple silk sarees, chatting",
  "a smiling woman in a red silk saree with heavy gold jewellery, hanging brass lamps and flowers behind",
  "a woman in a bottle-green silk saree with pink border on an old verandah",
];
museL.forEach((d, i) => add("6. Muse Film — side columns", `/images/muse/left-${i + 1}`, "800×1000 (4:5, portrait)", `Editorial lifestyle photograph of ${d}, ${PHOTO}.`));
museR.forEach((d, i) => add("6. Muse Film — side columns", `/images/muse/right-${i + 1}`, "800×1000 (4:5, portrait)", `Editorial lifestyle photograph of ${d}, ${PHOTO}.`));

/* 7. Reels posters */
const reelScene = {
  "Ponni Kanjivaram": "a woman in a mauve-pink tissue Kanjivaram saree in a dim lamp room lit by brass oil lamps, Kanchipuram",
  "Marina Morning": "a woman in a navy and white hand-block-printed cotton saree on Marina beach at sunrise, sea breeze in her hair",
  "Kaali Banarasi": "close-up of a woman's hands holding the pallu of a black Banarasi katan saree with silver zari, deep red studio backdrop",
  "Pachai Pattu": "a bride in a pale-gold and green Kanjivaram silk saree in a softly lit bridal chamber, gentle smile",
  "Galli Sindoor": "close portrait of a woman in a red georgette silk saree in an old-city lane, shallow depth of field",
};
reels.forEach((r) => add("7. Muse Reels — posters", `/images/reels/${r.n}`, "1080×1920 (9:16, vertical)", `Vertical cinematic film still: ${reelScene[r.title]}. Reel "${r.title}" (${r.fabric}, ${r.place}). Leave the bottom third calm for caption text, ${PHOTO}.`));

/* 8. Bridal */
const bridalScene = {
  "Arakku Muhurtham": "a bride in an arakku-maroon Kanjivaram saree with a heavy gold brocade pallu in a heritage stone courtyard",
  "Kumkum Pattu": "a bride in a kumkum-red silk pattu saree standing in a warm wooden-pillared hall",
  "Rani Mangalam": "two brides together in red and rani-pink Kanjivaram sarees under a bougainvillea arch, heavy temple jewellery",
  "Manjal Kalyanam Pattu": "a bride in a bright red and turmeric-yellow silk pattu saree with a red-gold pallu, leaning on a tall carved wooden stand in a heritage room with a green-and-cream wall and patterned tiled floor",
  "Pista Sangeet": "two women in pista-green tissue and plum silk sarees in a soft pastel heritage interior",
  "Mayil Kanchi": "a bride in a rani-pink Kanjivaram saree with peacock motifs in front of an olive-gold wall",
  "Thanjai Bride": "a bride in a temple-gold Kanjivaram saree with maroon border seated on a carved swing",
};
bridal.forEach((b, i) =>
  add("8. Bridal", `/images/bridal/${i + 1}`, "900×1240 (portrait, about 3:4)", `Luxury bridal editorial photograph: ${bridalScene[b.name]}. Saree: "${b.name}" (${b.fabric}). Full figure, centred, space above the head (the card has a rounded arch top), ${PHOTO}.`)
);

/* ---------- output ---------- */
if (process.argv.includes("--check")) {
  let miss = 0;
  let curr = "";
  for (const s of slots) {
    if (s.section !== curr) console.log(`\n${(curr = s.section)}`);
    const f = found(s.file);
    if (!f && !s.optional) miss++;
    console.log(`  ${f ? "✓" : s.optional ? "·" : "✗"} ${f ?? s.file + ".(png|jpg|webp)"}`);
  }
  const req = slots.filter((s) => !s.optional).length;
  console.log(`\n${req - miss} / ${req} required images present${miss ? `, ${miss} missing` : " — all done!"}`);
  process.exit(0);
}

const req = slots.filter((s) => !s.optional);
let md = `# NOOLAM — image prompt sheet

Generated by \`npm run image-prompts\` from \`lib/data.ts\`, so names, colours and filenames always match the site.
**${req.length} required images** (+${slots.length - req.length} optional back views).

## How to use
1. Use a strong photoreal generator: **ChatGPT (GPT image)**, **Gemini (Imagen / Nano Banana)**, **Midjourney v7**, or **Flux**.
2. Copy a prompt, generate, and save the result to the **exact path** shown, under \`public/\`.
   Any of \`.png .jpg .jpeg .webp\` works, so \`public/images/moods/1.jpg\` or \`public/images/moods/1.png\` are both fine.
3. Slots marked **✂ cut-out** need a **transparent background**. In ChatGPT, add "transparent background".
   Otherwise remove the background with remove.bg or Photoroom before saving as \`.png\`.
4. Run \`npm run check-images\` at any time to see what's still missing. The site falls back to drawings for missing images.

## Tips for the "dense, realistic" look in the video
- Generate **one look first** and reuse it as a reference image so every model shares the same face, lighting and style.
- Keep the same lighting words for every slot in a section. They're already in the prompts, so don't edit them.
- Use the highest quality setting and pick the variant with the cleanest hands and zari border.
- Pick-a-Silk images must be **cut-outs**, or they will show white boxes on the coloured cards.
- The Rack, the intro curtain and the weave ribbons are **real-time 3D silk** (cloth physics + procedural Kanjivaram weaves), so they need no images.
- Muse film and reels videos (optional): \`public/media/muse-film.mp4\` (16:9) and \`public/media/reels/01.mp4 … 05.mp4\` (9:16).
  Make them with an image-to-video tool (Veo, Kling, Runway) from the reel poster images below. Slow camera push-in, fabric moving in the breeze, 8–15 s.

---
`;
let curr = "";
for (const s of slots) {
  if (s.section !== curr) md += `\n## ${(curr = s.section)}\n`;
  md += `\n**\`public${s.file}.png|jpg\`** · ${s.size}${s.cutout ? " · ✂ cut-out" : ""}${s.optional ? " · optional" : ""}\n\n\`\`\`text\n${s.prompt}\n\`\`\`\n`;
}
writeFileSync(join(root, "IMAGE-PROMPTS.md"), md);
console.log(`IMAGE-PROMPTS.md written: ${req.length} required + ${slots.length - req.length} optional slots`);
