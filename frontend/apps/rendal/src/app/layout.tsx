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
    "Casas Rendal para classes B e C: laje de lazer, lavabo social e acabamento onde se vê. Mais casa no mesmo investimento.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rendal Incorporadora",
    title: "Casa com presença no preço que cabe | Rendal",
    description:
      "Lazer na laje e acabamento onde o olho chega. Veja empreendimentos e agende visita sem compromisso.",
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
