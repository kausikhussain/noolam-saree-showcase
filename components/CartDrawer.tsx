"use client";
import { useState } from "react";
import { useBag } from "./store";
import { Close, Trash, Plus, ArrowR, Shield, Sparkles, Truck } from "./Icons";
import CurrencySelector from "./CurrencySelector";

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    discount,
    total,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    updateQty,
    removeItem,
    formatPrice,
    isCartOpen,
    closeCart,
    openCheckout,
  } = useBag();

  const [inputCode, setInputCode] = useState("");
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const ok = applyPromo(inputCode);
    if (ok) setInputCode("");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPinResult(`✓ Pincode ${pincode} verified: Complimentary 48-hr Express Delivery Available`);
    } else {
      setPinResult("Please enter a valid 6-digit Indian PIN code");
    }
  };

  return (
    <div className="drawer-overlay" onClick={closeCart}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3 className="drawer-title">YOUR SHOPPING BAG</h3>
            <span className="drawer-count">{count} {count === 1 ? "piece" : "pieces"}</span>
          </div>
          <div className="drawer-header-actions">
            <CurrencySelector />
            <button className="drawer-close" onClick={closeCart} aria-label="Close bag">
              <Close size={20} />
            </button>
          </div>
        </div>

        {/* Value Prop Banner */}
        <div className="drawer-banner">
          <Sparkles size={15} />
          <span>Silk Mark Certified Pure Kanchipuram Handloom · Free Insured Air Shipping</span>
        </div>

        {/* Content Body */}
        {items.length === 0 ? (
          <div className="drawer-empty">
            <div className="empty-ornament">⚜</div>
            <h4>Your silk bag is empty</h4>
            <p>Heirloom Kanchipuram silks handwoven on heritage pit looms await you.</p>
            <a href="#rack" onClick={closeCart} className="btn btn-maroon">
              <span>Explore The Rail</span>
              <span className="btn-dot"><ArrowR size={15} /></span>
            </a>
          </div>
        ) : (
          <div className="drawer-body">
            {/* Items List */}
            <div className="drawer-items">
              {items.map((item) => (
                <div key={item.id} className="cart-card">
                  <div
                    className="cart-card-swatch"
                    style={{ background: item.color || "#8e1a30" }}
                  >
                    <span className="swatch-symbol">⚜</span>
                  </div>
                  <div className="cart-card-info">
                    <span className="cart-card-type">{item.type || "HERITAGE SILK"}</span>
                    <h4 className="cart-card-name">{item.name}</h4>
                    {item.size && <span className="cart-card-size">Size: {item.size}</span>}
                    <div className="cart-card-price">{formatPrice(item.price * item.qty)}</div>
                  </div>
                  <div className="cart-card-actions">
                    <div className="qty-control">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cart-remove-btn"
                      title="Remove item"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pincode Estimator */}
            <div className="drawer-pincode">
              <div className="pincode-header">
                <Truck size={15} />
                <span>Check Delivery & Pincode Serviceability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="pincode-input"
                />
                <button type="submit" className="pincode-submit">Verify</button>
              </form>
              {pinResult && <p className="pincode-result">{pinResult}</p>}
            </div>

            {/* Promo Code */}
            <div className="drawer-promo">
              {promoCode ? (
                <div className="promo-applied">
                  <div className="promo-badge">
                    <span>Code <strong>{promoCode}</strong> applied</span>
                    <button onClick={removePromo} className="promo-remove" title="Remove code">×</button>
                  </div>
                  <span className="promo-save">- {formatPrice(discount)}</span>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. NOOLAM10)"
                    className="promo-input"
                  />
                  <button type="submit" className="promo-submit">Apply</button>
                </form>
              )}
              {promoError && <p className="promo-error">{promoError}</p>}
              {!promoCode && (
                <div className="promo-suggestions">
                  <button type="button" onClick={() => applyPromo("NOOLAM10")} className="promo-chip">
                    Use <strong>NOOLAM10</strong> for 10% off
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="drawer-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Special Discount</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Insured White-Glove Air Shipping</span>
                <span className="green-text">FREE</span>
              </div>
              <div className="summary-row">
                <span>Handloom Silk Mark Authenticity</span>
                <span className="green-text">INCLUDED</span>
              </div>
              <div className="summary-total-row">
                <span>Total Amount</span>
                <span className="summary-total-val">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="drawer-footer">
              <button onClick={openCheckout} className="btn btn-maroon btn-lg checkout-btn">
                <span>Proceed to Secure Checkout</span>
                <span className="btn-dot"><ArrowR size={18} /></span>
              </button>
              <div className="drawer-trust-badges">
                <span className="trust-item"><Shield size={14} /> 256-Bit SSL Secured</span>
                <span className="trust-item">✦ 100% Genuine Handloom</span>
                <span className="trust-item">↺ 7-Day Silk Exchange</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
