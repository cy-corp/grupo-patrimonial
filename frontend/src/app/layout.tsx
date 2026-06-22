import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Patrimonial Inc.",
    template: "%s | Patrimonial Incorporações",
  },
  description:
    "Soluções completas em Engenharia, Incorporação, Construção, Imobiliária e Gestão Patrimonial. Transformamos imóveis em ativos sólidos e rentáveis com visão de longo prazo.",
  keywords: [
    "engenharia civil",
    "incorporadora",
    "construtora",
    "imobiliária",
    "gestão patrimonial",
    "investimento imobiliário",
    "patrimônio imobiliário",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Patrimonial Incorporações",
    title: "Patrimonial Incorporações",
    description:
      "Soluções completas em Engenharia, Incorporação, Construção, Imobiliária e Gestão Patrimonial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrimonial Incorporações",
    description:
      "Soluções completas em Engenharia, Incorporação, Construção, Imobiliária e Gestão Patrimonial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
