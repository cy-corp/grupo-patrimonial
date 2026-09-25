"use client";

import Link from "next/link";
import { RendalReveal } from "./RendalReveal";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

export function RendalFinalCta() {
  return (
    <section
      className="bg-[#1F1F1F] px-6 py-16 sm:py-20 md:py-24"
      aria-labelledby="cta-final-titulo"
    >
      <RendalReveal>
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <h2
            id="cta-final-titulo"
            className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
          >
            Pronto para ver a casa que parece cara?
          </h2>
          <p className="mt-4 text-base leading-7 text-pretty text-white/75 sm:text-lg sm:leading-8">
            Visita sem compromisso. Sem reserva obrigatória no primeiro contato.
            Conheça o produto e decida no seu tempo.
          </p>
          <Link
            href="/empreendimentos"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F5B63] px-6 py-2.5 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A3F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            style={{ transitionTimingFunction: EASE }}
          >
            Ver empreendimentos
          </Link>
        </div>
      </RendalReveal>
    </section>
  );
}
