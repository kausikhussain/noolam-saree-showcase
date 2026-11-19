import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";
import { BagProvider } from "@/components/store";
import Link from "next/link";
import { ArrowR } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Heirloom Silk Care Guide · SUTRÉA",
  description: "Essential care, storage, and preservation rituals to ensure your pure handloom silk and 24-karat gold zari sarees endure for generations.",
};

export default function CarePage() {
  const rituals = [
    {
      title: "Storage in Breathable Cotton",
      desc: "Store your sarees in unbleached pure cotton or muslin bags. Never store pure silk in airtight plastic covers, as natural protein fibers need to breathe to prevent yellowing and moisture accumulation.",
    },
    {
      title: "The Biannual Crease Rotation",
      desc: "Pure zari contains delicate silver wire. To prevent fiber fatigue along sharp crease lines, unfold your sarees every 4 to 6 months and fold them along alternate axes.",
    },
    {
      title: "Professional Hydrocarbon Dry Clean Only",
      desc: "Never immerse pure silk or metallic zari in water or domestic detergents. Always utilize professional dry cleaners specialized in bridal handloom restoration.",
    },
    {
      title: "Shield From Direct Perfumes",
      desc: "Apply perfumes, cosmetics, and hairsprays completely before draping. Direct contact with alcohol, chemical mists, or sweat can tarnish pure silver-plated zari.",
    },
    {
      title: "Gentle Ironing & Steaming",
      desc: "Always iron on the reverse silk setting with a thin cotton cloth placed between the iron and the fabric. Vertical steam pressing is ideal for softening folds without flattening zari relief.",
    },
    {
      title: "Natural Cedar & Neem Repellents",
      desc: "Place dried neem leaves or pure cedar blocks in your wardrobe. Never let chemical mothballs or naphthalene balls make direct contact with raw silk fibers.",
    },
  ];

  return (
    <BagProvider>
      <Navbar />
      <main className="care-page section">
        <header className="care-header">
          <span className="eyebrow">PRESERVING AN HEIRLOOM</span>
          <h1>Heirloom Silk Care Rituals</h1>
          <p className="care-lead">
            A genuine handwoven saree is engineered to outlive generations. With proper guardianship and traditional preservation rituals, your SUTRÉA piece will retain its lustre for centuries.
          </p>
        </header>

        <div className="care-grid">
          {rituals.map((r, i) => (
            <div key={i} className="care-card">
              <span className="care-card-number">0{i + 1}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="care-footer-card">
          <h3>Need Professional Restoration Advice?</h3>
          <p>
            Our master drapers and fabric custodians are available via WhatsApp concierge to assist with crease restoration, dry cleaning guidelines, or emergency stain care.
          </p>
          <Link href="/policies/contact" className="btn btn-maroon">
            <span>Contact The Concierge</span>
            <span className="btn-dot"><ArrowR size={15} /></span>
          </Link>
        </div>
      </main>
      <Footer />
      <Ticker />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <VideoConciergeModal />
      <FloatingConcierge />
    </BagProvider>
  );
}

