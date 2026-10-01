import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { companies } from "@/lib/companies";
import {
  DCORP_DEFAULT_DESCRIPTION,
  DCORP_SIGNATURE,
  DCORP_SITE_NAME,
  getDcorpSiteUrl,
} from "../lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = getDcorpSiteUrl();
const company = companies.dcorp;
const description = `${DCORP_SIGNATURE} ${DCORP_DEFAULT_DESCRIPTION}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DCORP_SITE_NAME,
    template: `%s | ${DCORP_SITE_NAME}`,
  },
  description: DCORP_DEFAULT_DESCRIPTION,
  applicationName: DCORP_SITE_NAME,
  keywords: [
    "DCORP",
    "DCORP Engenharia",
    "construção industrializada",
    "engenharia Campinas",
    "painel EPS",
    "sistemas construtivos",
    "licenciamento ambiental",
    "CAR",
    "regularização de loteamento",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: DCORP_SITE_NAME,
    title: DCORP_SITE_NAME,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: DCORP_SITE_NAME,
    description: DCORP_DEFAULT_DESCRIPTION,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: DCORP_SITE_NAME,
  legalName: company.legalName,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: company.email,
  telephone: company.phoneHref.replace("tel:", ""),
  taxID: company.cnpj,
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
  name: DCORP_SITE_NAME,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function DcorpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <SiteShell companyId="dcorp">{children}</SiteShell>
      </body>
    </html>
  );
}
