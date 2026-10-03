"use client";

import { useEffect, useRef } from "react";
import { fmt } from "../hero/terrain";
import type { Readout, ReadoutData } from "./concept-stage";

const W = 260;
const H = 64;

const meters = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const meters1 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function distance(m: number) {
  return m >= 1000 ? fmt.km(m / 1000) : `${meters.format(m)} m`;
}

// Painel do instrumento: leituras e perfil do terreno, escritos direto no DOM
// a cada quadro para não renderizar o React a 60 fps.
export function ConceptHud({ readout }: { readout: React.RefObject<Readout | null> }) {
  const panel = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const rows = useRef<(HTMLElement | null)[]>([]);
  const labels = useRef<(HTMLElement | null)[]>([]);
  const area = useRef<SVGPathElement>(null);
  const line = useRef<SVGPathElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const tipText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const set = (i: number, label: string, value: string) => {
      const l = labels.current[i];
      const r = rows.current[i];
      if (l && l.textContent !== label) l.textContent = label;
      if (r) r.textContent = value;
    };
    readout.current = {
      update(d: ReadoutData) {
        if (panel.current) panel.current.style.opacity = String(d.visible);
        if (title.current) {
          title.current.textContent =
            d.mode === "scan" ? `Perfil transversal · E ${meters.format(d.scanE)}` : "Visada EST-01 → ponto";
        }
        if (d.mode === "scan") {
          const min = Math.min(...d.profile);
          const max = Math.max(...d.profile);
          set(0, "Cota mín.", `${meters1.format(min)} m`);
          set(1, "Cota máx.", `${meters1.format(max)} m`);
          set(2, "Desnível", `${meters.format(max - min)} m`);
          set(3, "Extensão", distance(d.distance));
        } else {
          set(0, "Cota", `${meters1.format(d.elevation)} m`);
          set(1, "Distância", distance(d.distance));
          set(2, "Desnível", `${d.dh >= 0 ? "+" : ""}${meters1.format(d.dh)} m`);
          set(3, "Declividade", `${meters1.format(d.slope)}%`);
        }
        const min = Math.min(...d.profile);
        const max = Math.max(...d.profile);
        const span = Math.max(1, max - min);
        const pts = d.profile.map((h, i) => {
          const x = (i / (d.profile.length - 1)) * W;
          const y = H - 4 - ((h - min) / span) * (H - 12);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        line.current?.setAttribute("d", `M${pts.join("L")}`);
        area.current?.setAttribute("d", `M0,${H}L${pts.join("L")}L${W},${H}Z`);
        if (tipText.current) {
          tipText.current.textContent = `E ${fmt.coord(d.e)}  N ${fmt.coord(d.n)}  ·  ${meters1.format(d.elevation)} m`;
        }
      },
      place(x: number, y: number, visible: number) {
        if (!tip.current) return;
        tip.current.style.transform = `translate(${x + 18}px, ${y - 12}px)`;
        tip.current.style.opacity = String(visible);
      },
    };
    return () => {
      readout.current = null;
    };
  }, [readout]);

  return (
    <>
      <div
        ref={tip}
        className="pointer-events-none fixed left-0 top-0 z-20 hidden opacity-0 sm:block"
        aria-hidden="true"
      >
        <span
          ref={tipText}
          className="block whitespace-pre border-l-2 border-orange bg-[#031B22]/85 px-2 py-1 text-[10px] font-semibold tracking-wide text-white tabular-nums backdrop-blur-sm"
        />
      </div>
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-4 right-4 z-20 hidden w-[300px] border border-white/10 bg-[#031B22]/75 p-4 opacity-0 backdrop-blur-md sm:bottom-6 sm:right-6 sm:block"
      >
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
          <span className="block size-1.5 rotate-45 bg-orange" />
          <span ref={title}>Visada EST-01 → ponto</span>
        </p>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-16 w-full" preserveAspectRatio="none">
          <path ref={area} fill="#6CC3D8" fillOpacity="0.12" />
          <path ref={line} fill="none" stroke="#A9E3F0" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <dt
                ref={(el) => {
                  labels.current[i] = el;
                }}
                className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45"
              />
              <dd
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="text-sm font-semibold text-white tabular-nums"
              />
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
