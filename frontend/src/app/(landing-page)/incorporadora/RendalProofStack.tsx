"use client";

const PROOFS = [
  {
    title: "Laje de lazer",
    body: "Em vez de telhado que só gasta, a cobertura vira área de estar.",
  },
  {
    title: "Lavabo social",
    body: "Visitante se atende sem entrar na área íntima da casa.",
  },
  {
    title: "Acabamento que se vê",
    body: "Alto padrão no olho. Racionalização só no que não aparece.",
  },
] as const;

/** Desktop grid — no mobile os cards vivem dentro do pin do morph. */
export function RendalProofStack() {
  return (
    <div className="relative z-10 -mt-[4.5rem] hidden px-2 md:block">
      <div className="mx-auto grid max-w-[1120px] grid-cols-3 gap-5">
        {PROOFS.map((card) => (
          <article
            key={card.title}
            className="rounded-[22px] border border-black/[0.04] bg-white px-7 py-9 text-center shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
          >
            <h2 className="m-0 text-[18px] font-bold tracking-[-0.02em] text-[#1F1F1F]">
              {card.title}
            </h2>
            <p className="mt-3 m-0 text-[14px] leading-relaxed text-[#4D4D4D]">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
