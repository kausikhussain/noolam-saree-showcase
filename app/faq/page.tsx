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
  title: "Frequently Asked Questions · SUTRÉA",
  description: "Everything you need to know about purchasing SUTRÉA pure handloom silks, international air delivery, Silk Mark certificates, and custom tailoring.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I know my SUTRÉA saree is 100% authentic pure silk?",
      a: "Every SUTRÉA saree comes with an authorized Silk Mark India QR certificate issued by the Silk Mark Organisation of India (SMOI). You can scan the tag to verify the weaving cluster, fiber purity, and official certification register.",
    },
    {
      q: "What makes SUTRÉA zari different from commercial sarees?",
      a: "Commercial sarees overwhelmingly use synthetic metallic plastic (tested lurex). SUTRÉA master looms employ genuine silver-core zari electroplated with pure 24-karat gold for our heirloom collection, giving the saree substantial weight, longevity, and metallurgical value.",
    },
    {
      q: "How long does domestic and international delivery take?",
      a: "Ready-to-ship sarees dispatch from our Kanchipuram master hub within 24 to 48 hours. Domestic metro delivery takes 2–3 business days via insured express air (Blue Dart / Delhivery Air). International delivery to the US, UK, UAE, Singapore, and Australia delivers in 4–7 business days via DHL Express.",
    },
    {
      q: "Can I request custom blouse stitching and lining?",
      a: "Yes. During checkout or by contacting our concierge, you can specify unstitched, standard tailored, or fully bespoke blouse stitching. Please allow an additional 3–5 business days for our master tailors to hand-finish your blouse with pure cotton lining.",
    },
    {
      q: "How does the Live 1-on-1 Video Consultation work?",
      a: "Click 'Live Concierge' anywhere on our boutique to reserve a complimentary 30-minute private video session. A senior draper will showcase chosen sarees under calibrated daylight lighting, zoom into the borders, and drape them on camera to help you decide.",
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day complimentary exchange window from the date of confirmed delivery. The saree must remain unworn, unwashed, with the Silk Mark tag and tamper seal intact, and the blouse piece unseparated.",
    },
  ];

  return (
    <BagProvider>
      <Navbar />
      <main className="faq-page section">
        <header className="faq-header">
          <span className="eyebrow">COMMON INQUIRIES</span>
          <h1>Frequently Asked Questions</h1>
          <p className="faq-lead">
            Clear answers regarding our master pit-loom processes, insured worldwide shipping, and heirloom authenticity.
          </p>
        </header>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-question">
                <span className="faq-q-badge">Q</span>
                <span>{faq.q}</span>
              </h3>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="faq-contact-card">
          <h3>Have a Specific Bridal or Bespoke Question?</h3>
          <p>
            Our dedicated client concierge is available daily via WhatsApp to assist with color matching, muhurtham timing, and bulk wedding orders.
          </p>
          <div className="faq-cta-group">
            <Link href="/policies/contact" className="btn btn-maroon">
              <span>Contact Showroom</span>
              <span className="btn-dot"><ArrowR size={15} /></span>
            </Link>
            <Link href="/shop" className="btn btn-white">
              <span>View Boutique Archive</span>
            </Link>
          </div>
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
