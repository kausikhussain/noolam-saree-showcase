import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
} from "@/types/shopify";
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_CART_QUERY,
} from "./queries";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_DISCOUNT_CODES_UPDATE_MUTATION,
} from "./mutations";
import { silkCards, looks, rack } from "@/lib/data";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2026-10";

export const isShopifyConfigured = Boolean(domain && storefrontAccessToken);

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = "force-cache",
  tags = [],
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ status: number; body: { data?: T; errors?: { message: string }[] } }> {
  if (!isShopifyConfigured) {
    return {
      status: 200,
      body: { errors: [{ message: "Shopify credentials not configured; serving fallback catalogue." }] },
    };
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { tags },
    });

    const body = await result.json();
    return {
      status: result.status,
      body,
    };
  } catch (error) {
    return {
      status: 500,
      body: { errors: [{ message: error instanceof Error ? error.message : "Unknown error in shopifyFetch" }] },
    };
  }
}

/**
 * Transforms local catalogue data into ShopifyProduct shape for offline / staging fallback
 */
function getFallbackProducts(): ShopifyProduct[] {
  return silkCards.map((card, idx) => ({
    id: `gid://shopify/Product/local-${idx + 1}`,
    handle: card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: card.title,
    description: `Authentic Kanchipuram silk saree with rich zari border and traditional temple motifs. Draped in heritage palette: ${card.colors.join(", ")}.`,
    availableForSale: true,
    productType: "Silk Saree",
    vendor: "NOOLAM",
    tags: ["kanchipuram", "pure-silk", card.pattern],
    priceRange: {
      minVariantPrice: { amount: card.price.toString(), currencyCode: "INR" },
      maxVariantPrice: { amount: card.price.toString(), currencyCode: "INR" },
    },
    featuredImage: {
      url: `/images/silks/${idx + 1}.png`,
      altText: card.title,
      width: 1024,
      height: 1536,
    },
    images: {
      edges: [
        {
          node: {
            url: `/images/silks/${idx + 1}.png`,
            altText: card.title,
            width: 1024,
            height: 1536,
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: `gid://shopify/ProductVariant/local-${idx + 1}-1`,
            title: "Default",
            availableForSale: true,
            sku: `NLM-KAN-${(idx + 1).toString().padStart(3, "0")}`,
            quantityAvailable: 5,
            price: { amount: card.price.toString(), currencyCode: "INR" },
            selectedOptions: [{ name: "Title", value: "Default Title" }],
          },
        },
      ],
    },
    metafields: [
      { namespace: "custom", key: "zari_type", value: "Pure 3-Ply Gold Zari", type: "single_line_text_field" },
      { namespace: "custom", key: "weave_technique", value: card.pattern, type: "single_line_text_field" },
      { namespace: "custom", key: "weight_grams", value: "780g", type: "single_line_text_field" },
      { namespace: "custom", key: "silk_mark_number", value: `SM-IN-2026-0${idx + 1}`, type: "single_line_text_field" },
      { namespace: "custom", key: "blouse_piece_included", value: "true", type: "boolean" },
    ],
  }));
}

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured) {
    return getFallbackProducts();
  }

  const response = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
    tags: ["products"],
  });

  if (response.body.data?.products?.edges) {
    return response.body.data.products.edges.map((e) => e.node);
  }

  return getFallbackProducts();
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!isShopifyConfigured) {
    const fallback = getFallbackProducts();
    return fallback.find((p) => p.handle === handle) || null;
  }

  const response = await shopifyFetch<{ product: ShopifyProduct }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  });

  return response.body.data?.product || null;
}

export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<ShopifyCart | null> {
  if (!isShopifyConfigured) return null;

  const response = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: CART_CREATE_MUTATION,
    variables: {
      input: {
        lines: lines.map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity })),
      },
    },
    cache: "no-store",
  });

  return response.body.data?.cartCreate?.cart || null;
}

