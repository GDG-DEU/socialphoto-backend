import { RedisService } from "../../../infrastructure/services/RedisService.js";
import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";

export class VerifyEmail {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, code: string): Promise<void> {
        const redisKey = `verify_code:${email}`;
        
        const savedCode = await RedisService.get(redisKey);

        if (!savedCode) {
            throw new Error("Doğrulama kodunun süresi dolmuş veya hiç oluşturulmamış.");
        }

        if (savedCode !== code) {
            throw new Error("Girdiğin kod hatalı, lütfen tekrar dene.");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
        }

        await this.userRepository.update(user.id!, {
            is_verified: true
        });

        await RedisService.del(redisKey);
    }
}