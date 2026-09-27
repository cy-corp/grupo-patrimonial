"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { RendalReveal } from "./RendalReveal";

const FAQ = [
  {
    q: "Para quem é o produto Rendal?",
    a: "Para quem procura uma casa confortável, com área de lazer, boa distribuição dos ambientes e acabamento pensado para o uso diário.",
  },
  {
    q: "O que é a laje de lazer?",
    a: "É uma cobertura impermeabilizada e preparada para uso. Em vez de servir apenas como proteção, ela recebe área de estar, pérgola e outros espaços de lazer.",
  },
  {
    q: "Por que a avaliação da Caixa costuma ficar acima do preço?",
    a: "Em projetos de referência, a avaliação chegou a ficar entre 30% e 40% acima do preço de venda. O resultado depende da unidade, do empreendimento e da análise do banco, portanto não é uma garantia.",
  },
  {
    q: "A visita tem compromisso de compra?",
    a: "Não. Você conhece o empreendimento, tira suas dúvidas e decide com calma. Só avança para a reserva quando quiser.",
  },
  {
    q: "Dá para financiar?",
    a: "A equipe orienta o processo com a Caixa e outros bancos, conforme a documentação, a unidade escolhida e o perfil do comprador. A aprovação depende da análise da instituição.",
  },
  {
    q: "Qual o prazo até a entrega?",
    a: "Depende do empreendimento e da fase de obra. Na visita ou no contato, você recebe o cronograma da unidade que está olhando.",
  },
  {
    q: "O que está incluído na unidade?",
    a: "Isso varia por empreendimento. Na visita, a equipe apresenta a planta, os acabamentos e o memorial descritivo da unidade que você está avaliando.",
  },
  {
    q: "Como falo com a Rendal sobre uma unidade?",
    a: "Use Ver empreendimentos para consultar as unidades ou Contato para falar com a equipe e agendar uma visita.",
  },
] as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div
      className="t-acc rounded-2xl bg-white ring-1 ring-[#1F1F1F]/10"
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="t-acc-head flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F8F1E3]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] sm:px-8"
      >
        <span className="text-base font-semibold text-balance text-[#1F1F1F] sm:text-lg">
          {question}
        </span>
        <span className="t-acc-chevron shrink-0 text-[#0F5B63]">
          <CaretDown weight="bold" className="size-5" aria-hidden />
        </span>
      </button>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="t-acc-panel">
        <div className="t-acc-panel-inner px-6 sm:px-8">
          <p className="pb-5 text-base leading-7 text-pretty text-[#1F1F1F]/65 sm:pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function RendalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="bg-[#FFFFFF] px-6 py-12 sm:py-20 md:py-24"
      aria-labelledby="faq-titulo"
    >
      <div className="mx-auto max-w-3xl">
        <RendalReveal>
          <header className="mb-10 text-center md:mb-12">
            <h2
              id="faq-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl md:text-5xl"
            >
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg">
              Antes de visitar: método, produto e próximo passo.
            </p>
          </header>
        </RendalReveal>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, index) => (
            <RendalReveal key={item.q} delayMs={Math.min(index * 40, 200)}>
              <FaqItem
                question={item.q}
                answer={item.a}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            </RendalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
