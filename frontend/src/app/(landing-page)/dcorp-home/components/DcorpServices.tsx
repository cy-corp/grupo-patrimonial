import Link from "next/link";
import { DCORP_SERVICES_HOME } from "@/lib/dcorp-content";

export function DcorpServices() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <span
                className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
                Serviços
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
              Engenharia à entrega.
            </h2>
            <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              Seis frentes. Um método.
            </p>
          </div>
          <Link
            href="/servicos"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Ver todos
            <span className="t-learn-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  className="t-learn-arm t-learn-arm-top"
                  d="M6 4L10 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  className="t-learn-arm t-learn-arm-bot"
                  d="M10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        <ol className="grid gap-0 border-t border-[#D9D9D9] sm:grid-cols-2 lg:grid-cols-3">
          {DCORP_SERVICES_HOME.map((service, index) => (
            <li
              key={service}
              className="flex gap-4 border-b border-[#D9D9D9] py-7 sm:border-r sm:px-6 sm:py-8 lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r"
            >
              <span className="shrink-0 font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-sans text-base font-medium leading-snug text-[#1F1F1F] md:text-lg">
                {service}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
