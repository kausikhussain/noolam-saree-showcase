"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createStage } from "@/lib/silk/stage";
import { repaintSilk, silkMaterial, silkTextures, type SilkSpec, type SilkTextures } from "@/lib/silk/texture";
import { weaveSilks, inr } from "@/lib/data";
import { useBag } from "./store";

const SEG = 260;
const LEN = 18;
const ribbonSpec = (i: number): SilkSpec => ({ base: weaveSilks[i].base, accent: weaveSilks[i].zari, zari: weaveSilks[i].zari, pattern: "butta", shape: "ribbon" });

export default function Weave() {
  const { add } = useBag();
  const host = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<number[]>([0, 2, 4]);
  const textures = useRef<SilkTextures[]>([]);
  const pickedRef = useRef(picked);

  /* scene setup — once */
  useEffect(() => {
    const el = host.current!;
    const stage = createStage(el, { fov: 32, cam: [0, 0, 10], exposure: 1.1 });
    const { scene, camera, renderer } = stage;
    void camera;
    void renderer;
    const ribbons: { geo: THREE.BufferGeometry; pos: Float32Array }[] = [];
    textures.current = [];
    for (let r = 0; r < 3; r++) {
      const spec = ribbonSpec(pickedRef.current[r]);
      const tex = silkTextures(spec, 1024, 128);
      [tex.map, tex.orm, tex.bump].forEach((t) => {
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(4, 1);
      });
      textures.current.push(tex);
      const pos = new Float32Array((SEG + 1) * 2 * 3);
      const uv = new Float32Array((SEG + 1) * 2 * 2);
      const idx: number[] = [];
      for (let s = 0; s <= SEG; s++) {
        uv.set([s / SEG, 0, s / SEG, 1], s * 4);
        if (s < SEG) {
          const a = s * 2;
          idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      geo.setIndex(idx);
      const mat = silkMaterial(tex, spec);
      scene.add(new THREE.Mesh(geo, mat));
      ribbons.push({ geo, pos });
    }

    let braid = 0;
    const t0 = performance.now() / 1000;
    stage.start((_dt, now) => {
      const t = now - t0;
      // scroll-driven: ribbons flow apart, then braid as the section reaches centre
      const rect = section.current!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)));
      const target = Math.min(1, Math.max(0, (p - 0.3) / 0.35));
      braid += (target - braid) * 0.06;
      const b = braid * braid * (3 - 2 * braid);

      ribbons.forEach(({ geo, pos }, r) => {
        for (let s = 0; s <= SEG; s++) {
          const u = s / SEG;
          const x = (u - 0.5) * LEN;
          // flowing state
          const fy = Math.sin(u * 5 + t * 0.7 + r * 1.7) * 0.55 + (r - 1) * 0.95;
          const fz = Math.cos(u * 3.4 + t * 0.5 + r) * 0.6;
          const fa = Math.sin(u * 4.2 + t * 0.9 + r * 2.1) * 1.1;
          // braided state
          const ph = u * Math.PI * 2 * 3.2 - t * 0.9 + (r * Math.PI * 2) / 3;
          const by = Math.sin(ph) * 0.5;
          const bz = Math.cos(ph) * 0.62;
          const ba = ph + Math.PI * 0.35;
          const cy = fy + (by - fy) * b;
          const cz = fz + (bz - fz) * b;
          const ang = fa + (ba - fa) * b;
          const hw = (0.48 + (0.32 - 0.48) * b) * (0.85 + 0.15 * Math.sin(u * 9 + r));
          const dy = Math.cos(ang) * hw, dz = Math.sin(ang) * hw;
          pos.set([x, cy + dy, cz + dz, x, cy - dy, cz - dz], s * 6);
        }
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();
      });
    });
    return () => {
      ribbons.forEach(({ geo }) => geo.dispose());
      textures.current.forEach((t) => t.dispose());
      stage.dispose();
    };
  }, []);

  /* repaint ribbons when the chosen silks change */
  useEffect(() => {
    pickedRef.current = picked;
    textures.current.forEach((t, i) => repaintSilk(t, ribbonSpec(picked[i])));
  }, [picked]);

  const pick = (i: number) =>
    setPicked((p) => {
      if (p.includes(i)) return p;
      return [...p.slice(1), i];
    });

  const total = picked.reduce((s, i) => s + weaveSilks[i].price, 0);
  const name = picked.map((i) => weaveSilks[i].name.split(" ")[0]).join(" · ");

  return (
    <section id="weave" ref={section} className="section weave">
      <div className="weave-top">
        <span className="eyebrow">Seer Varisai</span>
        <span className="weave-kicker">Any three silks, one set</span>
      </div>
      <h2 className="weave-title" data-reveal>
        Three silks, <span className="grad-text">one weave.</span>
      </h2>
      <div ref={host} className="weave-canvas" />
      <div className="weave-bottom">
        <ul className="weave-list">
          {picked.map((i, n) => (
            <li key={n}>
              <i style={{ background: weaveSilks[i].base }} /> {weaveSilks[i].name} <span>{inr(weaveSilks[i].price)}</span>
            </li>
          ))}
        </ul>
        <div className="weave-pick">
          <small>Choose a silk to braid in</small>
          <div className="swatches">
            {weaveSilks.map((s, i) => (
              <button
                key={s.name}
                className={`swatch ${picked.includes(i) ? "on" : ""}`}
                style={{ background: `radial-gradient(circle at 35% 30%, ${s.zari} 0 12%, ${s.base} 13%)` }}
                onClick={() => pick(i)}
                aria-label={s.name}
                title={s.name}
              />
            ))}
          </div>
          <span className="weave-name">{name} Braid</span>
        </div>
        <div className="weave-price">
          <span className="gold-chip">Seer set</span>
          <b>{inr(total)}</b>
          <button className="btn btn-maroon" onClick={() => add(`${name} seer set`, total, 3)}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
