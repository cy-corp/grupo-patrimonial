import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "i3Geo: topografia e georreferenciamento em Minas Gerais e São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RINGS = [300, 480, 660, 840, 1020, 1200];

// Banner de compartilhamento com o logotipo oficial completo, nas cores da marca,
// sobre fundo claro com curvas de nível.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-i3geo-horizontal.svg"));
  const src = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "84px 90px 72px",
          background: "#F6F4EF",
          color: "#2F2F2F",
        }}
      >
        {RINGS.map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: 1010 - d / 2,
              top: 470 - (d * 0.8) / 2,
              width: d,
              height: d * 0.8,
              borderRadius: "50%",
              border: "2px solid rgba(0,92,116,0.13)",
              display: "flex",
            }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={840} height={261} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 8, background: "#FF6A13", marginBottom: 28 }} />
          <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: "#005C74" }}>
            Topografia e georreferenciamento
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 8 }}>Minas Gerais e São Paulo</div>
        </div>
      </div>
    ),
    size,
  );
}
