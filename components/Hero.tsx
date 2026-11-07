"use client";
import Photo from "./Photo";
import { ArrowUR } from "./Icons";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <Photo className="hero-bg" src="/images/hero-showroom.jpg" art={{ kind: "showroom" }} alt="NOOLAM showroom" />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="hero-badge">
          <i /> KANCHIPURAM · PURE ZARI · HANDWOVEN SILK
        </span>
        <h1>Woven for the Divine.</h1>
        <p>NOOLAM brings the temple looms of Kanchipuram home: Kanjivaram silk in heritage colours, bordered in real zari and finished by hand.</p>
        <div className="hero-ctas">
          <a href="#look" className="btn btn-maroon btn-lg">
            Try the Look
            <span className="btn-dot">
              <ArrowUR size={14} />
            </span>
          </a>
          <a href="#rack" className="btn btn-white btn-lg">
            Browse the Rack
            <span className="btn-dot maroon">
              <ArrowUR size={14} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
