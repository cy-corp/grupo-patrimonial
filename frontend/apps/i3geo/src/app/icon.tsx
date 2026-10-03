import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/site/brand-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: o pin da marca em azul-petróleo, sobre fundo transparente.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BrandMark height={64} pin="#005C74" glyphs="#FFFFFF" />
      </div>
    ),
    size,
  );
}
