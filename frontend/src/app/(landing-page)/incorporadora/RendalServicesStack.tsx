"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    num: "01",
    title: "Estudo de viabilidade",
    description:
      "Análise de mercado, demanda regional e projeções financeiras para garantir a solidez do negócio.",
  },
  {
    num: "02",
    title: "Estruturação jurídica",
    description:
      "Segurança patrimonial e conformidade legal em todas as instâncias do desenvolvimento imobiliário.",
  },
  {
    num: "03",
    title: "Planejamento urbanístico",
    description:
      "Integração com o entorno, respeito ao plano diretor e valor para a região de inserção.",
  },
  {
    num: "04",
    title: "Coordenação de projetos",
    description:
      "Gestão multidisciplinar de arquitetura, engenharia e produto antes da obra começar.",
  },
  {
    num: "05",
    title: "Apoio à comercialização",
    description:
      "Suporte em vendas e posicionamento para acelerar o VGV do empreendimento.",
  },
];

export function RendalServicesStack() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (reduceMotion || !section) {
      setShown(true);
      return;
    }

    const update = () => {
      // Só revela quando a seção já entrou de fato (pin liberado e página descendo)
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.82) {
        setShown(true);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={cn("t-stagger relative z-0 bg-transparent", shown && "is-shown")}
      style={
        {
          "--stagger-dur": "800ms",
          "--stagger-distance": "28px",
          "--stagger-stagger": "120ms",
        } as CSSProperties
      }
    >
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-24">
        <header className="t-stagger-line lg:col-span-4">
          <span className="mb-4 block font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#0F5B63]">
            Atuação
          </span>
          <h2 className="mb-6 font-display text-4xl leading-[1.08] text-balance text-graphite md:text-6xl">
            Desde a origem
          </h2>
          <p className="max-w-[36ch] font-sans text-base leading-7 text-pretty text-graphite/60 md:text-lg">
            Cada etapa do ciclo imobiliário com critério técnico e financeiro,
            antes da DCorp executar a obra.
          </p>
        </header>

        <div className="t-stagger-line t-stagger-line--2 lg:col-span-8">
          <div className="flex flex-col gap-3 pb-16 md:gap-4 md:pb-24">
            {services.map((service) => (
              <article
                key={service.num}
                className="rounded-2xl bg-white/80 px-7 py-8 ring-1 ring-graphite/10 md:px-10 md:py-10"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="font-sans text-xs font-semibold tabular-nums tracking-[0.22em] text-[#0F5B63]">
                    {service.num}
                  </span>
                  <span className="h-px min-w-12 flex-1 bg-graphite/10" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold uppercase tracking-tight text-balance text-graphite md:text-2xl">
                  {service.title}
                </h3>
                <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-pretty text-graphite/65 md:text-base md:leading-7">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
