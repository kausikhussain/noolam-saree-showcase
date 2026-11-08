import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Return & Exchange Policy · NOOLAM",
  description: "Official 7-day heirloom handloom silk exchange policy and returns terms for NOOLAM.",
};

export default function ReturnsPolicyPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">PATRON SATISFACTION</span>
        <h1>Returns & Exchanges</h1>
        <p className="policy-date">Last Updated: November 8, 2026</p>

        <div className="policy-content">
          <section>
            <h2>1. 7-Day Silk Exchange Window</h2>
            <p>
              We want you to be enchanted by your saree. If for any reason your selected weave does not align with your wedding or festive palette, you may request an exchange within <strong>7 days of confirmed delivery</strong>.
            </p>
          </section>

          <section>
            <h2>2. Handloom Integrity Conditions</h2>
            <p>
              To protect the integrity of our master weavers' work, returned items must satisfy the following:
            </p>
            <ul>
              <li>The saree must remain completely unworn, unwashed, and unpleated.</li>
              <li>The original Silk Mark authenticity tag, fabric seal, and security tamper label must be intact.</li>
              <li>The blouse piece must remain attached and unseparated from the main body. Sarees with custom tailored or cut blouse pieces are non-exchangeable.</li>
            </ul>
          </section>

          <section>
            <h2>3. Reverse Pickup & Refund Procedure</h2>
            <p>
              Upon receiving your exchange request via WhatsApp concierge or email, our logistics team arranges an insured doorstep pickup. Following workshop verification, store credit or replacement dispatch is initiated within 48 hours.
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

