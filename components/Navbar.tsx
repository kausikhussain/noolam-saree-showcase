"use client";
import { useEffect, useState } from "react";
import { useBag } from "./store";
import { ArrowR, Bag, Heart, Lotus } from "./Icons";

const links = [
  ["home", "Home"],
  ["look", "Try the Look"],
  ["silk", "Pick a Silk"],
  ["rack", "The Rack"],
  ["muse", "The Muse"],
  ["bridal", "Bridal"],
  ["weave", "The Weave"],
] as const;

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#home" className={`logo ${light ? "light" : ""}`} aria-label="NOOLAM home">
      <Lotus size={24} />
      <span className="logo-word">NOOLAM</span>
      <span className="logo-sub">KANCHIPURAM SILK</span>
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
      let cur = "home";
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
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
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
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
        <a className="btn btn-maroon nav-cta" href="#rack">
          Visit the Store
          <span className="btn-dot">
            <ArrowR size={14} />
          </span>
        </a>
      </div>
    </header>
  );
}
