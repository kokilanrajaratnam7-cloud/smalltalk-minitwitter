import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
});

const POSTS_CACHE_KEY = "posts_cache";

export async function getPostsCache() {
  const cached = await redis.get(POSTS_CACHE_KEY);
  if (!cached) return null;

  console.log("Returning posts from Redis cache");
  return JSON.parse(cached);
}

export async function setPostsCache(posts: any) {
  console.log("Storing posts in Redis cache");

  // TTL = 30 seconds
  await redis.set(
    POSTS_CACHE_KEY,
    JSON.stringify(posts),
    "EX",
    30
  );
}

export async function invalidatePostsCache() {
  console.log("Invalidating posts cache");
  await redis.del(POSTS_CACHE_KEY);
}