import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Shipping & Fulfilment Policy · NOOLAM",
  description: "Domestic and international white-glove handloom silk shipping policy, transit timelines, and delivery terms.",
};

export default function ShippingPolicyPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">WHITE-GLOVE DISPATCH</span>
        <h1>Shipping & Fulfilment Policy</h1>
        <p className="policy-date">Last Updated: November 8, 2026</p>

        <div className="policy-content">
          <section>
            <h2>1. Domestic Indian Shipping</h2>
            <p>
              Every NOOLAM saree is individually inspected, steam-pressed, and packaged inside a rigid, moisture-resistant heirloom gift box.
            </p>
            <ul>
              <li><strong>Complimentary Insured Shipping:</strong> All domestic orders across India are shipped via priority air courier (Blue Dart / Delhivery / Bluedart Air) free of charge.</li>
              <li><strong>Transit Timelines:</strong> Metro regions (Chennai, Bengaluru, Hyderabad, Mumbai, Delhi NCR) typically receive delivery within 2–3 business days. Non-metro circles deliver within 3–5 business days.</li>
              <li><strong>Transit Insurance:</strong> All consignments are 100% insured against loss or damage in transit.</li>
            </ul>
          </section>

          <section>
            <h2>2. International Delivery</h2>
            <p>
              We ship our Kanchipuram heirlooms globally to patrons across the United States, United Kingdom, UAE, Singapore, Malaysia, Canada, and Australia via DHL Express / FedEx Priority.
            </p>
            <ul>
              <li><strong>International Transit Time:</strong> 4–7 business days following custom weaving verification.</li>
              <li><strong>Import Duties & Customs:</strong> Customs duties and import VAT, where applicable in the destination country, remain the statutory responsibility of the recipient.</li>
            </ul>
          </section>

          <section>
            <h2>3. Dispatch from Master Looms</h2>
            <p>
              Ready-to-ship sarees dispatch from our Kanchipuram hub within 24 to 48 hours. If bespoke blouse tailoring is requested, please allow an additional 3 to 5 business days for master tailoring.
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

