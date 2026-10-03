import { ramp } from "../hero/beats";

// Rolagem medida em alturas de tela (v = scrollY / innerHeight).
export function stageAt(v: number) {
  const day = ramp(v, 0.12, 1.55);
  return {
    day,
    // Elevação do sol em graus: nasce rasante e sobe até a luz de meio da manhã.
    sun: 1.2 + day * day * 38,
    parcel: ramp(v, 3.0, 3.6),
    fill: ramp(v, 3.55, 3.8),
    rivers: ramp(v, 4.1, 4.5),
    env: ramp(v, 4.25, 4.75),
    pin: ramp(v, 5.1, 5.5),
  };
}

// Direção do sol em (leste, norte, cima), vindo de leste-nordeste.
export function sunDirection(elevationDeg: number): [number, number, number] {
  const el = (elevationDeg * Math.PI) / 180;
  const az = (14 * Math.PI) / 180;
  return [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)];
}

type Key = { v: number; pitch: number; yaw: number; dist: number; focus: number; fx: number; fz: number; oz?: number; sx?: number };

const KEYS: Key[] = [
  { v: 0, pitch: 16, yaw: -14, dist: 0.66, focus: 0, fx: 0.2, fz: 0.5 },
  { v: 0.4, pitch: 16, yaw: -14, dist: 0.66, focus: 0, fx: 0.2, fz: 0.5 },
  { v: 1.5, pitch: 24, yaw: -4, dist: 0.5, focus: 0, fx: 0.1, fz: 0.05 },
  { v: 2.2, pitch: 30, yaw: 10, dist: 0.6, focus: 0, fx: 0.4, fz: 0.2 },
  { v: 2.9, pitch: 36, yaw: 18, dist: 0.55, focus: 0.2, fx: 0.4, fz: 0.2 },
  { v: 3.4, pitch: 56, yaw: -18, dist: 0.46, focus: 1, fx: 0, fz: 0, sx: 0.42 },
  { v: 3.9, pitch: 56, yaw: -28, dist: 0.46, focus: 1, fx: 0, fz: 0, sx: 0.42 },
  { v: 4.5, pitch: 44, yaw: -52, dist: 0.46, focus: 1, fx: 0, fz: 0, sx: 0.55 },
  { v: 4.9, pitch: 44, yaw: -56, dist: 0.46, focus: 1, fx: 0, fz: 0, sx: 0.55 },
  { v: 5.5, pitch: 84, yaw: -4, dist: 0.64, focus: 1, fx: 0, fz: 0, oz: 0.5 },
];

export function cameraAt(v: number) {
  let k = 0;
  while (k < KEYS.length - 2 && v > KEYS[k + 1].v) k++;
  const a = KEYS[k];
  const b = KEYS[k + 1];
  const t = ramp(v, a.v, b.v);
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    pitch: mix(a.pitch, b.pitch),
    yaw: mix(a.yaw, b.yaw),
    dist: mix(a.dist, b.dist),
    focus: mix(a.focus, b.focus),
    fx: mix(a.fx, b.fx),
    fz: mix(a.fz, b.fz),
    oz: mix(a.oz ?? 0, b.oz ?? 0),
    sx: mix(a.sx ?? 0, b.sx ?? 0),
  };
}

// Paleta do céu e da página ao longo do amanhecer.
type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const SKY: { at: number; top: RGB; horizon: RGB; ground: RGB }[] = [
  { at: 0, top: hex("#01080D"), horizon: hex("#0A2531"), ground: hex("#03121A") },
  { at: 0.3, top: hex("#14283D"), horizon: hex("#C9775A"), ground: hex("#1A2A31") },
  { at: 0.55, top: hex("#9DBDCB"), horizon: hex("#F6CBA8"), ground: hex("#DCD5CB") },
  { at: 1, top: hex("#E6EEF0"), horizon: hex("#F6F4EF"), ground: hex("#F6F4EF") },
];

function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB;
}

export function skyAt(day: number) {
  let k = 0;
  while (k < SKY.length - 2 && day > SKY[k + 1].at) k++;
  const a = SKY[k];
  const b = SKY[k + 1];
  const t = Math.min(1, Math.max(0, (day - a.at) / (b.at - a.at)));
  return {
    top: mixRgb(a.top, b.top, t),
    horizon: mixRgb(a.horizon, b.horizon, t),
    ground: mixRgb(a.ground, b.ground, t),
  };
}

export const css = ([r, g, b]: RGB, alpha = 1) => `rgba(${r},${g},${b},${alpha})`;
export const PAPER = "#F6F4EF";

// Rolagem, em alturas de tela, a partir da qual a abertura já está toda coberta pelo resto da página.
export const EXPERIENCE_END = 7.05;
