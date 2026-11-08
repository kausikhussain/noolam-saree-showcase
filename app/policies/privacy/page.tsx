import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Privacy Policy · NOOLAM",
  description: "Official customer privacy policy and data protection commitments for NOOLAM Kanchipuram Silk.",
};

export default function PrivacyPolicyPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">STATUTORY COMPLIANCE</span>
        <h1>Privacy Policy</h1>
        <p className="policy-date">Last Updated: November 8, 2026</p>

        <div className="policy-content">
          <section>
            <h2>1. Our Commitment to Discretion</h2>
            <p>
              NOOLAM respects the privacy of every patron. This Privacy Policy outlines how your personal data is collected, used, and safeguarded when visiting our digital showroom and purchasing authentic handloom silks.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We collect information provided directly by you during the ordering and consultation process, including:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Full name, shipping address, WhatsApp contact number, and email address.</li>
              <li><strong>Order Data:</strong> Selected silk sarees, tailoring measurements, and transaction references.</li>
              <li><strong>Logistics Data:</strong> Delivery PIN codes for serviceability checks and automated carrier dispatch.</li>
            </ul>
          </section>

          <section>
            <h2>3. Payment Security & Zero Card Storage</h2>
            <p>
              All online payments are processed through PCI-DSS Level 1 certified gateways (Shopify Payments / Razorpay / Cashfree / Stripe). NOOLAM never views, stores, or logs your credit/debit card numbers or UPI PINs.
            </p>
          </section>

          <section>
            <h2>4. WhatsApp & Customer Communications</h2>
            <p>
              Your contact number is utilized strictly for transactional notifications, including loom dispatch alerts, AWB courier tracking, and scheduled 1-on-1 video consultations. We do not sell or lease customer directories to third-party telemarketers.
            </p>
          </section>

          <section>
            <h2>5. Grievance & Inquiries</h2>
            <p>
              For data access requests or privacy inquiries, contact our designated privacy officer at:
              <br />
              <strong>Email:</strong> privacy@noolam.com
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

