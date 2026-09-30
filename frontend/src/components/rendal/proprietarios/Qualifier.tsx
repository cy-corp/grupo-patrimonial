"use client";

import { useEffect, useReducer, useState } from "react";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import { track } from "@/lib/rendal/track";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

const CIDADES = ["Campinas", "Valinhos", "Vinhedo", "Hortolândia", "Outra"];

const STEPS = [
  {
    key: "cidade",
    pergunta: "Onde fica?",
    opcoes: CIDADES,
  },
  {
    key: "tamanho",
    pergunta: "Qual o tamanho aproximado?",
    opcoes: ["até 1.000 m²", "1.000–5.000 m²", "5.000 m²–2 ha", "acima de 2 ha", "Não sei"],
  },
  {
    key: "documento",
    pergunta: "Como está a documentação?",
    opcoes: ["Matrícula em meu nome", "Inventário/partilha", "Posse", "Não sei"],
  },
  {
    key: "preferencia",
    pergunta: "O que você prefere?",
    opcoes: ["Vender", "Permutar", "Ser sócio", "Quero entender as opções"],
  },
] as const;

type Answers = Record<(typeof STEPS)[number]["key"], string>;

const empty: Answers = { cidade: "", tamanho: "", documento: "", preferencia: "" };

function summarize(answers: Answers) {
  return `Terreno ${answers.tamanho.toLocaleLowerCase()} em ${answers.cidade}, ${answers.documento.toLocaleLowerCase()}, interesse em ${answers.preferencia.toLocaleLowerCase()}.`;
}

export function Qualifier() {
  const [step, setStep] = useState(0);
  const [answers, dispatch] = useReducer(
    (state: Answers, action: { key: keyof Answers; value: string }) => ({
      ...state,
      [action.key]: action.value,
    }),
    empty,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.js = "on";
    const saved = sessionStorage.getItem("rendal-qualificador");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { step: number; answers: Answers };
        if (parsed.answers) {
          for (const [key, value] of Object.entries(parsed.answers)) {
            dispatch({ key: key as keyof Answers, value });
          }
          setStep(parsed.step ?? 0);
        }
      } catch {
        sessionStorage.removeItem("rendal-qualificador");
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem("rendal-qualificador", JSON.stringify({ step, answers }));
  }, [step, answers, ready]);

  const current = STEPS[step];
  const done = step >= STEPS.length;

  return (
    <div id="qualificador">
      <form className="no-js-only flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-[#1F1F1F]/10" action="/contato" method="get">
        <p className="text-sm font-semibold text-[#1F1F1F]/60">Sem JavaScript, envie as respostas pelo contato.</p>
        {STEPS.map((item) => (
          <label key={item.key} className="text-sm font-semibold text-[#1F1F1F]">
            {item.pergunta}
            <select name={item.key} className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 px-3 text-base" defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              {item.opcoes.map((opcao) => (
                <option key={opcao}>{opcao}</option>
              ))}
            </select>
          </label>
        ))}
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#1F1F1F] font-semibold text-white">
          Continuar no contato
        </button>
      </form>

      <div className={cn("mt-6", ready ? "block" : "hidden")} aria-live="polite">
        <p className="text-sm font-semibold tabular-nums text-[#7A4A2B]">
          {done ? "Resumo" : `${String(step + 1).padStart(2, "0")}/04`}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#EDE6DA]">
          <div
            className="h-full bg-[#1F1F1F] transition-all duration-700 motion-reduce:transition-none"
            style={{
              width: `${(Math.min(step, STEPS.length) / STEPS.length) * 100}%`,
              transitionTimingFunction: EASE,
            }}
          />
        </div>

        {done ? (
          <div className="mt-6">
            <p className="text-lg font-semibold text-balance text-[#1F1F1F]">{summarize(answers)}</p>
            <p className="mt-3 text-base leading-7 text-[#1F1F1F]/70">
              A equipe analisa as informações e retorna para marcar uma conversa. Isso não é uma avaliação do terreno.
            </p>
            <div className="mt-6">
              <LeadForm
                subject="Terreno ou parceria"
                perfil="terreno"
                submitLabel="Enviar"
                eventName="qualificador_submit"
                hidden={answers}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold tracking-tight text-[#1F1F1F]">{current.pergunta}</h3>
            {current.key === "cidade" ? (
              <label className="mt-4 block text-sm font-semibold text-[#1F1F1F]">
                Cidade
                <input
                  value={answers.cidade}
                  onChange={(event) => dispatch({ key: "cidade", value: event.target.value })}
                  list="cidades-alvo"
                  className="mt-2 h-14 w-full rounded-2xl border border-[#1F1F1F]/15 px-4 text-base"
                />
                <datalist id="cidades-alvo">
                  {CIDADES.map((cidade) => (
                    <option key={cidade} value={cidade} />
                  ))}
                </datalist>
              </label>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                {current.opcoes.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => {
                      dispatch({ key: current.key, value: opcao });
                      track("qualificador_step", { step: current.key });
                      setStep((value) => value + 1);
                    }}
                    className="min-h-14 cursor-pointer rounded-2xl bg-[#EDE6DA] px-4 text-left text-base font-semibold text-[#1F1F1F]"
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            )}
            {current.key === "cidade" ? (
              <button
                type="button"
                disabled={!answers.cidade.trim()}
                onClick={() => {
                  track("qualificador_step", { step: "cidade" });
                  setStep(1);
                }}
                className="mt-4 inline-flex h-12 min-h-11 cursor-pointer items-center rounded-full bg-[#1F1F1F] px-6 font-semibold text-white disabled:opacity-50"
              >
                Continuar
              </button>
            ) : null}
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="mt-4 min-h-11 cursor-pointer text-sm font-semibold text-[#7A4A2B]"
              >
                Voltar
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
