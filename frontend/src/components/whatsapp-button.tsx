"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LucideProps, X } from "lucide-react";
import { companyList, whatsappHref } from "@/lib/companies";

export const WhatsAppIcon = ({ className, ...props }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props as any}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.633 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const easeOut = [0.23, 1, 0.32, 1] as const;

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="fixed right-6 bottom-6 z-[200] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          companyList.map((company, index) => (
            <motion.a
              key={company.id}
              href={whatsappHref(company, `Olá, gostaria de falar com a ${company.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.96)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px) scale(0.96)" }}
              transition={{ duration: 0.22, delay: reduce ? 0 : index * 0.05, ease: easeOut }}
              className="flex items-center gap-3 rounded-full bg-white py-2 pr-4 pl-2 text-graphite shadow-lg ring-1 ring-graphite/10"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="size-5" />
              </span>
              <span className="pr-1 text-left">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                  {company.role}
                </span>
                <span className="block font-heading text-sm font-bold">{company.name}</span>
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Fechar WhatsApp" : "Falar no WhatsApp"}
        onClick={() => setOpen((value) => !value)}
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        animate={reduce ? undefined : { transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        transition={{ duration: 0.2, ease: easeOut }}
      >
        {open ? <X className="size-6" /> : <WhatsAppIcon className="size-8" />}
      </motion.button>
    </div>
  );
}
