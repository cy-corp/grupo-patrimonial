import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getKit } from "@/lib/rendal/content/parceiros";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const card = getKit(id);
  if (!card) return new Response("Not found", { status: 404 });

  const file = path.join(process.cwd(), "public", card.imagem.replace(/^\//, ""));
  const bytes = await readFile(file);
  const photo = `data:image/jpeg;base64,${bytes.toString("base64")}`;

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          background: "#0E2A2D",
          color: "white",
        }}
      >
        <img
          src={photo}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 64,
            background: "linear-gradient(to top, #0E2A2D 0%, rgba(14,42,45,0) 100%)",
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 4, color: "#C9A96A" }}>RENDAL</div>
          <div style={{ fontSize: 72, fontWeight: 600, marginTop: 24, lineHeight: 1.15 }}>{card.titulo}</div>
          <div style={{ fontSize: 36, marginTop: 24, lineHeight: 1.35, color: "rgba(255,255,255,0.86)" }}>{card.frase}</div>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 },
  );

  image.headers.set("Content-Disposition", `attachment; filename="rendal-${card.id}.png"`);
  image.headers.set("Cache-Control", "public, max-age=86400");
  return image;
}
