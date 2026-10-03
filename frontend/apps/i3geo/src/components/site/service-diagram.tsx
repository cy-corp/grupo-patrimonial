"use client";

import { motion } from "framer-motion";
import type { ServiceId } from "@/lib/content";

const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
};

const PARCEL = "M18 62 L30 22 L74 14 L104 34 L96 72 L46 78 Z";
const VERTICES = [
  [18, 62],
  [30, 22],
  [74, 14],
  [104, 34],
  [96, 72],
  [46, 78],
] as const;

// Desenho de linha que explica cada serviço: o que muda no imóvel.
export function ServiceDiagram({ id, className }: { id: ServiceId; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 92"
      fill="none"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {id === "georreferenciamento" && (
        <>
          <motion.path {...draw} d={PARCEL} className="stroke-brand" />
          {VERTICES.map(([x, y]) => (
            <g key={`${x}-${y}`} className="stroke-orange">
              <circle cx={x} cy={y} r={2.6} className="fill-[#F6F4EF]" />
              <path d={`M${x - 6} ${y} H${x - 4} M${x + 4} ${y} H${x + 6} M${x} ${y - 6} V${y - 4} M${x} ${y + 4} V${y + 6}`} strokeWidth={1} />
            </g>
          ))}
        </>
      )}
      {id === "retificacao" && (
        <>
          <path d="M22 66 L28 26 L70 20 L98 40 L92 70 L50 80 Z" className="stroke-graphite/35" strokeDasharray="3 4" />
          <motion.path {...draw} d={PARCEL} className="stroke-brand" />
          <motion.path {...draw} d="M74 14 L104 34 L96 72" className="stroke-orange" strokeWidth={2.2} />
        </>
      )}
      {id === "desmembramento" && (
        <>
          <motion.path {...draw} d={PARCEL} className="stroke-brand" />
          <motion.path {...draw} d="M56 17.5 L68 75.5" className="stroke-orange" strokeWidth={2.2} strokeDasharray="5 4" />
          <text x="38" y="50" className="fill-brand text-[9px] font-bold" stroke="none">A</text>
          <text x="80" y="48" className="fill-brand text-[9px] font-bold" stroke="none">B</text>
        </>
      )}
      {id === "levantamento" && (
        <>
          <motion.path {...draw} d="M8 60 C24 20 70 4 112 26 C118 50 96 84 54 86 C28 86 12 78 8 60 Z" className="stroke-brand/45" />
          <motion.path {...draw} d="M24 58 C36 30 68 20 96 34 C100 52 84 72 54 74 C36 74 26 68 24 58 Z" className="stroke-brand/70" />
          <motion.path {...draw} d="M40 54 C48 40 66 34 80 42 C82 52 72 62 56 62 C46 62 42 60 40 54 Z" className="stroke-brand" />
          <motion.path {...draw} d="M6 82 L114 18" className="stroke-orange" strokeDasharray="5 4" />
          <circle cx="60" cy="50" r="2.6" className="fill-orange" stroke="none" />
        </>
      )}
      {id === "projetos" && (
        <>
          <motion.path {...draw} d={PARCEL} className="stroke-brand" />
          <motion.path {...draw} d="M24 42 L100 52 M52 18 L42 78 M78 15 L72 75" className="stroke-brand/55" strokeWidth={1} />
          <motion.path {...draw} d="M21 52 L98 62" className="stroke-orange" strokeWidth={2.2} />
        </>
      )}
    </svg>
  );
}
