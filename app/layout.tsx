import type { Metadata } from "next";
import { Inter, Anton, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "NOOLAM · Kanchipuram Silk Saree Flagship",
  description: "Handcrafted pure mulberry silk sarees handwoven on traditional temple looms in Kanchipuram. Silk Mark certified with authentic gold and silver zari.",
  keywords: [
    "Kanchipuram silk saree",
    "Kanjivaram saree",
    "pure zari silk saree",
    "bridal silk saree",
    "Silk Mark certified saree",
    "wedding pattu saree",
    "handloom silk saree",
  ],
  authors: [{ name: "NOOLAM Silks" }],
  creator: "NOOLAM",
  publisher: "NOOLAM Kanchipuram Silks Private Limited",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://noolam.com"),
  openGraph: {
    title: "NOOLAM · Woven for the Divine",
    description: "Experience the tactile heritage of pure Kanchipuram silk sarees with real-time 3D drape physics.",
    url: "https://noolam.com",
    siteName: "NOOLAM Kanchipuram Silk",
    images: [
      {
        url: "/screenshots/01-hero.png",
        width: 1920,
        height: 1080,
        alt: "NOOLAM Heritage Silk Showroom",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOOLAM · Kanchipuram Silk",
    description: "Pure mulberry silk sarees handwoven on the temple looms of Kanchipuram.",
    images: ["/screenshots/01-hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
