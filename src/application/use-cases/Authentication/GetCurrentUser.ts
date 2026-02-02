import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { UserResponseDTO } from "../../dto/auth.dto.js";
//Kullanıcının bilgisini döndürür
export class GetCurrentUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }
}
