import Link from "next/link";
import { companies, formatCnpj } from "@/lib/companies";

const company = companies.dcorp;

const SECTIONS = [
  {
    title: "Quem controla os dados",
    body: `${company.legalName}, CNPJ ${formatCnpj(company.cnpj)}, com sede em ${company.address}, é a controladora dos dados pessoais coletados por este site.`,
  },
  {
    title: "Quais dados coletamos",
    body: "Pelo formulário de contato podemos receber nome, e-mail, telefone/WhatsApp, assunto e mensagem. Campos opcionais na mensagem (obra, localização, sistema de interesse) também podem ser enviados por você.",
  },
  {
    title: "Para que usamos",
    body: "Os dados são usados para responder solicitações de orçamento ou parceria, entrar em contato sobre o pedido e organizar o atendimento comercial e técnico. Não vendemos dados pessoais.",
  },
  {
    title: "Base legal",
    body: "O tratamento ocorre com base no consentimento (quando você autoriza o envio pelo formulário) e no legítimo interesse de atender pedidos comerciais iniciados por você, nos termos da Lei Geral de Proteção de Dados (LGPD).",
  },
  {
    title: "Compartilhamento",
    body: "Podemos utilizar provedores de e-mail e infraestrutura necessários ao envio e armazenamento das mensagens. Esses prestadores atuam como operadores, sob instruções da DCORP.",
  },
  {
    title: "Retenção",
    body: "Mantemos os dados pelo tempo necessário para concluir o atendimento e cumprir obrigações legais ou de defesa de direitos. Depois, eliminamos ou anonimizamos quando aplicável.",
  },
  {
    title: "Seus direitos",
    body: "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação de dados desnecessários, informação sobre compartilhamentos e revogação do consentimento, nos limites da LGPD.",
  },
  {
    title: "Como falar conosco",
    body: `Para exercer direitos ou esclarecer dúvidas sobre privacidade, escreva para ${company.email} ou ligue para ${company.phone}.`,
  },
] as const;

export default function DcorpPoliticaPrivacidadePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-0">
        <header>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#C9A96A]">
              Legal
            </p>
          </div>
          <h1 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
            Esta página explica como tratamos dados pessoais no site da DCORP.
            Última atualização: setembro de 2026.
          </p>
        </header>

        <ol className="mt-14 space-y-10 border-t border-[#D9D9D9] pt-10">
          {SECTIONS.map((section, index) => (
            <li key={section.title}>
              <p className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-sans text-xl font-semibold text-[#1F1F1F]">
                {section.title}
              </h2>
              <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
                {section.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-14 border-t border-[#D9D9D9] pt-8 font-sans text-sm text-[#4D4D4D]">
          Voltar para{" "}
          <Link
            href="/contato"
            className="font-semibold text-[#1F1F1F] underline decoration-[#C9A96A] underline-offset-4 transition-colors hover:text-[#C9A96A]"
          >
            Contato
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
