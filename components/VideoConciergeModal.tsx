"use client";
import { useState } from "react";
import { useBag } from "./store";
import { Close, Video, Check, ArrowR, MessageCircle } from "./Icons";

export default function VideoConciergeModal() {
  const { isConciergeOpen, closeConcierge } = useBag();

  const [date, setDate] = useState("2026-11-10");
  const [time, setTime] = useState("11:00 AM – 12:00 PM");
  const [collection, setCollection] = useState("Bridal & Muhurtham Silks");
  const [language, setLanguage] = useState("Tamil & English");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!isConciergeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please provide your name and phone number for the video appointment.");
      return;
    }
    setConfirmed(true);
  };

  const whatsappMsg = `Hello NOOLAM Concierge! I have requested a 1-on-1 Live Video Saree Consultation for ${name} on ${date} (${time}) focusing on ${collection}.`;

  return (
    <div className="modal-overlay" onClick={closeConcierge}>
      <div className="modal-container concierge-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="eyebrow">NOOLAM · PRIVATE CLIENT CONCIERGE</span>
            <h3 className="modal-title">Live 1-on-1 Video Saree Consultation</h3>
          </div>
          <button className="modal-close" onClick={closeConcierge} aria-label="Close modal">
            <Close size={20} />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="modal-form">
            <p className="concierge-intro-text">
              Experience the lustre, weight, and zari shine of our Kanchipuram heirlooms from the comfort of your home. A master draper will present curated sarees on camera in 4K clarity.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sangeetha Krishnan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>WhatsApp Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Preferred Time Slot</label>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM (IST)</option>
                  <option value="03:00 PM – 04:00 PM">03:00 PM – 04:00 PM (IST)</option>
                  <option value="06:00 PM – 07:00 PM">06:00 PM – 07:00 PM (IST)</option>
                  <option value="08:30 PM – 09:30 PM">08:30 PM – 09:30 PM (NRI Friendly)</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Collection Focus</label>
                <select value={collection} onChange={(e) => setCollection(e.target.value)}>
                  <option value="Bridal & Muhurtham Silks">Bridal & Muhurtham Silks</option>
                  <option value="Traditional Korvai Kanjivarams">Traditional Korvai Kanjivarams</option>
                  <option value="Pure Zari Heirlooms">Pure Zari Heirlooms</option>
                  <option value="Brocade & Festive Drapes">Brocade & Festive Drapes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="Tamil & English">Tamil & English</option>
                  <option value="Telugu & English">Telugu & English</option>
                  <option value="Hindi & English">Hindi & English</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={closeConcierge} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn btn-maroon btn-lg">
                <span>Book Video Appointment</span>
                <span className="btn-dot"><Video size={16} /></span>
              </button>
            </div>
          </form>
        ) : (
          <div className="order-confirmed-view">
            <div className="confirmed-icon-wrap">
              <Video size={36} className="gold-text" />
            </div>
            <span className="eyebrow center">CONFIRMED APPOINTMENT</span>
            <h2>Appointment Booked!</h2>
            <p className="order-note">
              Thank you, <strong>{name}</strong>. Our senior stylist has reserved your private 4K video consultation on <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <div className="confirmed-actions">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-maroon"
              >
                <MessageCircle size={18} />
                <span>Confirm on WhatsApp</span>
                <span className="btn-dot"><ArrowR size={14} /></span>
              </a>
              <button onClick={closeConcierge} className="btn btn-white">
                <span>Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
