import { prisma } from "../database/db.js";
import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../application/interfaces/repository/IUserRepository.js";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user as User | null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user as User | null;
  }

  async create(data: any): Promise<User> {
    const user = await prisma.user.create({ data });
    return user as User;
  }

  // Update metodunu tip güvenli hale getirdik
  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: data,
    });
    return updatedUser as User;
  }
}