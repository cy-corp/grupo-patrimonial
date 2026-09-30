"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/rendal/SegmentedControl";
import { Disclaimer } from "@/components/rendal/Disclaimer";
import { EASE } from "@/lib/rendal/tokens";

const CATS = [
  { id: "estrutura", label: "Estrutura" },
  { id: "instalacoes", label: "Instalações" },
  { id: "acabamento", label: "Acabamento visível" },
  { id: "laje", label: "Laje e lazer" },
  { id: "fachada", label: "Fachada" },
] as const;

const WIDTHS = {
  mercado: [28, 22, 16, 14, 20],
  rendal: [18, 16, 22, 24, 20],
};

export function CapitalBar() {
  const [mode, setMode] = useState<"mercado" | "rendal">("rendal");
  const widths = WIDTHS[mode];

  return (
    <div>
      <SegmentedControl
        label="Comparar aplicação do capital"
        value={mode}
        onChange={setMode}
        options={[
          { value: "mercado", label: "Mercado padrão" },
          { value: "rendal", label: "Rendal" },
        ]}
      />
      <p className="mt-3 text-sm font-semibold text-[#1F1F1F]/55">
        Ilustrativo, baseado em projeto de referência. Sem percentuais até a aprovação comercial.
      </p>
      <div className="mt-6 flex flex-col gap-2 md:hidden" aria-hidden>
        {CATS.map((cat, index) => (
          <div key={cat.id} className="flex items-center gap-3">
            <div
              className="h-8 rounded-full bg-[#1F1F1F] transition-all duration-700 motion-reduce:transition-none"
              style={{ width: `${widths[index]}%`, transitionTimingFunction: EASE }}
            />
            <span className="text-sm font-semibold text-[#1F1F1F]">{cat.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 hidden h-14 overflow-hidden rounded-full md:flex" aria-hidden>
        {CATS.map((cat, index) => (
          <div
            key={cat.id}
            className="flex h-full items-center justify-center overflow-hidden px-2 text-xs font-semibold text-white transition-all duration-700 motion-reduce:transition-none"
            style={{
              width: `${widths[index]}%`,
              background: index % 2 === 0 ? "#1F1F1F" : "#4D4D4D",
              transitionTimingFunction: EASE,
            }}
          >
            {cat.label}
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {CATS.map((cat) => (
          <li key={cat.id}>{cat.label}</li>
        ))}
      </ul>
      <div className="mt-4">
        <Disclaimer>
          As larguras mostram só o deslocamento relativo do invisível para o que se vê e se usa. Não são custo, retorno nem participação.
        </Disclaimer>
      </div>
    </div>
  );
}
