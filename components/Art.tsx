"use client";
import { useId } from "react";
import type { Colors, Pattern } from "@/lib/data";

/* Procedural SVG stand-ins for the original AI studio photography. */

export type ArtSpec =
  | { kind: "model"; colors: Colors; pattern?: Pattern; skin?: string; studio?: boolean }
  | { kind: "portrait"; colors: Colors; pattern?: Pattern; bg: [string, string]; close?: boolean; skin?: string }
  | { kind: "saree" | "blouse-full" | "blouse-half" | "halfsaree"; colors: Colors; pattern?: Pattern; back?: boolean }
  | { kind: "choker" | "jhumka" | "ottiyanam" | "bangles"; color: string }
  | { kind: "showroom" };

const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

function Fabric({ id, colors, pattern = "plain", scale = 1 }: { id: string; colors: Colors; pattern?: Pattern; scale?: number }) {
  const [base, acc, zari] = colors;
  const s = 16 * scale;
  return (
    <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
      <rect width={s} height={s} fill={base} />
      {pattern === "check" && (
        <>
          <rect x={0} y={0} width={s * 0.28} height={s} fill={acc} opacity={0.75} />
          <rect x={0} y={0} width={s} height={s * 0.28} fill={acc} opacity={0.6} />
          <rect x={s * 0.6} y={0} width={s * 0.06} height={s} fill={zari} opacity={0.9} />
          <rect x={0} y={s * 0.6} width={s} height={s * 0.06} fill={zari} opacity={0.9} />
        </>
      )}
      {pattern === "stripe" && (
        <>
          <rect x={s * 0.1} width={s * 0.12} height={s} fill={zari} opacity={0.85} />
          <rect x={s * 0.55} width={s * 0.2} height={s} fill={shade(base, -0.08)} />
        </>
      )}
      {pattern === "brocade" && (
        <>
          <path d={`M${s / 2} ${s * 0.12} L${s * 0.85} ${s / 2} L${s / 2} ${s * 0.88} L${s * 0.15} ${s / 2}Z`} fill={zari} opacity={0.55} />
          <circle cx={s / 2} cy={s / 2} r={s * 0.12} fill={shade(base, -0.15)} />
        </>
      )}
      {pattern === "butta" && (
        <>
          <circle cx={s * 0.25} cy={s * 0.25} r={s * 0.09} fill={zari} />
          <circle cx={s * 0.75} cy={s * 0.75} r={s * 0.07} fill={zari} opacity={0.8} />
        </>
      )}
    </pattern>
  );
}

function Sheen({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stopColor="#000" stopOpacity="0.18" />
      <stop offset="0.18" stopColor="#fff" stopOpacity="0.12" />
      <stop offset="0.35" stopColor="#000" stopOpacity="0.08" />
      <stop offset="0.55" stopColor="#fff" stopOpacity="0.16" />
      <stop offset="0.75" stopColor="#000" stopOpacity="0.1" />
      <stop offset="0.9" stopColor="#fff" stopOpacity="0.1" />
      <stop offset="1" stopColor="#000" stopOpacity="0.2" />
    </linearGradient>
  );
}

/* A standing woman in a saree, in a 200x500 box. */
function Figure({ uid, colors, pattern, skin = "#c58b62", shadow = true }: { uid: string; colors: Colors; pattern?: Pattern; skin?: string; shadow?: boolean }) {
  const [base, acc, zari] = colors;
  const f = `${uid}f`, sh = `${uid}s`;
  return (
    <g>
      <defs>
        <Fabric id={f} colors={colors} pattern={pattern} />
        <Sheen id={sh} />
      </defs>
      {shadow && <ellipse cx="100" cy="486" rx="62" ry="9" fill="#000" opacity="0.16" />}
      {/* hair back + braid */}
      <ellipse cx="100" cy="66" rx="25" ry="30" fill="#1a110c" />
      <path d="M112 80 Q122 130 116 190 L108 190 Q112 130 104 84z" fill="#1a110c" />
      {/* hanging pallu behind left shoulder */}
      <path d="M70 102 Q54 190 58 318 L84 318 Q80 210 84 150z" fill={`url(#${f})`} />
      <path d="M58 296 L84 296 L84 318 L58 318z" fill={zari} />
      {/* arms */}
      <path d="M128 104 Q146 180 142 252 L131 252 Q132 186 120 134z" fill={skin} />
      <path d="M72 104 Q58 170 60 246 L71 246 Q70 182 80 134z" fill={skin} />
      <rect x="131" y="228" width="12" height="8" rx="2" fill={zari} />
      <rect x="60" y="224" width="12" height="8" rx="2" fill={zari} />
      {/* neck + head */}
      <rect x="92" y="78" width="16" height="22" fill={skin} />
      <ellipse cx="100" cy="58" rx="18" ry="22" fill={skin} />
      <path d="M81 58 Q80 32 100 33 Q120 32 119 58 Q113 42 100 43 Q87 42 81 58z" fill="#1a110c" />
      <circle cx="100" cy="50" r="1.6" fill="#b3122a" />
      <circle cx="81.5" cy="66" r="3" fill={zari} />
      <circle cx="118.5" cy="66" r="3" fill={zari} />
      {/* blouse */}
      <path d="M72 100 Q100 92 128 100 L131 150 L69 150z" fill={acc} />
      <path d="M72 100 L64 130 L76 134 L80 112z M128 100 L136 130 L124 134 L120 112z" fill={acc} />
      <path d="M88 98 Q100 114 112 98" stroke={zari} strokeWidth="3" fill="none" />
      <rect x="74" y="148" width="52" height="12" fill={skin} />
      {/* skirt */}
      <path d="M74 158 L126 158 Q140 300 150 472 L50 472 Q60 300 74 158z" fill={`url(#${f})`} />
      <path d="M74 158 L126 158 Q140 300 150 472 L50 472 Q60 300 74 158z" fill={`url(#${sh})`} />
      <path d="M95 240 L105 240 L114 472 L86 472z" fill={zari} opacity="0.9" />
      <path d="M98 240 L102 240 L106 472 L94 472z" fill={shade(base, -0.12)} opacity="0.6" />
      <path d="M52 444 L148 444 L150 472 L50 472z" fill={zari} />
      <path d="M52 452 L148 452" stroke={shade(base, -0.2)} strokeWidth="2" />
      {/* pallu across chest */}
      <path d="M124 96 L136 106 L82 178 L68 166z" fill={`url(#${f})`} />
      <path d="M124 96 L128 100 L74 172 L68 166z" fill={zari} />
      <rect x="74" y="160" width="52" height="8" fill={zari} opacity="0.95" />
      {/* feet */}
      <ellipse cx="86" cy="476" rx="9" ry="4" fill={skin} />
      <ellipse cx="114" cy="476" rx="9" ry="4" fill={skin} />
    </g>
  );
}

function Hanger({ wood = true }: { wood?: boolean }) {
  return (
    <g>
      <path d="M100 34 Q100 10 112 11 Q123 14 117 25" stroke="#5c5c5c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 32 L100 42" stroke="#5c5c5c" strokeWidth="3" />
      {wood && <path d="M100 40 L170 70 Q175 75 168 77 L32 77 Q25 75 30 70Z" fill="url(#woodg)" />}
    </g>
  );
}

export default function Art({ spec, className, style }: { spec: ArtSpec; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/[:«»]/g, "");
  const common = { className, style, xmlns: "http://www.w3.org/2000/svg", role: "img" as const, "aria-hidden": true };

  if (spec.kind === "model") {
    return (
      <svg viewBox="0 0 200 500" preserveAspectRatio="xMidYMax meet" {...common}>
        <Figure uid={uid} colors={spec.colors} pattern={spec.pattern} skin={spec.skin} />
      </svg>
    );
  }

  if (spec.kind === "portrait") {
    const [a, b] = spec.bg;
    return (
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" {...common}>
        <defs>
          <linearGradient id={`${uid}bg`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <radialGradient id={`${uid}lt`} cx="0.3" cy="0.2" r="0.7">
            <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="300" height="400" fill={`url(#${uid}bg)`} />
        <rect width="300" height="400" fill={`url(#${uid}lt)`} />
        <path d="M0 330 L300 315 L300 400 L0 400z" fill="#000" opacity="0.12" />
        <g transform={spec.close ? "translate(10 60) scale(1.4)" : "translate(60 22) scale(0.9)"}>
          <Figure uid={uid} colors={spec.colors} pattern={spec.pattern} skin={spec.skin} shadow={!spec.close} />
        </g>
      </svg>
    );
  }

  if (spec.kind === "saree" || spec.kind === "halfsaree" || spec.kind === "blouse-full" || spec.kind === "blouse-half") {
    const [base, acc, zari] = spec.colors;
    const f = `${uid}f`, sh = `${uid}s`, cl = `${uid}c`;
    const flip = spec.back ? "translate(200 0) scale(-1 1)" : undefined;
    return (
      <svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMin meet" {...common}>
        <defs>
          <Fabric id={f} colors={spec.colors} pattern={spec.pattern} scale={0.8} />
          <Sheen id={sh} />
          <linearGradient id="woodg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#9a5a32" />
            <stop offset="1" stopColor="#5e3018" />
          </linearGradient>
          <filter id={`${uid}ds`} x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.22" />
          </filter>
        </defs>
        <Hanger />
        <g transform={flip} filter={`url(#${uid}ds)`}>
          {spec.kind === "saree" && (
            <>
              <clipPath id={cl}>
                <path d="M38 74 L162 74 L167 276 Q150 286 134 278 Q117 288 100 280 Q83 288 66 278 Q50 286 33 276 Z" />
              </clipPath>
              <g clipPath={`url(#${cl})`}>
                <rect x="0" y="70" width="200" height="230" fill={`url(#${f})`} />
                <rect x="146" y="70" width="24" height="230" fill={zari} />
                <rect x="150" y="70" width="5" height="230" fill={acc} opacity="0.7" />
                <rect x="0" y="238" width="200" height="60" fill={zari} />
                <rect x="0" y="246" width="200" height="4" fill={shade(base, -0.2)} />
                <rect x="0" y="262" width="200" height="3" fill={acc} opacity="0.6" />
                <rect x="0" y="70" width="200" height="230" fill={`url(#${sh})`} />
              </g>
              <path d="M36 74 L164 74 L163 92 L37 92Z" fill={shade(base, -0.1)} />
              <path d="M36 74 L164 74 L163 92 L37 92Z" fill={`url(#${sh})`} />
            </>
          )}
          {spec.kind === "halfsaree" && (
            <>
              <path d="M70 92 L130 92 L174 290 Q100 304 26 290Z" fill={`url(#${f})`} />
              <path d="M70 92 L130 92 L174 290 Q100 304 26 290Z" fill={`url(#${sh})`} />
              <path d="M32 262 Q100 276 168 262 L174 290 Q100 304 26 290Z" fill={zari} />
              <path d="M33 268 Q100 282 167 268" stroke={acc} strokeWidth="3" fill="none" />
              <path d="M38 74 L162 74 L160 150 Q130 160 120 140 L80 140 Q70 160 40 150Z" fill={acc} />
              <path d="M40 140 Q70 160 80 140 L120 140 Q130 160 160 140" stroke={zari} strokeWidth="5" fill="none" />
            </>
          )}
          {(spec.kind === "blouse-full" || spec.kind === "blouse-half") && (
            <>
              {spec.kind === "blouse-full" ? (
                <path d="M62 80 L34 226 L52 230 L74 116z M138 80 L166 226 L148 230 L126 116z" fill={`url(#${f})`} />
              ) : (
                <path d="M62 80 L40 134 L60 144 L72 112z M138 80 L160 134 L140 144 L128 112z" fill={`url(#${f})`} />
              )}
              {spec.kind === "blouse-full" ? (
                <path d="M34 216 L54 220 L52 230 L34 226z M166 216 L146 220 L148 230 L166 226z" fill={zari} />
              ) : (
                <path d="M41 128 L62 138 L60 145 L39 135z M159 128 L138 138 L140 145 L161 135z" fill={zari} />
              )}
              <path d="M62 78 L138 78 L142 196 Q100 206 58 196 Z" fill={`url(#${f})`} />
              <path d="M62 78 L138 78 L142 196 Q100 206 58 196 Z" fill={`url(#${sh})`} />
              <path d="M58 186 Q100 196 142 186 L142 196 Q100 206 58 196Z" fill={zari} />
              <path d="M82 78 Q100 120 118 78" fill="#fff" stroke={zari} strokeWidth="4" />
            </>
          )}
        </g>
      </svg>
    );
  }

  if (spec.kind === "showroom") {
    const silk = ["#c2185b", "#1e3aa8", "#e0a82e", "#1b7a4b", "#8e1b2b", "#ef6c00", "#6a1b9a", "#efe3c8", "#00897b", "#d81b60"];
    const shelf = (x0: number, w: number, flip: boolean) => {
      const out: React.ReactNode[] = [];
      for (let r = 0; r < 9; r++)
        for (let c = 0; c < 7; c++) {
          const k = (r * 7 + c * 3) % silk.length;
          out.push(<rect key={`${x0}${r}${c}`} x={x0 + c * (w / 7) + 3} y={110 + r * 52} width={w / 7 - 6} height={40} rx="3" fill={silk[k]} opacity={0.92} />);
        }
      return <g transform={flip ? `translate(${x0 * 2 + w} 0) scale(-1 1)` : undefined}>{out}</g>;
    };
    return (
      <svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" {...common}>
        <defs>
          <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9b06a" />
            <stop offset="0.25" stopColor="#7a3a22" />
            <stop offset="0.7" stopColor="#4a1d12" />
          </linearGradient>
          <linearGradient id={`${uid}fl`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d8c3a2" />
            <stop offset="1" stopColor="#a8916e" />
          </linearGradient>
          <radialGradient id={`${uid}gl`} cx="0.5" cy="0.15" r="0.6">
            <stop offset="0" stopColor="#ffe6a8" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="woodg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#9a5a32" />
            <stop offset="1" stopColor="#5e3018" />
          </linearGradient>
        </defs>
        <rect width="1600" height="800" fill={`url(#${uid}w)`} />
        <path d="M0 600 L1600 600 L1600 800 L0 800Z" fill={`url(#${uid}fl)`} />
        <rect x="0" y="80" width="420" height="540" fill="#3a1a0e" />
        <rect x="1180" y="80" width="420" height="540" fill="#3a1a0e" />
        {shelf(10, 400, false)}
        {shelf(1190, 400, true)}
        <path d="M640 600 L640 260 Q800 150 960 260 L960 600Z" fill="#6a1a18" />
        <circle cx="800" cy="330" r="34" fill="#e0b04a" opacity="0.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={720 + i * 40} cy={210 + (i % 2) * 10} r="8" fill="#fff3c4" opacity="0.9" />
        ))}
        {[470, 560, 1040, 1120].map((x, i) => (
          <rect key={x} x={x} y={120} width={36} height={220} fill={silk[(i * 3) % silk.length]} opacity="0.85" />
        ))}
        <rect width="1600" height="800" fill={`url(#${uid}gl)`} />
        <g transform="translate(1180 120) scale(1.45)">
          <Figure uid={`${uid}m1`} colors={["#a8233a", "#d9a441", "#e3b851"]} pattern="brocade" skin="#efe6dc" />
        </g>
        <g transform="translate(860 330) scale(0.62)">
          <Figure uid={`${uid}m2`} colors={["#1b6b3a", "#c2185b", "#e0b04a"]} skin="#efe6dc" />
        </g>
        <g transform="translate(520 300) scale(0.75)">
          <Figure uid={`${uid}m3`} colors={["#c2185b", "#1e3aa8", "#e0b04a"]} skin="#efe6dc" />
        </g>
      </svg>
    );
  }

  /* jewellery thumbnails */
  const gold = "#d4a33d";
  return (
    <svg viewBox="0 0 60 60" {...common}>
      <rect width="60" height="60" fill="#faf6ee" />
      {spec.kind === "choker" && (
        <>
          <path d="M10 18 Q30 46 50 18" stroke={gold} strokeWidth="6" fill="none" />
          {[14, 20, 26, 34, 40, 46].map((x, i) => (
            <circle key={i} cx={x} cy={18 + Math.sin(((x - 10) / 40) * Math.PI) * 13} r="2.6" fill={spec.color} />
          ))}
          <path d="M26 36 L34 36 L30 46Z" fill={gold} />
        </>
      )}
      {spec.kind === "jhumka" &&
        [18, 42].map((x) => (
          <g key={x}>
            <circle cx={x} cy="14" r="4" fill={gold} />
            <path d={`M${x - 9} 36 Q${x} 14 ${x + 9} 36Z`} fill={gold} />
            {[-6, -2, 2, 6].map((d) => (
              <circle key={d} cx={x + d} cy="40" r="1.8" fill={spec.color} stroke="#ccc" strokeWidth="0.4" />
            ))}
          </g>
        ))}
      {spec.kind === "ottiyanam" && (
        <>
          <rect x="4" y="25" width="52" height="10" rx="3" fill={gold} />
          <ellipse cx="30" cy="30" rx="10" ry="9" fill="#e5b84f" stroke="#a87a20" />
          <path d="M25 32 Q30 22 35 32" stroke="#8a5a10" strokeWidth="1.5" fill="none" />
        </>
      )}
      {spec.kind === "bangles" &&
        [0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx="30" cy={16 + i * 6} rx="18" ry="5" fill="none" stroke={i % 2 ? spec.color : gold} strokeWidth="3.5" />)}
    </svg>
  );
}
