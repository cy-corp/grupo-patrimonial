import type { Metadata } from "next";
import { Allura, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Rendal Incorporadora",
    template: "%s | Rendal Incorporadora",
  },
  description:
    "A Rendal identifica oportunidades, estrutura negócios e desenvolve empreendimentos imobiliários.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rendal Incorporadora",
    title: "Rendal Incorporadora",
    description:
      "Desenvolvimento imobiliário com visão de mercado, segurança e geração de valor.",
  },
};

export default function RendalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${allura.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
