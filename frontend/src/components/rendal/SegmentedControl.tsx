"use client";

import { useId, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  label: string;
  className?: string;
}) {
  const id = useId();
  const index = Math.max(0, options.findIndex((item) => item.value === value));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + options.length) % options.length;
    onChange(options[next].value);
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='radio']");
    buttons[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn("relative inline-grid rounded-full bg-[#EDE6DA] p-1", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-[#1F1F1F] transition-transform duration-700 motion-reduce:transition-none"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          left: "0.25rem",
          transform: `translateX(${index * 100}%)`,
          transitionTimingFunction: EASE,
        }}
      />
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            id={`${id}-${option.value}`}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 min-h-11 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors duration-700",
              selected ? "text-white" : "text-[#1F1F1F]/70",
            )}
            style={{ transitionTimingFunction: EASE }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
