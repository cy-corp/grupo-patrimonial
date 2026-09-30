import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { headlineDark, headlineLight } from "@/lib/rendal/tokens";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  dark = false,
  grain = false,
  priority = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  dark?: boolean;
  /** Stronger grain + gradient wash — use on dark heroes that feel flat. */
  grain?: boolean;
  priority?: boolean;
}) {
  return (
    <section
      id="page-hero"
      className={cn(
        "rendal-hero-paper relative px-6 pt-36 pb-12 sm:pb-20",
        dark ? "bg-[#1F1F1F]" : "bg-[#F8F1E3]",
        grain && "rendal-hero-grain",
      )}
    >
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center">
        <header className="mx-auto max-w-[680px] text-center">
          <p className={cn("text-sm font-semibold", dark ? "text-[#C9A96A]" : "text-[#7A4A2B]")}>
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.2] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {typeof title === "string" ? (
              <span
                className={cn(
                  "box-decoration-clone pb-[0.35em]",
                  dark ? headlineDark : headlineLight,
                )}
              >
                {title}
              </span>
            ) : (
              title
            )}
          </h1>
          <p
            className={cn(
              "mt-4 text-base leading-7 text-pretty sm:text-lg sm:leading-8",
              dark ? "text-white/70" : "text-[#1F1F1F]/70",
            )}
          >
            {subtitle}
          </p>
        </header>
        {image ? (
          <div className="relative mt-10 aspect-[4/5] max-h-[60svh] w-full overflow-hidden rounded-3xl bg-[#EDE6DA] md:aspect-video md:max-h-none">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
