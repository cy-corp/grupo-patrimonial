import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
  GENERIC_CONTACT_ERROR,
  RATE_LIMIT_ERROR,
  UPLOAD_BYTES_ERROR,
  UPLOAD_CHALLENGE_ERROR,
} from "@/lib/contact/constants";
import { isProduction } from "@/lib/contact/mail-config";
import { verifyTurnstile } from "@/lib/contact/turnstile";

const UPLOAD_BYTES_PER_DAY = 200 * 1024 * 1024;
const UPLOAD_GRANT_TTL_S = 45 * 60;

let redis: Redis | null | undefined;
const limiters = new Map<string, Ratelimit>();

function getRedis() {
  if (redis !== undefined) return redis;
  const url = (
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    ""
  ).trim();
  const token = (
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    ""
  ).trim();
  if (!url || !token) {
    redis = null;
    return redis;
  }
  redis = new Redis({ url, token });
  return redis;
}

function limiter(prefix: string, limit: number, window: `${number} ${"s" | "m" | "h" | "d"}`) {
  const client = getRedis();
  if (!client) return null;
  const key = `${prefix}:${limit}:${window}`;
  const existing = limiters.get(key);
  if (existing) return existing;
  const created = new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `lead:${prefix}`,
    analytics: false,
  });
  limiters.set(key, created);
  return created;
}

async function pass(instance: Ratelimit | null, id: string) {
  if (!instance) return true;
  const result = await instance.limit(id);
  return result.success;
}

export async function enforceLeadRateLimit(kind: "contact" | "quote", ip: string, email: string) {
  const client = getRedis();
  if (!client) {
    if (isProduction()) {
      return { ok: false as const, message: GENERIC_CONTACT_ERROR };
    }
    return { ok: true as const };
  }

  const ipKey = `${kind}:ip:${ip}`;
  const emailKey = `${kind}:email:${email}`;
  const pairKey = `${kind}:pair:${ip}:${email}`;

  const checks = await Promise.all([
    pass(limiter("burst", 1, "2 m"), pairKey),
    pass(limiter("ip-hour", 5, "1 h"), ipKey),
    pass(limiter("ip-day", 15, "1 d"), ipKey),
    pass(limiter("email-hour", 2, "1 h"), emailKey),
    pass(limiter("email-day", 5, "1 d"), emailKey),
  ]);

  if (checks.some((ok) => !ok)) {
    return { ok: false as const, message: RATE_LIMIT_ERROR };
  }

  return { ok: true as const };
}

export async function enforceUploadRateLimit(ip: string) {
  const client = getRedis();
  if (!client) {
    if (isProduction()) {
      return { ok: false as const, message: "Envio de arquivo indisponível agora." };
    }
    return { ok: true as const };
  }
  const ok = await pass(limiter("upload-hour", 40, "1 h"), `upload:ip:${ip}`);
  if (!ok) {
    return { ok: false as const, message: "Muitos arquivos em pouco tempo. Espere um pouco e tente de novo." };
  }
  return { ok: true as const };
}

async function hasUploadGrant(ip: string) {
  const client = getRedis();
  if (!client) return false;
  return Boolean(await client.get(`lead:upload-ok:${ip}`));
}

async function grantUpload(ip: string) {
  const client = getRedis();
  if (!client) return;
  await client.set(`lead:upload-ok:${ip}`, "1", { ex: UPLOAD_GRANT_TTL_S });
}

async function enforceUploadBytes(ip: string, bytes: number) {
  const client = getRedis();
  if (!client) {
    if (isProduction()) {
      return { ok: false as const, message: "Envio de arquivo indisponível agora." };
    }
    return { ok: true as const };
  }
  const size = Math.max(1, Math.min(bytes, UPLOAD_BYTES_PER_DAY));
  const day = new Date().toISOString().slice(0, 10);
  const key = `lead:upload-bytes:${day}:${ip}`;
  const used = await client.incrby(key, size);
  if (used === size) await client.expire(key, 60 * 60 * 48);
  if (used > UPLOAD_BYTES_PER_DAY) {
    await client.decrby(key, size);
    return { ok: false as const, message: UPLOAD_BYTES_ERROR };
  }
  return { ok: true as const };
}

export async function enforceUploadGuards(
  ip: string,
  input: { token: string; bytes: number },
) {
  const client = getRedis();
  if (!client) {
    if (isProduction()) {
      return { ok: false as const, message: "Envio de arquivo indisponível agora." };
    }
    return { ok: true as const };
  }

  const granted = await hasUploadGrant(ip);
  if (!granted) {
    const challenge = await verifyTurnstile(input.token, ip);
    if (!challenge.ok) {
      return { ok: false as const, message: UPLOAD_CHALLENGE_ERROR };
    }
    await grantUpload(ip);
  }

  const limited = await enforceUploadRateLimit(ip);
  if (!limited.ok) return limited;

  return enforceUploadBytes(ip, input.bytes);
}
