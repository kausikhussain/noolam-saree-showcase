export type Pattern = "plain" | "check" | "brocade" | "stripe" | "butta";
export type Colors = [string, string, string]; // body, accent (blouse / pallu), zari border

export const inr = (n: number, dec = false) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0 });

/* ---------------- Ticker ---------------- */
export const ticker: [string, string][] = [
  ["THE LOOMS", "Handwoven in Kanchipuram, one saree at a time"],
  ["TRY THE LOOK", "Eight Kanjivaram looks, styled head to toe"],
  ["PURE ZARI", "Silver-core zari woven into every temple border"],
  ["THE RACK", "Browse the full rail of silks"],
  ["BRIDAL", "Heirloom bridal silks for the day that matters"],
];

/* ---------------- Six moods ---------------- */
export const moods: { label: string; colors: Colors; bg: [string, string]; pattern: Pattern }[] = [
  { label: "Wedding Edit", colors: ["#a3263a", "#2f4a3a", "#d9a441"], bg: ["#e9d9c4", "#c9a98a"], pattern: "brocade" },
  { label: "Kanchipuram Icons", colors: ["#c2185b", "#1f6b3a", "#e0b04a"], bg: ["#7d8a6a", "#4f5c45"], pattern: "plain" },
  { label: "Banarasi Heirlooms", colors: ["#5b1d6b", "#c9b52b", "#e3b04b"], bg: ["#3d2a2a", "#1e1414"], pattern: "brocade" },
  { label: "Festive Radiance", colors: ["#e98a1f", "#c45a12", "#f2c14e"], bg: ["#6d7a43", "#2f3a1c"], pattern: "plain" },
  { label: "Zari Signatures", colors: ["#1f5a3a", "#c2185b", "#e7b851"], bg: ["#2a1f18", "#5a3a22"], pattern: "butta" },
  { label: "Bridal Élan", colors: ["#7cb342", "#d32f2f", "#e5b648"], bg: ["#3f5a2a", "#22331a"], pattern: "plain" },
];

/* ---------------- Try the look ---------------- */
export type LookItem = { type: string; name: string; price: number; kind: "saree" | "blouse" | "choker" | "jhumka" | "ottiyanam" | "bangles"; color: string };
export type Look = { name: string; colors: Colors; pattern: Pattern; items: LookItem[] };

const mkLook = (name: string, colors: Colors, pattern: Pattern, saree: string, blouse: string, sp: number, bp: number, accent: string): Look => ({
  name,
  colors,
  pattern,
  items: [
    { type: "SAREE", kind: "saree", name: saree, price: sp, color: colors[0] },
    { type: "BLOUSE", kind: "blouse", name: blouse, price: bp, color: colors[1] },
    { type: "CHOKER", kind: "choker", name: `${accent} Stone Temple Choker`, price: 9400, color: accent === "Pink" ? "#e7849b" : accent === "Green" ? "#2e7d4f" : "#c62828" },
    { type: "JHUMKAS", kind: "jhumka", name: "Jhumkas with Pearl Drops", price: 4600, color: "#f4efe6" },
    { type: "OTTIYANAM", kind: "ottiyanam", name: "Elephant Motif Ottiyanam", price: 15000, color: "#d9a441" },
    { type: "BANGLES", kind: "bangles", name: `Gold and ${accent === "Pink" ? "Dusty Rose" : accent} Bangle Stack`, price: 3800, color: accent === "Pink" ? "#e7849b" : colors[1] },
  ],
});

export const looks: Look[] = [
  mkLook("Rani Pink", ["#d81b60", "#f2b134", "#e0ad44"], "plain", "Rani Pink Kanjivaram with Mango Border", "Mustard Silk Blouse", 28500, 3900, "Green"),
  mkLook("Royal Blue", ["#1e3a9e", "#c2185b", "#e0ad44"], "plain", "Royal Blue Kanjivaram with Rudraksha Border", "Rani Pink Silk Blouse", 30200, 4100, "Pink"),
  mkLook("Teal Lotus", ["#00897b", "#6a1b9a", "#e0ad44"], "plain", "Teal Lotus Kanjivaram", "Plum Silk Blouse", 26800, 3900, "Red"),
  mkLook("Mustard Leaf", ["#c99a1a", "#1b5e20", "#e0ad44"], "brocade", "Mustard Leaf Kanjivaram", "Bottle Green Silk Blouse", 27400, 4000, "Green"),
  mkLook("Violet Peacock", ["#5e2a8a", "#e8b04a", "#d9a441"], "brocade", "Violet Peacock Kanjivaram", "Gold Tissue Blouse", 34500, 4600, "Red"),
  mkLook("Emerald Temple", ["#1b5e20", "#e0952a", "#d9a441"], "plain", "Emerald Temple-Border Kanjivaram", "Marigold Silk Blouse", 31800, 4200, "Red"),
  mkLook("Ivory Elephant", ["#efe3cf", "#d4708a", "#d2a24a"], "butta", "Ivory Kanjivaram with Elephant Border", "Dusty Rose Silk Blouse", 32000, 4200, "Pink"),
  mkLook("Saffron Swan", ["#e2601f", "#0f6b5a", "#d9a441"], "butta", "Saffron Swan Kanjivaram", "Peacock Green Silk Blouse", 29600, 4000, "Green"),
];

/* ---------------- Pick a silk ---------------- */
export const silkCards: { title: string; bg: string; ink: string; price: number; colors: Colors; pattern: Pattern }[] = [
  { title: "Sindoor Korvai", bg: "#f08a1c", ink: "#fff3e0", price: 22500, colors: ["#d84315", "#ffb300", "#f9c74f"], pattern: "plain" },
  { title: "Magenta Shot Silk", bg: "#8e2fb8", ink: "#fbeaff", price: 29800, colors: ["#ad1457", "#4a148c", "#d4a24c"], pattern: "plain" },
  { title: "Palace Check", bg: "#b5192b", ink: "#ffeef0", price: 19900, colors: ["#4b3ca8", "#e7b53b", "#d4a24c"], pattern: "check" },
  { title: "Bengal Garden", bg: "#f0a733", ink: "#3b1d00", price: 24600, colors: ["#efe2c8", "#1b5e20", "#c49a4a"], pattern: "butta" },
  { title: "Kanchi Rani", bg: "#d4174f", ink: "#fff0f4", price: 32400, colors: ["#c2185b", "#1b5e20", "#d9a441"], pattern: "plain" },
  { title: "Benares Gold", bg: "#f5c518", ink: "#3a2000", price: 41800, colors: ["#d8b04a", "#b8892a", "#f3d27a"], pattern: "brocade" },
  { title: "Koorai Check", bg: "#1e9e4a", ink: "#eaffef", price: 18600, colors: ["#c62828", "#283593", "#e0b04a"], pattern: "check" },
  { title: "Mayil Neelam", bg: "#1565c0", ink: "#e8f1ff", price: 27900, colors: ["#00897b", "#6a1b9a", "#e0ad44"], pattern: "butta" },
  { title: "Arakku Mangal", bg: "#7b1022", ink: "#ffe9ec", price: 36200, colors: ["#8e1b2b", "#e0952a", "#e0b04a"], pattern: "brocade" },
];

/* ---------------- The rack ---------------- */
export type RackCat = "silk" | "half" | "full" | "halfsleeve";
export type RackItem = { name: string; price: number; cat: RackCat; tags: ("check" | "zari")[]; colors: Colors; pattern: Pattern };
export const rackFilters: { id: string; label: string; test: (r: RackItem) => boolean }[] = [
  { id: "all", label: "All pieces", test: () => true },
  { id: "silk", label: "Silk Sarees", test: (r) => r.cat === "silk" },
  { id: "half", label: "Half Sarees", test: (r) => r.cat === "half" },
  { id: "full", label: "Full-Sleeve Blouses", test: (r) => r.cat === "full" },
  { id: "halfsleeve", label: "Half-Sleeve Blouses", test: (r) => r.cat === "halfsleeve" },
  { id: "check", label: "Checked Sarees", test: (r) => r.tags.includes("check") },
  { id: "zari", label: "Zari & Brocade", test: (r) => r.tags.includes("zari") },
];
export const rack: RackItem[] = [
  { name: "Noolam Rose Check Kanjivaram", price: 21500, cat: "silk", tags: ["check"], colors: ["#c2185b", "#f2c14e", "#d9a441"], pattern: "check" },
  { name: "Noolam Royal Blue Zari Stripe", price: 27800, cat: "silk", tags: ["zari"], colors: ["#1e3aa8", "#d9a441", "#e3b851"], pattern: "stripe" },
  { name: "Noolam Ivory Butta Kanjivaram", price: 24900, cat: "silk", tags: ["zari"], colors: ["#efe6d6", "#c9a86a", "#d2a24a"], pattern: "butta" },
  { name: "Noolam Madras Check Silk", price: 18900, cat: "silk", tags: ["check"], colors: ["#2f6b5a", "#e0952a", "#d9a441"], pattern: "check" },
  { name: "Noolam Magenta Temple Border", price: 29400, cat: "silk", tags: ["zari"], colors: ["#b0128a", "#6a1b9a", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Temple Gold Brocade", price: 32000, cat: "silk", tags: ["zari"], colors: ["#b59a2c", "#8a7420", "#e3c35a"], pattern: "brocade" },
  { name: "Noolam Lime Stripe Kanjivaram", price: 19800, cat: "silk", tags: ["check"], colors: ["#c8c23a", "#3b5ba8", "#d9a441"], pattern: "check" },
  { name: "Noolam Peacock Check Silk", price: 20600, cat: "silk", tags: ["check"], colors: ["#1b7a5a", "#e2a02c", "#d9a441"], pattern: "check" },
  { name: "Noolam Rani Checks Pattu", price: 22300, cat: "silk", tags: ["check"], colors: ["#d81b60", "#f5f0e6", "#2e7d32"], pattern: "check" },
  { name: "Noolam Mango Half Saree", price: 14800, cat: "half", tags: [], colors: ["#e2442f", "#f2b134", "#1b5e20"], pattern: "plain" },
  { name: "Noolam Parrot Green Half Saree", price: 13900, cat: "half", tags: [], colors: ["#43a047", "#d81b60", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Lotus Pink Half Saree", price: 15200, cat: "half", tags: [], colors: ["#ec407a", "#ffb300", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Sky Pavadai Half Saree", price: 14400, cat: "half", tags: [], colors: ["#42a5f5", "#ff7043", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Maroon Full-Sleeve Blouse", price: 5200, cat: "full", tags: [], colors: ["#8e1b2b", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Bottle Green Full-Sleeve", price: 4900, cat: "full", tags: [], colors: ["#1b5e20", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Navy Zari Full-Sleeve", price: 5600, cat: "full", tags: [], colors: ["#1a237e", "#d9a441", "#e0b04a"], pattern: "butta" },
  { name: "Noolam Gold Tissue Full-Sleeve", price: 6100, cat: "full", tags: [], colors: ["#d4af37", "#b8892a", "#f3d27a"], pattern: "brocade" },
  { name: "Noolam Dusty Rose Blouse", price: 4200, cat: "halfsleeve", tags: [], colors: ["#d4708a", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Marigold Blouse", price: 3900, cat: "halfsleeve", tags: [], colors: ["#f39c12", "#c62828", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Peacock Blue Blouse", price: 4100, cat: "halfsleeve", tags: [], colors: ["#006c80", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Plum Silk Blouse", price: 3800, cat: "halfsleeve", tags: [], colors: ["#6a1b4d", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Rani Pink Blouse", price: 4000, cat: "halfsleeve", tags: [], colors: ["#d81b60", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Emerald Blouse", price: 4300, cat: "halfsleeve", tags: [], colors: ["#0b7a4b", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Saffron Blouse", price: 3700, cat: "halfsleeve", tags: [], colors: ["#ef6c00", "#d9a441", "#e0b04a"], pattern: "plain" },
  { name: "Noolam Red Brocade Blouse", price: 4800, cat: "halfsleeve", tags: [], colors: ["#c62828", "#d9a441", "#e0b04a"], pattern: "butta" },
];

/* ---------------- Muse ---------------- */
export const museLeft: { colors: Colors; bg: [string, string] }[] = [
  { colors: ["#c62828", "#f2b134", "#e0b04a"], bg: ["#5a6b3a", "#2c3a1e"] },
  { colors: ["#ef8a1a", "#c45a12", "#f2c14e"], bg: ["#4c7a3a", "#203a18"] },
  { colors: ["#f2c14e", "#1b5e20", "#e0b04a"], bg: ["#3a2a1a", "#7a4a1a"] },
  { colors: ["#b71c1c", "#e0952a", "#e0b04a"], bg: ["#e9d9c4", "#b89a7a"] },
];
export const museRight: { colors: Colors; bg: [string, string] }[] = [
  { colors: ["#8e1b2b", "#d9a441", "#e0b04a"], bg: ["#6a1b2b", "#2a0a12"] },
  { colors: ["#00acc1", "#4a148c", "#e0b04a"], bg: ["#c9d6c4", "#7a8a6a"] },
  { colors: ["#e53935", "#ffb300", "#e0b04a"], bg: ["#e8c7a0", "#b58a5a"] },
  { colors: ["#2e7d32", "#c2185b", "#e0b04a"], bg: ["#d9cdb8", "#9a8a6a"] },
];

export const reels = [
  { n: "01", dur: "0:16", fabric: "Tissue Kanjivaram", title: "Ponni Kanjivaram", place: "Lamp room, Kanchipuram", colors: ["#b56b8a", "#d9a441", "#e0b04a"] as Colors, bg: ["#3a1810", "#1a0a06"] as [string, string] },
  { n: "02", dur: "0:31", fabric: "Hand-block cotton", title: "Marina Morning", place: "Mylapore to the sea", colors: ["#2a3a6a", "#e0e0e0", "#d9a441"] as Colors, bg: ["#cfdcd8", "#8ba5a0"] as [string, string] },
  { n: "03", dur: "0:17", fabric: "Banarasi Katan", title: "Kaali Banarasi", place: "Studio, Varanasi red", colors: ["#1a1a1a", "#b0b0b0", "#c9c9c9"] as Colors, bg: ["#b5361a", "#5a1208"] as [string, string] },
  { n: "04", dur: "0:15", fabric: "Kanjivaram silk", title: "Pachai Pattu", place: "The bride's chamber", colors: ["#f3e08a", "#7cb342", "#e0b04a"] as Colors, bg: ["#efe3c8", "#c9b48a"] as [string, string] },
  { n: "05", dur: "0:38", fabric: "Georgette silk", title: "Galli Sindoor", place: "Old-city lanes", colors: ["#c62828", "#1a1a1a", "#d9a441"] as Colors, bg: ["#c9c2b4", "#6a6458"] as [string, string] },
];

/* ---------------- Bridal ---------------- */
export const bridal: { name: string; fabric: string; price: number; off?: number; colors: Colors; bg: [string, string]; pattern: Pattern }[] = [
  { name: "Arakku Muhurtham", fabric: "Kanjivaram · Arakku zari pallu", price: 48900, colors: ["#8e1b2b", "#d9a441", "#e0b04a"], bg: ["#c9a98a", "#8a6a4a"], pattern: "brocade" },
  { name: "Kumkum Pattu", fabric: "Pattu · Kumkum border pallu", price: 36500, colors: ["#c0392b", "#d9a441", "#e0b04a"], bg: ["#6a4a2a", "#3a2414"], pattern: "plain" },
  { name: "Rani Mangalam", fabric: "Kanjivaram · Rani pink pallu", price: 41200, off: 10, colors: ["#e53935", "#c2185b", "#e0b04a"], bg: ["#f2d9d0", "#d9a0a0"], pattern: "butta" },
  { name: "Manjal Kalyanam Pattu", fabric: "Pattu · Red-gold pallu", price: 27300, colors: ["#d32f2f", "#f2b134", "#e0b04a"], bg: ["#d9d2b0", "#9aa070"], pattern: "plain" },
  { name: "Pista Sangeet", fabric: "Tissue · Pista-rose pallu", price: 33800, off: 10, colors: ["#9ccc9c", "#8e2f6b", "#e0b04a"], bg: ["#cdbfa8", "#8a7a5a"], pattern: "butta" },
  { name: "Mayil Kanchi", fabric: "Kanjivaram · Peacock pallu", price: 45600, colors: ["#c2185b", "#d9a441", "#e0b04a"], bg: ["#c9c08a", "#8a8040"], pattern: "plain" },
  { name: "Thanjai Bride", fabric: "Pattu · Temple-gold pallu", price: 52400, off: 15, colors: ["#d8b04a", "#8e1b2b", "#f3d27a"], bg: ["#d9b8a0", "#a07a5a"], pattern: "brocade" },
];

/* ---------------- Weave ---------------- */
export const weaveSilks: { name: string; base: string; zari: string; price: number }[] = [
  { name: "Rani Pink", base: "#d81b60", zari: "#f2c14e", price: 21450 },
  { name: "Mayil Blue", base: "#1e3aa8", zari: "#e0b04a", price: 19800 },
  { name: "Temple Ivory", base: "#efe3c8", zari: "#c9973a", price: 15900 },
  { name: "Arakku Red", base: "#a31622", zari: "#e3b851", price: 22560 },
  { name: "Manjal Gold", base: "#e0a82e", zari: "#fff1b8", price: 23400 },
  { name: "Kili Green", base: "#2e9e4a", zari: "#f2c14e", price: 18700 },
  { name: "Mulberry", base: "#7b1f6a", zari: "#e0b04a", price: 20450 },
  { name: "Saffron", base: "#ef6c00", zari: "#ffe08a", price: 17950 },
];
