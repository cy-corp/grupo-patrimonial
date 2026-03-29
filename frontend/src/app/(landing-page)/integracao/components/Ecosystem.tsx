"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Regularizado",
    subtitle: "Engenharia",
    tag: "BASE TÉCNICA E JURÍDICA",
    description: "Fundamentação técnica indispensável para a viabilidade de ativos complexos e segurança institucional.",
    image: "/integracao/integracao-1.jpg"
  },
  {
    number: "02",
    title: "Desenvolvido",
    subtitle: "Incorporadora",
    tag: "ESTRATÉGIA E VALORIZAÇÃO",
    description: "Estruturação estratégica de ativos com foco na antecipação de tendências e maximização do potencial de valorização.",
    image: "/integracao/integracao-2.jpg"
  },
  {
    number: "03",
    title: "Construído",
    subtitle: "Construtora",
    tag: "EXECUÇÃO E CONTROLE",
    description: "A materialização da excelência através de métodos construtivos avançados e gestão rigorosa de recursos.",
    image: "/integracao/integracao-3.jpg"
  },
  {
    number: "04",
    title: "Comercializado",
    subtitle: "Imobiliária",
    tag: "INTERMEDIAÇÃO E MERCADO",
    description: "Conexão estratégica entre ativos premium e investidores qualificados através de curadoria especializada.",
    image: "/integracao/integracao-4.jpg"
  },
  {
    number: "05",
    title: "Gerido e perpetuado",
    subtitle: "Patrimonial",
    tag: "PROTEÇÃO E SUCESSÃO",
    description: "A etapa final da jornada: garantir que o legado construído seja protegido e transmitido através das gerações.",
    image: "/integracao/integracao-5.jpg"
  }
];

const cardBg = [
  "#FFFFFF",
  "#FCF9F2",
  "#F8F1E3",
  "#F3EBD9",
  "#EEE5D0",
];

export function Ecosystem() {
  const sinergiaText = (
    <div className="space-y-6 lg:max-w-md text-[#0F172A]/70 text-lg lg:text-xl font-sans leading-relaxed border-l-2 border-primary/20 pl-8">
      <p>
        A sinergia entre nossas verticais garante que cada etapa do ciclo de vida imobiliário seja tratada com rigor técnico e visão estratégica.
      </p>
      <p>
        Do solo à sucessão familiar, operamos em uma estrutura circular de valorização permanente.
      </p>
    </div>
  );

  return (
    <section className="py-24 lg:py-48 bg-white" id="ecosystem-section">
      <div className="container mx-auto px-6 lg:px-12">
        {/* 
          Using 12-column grid for precise control at 'lg' breakpoint.
          Left: 5 columns, Right: 7 columns.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* 
            LEFT COLUMN: Sticky Title & Text
          */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit space-y-12">
            <div className="space-y-8 lg:space-y-12">
              <h2 className="font-heading text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#0F172A]">
                Nossa integração <br className="hidden lg:block" />
                permite que o <br className="hidden lg:block" />
                patrimônio seja:
              </h2>
            </div>

            {/* Desktop Only Quote - Space out so it appears near final cards */}
            <div className="hidden lg:block lg:mt-[50vh]">
              {sinergiaText}
            </div>

            {/* Desktop Only Indicators */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-1.5 w-12 rounded-full bg-primary" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* 
            RIGHT COLUMN: Stacking Cards
          */}
          <div className="lg:col-span-7 flex flex-col relative w-full">
            {/* 
              Cards wrapper with padding-bottom for scroll budget.
              On mobile, sticky is disabled by using `relative` or keeping sticky but 
              the layout is 1-column.
            */}
            <div
              className="flex flex-col relative w-full"
              style={{ paddingBottom: "100px" }}
            >
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="sticky lg:relative top-28 lg:top-0 lg:mb-10" // Mobile sticky
                  style={{
                    zIndex: i + 1,
                  }}
                >
                  <div
                    className="sticky rounded-[2.5rem] shadow-2xl px-6 lg:px-10 py-10 lg:py-14 flex flex-col gap-8 mb-12 lg:mb-20 border border-black/5"
                    style={{
                      // Mechanics for BOTH mobile and desktop
                      top: `${140 + i * 20}px`,
                      zIndex: i + 1,
                      backgroundColor: cardBg[i] || "#FFFFFF",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <span className="text-primary font-black text-2xl lg:text-3xl tracking-tighter leading-none block">
                          {step.number}
                        </span>
                        <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-[#0F172A] leading-tight">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
                            {step.tag}
                          </span>
                          <span className="text-[#0F172A]/30 text-xs font-bold uppercase tracking-wider">
                            // {step.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="font-sans text-[#0F172A]/70 text-base lg:text-lg leading-relaxed max-w-lg">
                      {step.description}
                    </p>

                    <div className="relative w-full h-48 lg:h-72 rounded-3xl overflow-hidden shadow-inner bg-slate-100">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Quote Section (After Cards) */}
            <div className="lg:hidden mt-8 mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest">A Sinergia</span>
              </div>
              {sinergiaText}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
