import { RedisService } from "../../../infrastructure/services/RedisService.js";

export class ResendMail {
    async execute(email: string): Promise<void> {
        const limitKey = `resend_limit:${email}`;
        const countKey = `resend_count:${email}`;
        
        // 1. 1 dakikalık ara kontrolü
        const isLocked = await RedisService.get(limitKey);
        if (isLocked) {
            throw new Error("Lütfen tekrar mail istemeden önce 1 dakika bekle.");
        }

        // 2. Toplam 5 hak kontrolü
        const currentCount = await RedisService.get(countKey);
        const count = currentCount ? parseInt(currentCount) : 0;

        if (count >= 5) {
            throw new Error("Günlük maksimum mail gönderme sınırına ulaştın (Max 5).");
        }

        console.log(`${email} için ${count + 1}. doğrulama kodu gönderildi.`);

        await RedisService.set(limitKey, "locked", 60); // 1 dakikalık kilit
        await RedisService.set(countKey, (count + 1).toString(), 86400); // 24 saatlik sayaç
    }
}