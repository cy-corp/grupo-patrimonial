import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DCORP_SIGNATURE, DCORP_SITE_NAME } from "../lib/site";

export const alt = DCORP_SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const markBytes = await readFile(
    join(process.cwd(), "public/brands/dcorp-mark-og.png"),
  );
  const markSrc = `data:image/png;base64,${Buffer.from(markBytes).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F1F1F",
          gap: 22,
        }}
      >
        <img
          src={markSrc}
          width={340}
          height={134}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            DCORP
          </div>
          <div
            style={{
              color: "#C9A96A",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Engenharia
          </div>
          <div
            style={{
              width: 48,
              height: 2,
              background: "#C9A96A",
              marginTop: 10,
              marginBottom: 6,
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: 26,
              fontWeight: 600,
              lineHeight: 1.3,
              textAlign: "center",
              maxWidth: 720,
            }}
          >
            {DCORP_SIGNATURE}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
