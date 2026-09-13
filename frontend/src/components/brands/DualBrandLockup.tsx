import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type DualBrandLockupProps = {
  className?: string;
  markClassName?: string;
  pipeClassName?: string;
};

export const DualBrandLockup = forwardRef<HTMLDivElement, DualBrandLockupProps>(
  function DualBrandLockup({ className, markClassName, pipeClassName }, ref) {
    return (
      <div ref={ref} className={cn("flex min-w-0 items-center", className)}>
        <img
          src="/brands/rendal-logo.png"
          alt="Grupo Rendal"
          className={cn(
            "block h-auto min-w-0 max-w-[45%] object-contain",
            markClassName,
          )}
        />
        <span
          className={cn(
            "w-px shrink-0 bg-[#1F1F1F]/15",
            pipeClassName ?? "h-10 md:h-16",
          )}
          aria-hidden
        />
        <img
          src="/brands/dcorp-logo.png"
          alt="DCorp Engenharia"
          className={cn(
            "block h-auto min-w-0 max-w-[45%] object-contain",
            markClassName,
          )}
        />
      </div>
    );
  },
);
