import { SIZE, terrain } from "@/components/hero/terrain";

const ROWS = 46;
const COLS = 220;
let cache: Promise<number[][]> | null = null;

async function load() {
  const blob = await fetch("/hero/terrain.png").then((r) => r.blob());
  const bitmap = await createImageBitmap(blob, { colorSpaceConversion: "none", premultiplyAlpha: "none" });
  const canvas = document.createElement("canvas");
  canvas.width = SIZE.width;
  canvas.height = SIZE.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context indisponível");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const px = ctx.getImageData(0, 0, SIZE.width, SIZE.height).data;
  const range = terrain.hMax - terrain.hMin;
  const rows = Array.from({ length: ROWS }, (_, r) => {
    const y = Math.floor((r / (ROWS - 1)) * (SIZE.height - 1));
    return Array.from({ length: COLS }, (_, c) => {
      const x = Math.floor((c / (COLS - 1)) * (SIZE.width - 1));
      const i = (y * SIZE.width + x) * 4;
      return (px[i] * 256 + px[i + 1]) / 4 / range;
    });
  });
  // Normaliza pela faixa de alturas do recorte e acentua os picos, uma vez só.
  const flat = rows.flat();
  const low = Math.min(...flat);
  const span = Math.max(...flat) - low || 1;
  return rows.map((row) => row.map((v) => Math.pow((v - low) / span, 1.5)));
}

// Perfis do relevo real para o rodapé, de norte a sul, lidos do mesmo PNG da abertura.
// O resultado fica guardado: a tela de carregamento adianta a leitura e o rodapé só usa.
export function terrainRows() {
  cache ??= load().catch((error) => {
    cache = null;
    throw error;
  });
  return cache;
}
