import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";
import FullCheckoutView from "@/components/FullCheckoutView";
import { BagProvider } from "@/components/store";

export const metadata: Metadata = {
  title: "Private Luxury Checkout · SUTRÉA Flagship",
  description: "Secure, encrypted 256-bit checkout for SUTRÉA handwoven pure silk heirlooms. Complimentary insured express air delivery across India and internationally.",
};

export default function CheckoutPage() {
  return (
    <BagProvider>
      <Navbar />
      <main className="section checkout-page-wrapper">
        <FullCheckoutView />
      </main>
      <Footer />
      <Ticker />
      <CartDrawer />
      <WishlistDrawer />
      <VideoConciergeModal />
      <FloatingConcierge />
    </BagProvider>
  );
}
