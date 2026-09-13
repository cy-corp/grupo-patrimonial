"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import { useActiveImage } from "@/hooks/useActiveImage";
import { RendalServicesStack } from "./RendalServicesStack";

export default function IncorporadoraPage() {
  const { imageUrl, altText } = useActiveImage("incorporadora_hero", "/incorporadora/incorporadora-hero.jpg");

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F1E3] pt-16 md:pt-0">
      <section className="relative w-full overflow-hidden">
        <div className="relative hidden min-h-[85vh] items-center md:flex">
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={altText || "Empreendimento em desenvolvimento pela Rendal"}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/90 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-16 bg-primary" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  Incorporação
                </span>
              </div>
              <div className="mb-8 w-fit rounded-2xl bg-background px-5 py-4 ring-1 ring-graphite/10">
                <Image
                  src="/brands/rendal-logo.png"
                  alt="Grupo Rendal"
                  width={1016}
                  height={813}
                  className="h-16 w-auto max-w-[14rem] object-contain"
                />
              </div>
              <h1 className="mb-8 font-display text-5xl leading-[1.08] text-balance text-graphite lg:text-7xl">
                A origem do empreendimento.
              </h1>
              <p className="max-w-xl border-l-2 border-primary/30 pl-8 font-sans text-xl leading-relaxed text-pretty text-graphite/70">
                Identifica oportunidades e estrutura produto, capital, aprovações e estratégia para transformar potencial em negócio imobiliário.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col md:hidden">
          <div className="relative h-[45vh] w-full">
            <Image
              src={imageUrl}
              alt={altText || "Empreendimento em desenvolvimento pela Rendal"}
              fill
              className="object-cover brightness-90"
              priority
            />
          </div>
          <div className="relative z-10 -mt-28 rounded-t-[3rem] bg-[#F8F1E3] px-8 pt-12 pb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.3em] text-primary">
                Incorporação
              </span>
            </div>
            <div className="mb-6 w-fit rounded-2xl bg-background px-4 py-3 ring-1 ring-graphite/10">
              <Image
                src="/brands/rendal-logo.png"
                alt="Grupo Rendal"
                width={1016}
                height={813}
                className="h-12 w-auto max-w-[10rem] object-contain"
              />
            </div>
            <h1 className="mb-6 font-display text-4xl leading-[1.08] text-balance text-graphite">
              A origem do empreendimento.
            </h1>
            <p className="font-sans text-lg leading-relaxed text-pretty text-graphite/80">
              Produto, capital e estratégia para o negócio imobiliário nascer no lugar certo.
            </p>
          </div>
        </div>
      </section>

      <RendalServicesStack />

      <section className="border-t border-graphite/5 px-6 py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-10 font-sans text-lg leading-relaxed text-pretty text-graphite/70">
            Quer estruturar um terreno, uma parceria ou um novo produto com a Rendal?
          </p>
          <Link href="/contato#form-contato">
            <GoldButton className="px-12 py-6 text-xs font-bold uppercase tracking-[0.3em]">
              Fale com a Rendal
            </GoldButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
