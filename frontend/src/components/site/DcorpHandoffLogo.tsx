"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DCORP_LOGO_LAYOUT_ID = "dcorp-logo-handoff";

const spring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.78,
};

type DcorpHandoffLogoProps = {
  variant: "hero" | "header";
  className?: string;
  priority?: boolean;
};

export function DcorpHandoffLogo({
  variant,
  className,
  priority,
}: DcorpHandoffLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={DCORP_LOGO_LAYOUT_ID}
      transition={reduceMotion ? { duration: 0 } : spring}
      className={cn("relative", className)}
    >
      <Image
        src="/brands/dcorp-logo.png"
        alt={variant === "header" ? "DCORP" : ""}
        width={1016}
        height={813}
        priority={priority}
        className={cn(
          "absolute inset-0 h-full w-full object-contain object-left",
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
          "absolute inset-0 h-full w-full object-contain object-left",
          variant === "hero" ? "opacity-100" : "opacity-0",
        )}
      />
    </motion.div>
  );
}
