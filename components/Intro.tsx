"use client";
import { useEffect, useState } from "react";
import { Lotus } from "./Icons";
import Curtain3D from "./three/Curtain3D";

/* Red-and-gold silk curtain that parts to reveal the showroom (first seconds of the video). */
function CurtainHalf({ side }: { side: "l" | "r" }) {
  return (
    <div className={`curtain-half ${side}`}>
      <svg className="curtain-motif" viewBox="0 0 400 800" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id={`paisley-${side}`} width="120" height="150" patternUnits="userSpaceOnUse">
            <path d="M60 20c28 0 40 30 30 56-10 26-40 40-44 64-14-30-30-60-10-96 6-12 14-24 24-24z" fill="none" stroke="#f2c14e" strokeWidth="3" opacity="0.75" />
            <circle cx="58" cy="60" r="8" fill="#f2c14e" opacity="0.7" />
            <path d="M10 130l10-10 10 10-10 10z M100 10l8-8 8 8-8 8z" fill="#f2c14e" opacity="0.6" />
          </pattern>
          <pattern id={`border-${side}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#c89b2c" />
            <path d="M20 4 L36 20 L20 36 L4 20Z" fill="#8e1b10" />
            <circle cx="20" cy="20" r="5" fill="#f6d36b" />
          </pattern>
        </defs>
        <rect width="400" height="800" fill={`url(#paisley-${side})`} />
        <rect x={side === "l" ? 360 : 0} width="40" height="800" fill={`url(#border-${side})`} />
        <rect y="0" width="400" height="90" fill={`url(#border-${side})`} />
      </svg>
    </div>
  );
}

type Lenisish = { stop: () => void; start: () => void } | undefined;
const lenis = () => (window as unknown as { lenis?: Lenisish }).lenis;

const OPEN_AT = 1700;

export default function Intro() {
  const [phase, setPhase] = useState<"closed" | "opening" | "fading" | "gone">("closed");
  const [webgl, setWebgl] = useState(true);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    lenis()?.stop();
    const t1 = setTimeout(() => setPhase((p) => (p === "closed" ? "opening" : p)), OPEN_AT);
    const t2 = setTimeout(() => setPhase("gone"), 6000); // safety net
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("gone"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "gone") {
      document.documentElement.style.overflow = "";
      lenis()?.start();
    }
    if (phase === "opening" && !webgl) {
      const t = setTimeout(() => setPhase("gone"), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, webgl]);
  if (phase === "gone") return null;
  return (
    <div className={`intro ${phase} ${webgl ? "is3d" : ""}`} aria-hidden>
      {webgl ? (
        <Curtain3D openAt={OPEN_AT} onDone={() => setPhase("fading")} onFail={() => setWebgl(false)} />
      ) : (
        <>
          <CurtainHalf side="l" />
          <CurtainHalf side="r" />
        </>
      )}
      <div className="intro-logo">
        <Lotus size={44} />
        <span>NOOLAM</span>
        <small>KANCHIPURAM SILK</small>
      </div>
    </div>
  );
}
