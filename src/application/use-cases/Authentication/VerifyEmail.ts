import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { ITokenService } from "../../interfaces/ITokenService.js";

export class VerifyEmail {
    constructor(
        private userRepository: IUserRepository,
        private tokenService: ITokenService
    ) {}

    async execute(token: string): Promise<void> {
        // 1. Token'ı doğrula (Kağan'ın yazdığı JwtTokenService'i kullanıyoruz)
        const payload = await this.tokenService.verifyToken(token);
        
        if (!payload || !payload.userId) {
            throw new Error("Geçersiz veya süresi dolmuş doğrulama kodu");
        }

        // 2. Kullanıcıyı bul
        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
            throw new Error("Kullanıcı bulunamadı");
        }

        // 3. Kullanıcıyı onaylı olarak güncelle (Bu metodu Repository'e eklememiz gerekecek)
        await this.userRepository.update(user.id!, { is_verified: true }); 
    }
}