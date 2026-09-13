"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GoldButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function GoldButton({ children, className, href, ...props }: GoldButtonProps) {
  const classes = cn(
    "gold-metallic-cta inline-flex items-center justify-center px-6 py-2 font-sans tracking-[0.12em] uppercase text-xs font-bold transition-all duration-300 cursor-pointer overflow-hidden relative",
    className,
  );
  const motionFx = {
    whileHover: { y: -2, filter: "brightness(1.08)" },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionFx}
        onClick={(event) => {
          if (!href.startsWith("#")) return;
          const target = document.querySelector(href);
          if (!target) return;
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} {...props} {...motionFx}>
      {children}
    </motion.button>
  );
}
