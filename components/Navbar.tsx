"use client";
import { useEffect, useState } from "react";
import { useBag } from "./store";
import { ArrowR, Bag, Heart, Lotus } from "./Icons";

const links = [
  ["/", "Home"],
  ["/shop", "Shop"],
  ["/#look", "Try the Look"],
  ["/#silk", "Pick a Silk"],
  ["/#rack", "The Rack"],
  ["/craftsmanship", "Craft"],
  ["/about", "Our Story"],
] as const;

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="/" className={`logo ${light ? "light" : ""}`} aria-label="SUTRÉA home">
      <Lotus size={24} />
      <span className="logo-word">SUTRÉA</span>
      <span className="logo-sub">HERITAGE SILK</span>
    </a>
  );
}

export default function Navbar() {
  const { count, liked, openCart, openWishlist } = useBag();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "/";
      for (const [href] of links) {
        const id = href.replace(/^(\/|#|\/#)/, "");
        if (!id) continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = href;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!count) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <Logo />
      <nav className="nav-links">
        {links.map(([href, label]) => (
          <a key={href} href={href} className={active === href ? "active" : ""}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <button
          className="nav-icon"
          onClick={openWishlist}
          aria-label="Wishlist"
          title="View Saved Pieces"
        >
          <Heart size={16} />
          {liked.size > 0 && <i className="badge">{liked.size}</i>}
        </button>
        <button
          className={`nav-icon ${bump ? "bump" : ""}`}
          onClick={openCart}
          aria-label="Shopping Bag"
          title="Open Shopping Bag"
        >
          <Bag size={16} />
          {count > 0 && <i className="badge">{count}</i>}
        </button>
        <a className="btn btn-maroon nav-cta" href="/shop">
          Visit the Store
          <span className="btn-dot">
            <ArrowR size={14} />
          </span>
        </a>
      </div>
    </header>
  );
}
