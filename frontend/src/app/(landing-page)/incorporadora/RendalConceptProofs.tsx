import Image from "next/image";
import { RendalReveal } from "./RendalReveal";

const CARDS = [
  {
    src: "/morph/frame-07.jpg",
    alt: "Fachada Rendal com laje de lazer, madeira e portão",
    kicker: "Onde se vê",
    title: "Laje que vira lazer",
    body: "O valor de um telhado comum vira pergola, estar e vista. A casa ganha um andar que o padrão popular não entrega.",
  },
  {
    src: "/wireframes/planta-terreo.jpg",
    alt: "Planta do térreo com lavabo no setor social",
    kicker: "Onde se vive",
    title: "Lavabo no social",
    body: "A visita se atende sem cruzar o corredor dos quartos. Conforto desenhado na planta, antes da obra.",
  },
] as const;

export function RendalConceptProofs() {
  return (
    <section
      className="bg-[#F8F1E3] px-6 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24"
      aria-labelledby="provas-conceito-titulo"
    >
      <div className="mx-auto max-w-7xl">
        <RendalReveal>
          <header className="mb-16 max-w-[680px] lg:mb-20">
            <span className="mb-6 block h-px w-12 bg-[#C9A96A]" aria-hidden />
            <h2
              id="provas-conceito-titulo"
              className="text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl"
            >
              O que faz a casa parecer cara
            </h2>
            <p className="mt-4 text-lg leading-8 text-pretty text-[#1F1F1F]/70">
              Duas decisões visíveis. O resto do orçamento fica racional, longe
              do olhar.
            </p>
          </header>
        </RendalReveal>

        <ul className="m-0 grid list-none gap-16 p-0 lg:grid-cols-2 lg:items-start lg:gap-8">
          {CARDS.map((card, index) => (
            <li key={card.title} className={index === 1 ? "lg:mt-16" : undefined}>
              <RendalReveal delayMs={index * 120}>
                <article className="rounded-4xl bg-white p-4 shadow-[0_18px_50px_rgba(31,31,31,0.08)] sm:p-6">
                  <div className="relative -mt-12 aspect-[4/3] overflow-hidden rounded-3xl bg-[#EDE6DA] sm:-mt-14">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={
                        index === 1
                          ? "object-cover object-top"
                          : "object-cover object-center"
                      }
                    />
                  </div>
                  <div className="px-2 pb-2 pt-6 sm:px-4 sm:pb-4 sm:pt-8">
                    <p className="text-sm font-semibold text-[#0F5B63]">
                      {card.kicker}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-pretty text-[#1F1F1F]/70">
                      {card.body}
                    </p>
                  </div>
                </article>
              </RendalReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
