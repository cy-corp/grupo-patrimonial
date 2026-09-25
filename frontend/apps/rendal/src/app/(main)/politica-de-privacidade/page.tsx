import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Rendal trata dados pessoais enviados pelo site e pelos formulários de contato.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] px-6 py-16 font-sans sm:py-20 md:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0F5B63]">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-6 text-base leading-7 text-pretty text-[#1F1F1F]/70">
          A Rendal Incorporadora coleta dados enviados por você nos formulários
          deste site (nome, email, telefone e mensagem) apenas para retornar
          contatos sobre empreendimentos, visitas e parcerias.
        </p>
        <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70">
          Não vendemos esses dados. O acesso fica restrito à equipe responsável
          pelo atendimento. Você pode pedir correção ou exclusão pelo canal de
          contato.
        </p>
        <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70">
          Ao enviar um formulário, você concorda com este uso. Em caso de dúvida,
          fale conosco.
        </p>
        <Link
          href="/contato"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#0F5B63] px-3 py-2 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A3F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]"
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        >
          Ir para contato
        </Link>
      </article>
    </main>
  );
}
