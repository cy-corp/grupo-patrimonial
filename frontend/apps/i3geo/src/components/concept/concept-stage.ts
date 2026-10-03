import { ramp } from "../hero/beats";
import { SIZE, parcelCenter, terrain, type Point } from "../hero/terrain";

// Rolagem medida em alturas de tela (v = scrollY / innerHeight).
export const CHAPTERS = {
  hero: 0,
  topografia: 1,
  georreferenciamento: 2.4,
  ambiente: 3.7,
  final: 5,
} as const;

export function stageAt(v: number) {
  return {
    measure: 1 - ramp(v, 0.55, 0.95),
    scan: ramp(v, 0.75, 1.1) * (1 - ramp(v, 2.05, 2.35)),
    scanX: 60 + ramp(v, 1.0, 2.1) * (SIZE.width - 120),
    parcel: ramp(v, 2.35, 3.0),
    fill: ramp(v, 2.95, 3.2),
    rivers: ramp(v, 3.35, 3.85),
    env: ramp(v, 3.6, 4.1),
    pin: ramp(v, 4.65, 5),
  };
}

type Key = { v: number; pitch: number; yaw: number; dist: number; focus: number; fx: number; fz: number; oz?: number };

const KEYS: Key[] = [
  { v: 0, pitch: 30, yaw: -26, dist: 0.62, focus: 0, fx: 0.55, fz: 0.25 },
  { v: 0.35, pitch: 30, yaw: -26, dist: 0.62, focus: 0, fx: 0.55, fz: 0.25 },
  { v: 1.2, pitch: 17, yaw: 6, dist: 0.5, focus: 0, fx: 0, fz: 0.2 },
  { v: 2.0, pitch: 20, yaw: 14, dist: 0.5, focus: 0, fx: 0, fz: 0.2 },
  { v: 2.8, pitch: 56, yaw: -28, dist: 0.36, focus: 1, fx: 0, fz: 0 },
  { v: 3.4, pitch: 54, yaw: -34, dist: 0.36, focus: 1, fx: 0, fz: 0 },
  { v: 4.1, pitch: 40, yaw: -58, dist: 0.46, focus: 1, fx: 0, fz: 0 },
  { v: 4.4, pitch: 40, yaw: -60, dist: 0.46, focus: 1, fx: 0, fz: 0 },
  { v: 5, pitch: 86, yaw: -4, dist: 0.66, focus: 1, fx: 0, fz: 0, oz: 0.55 },
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
  };
}

// Estação no ponto mais alto da região a oeste do imóvel.
export function findStation(heights: Float32Array): Point {
  const { width: W, height: H } = SIZE;
  let best = -1;
  let at: Point = [parcelCenter[0] - 80, parcelCenter[1] - 60];
  for (let y = 180; y < 360; y++) {
    for (let x = 260; x < 420; x++) {
      const v = heights[(H - 1 - y) * W + x];
      if (v > best) {
        best = v;
        at = [x + 0.5, y + 0.5];
      }
    }
  }
  return at;
}

// Percurso automático do instrumento quando não há mouse.
export function autoTarget(t: number, [sx, sy]: Point): [number, number] {
  return [
    sx + 120 + Math.sin(t * 0.21) * 110 + Math.sin(t * 0.53) * 30,
    sy + 30 + Math.cos(t * 0.17) * 80 + Math.sin(t * 0.41) * 25,
  ];
}

// Ajuste afim pixel → UTM a partir dos vértices (erro sub-métrico no recorte).
const fit = (() => {
  const vs = terrain.parcel.vertices;
  const solve = (key: "e" | "n") => {
    // Mínimos quadrados de [x y 1] · c = valor.
    const A = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const b = [0, 0, 0];
    for (const v of vs) {
      const r = [v.x, v.y, 1];
      for (let i = 0; i < 3; i++) {
        b[i] += r[i] * v[key];
        for (let j = 0; j < 3; j++) A[i][j] += r[i] * r[j];
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let k = i + 1; k < 3; k++) {
        const f = A[k][i] / A[i][i];
        for (let j = i; j < 3; j++) A[k][j] -= f * A[i][j];
        b[k] -= f * b[i];
      }
    }
    const c = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
      let sum = b[i];
      for (let j = i + 1; j < 3; j++) sum -= A[i][j] * c[j];
      c[i] = sum / A[i][i];
    }
    return c;
  };
  return { e: solve("e"), n: solve("n") };
})();

export function toUtm(x: number, y: number): [number, number] {
  return [
    fit.e[0] * x + fit.e[1] * y + fit.e[2],
    fit.n[0] * x + fit.n[1] * y + fit.n[2],
  ];
}

export type ReadoutData = {
  mode: "point" | "scan";
  e: number;
  n: number;
  elevation: number;
  distance: number;
  dh: number;
  slope: number;
  scanE: number;
  profile: number[];
  visible: number;
};

export type Readout = {
  update: (data: ReadoutData) => void;
  place: (x: number, y: number, visible: number) => void;
};
