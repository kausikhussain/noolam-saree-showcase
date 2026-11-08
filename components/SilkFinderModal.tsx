"use client";
import { useState } from "react";
import { useBag } from "./store";
import { Close, Sparkles, ArrowR, Bag } from "./Icons";
import { silkCards } from "@/lib/data";

interface QuizState {
  occasion: string;
  palette: string;
  weave: string;
  budget: string;
}

export default function SilkFinderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { add, formatPrice, openCart } = useBag();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    occasion: "Muhurtham & Wedding",
    palette: "Crimson & Gold",
    weave: "Traditional Korvai",
    budget: "Above ₹30,000",
  });
  const [matchedSilks, setMatchedSilks] = useState<typeof silkCards>([]);

  if (!isOpen) return null;

  const handleComplete = () => {
    // Recommendation logic matching silkCards
    let matches = [...silkCards];
    if (answers.palette.includes("Crimson") || answers.palette.includes("Gold")) {
      matches = matches.filter((s) => s.colors[0].includes("8e") || s.colors[0].includes("b5") || s.colors[0].includes("d8") || s.colors[2].includes("f3"));
    }
    if (matches.length === 0) matches = silkCards.slice(0, 3);
    setMatchedSilks(matches.slice(0, 3));
    setStep(5); // Results step
  };

  const handleAddMatch = (silk: typeof silkCards[0]) => {
    add(silk.title, silk.price, 1, {
      id: silk.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type: "PURE SILK",
      color: silk.colors[0],
    });
    onClose();
    openCart();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container quiz-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="eyebrow">NOOLAM · BESPOKE SILK FINDER</span>
            <h3 className="modal-title">Discover Your Handloom Match</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close quiz">
            <Close size={20} />
          </button>
        </div>

        <div className="quiz-body">
          {step === 1 && (
            <div className="quiz-step">
              <span className="step-count">Step 1 of 4</span>
              <h4>What sacred occasion are you weaving for?</h4>
              <div className="quiz-options">
                {["Muhurtham & Wedding", "Reception & Sangeet", "Temple Festival & Pooja", "Heirloom Trousseau"].map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-opt-btn ${answers.occasion === opt ? "selected" : ""}`}
                    onClick={() => {
                      setAnswers({ ...answers, occasion: opt });
                      setStep(2);
                    }}
                  >
                    <span>{opt}</span>
                    <Sparkles size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="quiz-step">
              <span className="step-count">Step 2 of 4</span>
              <h4>Which colour palette speaks to your aura?</h4>
              <div className="quiz-options">
                {["Crimson & Gold (Arakku & Zari)", "Royal Peacock & Cobalt Blue", "Pastel Ivory & Dusty Rose", "Vibrant Violet & Mustard Shot Silk"].map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-opt-btn ${answers.palette === opt ? "selected" : ""}`}
                    onClick={() => {
                      setAnswers({ ...answers, palette: opt });
                      setStep(3);
                    }}
                  >
                    <span>{opt}</span>
                    <Sparkles size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="quiz-step">
              <span className="step-count">Step 3 of 4</span>
              <h4>Select your preferred weaving technique:</h4>
              <div className="quiz-options">
                {["Traditional Korvai (Contrast Temple Border)", "Rich Brocade (All-Over Zari Jaal)", "Palace Check (Koorai Geometric Weave)", "Minimalist Gold Buttas"].map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-opt-btn ${answers.weave === opt ? "selected" : ""}`}
                    onClick={() => {
                      setAnswers({ ...answers, weave: opt });
                      setStep(4);
                    }}
                  >
                    <span>{opt}</span>
                    <Sparkles size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="quiz-step">
              <span className="step-count">Step 4 of 4</span>
              <h4>Choose your target heirloom investment:</h4>
              <div className="quiz-options">
                {["₹18,000 – ₹25,000", "₹25,000 – ₹35,000", "Above ₹35,000 (Pure Gold Zari Masterpiece)"].map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-opt-btn ${answers.budget === opt ? "selected" : ""}`}
                    onClick={() => {
                      setAnswers({ ...answers, budget: opt });
                      handleComplete();
                    }}
                  >
                    <span>{opt}</span>
                    <Sparkles size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="quiz-results">
              <span className="eyebrow center">YOUR CURATED SELECTION</span>
              <h4>Curated Silks For Your {answers.occasion}</h4>
              <div className="matched-silks-list">
                {matchedSilks.map((silk) => (
                  <div key={silk.title} className="matched-silk-card">
                    <div className="matched-swatch" style={{ background: silk.colors[0] }}>
                      <span>⚜</span>
                    </div>
                    <div className="matched-info">
                      <h5>{silk.title}</h5>
                      <span className="matched-meta">Pattern: {silk.pattern.toUpperCase()} · Pure Silk</span>
                      <div className="matched-price">{formatPrice(silk.price)}</div>
                    </div>
                    <button onClick={() => handleAddMatch(silk)} className="btn btn-maroon btn-sm">
                      <Bag size={14} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="btn-cancel mt-4">
                ↺ Retake Silk Finder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

