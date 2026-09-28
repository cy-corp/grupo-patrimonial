import { get } from "@vercel/blob";
import { verificarArquivo } from "@/lib/rendal/arquivo-link";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.searchParams.get("p") ?? "";
  const exp = url.searchParams.get("e") ?? "";
  const signature = url.searchParams.get("s") ?? "";
  if (!verificarArquivo(pathname, exp, signature)) {
    return new Response("Link inválido ou vencido.", { status: 403 });
  }

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return new Response("Arquivo não encontrado.", { status: 404 });
  }

  const filename = pathname.split("/").pop()?.replace(/["\r\n]/g, "") || "arquivo";
  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
