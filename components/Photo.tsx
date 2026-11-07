"use client";
import { useEffect, useRef, useState } from "react";
import Art, { type ArtSpec } from "./Art";

const EXTS = [".png", ".jpg", ".jpeg", ".webp"];

/**
 * Shows the real photo when it exists in /public, otherwise the procedural art.
 * `src` may be given with or without an extension; .png/.jpg/.jpeg/.webp are all tried,
 * so you can save generated images in whichever format the tool gives you.
 * The art is always painted underneath so there is never a broken-image flash.
 */
export default function Photo({ src, art, alt = "", className = "", fit = "cover", style }: { src?: string; art: ArtSpec; alt?: string; className?: string; fit?: "cover" | "contain"; style?: React.CSSProperties }) {
  const base = src?.replace(/\.(png|jpe?g|webp)$/i, "");
  const [n, setN] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const url = base && n < EXTS.length ? base + EXTS[n] : undefined;

  useEffect(() => {
    setN(0);
    setLoaded(false);
  }, [base]);

  // catch load/error events that fired before hydration
  useEffect(() => {
    const i = ref.current;
    if (!i || !i.complete) return;
    if (i.naturalWidth > 0) setLoaded(true);
    else setN((k) => k + 1);
  }, [url]);

  return (
    <div className={`photo ${className}`} style={style}>
      {!loaded && <Art spec={art} className="photo-art" />}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={url} ref={ref} src={url} alt={alt} draggable={false} onLoad={() => setLoaded(true)} onError={() => setN((k) => k + 1)} style={{ objectFit: fit, opacity: loaded ? 1 : 0 }} />
      )}
    </div>
  );
}
