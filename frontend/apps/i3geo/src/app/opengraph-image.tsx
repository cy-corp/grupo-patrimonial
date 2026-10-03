import { ImageResponse } from "next/og";

export const alt = "i3Geo: topografia e georreferenciamento em Minas Gerais e São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem de compartilhamento: fundo azul-petróleo, nome e posicionamento da marca.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#005C74",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -6 }}>i3Geo</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.05 }}>Precisão territorial.</div>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.05, color: "#FF6A13" }}>
            Inteligência ambiental.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, opacity: 0.85 }}>
            Topografia e georreferenciamento em Minas Gerais e São Paulo
          </div>
        </div>
      </div>
    ),
    size,
  );
}
