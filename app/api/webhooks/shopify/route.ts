import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In-memory set for deduplicating webhook delivery IDs within recent window
const processedDeliveries = new Set<string>();

/**
 * Timing-safe HMAC SHA-256 verification of incoming Shopify webhook payloads.
 * Official specification: https://shopify.dev/docs/apps/build/webhooks/verify-deliveries
 */
function verifyShopifyHmac(rawBody: string, hmacHeader: string | null, secret: string): boolean {
  if (!hmacHeader || !secret) return false;

  try {
    const generatedHash = crypto
      .createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("base64");

    const hmacBuffer = Buffer.from(hmacHeader, "base64");
    const generatedBuffer = Buffer.from(generatedHash, "base64");

    if (hmacBuffer.length !== generatedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(hmacBuffer, generatedBuffer);
  } catch (err) {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
  const topic = req.headers.get("x-shopify-topic");
  const deliveryId = req.headers.get("x-shopify-delivery-id");
  const shopDomain = req.headers.get("x-shopify-shop-domain");

  // Read raw body as text for cryptographic signature check
  const rawBody = await req.text();

  // If secret is configured in production, enforce HMAC signature check
  if (secret) {
    const isValid = verifyShopifyHmac(rawBody, hmacHeader, secret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }
  }

  // Idempotency: duplicate delivery prevention
  if (deliveryId) {
    if (processedDeliveries.has(deliveryId)) {
      return NextResponse.json({ message: "Duplicate webhook delivery acknowledged" }, { status: 200 });
    }
    processedDeliveries.add(deliveryId);
    // Keep set bounded to last 1000 IDs
    if (processedDeliveries.size > 1000) {
      const first = processedDeliveries.values().next().value;
      if (first) processedDeliveries.delete(first);
    }
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // Dispatch events based on topic
  switch (topic) {
    case "orders/create":
    case "orders/paid": {
      const orderId = payload.id;
      const orderNumber = payload.order_number;
      // In production, trigger WhatsApp dispatch confirmation and reserve weaving registry
      break;
    }
    case "orders/fulfilled": {
      const orderId = payload.id;
      // Trigger carrier AWB tracking alert to customer
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ success: true, topic, deliveryId }, { status: 200 });
}

