import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import { RedisService } from "../../../infrastructure/services/RedisService.js";

export class PasswordChangeRequest {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.");

    // 6 haneli random kod üretimi
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Redis'e kaydet (15 dakika süreli)
    const redisKey = `password_reset:${email}`;
    await RedisService.set(redisKey, resetCode, 900); 

    console.log(`[MAIL MOCK]: ${email} adresine gönderilen şifre sıfırlama kodu: ${resetCode}`);
  }
}