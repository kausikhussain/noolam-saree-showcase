"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { RackItem } from "@/lib/data";
import { createStage } from "@/lib/silk/stage";
import { Garment } from "@/lib/silk/garment";
import { kindOf } from "./SilkRack3D";

/* One garment lifted off the rail: high-res cloth, drag to turn it, Front/Back spins it. */
export default function SilkDetail3D({ item, side }: { item: RackItem; side: "front" | "back" }) {
  const host = useRef<HTMLDivElement>(null);
  const sideRef = useRef(side);
  sideRef.current = side;

  useEffect(() => {
    const el = host.current!;
    const kind = kindOf(item);
    const tall = kind === "saree" || kind === "halfsaree";
    const stage = createStage(el, { fov: 28, cam: [0, tall ? -0.78 : -0.42, tall ? 4.1 : 2.7], look: [0, tall ? -0.78 : -0.42, 0] });
    const g = new Garment(kind, item.colors, item.pattern, [22, 34], [512, 768]);
    g.turbulence = 0.45;
    stage.scene.add(g.group);

    let rot = 0, drag = 0, dragging = false, lx = NaN, ly = NaN, born = 0;
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const down = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (Number.isNaN(lx)) {
        lx = e.clientX;
        ly = e.clientY;
        return;
      }
      if (dragging) drag += (e.clientX - lx) * 0.012;
      else {
        const r = el.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, stage.camera);
        const hit = ray.intersectObject(g.mesh, false)[0];
        if (hit) g.poke(hit.point, (e.clientX - lx) * 0.4, -(e.clientY - ly) * 0.4, 0.01);
      }
      lx = e.clientX;
      ly = e.clientY;
    };
    const up = () => (dragging = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    stage.start((dt, t) => {
      born = Math.max(0, Math.min(1, born + dt * 1.6));
      const e = 1 - Math.pow(1 - born, 3);
      g.group.position.y = (1 - e) * -0.55;
      g.group.scale.setScalar(0.65 + 0.35 * e);
      if (!dragging) drag *= 1 - Math.min(1, dt * 2.5);
      const target = (sideRef.current === "back" ? Math.PI : 0) + drag;
      const prev = rot;
      rot += (target - rot) * (1 - Math.exp(-dt * 6));
      g.group.rotation.y = rot;
      // spinning pushes the cloth outward like real fabric
      g.wind.set(0, 0, -(rot - prev) / Math.max(dt, 1e-3) * 0.8);
      g.update(dt, t);
    });

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      g.dispose();
      stage.dispose();
    };
  }, [item]);

  return <div ref={host} className="detail3d" />;
}
