"use client";
import { useState } from "react";
import { CatalogProduct } from "@/lib/data";
import { useBag } from "@/components/store";
import { Bag, Heart, Shield, Sparkles, Truck, Check, ArrowR } from "@/components/Icons";
import Link from "next/link";

export default function ProductDetailView({ product }: { product: CatalogProduct }) {
  const { add, formatPrice, liked, toggleLike, openCart } = useBag();
  const isLiked = liked.has(product.handle);

  const [selectedBlouse, setSelectedBlouse] = useState("unstitched");
  const [selectedSize, setSelectedSize] = useState("38");
  const [activeTab, setActiveTab] = useState<"specs" | "authenticity" | "shipping" | "care">("specs");
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    add(product.name, product.price, 1, {
      id: product.handle,
      type: product.category,
      color: product.colors[0],
      size: selectedBlouse !== "unstitched" ? `Stitched (${selectedSize})` : "Unstitched Fabric",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const whatsappMsg = encodeURIComponent(
    `Hello SUTRÉA Concierge, I am interested in acquiring the "${product.name}" (${formatPrice(product.price)}). Could you share a high-definition video of the drape and pallu?`
  );

  return (
    <div className="pdp-container">
      {/* Breadcrumbs */}
      <nav className="pdp-breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Boutique</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="pdp-layout">
        {/* Left: Visual Presentation & Fabric Swatch */}
        <div className="pdp-visual-column">
          <div className="pdp-hero-swatch" style={{ background: product.colors[0] }}>
            <div
              className="pdp-swatch-gradient"
              style={{
                background: `linear-gradient(135deg, ${product.colors[0]} 0%, ${product.colors[1]} 55%, ${product.colors[2]} 100%)`,
              }}
            />
            <div className="pdp-zari-frame" style={{ borderColor: product.colors[2] }} />
            <div className="pdp-visual-overlay">
              <span className="pdp-swatch-crest">⚜</span>
              <span className="pdp-pattern-pill">{product.pattern.toUpperCase()} WEAVE</span>
            </div>
          </div>

          <div className="pdp-swatch-palette">
            <span className="palette-label">Weft & Warp Color Palette:</span>
            <div className="palette-dots">
              <div className="palette-dot" style={{ background: product.colors[0] }} title="Body Silk" />
              <div className="palette-dot" style={{ background: product.colors[1] }} title="Pallu / Accent" />
              <div className="palette-dot" style={{ background: product.colors[2] }} title="Metallic Zari" />
            </div>
          </div>

          <div className="pdp-assurance-card">
            <div className="assurance-item">
              <Shield size={18} className="gold" />
              <div>
                <strong>Silk Mark India Authorized Seal</strong>
                <span>100% Guaranteed pure natural mulberry silk</span>
              </div>
            </div>
            <div className="assurance-item">
              <Truck size={18} className="gold" />
              <div>
                <strong>Complimentary Express Air Dispatch</strong>
                <span>Fully insured transit across India & worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Purchasing Details & Tailoring */}
        <div className="pdp-info-column">
          <span className="eyebrow">SUTRÉA HEIRLOOM MASTERPIECE</span>
          <h1 className="pdp-title">{product.name}</h1>
          <div className="pdp-price-row">
            <span className="pdp-price">{formatPrice(product.price)}</span>
            <span className="pdp-tax-note">(Inclusive of all statutory GST & insured domestic air shipping)</span>
          </div>

          <p className="pdp-description">{product.description}</p>

          {/* Tailoring & Customization */}
          <div className="pdp-customization-section">
            <h4 className="custom-heading">Blouse Tailoring Customization</h4>
            <div className="tailor-options">
              <label className={`tailor-option-card ${selectedBlouse === "unstitched" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="blouse"
                  checked={selectedBlouse === "unstitched"}
                  onChange={() => setSelectedBlouse("unstitched")}
                />
                <div>
                  <strong>Unstitched Silk Blouse Piece (Included)</strong>
                  <span>Standard 80cm matching unstitched blouse fabric</span>
                </div>
              </label>

              <label className={`tailor-option-card ${selectedBlouse === "tailored" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="blouse"
                  checked={selectedBlouse === "tailored"}
                  onChange={() => setSelectedBlouse("tailored")}
                />
                <div>
                  <strong>Master Tailored with Cotton Lining (+3 Days)</strong>
                  <span>Padded lining with hand-finished piping & dori</span>
                </div>
              </label>
            </div>

            {selectedBlouse === "tailored" && (
              <div className="size-selector-panel">
                <span className="size-label">Select Standard Bust Size:</span>
                <div className="size-pill-row">
                  {["34", "36", "38", "40", "42"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`size-pill ${selectedSize === sz ? "on" : ""}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Actions */}
          <div className="pdp-actions-row">
            <button
              onClick={handleAddToCart}
              className="btn btn-maroon btn-lg pdp-buy-btn"
            >
              <Bag size={18} />
              <span>{added ? "Added to Heirloom Bag ✓" : "Acquire This Weave"}</span>
              <span className="btn-dot"><ArrowR size={15} /></span>
            </button>

            <button
              onClick={() => toggleLike(product.handle)}
              className={`pdp-heart-btn ${isLiked ? "liked" : ""}`}
              aria-label="Save to wishlist"
              title={isLiked ? "Saved in Wishlist" : "Save to Wishlist"}
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Live Concierge Deep-link */}
          <a
            href={`https://wa.me/919840012345?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="pdp-concierge-link"
          >
            <Sparkles size={16} />
            <span>Consult Master Draper on WhatsApp Live Video →</span>
          </a>

          {/* Detail Tabs */}
          <div className="pdp-tabs">
            <div className="pdp-tab-headers">
              <button
                className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </button>
              <button
                className={`tab-btn ${activeTab === "authenticity" ? "active" : ""}`}
                onClick={() => setActiveTab("authenticity")}
              >
                Silk Mark Authenticity
              </button>
              <button
                className={`tab-btn ${activeTab === "shipping" ? "active" : ""}`}
                onClick={() => setActiveTab("shipping")}
              >
                Air Delivery &amp; Returns
              </button>
              <button
                className={`tab-btn ${activeTab === "care" ? "active" : ""}`}
                onClick={() => setActiveTab("care")}
              >
                Care Guide
              </button>
            </div>

            <div className="pdp-tab-content">
              {activeTab === "specs" && (
                <div className="tab-pane">
                  <div className="spec-row"><span>Weave Method:</span> <strong>Traditional Pit-Loom Korvai Interlocking</strong></div>
                  <div className="spec-row"><span>Fabric:</span> <strong>{product.fabric}</strong></div>
                  <div className="spec-row"><span>Zari Metallurgy:</span> <strong>{product.zari}</strong></div>
                  <div className="spec-row"><span>Origin:</span> <strong>{product.origin}</strong></div>
                  <div className="spec-row"><span>Dimensions:</span> <strong>6.2 Meters (including 80cm blouse)</strong></div>
                  <div className="spec-row"><span>Weight:</span> <strong>Approximately 750g – 850g</strong></div>
                </div>
              )}

              {activeTab === "authenticity" && (
                <div className="tab-pane">
                  <p>
                    Every SUTRÉA saree ships with an official <strong>Silk Mark India</strong> security tag with an authorized QR code issued by the Silk Mark Organisation of India (SMOI).
                  </p>
                  <p>
                    Our master pit looms never blend synthetic fibers. The metallic threads are crafted with silver cores and genuine 24-karat gold electroplating.
                  </p>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="tab-pane">
                  <p>
                    <strong>Domestic India:</strong> Ready-to-ship orders dispatch in 24–48 hours via Blue Dart Air (2–3 business days transit). 100% insured against loss.
                  </p>
                  <p>
                    <strong>Worldwide:</strong> Express delivery to the US, UK, UAE, and Singapore via DHL Express (4–7 business days).
                  </p>
                  <p>
                    <strong>7-Day Returns:</strong> If you are not enchanted by the drape, request a complimentary exchange within 7 days of delivery.
                  </p>
                </div>
              )}

              {activeTab === "care" && (
                <div className="tab-pane">
                  <p>
                    • Professional hydrocarbon dry clean only.<br />
                    • Store inside unbleached muslin/cotton covers.<br />
                    • Unfold and rotate crease lines every 4 to 6 months.<br />
                    • Never apply perfumes directly onto pure gold zari.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
