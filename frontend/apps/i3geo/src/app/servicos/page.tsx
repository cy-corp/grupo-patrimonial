import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDiagram } from "@/components/site/service-diagram";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { services, surveyDelivers, whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços",
  alternates: { canonical: "/servicos" },
  description:
    "Georreferenciamento, retificação de área, desmembramento, levantamento topográfico e projetos técnicos em Minas Gerais e São Paulo.",
};

export default function ServicosPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="py-20 sm:py-28">
            <h1 className="text-balance text-5xl font-bold leading-[0.98] tracking-tight text-brand sm:text-7xl">Serviços</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/80">
              Cada projeto é tratado com responsabilidade, precisão cartográfica e visão jurídica.
            </p>
          </div>

          {services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="grid scroll-mt-24 gap-10 border-t border-brand/15 py-16 lg:grid-cols-12 lg:py-24"
            >
              <div className="lg:col-span-5">
                <ServiceDiagram id={service.id} className="w-full max-w-sm" />
              </div>
              <div className="lg:col-span-7">
                <h2 className="text-balance break-words text-[clamp(1.4rem,7vw,1.875rem)] font-bold tracking-tight text-graphite sm:text-5xl">{service.title}</h2>
                <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-graphite/80">{service.text}</p>
                <h3 className="mt-8 text-sm font-semibold text-brand">Quando você precisa</h3>
                <p className="mt-2 max-w-[62ch] leading-relaxed text-graphite/80">{service.when}</p>
                {service.id === "levantamento" && (
                  <>
                    <h3 className="mt-8 text-sm font-semibold text-brand">O que o levantamento entrega</h3>
                    <ul className="mt-3 grid max-w-lg grid-cols-2 gap-x-8 gap-y-2 text-graphite/85">
                      {surveyDelivers.map((item) => (
                        <li key={item} className="border-b border-brand/15 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <Link
                  href={`/orcamento?servico=${service.id}`}
                  className="mt-8 inline-block border-b-2 border-orange pb-1 text-sm font-semibold text-brand transition-colors hover:text-graphite"
                >
                  Pedir orçamento de {service.title.toLowerCase()}
                </Link>
              </div>
            </section>
          ))}

        </div>

        {/* Fecho em faixa escura e com outro canal (WhatsApp), para não repetir o rodapé claro logo abaixo. */}
        <section className="bg-brand text-white">
          <div className="mx-auto grid max-w-7xl items-end gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:px-16">
            <div className="lg:col-span-8">
              <h2 className="max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Tem uma demanda e não sabe qual serviço precisa?
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                Conte o seu caso. A gente ajuda a identificar a solução adequada.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a
                href={whatsappLink("Olá, tenho uma demanda e gostaria de ajuda para identificar o serviço adequado.")}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white px-7 py-4 text-base font-bold text-brand transition-colors hover:bg-orange hover:text-graphite"
              >
                Conversar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
