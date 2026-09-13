import type { Metadata } from "next";
import { Allura, Montserrat } from "next/font/google";
import "@/app/globals.css";

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
    default: "Grupo Rendal e DCorp Engenharia",
    template: "%s | Rendal e DCorp",
  },
  description:
    "Duas empresas, papéis claros: a Rendal estrutura o negócio; a DCorp projeta e constrói.",
  keywords: [
    "grupo rendal",
    "dcorp engenharia",
    "incorporadora",
    "engenharia civil",
    "construção industrial",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Grupo Rendal",
    title: "Grupo Rendal e DCorp Engenharia",
    description:
      "Duas empresas, papéis claros: a Rendal estrutura o negócio; a DCorp projeta e constrói.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Rendal e DCorp Engenharia",
    description:
      "Duas empresas, papéis claros: a Rendal estrutura o negócio; a DCorp projeta e constrói.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${allura.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
