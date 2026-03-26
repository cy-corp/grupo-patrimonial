import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PreloadAssets } from "@/components/PreloadAssets";

import "@/app/globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-headline",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grupo Patrimonial",
    template: "%s | Grupo Patrimonial",
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
    siteName: "Grupo Patrimonial",
    title: "Grupo Patrimonial",
    description:
      "Soluções completas em Engenharia, Incorporação, Construção, Imobiliária e Gestão Patrimonial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Patrimonial",
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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <PreloadAssets />
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

