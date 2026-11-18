"use client";
import { useState } from "react";
import { ArrowR, Lotus } from "./Icons";

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer id="footer" className="footer">
      <div className="footer-top" data-reveal>
        <h2>
          Woven with heritage.
          <br />
          Draped for <em>today.</em>
        </h2>
        <div className="footer-mark">
          <Lotus size={40} />
          <span>SUTRÉA</span>
        </div>
      </div>
      <div className="footer-grid" data-reveal>
        <div>
          <h5>Boutique</h5>
          <a href="/shop">Complete Collection</a>
          <a href="/#look">Try the Look</a>
          <a href="/#silk">Pick a Silk</a>
          <a href="/#rack">The Rail</a>
          <a href="/#bridal">Bridal Trousseau</a>
        </div>
        <div>
          <h5>The House</h5>
          <a href="/about">Our Story</a>
          <a href="/craftsmanship">The Craftsmanship</a>
          <a href="/care">Heirloom Care Guide</a>
          <a href="/faq">Frequently Asked</a>
          <a href="/policies/authenticity">Silk Mark Guarantee</a>
        </div>
        <div>
          <h5>Heritage Flagship</h5>
          <p>
            SUTRÉA Flagship
            <br />
            42 Gandhi Road, Near Temple Outer Gate
            <br />
            Kanchipuram, Tamil Nadu 631502
            <br />
            Open daily · 10am – 9pm IST
          </p>
          <a href="/policies/contact" style={{ display: "inline-block", marginTop: "8px", color: "var(--gold)" }}>
            Concierge &amp; Showroom Visits →
          </a>
        </div>
        <div>
          <h5>Care &amp; Heritage</h5>
          <a href="/policies/authenticity">Silk Mark &amp; Zari Purity</a>
          <a href="/policies/shipping">Insured Air Shipping</a>
          <a href="/policies/returns">7-Day Silk Exchange</a>
          <a href="/policies/privacy">Privacy Policy</a>
          <a href="/policies/terms">Terms of Service</a>
          <a href="/policies/contact">Grievance &amp; Concierge</a>
        </div>
        <form
          className="footer-news"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h5>Letters from the loom</h5>
          <p>New weaves, festival edits and loom stories — once a month.</p>
          <div className="news-row">
            <input type="email" required placeholder="Your email" aria-label="Email" />
            <button aria-label="Subscribe">
              <ArrowR size={16} />
            </button>
          </div>
          {sent && <small>Thank you — see you at the loom.</small>}
        </form>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} SUTRÉA · Heritage Silk. A demo brand.</span>
        <span>Handwoven in Kanchipuram</span>
      </div>
    </footer>
  );
}
