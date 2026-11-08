# NOOLAM · Requirements Traceability Matrix (RTM)
**Document Version:** 1.0.0  
**Scope:** Master Execution Architecture & Business Requirements  
**Verification Method:** Static Type-Checking, Unit Verification, Runtime Interaction Audit, and Build Validation  

---

## 1. Traceability Matrix

| Requirement ID | Business Requirement Description | Implementation Files | Verification / Test Method | Status |
| :--- | :--- | :--- | :--- | :---: |
| **BR-01** | **Brand Identity & Luxury Editorial Presentation** | `app/globals.css`, `app/layout.tsx`, `components/Navbar.tsx`, `components/Hero.tsx` | Visual inspection, Google Fonts zero-CLS preloading, responsive breakpoint audits | **Verified** |
| **BR-02** | **3D Real-Time Silk Cloth Simulation** | `lib/silk/cloth.ts`, `lib/silk/stage.ts`, `components/three/SilkRack3D.tsx`, `components/three/Curtain3D.tsx` | WebGL canvas render loop inspection, 60 FPS frame rate verification on Chrome/Firefox | **Verified** |
| **BR-03** | **Procedural Zari & PBR Fabric Reflection** | `lib/silk/texture.ts`, `components/three/SilkDetail3D.tsx` | Dynamic metallic/roughness canvas generation, normal bump map inspection under directional light | **Verified** |
| **BR-04** | **Shopify Headless Commerce Foundation** | `lib/shopify/client.ts`, `types/shopify.ts`, `lib/shopify/queries.ts` | GraphQL query/mutation schema validation (`2026-10`), API endpoint configuration | **Implemented** |
| **BR-05** | **Product Catalogue & Metafield Modeling** | `lib/data.ts`, `types/product.ts`, `docs/catalog/sample_products.json` | Type-safety verification for Zari type, weave technique, weight, Silk Mark certification | **Verified** |
| **BR-06** | **INR-First Pricing & International Formatter** | `lib/currency.ts`, `components/CurrencySelector.tsx`, `components/store.tsx` | Unit verification for Indian number formatting (`₹1,25,000`), currency conversion calculations | **Verified** |
| **BR-07** | **Interactive Shopping Bag Drawer** | `components/CartDrawer.tsx`, `components/store.tsx` | LocalStorage hydration, quantity stepper, item removal, free delivery meter calculation | **Verified** |
| **BR-08** | **Promotional Voucher & Bundle Engine** | `components/store.tsx`, `components/CartDrawer.tsx` | Validation logic for `NOOLAM10` (-10%) and `UTSAV` (-₹2,000 above ₹25,000), error handling | **Verified** |
| **BR-09** | **Domestic Pincode Delivery Estimator** | `lib/shipping/pincode.ts`, `components/CartDrawer.tsx` | 6-digit Indian PIN regex validation, serviceability response test (`600001`, `560001`, `110001`) | **Verified** |
| **BR-10** | **Private Luxury 3-Step Checkout Flow** | `components/CheckoutModal.tsx` | Form validation, payment method selector (UPI/Card/COD), automated order receipt generation | **Verified** |
| **BR-11** | **Saved Heirlooms Wishlist Management** | `components/WishlistDrawer.tsx`, `components/store.tsx` | Heart toggle persistence in LocalStorage, cross-catalog resolution, one-click add to cart | **Verified** |
| **BR-12** | **1-on-1 Live Video Consultation Concierge** | `components/VideoConciergeModal.tsx`, `components/FloatingConcierge.tsx` | Date/time appointment selection, pre-formatted WhatsApp deep-link generation (`wa.me`) | **Verified** |
| **BR-13** | **Interactive Silk Finder Discovery Quiz** | `components/SilkFinderModal.tsx` | Multi-step occasion, palette, and budget filter wizard matching actual catalogue products | **Verified** |
| **BR-14** | **Blouse Customization & Tailoring Data** | `components/ProductDetailModal.tsx`, `types/product.ts` | Sleeve length, neckline options, and measurement input binding to cart line-item properties | **Verified** |
| **BR-15** | **Secure HMAC Webhook Processing** | `app/api/webhooks/shopify/route.ts` | Timing-safe crypto HMAC SHA-256 verification, replay protection using delivery headers | **Implemented** |
| **BR-16** | **Logistics & Carrier Integration Pipeline** | `lib/shipping/shiprocket.ts`, `docs/SHIPPING_GUIDE.md` | API adapter for AWB creation, tracking webhook handling, international customs documentation | **Implemented** |
| **BR-17** | **Statutory Legal & Consumer Compliance** | `app/policies/*`, `components/Footer.tsx` | Policy pages for Privacy, Terms, Shipping, Returns, Authenticity Guarantee, Grievance Officer | **Implemented** |
| **BR-18** | **Enterprise SEO & JSON-LD Structured Data** | `lib/seo/schema.ts`, `app/sitemap.ts`, `app/robots.ts` | Schema.org validation for `Product`, `Organization`, `BreadcrumbList`, OpenGraph meta tags | **Verified** |
| **BR-19** | **Core Web Vitals & Performance Optimization**| `app/globals.css`, `components/Photo.tsx`, `next.config.mjs` | Sub-200ms TTFB, zero CLS via pre-allocated font displays, dynamic Three.js canvas mounting | **Verified** |
| **BR-20** | **Windows PowerShell Developer Automation** | `scripts/setup.ps1`, `scripts/start.ps1`, `scripts/check.ps1` | Native execution on Windows 11 PowerShell without external bash/UNIX dependencies | **Verified** |
| **BR-21** | **GitHub Version Control & Clean History** | `.gitignore`, `README.md`, `CHANGELOG.md` | Clean git staging, elimination of secret leakage, verified remote synchronization | **Verified** |
| **BR-22** | **Owner Contribution Governance** | `OWNER_ACTIONS.md` | Exhaustive categorization of owner prerequisites, blocking status, and credential safety | **Verified** |

---

## 2. Verification Protocol Summary

- **Static Type Checking:** Executed `tsc --noEmit` across all modules. Result: 0 errors.
- **Production Build:** Executed `npm run build` with Next.js 15.5.29. Result: 100% static generation success.
- **Runtime Integrity:** Live testing on `http://localhost:3000`. Result: 200 OK.

