"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { PIN_DOT, PIN_GLYPHS, PIN_OUTLINE, PIN_VIEWBOX } from "./logo-paths";
import { terrainRows } from "./terrain-rows";

const MIN_MS = 1500;
const MAX_MS = 7000;
const DOT = { cx: 262.6, cy: 264.6, r: 56 };
const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "loading" | "landing" | "leaving" | "done";

// Tela de entrada: o contorno do pin se desenha enquanto a página carrega. Quando tudo
// está pronto, o pin se preenche e o pingo do "i" cai no lugar, como um ponto medido.
export function Loader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [waited, setWaited] = useState(false);
  const [expired, setExpired] = useState(false);
  const [fonts, setFonts] = useState(false);

  useEffect(() => {
    const min = window.setTimeout(() => setWaited(true), MIN_MS);
    const max = window.setTimeout(() => setExpired(true), MAX_MS);
    document.fonts.ready.then(() => setFonts(true)).catch(() => setFonts(true));
    terrainRows().catch(() => {});
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(max);
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    if ((waited && ready && fonts) || expired) setPhase(reduce ? "leaving" : "landing");
  }, [phase, waited, ready, fonts, expired, reduce]);

  useEffect(() => {
    if (phase === "landing") {
      const t = window.setTimeout(() => setPhase("leaving"), 1150);
      return () => window.clearTimeout(t);
    }
    if (phase === "leaving") {
      onDone();
      const t = window.setTimeout(() => setPhase("done"), 700);
      return () => window.clearTimeout(t);
    }
  }, [phase, onDone]);

  const landed = phase !== "loading";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          role="status"
          aria-label="Carregando"
          animate={{ opacity: phase === "leaving" ? 0 : 1 }}
          transition={{ duration: 0.65, ease }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#01080D]"
        >
          <motion.svg
            viewBox={PIN_VIEWBOX}
            className="h-36 w-auto overflow-visible sm:h-44"
            fill="none"
            animate={{ scale: phase === "leaving" ? 1.12 : 1 }}
            transition={{ duration: 0.65, ease }}
          >
            <motion.path
              d={PIN_OUTLINE}
              stroke="#8FDCEC"
              strokeWidth={8}
              strokeLinejoin="round"
              initial={{ pathLength: reduce ? 1 : 0, fill: "rgba(255,255,255,0)" }}
              animate={{ pathLength: 1, fill: landed ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
              transition={{ pathLength: { duration: 1.3, ease: "easeInOut" }, fill: { duration: 0.45, ease } }}
            />
            <motion.path
              d={PIN_GLYPHS}
              fillRule="evenodd"
              initial={{ fill: "#8FDCEC", opacity: 0 }}
              animate={{ fill: landed ? "#005C74" : "#8FDCEC", opacity: landed ? 1 : 0.35 }}
              transition={{ duration: 0.45, ease, delay: landed ? 0 : 0.9 }}
            />
            {landed && (
              <>
                <motion.path
                  d={PIN_DOT}
                  fill="#FF6A13"
                  initial={{ y: -520, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, fill: ["#FF6A13", "#FF6A13", "#005C74"] }}
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 15, delay: 0.15 },
                    opacity: { duration: 0.15, delay: 0.15 },
                    fill: { duration: 0.9, times: [0, 0.7, 1], delay: 0.15 },
                  }}
                />
                <motion.circle
                  cx={DOT.cx}
                  cy={DOT.cy}
                  fill="none"
                  stroke="#FF6A13"
                  strokeWidth={10}
                  initial={{ r: DOT.r, opacity: 0 }}
                  animate={{ r: DOT.r * 5, opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                />
              </>
            )}
          </motion.svg>
          <p className="mt-8 h-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            {landed ? "Tudo pronto!" : "Carregando o relevo"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
