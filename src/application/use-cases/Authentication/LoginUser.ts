import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { IPasswordHasher } from "../../interfaces/IPasswordHasher.js";
import type { ITokenService } from "../../interfaces/ITokenService.js";
import type { LoginDTO, LoginResponseDTO } from "../../dto/auth.dto.js";
import {LoginSchema} from "../../validation/authSchema.js";

export class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenService: ITokenService,
    ) {}

    async execute(dto: LoginDTO): Promise<LoginResponseDTO> {

        //zod validation
        const result = LoginSchema.safeParse(dto);
        if(!result.success){
            throw new Error(result.error.message);
        }

        const user = await this.userRepository.findByEmail(dto.email);

        if (!user) {
            throw new Error("Geçersiz e-posta veya şifre");
        }

        const isPasswordValid = await this.passwordHasher.compare(
            dto.password,
            user.password_hash
        );

        if (!isPasswordValid) {
            throw new Error("Geçersiz e-posta veya şifre");
        }

        const token = await this.tokenService.generateToken(user.id!);

        return {
            token,
            user: {
                id: user.id!,
                username: user.username,
                email: user.email,
                bio: user.bio ?? "",
                avatar_url: user.avatar_url ?? "",
                created_at: user.created_at ? user.created_at.toISOString() : new Date().toISOString()
            },
        };
    }
}