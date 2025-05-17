import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Helper function to set data with expiration
export const setWithExpiry = async (key: string, value: any, expirySeconds: number = 604800) => {
    try {
        const serializedValue = JSON.stringify(value);
        await redis.set(key, serializedValue);
        return true;
    } catch (error) {
        console.error("Redis set error:", error);
        return false;
    }
};

// Helper function to get and parse data
export const getAndParse = async (key: string) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data as string) : null;
    } catch (error) {
        console.error("Redis get error:", error);
        return null;
    }
};
