import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/seo/JsonLd";
import { companies } from "@/lib/companies";
import { getRendalSiteUrl } from "@/lib/rendal/site";

const manrope = Manrope({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getRendalSiteUrl();
const company = companies.rendal;

const title = "Rendal Incorporadora | Grupo Rendal";
const description =
  "Incorporadora do Grupo Rendal em Campinas. Cada centavo no lugar certo — conheça os empreendimentos e agende visita sem compromisso.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Rendal",
  },
  description,
  applicationName: "Rendal Incorporadora",
  keywords: [
    "Rendal",
    "Grupo Rendal",
    "Rendal Incorporadora",
    "incorporadora Campinas",
    "empreendimentos Campinas",
    "casas à venda Campinas",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Rendal Incorporadora",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Rendal Incorporadora",
  legalName: company.legalName,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: company.email,
  telephone: company.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Dr. João Alves dos Santos, 332",
    addressLocality: "Campinas",
    addressRegion: "SP",
    postalCode: "13092-331",
    addressCountry: "BR",
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rendal Incorporadora",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RendalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        {children}
      </body>
    </html>
  );
}
