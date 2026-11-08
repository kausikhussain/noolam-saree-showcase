/**
 * Structured Data (JSON-LD) generators for Search Engines & Google Shopping
 */

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NOOLAM",
    "legalName": "NOOLAM Kanchipuram Silks Private Limited",
    "url": "https://noolam.com",
    "logo": "https://noolam.com/brand/logo.png",
    "description": "Artisan handwoven Kanchipuram silk sarees crafted on traditional pit looms with certified pure gold and silver zari.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "42 Gandhi Road, Near Ekambareswarar Temple Outer Gate",
      "addressLocality": "Kanchipuram",
      "addressRegion": "Tamil Nadu",
      "postalCode": "631502",
      "addressCountry": "IN",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98400-12345",
      "contactType": "customer service",
      "availableLanguage": ["en", "ta", "te", "hi"],
      "areaServed": ["IN", "US", "GB", "AE", "SG", "MY"],
    },
  };
}

export function generateProductSchema(product: {
  title: string;
  description: string;
  sku: string;
  price: number;
  imageUrl?: string;
  inStock?: boolean;
}) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.imageUrl ? [`https://noolam.com${product.imageUrl}`] : ["https://noolam.com/images/hero-showroom.jpg"],
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "NOOLAM",
    },
    "material": "100% Pure Natural Mulberry Silk",
    "countryOfOrigin": {
      "@type": "Country",
      "name": "India",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://noolam.com/#silk`,
      "priceCurrency": "INR",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "NOOLAM",
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          },
          "cutoffTime": "15:00:00Z",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 4,
            "unitCode": "d",
          },
        },
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
    },
  };
}

