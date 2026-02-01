import type { User } from "../entities/User.js";

export interface CreateUserData {
  username: string;
  email: string;
  password_hash: string;
}

