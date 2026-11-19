"use client";
import { useState } from "react";
import { useBag } from "@/components/store";
import { Shield, Check, ArrowR, Truck, Sparkles } from "@/components/Icons";
import Link from "next/link";

export default function FullCheckoutView() {
  const { items, total, subtotal, discount, formatPrice, clearBag } = useBag();

  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    giftPackaging: true,
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [orderId, setOrderId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please enter your name, contact phone number, and delivery coordinates.");
      return;
    }
    setStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `STR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep("confirmed");
      clearBag();
    }, 1200);
  };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="checkout-empty-state">
        <Sparkles size={40} className="gold" />
        <h2>Your Shopping Bag is Empty</h2>
        <p>Select your desired heirlooms from our curated boutique before proceeding to checkout.</p>
        <Link href="/shop" className="btn btn-maroon btn-lg">
          <span>Explore The Boutique</span>
          <span className="btn-dot"><ArrowR size={15} /></span>
        </Link>
      </div>
    );
  }

  return (
    <div className="full-checkout-container">
      {/* Header */}
      <header className="checkout-page-header">
        <span className="eyebrow">SUTRÉA PRIVATE CLIENT CONCIERGE</span>
        <h1>Private Luxury Checkout</h1>
      </header>

      {/* Steps Progress */}
      {step !== "confirmed" && (
        <div className="checkout-progress-bar">
          <div className={`checkout-step-pill ${step === "details" ? "active" : "done"}`}>
            <span className="step-num">1</span>
            <span>Patron &amp; Delivery Details</span>
          </div>
          <div className="checkout-step-divider" />
          <div className={`checkout-step-pill ${step === "payment" ? "active" : ""}`}>
            <span className="step-num">2</span>
            <span>Payment &amp; Review</span>
          </div>
        </div>
      )}

      {/* Main Grid */}
      {step !== "confirmed" ? (
        <div className="full-checkout-grid">
          {/* Left Form */}
          <div className="checkout-form-column">
            {step === "details" && (
              <form onSubmit={handleDetailsSubmit} className="checkout-main-form">
                <h3 className="form-section-title">1. Delivery Coordinates &amp; Contact</h3>
                <div className="form-row-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sangeetha Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone Number (WhatsApp Updates) *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Email Address (For Tax Invoice &amp; Silk Mark Certificate) *</label>
                  <input
                    required
                    type="email"
                    placeholder="patron@sutrea.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House / Apartment no., Street, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="form-row-3">
                  <div className="form-field">
                    <label>City *</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Pincode *</label>
                    <input
                      required
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>
                </div>

                <div className="packaging-preference">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={formData.giftPackaging}
                      onChange={(e) => setFormData({ ...formData, giftPackaging: e.target.checked })}
                    />
                    <span>Complimentary Gold-Embossed Heirloom Gift Box &amp; Cedar Sachet</span>
                  </label>
                </div>

                <div className="checkout-btn-row">
                  <button type="submit" className="btn btn-maroon btn-lg">
                    <span>Continue to Payment Selection</span>
                    <span className="btn-dot"><ArrowR size={16} /></span>
                  </button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePlaceOrder} className="checkout-main-form">
                <h3 className="form-section-title">2. Select Payment Method</h3>
                <div className="payment-cards-stack">
                  <label className={`payment-method-tile ${paymentMethod === "upi" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <div className="tile-content">
                      <div className="tile-header">
                        <strong>Instant UPI Payment (Zero Fee)</strong>
                        <span className="popular-badge">MOST POPULAR</span>
                      </div>
                      <p>Google Pay, PhonePe, Paytm, BHIM or any banking UPI app</p>
                    </div>
                  </label>

                  <label className={`payment-method-tile ${paymentMethod === "card" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <div className="tile-content">
                      <div className="tile-header">
                        <strong>Credit / Debit Card / NetBanking</strong>
                      </div>
                      <p>Visa, MasterCard, RuPay, Amex &amp; all major Indian banks</p>
                    </div>
                  </label>

                  <label className={`payment-method-tile ${paymentMethod === "cod" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <div className="tile-content">
                      <div className="tile-header">
                        <strong>White-Glove Cash on Delivery / Showroom Pay</strong>
                      </div>
                      <p>Inspect your saree at doorstep and settle payment upon verified handoff</p>
                    </div>
                  </label>
                </div>

                <div className="checkout-btn-row">
                  <button type="button" onClick={() => setStep("details")} className="btn btn-white">
                    <span>← Edit Delivery Address</span>
                  </button>
                  <button type="submit" disabled={isProcessing} className="btn btn-maroon btn-lg">
                    <span>{isProcessing ? "Processing Secure Order..." : `Pay & Place Order · ${formatPrice(total)}`}</span>
                    <span className="btn-dot"><Check size={16} /></span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="checkout-summary-column">
            <div className="summary-box">
              <h3>Order Ledger ({items.length} pieces)</h3>
              <div className="summary-items-list">
                {items.map((item) => (
                  <div key={item.id} className="summary-item-row">
                    <div className="item-swatch-thumb" style={{ background: item.color || "#6B3A3A" }}>
                      <span>⚜</span>
                    </div>
                    <div className="item-meta">
                      <strong>{item.name}</strong>
                      <span>Qty: {item.qty} {item.size ? `· ${item.size}` : ""}</span>
                    </div>
                    <span className="item-price">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Promotional Benefit</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="summary-line">
                  <span>Priority Air Freight</span>
                  <span className="free-tag">COMPLIMENTARY</span>
                </div>
                <div className="summary-line">
                  <span>Silk Mark India QR Certificate</span>
                  <span className="free-tag">INCLUDED</span>
                </div>
                <div className="summary-total-line">
                  <span>Total Payable</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>

              <div className="summary-trust-footer">
                <div className="trust-badge-row">
                  <Shield size={16} />
                  <span>256-Bit SSL Bank Encrypted Checkout</span>
                </div>
                <div className="trust-badge-row">
                  <Truck size={16} />
                  <span>Insured Priority Transit from Kanchipuram Looms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmed Order State */
        <div className="checkout-confirmed-box">
          <div className="confirmed-check-crest">
            <Check size={48} className="gold" />
          </div>
          <span className="eyebrow center">OFFICIAL WEAVING RECEIPT</span>
          <h2>Thank You, {formData.name || "Patron"}</h2>
          <p className="order-confirmed-ref">
            Master Loom Order Reference: <strong>#{orderId}</strong>
          </p>
          <p className="order-confirmed-desc">
            Your heirloom silk has been officially reserved on the SUTRÉA Master Loom register.
            A confirmation invoice with your individual Silk Mark serial number has been dispatched to <strong>{formData.email}</strong>.
          </p>

          <div className="confirmed-dispatch-card">
            <div className="dispatch-row">
              <Truck size={22} className="gold" />
              <div>
                <strong>Estimated Air Delivery: 2–3 Business Days</strong>
                <span>Direct express dispatch to {formData.city}, {formData.pincode}</span>
              </div>
            </div>
            <div className="dispatch-row">
              <Shield size={22} className="gold" />
              <div>
                <strong>Silk Mark Certified Pure Natural Mulberry Silk</strong>
                <span>Official government-issued authenticity seal included in your presentation box</span>
              </div>
            </div>
          </div>

          <div className="confirmed-cta-group">
            <a
              href={`https://wa.me/919840012345?text=Hello%20SUTRÉA,%20I%20have%20placed%20order%20%23${orderId}.%20Please%20share%20weaving%20updates.`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-maroon btn-lg"
            >
              <span>Track via WhatsApp Concierge</span>
              <span className="btn-dot"><ArrowR size={15} /></span>
            </a>
            <Link href="/shop" className="btn btn-white btn-lg">
              <span>Return to Boutique</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
