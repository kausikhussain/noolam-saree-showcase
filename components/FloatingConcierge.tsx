"use client";
import { useBag } from "./store";
import { Video, Sparkles } from "./Icons";

export default function FloatingConcierge() {
  const { openConcierge } = useBag();

  return (
    <button
      onClick={openConcierge}
      className="floating-concierge"
      aria-label="Book Live Video Consultation"
    >
      <span className="concierge-pulse" />
      <Video size={17} />
      <span className="concierge-text">Live Video Consultation</span>
      <Sparkles size={14} className="gold-text" />
    </button>
  );
}
