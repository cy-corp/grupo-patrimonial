import { brand } from "@/lib/brand";

export function Areas() {
  return (
    <section id="areas" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Áreas de atuação
          </h2>
          <p className="mt-3 text-muted">
            Três pilares que unem precisão territorial, inteligência técnica e
            responsabilidade socioambiental.
          </p>
        </div>
        <ul className="mt-12 grid gap-10 sm:grid-cols-3">
          {brand.areas.map((area) => (
            <li key={area.id}>
              <h3 className="text-xl font-semibold text-brand">{area.title}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gray-dark">
                {area.concepts.join(" · ")}
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
