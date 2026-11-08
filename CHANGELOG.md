# Changelog · NOOLAM Kanchipuram Silk Platform

All notable changes to the NOOLAM platform will be documented in this file.

---

## [1.0.0] - 2026-11-08
### Added
- **Phase Zero Audit Suite:** Comprehensive technical audit (`PROJECT_AUDIT.md`), master implementation plan (`MASTER_IMPLEMENTATION_PLAN.md`), owner actions ledger (`OWNER_ACTIONS.md`), implementation status dashboard (`IMPLEMENTATION_STATUS.md`), and requirements traceability matrix (`REQUIREMENTS_TRACEABILITY.md`).
- **Shopify Headless Commerce Layer:** Strongly-typed Shopify GraphQL Storefront API client (`lib/shopify/client.ts`) supporting API version `2026-10` with automatic fallback to verified local catalogue in development.
- **Interactive E-Commerce Experience:** Slide-over Shopping Bag drawer (`CartDrawer.tsx`), saved heirlooms wishlist drawer (`WishlistDrawer.tsx`), 3-step private checkout flow (`CheckoutModal.tsx`), and multi-currency selector (`CurrencySelector.tsx`).
- **Luxury Conversion Features:** Silk Finder discovery quiz modal (`SilkFinderModal.tsx`), 1-on-1 live video consultation booking with WhatsApp concierge handoff (`VideoConciergeModal.tsx`), and bespoke blouse tailoring options (`ProductDetailModal.tsx`).
- **Domestic Shipping & Logistics:** Indian PIN code serviceability validation engine (`lib/shipping/pincode.ts`) covering all major Indian postal circles with transit estimates and COD indicators.
- **Cybersecurity & Webhook Handler:** Timing-safe HMAC SHA-256 webhook verification route (`app/api/webhooks/shopify/route.ts`) with replay protection and delivery ID deduplication.
- **Enterprise SEO & Structured Data:** Schema.org JSON-LD generator (`lib/seo/schema.ts`) injecting `Organization` and `Product` schemas, dynamic sitemap (`app/sitemap.ts`), and robots rules (`app/robots.ts`).
- **Statutory Legal Suite:** Structured consumer policy pages for Privacy Policy (`/policies/privacy`), Shipping Policy (`/policies/shipping`), Return & Exchange Policy (`/policies/returns`), Authenticity Guarantee (`/policies/authenticity`), Terms of Service (`/policies/terms`), and Grievance Officer Coordinates (`/policies/contact`).
- **Windows Developer Automation:** Native PowerShell scripts for environment setup (`setup.ps1`), development launcher (`start.ps1`), pre-commit health check (`check.ps1`), and environment variable template (`.env.example`).
- **Documentation Suite:** Architectural specifications (`ARCHITECTURE.md`), API integration reference (`API_INTEGRATIONS.md`), security protocols (`SECURITY.md`), and production deployment guide (`DEPLOYMENT.md`).

### Verified
- Zero-error TypeScript strict compilation (`tsc --noEmit`).
- Static page generation and Next.js 15.5.29 production build (`npm run build`).
- Permanent preservation of all 10 showcase screenshots in both `screenshots/` and `public/screenshots/`.

