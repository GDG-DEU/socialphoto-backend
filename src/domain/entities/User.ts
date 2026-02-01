export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  bio: string;
  avatar_url: string;
  created_at: Date;
}

export type UserWithoutPassword = Omit<User, "password_hash">;
