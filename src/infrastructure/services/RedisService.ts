import { Redis } from "ioredis";

export class RedisService {
    private static instance: Redis;

    public static getInstance(): Redis {
        if (!this.instance) {
            this.instance = new Redis({
                host: process.env.REDIS_HOST || "localhost",
                port: Number(process.env.REDIS_PORT) || 6379,
                password: process.env.REDIS_PASSWORD || undefined,
            });
        }
        return this.instance;
    }

    public static async set(key: string, value: string, expireInSeconds: number): Promise<void> {
        const client = this.getInstance();
        await client.set(key, value, "EX", expireInSeconds);
    }

    public static async get(key: string): Promise<string | null> {
        const client = this.getInstance();
        return await client.get(key);
    }

    public static async del(key: string): Promise<void> {
        const client = this.getInstance();
        await client.del(key);
    }
}