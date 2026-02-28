import type { IUserRepository } from "../../interfaces/repository/IUserRepository.js";
import type { IPasswordHasher } from "../../interfaces/IPasswordHasher.js";
import type { RegisterDTO, UserResponseDTO } from "../../dto/auth.dto.js";
import {RegisterSchema} from "../../validation/authSchema.js";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: RegisterDTO): Promise<UserResponseDTO> {

    //zod validation
    const result = RegisterSchema.safeParse(dto);
    if(!result.success){
        throw new Error(result.error.message);
    }

    const password_hash = await this.passwordHasher.hash(dto.password);

    const user = await this.userRepository.create({
        email: dto.email,
        username: dto.username,
        password_hash,
    });

    return {
        id: user.id!,
        username: user.username,
        email: user.email,
        bio: user.bio ?? "",
        avatar_url: user.avatar_url ?? "",
        created_at: user.created_at ? new Date(user.created_at).toISOString() : new Date().toISOString()
    };
  }
}

