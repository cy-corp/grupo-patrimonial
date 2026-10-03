import type { Metadata } from "next";
import { QuoteExperience } from "@/components/site/quote-experience";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { contact, whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Orçamento",
  alternates: { canonical: "/orcamento" },
  description: "Monte o seu pedido de orçamento de topografia e georreferenciamento em quatro passos.",
};

// Texto provisório, a confirmar com a i3Geo.
const next = [
  { title: "Você envia o pedido", text: "O resumo segue para a i3Geo pelo WhatsApp, pronto para a conversa começar." },
  { title: "A equipe analisa o caso", text: "Entendemos a necessidade e, se for preciso, pedimos os documentos do imóvel." },
  { title: "Você recebe a proposta", text: "Com o serviço indicado, o escopo, o prazo e o valor, sem compromisso." },
] as const;

export default function OrcamentoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#03121A] text-white">
        <QuoteExperience heading="h1" />

        <section className="border-t border-white/15">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">O que acontece depois</h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {next.map((step, i) => (
                <li key={step.title} className="border-t-2 border-orange pt-6">
                  <p className="text-sm font-bold text-orange tabular-nums">Passo {i + 1}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-[38ch] leading-relaxed text-white/75">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-16 text-lg text-white/80">
              Prefere falar direto?{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-[#A9E3F0]"
              >
                Chame no WhatsApp {contact.phone}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
