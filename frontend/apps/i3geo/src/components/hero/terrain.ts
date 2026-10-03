import data from "./terrain-data.json";

// Recorte real de relevo (AWS Terrain Tiles, SRTM) processado offline.
// Coordenadas em pixels do recorte: x para leste, y para sul.
export const terrain = data;

export type Point = [number, number];

export const SIZE = { width: data.width, height: data.height };

// Mundo three.js: 1 unidade = 100 px do recorte. Norte para -Z.
export const WORLD = {
  width: data.width / 100,
  depth: data.height / 100,
  metersPerUnit: data.metersPerPixel * 100,
};

export const EXAGGERATION = 1.8;

export function toWorld(x: number, y: number): [number, number] {
  return [x / 100 - WORLD.width / 2, y / 100 - WORLD.depth / 2];
}

export function heightToWorld(meters: number) {
  return ((meters - data.hMin) / WORLD.metersPerUnit) * EXAGGERATION;
}

const fence = data.parcel.vertices.map((v) => [v.x, v.y] as Point);

function subsample(points: Point[], max: number): Point[] {
  if (points.length <= max) return points;
  const step = (points.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => points[Math.round(i * step)]);
}

// Perímetro em ordem: cerca V-01 → V-06, depois a margem do rio de volta.
const riverEdge = subsample(
  [...(data.parcel.riverEdge as Point[])].reverse(),
  16,
).slice(1, -1);

export const perimeter: Point[] = [...fence, ...riverEdge];
export const FENCE_SEGMENTS = fence.length - 1;

export function centroid(points: Point[]): Point {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const f = x1 * y2 - x2 * y1;
    a += f;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  return [cx / (3 * a), cy / (3 * a)];
}

export const parcelCenter = centroid(data.parcel.polygon as Point[]);
export const reserveCenter = centroid(data.reserve.polygon as Point[]);
export const appLabelAt = data.parcel.riverEdge[
  Math.floor(data.parcel.riverEdge.length * 0.45)
] as Point;

const number = (digits: number) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const fmt = {
  coord: (v: number) => number(2).format(v),
  ha: (v: number) => `${number(2).format(v)} ha`,
  km: (v: number) => `${number(1).format(v)} km`,
  pct: (v: number) => `${number(1).format(v)}%`,
};

export const facts = {
  extentKm: [
    (data.width * data.metersPerPixel) / 1000,
    (data.height * data.metersPerPixel) / 1000,
  ] as const,
  areaHa: data.parcel.areaHa,
  appHa: data.app.areaHa,
  appWidthM: data.app.widthM,
  reserveHa: data.reserve.areaHa,
  reservePct: (data.reserve.areaHa / data.parcel.areaHa) * 100,
  vertices: data.parcel.vertices.length,
  datum: data.datum,
  contourInterval: 20,
};
