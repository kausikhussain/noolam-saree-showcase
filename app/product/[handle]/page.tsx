import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import VideoConciergeModal from "@/components/VideoConciergeModal";
import FloatingConcierge from "@/components/FloatingConcierge";
import ProductDetailView from "@/components/ProductDetailView";
import { BagProvider } from "@/components/store";
import { getAllProducts, getProductByHandle } from "@/lib/data";
import { generateProductSchema } from "@/lib/seo/schema";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    handle: p.handle,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return {
      title: "Heirloom Not Found · SUTRÉA",
    };
  }

  return {
    title: `${product.name} · SUTRÉA Flagship`,
    description: product.description,
    openGraph: {
      title: `${product.name} · SUTRÉA`,
      description: product.description,
      url: `https://sutrea.com/product/${product.handle}`,
      siteName: "SUTRÉA Heritage Silk",
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const jsonLd = generateProductSchema({
    title: product.name,
    description: product.description,
    sku: `STR-${product.handle.toUpperCase()}`,
    price: product.price,
    inStock: true,
  });

  return (
    <BagProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="section pdp-main">
        <ProductDetailView product={product} />
      </main>
      <Footer />
      <Ticker />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <VideoConciergeModal />
      <FloatingConcierge />
    </BagProvider>
  );
}
