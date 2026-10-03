import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/site/brand-mark";

export const alt = "i3Geo: topografia e georreferenciamento em Minas Gerais e São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RINGS = [260, 420, 580, 740, 900];

// Banner de compartilhamento: pin da marca sobre curvas de nível, com o posicionamento.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#005C74",
          color: "#FFFFFF",
        }}
      >
        {RINGS.map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: 930 - d / 2,
              top: 300 - d / 2,
              width: d,
              height: d * 0.82,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.16)",
              display: "flex",
            }}
          />
        ))}
        <div style={{ position: "absolute", right: 150, top: 120, display: "flex" }}>
          <BrandMark height={360} pin="#FFFFFF" glyphs="#005C74" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, width: 800 }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -5 }}>i3Geo</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>Precisão territorial.</div>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, color: "#FF6A13" }}>
              Inteligência ambiental.
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 28, opacity: 0.88 }}>
              Topografia e georreferenciamento em Minas Gerais e São Paulo
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
