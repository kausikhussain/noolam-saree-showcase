import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "SUTRÉA · Heritage Silk Saree Flagship",
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
  authors: [{ name: "SUTRÉA" }],
  creator: "SUTRÉA",
  publisher: "SUTRÉA Luxury Silks Private Limited",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sutrea.com"),
  openGraph: {
    title: "SUTRÉA · Woven to Be Remembered",
    description: "Experience the tactile heritage of pure Kanchipuram silk sarees with real-time 3D drape physics.",
    url: "https://sutrea.com",
    siteName: "SUTRÉA Heritage Silk",
    images: [
      {
        url: "/screenshots/01-hero.png",
        width: 1920,
        height: 1080,
        alt: "SUTRÉA Heritage Silk Showroom",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUTRÉA · Heritage Silk",
    description: "Pure mulberry silk sarees handwoven on the temple looms of Kanchipuram.",
    images: ["/screenshots/01-hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${serif.variable}`}>
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
