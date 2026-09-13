import { Metadata } from "next";
import { ContactExperience } from "@/components/contato/ContactExperience";

export const metadata: Metadata = {
  title: "Contato",
  description: "Escolha Rendal ou DCorp e fale com a unidade certa.",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F1E3] pt-20">
      <ContactExperience />
    </div>
  );
}
