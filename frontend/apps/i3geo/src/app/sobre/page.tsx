import type { Metadata } from "next";
import { Equation, PillarsOrbit } from "@/components/site/pillars-orbit";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sobre",
  description: "O significado do i³: psicologia, administração e técnica, multiplicadas pela força do indivíduo.",
};

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#F6F4EF]">
          <div
            className="absolute inset-0 bg-brand/[0.09]"
            aria-hidden="true"
            style={{
              maskImage: "url(/hero/contours.svg)",
              WebkitMaskImage: "url(/hero/contours.svg)",
              maskSize: "cover",
              WebkitMaskSize: "cover",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-36 lg:px-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-i3geo-horizontal.svg" alt={brand.name} className="w-full max-w-3xl" />
            <h1 className="mt-14 max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight text-graphite sm:text-6xl">
              Excelência não nasce do acaso. Ela é construída.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/80 sm:text-xl">
              O i³ representa os três pilares que sustentam nossa atuação e o indivíduo que os transforma em
              resultado.
            </p>
          </div>
        </section>
        <PillarsOrbit />
        <Equation />
      </main>
      <SiteFooter />
    </>
  );
}
