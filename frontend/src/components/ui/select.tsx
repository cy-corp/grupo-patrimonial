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
    <div className={cn("relative z-20", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-transparent border-0 border-b border-[#0F172A]/10 px-0 h-14 focus:outline-none focus:border-primary text-lg font-sans font-medium tracking-tight transition-all duration-300 flex justify-between items-center group/btn cursor-pointer",
          isOpen && "border-primary"
        )}
      >
        <span className={cn(value ? "text-[#0F172A]" : "text-[#0F172A]/30")}>
          {value || placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-[#0F172A]/20 transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-[#0F172A]/5 shadow-[0_30px_60px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden backdrop-blur-3xl"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-6 py-3 text-sm font-sans font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer",
                    value === option ? "bg-primary/5 text-primary" : "text-[#0F172A]/70"
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
