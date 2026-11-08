# NOOLAM · Complete Project & Repository Audit (Phase Zero)
**Document Version:** 1.0.0  
**Audit Date:** November 8, 2026  
**Auditor:** Senior E-Commerce Architecture & Engineering Team  
**Repository:** `kausikhussain/noolam-saree-showcase` (`main` branch)

---

## 1. Executive Summary

This audit assesses the technical health, architectural completeness, and production readiness of the **NOOLAM** Kanchipuram Silk Saree website. The project combines a modern **Next.js 15 (App Router)** and **React 19** frontend with an interactive **Three.js** Verlet cloth physics simulation and procedural silk shaders. 

While the aesthetic and spatial motion foundations are exceptionally strong, transforming this application into a live, high-volume luxury e-commerce platform requires replacing local in-memory mock states with a robust **Shopify Headless Commerce** layer, real product catalogue synchronization, genuine payment and logistics workflows, customer account management, and rigorous legal/SEO/performance optimizations.

---

## 2. Technical Stack Audit

| Dimension | Current Specification | Evaluation & Production Readiness |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.5.29 (App Router) | **Modern & Stable.** Fully compatible with React 19 Server Components and Server Actions. |
| **Runtime** | React 19.1.0 & React-DOM 19.1.0 | **Production Grade.** Uses concurrent features; hydration verified. |
| **Language** | TypeScript 5.7.2 | **Strict.** Type-checking passes with 0 compiler errors. |
| **3D Engine** | Three.js 0.170.0 | **Optimized.** Custom canvas-based PBR silk shader generating Albedo, ORM (Roughness/Metalness), and Bump maps dynamically. Verlet cloth physics with structural and shear constraints. |
| **Smooth Motion** | Lenis 1.3.26 | **Excellent.** Inertial scrolling smoothly integrated with scroll-reveal triggers. |
| **Typography** | Inter, Anton, Cormorant Garamond (`next/font/google`) | **Optimized.** Zero layout shift (`display: swap`), preloaded at build time. |
| **Styling** | Plain CSS (`app/globals.css`) with CSS custom properties | **Performant.** Zero runtime CSS-in-JS overhead; responsive breakpoints at 1100px and 680px. |
| **Commerce Engine**| In-memory context + LocalStorage (`components/store.tsx`) | **Prototype Grade.** Requires migration to Shopify Storefront GraphQL API. |
| **Assets** | 10 Showcase Screenshots + Procedural SVGs | **Interim.** Procedural SVG fallback functions cleanly, but high-res campaign assets and SKU photographs are needed for live commercial launch. |

---

## 3. Architecture & Codebase Inspection

### 3.1 Directory Structure & File Map
```text
noolam-saree-showcase/
├── app/
│   ├── globals.css              # Core design tokens, typography, layout, modals, drawers, animations
│   ├── layout.tsx               # Root layout, Google Fonts injection, OpenGraph meta
│   └── page.tsx                 # Main storefront page assembling all 12 sections & drawers
├── components/
│   ├── Art.tsx                  # Procedural SVG fallback generator (sarees, jewellery, silhouettes)
│   ├── Bridal.tsx               # Curved carousel for bridal collection
│   ├── CartDrawer.tsx           # Slide-over cart drawer with promo codes, pincode check, currency
│   ├── CheckoutModal.tsx        # 3-step private checkout flow (details, payment selection, receipt)
│   ├── CurrencySelector.tsx     # Multi-currency switcher (INR, USD, GBP, AED)
│   ├── FloatingConcierge.tsx    # Bottom-right quick access trigger for 1-on-1 video tour
│   ├── Footer.tsx               # Heritage brand footer, newsletter, legal links, store coordinates
│   ├── Hero.tsx                 # Full-viewport hero with showroom backdrop and dual CTAs
│   ├── Icons.tsx                # Lightweight inline SVG icon system (lotus, bag, heart, truck, etc.)
│   ├── Intro.tsx                # Silk curtain intro orchestrator
│   ├── MuseFilm.tsx             # 16:9 brand film player with bidirectional scrolling photo columns
│   ├── MuseReels.tsx            # 3D arc reel carousel with fullscreen modal viewer
│   ├── Navbar.tsx               # Floating glass-morphism pill navbar with active section observer
│   ├── Photo.tsx                # Resilient image loader with instant procedural SVG fallback
│   ├── PickASilk.tsx            # 3D cursor-tilting cards on an elliptical arc
│   ├── SixMoods.tsx             # Gopuram temple-arch windows with lift & glow hover interaction
│   ├── SmoothScroll.tsx         # Lenis smooth inertial scrolling integration
│   ├── store.tsx                # BagContext provider (items, likes, currency, modals, vouchers)
│   ├── TheRack.tsx              # Interactive chrome rod clothes rail with filter chips & detail modal
│   ├── Ticker.tsx               # Fixed viewport-bottom infinite gold silk marquee
│   ├── TryTheLook.tsx           # Drag/scroll model carousel with "In this look" component bundle
│   ├── VideoConciergeModal.tsx  # Appointment scheduler for live WhatsApp video saree tour
│   ├── Weave.tsx                # Interactive 3-ribbon Three.js silk braid simulator
│   ├── WishlistDrawer.tsx       # Saved heirlooms slide-over drawer
│   └── three/
│       ├── Curtain3D.tsx        # WebGL silk curtain parting animation
│       ├── SilkDetail3D.tsx     # 3D garment close-up view with front/back toggle
│       └── SilkRack3D.tsx       # 3D hanging garments on rail with Verlet cloth sway
├── lib/
│   ├── data.ts                  # Centralized product data, looks, pricing, colors, and ticker lines
│   └── silk/
│       ├── cloth.ts             # Position-based Verlet cloth solver (particle constraints & pinning)
│       ├── garment.ts           # Hanger geometry + cloth mesh generation (saree, blouse, half-saree)
│       ├── stage.ts             # Shared Three.js scene setup, RoomEnvironment, resize handlers
│       └── texture.ts           # Canvas procedural PBR texture generation (Zari specular/metallic maps)
├── public/
│   └── screenshots/             # 10 full-resolution showcase screenshots for documentation & fallback
├── scripts/
│   └── images.mjs               # Asset audit script checking missing image slots vs IMAGE-PROMPTS.md
├── screenshots/                 # Repository master screenshot archive
├── IMAGE-PROMPTS.md             # Precise visual generation prompts for all 68 image slots
├── PLAN.md                      # Section reconstruction map and architectural plan
├── PROMPTS.md                   # Section-by-section prompts used during initial conception
├── HOW-WE-MADE.md               # Creative genesis and production notes
├── README.md                    # Main repository presentation and quick start guide
├── package.json                 # Dependency manifest and scripts
├── tsconfig.json                # TypeScript compiler configuration (strict mode enabled)
└── next.config.mjs              # Next.js configuration
```

---

## 4. Strengths & Architectural Highlights

1. **Zero External CSS Bloat**: The entire user interface is styled via clean, optimized CSS in `app/globals.css`. There are no runtime CSS-in-JS performance penalties or unneeded utility libraries.
2. **Procedural PBR Silk Simulation**: Rather than using static flat images, `lib/silk/texture.ts` and `lib/silk/cloth.ts` dynamically generate real-time metallic zari reflections and physics-based drape motion.
3. **Resilient Asset Fallback**: Through `components/Photo.tsx` and `components/Art.tsx`, missing images never produce broken layout shifts; the system renders customized procedural SVG artwork in the exact palette of each weave.
4. **Clean Component Boundaries**: Every section is cleanly encapsulated, making it straightforward to bind live Shopify GraphQL queries without disturbing presentation layers.
5. **Zero Compiler Warnings**: `npm run build` generates 100% valid static pages with no TypeScript errors or hydration warnings.

---

## 5. Critical Deficits & Gaps for Live Commerce

1. **Commerce Disconnect**:
   - Products are currently static objects in `lib/data.ts`.
   - Inventory levels are not tied to real warehouse stock.
   - Prices are hardcoded rather than dynamically pulled from Shopify Storefront API.
2. **Checkout & Gateway Absence**:
   - `CheckoutModal.tsx` provides an interactive customer experience, but does not yet redirect to an authentic Shopify Checkout URL or process real payments via Razorpay/Cashfree.
3. **Customer Accounts Missing**:
   - There is no Shopify Customer Account API integration for order tracking, saved addresses, or secure customer authentication.
4. **Logistics & PIN Validation**:
   - Pincode validation currently verifies digit length, but does not query live carrier APIs (Shiprocket / Delhivery) for courier serviceability, cash-on-delivery availability, or guaranteed transit days.
5. **Legal & Compliance Void**:
   - Statutory e-commerce disclosures (GSTIN, legal entity, return policy, cancellation policy, consumer grievance officer) are missing dedicated pages.
6. **SEO & Structured Data Gaps**:
   - The site lacks Schema.org JSON-LD markup (`Product`, `Offer`, `BreadcrumbList`, `Organization`) necessary for rich Google Search and Google Shopping indexing.
7. **Asset Production**:
   - 68 image slots are ready to receive final high-resolution AI campaign photography and authentic product studio imagery.

---

## 6. Audit Verdict

The project is **technically sound and aesthetically exceptional**, positioned at **Readiness Level 4 (Advanced Interactive Prototype)**. Proceeding through the 20-phase execution plan will systematically elevate it to **Readiness Level 10 (Live Enterprise Flagship)**.

