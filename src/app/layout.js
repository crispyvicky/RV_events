import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/effects/CustomCursor";
import { SITE } from "@/lib/constants";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/rv-mark.svg", alt: SITE.name }],
  },
  icons: {
    icon: [{ url: "/brand/rv-favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/rv-favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [organizationJsonLd(), localBusinessJsonLd()];

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
