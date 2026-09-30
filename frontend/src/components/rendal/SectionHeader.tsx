import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  id,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  id?: string;
  onDark?: boolean;
}) {
  return (
    <header className={cn("max-w-[680px]", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={cn("text-sm font-semibold", onDark ? "text-[#C9A96A]" : "text-[#7A4A2B]")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl",
          eyebrow && "mt-3",
          onDark ? "text-white" : "text-[#1F1F1F]",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 text-pretty sm:text-lg sm:leading-8",
            onDark ? "text-white/70" : "text-[#1F1F1F]/70",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
