import * as THREE from "three";
import type { Pattern } from "@/lib/data";

/* Procedural Kanjivaram silk: body weave, motifs, temple-tooth zari borders.
   Paints three canvases in lock-step:
   - colour  (sRGB albedo)
   - orm     (G = roughness, B = metalness) so the zari reads as real metallic thread
   - bump    (raised zari + fine weave) for light-catching texture            */

export type SilkShape = "saree" | "blouse-full" | "blouse-half" | "halfsaree" | "curtain" | "ribbon";
export type SilkSpec = { base: string; accent: string; zari: string; pattern: Pattern; shape: SilkShape };
type Mode = "color" | "orm" | "bump";
type Ctx = CanvasRenderingContext2D;

const ORM_SILK = "rgb(0,118,0)";
const ORM_ZARI = "rgb(0,64,235)";
const BUMP_SILK = "#6e6e6e";
const BUMP_ZARI = "#c8c8c8";

const hex = (h: string) => {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
export const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

class Painter {
  constructor(public ctx: Ctx, public mode: Mode, public s: SilkSpec, public W: number, public H: number) {}
  silk(color: string) {
    return this.mode === "color" ? color : this.mode === "orm" ? ORM_SILK : BUMP_SILK;
  }
  rect(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = this.silk(color);
    this.ctx.fillRect(x, y, w, h);
  }
  /* metallic gold band with thread hatching */
  zari(x: number, y: number, w: number, h: number, vertical = false) {
    const c = this.ctx;
    if (this.mode !== "color") {
      c.fillStyle = this.mode === "orm" ? ORM_ZARI : BUMP_ZARI;
      c.fillRect(x, y, w, h);
      if (this.mode === "bump") this.hatch(x, y, w, h, "rgba(255,255,255,.35)", vertical);
      return;
    }
    const z = this.s.zari;
    const g = vertical ? c.createLinearGradient(x, y, x + w, y) : c.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, mix(z, "#fff6d0", 0.35));
    g.addColorStop(0.45, z);
    g.addColorStop(0.55, mix(z, "#fff2c0", 0.2));
    g.addColorStop(1, mix(z, "#5a3a0a", 0.3));
    c.fillStyle = g;
    c.fillRect(x, y, w, h);
    this.hatch(x, y, w, h, "rgba(255,240,190,.22)", vertical);
  }
  hatch(x: number, y: number, w: number, h: number, stroke: string, vertical: boolean) {
    const c = this.ctx;
    c.save();
    c.beginPath();
    c.rect(x, y, w, h);
    c.clip();
    c.strokeStyle = stroke;
    c.lineWidth = 1;
    c.beginPath();
    if (vertical) for (let i = y; i < y + h; i += 3) (c.moveTo(x, i), c.lineTo(x + w, i + 2));
    else for (let i = x; i < x + w; i += 3) (c.moveTo(i, y), c.lineTo(i + 2, y + h));
    c.stroke();
    c.restore();
  }
  zariShape(path: () => void) {
    const c = this.ctx;
    c.fillStyle = this.mode === "color" ? mix(this.s.zari, "#fff0b0", 0.15) : this.mode === "orm" ? ORM_ZARI : BUMP_ZARI;
    c.beginPath();
    path();
    c.fill();
  }
  /* small mango / paisley butta */
  mango(x: number, y: number, r: number) {
    this.zariShape(() => {
      const c = this.ctx;
      c.moveTo(x, y - r);
      c.bezierCurveTo(x + r * 1.1, y - r * 0.6, x + r * 0.9, y + r, x, y + r);
      c.bezierCurveTo(x - r * 0.9, y + r, x - r * 0.7, y, x - r * 0.1, y - r * 0.2);
      c.quadraticCurveTo(x + r * 0.2, y - r * 0.6, x, y - r);
    });
  }
  flower(x: number, y: number, r: number) {
    this.zariShape(() => {
      const c = this.ctx;
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2;
        c.moveTo(x, y);
        c.ellipse(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55, r * 0.5, r * 0.25, a, 0, Math.PI * 2);
      }
    });
  }
  /* body: shot-silk colour + pattern */
  body(x0: number, y0: number, w: number, h: number) {
    const { base, accent, pattern } = this.s;
    const c = this.ctx;
    if (this.mode === "color") {
      const g = c.createLinearGradient(x0, y0, x0 + w, y0 + h);
      g.addColorStop(0, mix(base, accent, 0.1));
      g.addColorStop(0.5, base);
      g.addColorStop(1, mix(base, "#000000", 0.12));
      c.fillStyle = g;
      c.fillRect(x0, y0, w, h);
    } else this.rect(x0, y0, w, h, base);

    c.save();
    c.beginPath();
    c.rect(x0, y0, w, h);
    c.clip();
    const S = Math.max(w, h) / (this.s.shape === "curtain" ? 9 : 15);
    if (pattern === "check") {
      for (let x = x0; x < x0 + w; x += S) {
        this.rect(x, y0, S * 0.32, h, accent);
        this.zari(x + S * 0.6, y0, S * 0.06, h, true);
      }
      c.globalAlpha = this.mode === "color" ? 0.7 : 1;
      for (let y = y0; y < y0 + h; y += S) {
        this.rect(x0, y, w, S * 0.32, accent);
        this.zari(x0, y + S * 0.6, w, S * 0.06);
      }
      c.globalAlpha = 1;
    } else if (pattern === "stripe") {
      for (let x = x0; x < x0 + w; x += S * 0.8) {
        this.rect(x + S * 0.4, y0, S * 0.18, h, mix(base, accent, 0.5));
        this.zari(x, y0, S * 0.08, h, true);
      }
    } else if (pattern === "butta") {
      const g = S * 0.75;
      for (let y = y0 + g / 2, row = 0; y < y0 + h; y += g, row++)
        for (let x = x0 + (row % 2 ? g / 2 : 0); x < x0 + w + g; x += g) this.mango(x, y, g * 0.16);
    } else if (pattern === "brocade") {
      const g = S * 0.6;
      c.lineWidth = Math.max(1.5, g * 0.05);
      c.strokeStyle = this.mode === "color" ? mix(this.s.zari, base, 0.25) : this.mode === "orm" ? ORM_ZARI : BUMP_ZARI;
      c.beginPath();
      for (let k = -h; k < w + h; k += g) {
        c.moveTo(x0 + k, y0);
        c.lineTo(x0 + k + h, y0 + h);
        c.moveTo(x0 + k, y0);
        c.lineTo(x0 + k - h, y0 + h);
      }
      c.stroke();
      for (let y = y0, row = 0; y < y0 + h + g; y += g / 2, row++)
        for (let x = x0 + (row % 2 ? g / 2 : 0); x < x0 + w + g; x += g) this.flower(x, y, g * 0.22);
    }
    c.restore();
    this.weave(x0, y0, w, h);
  }
  /* fine warp/weft lines — gives the silk its woven texture under raking light */
  weave(x0: number, y0: number, w: number, h: number) {
    const c = this.ctx;
    if (this.mode === "orm") return;
    c.save();
    c.globalAlpha = this.mode === "bump" ? 0.5 : 0.06;
    c.fillStyle = "#fff";
    for (let y = y0; y < y0 + h; y += 2) c.fillRect(x0, y, w, 1);
    c.globalAlpha = this.mode === "bump" ? 0.3 : 0.04;
    c.fillStyle = "#000";
    for (let x = x0; x < x0 + w; x += 3) c.fillRect(x, y0, 1, h);
    c.restore();
  }
  /* wide temple border: zari band, contrast pinstripes, gopuram teeth pointing into the body */
  templeBorder(y: number, h: number, up = true) {
    const { W } = this;
    const { accent, base } = this.s;
    this.zari(0, y, W, h);
    this.rect(0, y + h * 0.18, W, Math.max(2, h * 0.05), accent);
    this.rect(0, y + h * 0.78, W, Math.max(2, h * 0.04), mix(base, "#000000", 0.2));
    const tw = W / 18, th = h * 0.32;
    this.zariShape(() => {
      const c = this.ctx;
      for (let x = 0; x < W; x += tw) {
        const yb = up ? y : y + h;
        c.moveTo(x, yb);
        c.lineTo(x + tw / 2, up ? yb - th : yb + th);
        c.lineTo(x + tw, yb);
      }
    });
    for (let x = tw / 2; x < W; x += tw) this.flower(x, y + h * 0.5, h * 0.12);
  }
}

function paint(ctx: Ctx, mode: Mode, s: SilkSpec, W: number, H: number) {
  const p = new Painter(ctx, mode, s, W, H);
  ctx.clearRect(0, 0, W, H);
  switch (s.shape) {
    case "saree": {
      p.body(0, 0, W, H);
      // folded edge over the hanger bar
      p.rect(0, 0, W, H * 0.06, mix(s.base, "#000000", 0.18));
      p.zari(0, H * 0.06, W, H * 0.012);
      // pallu-side border
      p.zari(W * 0.86, 0, W * 0.14, H, true);
      p.rect(W * 0.885, 0, W * 0.012, H, s.accent);
      p.rect(W * 0.965, 0, W * 0.01, H, s.accent);
      // temple border at the hem
      p.templeBorder(H * 0.8, H * 0.2);
      break;
    }
    case "halfsaree": {
      p.body(0, 0, W, H);
      p.templeBorder(H * 0.84, H * 0.16);
      // dupatta draped over the top
      const d = new Painter(ctx, mode, { ...s, base: s.accent, accent: s.base, pattern: "butta" }, W, H);
      d.body(0, 0, W, H * 0.3);
      d.zari(0, H * 0.3, W, H * 0.03);
      break;
    }
    case "blouse-full":
    case "blouse-half": {
      p.body(0, 0, W, H);
      p.zari(0, H * 0.56, W, H * 0.05);
      const sy = s.shape === "blouse-full" ? H * 0.78 : H * 0.3;
      p.zari(0, sy, W * 0.24, H * 0.04);
      p.zari(W * 0.76, sy, W * 0.24, H * 0.04);
      p.zari(W * 0.34, 0, W * 0.32, H * 0.03);
      break;
    }
    case "curtain": {
      p.body(0, 0, W, H);
      const g = W / 8;
      for (let y = g * 0.8, row = 0; y < H; y += g * 0.8, row++)
        for (let x = (row % 2) * (g / 2) + g / 4; x < W + g; x += g) row % 3 === 2 ? p.flower(x, y, g * 0.2) : p.mango(x, y, g * 0.22);
      p.templeBorder(0, H * 0.09, false);
      p.zari(W * 0.9, 0, W * 0.1, H, true);
      break;
    }
    case "ribbon": {
      p.body(0, 0, W, H);
      p.zari(0, 0, W, H * 0.12);
      p.zari(0, H * 0.88, W, H * 0.12);
      break;
    }
  }
}

/* alpha silhouettes for garments that aren't rectangles (white = cloth) */
function silhouette(ctx: Ctx, shape: SilkShape, W: number, H: number) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  if (shape === "blouse-full" || shape === "blouse-half") {
    const full = shape === "blouse-full";
    ctx.moveTo(W * 0.24, 0);
    ctx.lineTo(W * 0.76, 0);
    ctx.lineTo(full ? W * 1.0 : W * 1.0, full ? H * 0.82 : H * 0.34);
    ctx.lineTo(full ? W * 0.82 : W * 0.8, full ? H * 0.84 : H * 0.4);
    ctx.lineTo(W * 0.76, H * 0.3);
    ctx.lineTo(W * 0.78, H * 0.62);
    ctx.quadraticCurveTo(W * 0.5, H * 0.66, W * 0.22, H * 0.62);
    ctx.lineTo(W * 0.24, H * 0.3);
    ctx.lineTo(full ? W * 0.18 : W * 0.2, full ? H * 0.84 : H * 0.4);
    ctx.lineTo(0, full ? H * 0.82 : H * 0.34);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(W * 0.5, 0, W * 0.15, H * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "halfsaree") {
    ctx.moveTo(W * 0.22, H * 0.2);
    ctx.lineTo(W * 0.78, H * 0.2);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(0, 0, W, H * 0.33);
  } else ctx.fillRect(0, 0, W, H);
}

const canvasOf = (W: number, H: number) => {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  return c;
};

export type SilkTextures = { map: THREE.CanvasTexture; orm: THREE.CanvasTexture; bump: THREE.CanvasTexture; alpha?: THREE.CanvasTexture; dispose: () => void };

export function silkTextures(spec: SilkSpec, W = 384, H = 576): SilkTextures {
  const make = (mode: Mode) => {
    const c = canvasOf(W, H);
    paint(c.getContext("2d")!, mode, spec, W, H);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    if (mode === "color") t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const map = make("color"), orm = make("orm"), bump = make("bump");
  let alpha: THREE.CanvasTexture | undefined;
  if (spec.shape === "blouse-full" || spec.shape === "blouse-half" || spec.shape === "halfsaree") {
    const c = canvasOf(W, H);
    silhouette(c.getContext("2d")!, spec.shape, W, H);
    alpha = new THREE.CanvasTexture(c);
  }
  return { map, orm, bump, alpha, dispose: () => [map, orm, bump, alpha].forEach((t) => t?.dispose()) };
}

/* repaint an existing texture set in place (used when the user picks a new silk) */
export function repaintSilk(t: SilkTextures, spec: SilkSpec) {
  const W = (t.map.image as HTMLCanvasElement).width, H = (t.map.image as HTMLCanvasElement).height;
  paint((t.map.image as HTMLCanvasElement).getContext("2d")!, "color", spec, W, H);
  paint((t.orm.image as HTMLCanvasElement).getContext("2d")!, "orm", spec, W, H);
  paint((t.bump.image as HTMLCanvasElement).getContext("2d")!, "bump", spec, W, H);
  t.map.needsUpdate = t.orm.needsUpdate = t.bump.needsUpdate = true;
}

export function silkMaterial(t: SilkTextures, spec: SilkSpec, sheenMix = spec.shape === "curtain" ? 0.18 : 0.4) {
  const m = new THREE.MeshPhysicalMaterial({
    map: t.map,
    roughnessMap: t.orm,
    metalnessMap: t.orm,
    roughness: 1,
    metalness: 1,
    bumpMap: t.bump,
    bumpScale: 1.4,
    ...(t.alpha ? { alphaMap: t.alpha, alphaTest: 0.5 } : {}),
    side: THREE.DoubleSide,
    sheen: 1,
    sheenRoughness: 0.32,
    sheenColor: new THREE.Color(mix(spec.base, "#ffffff", sheenMix)),
    envMapIntensity: 1.1,
  });
  return m;
}
