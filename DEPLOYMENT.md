# NOOLAM · Production Deployment Guide (Vercel)

---

## 1. Vercel Staged Deployment Protocol

NOOLAM is pre-configured for automated deployment on **Vercel Pro**:

### Step 1: Connect GitHub Repository
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and select `kausikhussain/noolam-saree-showcase`.
3. Select **Next.js** framework preset.

### Step 2: Configure Environment Variables
Add the following in Vercel **Project Settings → Environment Variables**:

| Variable Name | Environment Scope | Value Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Production & Preview | `your-store.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Production & Preview | Storefront Access Token |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Production & Preview | `2026-10` |
| `SHOPIFY_WEBHOOK_SECRET` | Production & Preview | Shopify Webhook HMAC Secret |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://noolam.com` |

### Step 3: Production Domain DNS
Add the custom domain in Vercel:
- **A Record:** `@` points to `76.76.21.21`
- **CNAME:** `www` points to `cname.vercel-dns.com`
Vercel automatically provisions and renews 256-bit SSL certificates.

