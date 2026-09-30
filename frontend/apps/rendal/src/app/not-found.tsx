import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell companyId="rendal">
      <main id="conteudo" className="relative overflow-hidden bg-[#F8F1E3] px-6 pt-36 pb-24">
        <img
          src="/wireframes/planta-terreo.jpg"
          alt=""
          className="pointer-events-none absolute inset-x-0 top-24 mx-auto max-h-[50svh] w-full max-w-3xl object-contain opacity-25"
        />
        <div className="relative mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl">
            Este cômodo não está na planta.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70">
            A página que você procurou não existe ou mudou de lugar.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="inline-flex h-12 min-h-11 items-center rounded-full bg-[#1F1F1F] px-6 font-semibold text-white">
              Ir para o início
            </Link>
            <Link href="/empreendimentos" className="inline-flex h-12 min-h-11 items-center rounded-full px-6 font-semibold text-[#7A4A2B] ring-1 ring-[#7A4A2B]/30">
              Ver empreendimentos
            </Link>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
