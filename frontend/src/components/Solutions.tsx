import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const brands = [
  {
    number: "01",
    name: "Rendal",
    role: "Incorporação",
    statement: "A origem do empreendimento.",
    description:
      "Identifica oportunidades e estrutura produto, capital, aprovações e estratégia para transformar potencial em negócio imobiliário.",
    capabilities: ["Viabilidade", "Estruturação", "Desenvolvimento"],
    logo: "/brands/rendal-logo.png",
    image: "/incorporadora/incorporadora-hero.jpg",
    imageAlt: "Empreendimento residencial em desenvolvimento",
    href: "/incorporadora",
    panelClass: "bg-[#F3EEE4] text-graphite",
  },
  {
    number: "02",
    name: "DCorp",
    role: "Engenharia",
    statement: "Da decisão à execução.",
    description:
      "Converte a estratégia em engenharia, coordenando projetos, soluções técnicas e obra com precisão em cada etapa.",
    capabilities: ["Projeto", "Técnica", "Execução"],
    logo: "/brands/dcorp-logo.png",
    image: "/construtora/construtora-execucao.jpg",
    imageAlt: "Obra em execução com estrutura e guindastes",
    href: "/engenharia",
    panelClass: "bg-[#E4DDD0] text-graphite",
  },
];

export function Solutions() {
  return (
    <section
      id="projetos"
      className="relative z-[60] -mt-6 scroll-mt-24 overflow-hidden rounded-t-[40px] bg-[#F3EEE4] shadow-[0_-16px_40px_rgba(0,0,0,0.12)] md:-mt-10 md:rounded-t-[60px]"
    >
      <div className="divide-y divide-graphite/10 md:grid md:min-h-dvh md:grid-cols-2 md:divide-x md:divide-y-0">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            aria-label={`Conheça a ${brand.name} — ${brand.role}`}
            className={cn(
              "group flex min-h-[28rem] flex-col p-7 md:min-h-0 md:p-10 lg:p-14 xl:p-20",
              brand.panelClass,
            )}
          >
            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0">
                <span className="block font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary md:text-sm">
                  {brand.number}
                </span>
                <p className="mt-1.5 font-display text-[1.65rem] leading-none text-graphite md:text-3xl lg:text-4xl">
                  {brand.role}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-graphite md:text-sm">
                Conheça
                <ArrowUpRight className="size-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="mt-8 w-fit rounded-2xl bg-background px-5 py-4 ring-1 ring-graphite/10 md:mt-10 md:px-6 md:py-5">
              <Image
                src={brand.logo}
                alt=""
                width={1016}
                height={813}
                className="h-16 w-auto max-w-[11rem] object-contain object-center md:h-20 md:max-w-[14rem] lg:h-24 lg:max-w-[16rem]"
              />
            </div>

            <figure className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-graphite/5 ring-1 ring-graphite/10 md:aspect-auto md:min-h-[12rem] md:flex-1">
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="mt-auto max-w-xl pt-8 md:pt-10">
              <h2 className="font-display text-3xl leading-[1.08] text-balance md:text-4xl lg:text-5xl xl:text-6xl">
                {brand.statement}
              </h2>
              <p className="mt-5 max-w-[42ch] font-sans text-sm leading-7 text-pretty text-brand-gray md:mt-6 md:text-base">
                {brand.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-graphite/10 pt-5 md:mt-10 md:gap-x-8 md:pt-6">
                {brand.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
