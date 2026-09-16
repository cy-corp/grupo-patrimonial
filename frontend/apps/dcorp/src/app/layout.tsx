import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "DCORP Engenharia",
    template: "%s | DCORP Engenharia",
  },
  description:
    "Construção industrializada com engenharia, velocidade e controle. Sistemas construtivos de alta produtividade para incorporadoras, investidores e empresas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "DCORP Engenharia",
    title: "DCORP Engenharia",
    description:
      "Sistemas construtivos industrializados e soluções de alta produtividade. Projetos que constroem oportunidades.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCORP Engenharia",
    description:
      "Sistemas construtivos industrializados e soluções de alta produtividade.",
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
