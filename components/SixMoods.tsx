import { moods } from "@/lib/data";
import Photo from "./Photo";

/* Gopuram / temple-arch window in objectBoundingBox units. */
const ARCH =
  "M0 1 V0.37 C0 0.29 0.07 0.25 0.13 0.21 C0.2 0.17 0.15 0.11 0.27 0.08 C0.39 0.05 0.46 0.04 0.5 0 C0.54 0.04 0.61 0.05 0.73 0.08 C0.85 0.11 0.8 0.17 0.87 0.21 C0.93 0.25 1 0.29 1 0.37 V1 Z";

export default function SixMoods() {
  return (
    <section className="section moods">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <clipPath id="gopuram" clipPathUnits="objectBoundingBox">
          <path d={ARCH} />
        </clipPath>
      </svg>
      <div className="section-head split" data-reveal>
        <div>
          <span className="eyebrow">The NOOLAM Archive</span>
          <h2>
            Six Moods. <span className="grad-text">Timeless Drapes</span>
          </h2>
        </div>
        <p className="head-note">Woven by hand, worn for a lifetime. Six silk stories, from quiet mornings to festive evenings.</p>
      </div>
      <div className="moods-row" data-reveal>
        {moods.map((m, i) => (
          <a href="#look" className="mood" key={m.label}>
            <div className="mood-frame">
              <svg className="finial" viewBox="0 0 20 30" aria-hidden>
                <path d="M10 0 L12 6 L10 8 L8 6Z M7 9h6l-1 4H8z M5 14h10l-2 6H7z M9 20h2v10H9z" fill="#c9973a" />
              </svg>
              <div className="arch-gold">
                <div className="arch-ivory">
                  <div className="arch-img">
                    <Photo src={`/images/moods/${i + 1}.jpg`} art={{ kind: "portrait", colors: m.colors, pattern: m.pattern, bg: m.bg }} alt={m.label} />
                  </div>
                </div>
              </div>
            </div>
            <span className="mood-label">{m.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
