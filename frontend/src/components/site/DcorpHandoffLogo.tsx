"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type DcorpHandoffLogoProps = {
  variant: "hero" | "header";
  className?: string;
  priority?: boolean;
};

/** Static mark swap — no shared-layout flight (that caused the mobile scroll flick). */
export function DcorpHandoffLogo({
  variant,
  className,
  priority,
}: DcorpHandoffLogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/brands/dcorp-logo.png"
        alt={variant === "header" ? "DCORP" : ""}
        width={1016}
        height={813}
        priority={priority}
        className={cn(
          "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)]",
          variant === "header" ? "opacity-100" : "opacity-0",
        )}
      />
      <Image
        src="/brands/dcorp-logo-negative.png"
        alt={variant === "hero" ? "DCORP" : ""}
        aria-hidden={variant !== "hero"}
        width={1016}
        height={813}
        priority={priority}
        className={cn(
          "absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)]",
          variant === "hero" ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
