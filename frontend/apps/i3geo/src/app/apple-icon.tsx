import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/site/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ícone para a tela inicial do celular: pin branco sobre azul-petróleo.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#005C74",
        }}
      >
        <BrandMark height={124} pin="#FFFFFF" glyphs="#005C74" />
      </div>
    ),
    size,
  );
}
