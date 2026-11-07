"use client";
import { useEffect, useRef, useState } from "react";
import { reels } from "@/lib/data";
import Photo from "./Photo";
import { ChevL, ChevR, Close, Lotus, Pause, Play, Sound } from "./Icons";

const N = reels.length;
const mod = (i: number) => ((i % N) + N) % N;
const DURATION = 6000;

function ReelMedia({ i, play, muted, onEnd }: { i: number; play: boolean; muted: boolean; onEnd?: () => void }) {
  const r = reels[i];
  const v = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = v.current;
    if (!el || !ok) return;
    if (play) el.play().catch(() => {});
    else el.pause();
  }, [play, ok]);
  return (
    <>
      {!ok && <Photo className={`reel-art ${play ? "kb" : ""}`} src={`/images/reels/${r.n}.jpg`} art={{ kind: "portrait", colors: r.colors, bg: r.bg, close: true }} />}
      <video ref={v} src={`/media/reels/${r.n}.mp4`} muted={muted} playsInline loop={!onEnd} preload="metadata" onLoadedData={() => setOk(true)} onEnded={onEnd} style={{ opacity: ok ? 1 : 0 }} />
    </>
  );
}

function Viewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    setT(0);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = (now - t0) / DURATION;
      if (p >= 1) setI((x) => mod(x + 1));
      else {
        setT(p);
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => mod(x + 1));
      if (e.key === "ArrowLeft") setI((x) => mod(x - 1));
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
  const r = reels[i];
  return (
    <div className="viewer" style={{ ["--vb" as string]: r.bg[1] }} onClick={onClose}>
      <div className="viewer-side l" onClick={(e) => (e.stopPropagation(), setI(mod(i - 1)))}>
        <ReelMedia i={mod(i - 1)} play={false} muted />
        <span>{reels[mod(i - 1)].title}</span>
      </div>
      <div className="viewer-main" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-bars">
          {reels.map((_, k) => (
            <i key={k}>
              <b style={{ width: k < i ? "100%" : k === i ? `${t * 100}%` : "0%" }} />
            </i>
          ))}
        </div>
        <div className="viewer-top">
          <span className="viewer-avatar">
            <Lotus size={16} />
          </span>
          <div>
            <strong>noolam</strong>
            <small>{r.place}</small>
          </div>
          <button onClick={() => setMuted(!muted)} aria-label="Toggle sound">
            <Sound size={16} off={muted} />
          </button>
          <button onClick={onClose} aria-label="Close">
            <Close size={16} />
          </button>
        </div>
        <ReelMedia key={i} i={i} play muted={muted} />
        <div className="viewer-cap">
          <small>{r.fabric}</small>
          <strong>{r.title}</strong>
        </div>
        <button className="viewer-nav l" onClick={() => setI(mod(i - 1))} aria-label="Previous reel">
          <ChevL size={18} />
        </button>
        <button className="viewer-nav r" onClick={() => setI(mod(i + 1))} aria-label="Next reel">
          <ChevR size={18} />
        </button>
      </div>
      <div className="viewer-side r" onClick={(e) => (e.stopPropagation(), setI(mod(i + 1)))}>
        <ReelMedia i={mod(i + 1)} play={false} muted />
        <span>{reels[mod(i + 1)].title}</span>
      </div>
    </div>
  );
}

export default function MuseReels() {
  const [idx, setIdx] = useState(3); // Reel 04 "Pachai Pattu" centred
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const acc = useRef(0);

  useEffect(() => {
    if (!playing || viewer !== null) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      acc.current += now - last;
      last = now;
      if (acc.current >= DURATION) {
        acc.current = 0;
        setIdx((x) => x + 1);
      }
      setProgress(acc.current / DURATION);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, viewer]);

  const go = (d: number) => {
    acc.current = 0;
    setProgress(0);
    setIdx((x) => x + d);
  };

  const slots = [];
  for (let k = -5; k <= 5; k++) slots.push(idx + k);

  return (
    <section className="section reels">
      <div className="section-head split" data-reveal>
        <div>
          <span className="eyebrow double">The Muse Reels</span>
          <h2>
            Silk, <span className="grad-text">in motion.</span>
          </h2>
        </div>
        <div className="reels-right">
          <p className="head-note">Five drapes filmed the way they are lived in — lamp rooms, temple lanes, a morning by the sea. Tap the centre reel to watch it full screen, with sound.</p>
          <div className="reel-ctrls">
            <button onClick={() => go(-1)} aria-label="Previous">
              <ChevL size={16} />
            </button>
            <button className="dark" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={() => go(1)} aria-label="Next">
              <ChevR size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="reel-arc">
        {slots.map((v) => {
          const k = v - idx;
          const a = Math.abs(k);
          const i = mod(v);
          const r = reels[i];
          const centre = k === 0;
          const x = Math.sign(k) * (a <= 1 ? a * 190 : 190 + (a - 1) * 150 - (a - 1) * (a - 1) * 8);
          return (
            <div
              key={v}
              className={`reel-card ${centre ? "centre" : ""}`}
              style={{
                transform: `translateX(calc(-50% + ${x}px)) translateZ(${-a * 70}px) rotateY(${-k * 11}deg) scale(${1 - a * 0.07})`,
                zIndex: 20 - a,
                opacity: a > 4.6 ? 0 : 1,
              }}
              onClick={() => (centre ? setViewer(i) : go(k))}
            >
              <ReelMedia i={i} play={centre && playing} muted />
              <div className="reel-shade" />
              <div className="reel-top">
                <span className="reel-tag">
                  <i /> REEL {r.n}
                </span>
                <span className="reel-dur">{r.dur}</span>
              </div>
              {centre && (
                <span className="reel-play">
                  <Play size={16} />
                </span>
              )}
              <div className="reel-meta">
                <small>{r.fabric}</small>
                <strong>{r.title}</strong>
                <span>{r.place}</span>
                {centre && (
                  <div className="reel-progress">
                    <b style={{ width: `${progress * 100}%` }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {viewer !== null && <Viewer start={viewer} onClose={() => setViewer(null)} />}
    </section>
  );
}
