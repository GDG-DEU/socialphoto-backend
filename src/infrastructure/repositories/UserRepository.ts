import { prisma } from "../database/db.js";
import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../application/interfaces/repository/IUserRepository.js";
import type { CreateUserData } from "../../domain/repositories/IUserRepository.js";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password_hash: data.password_hash,
      },
    });
    return user;
  }
}
