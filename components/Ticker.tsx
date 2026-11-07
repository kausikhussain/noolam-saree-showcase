import { ticker } from "@/lib/data";

export default function Ticker() {
  const row = (k: string) => (
    <div className="ticker-row" key={k} aria-hidden={k !== "a"}>
      {ticker.map(([h, t]) => (
        <span key={h} className="ticker-item">
          <b>{h}</b> {t} <em>◆</em>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">{["a", "b", "c", "d"].map(row)}</div>
    </div>
  );
}
