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
  title: "Our Story · SUTRÉA",
  description: "Discover the ethos of SUTRÉA — born from revered temple weaving traditions, dedicated to the timeless artistry of pure handwoven Indian silk.",
};

export default function AboutPage() {
  return (
    <BagProvider>
      <Navbar />
      <main className="story-page section">
        <header className="story-header">
          <span className="eyebrow">OUR HERITAGE</span>
          <h1>Woven to Be Remembered.</h1>
          <p className="story-lead">
            SUTRÉA was conceived as an ode to India’s most noble textile tradition: pure, unadulterated mulberry silk brought to life through the sacred discipline of pit-loom handweaving.
          </p>
        </header>

        <div className="story-grid">
          <div className="story-card">
            <h3>The Sacred Loom</h3>
            <p>
              In an era dominated by high-speed mechanized looms and synthetic threads, SUTRÉA remains steadfastly anchored in generational craftsmanship. Every saree in our archive requires hundreds of hours of coordinated hand-interlocking by two master weavers working in unison.
            </p>
          </div>

          <div className="story-card">
            <h3>Uncompromising Metallurgy</h3>
            <p>
              Our zari is not metallic plastic. It begins with high-purity silver wire wound around natural silk thread, then electroplated in genuine 24-karat gold. This gives SUTRÉA heirlooms an unmistakable weight, warmth, and lifelong luminous patina that matures across generations.
            </p>
          </div>

          <div className="story-card">
            <h3>Ethical Custodianship</h3>
            <p>
              We partner directly with handloom weaver clusters across Tamil Nadu and Varanasi, ensuring fair wage premiums, safe work environments, and the continuation of ancient motifs including the *Mayil* (peacock), *Rudraksha*, *Yali*, and classic *Korvai* temple borders.
            </p>
          </div>
        </div>

        <section className="story-quote-banner">
          <blockquote>
            "A saree is not merely six yards of silk; it is an architectural sculpture draped on the human form, carrying the prayers, patience, and history of the artisan who breathed life into it."
          </blockquote>
          <cite>— Master Weaver Council, SUTRÉA Flagship</cite>
        </section>

        <div className="story-cta-row">
          <Link href="/shop" className="btn btn-maroon btn-lg">
            <span>Explore The Collection</span>
            <span className="btn-dot"><ArrowR size={15} /></span>
          </Link>
          <Link href="/craftsmanship" className="btn btn-white btn-lg">
            <span>The Craftsmanship</span>
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

