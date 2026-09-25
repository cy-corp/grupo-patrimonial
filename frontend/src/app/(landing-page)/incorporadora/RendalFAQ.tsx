"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { RendalReveal } from "./RendalReveal";

const FAQ = [
  {
    q: "Para quem é a casa Rendal?",
    a: "Para famílias das classes B e C que querem presença de empreendimento sem pagar o preço do luxo. Valor onde se vê, racionalização onde não se vê.",
  },
  {
    q: "O que é a laje de lazer?",
    a: "Em vez de gastar com telhado tradicional, a cobertura é impermeabilizada e vira área de estar. Com o mesmo investimento do telhado, você ganha lazer e vista.",
  },
  {
    q: "Por que a avaliação da Caixa costuma ficar acima do preço?",
    a: "Porque o produto entrega acabamento e área perceptíveis que a avaliação reconhece. Em casos de referência, a diferença chega a 30 a 40% acima do preço de venda.",
  },
  {
    q: "A visita tem compromisso de compra?",
    a: "Não. Você agenda, conhece o produto e decide com calma. Reserva só acontece quando você quiser avançar.",
  },
  {
    q: "Dá para financiar?",
    a: "Sim. A equipe orienta o caminho com a Caixa e outros bancos, alinhando documentação e condições ao perfil do comprador.",
  },
  {
    q: "Qual o prazo até a entrega?",
    a: "Depende do empreendimento e da fase de obra. Na visita ou no contato, você recebe o cronograma da unidade que está olhando.",
  },
  {
    q: "O que significa inteligência onde não se vê?",
    a: "É alocar orçamento no que o olho e o uso sentem, e racionalizar estrutura, tubulação e itens técnicos que não mudam a percepção da casa.",
  },
  {
    q: "Como falo com a Rendal sobre uma unidade?",
    a: "Use Ver empreendimentos para conhecer o produto, ou Contato para agendar visita. O próximo passo fica claro no primeiro retorno da equipe.",
  },
] as const;

const EASE = "cubic-bezier(0.32,0.72,0,1)";

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
    <div className="rounded-2xl bg-white ring-1 ring-[#1F1F1F]/10">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-700 hover:bg-[#F8F1E3]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.99] sm:px-8"
        style={{ transitionTimingFunction: EASE }}
      >
        <span className="text-base font-semibold text-balance text-[#1F1F1F] sm:text-lg">
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={cn(
            "size-5 shrink-0 text-[#0F5B63] transition-transform duration-700",
            open && "rotate-180",
          )}
          style={{ transitionTimingFunction: EASE }}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-6 pb-5 sm:px-8 sm:pb-6"
      >
        <p className="text-base leading-7 text-pretty text-[#1F1F1F]/65">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function RendalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="bg-[#FFFFFF] px-6 py-16 sm:py-20 md:py-24"
      aria-labelledby="faq-titulo"
    >
      <div className="mx-auto max-w-3xl">
        <RendalReveal>
          <header className="mb-10 text-center md:mb-12">
            <h2
              id="faq-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl md:text-5xl"
            >
              Perguntas antes de visitar
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg">
              Objeções comuns de quem compara casa popular com produto de
              presença.
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
