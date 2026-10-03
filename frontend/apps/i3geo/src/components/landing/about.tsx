import { brand } from "@/lib/brand";

export function About() {
  return (
    <section id="sobre" className="border-b border-border bg-gray-light/30">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Sobre a {brand.name}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {brand.purpose}
          </p>
          <p className="mt-4 leading-relaxed text-muted">{brand.vision}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            Conceitos recorrentes
          </h3>
          <ul className="mt-4 space-y-3">
            {brand.concepts.map((concept) => (
              <li
                key={concept}
                className="border-l-2 border-accent pl-4 text-foreground"
              >
                {concept}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-medium text-muted">
            {brand.institutional}
          </p>
        </div>
      </div>
    </section>
  );
}
