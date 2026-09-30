"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { track } from "@/lib/rendal/track";

export function StickyActionBar({
  primaryHref,
  primaryLabel,
  whatsappHref,
  hideWhen,
  eventName = "cta_visita_click",
}: {
  primaryHref: string;
  primaryLabel: string;
  whatsappHref: string;
  hideWhen?: string;
  eventName?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("page-hero");
    const footer = document.querySelector("footer");
    const hide = hideWhen ? document.getElementById(hideWhen) : null;
    let heroGone = !hero;
    let footerNear = false;
    let sectionOn = false;
    const sync = () => setShow(heroGone && !footerNear && !sectionOn);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroGone = !entry.isIntersecting;
          if (entry.target === footer) footerNear = entry.isIntersecting;
          if (hide && entry.target === hide) sectionOn = entry.isIntersecting;
        }
        sync();
      },
      { threshold: 0.12 },
    );
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    if (hide) io.observe(hide);
    sync();
    return () => io.disconnect();
  }, [hideWhen]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[#1F1F1F]/10 bg-[#F8F1E3]/95 px-4 pt-3 backdrop-blur-md transition-transform duration-700 motion-reduce:transition-none md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        transitionTimingFunction: EASE,
      }}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <Link
          href={primaryHref}
          tabIndex={show ? undefined : -1}
          onClick={() => track(eventName)}
          className="inline-flex h-12 min-h-11 flex-1 items-center justify-center rounded-full bg-[#1F1F1F] px-4 text-base font-semibold text-white"
        >
          {primaryLabel}
        </Link>
        <a
          href={whatsappHref}
          tabIndex={show ? undefined : -1}
          aria-label="WhatsApp"
          onClick={() => track("whatsapp_click")}
          className="inline-flex size-12 items-center justify-center rounded-full bg-[#1F1F1F] text-white"
        >
          <WhatsappLogo weight="fill" className="size-6" aria-hidden />
        </a>
      </div>
    </div>
  );
}
