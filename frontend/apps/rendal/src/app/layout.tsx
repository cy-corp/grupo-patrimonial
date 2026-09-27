import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Rendal Incorporadora",
    template: "%s | Rendal",
  },
  description:
    "Rendal Incorporadora: capital no lugar certo — da laje ao acabamento. Conheça empreendimentos e agende visita.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rendal Incorporadora",
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
