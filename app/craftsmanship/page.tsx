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
  title: "The Craftsmanship · SUTRÉA",
  description: "Explore the ancient anatomy of pure handloom silk weaving: pit-loom mechanics, the Korvai interlocking technique, and certified 24-karat gold zari metallurgy.",
};

export default function CraftsmanshipPage() {
  const steps = [
    {
      num: "01",
      title: "Mulberry Sericulture & Degumming",
      desc: "We exclusively employ Grade-A 3-ply mulberry silk, carefully harvested from ethical cooperatives in South India. The silk is naturally degummed in soft temple water to preserve its inherent tensile strength and luminous light-refracting quality.",
    },
    {
      num: "02",
      title: "Warp Preparation & Hand-Reeling",
      desc: "Over 6,000 warp threads are painstakingly measured, aligned, and stretched across wooden frames. Each strand is individually drawn through the reeds by hand—a process requiring up to three days before a single shuttle is thrown.",
    },
    {
      num: "03",
      title: "The Korvai Interlocking Secret",
      desc: "True temple borders are not printed or woven flat. In the Korvai tradition, two weavers sit at opposing ends of the pit loom. With three independent shuttles, they interlink the border warp with the body weft, creating a structural lock that never frays.",
    },
    {
      num: "04",
      title: "Real Metallurgical Zari",
      desc: "Our heirloom weaves employ silver-core thread electroplated in pure 24-karat gold. Unlike synthetic plastic lurex, SUTRÉA zari drapes with authentic gravitational fall and develops a rich antique sheen with age.",
    },
    {
      num: "05",
      title: "Silk Mark Certification & Tamper Seal",
      desc: "Upon completion, each saree undergoes rigorous density, thread-count, and burn testing. It receives an official SMOI Silk Mark QR certificate and is secured with our tamper-evident heirloom seal.",
    },
  ];

  return (
    <BagProvider>
      <Navbar />
      <main className="craft-page section">
        <header className="craft-header">
          <span className="eyebrow">THE WEAVING PROCESS</span>
          <h1>Anatomy of a Master Loom</h1>
          <p className="craft-lead">
            Every millimeter of a SUTRÉA saree is a testament to human patience. Here is how ancient geometry, pure silk, and precious metal converge into an heirloom.
          </p>
        </header>

        <div className="craft-steps">
          {steps.map((st) => (
            <div key={st.num} className="craft-step-card">
              <span className="craft-step-num">{st.num}</span>
              <div className="craft-step-body">
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="craft-callout">
          <h3>Experience It Live in 4K</h3>
          <p>
            Schedule a private video drape with our master weavers in Kanchipuram. We will present individual weaves, zoom in on the Korvai seams, and drape live to assist your selection.
          </p>
          <Link href="/shop" className="btn btn-maroon btn-lg">
            <span>Explore Handloom Silks</span>
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

