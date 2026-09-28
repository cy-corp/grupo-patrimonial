import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { enforceUploadRateLimit } from "@/lib/contact/rate-limit";
import { clientIp } from "@/lib/contact/turnstile";
import { ARQUIVO_MAX_BYTES, ARQUIVO_TIPOS } from "@/lib/rendal/financiamento";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      { error: "Upload indisponível: falta BLOB_READ_WRITE_TOKEN no ambiente." },
      { status: 503 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Envio inválido." }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("financiamento/") || pathname.includes("..")) {
          throw new Error("Caminho inválido.");
        }
        const limited = await enforceUploadRateLimit(clientIp(new Headers(request.headers)));
        if (!limited.ok) throw new Error(limited.message);
        return {
          allowedContentTypes: [...ARQUIVO_TIPOS, "image/jpg"],
          maximumSizeInBytes: ARQUIVO_MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível enviar o arquivo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
