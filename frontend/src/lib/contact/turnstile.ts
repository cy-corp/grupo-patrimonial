import { headers } from "next/headers";
import { GENERIC_CONTACT_ERROR } from "@/lib/contact/constants";
import { isProduction } from "@/lib/contact/mail-config";

export function clientIp(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return (
    headerList.get("cf-connecting-ip")?.trim() ||
    headerList.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function requestIp() {
  return clientIp(await headers());
}

export async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

  if (!secret || !siteKey) {
    if (isProduction()) {
      return { ok: false as const, message: GENERIC_CONTACT_ERROR };
    }
    return { ok: true as const };
  }

  if (!token) {
    return { ok: false as const, message: GENERIC_CONTACT_ERROR };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip === "unknown" ? "" : ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    return { ok: false as const, message: GENERIC_CONTACT_ERROR };
  }

  const result = (await response.json()) as { success?: boolean };
  if (!result.success) {
    return { ok: false as const, message: GENERIC_CONTACT_ERROR };
  }

  return { ok: true as const };
}
