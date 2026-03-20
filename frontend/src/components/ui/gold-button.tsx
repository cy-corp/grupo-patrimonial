"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GoldButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export function GoldButton({ children, className, ...props }: GoldButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "gold-metallic-cta px-6 py-2 font-headline tracking-[0.1em] uppercase text-xs font-bold transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
