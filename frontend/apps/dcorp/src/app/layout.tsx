import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DCORP_SITE_NAME,
    template: `%s | ${DCORP_SITE_NAME}`,
  },
  description: DCORP_DEFAULT_DESCRIPTION,
  applicationName: DCORP_SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: DCORP_SITE_NAME,
    title: DCORP_SITE_NAME,
    description: `${DCORP_SIGNATURE} ${DCORP_DEFAULT_DESCRIPTION}`,
  },
  twitter: {
    card: "summary_large_image",
    title: DCORP_SITE_NAME,
    description: DCORP_DEFAULT_DESCRIPTION,
  },
};

export default function DcorpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <SiteShell companyId="dcorp">{children}</SiteShell>
      </body>
    </html>
  );
}
