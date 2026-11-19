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
import ShopCatalog from "@/components/ShopCatalog";
import { BagProvider } from "@/components/store";
import { collectionsData, getCollectionByHandle } from "@/lib/data";
import Link from "next/link";
import { ArrowR } from "@/components/Icons";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  return collectionsData.map((c) => ({
    handle: c.handle,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection Not Found · SUTRÉA",
    };
  }

  return {
    title: `${collection.title} · SUTRÉA Flagship`,
    description: collection.description,
  };
}

export default async function CollectionStoryPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  return (
    <BagProvider>
      <Navbar />
      <main className="collection-page section">
        <header className="collection-hero-banner" style={{ background: collection.heroColor }}>
          <span className="eyebrow double">CURATED SUTRÉA ARCHIVE</span>
          <h1 className="collection-title">{collection.title}</h1>
          <p className="collection-tagline">"{collection.tagline}"</p>
          <p className="collection-desc">{collection.description}</p>
        </header>

        <section className="collection-catalog-section">
          <div className="collection-section-header">
            <span className="eyebrow">PIECES IN THIS EDIT</span>
            <h2>Select From The Loom Register</h2>
          </div>
          <ShopCatalog />
        </section>

        <div className="collection-footer-cta">
          <h3>Need Assistance Selecting a Muhurtham Weave?</h3>
          <p>Our senior silk curators provide one-on-one video drapes from our Kanchipuram flagship.</p>
          <Link href="/policies/contact" className="btn btn-maroon btn-lg">
            <span>Book Private Consultation</span>
            <span className="btn-dot"><ArrowR size={15} /></span>
          </Link>
        </div>
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
