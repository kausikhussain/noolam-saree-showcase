"use client";
import { useState } from "react";
import { useBag } from "./store";
import { Close, Shield, Sparkles, Bag, Video, Check } from "./Icons";
import { inr } from "@/lib/data";

export interface SareeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number;
    colors: [string, string, string];
    pattern: string;
    sku?: string;
  } | null;
}

export default function ProductDetailModal({ isOpen, onClose, product }: SareeDetailProps) {
  const { add, openCart, openConcierge, formatPrice } = useBag();
  const [blouseOption, setBlouseOption] = useState<"unstitched" | "stitched" | "custom">("unstitched");
  const [stitchedSize, setStitchedSize] = useState("38");
  const [customNotes, setCustomNotes] = useState("");

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const sizeLabel = blouseOption === "unstitched" ? "Unstitched Blouse Piece (80cm)" : blouseOption === "stitched" ? `Stitched Blouse (Size ${stitchedSize})` : `Bespoke Tailoring (${customNotes || "Measurements on WhatsApp"})`;
    add(product.title, product.price, 1, {
      id: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type: "PURE KANCHIPURAM SILK",
      color: product.colors[0],
      size: sizeLabel,
    });
    onClose();
    openCart();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container pdp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="eyebrow">NOOLAM · HEIRLOOM SPECIFICATION</span>
            <h3 className="modal-title">{product.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <Close size={20} />
          </button>
        </div>

        <div className="pdp-body">
          {/* Swatch & Visual Anchor */}
          <div className="pdp-hero-row">
            <div className="pdp-color-swatches">
              <div className="pdp-swatch-box" style={{ background: product.colors[0] }} title="Body Silk Color">
                <span>Body</span>
              </div>
              <div className="pdp-swatch-box" style={{ background: product.colors[1] }} title="Pallu / Accent Silk Color">
                <span>Pallu</span>
              </div>
              <div className="pdp-swatch-box zari" style={{ background: product.colors[2] }} title="Temple Zari Border">
                <span>Zari</span>
              </div>
            </div>
            <div className="pdp-price-wrap">
              <span className="pdp-price">{formatPrice(product.price)}</span>
              <span className="pdp-tax-note">Inclusive of all taxes · Free Insured Air Shipping</span>
            </div>
          </div>

          {/* Master Weave Specs */}
          <div className="pdp-specs-grid">
            <div className="spec-card">
              <Shield size={18} className="gold-text" />
              <div>
                <strong>Silk Mark Certified</strong>
                <span>100% Pure Natural Mulberry Silk</span>
              </div>
            </div>
            <div className="spec-card">
              <Sparkles size={18} className="gold-text" />
              <div>
                <strong>Zari Specification</strong>
                <span>Pure Silver Core dipped in 24k Gold Electroplate</span>
              </div>
            </div>
            <div className="spec-card">
              <span className="spec-icon">⚖</span>
              <div>
                <strong>Total Fabric Weight</strong>
                <span>~780 grams (Heavy Handloom Draping)</span>
              </div>
            </div>
            <div className="spec-card">
              <span className="spec-icon">📐</span>
              <div>
                <strong>Dimensions</strong>
                <span>5.5 Meters Saree + 80 cm Running Blouse</span>
              </div>
            </div>
          </div>

          {/* Blouse Tailoring Options */}
          <div className="pdp-tailoring-section">
            <h4>Blouse Tailoring Services</h4>
            <div className="tailoring-options">
              <label className={`tailor-card ${blouseOption === "unstitched" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="blouse"
                  checked={blouseOption === "unstitched"}
                  onChange={() => setBlouseOption("unstitched")}
                />
                <div>
                  <strong>Unstitched Blouse Piece (Included)</strong>
                  <span>80cm matching pure silk fabric attached to the pallu</span>
                </div>
              </label>

              <label className={`tailor-card ${blouseOption === "stitched" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="blouse"
                  checked={blouseOption === "stitched"}
                  onChange={() => setBlouseOption("stitched")}
                />
                <div>
                  <strong>Standard Tailored Stitching (+₹1,800)</strong>
                  <span>Traditional round-neck with gold piping & cotton lining</span>
                </div>
              </label>

              {blouseOption === "stitched" && (
                <div className="size-selector-row">
                  <span>Select Bust Size (inches):</span>
                  <div className="size-chips">
                    {["34", "36", "38", "40", "42"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`size-chip ${stitchedSize === sz ? "active" : ""}`}
                        onClick={() => setStitchedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="pdp-care-note">
            <strong>Preservation Guide:</strong> Dry clean only. Wrap loosely in breathable pure unbleached muslin cloth. Air the drape in shade twice a year to preserve metallic zari lustre.
          </div>

          {/* Actions */}
          <div className="pdp-actions">
            <button onClick={handleAddToCart} className="btn btn-maroon btn-lg grow">
              <span>Add to Shopping Bag</span>
              <span className="btn-dot"><Bag size={16} /></span>
            </button>
            <button
              onClick={() => {
                onClose();
                openConcierge();
              }}
              className="btn btn-white btn-lg"
              title="Request 1-on-1 video call to see this saree draped on camera"
            >
              <Video size={16} />
              <span>Video Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

