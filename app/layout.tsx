import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { site } from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Clínica dental · Javier Giménez Turrillas · San Sebastián-Donostia",
    template:
      "%s · Clínica dental Javier Giménez Turrillas · San Sebastián-Donostia",
  },
  description:
    "Clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia. Pide cita por teléfono o escribe un mensaje.",
  icons: {
    icon: [{ url: "/brand/logo-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/logo-mark-on-dark.svg", type: "image/svg+xml" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.nameFull,
  description:
    "Clínica dental del doctor Javier Giménez Turrillas en San Sebastián-Donostia. Pide cita por teléfono o escribe un mensaje.",
  telephone: "+34 943 42 82 24",
  email: site.email,
  image: "/brand/logo-horizontal.svg",
  hasMap: site.mapsHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Loyola, 15 1 Dcha",
    postalCode: "20005",
    addressLocality: "San Sebastián-Donostia",
    addressRegion: "Gipuzkoa",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.3181303,
    longitude: -1.9824521,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a className="skip-link" href="#contenido">
          Ir al contenido
        </a>
        <div className="site-shell">
          <Header />
          <main id="contenido" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
        </div>
      </body>
    </html>
  );
}
