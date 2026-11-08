# NOOLAM · Architecture & Technical Specifications

---

## 1. System Topology

NOOLAM is engineered as a **Headless Luxury Commerce Platform** combining a Next.js 15 App Router storefront on the Vercel Edge with Shopify Cloud serving as the single source of truth for commerce operations.

```text
Patron Browser (Mobile / Desktop)
   │
   ├─► Vercel Edge Network (Next.js 15 Server Components)
   │     ├─► Server-rendered HTML & Pre-calculated JSON-LD
   │     ├─► Edge API Routes (Shopify Webhook HMAC Consumer)
   │     └─► Localized Pincode Delivery Estimator
   │
   ├─► Three.js Real-Time Cloth Physics (WebGL 2.0 Canvas)
   │     ├─► Verlet Particle Integration (Draping & Sway)
   │     ├─► Procedural PBR Canvas Shaders (Metallic Zari ORM + Bump)
   │     └─► Device Tier Fallbacks for Mobile Power Efficiency
   │
   └─► Shopify Headless Cloud (GraphQL API v2026-10)
         ├─► Storefront API (Product Catalog, Collections, Search)
         ├─► Cart Mutations (Server-side Session Persistence)
         ├─► Hosted Checkout (PCI-DSS Level 1 Payment Handoff)
         └─► Admin API & Webhooks (Inventory & Order Synchronization)
```

---

## 2. Core Subsystems

### 2.1 PBR Silk Cloth Physics Engine (`lib/silk/`)
- **Particle System (`cloth.ts`):** 2D particle grid mapped to `THREE.PlaneGeometry` vertices. Verlet integration advances positions based on velocity damping ($0.982$) and gravitational acceleration. Structural and shear spring constraints are iteratively satisfied over 10 relaxation passes per frame.
- **PBR Material Synthesis (`texture.ts`):** Canvas-based multi-texture synthesizer generating three synchronized textures in lock-step:
  1. *Albedo (Color):* Woven body tones (Kanchipuram rani pink, imperial violet, bottle green).
  2. *ORM (Occlusion, Roughness, Metalness):* Assigns metalness $0.92$ to gold/silver zari threads and roughness $0.38$ to mulberry silk.
  3. *Bump Map:* Creates raised physical thread relief for traditional Korvai temple borders.

### 2.2 Synchronized Commerce Context (`components/store.tsx`)
- Provides global state for shopping bag items, wishlist persistence, multi-currency conversions, and active modal overlays.
- Seamlessly synchronizes with browser `localStorage` on client devices while maintaining hydration safety during Next.js SSR.
- Connects to Shopify Storefront API when configured, generating server-backed checkout URLs.

### 2.3 Logistics & PIN Code Serviceability (`lib/shipping/`)
- Validates 6-digit Indian Postal Index Numbers (PIN codes) against geographic circles.
- Estimates accurate courier transit days for priority air freight dispatch from the Kanchipuram master loom hub.

