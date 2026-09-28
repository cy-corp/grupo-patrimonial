"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { FaqItem } from "@/lib/rendal/content/faq";
import { RendalReveal } from "./RendalReveal";
import { SectionHeader } from "./SectionHeader";

function Item({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="t-acc rounded-2xl bg-white ring-1 ring-[#1F1F1F]/10" data-open={open ? "true" : "false"}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="t-acc-head flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] sm:px-8"
      >
        <span className="text-base font-semibold text-balance text-[#1F1F1F] sm:text-lg">{question}</span>
        <span className="t-acc-chevron shrink-0 text-[#0F5B63]">
          <CaretDown weight="bold" className="size-5" aria-hidden />
        </span>
      </button>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="t-acc-panel">
        <div className="t-acc-panel-inner px-6 sm:px-8">
          <p className="pb-5 text-base leading-7 text-pretty text-[#1F1F1F]/65 sm:pb-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList({
  items,
  title = "Perguntas frequentes",
  subtitle,
  id = "faq-titulo",
}: {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-6 py-12 sm:py-20 md:py-24" aria-labelledby={id}>
      <div className="mx-auto max-w-3xl">
        <RendalReveal>
          <SectionHeader id={id} title={title} subtitle={subtitle} />
        </RendalReveal>
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, index) => (
            <RendalReveal key={item.q} delayMs={Math.min(index * 40, 200)}>
              <Item
                question={item.q}
                answer={item.a}
                open={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
              />
            </RendalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
