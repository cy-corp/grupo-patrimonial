import { Metadata } from "next";
import { ContactHero } from "@/components/contato/ContactHero";
import { FAQ } from "@/components/contato/FAQ";
import { ContactForm } from "@/components/contato/ContactForm";

export const metadata: Metadata = {
  title: "Contato | Patrimonial Incorporações",
  description: "Entre em contato com a Patrimonial Incorporações e esclareça suas dúvidas sobre investimentos e parcerias.",
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
