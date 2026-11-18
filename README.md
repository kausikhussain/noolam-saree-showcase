# SUTRÉA · Heritage Silk Saree Flagship
## Woven to Be Remembered.

<p align="center">
  <img src="screenshots/01-hero.png" width="100%" alt="SUTRÉA Hero Showroom">
</p>

> **SUTRÉA** is a complete, production-grade digital luxury flagship for heritage handwoven silk sarees and bridal heirlooms. Engineered with **Next.js 15 (App Router)**, **React 19**, **Shopify Headless Commerce (Storefront GraphQL API 2026-10)**, and **Three.js** real-time cloth simulation, it delivers physics-based silk drapes, an editorial luxury shopping cart, multi-currency conversion, domestic pincode logistics, and 1-on-1 private video concierge booking.

---

## ✦ Live Architecture & Feature Capabilities

- **3D Silk Cloth Physics Engine**: Real-time Verlet particle simulation for silk curtain parting and hanging garment sway with procedural PBR metallic zari shaders.
- **Shopify Headless Commerce Layer**: Strongly-typed Storefront GraphQL client (`lib/shopify/client.ts`) with cart lines mutations, discount engine, and resilient local fallback.
- **Luxury E-Commerce Suite**:
  - Slide-over **Shopping Bag Drawer** with real-time promo validation (`SUTREA10`, `UTSAV`)
  - **Multi-Currency Presentation**: Formatted in Indian numbering (`₹1,25,000`) and international rates (USD, GBP, AED)
  - **Domestic Pincode Serviceability**: Instant delivery timeline validation for 19,000+ Indian postal circles
  - **3-Step Private Checkout**: Comprehensive address collection, payment method selector (UPI, Cards, COD), and automated order receipt generator
  - **Saved Heirlooms Wishlist**: Persistent client-side favorites with one-click move to cart
- **Multi-Page Luxury Boutique Routing**:
  - `/shop` — Dedicated catalogue with interactive filtering by category, search, and sorting
  - `/about` — "Our Story" brand heritage and ethical weaver custodianship
  - `/craftsmanship` — Anatomy of pit-loom mechanics, Korvai interlocking, and pure 24K gold zari metallurgy
  - `/care` — Heirloom preservation rituals, crease rotation, and professional restoration
  - `/faq` — Comprehensive customer questions, Silk Mark verification, and bespoke tailoring
- **Conversion & Concierge Features**:
  - **Silk Finder Discovery Quiz**: Interactive 4-step wizard recommending weaves based on occasion, palette, and budget
  - **1-on-1 Video Consultation**: Booking system connecting patrons directly with master drapers via WhatsApp
  - **Bespoke Blouse Tailoring**: Sleeve, neckline, and measurement options attached to product orders
- **Statutory Consumer Compliance**: Dedicated policy pages for Privacy, Shipping, 7-Day Returns, Authenticity Guarantee, Terms, and Grievance Officer coordinates.
- **Enterprise SEO**: Schema.org JSON-LD structured data (`Organization`, `Product`, `Offer`), dynamic XML sitemap, and robots configuration.
- **Cybersecurity & Webhooks**: Timing-safe HMAC SHA-256 Shopify webhook receiver with replay deduplication.

---

## ✦ Quick Start (Windows PowerShell)

We provide native automation scripts for frictionless Windows development:

```powershell
# 1. Clone repository
git clone https://github.com/kausikhussain/sutrea-luxury-commerce.git
cd sutrea-luxury-commerce

# 2. Automated environment setup & dependency install
.\scripts\setup.ps1

# 3. Start development server
.\scripts\start.ps1

# 4. Run pre-commit health check & production build validation
.\scripts\check.ps1
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ✦ Architectural Documentation & Governance

| Document | Purpose & Scope |
| :--- | :--- |
| **[PROJECT_AUDIT.md](PROJECT_AUDIT.md)** | Phase Zero comprehensive technical audit of existing code, dependencies, and gaps |
| **[MASTER_IMPLEMENTATION_PLAN.md](MASTER_IMPLEMENTATION_PLAN.md)** | A–Z 20-phase production execution roadmap and data flow blueprints |
| **[OWNER_ACTIONS.md](OWNER_ACTIONS.md)** | Continuously updated ledger tracking required owner inputs, approvals, and credentials |
| **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** | Subsystem-by-subsystem operational status dashboard |
| **[REQUIREMENTS_TRACEABILITY.md](REQUIREMENTS_TRACEABILITY.md)** | Traceability matrix linking business requirements to files and verification tests |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Detailed technical topology, Three.js cloth physics solver, and state flow |
| **[API_INTEGRATIONS.md](API_INTEGRATIONS.md)** | Shopify Storefront GraphQL schemas, HMAC webhook signatures, and WhatsApp bridge |
| **[SECURITY.md](SECURITY.md)** | Secret isolation, replay attack prevention, and PCI-DSS compliance protocols |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Staged Vercel Pro deployment guide, environment variables, and custom DNS setup |
| **[LOCAL_SETUP.md](LOCAL_SETUP.md)** | Detailed Windows local developer onboarding and troubleshooting manual |
| **[CHANGELOG.md](CHANGELOG.md)** | Chronological record of architectural milestones and feature additions |
| **[ASSET_MANIFEST.md](docs/ASSET_MANIFEST.md)** | Master 68-slot visual and video asset production manifest |

---

## ✦ Visual Showcase Archive

<p align="center">
  <img src="screenshots/02-six-moods.png" width="49%">
  <img src="screenshots/03-try-the-look.png" width="49%">
</p>
<p align="center">
  <img src="screenshots/04-pick-a-silk.png" width="49%">
  <img src="screenshots/05-the-rack.png" width="49%">
</p>
<p align="center">
  <img src="screenshots/06-rack-saree-detail.png" width="49%">
  <img src="screenshots/07-rack-blouse-detail.png" width="49%">
</p>
<p align="center">
  <img src="screenshots/08-muse-film.png" width="49%">
  <img src="screenshots/09-muse-reels.png" width="49%">
</p>
<p align="center">
  <img src="screenshots/10-bridal.png" width="100%">
</p>

---

## ✦ Technical Specifications

- **Framework:** Next.js 15.5.29 (App Router)
- **UI Runtime:** React 19.1.0
- **Language:** TypeScript 5.7.2 (strict mode)
- **3D Engine:** Three.js 0.170.0 (Verlet solver + WebGL PBR shaders)
- **Smooth Scroll:** Lenis 1.3.26
- **Typography:** Playfair Display, Cormorant Garamond, Inter
- **Commerce Backend:** Shopify Storefront GraphQL API (2026-10) with local resilient fallback
- **Loom Origin:** Kanchipuram, Tamil Nadu, India
- **Base Currency:** INR (₹) with dynamic international conversion
