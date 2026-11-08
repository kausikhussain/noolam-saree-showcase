export type Currency = "INR" | "USD" | "GBP" | "AED";

export interface CurrencyDetail {
  code: Currency;
  symbol: string;
  rate: number; // multiplier relative to 1 INR
  label: string;
  name: string;
  flag: string;
}

export const CURRENCY_RATES: Record<Currency, CurrencyDetail> = {
  INR: {
    code: "INR",
    symbol: "₹",
    rate: 1.0,
    label: "INR (₹)",
    name: "Indian Rupee",
    flag: "🇮🇳",
  },
  USD: {
    code: "USD",
    symbol: "$",
    rate: 0.0118,
    label: "USD ($)",
    name: "US Dollar",
    flag: "🇺🇸",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    rate: 0.0094,
    label: "GBP (£)",
    name: "British Pound",
    flag: "🇬🇧",
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    rate: 0.0433,
    label: "AED (د.إ)",
    name: "UAE Dirham",
    flag: "🇦🇪",
  },
};

/**
 * Formats an amount in INR following the official Indian numbering system (e.g. ₹1,25,000).
 */
export function formatINR(amount: number, showDecimals = false): string {
  const formatted = amount.toLocaleString("en-IN", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  return `₹${formatted}`;
}

/**
 * Formats an INR base amount into the target currency.
 */
export function formatCurrency(amountInINR: number, targetCurrency: Currency = "INR"): string {
  const config = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.INR;
  if (targetCurrency === "INR") {
    return formatINR(amountInINR);
  }

  const converted = Math.round(amountInINR * config.rate);
  return `${config.symbol}${converted.toLocaleString("en-US")}`;
}

