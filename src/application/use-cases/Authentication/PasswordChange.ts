import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import { RedisService } from "../../../infrastructure/services/RedisService.js";
import { PasswordService } from "../../../infrastructure/services/password.service.js";

export class PasswordChange {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, code: string, newPassword: string): Promise<void> {
    const redisKey = `password_reset:${email}`;
    const savedCode = await RedisService.get(redisKey);

    // Kod Kontrolü
    if (!savedCode || savedCode !== code) {
      throw new Error("Geçersiz veya süresi dolmuş doğrulama kodu kanka.");
    }

    // Kullanıcı Kontrolü
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    const hashedPassword = await PasswordService.hash(newPassword);


    await this.userRepository.update(user.id!, {
      password_hash: hashedPassword
    });

    await RedisService.del(redisKey);
  }
}