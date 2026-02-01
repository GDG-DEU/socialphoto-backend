import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { IPasswordHasher } from "../../interfaces/IPasswordHasher.js";
import type { RegisterDTO, UserResponseDTO } from "../../dto/auth.dto.js";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: RegisterDTO): Promise<UserResponseDTO> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("Bu e-posta adresi zaten kullanılıyor");
    }

    // Hash password
    const password_hash = await this.passwordHasher.hash(dto.password);

    // Create user
    const user = await this.userRepository.create({
      email: dto.email,
      username: dto.username,
      password_hash,
    });

    // Return user without password
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
