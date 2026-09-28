import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Rendal trata dados pessoais enviados pelo site e pelos formulários de contato.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const SECTIONS = [
  {
    id: "dados",
    title: "Dados que recebemos",
    body: "Nos formulários deste site podemos receber nome, e-mail, telefone ou WhatsApp, assunto e mensagem. Campos do perfil — empreendimento, terreno, parceria — entram na mesma mensagem.",
  },
  {
    id: "uso",
    title: "Para que usamos",
    body: "Usamos esses dados só para retornar contatos sobre empreendimentos, visitas, terrenos e parcerias. O envio passa por verificação antifraude (Cloudflare Turnstile), limite de tentativas e entrega de e-mail (Resend), com hospedagem na Vercel.",
  },
  {
    id: "direitos",
    title: "Seus direitos",
    body: "Não vendemos esses dados. O acesso fica com a equipe de atendimento. Você pode pedir correção ou exclusão pelo canal de contato. Ao enviar um formulário, você concorda com este uso.",
  },
];

export default function PoliticaPage() {
  return (
    <main id="conteudo" className="bg-[#F8F1E3] px-6 pt-36 pb-20">
      <article className="mx-auto max-w-[68ch]">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl">
          Política de Privacidade
        </h1>
        <details className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-[#1F1F1F]/10">
          <summary className="min-h-11 cursor-pointer text-sm font-semibold text-[#0F5B63]">Índice</summary>
          <nav className="mt-3 flex flex-col gap-2" aria-label="Índice">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="inline-flex min-h-11 items-center text-base text-[#1F1F1F]">
                {section.title}
              </a>
            ))}
          </nav>
        </details>
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28 mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1F1F1F]">
              <a href={`#${section.id}`}>{section.title}</a>
            </h2>
            <p className="mt-3 text-base leading-7 text-[#1F1F1F]/70">{section.body}</p>
          </section>
        ))}
        <p className="mt-10 text-sm leading-6 text-[#1F1F1F]/60">
          Texto operacional do site. A revisão jurídica ainda precisa validar o documento final.
        </p>
        <Link href="/contato" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#0F5B63] px-6 font-semibold text-white">
          Ir para contato
        </Link>
      </article>
    </main>
  );
}
