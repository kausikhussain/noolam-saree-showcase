import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Product Authenticity Guarantee · NOOLAM",
  description: "Learn about the Silk Mark certification, pure gold zari composition, and master pit-loom heritage of NOOLAM Kanchipuram silks.",
};

export default function AuthenticityPolicyPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">HERITAGE GUARANTEE</span>
        <h1>Product Authenticity & The Master Loom</h1>
        <p className="policy-date">Kanchipuram, Tamil Nadu · Certified Handloom</p>

        <div className="policy-content">
          <section>
            <h2>1. 100% Pure Mulberry Silk Mark Certified</h2>
            <p>
              Every NOOLAM saree is crafted strictly from high-twist, 3-ply natural mulberry silk sourced directly from ethical South Indian sericulture cooperatives. Each saree ships with an individual **Silk Mark India** certification tag featuring an authorized QR verification seal issued by the Silk Mark Organisation of India (SMOI).
            </p>
          </section>

          <section>
            <h2>2. Authentic Zari Metallurgy</h2>
            <p>
              Traditional Kanchipuram weaving relies on genuine metallic thread. Our master looms utilize two authentic grades of zari:
            </p>
            <ul>
              <li><strong>Pure Zari (Heirloom Grade):</strong> A pure silk core yarn wound with 57% pure silver flattened wire, subsequently electroplated with 0.5% pure 24-karat gold. These sarees possess real metallurgical precious metal value and develop a lustrous patina across generations.</li>
              <li><strong>Tested Half-Fine Zari:</strong> Formulated with copper alloy electroplated with micron gold for festive lightweight durability.</li>
            </ul>
          </section>

          <section>
            <h2>3. The Korvai Craftsmanship</h2>
            <p>
              Unlike automated power-loom replicas, our signature temple-border sarees are woven using the labor-intensive *Korvai* technique—where two master weavers sit on opposite ends of a traditional pit loom, intermeshing body and border wefts with interlocking petni shuttles.
            </p>
          </section>
        </div>

        <Link href="/" className="btn btn-maroon mt-8">
          <span>← Return to Showroom</span>
        </Link>
      </div>
      <Footer />
      <Ticker />
    </BagProvider>
  );
}

