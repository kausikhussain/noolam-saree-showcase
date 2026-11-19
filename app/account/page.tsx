import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";
import AccountView from "@/components/AccountView";
import { BagProvider } from "@/components/store";

export const metadata: Metadata = {
  title: "Patron Account & Loom Tracking · SUTRÉA",
  description: "View your SUTRÉA order history, track live master pit-loom progress, access Silk Mark India authentication records, and manage saved heirlooms.",
};

export default function AccountPage() {
  return (
    <BagProvider>
      <Navbar />
      <main className="section account-page-wrapper">
        <AccountView />
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
