import { redis } from "../config/redis";

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;

  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

export async function setCache(
  key: string,
  data: any,
  ttlSeconds: number
) {
  if (!redis) return;

  await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
}
