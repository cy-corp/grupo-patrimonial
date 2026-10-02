import Image from "next/image";
import Link from "next/link";
import type { DcorpEnvironmentalPage } from "@/lib/dcorp-content";
import { DCORP_ENVIRONMENTAL_EYEBROW } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

function BackLink({ className }: { className?: string }) {
  return (
    <p className={className}>
      <Link
        href="/servicos-ambientais"
        className="font-sans text-sm font-semibold text-[#1F1F1F] underline decoration-[#C9A96A] underline-offset-4"
      >
        Voltar aos serviços ambientais
      </Link>
    </p>
  );
}

function Photo({
  page,
  className,
  sizes,
  priority = true,
}: {
  page: DcorpEnvironmentalPage;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#1F1F1F]", className)}>
      <Image
        src={page.image}
        alt={page.imageAlt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

function Sections({
  page,
  variant,
}: {
  page: DcorpEnvironmentalPage;
  variant: "lista" | "grade" | "dupla" | "tres";
}) {
  if (variant === "lista") {
    return (
      <ol className="max-w-3xl border-t border-[#D9D9D9]">
        {page.sections.map((section, index) => (
          <li
            key={section.title}
            className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[#D9D9D9] py-6 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-7"
          >
            <Number index={index} />
            <Block section={section} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol
      className={cn(
        "grid gap-px border border-[#D9D9D9] bg-[#D9D9D9]",
        variant === "dupla" && "md:grid-cols-2",
        variant === "grade" && "sm:grid-cols-2",
        variant === "tres" && "md:grid-cols-3",
      )}
    >
      {page.sections.map((section, index) => (
        <li key={section.title} className="bg-white p-6 md:p-8">
          <Number index={index} />
          <div className="mt-4">
            <Block section={section} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function Number({ index }: { index: number }) {
  return (
    <span className="font-sans text-sm font-semibold tabular-nums text-[#C9A96A]">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function Block({
  section,
}: {
  section: DcorpEnvironmentalPage["sections"][number];
}) {
  return (
    <div>
      <h2 className="font-sans text-lg font-semibold text-[#1F1F1F] md:text-xl">
        {section.title}
      </h2>
      <p className="mt-2 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
        {section.body}
      </p>
    </div>
  );
}

export function DcorpEnvironmentalService({
  page,
}: {
  page: DcorpEnvironmentalPage;
}) {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-20">
        {page.layout === "texto-foto" ? (
          <>
            <BackLink className="mb-8" />
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <DcorpPageIntro
                className="lg:col-span-7"
                eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
                title={page.title}
                description={page.description}
              />
              <Photo
                page={page}
                className="aspect-[3/2] lg:col-span-5"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="mt-14">
              <Sections page={page} variant="lista" />
            </div>
          </>
        ) : null}

        {page.layout === "foto-texto" ? (
          <>
            <BackLink className="mb-8" />
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <Photo
                page={page}
                className="aspect-[16/9] lg:col-span-7"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <DcorpPageIntro
                className="lg:col-span-5"
                eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
                title={page.title}
                description={page.description}
              />
            </div>
            <div className="mt-14">
              <Sections page={page} variant="grade" />
            </div>
          </>
        ) : null}

        {page.layout === "faixa" ? (
          <>
            <BackLink className="mb-8" />
            <Photo
              page={page}
              className="aspect-[16/9] max-h-[28rem]"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <DcorpPageIntro
              className="mt-10"
              eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
              title={page.title}
              description={page.description}
            />
            <div className="mt-12">
              <Sections page={page} variant="dupla" />
            </div>
          </>
        ) : null}

        {page.layout === "coluna" ? (
          <>
            <BackLink className="mb-8" />
            <Photo
              page={page}
              className="aspect-[16/9]"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="mt-10 max-w-3xl">
              <DcorpPageIntro
                eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
                title={page.title}
                description={page.description}
              />
              <div className="mt-10">
                <Sections page={page} variant="lista" />
              </div>
            </div>
          </>
        ) : null}

        {page.layout === "centro" ? (
          <>
            <BackLink className="mb-8" />
            <DcorpPageIntro
              align="center"
              eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
              title={page.title}
              description={page.description}
            />
            <Photo
              page={page}
              className="mt-10 aspect-[16/7]"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="mx-auto mt-14 max-w-3xl">
              <Sections page={page} variant="lista" />
            </div>
          </>
        ) : null}

        {page.layout === "cartoes" ? (
          <>
            <BackLink className="mb-8" />
            <DcorpPageIntro
              eyebrow={DCORP_ENVIRONMENTAL_EYEBROW}
              title={page.title}
              description={page.description}
            />
            <div className="mt-12">
              <Sections page={page} variant="tres" />
            </div>
            <Photo
              page={page}
              className="mt-12 aspect-[16/9]"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </>
        ) : null}
      </div>

      <DcorpPageCta
        title="Regularização e licenciamento com método técnico."
        description="A DCORP conduz o processo ambiental até o órgão competente."
      />
    </main>
  );
}
