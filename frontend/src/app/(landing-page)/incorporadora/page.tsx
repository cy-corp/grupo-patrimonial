"use client";

import Link from "next/link";
import { RendalHomeHero } from "./RendalHomeHero";
import { RendalMorphScroll } from "./RendalMorphScroll";
import { RendalServicesStack } from "./RendalServicesStack";

export default function IncorporadoraPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-[#F8F1E3]">
      <RendalHomeHero />

      <div className="relative z-0 -mt-2">
        <RendalMorphScroll />
        <RendalServicesStack />

        <section className="border-t border-graphite/5 px-6 py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-10 font-sans text-lg leading-relaxed text-pretty text-graphite/70">
              Quer estruturar um terreno, uma parceria ou um novo produto com a
              Rendal?
            </p>
            <Link
              href="/contato?empresa=rendal"
              className="inline-flex items-center justify-center rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_5px_14px_rgba(15,91,99,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] transition-[filter] duration-200 hover:brightness-110"
            >
              Fale com a Rendal
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
