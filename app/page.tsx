import { BagProvider } from "@/components/store";
import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import SixMoods from "@/components/SixMoods";
import TryTheLook from "@/components/TryTheLook";
import PickASilk from "@/components/PickASilk";
import TheRack from "@/components/TheRack";
import MuseFilm from "@/components/MuseFilm";
import MuseReels from "@/components/MuseReels";
import Bridal from "@/components/Bridal";
import Weave from "@/components/Weave";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";

export default function Page() {
  return (
    <BagProvider>
      <SmoothScroll />
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <SixMoods />
        <TryTheLook />
        <PickASilk />
        <TheRack />
        <MuseFilm />
        <MuseReels />
        <Bridal />
        <Weave />
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
