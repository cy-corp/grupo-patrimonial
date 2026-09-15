import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { GENERIC_CONTACT_ERROR, RATE_LIMIT_ERROR } from "@/lib/contact/constants";
import { isProduction } from "@/lib/contact/mail-config";

let redis: Redis | null | undefined;
const limiters = new Map<string, Ratelimit>();

function getRedis() {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim() ?? "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ?? "";
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
