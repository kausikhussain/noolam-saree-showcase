"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { RackItem } from "@/lib/data";
import { createStage } from "@/lib/silk/stage";
import { Garment, type GarmentKind } from "@/lib/silk/garment";

export const kindOf = (r: RackItem): GarmentKind => (r.cat === "silk" ? "saree" : r.cat === "half" ? "halfsaree" : r.cat === "full" ? "blouse-full" : "blouse-half");

type Props = { items: RackItem[]; visible: number[]; hot: number | null; lifted: number | null; onHover: (i: number | null) => void; onOpen: (i: number) => void };

const ROD_Y = 0.98;

export default function SilkRack3D(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const live = useRef(props);
  live.current = props;

  useEffect(() => {
    const el = host.current!;
    const stage = createStage(el, { fov: 26, cam: [0, 0.2, 4.9], look: [0, 0.2, 0] });
    const { scene, camera } = stage;

    const chrome = new THREE.MeshStandardMaterial({ color: 0xe6e6e6, roughness: 0.15, metalness: 1 });
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1, 28), chrome);
    rod.rotation.z = Math.PI / 2;
    rod.position.y = ROD_Y;
    const capGeo = new THREE.SphereGeometry(0.045, 24, 16);
    const capL = new THREE.Mesh(capGeo, chrome), capR = new THREE.Mesh(capGeo, chrome);
    capL.position.y = capR.position.y = ROD_Y;
    scene.add(rod, capL, capR);

    const entries = live.current.items.map((r, idx) => {
      const g = new Garment(kindOf(r), r.colors, r.pattern);
      scene.add(g.group);
      return { g, idx, x: 0, y: ROD_Y, z: 0, s: 0, px: 0, vx: 0, first: true };
    });

    let key = "";
    let targets = new Map<number, number>();
    let rodLen = 4;
    const layout = () => {
      const { visible } = live.current;
      const { vw } = stage.viewSize();
      rodLen = Math.min(vw * 0.78, 6.2);
      const k = visible.join(",") + "|" + rodLen.toFixed(2);
      if (k === key) return;
      key = k;
      const n = visible.length;
      const spacing = Math.min(0.62, (rodLen * 0.9) / Math.max(1, n));
      targets = new Map(visible.map((i, k2) => [i, (k2 - (n - 1) / 2) * spacing]));
    };

    /* pointer: hover, poke, click */
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hovered: number | null = null;
    let lastX = NaN, lastY = NaN;
    const pick = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const meshes = entries.filter((x) => x.s > 0.5).map((x) => x.g.mesh);
      const hit = ray.intersectObjects(meshes, false)[0];
      return hit ? { e: entries.find((x) => x.g.mesh === hit.object)!, point: hit.point } : null;
    };
    const onMove = (e: PointerEvent) => {
      const h = pick(e);
      const id = h ? h.e.idx : null;
      if (id !== hovered) {
        hovered = id;
        live.current.onHover(id);
        el.style.cursor = id === null ? "default" : "pointer";
      }
      if (h && !Number.isNaN(lastX)) {
        const { vw } = stage.viewSize();
        const k = vw / el.clientWidth;
        h.e.g.poke(h.point, (e.clientX - lastX) * k * 60, -(e.clientY - lastY) * k * 60);
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onLeave = () => {
      lastX = lastY = NaN;
      hovered = null;
      live.current.onHover(null);
    };
    const onClick = (e: MouseEvent) => {
      const h = pick(e);
      if (h) live.current.onOpen(h.e.idx);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("click", onClick);

    stage.start((dt, t) => {
      layout();
      const { hot, lifted } = live.current;
      rod.scale.y = rodLen;
      capL.position.x = -rodLen / 2;
      capR.position.x = rodLen / 2;
      const ease = 1 - Math.exp(-dt * 3.2);
      entries.forEach((e, n) => {
        const on = targets.has(e.idx) && lifted !== e.idx;
        const tx = targets.get(e.idx) ?? (e.x > 0 ? e.x + 0.6 : e.x - 0.6);
        const isHot = hot === e.idx;
        const ts = on ? (isHot ? 1.12 : 1) : 0;
        const tz = isHot ? 0.6 : (n % 2) * 0.09;
        const ty = lifted === e.idx ? ROD_Y + 0.8 : isHot ? ROD_Y - 0.05 : ROD_Y;
        if (e.first) {
          e.x = e.px = tx;
          e.s = ts;
          e.first = false;
        }
        e.x += (tx - e.x) * ease;
        e.y += (ty - e.y) * ease;
        e.z += (tz - e.z) * ease;
        e.s += (ts - e.s) * ease;
        e.vx = dt > 0 ? (e.x - e.px) / dt : 0;
        e.px = e.x;
        const grp = e.g.group;
        grp.visible = e.s > 0.01;
        if (!grp.visible) return;
        grp.position.set(e.x, e.y, e.z);
        grp.scale.setScalar(e.s);
        grp.rotation.z = THREE.MathUtils.clamp(-e.vx * 0.02, -0.1, 0.1) + Math.sin(t * 0.8 + e.g.seed) * 0.01;
        e.g.wind.set(THREE.MathUtils.clamp(-e.vx * 0.7, -1.5, 1.5), 0, 0);
        e.g.update(dt, t);
      });
    });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick);
      entries.forEach((e) => e.g.dispose());
      stage.dispose();
    };
  }, []);

  return <div ref={host} className="rack3d" />;
}
