import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  variable: "--font-concept-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Conceito · Nuvem de pontos",
  robots: { index: false, follow: false },
};

export default function ConceptLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${mono.variable} flex-1 bg-[#03161c] text-white`}>
      {children}
    </main>
  );
}
