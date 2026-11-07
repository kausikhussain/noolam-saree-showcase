"use client";
import { useEffect, useRef, useState } from "react";
import { looks, inr } from "@/lib/data";
import Photo from "./Photo";
import { useBag } from "./store";
import { ArrowL, ArrowR, Cart, Heart, Plus } from "./Icons";

const N = looks.length;
const SPACING = 205;
const wrap = (o: number) => ((((o + N / 2) % N) + N) % N) - N / 2;
const mod = (i: number) => ((i % N) + N) % N;

export default function TryTheLook() {
  const { add, liked, toggleLike } = useBag();
  const [pos, setPos] = useState(6); // "7 of 8 · Ivory Elephant"
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; p: number; moved: boolean } | null>(null);
  const wheelAcc = useRef(0);
  const stage = useRef<HTMLDivElement>(null);

  const active = mod(Math.round(pos));
  const look = looks[active];
  const total = look.items.reduce((s, i) => s + i.price, 0);
  const bundle = Math.round((total * 0.9) / 100) * 100;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // keep vertical page scroll
      e.preventDefault();
      wheelAcc.current += e.deltaX;
      if (Math.abs(wheelAcc.current) > 70) {
        const dir = Math.sign(wheelAcc.current);
        wheelAcc.current = 0;
        setPos((p) => Math.round(p) + dir);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, p: pos, moved: false };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setPos(drag.current.p - dx / SPACING);
  };
  const onUp = () => {
    setDragging(false);
    setPos((p) => Math.round(p));
    setTimeout(() => (drag.current = null), 0);
  };

  return (
    <section id="look" className="section look">
      <div className="look-stage-wrap">
        <div className="look-head" data-reveal>
          <span className="eyebrow">Styled head to toe</span>
          <h2>
            Try the <span className="maroon">Look.</span>
          </h2>
          <p className="sub">Eight looks, styled head to toe. Tap a look to see the pieces.</p>
        </div>
        <div ref={stage} className={`look-stage ${dragging ? "dragging" : ""}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          {looks.map((l, i) => {
            const o = wrap(i - pos);
            const a = Math.abs(o);
            const blur = Math.max(0, a - 1.1) * 4;
            const scale = 1 - Math.min(a, 3) * 0.06;
            const opacity = a > 3.4 ? 0 : 1 - Math.max(0, a - 2) * 0.45;
            return (
              <div
                key={l.name}
                className="look-model"
                style={{ transform: `translateX(calc(-50% + ${o * SPACING}px)) scale(${scale})`, filter: blur ? `blur(${blur}px)` : undefined, opacity, zIndex: 20 - Math.round(a * 2) }}
                onClick={() => !drag.current?.moved && setPos((p) => Math.round(p) + Math.round(o))}
              >
                <Photo src={`/images/looks/${i + 1}.png`} art={{ kind: "model", colors: l.colors, pattern: l.pattern }} alt={l.name} fit="contain" />
              </div>
            );
          })}
        </div>
        <div className="look-controls">
          <button className="ghost-arrow" onClick={() => setPos((p) => Math.round(p) - 1)} aria-label="Previous look">
            <ArrowL size={18} />
          </button>
          <span className="look-count">
            {active + 1} of {N} · {look.name}
          </span>
          <span className="look-progress">
            <i style={{ width: `${100 / N}%`, left: `${(active * 100) / N}%` }} />
          </span>
          <span className="look-hint">✦ Scroll or drag</span>
          <button className="ghost-arrow" onClick={() => setPos((p) => Math.round(p) + 1)} aria-label="Next look">
            <ArrowR size={18} />
          </button>
        </div>
      </div>

      <aside className="look-panel" data-reveal>
        <h4>In this look</h4>
        <ul key={active}>
          {look.items.map((it, n) => {
            const key = `${look.name}-${it.type}`;
            return (
              <li key={key} style={{ animationDelay: `${n * 40}ms` }}>
                <div className="li-thumb">
                  <span className="li-n">{n + 1}</span>
                  <Photo
                    src={`/images/look-items/${it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    art={
                      it.kind === "saree"
                        ? { kind: "saree", colors: look.colors, pattern: look.pattern }
                        : it.kind === "blouse"
                          ? { kind: "blouse-half", colors: [it.color, look.colors[2], look.colors[2]] }
                          : { kind: it.kind, color: it.color }
                    }
                    fit="contain"
                  />
                </div>
                <div className="li-body">
                  <small>NOOLAM · {it.type}</small>
                  <strong>{it.name}</strong>
                  <span>{inr(it.price)}</span>
                </div>
                <button className={`li-heart ${liked.has(key) ? "on" : ""}`} onClick={() => toggleLike(key)} aria-label="Wishlist">
                  <Heart size={14} filled={liked.has(key)} />
                </button>
                <button className="li-plus" onClick={() => add(it.name, it.price)} aria-label="Add to bag">
                  <Plus size={14} />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="look-bundle">
          <div>
            <span>Complete the look</span>
            <small>Bundle all {look.items.length} pieces · save 10%</small>
          </div>
          <div className="bundle-price">
            <s>{inr(total)}</s>
            <b>{inr(bundle)}</b>
          </div>
        </div>
        <div className="look-actions">
          <button className="btn btn-maroon btn-lg grow" onClick={() => add(`${look.name} full look`, bundle, look.items.length)}>
            Add full look to bag
            <span className="btn-dot">
              <Cart size={14} />
            </span>
          </button>
          <button className={`circle-btn ${liked.has(look.name) ? "on" : ""}`} onClick={() => toggleLike(look.name)} aria-label="Wishlist look">
            <Heart size={16} filled={liked.has(look.name)} />
          </button>
        </div>
      </aside>
    </section>
  );
}
