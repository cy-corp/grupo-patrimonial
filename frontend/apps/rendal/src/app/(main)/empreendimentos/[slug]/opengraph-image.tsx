import { ImageResponse } from "next/og";
import { getEmpreendimento } from "@/lib/rendal/content/empreendimentos";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getEmpreendimento(slug);
  const nome = item?.nome ?? "Rendal";
  const cidade = item?.bairro ?? item?.cidade ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#1F1F1F",
          color: "white",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 28, color: "#C9A96A" }}>Rendal</div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 16 }}>{nome}</div>
        <div style={{ fontSize: 32, marginTop: 12, color: "rgba(255,255,255,0.75)" }}>{cidade}</div>
      </div>
    ),
    size,
  );
}
