import { Metadata } from "next";
import { ContactHero } from "@/components/contato/ContactHero";
import { FAQ } from "@/components/contato/FAQ";
import { ContactForm } from "@/components/contato/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Rendal e a DCorp sobre incorporação, engenharia, obras e parcerias.",
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] overflow-x-hidden pt-20">
      <ContactHero />
      <FAQ />
      <ContactForm />
    </main>
  );
}
