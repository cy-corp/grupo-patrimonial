"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bank,
  ChartLineUp,
  Handshake,
  House,
  MapTrifold,
} from "@phosphor-icons/react";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import type { ContactProfileId } from "@/lib/rendal/contact-profiles";
import { FinanciamentoForm } from "@/components/rendal/contato/FinanciamentoForm";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import { cn } from "@/lib/utils";

export type { ContactProfileId };

export const CONTACT_PROFILES = [
  { id: "comprar", label: "Quero comprar", icon: House, subject: "Produto imobiliário" },
  { id: "financiar", label: "Quero financiar", icon: Bank, subject: "Simulação de financiamento" },
  { id: "terreno", label: "Tenho um terreno", icon: MapTrifold, subject: "Terreno ou parceria" },
  { id: "investir", label: "Quero investir", icon: ChartLineUp, subject: "Investimento" },
  { id: "parceiro", label: "Sou parceiro", icon: Handshake, subject: "Parceria" },
] as const satisfies ReadonlyArray<{
  id: ContactProfileId;
  label: string;
  icon: typeof House;
  subject: string;
}>;
const chip =
  "min-h-11 cursor-pointer rounded-full bg-[#EDE6DA] px-4 text-sm font-semibold text-[#1F1F1F] has-[:checked]:bg-[#0F5B63] has-[:checked]:text-white";

export function ProfileForm({
  initial,
  empreendimento,
}: {
  initial: ContactProfileId;
  empreendimento?: string;
}) {
  const [perfil, setPerfil] = useState<ContactProfileId>(initial);
  const filtersRef = useRef<HTMLDivElement>(null);
  const current = CONTACT_PROFILES.find((item) => item.id === perfil) ?? CONTACT_PROFILES[0];

  useEffect(() => {
    setPerfil(initial);
    const hash = window.location.hash;
    if (hash !== "#perfil" && hash !== "#financiamento") return;
    const el = filtersRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    el.focus({ preventScroll: true });
  }, [initial]);

  return (
    <div>
      <div
        ref={filtersRef}
        id="perfil"
        tabIndex={-1}
        className="grid scroll-mt-36 grid-cols-2 gap-3 outline-none sm:grid-cols-3 lg:grid-cols-5"
        role="radiogroup"
        aria-label="Perfil"
      >
        {CONTACT_PROFILES.map((item) => {
          const Icon = item.icon;
          const on = perfil === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPerfil(item.id)}
              className={cn(
                "flex min-h-24 min-w-0 cursor-pointer flex-col items-start justify-between rounded-3xl p-4 text-left ring-1 transition-colors duration-700",
                on ? "bg-[#0F5B63] text-white ring-[#0F5B63]" : "bg-white text-[#1F1F1F] ring-[#1F1F1F]/10",
              )}
            >
              <Icon weight="duotone" className="size-7" aria-hidden />
              <span className="max-w-full text-base font-semibold leading-snug">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="t-acc mt-8 min-w-0" data-open="true">
        <div className="t-acc-panel">
          <div className="t-acc-panel-inner min-w-0">
            {perfil === "financiar" ? (
              <FinanciamentoForm empreendimento={empreendimento} />
            ) : (
              <div className="rounded-3xl bg-white p-5 ring-1 ring-[#1F1F1F]/10 sm:p-8">
                <LeadForm
                  key={perfil}
                  subject={current.subject}
                  perfil={perfil}
                  emailOptional={perfil === "comprar"}
                  extra={
                    perfil === "comprar" ? (
                      <>
                        <label className="block text-sm font-semibold text-[#1F1F1F]">
                          Empreendimento
                          <select name="empreendimento" className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base" defaultValue={empreendimentos[0]?.slug}>
                            {empreendimentos.map((item) => (
                              <option key={item.slug} value={item.nome}>{item.nome}</option>
                            ))}
                          </select>
                        </label>
                        <fieldset>
                          <legend className="text-sm font-semibold text-[#1F1F1F]">Preferência de visita</legend>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["Dia útil", "Sábado"].map((item) => (
                              <label key={item} className={chip}>
                                <input className="sr-only" type="radio" name="dia" value={item} />
                                <span className="inline-flex min-h-11 items-center">{item}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </>
                    ) : perfil === "terreno" ? (
                      <p className="text-base leading-7 text-[#1F1F1F]/70">
                        <Link href="/proprietarios#qualificador" className="font-semibold text-[#0F5B63]">
                          Prefere responder em 60 segundos?
                        </Link>
                      </p>
                    ) : perfil === "investir" ? (
                      <fieldset>
                        <legend className="text-sm font-semibold text-[#1F1F1F]">Faixa de interesse (opcional)</legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["Quero conhecer", "Participação em SPE", "Ainda estou avaliando"].map((item) => (
                            <label key={item} className={chip}>
                              <input className="sr-only" type="radio" name="faixa" value={item} />
                              <span className="inline-flex min-h-11 items-center">{item}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ) : (
                      <>
                        <label className="block text-sm font-semibold text-[#1F1F1F]">
                          Empresa
                          <input name="empresa" className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 px-4 text-base" />
                        </label>
                        <label className="block text-sm font-semibold text-[#1F1F1F]">
                          Tipo
                          <select name="tipo" className="mt-2 h-12 w-full rounded-2xl border border-[#1F1F1F]/15 bg-white px-4 text-base" defaultValue="Imobiliária">
                            <option>Imobiliária</option>
                            <option>Corretor</option>
                            <option>Construção</option>
                            <option>Fornecedor</option>
                          </select>
                        </label>
                      </>
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
