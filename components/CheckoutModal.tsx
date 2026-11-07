"use client";
import { useState } from "react";
import { useBag } from "./store";
import { Close, Shield, Check, ArrowR, Truck } from "./Icons";

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, total, formatPrice, clearBag } = useBag();

  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    blouseStitching: "unstitched",
    giftPackaging: true,
  });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [orderId, setOrderId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in your name, contact phone, and delivery address.");
      return;
    }
    setStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `NLM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep("confirmed");
      clearBag();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={closeCheckout}>
      <div className="modal-container checkout-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="eyebrow">NOOLAM · PRIVATE CHECKOUT</span>
            <h3 className="modal-title">
              {step === "details" && "Delivery & Contact Information"}
              {step === "payment" && "Select Secure Payment"}
              {step === "confirmed" && "Order Confirmed & Placed"}
            </h3>
          </div>
          <button className="modal-close" onClick={closeCheckout} aria-label="Close modal">
            <Close size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== "confirmed" && (
          <div className="checkout-steps">
            <div className={`step-badge ${step === "details" ? "active" : "done"}`}>
              <span>1</span>
              <span>Delivery Details</span>
            </div>
            <div className="step-sep" />
            <div className={`step-badge ${step === "payment" ? "active" : ""}`}>
              <span>2</span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="modal-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Priyadharshini Sundaram"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone Number (WhatsApp Updates) *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address (For Tax Invoice & Tracking) *</label>
              <input
                required
                type="email"
                placeholder="priya@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                required
                rows={2}
                placeholder="House / Apartment no., Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>City *</label>
                <input
                  required
                  type="text"
                  placeholder="Chennai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  placeholder="600001"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>

            {/* Custom Options */}
            <div className="form-options-panel">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.giftPackaging}
                  onChange={(e) => setFormData({ ...formData, giftPackaging: e.target.checked })}
                />
                <span>Complimentary Luxury Gold-Embossed Silk Gift Box & Silk Care Card</span>
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={closeCheckout} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn btn-maroon btn-lg">
                <span>Continue to Payment</span>
                <span className="btn-dot"><ArrowR size={16} /></span>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && (
          <form onSubmit={handlePlaceOrder} className="modal-form">
            <div className="checkout-review-summary">
              <div className="review-row">
                <span>Shipping to:</span>
                <strong>{formData.name} ({formData.city}, {formData.pincode})</strong>
              </div>
              <div className="review-row">
                <span>Items in Order:</span>
                <span>{items.length} unique pieces</span>
              </div>
              <div className="review-row total">
                <span>Total Payable:</span>
                <span className="gold-text">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="payment-options">
              <label className={`payment-card ${paymentMethod === "upi" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <div className="payment-info">
                  <div className="payment-title">Instant UPI (Zero Convenience Fee)</div>
                  <div className="payment-desc">Pay instantly via Google Pay, PhonePe, Paytm, or BHIM QR</div>
                </div>
                <span className="popular-tag">MOST POPULAR</span>
              </label>

              <label className={`payment-card ${paymentMethod === "card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <div className="payment-info">
                  <div className="payment-title">Credit / Debit Card / NetBanking</div>
                  <div className="payment-desc">Visa, Mastercard, RuPay, Amex & All Major Indian Banks</div>
                </div>
              </label>

              <label className={`payment-card ${paymentMethod === "cod" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="payment-info">
                  <div className="payment-title">White-Glove Cash on Delivery / Showroom Pay</div>
                  <div className="payment-desc">Inspect your silk at home and pay upon verified delivery</div>
                </div>
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={() => setStep("details")} className="btn-cancel">
                ← Back
              </button>
              <button type="submit" disabled={isProcessing} className="btn btn-maroon btn-lg">
                <span>{isProcessing ? "Processing Secure Order..." : `Pay & Place Order · ${formatPrice(total)}`}</span>
                <span className="btn-dot"><Check size={16} /></span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed */}
        {step === "confirmed" && (
          <div className="order-confirmed-view">
            <div className="confirmed-icon-wrap">
              <Check size={40} className="gold-text" />
            </div>
            <span className="eyebrow center">OFFICIAL WEAVING RECEIPT</span>
            <h2>Thank You, {formData.name || "Patron"}</h2>
            <p className="order-id-label">
              Order Reference: <strong>#{orderId}</strong>
            </p>
            <p className="order-note">
              Your heirloom Kanchipuram silk order has been reserved on our Master Loom register.
              An official dispatch confirmation with tracking details and Silk Mark certificate has been dispatched to <strong>{formData.email}</strong>.
            </p>

            <div className="confirmed-details-card">
              <div className="detail-item">
                <Truck size={20} />
                <div>
                  <strong>Estimated Delivery: 2–3 Business Days</strong>
                  <span>Insured Express Courier to {formData.city}, {formData.pincode}</span>
                </div>
              </div>
              <div className="detail-item">
                <Shield size={20} />
                <div>
                  <strong>Silk Mark Certified Authentication</strong>
                  <span>Individual QR code certificate included in your heirloom box</span>
                </div>
              </div>
            </div>

            <div className="confirmed-actions">
              <a
                href={`https://wa.me/?text=Hello%20NOOLAM,%20I%20have%20placed%20order%20%23${orderId}.%20Please%20share%20weaving%20updates.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-maroon"
              >
                <span>Track via WhatsApp Concierge</span>
                <span className="btn-dot"><ArrowR size={15} /></span>
              </a>
              <button onClick={closeCheckout} className="btn btn-white">
                <span>Continue Browsing Collections</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
