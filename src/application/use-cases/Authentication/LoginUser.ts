import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { IPasswordHasher } from "../../interfaces/IPasswordHasher.js";
import type { ITokenService } from "../../interfaces/ITokenService.js";
import type { LoginDTO, LoginResponseDTO } from "../../dto/auth.dto.js";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private tokenService: ITokenService,
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponseDTO> {
    // Find user by email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("Geçersiz e-posta veya şifre");
    }

    // Verify password
    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new Error("Geçersiz e-posta veya şifre");
    }

    // Generate JWT token
    const token = await this.tokenService.generateToken(user.id);

    // Return token and user (without password)
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      },
    };
  }
}
