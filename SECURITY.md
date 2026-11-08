# NOOLAM · Security Architecture & Verification Protocols

---

## 1. Zero Secret Exposure Guarantee

- **Client Bundle Isolation:** Only variables explicitly prefixed with `NEXT_PUBLIC_` are bundled into browser JavaScript. All administrative credentials (`SHOPIFY_ADMIN_ACCESS_TOKEN`, `SHOPIFY_WEBHOOK_SECRET`, `RAZORPAY_KEY_SECRET`) remain strictly confined to server-side Edge runtimes.
- **Git Shield:** `.gitignore` explicitly prevents staging or committing `.env`, `.env.local`, `.env.production`, or private customer datasets.

---

## 2. Webhook Tamper & Replay Protection

To prevent forged order confirmations or replay attacks:
1. **Raw Body Inspection:** The cryptographic hash is computed directly against the unmodified UTF-8 request stream before JSON deserialization.
2. **Timing-Safe Equality:** Hashes are evaluated using `crypto.timingSafeEqual` to eliminate side-channel timing analysis attacks.
3. **Delivery Deduplication:** The incoming `x-shopify-delivery-id` header is tracked in an LRU memory buffer to prevent duplicate event execution.

---

## 3. PCI-DSS Compliance & Card Data Handling

NOOLAM does not touch, transmit, or store credit card numbers, CVVs, or bank login credentials. Payment collection is delegated entirely to certified PCI-DSS Level 1 compliant gateway handoffs (Shopify Checkout / Razorpay / Cashfree).

