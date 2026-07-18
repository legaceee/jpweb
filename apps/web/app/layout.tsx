import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FloatingWhatsApp from "../components/floating-whatsapp";
import { I18nProvider } from "../context/i18n-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "JP Enterprises | Interior Design & Civil Contracting in Mumbai",
  description:
    "JP Enterprises delivers hands-on interior design and civil contracting across Mumbai. Decades of experience in renovation, construction, and turnkey execution — from foundation to finish.",
  keywords: [
    "Interior Design Mumbai",
    "Civil Contractor Mumbai",
    "Home Renovation Mumbai",
    "Construction Mumbai",
    "Turnkey Contractor Mumbai",
    "JP Enterprises",
  ],
  metadataBase: new URL("https://jpenterprises.com"),
  openGraph: {
    title: "JP Enterprises | Interior Design & Civil Contracting in Mumbai",
    description:
      "Decades of hands-on contracting experience in Mumbai. Interior design and civil contracting under one roof.",
    url: "https://jpenterprises.com",
    siteName: "JP Enterprises",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('jp-theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </I18nProvider>
      </body>
    </html>
  );
}
