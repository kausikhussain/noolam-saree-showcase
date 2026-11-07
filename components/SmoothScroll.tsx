"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/* Weighted smooth scrolling (the "heavy", cinematic scroll of 3D motion sites)
   + scroll-triggered reveals for every [data-reveal] element. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -84 }, autoRaf: true });
    (window as unknown as { lenis?: Lenis | null }).lenis = lenis;
    if (lenis && document.documentElement.style.overflow === "hidden") lenis.stop();

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      lenis?.destroy();
    };
  }, []);
  return null;
}
