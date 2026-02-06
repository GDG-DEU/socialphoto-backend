
import type { User } from "../../../domain/entities/User.js";
import type { CreateUserData } from "../../../domain/repositories/IUserRepository.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: Partial<User>): Promise<void>;
}
