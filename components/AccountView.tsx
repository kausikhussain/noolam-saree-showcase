"use client";
import { useState } from "react";
import { useBag } from "@/components/store";
import { User, Bag, Heart, Shield, Sparkles, Truck, ArrowR, Check } from "@/components/Icons";
import Link from "next/link";
import { rack } from "@/lib/data";

export default function AccountView() {
  const { liked, add, formatPrice, openCart } = useBag();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "concierge">("orders");

  const patron = {
    name: "Sangeetha Sundaram",
    email: "sangeetha.sundaram@patron.sutrea.com",
    phone: "+91 98400 54321",
    tier: "Heirloom Guild Patron",
    memberSince: "November 2026",
  };

  const sampleOrders = [
    {
      id: "STR-884210",
      date: "Nov 16, 2026",
      items: "Sutréa Rose Check Kanjivaram (Bespoke Stitched)",
      total: 21500,
      status: "In Priority Air Transit",
      carrier: "Blue Dart Air (AWB: 48920194012)",
      silkMarkVerified: true,
    },
    {
      id: "STR-712049",
      date: "Nov 02, 2026",
      items: "Sutréa Temple Gold Brocade Saree",
      total: 32000,
      status: "Delivered to Residence",
      carrier: "Delhivery Express",
      silkMarkVerified: true,
    },
  ];

  const likedProducts = rack.filter((item) => {
    const handle = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return liked.has(handle);
  });

  return (
    <div className="account-container">
      {/* Patron Hero Card */}
      <div className="account-hero-card">
        <div className="account-avatar">
          <User size={32} />
        </div>
        <div className="account-hero-info">
          <div className="patron-tier-badge">
            <Sparkles size={13} />
            <span>{patron.tier}</span>
          </div>
          <h1 className="account-name">{patron.name}</h1>
          <p className="account-meta">
            {patron.email} · {patron.phone} · Member since {patron.memberSince}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="account-tabs">
        <button
          className={`account-tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders &amp; Loom Tracking ({sampleOrders.length})
        </button>
        <button
          className={`account-tab-btn ${activeTab === "wishlist" ? "active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          Saved Heirlooms ({liked.size})
        </button>
        <button
          className={`account-tab-btn ${activeTab === "addresses" ? "active" : ""}`}
          onClick={() => setActiveTab("addresses")}
        >
          Delivery Coordinates
        </button>
        <button
          className={`account-tab-btn ${activeTab === "concierge" ? "active" : ""}`}
          onClick={() => setActiveTab("concierge")}
        >
          Private Consultations
        </button>
      </div>

      {/* Tab Content */}
      <div className="account-tab-body">
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="orders-panel">
            {sampleOrders.map((ord) => (
              <div key={ord.id} className="order-history-card">
                <div className="order-history-header">
                  <div>
                    <span className="order-ref">Order Reference: <strong>#{ord.id}</strong></span>
                    <span className="order-date">Placed on {ord.date}</span>
                  </div>
                  <div className="order-status-badge">
                    <Truck size={14} />
                    <span>{ord.status}</span>
                  </div>
                </div>

                <div className="order-history-body">
                  <h4>{ord.items}</h4>
                  <p className="order-carrier-note">Courier: {ord.carrier}</p>
                  <div className="order-price-line">
                    <span>Total Amount Paid:</span>
                    <strong>{formatPrice(ord.total)}</strong>
                  </div>
                </div>

                <div className="order-history-footer">
                  <div className="order-silk-mark">
                    <Shield size={16} />
                    <span>Silk Mark India Authenticated Seal Included</span>
                  </div>
                  <a
                    href={`https://wa.me/919840012345?text=Hello%20SUTRÉA,%20requesting%20dispatch%20status%20for%20order%20%23${ord.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="order-track-link"
                  >
                    <span>Track on WhatsApp Concierge →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="account-wishlist-panel">
            {likedProducts.length === 0 ? (
              <div className="account-empty-state">
                <Heart size={36} className="empty-heart" />
                <h3>Your saved heirloom drawer is empty</h3>
                <p>Explore the boutique and click the heart icon on any saree to save it here.</p>
                <Link href="/shop" className="btn btn-maroon">
                  <span>Browse Boutique</span>
                  <span className="btn-dot"><ArrowR size={15} /></span>
                </Link>
              </div>
            ) : (
              <div className="account-wishlist-grid">
                {likedProducts.map((p) => {
                  const handle = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <div key={p.name} className="account-wishlist-card">
                      <div className="account-swatch-box" style={{ background: p.colors[0] }}>
                        <span>⚜</span>
                      </div>
                      <div className="account-wishlist-info">
                        <h4>{p.name}</h4>
                        <span className="wishlist-price">{formatPrice(p.price)}</span>
                      </div>
                      <div className="account-wishlist-actions">
                        <button
                          onClick={() => {
                            add(p.name, p.price, 1, { type: "HEIRLOOM SILK", color: p.colors[0] });
                            openCart();
                          }}
                          className="btn btn-maroon btn-sm"
                        >
                          <Bag size={14} />
                          <span>Add to Bag</span>
                        </button>
                        <Link href={`/product/${handle}`} className="btn btn-white btn-sm">
                          <span>View Detail</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div className="addresses-panel">
            <div className="address-card default">
              <span className="address-type-badge">Primary Residence</span>
              <h4>Sangeetha Sundaram</h4>
              <p>
                Flat 4B, The Heritage Mansions, Poes Garden,<br />
                Chennai, Tamil Nadu – 600086, India.<br />
                Phone: +91 98400 54321
              </p>
              <div className="address-actions">
                <button className="address-btn">Edit Address</button>
              </div>
            </div>

            <div className="address-card">
              <span className="address-type-badge">Wedding Venue / Trousseau Delivery</span>
              <h4>Sangeetha Sundaram</h4>
              <p>
                Sri Sankara Kalyana Mandapam, Gandhi Road,<br />
                Kanchipuram, Tamil Nadu – 631501, India.<br />
                Phone: +91 98400 54321
              </p>
              <div className="address-actions">
                <button className="address-btn">Edit Address</button>
              </div>
            </div>
          </div>
        )}

        {/* Concierge Tab */}
        {activeTab === "concierge" && (
          <div className="concierge-panel">
            <div className="consultation-card">
              <div className="consult-date-badge">
                <span className="month">NOV</span>
                <span className="day">22</span>
              </div>
              <div className="consult-details">
                <span className="consult-status">CONFIRMED VIDEO SESSION</span>
                <h4>1-on-1 Bridal Muhurtham Consultation</h4>
                <p>Sunday, November 22, 2026 at 4:30 PM IST · With Master Weaver K. Sundaram</p>
                <span className="consult-channel">Connecting via High-Definition WhatsApp Video Call</span>
              </div>
              <a
                href="https://wa.me/919840012345?text=Hello%20SUTRÉA,%20confirming%20my%20video%20appointment%20for%20Nov%2022"
                target="_blank"
                rel="noreferrer"
                className="btn btn-maroon btn-sm"
              >
                <span>WhatsApp Room →</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
