"use client";
import { useBag, CURRENCY_CONFIG, Currency } from "./store";

export default function CurrencySelector() {
  const { currency, setCurrency } = useBag();

  return (
    <div className="curr-select-wrap">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="curr-select"
        aria-label="Select currency"
      >
        {Object.entries(CURRENCY_CONFIG).map(([key, cfg]) => (
          <option key={key} value={key}>
            {cfg.label}
          </option>
        ))}
      </select>
    </div>
  );
}
