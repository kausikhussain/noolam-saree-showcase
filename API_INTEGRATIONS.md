# NOOLAM · API Integrations Guide

---

## 1. Shopify Storefront GraphQL API (`2026-10`)

### Endpoint
```text
POST https://{shop_domain}/api/2026-10/graphql.json
```

### Authentication Header
```http
X-Shopify-Storefront-Access-Token: {storefront_access_token}
Content-Type: application/json
```

### Essential Query Scopes
- `unauthenticated_read_product_listings`: For fetching catalog products, collections, and variant details.
- `unauthenticated_read_product_inventory`: For checking real-time stock status before line additions.
- `unauthenticated_write_checkouts` & `unauthenticated_write_customers`: For cart creation and customer accounts.

---

## 2. Shopify Webhook Endpoint

### Route
```text
POST /api/webhooks/shopify
```

### Required Verification
All incoming requests are verified using timing-safe HMAC SHA-256 calculation:
```typescript
const generatedHash = crypto
  .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET)
  .update(rawBody, "utf8")
  .digest("base64");
```

---

## 3. WhatsApp Cloud API / Concierge Deep-Link

NOOLAM provides instant patron communication using standard RFC 3986 pre-formatted URI triggers:
```text
https://wa.me/{phone_number}?text={encoded_message}
```
Enables one-click handoff from the digital showroom directly to a senior silk stylist in Kanchipuram.

