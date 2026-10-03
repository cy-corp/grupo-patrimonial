import Link from "next/link";
import { ServiceDiagram } from "@/components/site/service-diagram";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center bg-[#F6F4EF]">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-7">
            <p className="text-7xl font-bold tracking-tight text-orange tabular-nums sm:text-9xl">404</p>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl">
              Este ponto não está no mapa.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-graphite/80">
              A página que você procurou não existe ou mudou de endereço.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="bg-brand px-7 py-4 text-base font-bold text-white transition-colors hover:bg-graphite">
                Voltar ao início
              </Link>
              <Link
                href="/servicos"
                className="border border-brand/30 px-7 py-4 text-base font-semibold text-brand transition-colors hover:border-brand"
              >
                Ver serviços
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ServiceDiagram id="georreferenciamento" className="mx-auto w-full max-w-sm" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
