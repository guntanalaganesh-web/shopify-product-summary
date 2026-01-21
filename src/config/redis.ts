import Redis from "ioredis";

/**
 * Redis is OPTIONAL for local development.
 * If REDIS_URL is not provided or Redis is down,
 * the app will continue to work without caching.
 */

let redis: Redis | null = null;

if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      lazyConnect: true,          // do not connect immediately
      maxRetriesPerRequest: 1,    // fail fast
      retryStrategy: () => null   // disable retry loop
    });

    redis.on("connect", () => {
      console.log("✅ Redis connected");
    });

    redis.on("error", () => {
      console.warn("⚠️ Redis not available – cache disabled");
    });
  } catch (err) {
    console.warn("⚠️ Redis initialization failed – cache disabled");
    redis = null;
  }
}

export { redis };
