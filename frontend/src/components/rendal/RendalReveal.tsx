"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

export function RendalReveal({
  children,
  className,
  delayMs = 0,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Blur smears high-contrast renders (the brute lockup). Skip it there. */
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700",
        blur && "transition-[opacity,filter,transform]",
        shown ? "opacity-100" : "translate-y-16 opacity-0",
        !shown && blur && "blur-md",
        className,
      )}
      style={
        {
          transitionTimingFunction: EASE,
          transitionDelay: shown ? `${delayMs}ms` : "0ms",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
