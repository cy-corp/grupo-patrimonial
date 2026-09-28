import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_S = 14 * 24 * 60 * 60;

function secret() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
}

export function pathnameSeguro(pathname: string) {
  return /^financiamento\/[A-Za-z0-9][A-Za-z0-9._/-]{0,180}$/.test(pathname) && !pathname.includes("..");
}

function sign(pathname: string, exp: number) {
  return createHmac("sha256", secret()).update(`${pathname}|${exp}`).digest("base64url");
}

export function linkArquivo(origin: string, pathname: string) {
  if (!secret() || !pathnameSeguro(pathname)) return "";
  const exp = Math.floor(Date.now() / 1000) + TTL_S;
  const params = new URLSearchParams({ p: pathname, e: String(exp), s: sign(pathname, exp) });
  return `${origin}/api/financiamento/arquivo?${params}`;
}

export function verificarArquivo(pathname: string, expRaw: string, signature: string) {
  if (!secret() || !pathnameSeguro(pathname) || !signature) return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(pathname, exp);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
