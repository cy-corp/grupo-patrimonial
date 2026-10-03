import {
  EXAGGERATION,
  SIZE,
  WORLD,
  parcelCenter,
  perimeter,
  terrain,
  toWorld,
} from "@/components/hero/terrain";

const RANGE = terrain.hMax - terrain.hMin;
export const RANGE_WORLD = (RANGE / WORLD.metersPerUnit) * EXAGGERATION;

export const PIN_HEIGHT = 2.7;
const PIN_SHARE = 0.86;

// Alturas normalizadas (0 a 1), linha 0 no norte, como no recorte.
export async function loadHeights(): Promise<Float32Array> {
  const blob = await fetch("/hero/terrain.png").then((r) => r.blob());
  const bitmap = await createImageBitmap(blob, {
    colorSpaceConversion: "none",
    premultiplyAlpha: "none",
  });
  const { width: W, height: H } = SIZE;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context indisponível");
  ctx.drawImage(bitmap, 0, 0);
  const px = ctx.getImageData(0, 0, W, H).data;
  const out = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    out[i] = (px[i * 4] * 256 + px[i * 4 + 1]) / 4 / RANGE;
  }
  return out;
}

export function sampleHeight(heights: Float32Array, x: number, y: number) {
  const { width: W, height: H } = SIZE;
  const cx = Math.min(W - 1.001, Math.max(0, x - 0.5));
  const cy = Math.min(H - 1.001, Math.max(0, y - 0.5));
  const x0 = Math.floor(cx);
  const y0 = Math.floor(cy);
  const fx = cx - x0;
  const fy = cy - y0;
  const at = (xx: number, yy: number) => heights[yy * W + xx];
  return (
    at(x0, y0) * (1 - fx) * (1 - fy) +
    at(x0 + 1, y0) * fx * (1 - fy) +
    at(x0, y0 + 1) * (1 - fx) * fy +
    at(x0 + 1, y0 + 1) * fx * fy
  );
}

export function worldAt(
  heights: Float32Array,
  x: number,
  y: number,
  lift = 0,
): [number, number, number] {
  const [wx, wz] = toWorld(x, y);
  return [wx, sampleHeight(heights, x, y) * RANGE_WORLD + lift, wz];
}

function tracePath(ctx: CanvasRenderingContext2D, points: number[][], close = false) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  if (close) ctx.closePath();
}

function maskCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE.width;
  canvas.height = SIZE.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context indisponível");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  return ctx;
}

// R = rios, G = APP, B = reserva legal; segunda máscara = imóvel.
function buildMasks() {
  const layers = maskCanvas();
  layers.globalCompositeOperation = "lighter";
  layers.strokeStyle = "rgb(255,0,0)";
  for (const river of terrain.rivers) {
    layers.lineWidth = river.main ? 2.6 : 1.3;
    tracePath(layers, river.points);
    layers.stroke();
  }
  layers.save();
  tracePath(layers, terrain.parcel.polygon, true);
  layers.clip();
  layers.strokeStyle = "rgb(0,255,0)";
  layers.lineWidth = (2 * terrain.app.widthM) / terrain.metersPerPixel;
  const main = terrain.rivers.find((r) => r.main);
  if (main) {
    tracePath(layers, main.points);
    layers.stroke();
  }
  layers.restore();
  layers.fillStyle = "rgb(0,0,255)";
  tracePath(layers, terrain.reserve.polygon, true);
  layers.fill();

  const parcel = maskCanvas();
  parcel.fillStyle = "#fff";
  tracePath(parcel, terrain.parcel.polygon, true);
  parcel.fill();

  const { width: W, height: H } = SIZE;
  return {
    layers: layers.getImageData(0, 0, W, H).data,
    parcel: parcel.getImageData(0, 0, W, H).data,
  };
}

// Pixels preenchidos do pin da marca, com o "i3" vazado.
async function pinPixels() {
  const svg = await fetch("/brand/logo-i3geo-pin.svg").then((r) => r.text());
  const paths = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  const [vbW, vbH] = [860, 1091];
  const scale = 0.5;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(vbW * scale);
  canvas.height = Math.ceil(vbH * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context indisponível");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  if (paths[0]) ctx.fill(new Path2D(paths[0]), "evenodd");
  ctx.globalCompositeOperation = "destination-out";
  if (paths[1]) ctx.fill(new Path2D(paths[1]), "evenodd");
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const filled: number[] = [];
  for (let i = 0; i < canvas.width * canvas.height; i++) {
    if (data[i * 4 + 3] > 128) filled.push(i);
  }
  return { filled, width: canvas.width, height: canvas.height };
}

export type Cloud = {
  count: number;
  positions: Float32Array;
  targets: Float32Array;
  rand: Float32Array;
  mask: Float32Array;
  attr: Float32Array;
  heights: Float32Array;
  pinTip: [number, number, number];
};

export async function buildCloud(stride: number): Promise<Cloud> {
  const [heights, pin] = await Promise.all([loadHeights(), pinPixels()]);
  const masks = buildMasks();
  const { width: W, height: H } = SIZE;
  const cols = Math.floor(W / stride);
  const rows = Math.floor(H / stride);
  const count = cols * rows;

  const positions = new Float32Array(count * 3);
  const targets = new Float32Array(count * 3);
  const rand = new Float32Array(count * 4);
  const mask = new Float32Array(count * 4);
  const attr = new Float32Array(count * 3);

  const pinTip = worldAt(heights, parcelCenter[0], parcelCenter[1], 0.04);
  const pinScale = PIN_HEIGHT / pin.height;
  const mppExag = terrain.metersPerPixel / (RANGE * EXAGGERATION);

  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      const x = Math.min(W - 0.01, (c + Math.random()) * stride);
      const y = Math.min(H - 0.01, (r + Math.random()) * stride);
      const h = sampleHeight(heights, x, y);
      const [wx, wz] = toWorld(x, y);
      positions[i * 3] = wx;
      positions[i * 3 + 1] = h * RANGE_WORLD;
      positions[i * 3 + 2] = wz;

      const r0 = Math.random();
      const r1 = Math.random();
      rand[i * 4] = r0;
      rand[i * 4 + 1] = r1;
      rand[i * 4 + 2] = Math.random();
      rand[i * 4 + 3] = Math.random();

      const m = (Math.floor(y) * W + Math.floor(x)) * 4;
      mask[i * 4] = masks.layers[m] / 255;
      mask[i * 4 + 1] = masks.layers[m + 1] / 255;
      mask[i * 4 + 2] = masks.layers[m + 2] / 255;
      mask[i * 4 + 3] = masks.parcel[m] / 255;

      // Sombreamento do relevo com luz de noroeste.
      const gx = (sampleHeight(heights, x + 1, y) - sampleHeight(heights, x - 1, y)) / (2 * mppExag);
      const gy = (sampleHeight(heights, x, y + 1) - sampleHeight(heights, x, y - 1)) / (2 * mppExag);
      const len = Math.hypot(gx, gy, 1);
      const shade = (gx * 0.5 + gy * 0.5 + 0.7) / len / Math.hypot(0.5, 0.5, 0.7);

      const inPin = r1 < PIN_SHARE && pin.filled.length > 0;
      attr[i * 3] = h;
      attr[i * 3 + 1] = Math.min(1, Math.max(0, shade));
      attr[i * 3 + 2] = inPin ? 1 : 0;

      if (inPin) {
        const k = pin.filled[Math.floor(Math.random() * pin.filled.length)];
        const px = (k % pin.width) + Math.random();
        const py = Math.floor(k / pin.width) + Math.random();
        targets[i * 3] = pinTip[0] + (px - pin.width * 0.495) * pinScale;
        targets[i * 3 + 1] = pinTip[1] + (pin.height - py) * pinScale;
        targets[i * 3 + 2] = pinTip[2] + (Math.random() - 0.5) * 0.05;
      } else {
        targets[i * 3] = wx;
        targets[i * 3 + 1] = h * RANGE_WORLD;
        targets[i * 3 + 2] = wz;
      }
    }
  }

  return { count, positions, targets, rand, mask, attr, heights, pinTip };
}

// Perímetro do imóvel como fileira densa de pontos sobre o relevo.
export function buildPerimeter(heights: Float32Array) {
  const pts = perimeter;
  const lengths = pts.map(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % pts.length];
    return Math.hypot(nx - x, ny - y);
  });
  const total = lengths.reduce((a, b) => a + b, 0);
  const count = Math.ceil(total * 6);
  const positions = new Float32Array(count * 3);
  const along = new Float32Array(count);
  let seg = 0;
  let acc = 0;
  for (let i = 0; i < count; i++) {
    const d = (i / count) * total;
    while (seg < pts.length - 1 && d > acc + lengths[seg]) {
      acc += lengths[seg];
      seg++;
    }
    const t = (d - acc) / lengths[seg];
    const [ax, ay] = pts[seg];
    const [bx, by] = pts[(seg + 1) % pts.length];
    const p = worldAt(heights, ax + (bx - ax) * t, ay + (by - ay) * t, 0.012);
    positions.set(p, i * 3);
    along[i] = i / count;
  }
  return { count, positions, along };
}
