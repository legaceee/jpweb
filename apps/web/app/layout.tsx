import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import WhatsAppFloat from "../components/whatsapp-float";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JP Enterprises | Premium Interior Design & Civil Contractor",
    template: "%s | JP Enterprises"
  },
  description: "JP Enterprises offers luxury interior design, modular kitchens, turnkey civil contracting, house construction, and premium renovations. Crafting spaces with timeless elegance and precision.",
  keywords: ["Interior Design", "Civil Contractor", "House Construction", "Modular Kitchen", "Renovation Services", "Luxury Interiors", "JP Enterprises"],
  metadataBase: new URL("https://jpenterprises.com"),
  openGraph: {
    title: "JP Enterprises | Premium Interior Design & Civil Contractor",
    description: "Crafting luxury residential and commercial spaces from architectural foundation to premium interior finishes.",
    url: "https://jpenterprises.com",
    siteName: "JP Enterprises",
    images: [
      {
        url: "/images/hero_bg.png",
        width: 1200,
        height: 630,
        alt: "JP Enterprises Luxury Living Room"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Enterprises | Premium Interior Design & Civil Contractor",
    description: "Crafting luxury residential and commercial spaces from architectural foundation to premium interior finishes.",
    images: ["/images/hero_bg.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="bg-dark text-light antialiased selection:bg-primary selection:text-dark">
        <Navbar />
        <div className="min-h-screen flex flex-col pt-20">
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
