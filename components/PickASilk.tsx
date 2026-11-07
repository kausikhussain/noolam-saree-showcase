"use client";
import { useEffect, useRef, useState } from "react";
import { silkCards, inr } from "@/lib/data";
import Photo from "./Photo";
import { useBag } from "./store";
import { Heart, Plus } from "./Icons";

export default function PickASilk() {
  const { add, liked, toggleLike } = useBag();
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [dropped, setDropped] = useState<number | null>(null);
  const dragRef = useRef<{ x: number; s: number; moved: boolean } | null>(null);

  /* lay the cards on a gentle curve relative to the track centre */
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let raf = 0;
    const layout = () => {
      const r = t.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      cards.current.forEach((c) => {
        if (!c) return;
        const b = c.getBoundingClientRect();
        const d = (b.left + b.width / 2 - cx) / b.width;
        c.style.setProperty("--arc-r", `${d * 4.5}deg`);
        c.style.setProperty("--arc-y", `${d * d * 14}px`);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    };
    // start centred on the 4th card
    const c3 = cards.current[3]?.parentElement;
    if (c3) t.scrollLeft = c3.offsetLeft + c3.offsetWidth / 2 - t.clientWidth / 2;
    layout();
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tx", `${(-y * 14).toFixed(2)}deg`);
    el.style.setProperty("--ty", `${(x * 16).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tx", "0deg");
    el.style.setProperty("--ty", "0deg");
    el.classList.remove("pressed");
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    dragRef.current = { x: e.clientX, s: track.current!.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current!.scrollLeft = d.s - dx;
  };
  const onUp = () => (dragRef.current = null);

  return (
    <section id="silk" className="section silk">
      <div className="section-head split" data-reveal>
        <h2>
          Pick a <span className="maroon">Silk</span>
        </h2>
        <p className="head-note">
          Tilt a card, press it, poke the silk. Hit{" "}
          <span className="inline-plus">
            <Plus size={10} />
          </span>{" "}
          to drop a saree into your bag.
        </p>
      </div>
      <div ref={track} className="silk-track" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
        <div className="silk-pad" />
        {silkCards.map((c, i) => {
          const key = `silk-${c.title}`;
          return (
            <div className="silk-slot" key={c.title}>
              <div className="silk-arc" ref={(el) => void (cards.current[i] = el)}>
                <div
                  className={`silk-card ${dropped === i ? "dropped" : ""}`}
                  style={{ background: c.bg, color: c.ink }}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  onPointerDown={(e) => e.currentTarget.classList.add("pressed")}
                  onPointerUp={(e) => e.currentTarget.classList.remove("pressed")}
                >
                  <div className="silk-dash" />
                  <h3 className="silk-title">{c.title}</h3>
                  <div className="silk-model">
                    <Photo src={`/images/silks/${i + 1}.png`} art={{ kind: "model", colors: c.colors, pattern: c.pattern }} alt={c.title} fit="contain" />
                  </div>
                  <div className="silk-glare" />
                  <button className={`silk-heart ${liked.has(key) ? "on" : ""}`} onClick={() => toggleLike(key)} aria-label="Wishlist">
                    <Heart size={13} filled={liked.has(key)} />
                  </button>
                  <span className="silk-price">{inr(c.price)}</span>
                  <button
                    className="silk-plus"
                    aria-label={`Add ${c.title} to bag`}
                    onClick={() => {
                      if (dragRef.current?.moved) return;
                      add(c.title, c.price);
                      setDropped(i);
                      setTimeout(() => setDropped(null), 700);
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="silk-pad" />
      </div>
    </section>
  );
}
