"use client";
import { useRef, useState } from "react";
import { museLeft, museRight } from "@/lib/data";
import Photo from "./Photo";
import { ArrowUR, Sound } from "./Icons";

function Column({ items, dir, prefix }: { items: typeof museLeft; dir: "up" | "down"; prefix: string }) {
  const list = [...items, ...items];
  return (
    <div className="muse-col">
      <div className={`muse-col-track ${dir}`}>
        {list.map((m, i) => (
          <div className="muse-tile" key={i}>
            <Photo src={`/images/muse/${prefix}-${(i % items.length) + 1}.jpg`} art={{ kind: "portrait", colors: m.colors, bg: m.bg }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MuseFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const toggle = () => {
    const v = video.current;
    if (v) {
      v.muted = !muted;
      if (v.paused) v.play().catch(() => {});
    }
    setMuted(!muted);
  };
  return (
    <section id="muse" className="section muse">
      <Column items={museLeft} dir="up" prefix="left" />
      <div className="muse-center" data-reveal>
        <span className="eyebrow center">The Muse Film</span>
        <h2>
          Feel the <span className="grad-text">drape</span>
        </h2>
        <div className="film-frame">
          <i className="br tl" />
          <i className="br tr" />
          <i className="br bl" />
          <i className="br brr" />
          <div className="film">
            {!hasVideo && <Photo className="film-poster" art={{ kind: "portrait", colors: ["#c62828", "#b71c1c", "#e0b04a"], bg: ["#9a8f86", "#4a4440"], close: true }} />}
            <video ref={video} src="/media/muse-film.mp4" autoPlay muted loop playsInline onLoadedData={() => setHasVideo(true)} style={{ opacity: hasVideo ? 1 : 0 }} />
            <button className="sound-pill" onClick={toggle}>
              <Sound size={13} off={muted} /> {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </div>
        <a href="#bridal" className="btn btn-maroon btn-lg glow">
          Purchase the Collection
          <span className="btn-dot">
            <ArrowUR size={14} />
          </span>
        </a>
      </div>
      <Column items={museRight} dir="down" prefix="right" />
    </section>
  );
}
