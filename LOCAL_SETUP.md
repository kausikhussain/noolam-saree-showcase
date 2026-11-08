# NOOLAM · Local Developer Setup Guide (Windows)

This document provides step-by-step instructions for running, testing, and developing the **NOOLAM** Kanchipuram Silk Flagship application on Windows using PowerShell.

---

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher
- **PowerShell**: Windows PowerShell 5.1 or PowerShell 7+
- **Git**: 2.30+

Verify installations in your terminal:
```powershell
node -v
npm -v
git --version
```

---

## 2. Quick Setup (Automated)

We provide pre-configured PowerShell automation scripts in the `scripts/` directory:

```powershell
# 1. Navigate to project root
cd E:\noolam-saree\noolam-saree-showcase

# 2. Run automated setup (creates .env.local and installs packages)
.\scripts\setup.ps1

# 3. Start the development server
.\scripts\start.ps1
```

Once running, open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 3. Manual Step-by-Step Setup

If you prefer to configure manually:

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/kausikhussain/noolam-saree-showcase.git
   cd noolam-saree-showcase
   ```

2. **Copy the Environment Template:**
   ```powershell
   Copy-Item .env.example .env.local
   ```

3. **Install Dependencies:**
   ```powershell
   npm install
   ```

4. **Start Development Server:**
   ```powershell
   npm run dev
   ```

---

## 4. Environment Variables Configuration

Open `.env.local` in your editor to configure live integrations when ready:

```env
# Shopify Storefront API Credentials
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2026-10

# Server-side Webhook Verification Secret
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret
```

> **Note:** If Shopify credentials are omitted, the application automatically runs in **Staging Mode**, serving our verified local Kanchipuram catalogue with full interactive cloth simulation, cart drawers, currency conversions, and checkout simulation intact.

---

## 5. Running Health Checks & Validation

Before committing code, verify type-safety and production compilation:

```powershell
.\scripts\check.ps1
```

This script automatically executes:
1. Strict TypeScript compilation (`tsc --noEmit`)
2. Asset manifest verification (`npm run check-images`)
3. Next.js production build (`npm run build`)

