"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

const ETAPAS = [
  {
    title: "Conversa inicial",
    rendal: "Ouve a área, a documentação e o que você prefere.",
    voce: "Conta onde fica o terreno e o que já sabe sobre ele.",
  },
  {
    title: "Estudo de viabilidade",
    rendal: "Vê zoneamento, produto possível e caminho de aprovação.",
    voce: "Reúne matrícula e o que existir de plantas ou processos.",
  },
  {
    title: "Modelo de negócio",
    rendal: "Propõe venda, permuta ou parceria na SPE.",
    voce: "Escolhe o modelo com o qual se sente confortável.",
  },
  {
    title: "Aprovações",
    rendal: "Conduz projeto e licenças do empreendimento.",
    voce: "Acompanha os pontos que dependem do imóvel.",
  },
  {
    title: "Obra",
    rendal: "Contrata a construtora do projeto e acompanha a execução.",
    voce: "Recebe os marcos combinados no modelo escolhido.",
  },
  {
    title: "Comercialização",
    rendal: "Abre plantas e condições para quem vai morar.",
    voce: "Vê as unidades, se o modelo incluir permuta ou sociedade.",
  },
];

export function Journey() {
  const [open, setOpen] = useState(0);
  const etapa = open >= 0 ? ETAPAS[open] : null;

  return (
    <div>
      <ol className="m-0 hidden list-none gap-2 p-0 md:grid md:grid-cols-6">
        {ETAPAS.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-pressed={open === index}
              className={cn(
                "min-h-11 w-full cursor-pointer rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors duration-500 motion-reduce:transition-none",
                open === index ? "bg-[#1F1F1F] text-white" : "bg-white text-[#1F1F1F]",
              )}
              style={{ transitionTimingFunction: EASE }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-4 hidden overflow-hidden rounded-3xl bg-white p-6 md:block">
        {etapa ? (
          <div
            key={open}
            className="motion-safe:animate-[journey-fade_420ms_cubic-bezier(0.32,0.72,0,1)_both]"
          >
            <h3 className="text-2xl font-semibold text-[#1F1F1F]">{etapa.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#1F1F1F]/70">
              <span className="font-semibold text-[#7A4A2B]">A Rendal faz. </span>
              {etapa.rendal}
            </p>
            <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">
              <span className="font-semibold text-[#1F1F1F]">Você precisa. </span>
              {etapa.voce}
            </p>
          </div>
        ) : null}
      </div>

      <ol className="m-0 flex list-none flex-col gap-3 border-l border-[#C9A96A] p-0 pl-4 md:hidden">
        {ETAPAS.map((item, index) => {
          const on = open === index;
          return (
            <li key={item.title}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : index)}
                className="min-h-11 w-full cursor-pointer text-left text-base font-semibold text-[#1F1F1F]"
              >
                {item.title}
              </button>
              {on ? (
                <div
                  key={`mobile-${index}`}
                  className="pb-2 motion-safe:animate-[journey-fade_420ms_cubic-bezier(0.32,0.72,0,1)_both]"
                >
                  <p className="text-base leading-7 text-[#1F1F1F]/70">{item.rendal}</p>
                  <p className="mt-1 text-base leading-7 text-[#1F1F1F]/70">{item.voce}</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
