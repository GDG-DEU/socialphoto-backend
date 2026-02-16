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
  created_at: string;
}

// Login bilgilerini döndürür
export interface LoginResponseDTO {
  token: string;
  user: UserResponseDTO;
}


export interface PasswordChangeRequestDTO {
    email: string; // Şifre sıfırlama linki gönderilecek adres
}

export interface PasswordChangeDTO {
    token: string;    // Mailden gelen unique token
    newPassword: string;
    confirmPassword: string;
}
