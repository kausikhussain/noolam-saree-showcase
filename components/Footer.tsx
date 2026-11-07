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
          <span>NOOLAM</span>
        </div>
      </div>
      <div className="footer-grid" data-reveal>
        <div>
          <h5>Shop</h5>
          <a href="#look">Try the Look</a>
          <a href="#silk">Pick a Silk</a>
          <a href="#rack">The Rack</a>
          <a href="#bridal">Bridal</a>
        </div>
        <div>
          <h5>Visit the store</h5>
          <p>
            14 Gandhi Road
            <br />
            Kanchipuram, Tamil Nadu 631501
            <br />
            Open daily · 10am – 9pm
          </p>
        </div>
        <div>
          <h5>Care</h5>
          <a href="#footer">Silk care guide</a>
          <a href="#footer">Zari purity promise</a>
          <a href="#footer">Shipping &amp; returns</a>
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
        <span>© {new Date().getFullYear()} NOOLAM · Kanchipuram Silk. A demo brand.</span>
        <span>Handwoven in Kanchipuram</span>
      </div>
    </footer>
  );
}
