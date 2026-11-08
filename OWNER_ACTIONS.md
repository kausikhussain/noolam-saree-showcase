# NOOLAM · Owner Actions & Governance Ledger
**Document Version:** 1.0.0  
**Status:** Living Document · Continuously Updated  
**Confidentiality:** Internal Development Team & Brand Owner  

---

## 1. Classification Framework

Every task across the NOOLAM e-commerce initiative is classified under one of four operational tiers:

- **[A] REQUIRED FROM OWNER**: Tasks requiring the business owner's proprietary data, legal identity, or authorized credentials.
- **[B] ENGINEERED BY AGENT**: Technical development, architectural design, coding, testing, and deployment preparation executed autonomously by the engineering team.
- **[C] OWNER APPROVAL REQUIRED**: Items engineered and staged that require owner review, commercial sign-off, or editorial sign-off before entering production.
- **[D] WAITING FOR EXTERNAL PROVIDER**: External approvals, account verifications, or merchant boarding with third parties (Shopify, Razorpay, Shiprocket, Meta).

---

## 2. Ledger of Operational Actions

### Category A: Required From Owner

| ID | Required Item | Purpose & Destination | Where to Obtain | File / Format | Urgency | Launch Blocker? |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **OA-01** | **Shopify Store Domain & Storefront API Token** | Connect Next.js to live Shopify product inventory (`.env.local` as `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`) | Shopify Admin → Settings → Apps and sales channels → Develop apps → Create Headless app | String tokens | **High** | **YES** |
| **OA-02** | **Shopify Admin API Access Token & Webhook Secret** | Secure server-side inventory operations & HMAC webhook verification (`.env.local` as `SHOPIFY_ADMIN_ACCESS_TOKEN` and `SHOPIFY_WEBHOOK_SECRET`) | Shopify Headless App Configuration → Admin API Access Scopes (`read_products`, `read_orders`, `write_orders`) | Secret string | **High** | **YES** |
| **OA-03** | **Official Master Brand Logo** | Replace procedural logo with registered brand mark in Navbar, Footer, and Invoices | Brand Designer / Creative Agency | Vector SVG (`public/brand/logo.svg`) | Medium | No (clean fallback active) |
| **OA-04** | **Master Product Inventory & Price Sheet** | Populate official Shopify product catalogue with authentic SKUs, weave specs, and INR pricing | Master Loom Inventory Register / Weavers Guild | CSV / Excel (`docs/catalog/noolam_master_catalog.csv`) | **High** | **YES** |
| **OA-05** | **Merchant Payment Gateway Credentials** | Enable live UPI, RuPay, Visa, Mastercard, and NetBanking processing (Razorpay / Cashfree) | Razorpay Dashboard → Settings → API Keys | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | **High** | **YES** |
| **OA-06** | **Domestic Shipping Carrier API Token** | Automate real-time pincode serviceability and AWB generation (Shiprocket / Delhivery) | Shiprocket Panel → API → Configure Integration | `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD` | Medium | No (static pincode table active) |
| **OA-07** | **Verified Business Details & GSTIN** | Legal tax invoices, statutory footer disclosures, and merchant compliance | GST Registration Certificate & Business PAN | Text / JSON (`lib/legal/business_details.json`) | Medium | **YES** |
| **OA-08** | **Production Domain DNS Access** | Point custom domain (e.g. `noolam.com`) to Vercel production edge | Domain Registrar (GoDaddy, Namecheap, Cloudflare) | CNAME / A Records | Low | No (Vercel preview active) |

> [!CAUTION]
> **Credential Security Notice:**  
> Never transmit API keys, passwords, or secrets over chat messages or commit them to GitHub. Enter them directly into your local `.env.local` file or configure them securely within the Vercel Dashboard under **Project Settings → Environment Variables**.

---

### Category B: Engineered by Agent (Autonomous Execution)

| ID | Engineered Capability | Technical File Path | Status | Verification Metric |
| :--- | :--- | :--- | :--- | :--- |
| **EA-01** | Shopify Storefront GraphQL Client (`2026-10`) | `lib/shopify/client.ts` | **Ready** | Type-safe schema validation |
| **EA-02** | Persistent Shopping Bag & Server Cart Sync | `components/store.tsx`, `components/CartDrawer.tsx` | **Ready** | Cart lines mutation & local sync |
| **EA-03** | Multi-Currency Presentation Engine (INR/USD/GBP/AED) | `lib/currency.ts`, `components/CurrencySelector.tsx` | **Ready** | Exact INR formatting (`₹1,25,000`) |
| **EA-04** | 3-Step Luxury Checkout Flow | `components/CheckoutModal.tsx` | **Ready** | Address, payment selection, order ID |
| **EA-05** | Saved Heirlooms Wishlist System | `components/WishlistDrawer.tsx` | **Ready** | One-click move to cart |
| **EA-06** | 1-on-1 Live Video Tour Concierge Scheduler | `components/VideoConciergeModal.tsx` | **Ready** | WhatsApp pre-formatted link generator |
| **EA-07** | Silk Finder Discovery Quiz Wizard | `components/SilkFinderModal.tsx` | **Ready** | Multi-criteria recommendation filter |
| **EA-08** | Domestic Pincode Serviceability Engine | `lib/shipping/pincode.ts` | **Ready** | Indian 6-digit regex & transit time |
| **EA-09** | Three.js Verlet Cloth Simulation & Metallic Zari | `lib/silk/cloth.ts`, `lib/silk/texture.ts` | **Ready** | 60 FPS real-time cloth drape |
| **EA-10** | Idempotent HMAC SHA-256 Webhook Consumer | `app/api/webhooks/shopify/route.ts` | **Ready** | Raw-body timing-safe HMAC check |
| **EA-11** | SEO Meta & JSON-LD Structured Data Schema | `lib/seo/schema.ts`, `app/sitemap.ts`, `app/robots.ts`| **Ready** | Schema.org valid JSON-LD |
| **EA-12** | Windows Local Developer Automation Scripts | `scripts/setup.ps1`, `scripts/start.ps1`, `check.ps1` | **Ready** | One-command execution on PowerShell |

---

### Category C: Owner Approval Required

| ID | Decision / Item | Description | Impact | Status |
| :--- | :--- | :--- | :--- | :--- |
| **AP-01** | **Commercial Pricing Strategy** | Approve base catalog pricing, look bundle discounts (10%), and festive promotional codes (`NOOLAM10`, `UTSAV`). | Margin & Revenue | Staged in `lib/data.ts` |
| **AP-02** | **Blouse Customization Policy** | Confirm whether stitched blouse customizations are final sale or eligible for exchange. | Operations & Tailoring | Drafted in Policies |
| **AP-03** | **COD (Cash on Delivery) Threshold** | Set maximum allowable order value for Cash on Delivery (suggested max: ₹50,000). | Fraud & Return Risk | Configured in Checkout |
| **AP-04** | **Legal Policies Sign-Off** | Formal review of Return/Refund/Shipping policies by qualified legal counsel. | Statutory Compliance | Structured in `app/policies/` |
| **AP-05** | **AI Campaign Asset Selection** | Review generated editorial imagery before replacing procedural visual stand-ins. | Brand Aesthetics | Staged in `docs/ASSET_MANIFEST.md` |

---

### Category D: Waiting for External Provider

| ID | Provider | Required Milestone | Dependency |
| :--- | :--- | :--- | :--- |
| **EP-01** | **Shopify Payments / Razorpay** | Live merchant onboarding and settlement bank account verification. | Owner GST & Banking Documents |
| **EP-02** | **Shiprocket / Delhivery** | KYC verification for surface and air logistics pickup from Kanchipuram / Chennai hub. | Warehouse Address Proof |
| **EP-03** | **Meta / WhatsApp Business** | WhatsApp Cloud API template approval for official order dispatch notifications. | Facebook Business Verification |

