import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PreloadAssets } from "@/components/PreloadAssets";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
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
  );
}

