import * as THREE from "three";
import { Cloth } from "./cloth";
import { silkMaterial, silkTextures, type SilkShape, type SilkSpec, type SilkTextures } from "./texture";
import type { Colors, Pattern } from "@/lib/data";

/* A garment hanging on a wooden hanger. Local origin = top of the hook (where it meets the rod). */

const BAR_Y = -0.17;
const BAR_HALF = 0.43;
export const barY = (x: number) => BAR_Y - 0.1 * (x / BAR_HALF) ** 2;

let shared: { bar: THREE.TubeGeometry; hook: THREE.TubeGeometry; wood: THREE.MeshStandardMaterial; chrome: THREE.MeshStandardMaterial } | null = null;
const hangerParts = () => {
  if (shared) return shared;
  const barCurve = new THREE.CatmullRomCurve3([-1, -0.5, 0, 0.5, 1].map((t) => new THREE.Vector3(t * BAR_HALF, barY(t * BAR_HALF), 0)));
  const hookCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, BAR_Y, 0),
    new THREE.Vector3(0, -0.09, 0),
    new THREE.Vector3(0, -0.035, 0),
    new THREE.Vector3(0.025, 0.008, 0),
    new THREE.Vector3(0.06, 0.004, 0),
    new THREE.Vector3(0.072, -0.03, 0),
  ]);
  shared = {
    bar: new THREE.TubeGeometry(barCurve, 40, 0.017, 10, false),
    hook: new THREE.TubeGeometry(hookCurve, 30, 0.009, 8, false),
    wood: new THREE.MeshStandardMaterial({ color: 0x8a4e2a, roughness: 0.42, metalness: 0.05 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.18, metalness: 1 }),
  };
  return shared;
};

export type GarmentKind = "saree" | "halfsaree" | "blouse-full" | "blouse-half";
const dims: Record<GarmentKind, { w: number; h: number; pleats: number }> = {
  saree: { w: 0.8, h: 1.42, pleats: 6 },
  halfsaree: { w: 0.86, h: 1.3, pleats: 7 },
  "blouse-full": { w: 0.8, h: 0.86, pleats: 2 },
  "blouse-half": { w: 0.8, h: 0.62, pleats: 2 },
};

export class Garment {
  group = new THREE.Group();
  cloth: Cloth;
  mesh: THREE.Mesh;
  tex: SilkTextures;
  private geo: THREE.PlaneGeometry;
  private attr: THREE.BufferAttribute;
  wind = new THREE.Vector3();
  turbulence = 0.6;
  seed = Math.random() * 100;

  constructor(kind: GarmentKind, colors: Colors, pattern: Pattern, res: [number, number] = [14, 22], texRes: [number, number] = [384, 576]) {
    const parts = hangerParts();
    const bar = new THREE.Mesh(parts.bar, parts.wood);
    const hook = new THREE.Mesh(parts.hook, parts.chrome);
    this.group.add(bar, hook);

    const spec: SilkSpec = { base: colors[0], accent: colors[1], zari: colors[2], pattern, shape: kind as SilkShape };
    this.tex = silkTextures(spec, texRes[0], texRes[1]);
    const mat = silkMaterial(this.tex, spec);

    const { w, h, pleats } = dims[kind];
    const [cols, rows] = res;
    this.cloth = new Cloth(cols, rows, (c, r) => {
      const u = c / (cols - 1), v = r / (rows - 1);
      const x = (u - 0.5) * w * 0.94;
      const y = barY(x) - 0.03 - v * h;
      const z = 0.03 + Math.sin(u * Math.PI * pleats + 0.7) * 0.055 * (0.35 + v);
      return [x, y, z];
    });
    this.cloth.pinRow(0);

    this.geo = new THREE.PlaneGeometry(1, 1, cols - 1, rows - 1);
    this.attr = this.geo.attributes.position as THREE.BufferAttribute;
    this.attr.setUsage(THREE.DynamicDrawUsage);
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, -0.8, 0), 1.2);
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.castShadow = false;
    this.group.add(this.mesh);
    this.sync();
  }

  private sync() {
    (this.attr.array as Float32Array).set(this.cloth.pos);
    this.attr.needsUpdate = true;
    this.geo.computeVertexNormals();
  }

  /* simulate with a fixed 60 Hz step so motion is stable regardless of frame rate */
  private acc = 0;
  update(dt: number, t: number) {
    this.acc = Math.min(this.acc + dt, 1 / 20);
    const step = 1 / 60;
    const { wind, turbulence, seed } = this;
    const force = (x: number, y: number, z: number, _i: number, out: Float32Array) => {
      out[0] += wind.x + Math.sin(t * 1.1 + y * 2.3 + seed) * 0.25 * turbulence;
      out[1] += wind.y;
      out[2] += wind.z + Math.sin(t * 1.7 + x * 4 + y * 1.5 + seed) * 0.6 * turbulence;
    };
    while (this.acc >= step) {
      this.cloth.step(step, 9.8, force);
      this.acc -= step;
    }
    this.sync();
  }

  poke(worldPoint: THREE.Vector3, vx: number, vy: number, strength = 0.012) {
    const p = this.mesh.worldToLocal(worldPoint.clone());
    const c = (v: number) => Math.max(-0.02, Math.min(0.02, v * strength));
    this.cloth.impulse(p.x, p.y, p.z, 0.32, c(vx), c(vy), -0.012);
  }

  dispose() {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.tex.dispose();
  }
}
