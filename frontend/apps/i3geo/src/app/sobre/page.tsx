import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre",
  description: "O significado do i³: psicologia, administração e técnica, multiplicadas pela força do indivíduo.",
};

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#03121A] text-white">
          <div className="mx-auto grid max-w-7xl items-end gap-10 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:px-16">
            <p className="text-[11rem] font-bold leading-[0.8] tracking-tight text-[#A9E3F0] sm:text-[16rem] lg:col-span-5">
              i<sup className="text-[0.5em] text-orange">3</sup>
            </p>
            <div className="lg:col-span-7">
              <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
                Excelência não nasce do acaso. Ela é construída.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                O i³ representa os três pilares que sustentam nossa atuação e o indivíduo que os transforma em
                resultado.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-[#F6F4EF]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            {pillars.map((pillar) => (
              <section key={pillar.title} className="grid gap-8 border-b border-brand/15 py-16 lg:grid-cols-12 lg:py-24">
                <h2 className="text-4xl font-bold tracking-tight text-brand sm:text-6xl lg:col-span-5">{pillar.title}</h2>
                <div className="space-y-5 text-lg leading-relaxed text-graphite/85 lg:col-span-7">
                  {pillar.long.map((paragraph) => (
                    <p key={paragraph} className="max-w-[62ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="grid gap-8 border-b border-brand/15 py-16 lg:grid-cols-12 lg:py-24">
              <h2 className="text-4xl font-bold tracking-tight text-orange sm:text-6xl lg:col-span-5">O “i”</h2>
              <div className="space-y-5 text-lg leading-relaxed text-graphite/85 lg:col-span-7">
                <p className="max-w-[62ch]">O mais importante. O “i” representa o indivíduo.</p>
                <p className="max-w-[62ch]">
                  A pessoa que conduz com garra, resiliência e persistência. Que enfrenta desafios técnicos e
                  burocráticos. Que assume responsabilidade pelo que entrega.
                </p>
                <p className="max-w-[62ch]">Sem o indivíduo, não há excelência.</p>
              </div>
            </section>

            <section className="py-20 sm:py-28">
              <h2 className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-graphite sm:text-5xl">
                Não buscamos apenas executar serviços. Buscamos construir confiança, segurança jurídica e
                valorização patrimonial.
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/#contato"
                  className="bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-brand hover:text-white"
                >
                  Solicitar orçamento
                </Link>
                <Link
                  href="/servicos"
                  className="border border-brand/30 px-7 py-4 text-base font-semibold text-brand transition-colors hover:border-brand"
                >
                  Ver serviços
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
