import { PIN_DOT, PIN_GLYPHS, PIN_OUTLINE, PIN_VIEWBOX } from "./logo-paths";

// Pin oficial em SVG puro, para os ícones e imagens gerados (favicon, ícone de celular, banner).
export function BrandMark({ height, pin, glyphs }: { height: number; pin: string; glyphs: string }) {
  return (
    <svg viewBox={PIN_VIEWBOX} height={height} width={(height * 860) / 1091} xmlns="http://www.w3.org/2000/svg">
      <path d={PIN_OUTLINE} fill={pin} />
      <path d={`${PIN_GLYPHS}${PIN_DOT}`} fill={glyphs} fillRule="evenodd" />
    </svg>
  );
}
