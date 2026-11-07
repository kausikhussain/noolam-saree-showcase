"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Currency = "INR" | "USD" | "GBP" | "AED";

export const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number; label: string; prefix: boolean }> = {
  INR: { symbol: "₹", rate: 1, label: "INR (₹)", prefix: true },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)", prefix: true },
  GBP: { symbol: "£", rate: 0.0095, label: "GBP (£)", prefix: true },
  AED: { symbol: "AED ", rate: 0.044, label: "AED (د.إ)", prefix: true },
};

export type CartItem = {
  id: string;
  name: string;
  price: number; // always in base INR
  qty: number;
  type?: string;
  color?: string;
  size?: string;
  image?: string;
};

type BagContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string | null;
  promoError: string | null;
  currency: Currency;
  currencySymbol: string;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInInr: number) => string;
  add: (name: string, price: number, qty?: number, meta?: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearBag: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  liked: Set<string>;
  toggleLike: (k: string) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  isConciergeOpen: boolean;
  openConcierge: () => void;
  closeConcierge: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  triggerToast: (msg: string) => void;
};

const Ctx = createContext<BagContextType | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on client
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("noolam_cart");
      if (savedItems) setItems(JSON.parse(savedItems));

      const savedLikes = localStorage.getItem("noolam_likes");
      if (savedLikes) setLiked(new Set(JSON.parse(savedLikes)));

      const savedCurr = localStorage.getItem("noolam_currency") as Currency | null;
      if (savedCurr && CURRENCY_CONFIG[savedCurr]) setCurrencyState(savedCurr);
    } catch {}
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("noolam_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("noolam_likes", JSON.stringify(Array.from(liked)));
    } catch {}
  }, [liked]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("noolam_currency", c);
    } catch {}
  }, []);

  const triggerToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const formatPrice = useCallback(
    (amountInInr: number) => {
      const { symbol, rate, prefix } = CURRENCY_CONFIG[currency];
      const converted = Math.round(amountInInr * rate);
      const formatted = converted.toLocaleString("en-IN");
      return prefix ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
    },
    [currency]
  );

  const add = useCallback(
    (name: string, price: number, qty = 1, meta?: Partial<CartItem>) => {
      const id = meta?.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.id === id);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
          return updated;
        }
        return [
          ...prev,
          {
            id,
            name,
            price,
            qty,
            type: meta?.type || "SAREE",
            color: meta?.color,
            size: meta?.size,
            image: meta?.image,
          },
        ];
      });

      triggerToast(`${name} · added to bag`);
    },
    [triggerToast]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.qty + delta;
            return nextQty > 0 ? { ...i, qty: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const clearBag = useCallback(() => {
    setItems([]);
    setPromoCode(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NOOLAM10") {
      setPromoCode("NOOLAM10");
      setPromoError(null);
      return true;
    } else if (clean === "UTSAV") {
      setPromoCode("UTSAV");
      setPromoError(null);
      return true;
    } else {
      setPromoError("Invalid promotional code");
      return false;
    }
  }, []);

  const removePromo = useCallback(() => {
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const toggleLike = useCallback((k: string) => {
    setLiked((s) => {
      const n = new Set(s);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  }, []);

  // Calculations
  const count = items.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  let discount = 0;
  if (promoCode === "NOOLAM10") {
    discount = Math.round(subtotal * 0.1);
  } else if (promoCode === "UTSAV") {
    discount = subtotal >= 25000 ? 2000 : 0;
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        subtotal,
        discount,
        total,
        promoCode,
        promoError,
        currency,
        currencySymbol: CURRENCY_CONFIG[currency].symbol,
        setCurrency,
        formatPrice,
        add,
        removeItem,
        updateQty,
        clearBag,
        applyPromo,
        removePromo,
        liked,
        toggleLike,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        isConciergeOpen,
        openConcierge: () => setIsConciergeOpen(true),
        closeConcierge: () => setIsConciergeOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        triggerToast,
      }}
    >
      {children}
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </Ctx.Provider>
  );
}

export const useBag = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBag outside BagProvider");
  return c;
};
