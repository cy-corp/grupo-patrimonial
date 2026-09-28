"use client";

import { useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { PartnerKit } from "@/components/rendal/parceiros/PartnerKit";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import { RendalReveal } from "@/components/rendal/RendalReveal";

const TABS = [
  {
    id: "imobiliarias",
    label: "Imobiliárias e corretores",
    oferece: "Produto com planta, memorial e argumentos visuais prontos para explicar.",
    espera: "Quem apresenta o projeto com o mesmo cuidado da visita.",
    comecar: "Cadastro, material e visitas agendadas pela equipe Rendal.",
  },
  {
    id: "construcao",
    label: "Construção",
    oferece: "Projeto definido antes da obra e um escopo claro por empreendimento.",
    espera: "Execução fiel ao que foi desenhado.",
    comecar: "Conversa sobre capacidade, prazo e encaixe no projeto.",
  },
  {
    id: "fornecedores",
    label: "Fornecedores",
    oferece: "Especificação do que entra onde o morador percebe.",
    espera: "Entrega no padrão combinado, sem surpresa na obra.",
    comecar: "Envie o que você fornece e a cidade em que atende.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PartnerTabs({ initial = "imobiliarias" }: { initial?: TabId }) {
  const start = TABS.find((tab) => tab.id === initial)?.id ?? TABS[0].id;
  const [currentId, setCurrentId] = useState<TabId>(start);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);
  const indexRef = useRef(TABS.findIndex((tab) => tab.id === start));

  const current = TABS.find((tab) => tab.id === currentId) ?? TABS[0];
  const currentIndex = TABS.findIndex((tab) => tab.id === currentId);

  const select = (id: TabId) => {
    const next = TABS.findIndex((tab) => tab.id === id);
    if (next < 0 || next === currentIndex) return;
    setDirection(next > indexRef.current ? 1 : -1);
    indexRef.current = next;
    setCurrentId(id);
    setAnimKey((key) => key + 1);
  };

  return (
    <>
      <section className="px-6 py-12" aria-label="Tipo de parceiro">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2" role="tablist">
          {TABS.map((tab) => {
            const on = tab.id === currentId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => select(tab.id)}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold transition-colors duration-500",
                  on
                    ? "bg-[#0F5B63] text-white"
                    : "bg-white text-[#1F1F1F] ring-1 ring-[#1F1F1F]/10",
                )}
                style={{ transitionTimingFunction: EASE }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden">
          <article
            key={animKey}
            className="rounded-3xl bg-white p-6 text-center ring-1 ring-[#1F1F1F]/10 motion-safe:animate-[partner-slide_520ms_cubic-bezier(0.32,0.72,0,1)_both]"
            style={
              {
                ["--partner-from"]: direction > 0 ? "28px" : "-28px",
              } as CSSProperties
            }
          >
            <h2 className="text-2xl font-semibold text-[#1F1F1F]">{current.label}</h2>
            <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70">
              A Rendal oferece: {current.oferece}
            </p>
            <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">
              A Rendal espera: {current.espera}
            </p>
            <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">
              Como começar: {current.comecar}
            </p>
            {current.id === "construcao" ? (
              <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70">
                Trabalhamos com construtoras escolhidas por projeto.
              </p>
            ) : null}
          </article>
        </div>
      </section>

      {current.id === "imobiliarias" ? (
        <RendalReveal>
          <section className="px-6 py-12" aria-labelledby="kit-titulo">
            <div className="mx-auto max-w-5xl text-center">
              <h2 id="kit-titulo" className="text-3xl font-semibold tracking-tight text-[#1F1F1F]">
                Kit de argumento
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#1F1F1F]/70">
                Três cartões no formato de story, prontos para mostrar o produto. Toque um cartão para ver maior.
              </p>
              <div className="mt-8">
                <PartnerKit />
              </div>
            </div>
          </section>
        </RendalReveal>
      ) : null}

      <section className="px-6 py-12" aria-labelledby="parceria-titulo">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
          <h2 id="parceria-titulo" className="sr-only">Como funciona a parceria comercial</h2>
          {["Cadastro", "Material e treinamento do produto", "Visitas agendadas pela equipe", "Acompanhamento"].map(
            (step, index) => (
              <RendalReveal key={step} delayMs={index * 80} className="h-full">
                <article className="h-full rounded-3xl bg-white p-5">
                  <p className="text-sm font-semibold tabular-nums text-[#0F5B63]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-semibold text-[#1F1F1F]">{step}</p>
                </article>
              </RendalReveal>
            ),
          )}
        </div>
      </section>

      <RendalReveal>
        <section className="px-6 pb-20" aria-labelledby="form-parceiro">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 ring-1 ring-[#1F1F1F]/10">
            <h2 id="form-parceiro" className="text-3xl font-semibold tracking-tight text-[#1F1F1F]">
              Quero ser parceiro
            </h2>
            <div className="mt-6">
              <LeadForm
                subject="Parceria"
                perfil="parceiro"
                submitLabel="Quero ser parceiro"
                hidden={{ tipo: current.label }}
                extra={
                  <>
                    <label className="block text-sm font-semibold text-[#1F1F1F]">
                      Empresa
                      <input
                        name="empresa"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 px-4 text-base"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-[#1F1F1F]">
                      CRECI, se for corretor
                      <input
                        name="creci"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 px-4 text-base"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-[#1F1F1F]">
                      Cidade
                      <input
                        name="cidade"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 px-4 text-base"
                      />
                    </label>
                  </>
                }
              />
            </div>
          </div>
        </section>
      </RendalReveal>
    </>
  );
}
