import { facts, fmt } from "./terrain";

// Etapas da hero ao longo do scroll (0 = topo da seção, 1 = fim).
export const BEATS = [
  {
    id: "relevo",
    at: 0,
    index: "01",
    title: "Relevo",
    text: `Curvas de nível a cada ${facts.contourInterval} m, desenhadas a partir de dados reais de elevação.`,
    data: `Recorte de ${fmt.km(facts.extentKm[0])} × ${fmt.km(facts.extentKm[1])}`,
  },
  {
    id: "topografia",
    at: 0.3,
    index: "02",
    title: "Topografia",
    text: "Levantamento em campo de cada vértice do imóvel.",
    data: `${facts.vertices} vértices · ${facts.datum}`,
  },
  {
    id: "georreferenciamento",
    at: 0.52,
    index: "03",
    title: "Georreferenciamento",
    text: "Perímetro fechado pela margem do rio e área calculada.",
    data: `Área do imóvel: ${fmt.ha(facts.areaHa)}`,
  },
  {
    id: "meio-ambiente",
    at: 0.7,
    index: "04",
    title: "Meio Ambiente",
    text: `APP de ${facts.appWidthM} m ao longo do rio e reserva legal delimitada.`,
    data: `APP ${fmt.ha(facts.appHa)} · Reserva legal ${fmt.ha(facts.reserveHa)} (${fmt.pct(facts.reservePct)})`,
  },
  {
    id: "ponto",
    at: 0.86,
    index: "05",
    title: "Informação precisa",
    text: "Território medido, entendido e pronto para decisões melhores.",
    data: "Precisão territorial. Inteligência ambiental.",
  },
] as const;

export function beatAt(p: number) {
  let i = 0;
  for (let k = 0; k < BEATS.length; k++) if (p >= BEATS[k].at - 0.02) i = k;
  return i;
}

export function ramp(p: number, from: number, to: number) {
  const t = Math.min(1, Math.max(0, (p - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

// Valores que a cena lê a cada quadro, todos derivados do progresso do scroll.
export function stage(p: number) {
  return {
    lift: ramp(p, 0.06, 0.28),
    fence: ramp(p, 0.33, 0.5),
    close: ramp(p, 0.54, 0.64),
    fill: ramp(p, 0.6, 0.68),
    env: ramp(p, 0.72, 0.82),
    pin: ramp(p, 0.88, 0.97),
  };
}

export type Stage = ReturnType<typeof stage>;

export const FINAL_STAGE: Stage = stage(1);
