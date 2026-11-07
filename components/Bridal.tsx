"use client";
import { useState } from "react";
import { bridal, inr } from "@/lib/data";
import Photo from "./Photo";
import { useBag } from "./store";
import { ArrowL, ArrowR, Heart } from "./Icons";

const N = bridal.length;
const wrap = (o: number) => ((((o + N / 2) % N) + N) % N) - N / 2;
const mod = (i: number) => ((i % N) + N) % N;

export default function Bridal() {
  const { add, liked, toggleLike } = useBag();
  const [pos, setPos] = useState(3);
  const active = mod(pos);
  const b = bridal[active];
  const price = b.off ? Math.round((b.price * (100 - b.off)) / 100) : b.price;
  return (
    <section id="bridal" className="section bridal">
      <div className="rack-head" data-reveal>
        <span className="eyebrow center">For the muhurtham and every vow after</span>
        <h2>
          The Bridal <span className="maroon">Collection</span>
        </h2>
      </div>
      <div className="bridal-arc" data-reveal>
        {bridal.map((c, i) => {
          const k = wrap(i - pos);
          const a = Math.abs(k);
          return (
            <div
              key={c.name}
              className={`bridal-card ${k === 0 ? "centre" : ""}`}
              style={{
                transform: `translateX(calc(-50% + ${k * 162}px)) translateY(${a * a * 9 + a * 18}px) rotate(${k * 8}deg) scale(${1 - a * 0.08})`,
                opacity: a > 3.4 ? 0 : 1 - a * 0.14,
                zIndex: 20 - a,
              }}
              onClick={() => setPos((p) => p + k)}
            >
              <Photo src={`/images/bridal/${i + 1}.jpg`} art={{ kind: "portrait", colors: c.colors, pattern: c.pattern, bg: c.bg }} alt={c.name} />
              {c.off && <span className="off-tag">−{c.off}%</span>}
            </div>
          );
        })}
      </div>
      <div className="bridal-info" key={active}>
        <h3>{b.name}</h3>
        <small>{b.fabric}</small>
        <span className="gold-price">
          {b.off && <s>{inr(b.price)}</s>} {inr(price)}
        </span>
      </div>
      <div className="bridal-ctrls">
        <button className="circle-btn" onClick={() => setPos((p) => p - 1)} aria-label="Previous">
          <ArrowL size={16} />
        </button>
        <button className="btn btn-maroon" onClick={() => add(b.name, price)}>
          Add to cart
        </button>
        <button className={`circle-btn sm ${liked.has(b.name) ? "on" : ""}`} onClick={() => toggleLike(b.name)} aria-label="Wishlist">
          <Heart size={14} filled={liked.has(b.name)} />
        </button>
        <button className="circle-btn" onClick={() => setPos((p) => p + 1)} aria-label="Next">
          <ArrowR size={16} />
        </button>
      </div>
    </section>
  );
}
