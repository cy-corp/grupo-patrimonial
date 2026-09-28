import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { getRendalSiteUrl } from "@/lib/rendal/site";

const manrope = Manrope({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getRendalSiteUrl()),
  title: {
    default: "Rendal Incorporadora",
    template: "%s | Rendal",
  },
  description:
    "Cada centavo no lugar certo. Conheça os empreendimentos e agende visita sem compromisso.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rendal Incorporadora",
    title: "Aplicação inteligente do seu dinheiro | Rendal",
    description:
      "Cada centavo no lugar certo. Veja empreendimentos e agende visita sem compromisso.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplicação inteligente do seu dinheiro | Rendal",
    description:
      "Cada centavo no lugar certo. Veja empreendimentos e agende visita sem compromisso.",
  },
};

export default function RendalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
