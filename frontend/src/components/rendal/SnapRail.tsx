"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SnapRail({
  children,
  label,
  showCounter = false,
  itemClassName = "w-[85%] shrink-0 snap-start",
}: {
  children: ReactNode;
  label: string;
  showCounter?: boolean;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const nodes = [...el.children] as HTMLElement[];
      const left = el.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      nodes.forEach((node, i) => {
        const dist = Math.abs(node.offsetLeft - el.offsetLeft - left);
        if (dist < bestDist) {
          best = i;
          bestDist = dist;
        }
      });
      setIndex(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  const go = (next: number) => {
    const el = ref.current;
    const node = el?.children[next] as HTMLElement | undefined;
    if (!el || !node) return;
    const centered = node.classList.contains("snap-center");
    const origin = node.offsetLeft - el.offsetLeft;
    const left = centered ? origin - (el.clientWidth - node.offsetWidth) / 2 : origin;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={label}
      >
        {items.map((child, i) => (
          <div key={i} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex gap-2" role="tablist" aria-label="Posição">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Item ${i + 1} de ${items.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className={cn(
                "size-2.5 cursor-pointer rounded-full",
                i === index ? "bg-[#0F5B63]" : "bg-[#1F1F1F]/20",
              )}
            />
          ))}
        </div>
        {showCounter ? (
          <p className="text-sm font-semibold tabular-nums text-[#1F1F1F]/65">
            {String(index + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
