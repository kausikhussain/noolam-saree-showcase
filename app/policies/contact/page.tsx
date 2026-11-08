import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BagProvider } from "@/components/store";

export const metadata = {
  title: "Contact & Concierge · NOOLAM",
  description: "Reach the NOOLAM master loom concierge, schedule private showroom visits, or connect with our customer grievance officer.",
};

export default function ContactPage() {
  return (
    <BagProvider>
      <Navbar />
      <div className="policy-page section">
        <span className="eyebrow">DIRECT CONCIERGE</span>
        <h1>Contact & Showroom Coordinates</h1>
        <p className="policy-date">Flagship Showroom & Master Weaving Register</p>

        <div className="policy-content">
          <section>
            <h2>1. Private Client Concierge</h2>
            <p>
              Whether inquiring about custom bridal trousseaus, international air dispatch, or live video drapes:
            </p>
            <ul>
              <li><strong>WhatsApp Concierge:</strong> +91 98400 12345 (Daily 10:00 AM – 8:00 PM IST)</li>
              <li><strong>Client Relations Email:</strong> concierge@noolam.com</li>
              <li><strong>Orders & Tracking:</strong> orders@noolam.com</li>
            </ul>
          </section>

          <section>
            <h2>2. Flagship Heritage Showroom</h2>
            <p>
              <strong>NOOLAM Silks Flagship</strong><br />
              42, Gandhi Road, Near Ekambareswarar Temple Outer Gate,<br />
              Kanchipuram, Tamil Nadu – 631502, India.<br />
              <strong>Hours:</strong> Tuesday to Sunday: 9:30 AM – 8:30 PM (Mondays by appointment)
            </p>
          </section>

          <section>
            <h2>3. Statutory Consumer Grievance Officer</h2>
            <p>
              In accordance with the Information Technology Act 2000 and the Consumer Protection (E-Commerce) Rules 2020:
            </p>
            <p>
              <strong>Officer Name:</strong> K. S. Sundaram<br />
              <strong>Designation:</strong> Head of Client Relations & Compliance<br />
              <strong>Direct Email:</strong> grievance@noolam.com<br />
              <strong>Official Address:</strong> NOOLAM Flagship, 42 Gandhi Road, Kanchipuram – 631502
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

