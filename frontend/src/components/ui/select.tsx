"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function Select({ options, value, onChange, placeholder = "Selecione uma opção", className, label }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("space-y-2 group relative", className)} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-[0.2em] block ml-1 group-focus-within:text-primary transition-colors">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-surface-container-high/50 dark:bg-surface-container-high/30 border-b border-outline-variant/30 px-4 py-4 focus:outline-none focus:border-primary text-on-surface transition-all duration-300 font-light tracking-wider flex justify-between items-center group/btn",
          isOpen && "border-primary"
        )}
      >
        <span className={cn(value ? "text-on-surface" : "text-on-surface-variant")}>
          {value || placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-on-surface-variant transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-surface dark:bg-[#161616] border border-outline-variant/30 shadow-2xl rounded-lg overflow-hidden backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                    value === option ? "bg-primary/5 text-primary" : "text-on-surface"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
