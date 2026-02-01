export interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// User bilgilerini döndürür
export interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
  created_at: Date;
}

// Login bilgilerini döndürür
export interface LoginResponseDTO {
  token: string;
  user: UserResponseDTO;
}
