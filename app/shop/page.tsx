import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";
import ShopCatalog from "@/components/ShopCatalog";
import { BagProvider } from "@/components/store";

export const metadata: Metadata = {
  title: "Boutique Collection · SUTRÉA",
  description: "Browse the complete collection of SUTRÉA handwoven pure mulberry silk sarees, bridal heirlooms, and bespoke blouses crafted on traditional pit looms.",
  keywords: ["Sutrea silk saree", "pure zari saree", "wedding pattu", "bridal kanjivaram", "buy silk saree online"],
};

export default function ShopPage() {
  return (
    <BagProvider>
      <Navbar />
      <main className="shop-page section">
        <header className="shop-header">
          <span className="eyebrow">THE COMPLETE ARCHIVE</span>
          <h1>The SUTRÉA Boutique</h1>
          <p className="shop-subtitle">
            Every weave is born from uncompromised mulberry silk and woven with real silver-core gold zari by generational master artisans.
          </p>
        </header>

        <ShopCatalog />
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

