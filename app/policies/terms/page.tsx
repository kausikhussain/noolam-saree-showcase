import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Terms of Service · NOOLAM",
  description: "Official terms and conditions governing purchases and usage of the NOOLAM digital boutique.",
};

export default function TermsPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">COMMERCIAL TERMS</span>
        <h1>Terms of Service</h1>
        <p className="policy-date">Last Updated: November 8, 2026</p>

        <div className="policy-content">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing NOOLAM (the "Platform"), booking a video consultation, or purchasing handwoven garments, you agree to be bound by these Terms of Service and applicable Indian laws.
            </p>
          </section>

          <section>
            <h2>2. Handloom Variations & Natural Characteristics</h2>
            <p>
              Authentic handloom silks possess slight, natural variations in weave texture, yarn slubs, and zari selvedges. These are not imperfections; they are the hallmark of hand-interlocking pit-loom weaving and verify the non-mechanized nature of your piece.
            </p>
          </section>

          <section>
            <h2>3. Commercial Orders & Cancellations</h2>
            <p>
              Orders for ready-to-ship sarees may be modified or cancelled within 6 hours of placement before dispatch processing. Once an order has entered custom blouse cutting or dispatched to logistics partners, standard return policies apply.
            </p>
          </section>

          <section>
            <h2>4. Governing Law & Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any disputes arising in connection with NOOLAM transactions shall be subject to the exclusive jurisdiction of the competent courts in Kanchipuram / Chennai, Tamil Nadu.
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

