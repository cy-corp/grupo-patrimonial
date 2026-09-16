import Image from "next/image";
import { DCORP_WORKS_HOME } from "@/lib/dcorp-content";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

export default function DcorpObrasPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <DcorpPageIntro
          eyebrow="Obras e portfólio"
          title="Obra no canteiro."
          description="Residencial, condomínios e execução para incorporadoras — com engenharia e sistemas de alta produtividade."
        />

        <ul className="mt-14 grid gap-px bg-[#D9D9D9] sm:grid-cols-2 lg:grid-cols-3">
          {DCORP_WORKS_HOME.map((work, index) => (
            <li key={work.id} className="bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1F1F1F]">
                <Image
                  src={work.image}
                  alt={work.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-5 top-5 font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="border-t border-[#D9D9D9] px-5 py-5">
                <h2 className="font-sans text-lg font-semibold text-[#1F1F1F]">
                  {work.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                  {work.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <DcorpPageCta
        title="Quer ver a DCORP no seu próximo empreendimento?"
        description="Solicite um orçamento e conversamos sobre escopo, sistema e prazo."
      />
    </main>
  );
}
