"use client";
import { useEffect, useMemo, useState } from "react";
import { rack, rackFilters, inr } from "@/lib/data";
import SilkRack3D from "./three/SilkRack3D";
import SilkDetail3D from "./three/SilkDetail3D";
import { useBag } from "./store";
import { ArrowL, ArrowR, Close, Heart } from "./Icons";


export default function TheRack() {
  const { add, liked, toggleLike } = useBag();
  const [filter, setFilter] = useState("silk");
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // index into `rack`
  const [side, setSide] = useState<"front" | "back">("front");
  const [size, setSize] = useState<number | null>(null);

  const test = rackFilters.find((f) => f.id === filter)!.test;
  const visible = useMemo(() => rack.map((r, i) => (test(r) ? i : -1)).filter((i) => i >= 0), [test]);
  const captionIdx = hover ?? (visible.includes(5) ? 5 : visible[Math.floor(visible.length / 2)]);

  const openAt = (i: number) => {
    setOpen(i);
    setSide("front");
    setSize(null);
  };
  const step = (d: number) => {
    if (open === null) return;
    const p = visible.indexOf(open);
    openAt(visible[(p + d + visible.length) % visible.length]);
  };

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const item = open !== null ? rack[open] : null;

  return (
    <section id="rack" className="section rack">
      <div className="rack-head" data-reveal>
        <span className="eyebrow center">The Collection</span>
        <h2>
          Every silk, <span className="grad-text rev">on the rail.</span>
        </h2>
        <div className="chips">
          {rackFilters.map((f) => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? "on" : ""}`}
              onClick={() => {
                setFilter(f.id);
                setOpen(null);
                setHover(null);
              }}
            >
              {f.label} <i>{rack.filter(f.test).length}</i>
            </button>
          ))}
        </div>
      </div>

      <div className={`rack-stage ${open !== null ? "detail" : ""}`}>
        <div className="rail-wrap">
          <SilkRack3D items={rack} visible={visible} hot={hover} lifted={open} onHover={setHover} onOpen={openAt} />
          <div className="rail-caption">
            {captionIdx !== undefined && (
              <>
                {rack[captionIdx].name.toUpperCase()} <span>·</span> {inr(rack[captionIdx].price, true)}
              </>
            )}
          </div>
        </div>

        {item && open !== null && (
          <div className="rack-detail" key={open}>
            <button className="detail-close" onClick={() => setOpen(null)}>
              CLOSE <Close size={13} />
            </button>
            <button className="detail-arrow l" onClick={() => step(-1)} aria-label="Previous piece">
              <ArrowL size={16} />
            </button>
            <button className="detail-arrow r" onClick={() => step(1)} aria-label="Next piece">
              <ArrowR size={16} />
            </button>
            <div className="detail-img">
              <SilkDetail3D item={item} side={side} />
            </div>
            <span className="detail-hint">Drag to turn · move over the silk to ruffle it</span>
            <h3 className="detail-name">{item.name.toUpperCase()}</h3>
            <span className="detail-price">{inr(item.price, true)}</span>
            <div className="seg">
              {(["front", "back"] as const).map((s) => (
                <button key={s} className={side === s ? "on" : ""} onClick={() => setSide(s)}>
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="sizes">
              {[34, 36, 38, 40, 42].map((s) => (
                <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
            <div className="detail-actions">
              <button className={`select-size ${size ? "ready" : ""}`} disabled={!size} onClick={() => size && add(`${item.name} (${size})`, item.price)}>
                {size ? `ADD SIZE ${size} TO BAG` : "SELECT A SIZE"}
              </button>
              <button className={`circle-btn sm ${liked.has(item.name) ? "on" : ""}`} onClick={() => toggleLike(item.name)} aria-label="Wishlist">
                <Heart size={14} filled={liked.has(item.name)} />
              </button>
            </div>
            <a href="#footer" className="see-avail">
              SEE AVAILABILITY
            </a>
          </div>
        )}
      </div>

      <div className="rack-foot">
        <span>EXPLORE THE COLLECTION · {visible.length} PIECES</span>
        <span>AI-GENERATED STUDIO IMAGERY · DEMO COLLECTION</span>
      </div>
    </section>
  );
}
