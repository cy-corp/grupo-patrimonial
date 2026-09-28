import { RendalButton } from "./RendalButton";
import { RendalReveal } from "./RendalReveal";

export function FinalCta({
  title,
  subtitle,
  href,
  cta,
  id = "cta-final-titulo",
}: {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  id?: string;
}) {
  return (
    <section className="bg-[#1F1F1F] px-6 py-16 sm:py-20 md:py-24" aria-labelledby={id}>
      <RendalReveal>
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <h2
            id={id}
            className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-pretty text-white/75 sm:text-lg sm:leading-8">
            {subtitle}
          </p>
          <RendalButton href={href} className="mt-8">
            {cta}
          </RendalButton>
        </div>
      </RendalReveal>
    </section>
  );
}
