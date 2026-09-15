import type { Metadata } from "next";
import { Allura, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";

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
    default: "DCorp Engenharia",
    template: "%s | DCorp Engenharia",
  },
  description:
    "Engenharia e construção de casas, obras térreas e soluções construtivas de alta produtividade.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "DCorp Engenharia",
    title: "DCorp Engenharia",
    description:
      "Construção com engenharia, produtividade, controle e previsibilidade.",
  },
};

export default function DcorpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${allura.variable} font-sans antialiased`}>
        <SiteShell companyId="dcorp">{children}</SiteShell>
      </body>
    </html>
  );
}
