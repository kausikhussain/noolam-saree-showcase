export interface PincodeValidationResult {
  valid: boolean;
  pincode: string;
  serviceable: boolean;
  city?: string;
  state?: string;
  estimatedDays?: string;
  codAvailable: boolean;
  expressAvailable: boolean;
  message: string;
}

// Major postal circles mapping (first 2 digits of Indian 6-digit PIN)
const POSTAL_REGIONS: Record<string, { state: string; metro: boolean; days: string }> = {
  "60": { state: "Tamil Nadu (Chennai & North)", metro: true, days: "1–2 business days" },
  "61": { state: "Tamil Nadu (Central)", metro: false, days: "2–3 business days" },
  "62": { state: "Tamil Nadu (Madurai / South)", metro: false, days: "2–3 business days" },
  "63": { state: "Tamil Nadu (Kanchipuram & West)", metro: true, days: "1–2 business days (Local Loom Hub)" },
  "64": { state: "Tamil Nadu (Coimbatore Region)", metro: true, days: "2 business days" },
  "56": { state: "Karnataka (Bengaluru Urban)", metro: true, days: "2 business days" },
  "50": { state: "Telangana (Hyderabad Region)", metro: true, days: "2–3 business days" },
  "40": { state: "Maharashtra (Mumbai Region)", metro: true, days: "2–3 business days" },
  "11": { state: "Delhi NCR", metro: true, days: "2–3 business days" },
  "70": { state: "West Bengal (Kolkata Region)", metro: true, days: "3–4 business days" },
  "68": { state: "Kerala (Kochi Region)", metro: true, days: "2–3 business days" },
  "69": { state: "Kerala (Trivandrum Region)", metro: true, days: "2–3 business days" },
};

/**
 * Validates and checks domestic Indian shipping serviceability from Kanchipuram Hub.
 */
export function checkDomesticPincode(pin: string): PincodeValidationResult {
  const clean = pin.trim().replace(/\D/g, "");

  if (clean.length !== 6) {
    return {
      valid: false,
      pincode: pin,
      serviceable: false,
      codAvailable: false,
      expressAvailable: false,
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  const prefix = clean.slice(0, 2);
  const region = POSTAL_REGIONS[prefix];

  if (region) {
    return {
      valid: true,
      pincode: clean,
      serviceable: true,
      state: region.state,
      estimatedDays: region.days,
      codAvailable: true,
      expressAvailable: true,
      message: `Verified: Insured Air Delivery to ${region.state} within ${region.days}.`,
    };
  }

  // General fallback for all valid 6-digit Indian PIN codes
  return {
    valid: true,
    pincode: clean,
    serviceable: true,
    estimatedDays: "3–5 business days",
    codAvailable: true,
    expressAvailable: true,
    message: "Verified: Standard Insured Handloom Delivery available within 3–5 business days.",
  };
}

