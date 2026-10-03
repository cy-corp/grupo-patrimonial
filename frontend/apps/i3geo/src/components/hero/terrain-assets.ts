import * as THREE from "three";
import { EXAGGERATION, SIZE, WORLD, terrain, toWorld, type Point } from "./terrain";

export const RANGE = terrain.hMax - terrain.hMin;
export const RANGE_WORLD = (RANGE / WORLD.metersPerUnit) * EXAGGERATION;
export type Assets = {
  heightTexture: THREE.DataTexture;
  overlayTexture: THREE.CanvasTexture;
  heights: Float32Array;
};

// O PNG guarda a altura em 16 bits (R alto, G baixo) em passos de 0,25 m.
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
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      // Linha 0 da textura é o sul (v = 0).
      out[(H - 1 - y) * W + x] = (px[i] * 256 + px[i + 1]) / 4 / RANGE;
    }
  }
  return out;
}

export function makeHeightTexture(heights: Float32Array) {
  const half = new Uint16Array(heights.length);
  for (let i = 0; i < heights.length; i++) half[i] = THREE.DataUtils.toHalfFloat(heights[i]);
  const tex = new THREE.DataTexture(half, SIZE.width, SIZE.height, THREE.RedFormat, THREE.HalfFloatType);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function tracePath(ctx: CanvasRenderingContext2D, points: number[][], close = false) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  if (close) ctx.closePath();
}

// Camadas vetoriais rasterizadas: R = rios, G = APP, B = reserva legal.
export function makeOverlayTexture(scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE.width * scale;
  canvas.height = SIZE.height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context indisponível");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "lighter";

  ctx.strokeStyle = "rgb(255,0,0)";
  for (const river of terrain.rivers) {
    ctx.lineWidth = river.main ? 1.6 : 0.75;
    tracePath(ctx, river.points);
    ctx.stroke();
  }

  ctx.save();
  tracePath(ctx, terrain.parcel.polygon, true);
  ctx.clip();
  ctx.strokeStyle = "rgb(0,255,0)";
  ctx.lineWidth = (2 * terrain.app.widthM) / terrain.metersPerPixel;
  const main = terrain.rivers.find((r) => r.main);
  if (main) {
    tracePath(ctx, main.points);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = "rgb(0,0,255)";
  tracePath(ctx, terrain.reserve.polygon, true);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function sampleHeight(heights: Float32Array, x: number, y: number) {
  const { width: W, height: H } = SIZE;
  const cx = Math.min(W - 1.001, Math.max(0, x - 0.5));
  const cy = Math.min(H - 1.001, Math.max(0, H - 1 - (y - 0.5)));
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

export function worldPoint(heights: Float32Array, [x, y]: Point, lift = 0.02): [number, number, number] {
  const [wx, wz] = toWorld(x, y);
  return [wx, sampleHeight(heights, x, y) * RANGE_WORLD + lift, wz];
}

export const rgb = (hex: string) => new THREE.Color(hex);
